<template>
	<view style='width:100%;overflow:hidden;'>
		<!-- <view class="one_line">
		</view> -->

		<view class="userBox">
			<view class="img_a">
				<image
					:src="user.headimg?user.headimg:user.sex==0?'../../../static/3a03a3d7ebe4442f847932f34b37765a.png':'../../../static/307930aca7b24a8f938121e2bac851d4.png'"
					mode=""></image>
			</view>
			<view class="text_a">
				<view class="yonghum">
					<text>{{user.nickname?user.nickname:'暂无用户名'}}</text>
				</view>
				<view class="phone">
					<text>积分：<text>{{user.payPoints}}</text></text>
				</view>
			</view>
			<view class="imgRight" @tap="jDetail(phone)">
				<text>积分明细</text>
			</view>
		</view>

		<!-- tab切换排序 -->
		<view class="tabs">
			<!-- 选中样式 -->
			<view :class="i==1?'on':'jif'" @tap="taggle(1)">
				<text>兑换量</text>
			</view>

			<view :class="i==2?'on':'jif'" @tap="taggle(2)">
				<text>积分排序</text>
			</view>

			<view :class="i==3?'on':'jif'" @tap="taggle(3)">
				<text>价格排序</text>
			</view>
		</view>

		<!-- 商品列表 -->
		<view class="listBox" style="margin-bottom: 800rpx;">
			<view class="block" v-for="(item , index) in jifList" @tap="shopDetail(item.goodsId)">
				<view class="imgBox">
					<image :src="item.goodsLogo" mode=""></image>
				</view>
				<view class="bot-bottom">
					<view class="tit">
						<text>{{item.goodsName}}</text>
					</view>
					<view class="span">
						<text>{{item.integral}}积分{{item.shopPrice?'+￥'+item.shopPrice.toFixed(2):''}}</text>
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				jifList: {},
				user: {},
				id: '',
				i: 1,
				isXu: true,
				phone: '',
				page: 1,
				loadingType: 0
			}
		},
		props: ['num'],
		onShow() {
			var _this = this
			this.page=1
			uni.pageScrollTo({
				scrollTop: 0,
			});
			this.page=1
			var data = {
				jfAsc: '',
				jfDesc: '',
				priceAsc: '',
				priceDesc: '',
				page: this.page,
				page_num: 10
			}
			this.getNews(JSON.stringify(data))

			this.$https({
				url: '/api/user/my-info',
				dengl: false,
				data: {},
				success: function(res) {
					_this.user = res.data.data
					_this.phone = res.data.data.phone
				}
			})
		},
		onPullDownRefresh() {
			//下拉的生命周期
			this.getNews()
		},
		onReachBottom() {
			console.log(this.i, 888)
			var i = this.i
			var _this = this
			if (i == 1) {
				var data = {
					jfAsc: '',
					jfDesc: '',
					priceAsc: '',
					priceDesc: '',
					page: this.page + 1,
					page_num: 10
				}
				_this.getMoreNews(JSON.stringify(data))

			} else if (i == 2) {
				if (this.isXu) {
					var data = {
						jfAsc: '1',
						jfDesc: '',
						priceAsc: '',
						priceDesc: '',
						page: this.page + 1,
						page_num: 10
					}
					_this.getMoreNews(JSON.stringify(data))
				} else {
					var data = {
						jfAsc: '',
						jfDesc: '1',
						priceAsc: '',
						priceDesc: '',
						page: this.page + 1,
						page_num: 10
					}
					_this.getMoreNews(JSON.stringify(data))
				}
			} else if (i == 3) {
				if (this.isXu) {
					var data = {
						jfAsc: '',
						jfDesc: '',
						priceAsc: '1',
						priceDesc: '',
						page: this.page + 1,
						page_num: 10
					}
					_this.getMoreNews(JSON.stringify(data))
				} else {
					var data = {
						jfAsc: '',
						jfDesc: '',
						priceAsc: '',
						priceDesc: '1',
						page: this.page + 1,
						page_num: 10
					}
					_this.getMoreNews(JSON.stringify(data))
				}
			}

			this.$https({
				url: '/api/user/my-info',
				dengl: false,
				data: {},
				success: function(res) {
					_this.user = res.data.data
					_this.phone = res.data.data.phone
				}
			})
		},

		methods: {
			jDetail() {
				uni.navigateTo({
					url: '../distr/distrDetail?id=' + this.phone
				})
			},
			taggle(i) {
				var _this = this
				this.i = i
				this.page = 1
				_this.isXu = !_this.isXu
				this.loadingType = 0
				uni.pageScrollTo({
					scrollTop: 0,
				});
				if (i == 1) {
					var data = {
						jfAsc: '',
						jfDesc: '',
						priceAsc: '',
						priceDesc: '',
						page: this.page,
						page_num: 10
					}
					_this.getNews(JSON.stringify(data))

				} else if (i == 2) {
					if (this.isXu) {
						var data = {
							jfAsc: '1',
							jfDesc: '',
							priceAsc: '',
							priceDesc: '',
							page: this.page,
							page_num: 10
						}
						_this.getNews(JSON.stringify(data))
					} else {
						var data = {
							jfAsc: '',
							jfDesc: '1',
							priceAsc: '',
							priceDesc: '',
							page: this.page,
							page_num: 10
						}
						_this.getNews(JSON.stringify(data))
					}
				} else if (i == 3) {
					if (this.isXu) {
						var data = {
							jfAsc: '',
							jfDesc: '',
							priceAsc: '1',
							priceDesc: '',
							page: this.page,
							page_num: 10
						}
						_this.getNews(JSON.stringify(data))
					} else {
						var data = {
							jfAsc: '',
							jfDesc: '',
							priceAsc: '',
							priceDesc: '1',
							page: this.page,
							page_num: 10
						}
						_this.getNews(JSON.stringify(data))
					}
				}

			},
			shopDetail(id) {
				uni.navigateTo({
					url: './jifenDetails?id=' + id
				})
			},
			getNews(data) {
				this.page = 1
				var _this = this
				//标题读取样式激活
				uni.showNavigationBarLoading()
				this.$https({
					url: '/api/oauth/shop/mall-goods-jfList',
					data: data,
					dengl: false,
					haeder: true,
					success: function(res) {
						_this.jifList = res.data.data.list
						//隐藏标题读取 
						uni.hideNavigationBarLoading()
						uni.stopPullDownRefresh()
					}
				})

			},
			getMoreNews(data) {
				var _this = this
				this.page++

				if (_this.loadingType != 0) {
					return false; //loadingType!=0;直接返回
				}
				_this.loadingType = 1;
				uni.showNavigationBarLoading();
				this.$https({
					url: '/api/oauth/shop/mall-goods-jfList',
					dengl: false,
					data: data,
					haeder: true,
					success(res) {
						if (res.data.data.list.length < 10 || res.data.data.list ==
							'null') { //当之前的数据长度等于count时跳出函数，不继续执行下面语句
							_this.loadingType = 2;
							uni.showToast({
								title: '已加载全部数据',
								icon: 'none',
								duration: 2000
							})
							uni.hideNavigationBarLoading(); //关闭加载动画
							return false;
						}
						_this.jifList = _this.jifList.concat(res.data.data.list)
						_this.loadingType = 0; //将loadingType归0重置
						uni.hideNavigationBarLoading(); //关闭加载动画
					}
				})
			},


		}
	}
