<template>
	<view>

		<!-- tab切换样式  start-->
		<!-- <view :class="shixiao==0?'yes':'none'" @tap='keshiyong'>
			<text>平台优惠券</text>
			下图为选中状态下划线
			<view class="imgBox" v-if='shixiao==0'>
				<image src="../../../../static/icon_09.png" mode=""></image>
			</view>
		</view> -->

		<!-- <view :class="shixiao==1?'yes':'none'" @tap='yishixiao'>
			<text>新人优惠券</text>
			<view class='imgBox' v-if='shixiao==1'>
				<image src='../../../../static/icon_09.png'></image>
			</view>
		</view> -->
		<!-- tab切换样式  end-->


		<!-- 可使用状态优惠券 -->
		<view class="valid ">
			<view v-if='youhuiquan.length==0' style='box-shadow:none;'>
				<image src='../../../../static/y.png'
					style='width:300rpx;height:150rpx;display:block;margin:20rpx auto;'>
				</image>
				<view style='text-align:center;'>暂无可用优惠券</view>
			</view>
			<view v-for='item in youhuiquan' class="coupon-box">
				<view class="imgBox" style='position:relative;'>
					<image src="../../../../static/icon_27.png" mode=""></image>
					<view class="sum">
						<text>{{item.money?item.money:''}}<text>元</text></text>
						<view class="tianjan">
							<text>满{{item.condition?item.condition:''}}可用</text>
						</view>
					</view>
				</view>
				<view class="float">
					<view class="h2">
						<text>满{{item.condition?item.condition:''}}-{{item.money?item.money:''}}立减券</text>
					</view>
					<view class="p">
						<text>{{item.name?item.name:''}}</text>
					</view>
					<view class="span" v-if="item.useStartTime&&item.useEndTime">
						<text>使用时间：{{item.useStartTime!=null?item.useStartTime.split(' ')[0]:''}}-{{item.useEndTime!=null?item.useEndTime.split(' ')[0]:''}}</text>
					</view>
				</view>

				<view class="bott" :style="item.isType?'background:#ccc':''">
					<text @tap='shiyong(item.id,item.money,item.shopId,item.isType)'>{{item.isType?'不可用':'使用'}}</text>
				</view>
			</view>
		</view>

		<!-- 不可使用状态 -->
		<view class="valid " v-if='false'>
			<view v-if='youhuiquan.length==0' style='box-shadow:none;'>
				<image src='../../../../static/y.png'
					style='width:300rpx;height:150rpx;display:block;margin:20rpx auto;'>
				</image>
				<view style='text-align:center;'>暂无可用优惠券</view>
			</view>
			<view v-for='item in youhuiquan' class="coupon-box">
				<view class="imgBox" style='position:relative;'>
					<image src="../../../../static/icon_27.png" mode=""></image>
					<view class="sum">
						<text>{{item.money?item.money:''}}<text>元</text></text>
						<view class="tianjan">
							<text>满{{item.condition?item.condition:''}}可用</text>
						</view>
					</view>
				</view>
				<view class="float">
					<view class="h2">
						<text>满{{item.condition?item.condition:''}}-{{item.money?item.money:''}}立减券</text>
					</view>
					<view class="p">
						<text>{{item.name?item.name:''}}</text>
					</view>
					<view class="span" v-if="item.useStartTime&&item.useEndTime">
						<text>使用时间：{{item.useStartTime!=null?item.useStartTime.split(' ')[0]:''}}-{{item.useEndTime!=null?item.useEndTime.split(' ')[0]:''}}</text>
					</view>
				</view>

				<view class="bott" :style="item.isType?'background:#ccc':''">
					<text @tap='shiyong(item.id,item.money,item.shopId,item.isType)'>{{item.isType?'不可用':'使用'}}</text>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				shixiao: 0,
				goodsId: '',
				cartAttr: '',
				zhid: '',
				youhuiquan: [],
				dingdan: '',
				shopId: 0,
				y: '',
				id: '',
				money: '',
				jine: '',
				page: 1,
				loadingType: 0,
				obj: {}
			}
		},
		onLoad: function(options) {
			var _this = this
			console.log(options)
			if (options.dingdan) {
				this.dingdan = options.dingdan
				this.obj = JSON.parse(options.obj)
				this.jine = options.jine
			}

			this.$https({
				// url: '/api/oauth/shop/coupon-couple-List',
				url: '/api/shop/select-my-platform-coupon-list',
				data: {
					limit: 10,
					page: this.page,
				},
				dengl: uni.getStorageSync('Authorization') ? false : true,
				success: res => {
					res.data.data = res.data.data ? res.data.data : []
					var arr = []
					if (res.data.data && options.dingdan) {
						res.data.data.map((val, i) => {
							if (val.useEndTime && val.useEndTime != null) {
								val.useEndTime = val.useEndTime.replace(/-/g, '.')
							}
							if (val.useStartTime && val.useStartTime != null) {
								val.useStartTime = val.useStartTime.replace(/-/g, '.')
							}
							val.isType = val.condition > JSON.parse(options.obj).jine ? true :
								false
							var str = {}
							str.couponDTO = val
							arr.push(str)
						})
						console.log(arr)
					}
					this.youhuiquan = res.data.data
				}
			})



		},
		onReachBottom() {
			var data = {
				page: this.page + 1,
				limit: 10
			}
			this.getMoreNews(data)
		},
		methods: {
			keshiyong: function() {
				this.shixiao = 0
				this.getNews()
			},
			yishixiao: function() {
				this.shixiao = 1
				this.youhui()
			},
			//获取优惠券
			youhui: function() {
				var _this = this
				this.youhuiquan = []
				this.$https({
					url: '/api/shop/select-my-platform-coupon-list',
					data: {},
					dengl: false,
					success: function(res) {
						var arr = []
						if (res.data.data && _this.dingdan) {
							res.data.data.map((val, i) => {
								if (val.useEndTime && val.useEndTime != null) {
									val.useEndTime = val.useEndTime.replace(/-/g, '.')
								}
								if (val.useStartTime && val.useStartTime != null) {
									val.useStartTime = val.useStartTime.replace(/-/g, '.')
								}
								val.isType = val.condition > _this.obj.jine ? true :
									false
								var str = {}
								str.couponDTO = val
								arr.push(str)
							})
							console.log(arr)
						}
						_this.youhuiquan = res.data.data ? res.data.data : []
					}
				})
			},
			shiyong: function(id, money) {
				var _this = this
				if (this.isType) {
					uni.showToast({
						title: '不符合满减条件',
						icon: 'none'
					})
					return
				}

				if (this.dingdan == 2) {
					// 商品详情进入时
					var pages = getCurrentPages();
					var prevPage = pages[pages.length - 2];
					// 优惠券id和金额等于当前
					prevPage.$vm.commCouponId = id
					prevPage.$vm.commMoney = money
					if (this.obj.couponDJ == 'N') {
						// 如果不可叠加使用,那么店铺优惠券id和金额均清空
						prevPage.$vm.cartAttr[_this.obj.index].couponId = ''
						prevPage.$vm.cartAttr[_this.obj.index].money = 0
					}
					prevPage.$vm.countYF()
					uni.navigateBack({})

				} else if (this.dingdan == 1) {
					// 从购物车过来时
					console.log(this.obj)
					var pages = getCurrentPages();
					var prevPage = pages[pages.length - 2];
					prevPage.$vm.commCouponId = id
					prevPage.$vm.commMoney = money
					// 如果可叠加金额足够，平台优惠券id和使用商品id为可叠加的商品
					if (this.obj.jineTwo >= money) {
						prevPage.$vm.isEnough = true
						prevPage.$vm.couArr = _this.obj.dieJId
						prevPage.$vm.commCouponId = id
					} else {
						// 如果不够,则全部商品金额使用,所有不可叠加的商品优惠券清空,优惠金额清空
						prevPage.$vm.isEnough = false
						prevPage.$vm.couArr = _this.obj.useId
						prevPage.$vm.commCouponId = id
						_this.obj.userIndex.map(function(z, i) {
							console.log(z)
							prevPage.$vm.cartAttr[z.fIndex].couponId = ''
							prevPage.$vm.cartAttr[z.fIndex].money = 0
						})

					}
					prevPage.$vm.countYF()
					uni.navigateBack({})
				} else {
					uni.reLaunch({
						url: '../../../index/index'
					})
				}
			},
			getNews() {
				this.page = 1
				var _this = this
				//标题读取样式激活
				uni.showNavigationBarLoading()
				this.$https({
					url: '/api/shop/select-my-platform-coupon-list',
					data: {
						page: _this.page,
						limit: 10
					},
					dengl: true,
					success: function(res) {
						var arr = []
						if (res.data.data && _this.dingdan) {
							res.data.data.map((val, i) => {
								if (val.useEndTime && val.useEndTime != null) {
									val.useEndTime = val.useEndTime.replace(/-/g, '.')
								}
								if (val.useStartTime && val.useStartTime != null) {
									val.useStartTime = val.useStartTime.replace(/-/g, '.')
								}
								val.isType = val.condition > _this.obj.jine ? true :
									false
								var str = {}
								str.couponDTO = val
								arr.push(str)
							})
							console.log(arr)
						}
						_this.youhuiquan = res.data.data
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
					url: '/api/shop/select-my-platform-coupon-list',
					dengl: uni.getStorageSync('Authorization') ? false : true,
					data: data,
					success(res) {
						if (res.data.data.length < 10 || res.data.data ==
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
						var arr = []
						if (res.data.data && _this.dingdan) {
							res.data.data.map((val, i) => {
								if (val.useEndTime && val.useEndTime != null) {
									val.useEndTime = val.useEndTime.replace(/-/g, '.')
								}
								if (val.useStartTime && val.useStartTime != null) {
									val.useStartTime = val.useStartTime.replace(/-/g, '.')
								}
								val.isType = val.condition > _this.obj.jine ? true :
									false
								var str = {}
								str.couponDTO = val
								arr.push(str)
							})
							console.log(arr)
						}
						_this.youhuiquan = _this.youhuiquan.concat(res.data.data)
						_this.loadingType = 0; //将loadingType归0重置
						uni.hideNavigationBarLoading(); //关闭加载动画
					}
				})
			},

		},
	}
</script>

<style lang="scss">
	.coupon-box {
		border-radius: 15rpx;
	}

	.yes {
		width: 375upx;
		text-align: center;
		float: left;
		padding-bottom: 20upx;

		text {
			width: 32upx;
			color: #333;
			line-height: 80upx;
		}

		.imgBox {
			image {
				width: 34upx;
				height: 6upx;
				display: block;
				margin: 0 auto;
			}
		}
	}

	.none {
		width: 375upx;
		text-align: center;
		float: left;

		text {
			width: 32upx;
			color: #999;
			line-height: 80upx;
		}
	}



	.valid {
		overflow: hidden;
		position: relative;
		width: 100%;
		box-sizing: border-box;
		padding: 20rpx;
		border-radius: 10upx;
		background-color: #fff;


		>view {
			overflow: hidden;
			box-shadow: 0 0 5px #ccc;
			margin-bottom: 30rpx;
		}


		.imgBox {
			float: left;
			padding-right: 20upx;

			image {
				width: 200upx;
				height: 210upx;
				display: block;
			}

			.sum {
				text-align: center;
				overflow: hidden;
				width: 200rpx;
				position: absolute;
				height: 210rpx;
				top: 0;
				left: 0;

				>text {
					font-size: 60upx;
					color: #fff;
					margin-top: 20%;
					display: block;

					text {
						font-size: 30upx;
						color: #fff;
					}
				}

				.tianjan {
					text {
						color: #fff;
						font-size: 20upx;
						line-height: 50upx;
					}

				}
			}
		}

		.float {
			float: left;
			width: calc(100% - 380rpx);

			.h2 {
				font-size: 32upx;
				color: #333;
				line-height: 50upx;
				padding-top: 30upx;
			}

			.p {
				font-size: 24upx;
				color: #666;
				line-height: 50upx;
			}

			.span {
				font-size: 20upx;
				;
				color: #999;
				line-height: 30upx;
			}
		}

		.bott {
			float: right;
			color: #fff;
			margin: 80upx 20upx;
			padding: 10upx 20upx;
			border-radius: 30upx;
			font-size: 22upx;
			max-width: 90rpx;
			background: linear-gradient(to right, #ff9429, #ff6759);
		}
	}

	// .valid>view:first-child {
	// 	margin-top: 20rpx;
	// }

	// 不可使用样式
	.cannot {
		overflow: hidden;
		position: relative;
		width: 710upx;
		height: 205upx;
		margin: 20upx;
		border-radius: 10upx;
		background-color: #fff;

		>view {
			overflow: hidden;
			box-shadow: 0 0 5px #ccc;
			margin-top: 50rpx;
		}

		.imgBox {
			float: left;
			padding-right: 20upx;

			image {
				width: 200upx;
				height: 205upx;
				display: block;
			}

			.sum {
				position: absolute;
				top: 15%;
				left: 6%;
				text-align: center;

				text {
					font-size: 60upx;
					color: #fff;

					text {
						font-size: 30upx;
						color: #fff;
					}
				}

				.tianjan {
					text {
						color: #fff;
						font-size: 20upx;
						line-height: 50upx;
					}

				}
			}
		}

		.float {
			float: left;
			width: 48%;

			.h2 {
				font-size: 32upx;
				color: #333;
				line-height: 50upx;
				padding-top: 30upx;
			}

			.p {
				font-size: 24upx;
				color: #666;
				line-height: 50upx;
			}

			.span {
				font-size: 20upx;
				;
				color: #999;
				line-height: 30upx;
			}
		}

		.bott {
			float: right;
			color: #fff;
			margin: 80upx 20upx;
			padding: 10upx 20upx;
			border-radius: 30upx;
			font-size: 22upx;
			background: #cccccc;
		}
	}
</style>