</script>

<style lang="scss">
	.userBox {
		width: 710upx;
		overflow: hidden;
		padding: 20upx;
		padding-top: 20upx;
		background-color: #f7f7f7;

		.img_a {
			float: left;

			image {
				width: 120upx;
				height: 120upx;
				border-radius: 120upx;
			}
		}

		.text_a {
			float: left;
			padding-left: 20upx;

			.yonghum {
				font-size: 34upx;
				color: #333;
				line-height: 60upx;
			}

			.phone {
				font-size: 30upx;
				color: #666;

				text {
					text {
						color: #3366ff;
					}
				}
			}
		}

		.imgRight {
			float: right;
			padding: 25upx 0upx 25upx 25upx;

			text {
				width: 12upx;
				height: 20upx;
				color: #fff;
				font-size: 22upx;
				border-radius: 40upx;
				padding: 10upx 20upx;
				background-color: #3366ff;
			}
		}
	}

	.tabs {
		text-align: center;
		width: 710upx;
		margin: 20upx;

		.on {
			float: left;
			width: 190upx;
			border-radius: 50upx;
			border: 1px solid #2b5cff;
			margin: 20upx;

			text {
				font-size: 26upx;
				color: #2b5cff;
				line-height: 60upx;
			}
		}

		.jif {
			float: left;
			width: 190upx;
			border-radius: 50upx;
			background-color: #f7f7f7;
			border: 1px solid #f7f7f7;
			margin: 20upx;

			text {
				font-size: 26upx;
				line-height: 60upx;
			}
		}

		.jiag {
			float: left;
			width: 190upx;
			border-radius: 50upx;
			background-color: #f7f7f7;
			border: 1px solid #f7f7f7;
			margin: 20upx;

			text {
				font-size: 26upx;
				line-height: 60upx;
			}
		}
	}

	.listBox {
		width: 100%;
		box-sizing: border-box;
		overflow: hidden;
		padding: 0 28rpx;
		padding-top: 20upx;

		.block:nth-child(odd) {
			float: left;
		}

		.block:nth-child(even) {
			float: right;
		}

		.block {
			width: calc(50% - 14rpx);
			// float: left;
			margin-bottom: 28upx;
			border-radius: 20upx;
			box-shadow: 0 0 5px #ccc;
			height: 450rpx;


			.imgBox {
				height: 320rpx;
				width: 100%;
				border-radius: 10upx;
				overflow: hidden;

				image {
					height: 320rpx;
					width: 100%;
					display: block;
				}

			}

			.bot-bottom {
				position: relative;
				height: calc(100% - 320rpx);
				box-sizing: border-box;
			}

			.tit {
				font-size: 26upx;
				padding: 10rpx 20rpx;
				color: #333;

				text {
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}
			}

			.span {
				font-size: 26upx;
				color: #ff0000;
				padding: 15rpx 20rpx;
				position: absolute;
				bottom: 0;
			}
		}
	}
</style>
