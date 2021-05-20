<template>
	<view class="pList">
		<view class="content">
			<view class="pXing">
				<view class="xin">
					<text>综合评价 :</text>
					<image src="../../static/xing_01.png" v-for="(i,n) in xingji" mode=""></image>
					<image src="../../static/xing6.png" v-if="!isInert" mode=""></image>
					<!-- <image src='../../static/xing.png' v-if="xingji<4" v-for='i in 5-xingji'></image> -->
				</view>
				<text class="man"><text>{{starNum}}</text>%满意度</text>
			</view>
			<!-- 评价列表 -->
			<view class="pingList" v-for="(item,index) in pingJList">
				<view class="imgTop">
					<view class="imgL">
						<image :src="item.userDTO.headimg" mode=""></image>
						<view class="xin">
							<text>{{item.userDTO.nickname}}</text>
							<image src="../../static/xing_01.png" v-for="(i,n) in item.xingji" mode=""></image>
							<image src="../../static/xing6.png" v-if="!item.isInert" mode=""></image>
						</view>
					</view>
					<view class="time">
						<text>{{item.createTime}}</text>
					</view>
				</view>
				<view class="guige">
					<text>已购："<text>{{item.specKey}}</text>"</text>
				</view>
				<!-- :style="item.storeGoodsReplyList.length>0&&item.storeGoodsReplyList!=null?'':'border-bottom: none'" -->
				<view class="pCont">
					<text>{{item.content?item.content:''}}</text>
					<view class="imgsBox">
						<view class="img" v-for="(val,i) in item.imgBox" @tap="previewImg(index,i)">
							<image :src="val" mode=""></image>
						</view>

					</view>
				</view>
				<!-- <view class="reply" v-for="(ite,inde) in item.storeGoodsReplyList">
					<text>商家回复：<text>{{ite.replyContent}}</text></text>
				</view> -->
			</view>

		</view>

		<!-- 弹出框 -->
		<view class="mask" v-if="isAdd" @tap="add">
		</view>
		<view class="butt" v-if="isAdd">
			<view class="mTop">
				<image class="cover" :src="list.goodsLogo" mode=""></image>
				<view class="mRight">
					<view class="price">¥ {{list.shopPrice}}</view>
					<view class="mItem">已选：{{gui}}</view>
				</view>

			</view>
			<view class="mButton">
				<view class="detail">

					<view v-for='(item,index) in guige'
						:style='indexx==index?"margin-top:10rpx;color:#2b5cff;":"margin-top:10rpx;color:#666;"'
						@tap='qiehuan(index)'>{{item.keyName}}</view>
				</view>

				<view class="mNumber">
					<view class="name">数量</view>
					<view class="n_right">
						<view class="reduce" @tap="reduce">-</view>
						<input class="cor" type="number" style='width:60rpx;' v-model="num"></input>
						<view class="add" @tap="jia">+</view>

					</view>
				</view>
				<view style='overflow:hidden;'>
					<button style='width:50%;float:left;' @tap='gouwuche'>加入购物车</button>
					<button class="btn" @tap='goumaia'>立即购买</button>
				</view>
			</view>
		</view>


		<!-- 底部 -->


	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsId: '',
				pingJList: {},
				isXing: '',
				isAdd: false,
				isCollect: '',
				canshu: {},
				pingjia: {},
				id: [],
				shuList: [],
				num: 1,
				list: {},
				guige: [],
				indexx: 0,
				gui: '',
				shopId: '',
				goodsId: '',
				xingji: 0,
				starNum: 0,
				isInert: '',
				page: 1,
				loadingType: 0,
			}
		},
		onLoad(option) {
			var _this = this
			this.goodsId = option.id
			this.$https({
					url: '/api/oauth/shop/goods-comm-list',
					data: {
						goodsId: option.id,
						page: this.page,
						limit: 10,
					},
					dengl: true,
					success: function(res) {
						if (res.data.data) {
							res.data.data.map(function(val, i) {
								if (val.img) {
									val.imgBox = val.img.split(',')
								}
								val.xingji = parseInt(val.goodsRank / 20)
								val.isInert = Number.isInteger(val.goodsRank / 20)
							})
						}
						_this.pingJList = res.data.data
					},
				}),
				this.$https({
					url: '/api/oauth/shop/store-shop-detail',
					data: {
						shopId: option.ids
					},
					success: function(res) {
						_this.starNum = res.data.data.starId
						_this.xingji = parseInt(res.data.data.starId / 20)
						_this.isInert = Number.isInteger(res.data.data.starId / 20)
					}
				})

		},

		onPullDownRefresh() {
			//下拉的生命周期
			this.getNews()
		},
		onReachBottom() {
			var data = {
				page: this.page + 1,
				limit: 10,
				goodsId: this.goodsId
			}
			this.getMoreNews(data)
		},
		methods: {
			previewImg(index,i) {
				console.log(index)
				let _this = this;
				let imgsArray = [];
				for (let i = 0; i < this.pingJList[index].imgBox.length; i++) {
					console.log()
					if (this.pingJList[index].imgBox[i]) {
						imgsArray.push(this.pingJList[index].imgBox[i]);
					}
				}
				console.log(imgsArray)

				uni.previewImage({
					current: i,
					urls: imgsArray,
					indicator: 'number',
					loop: true,
					longPressActions:true
				});

			},
			getNews() {
				this.page = 1
				var _this = this
				//标题读取样式激活
				uni.showNavigationBarLoading()
				this.$https({
					url: '/api/oauth/shop/goods-comm-list',
					data: {
						page: _this.page,
						limit: 10,
						goodsId: _this.goodsId
					},
					dengl: true,
					success: function(res) {
						if (res.data.data) {
							res.data.data.map(function(val, i) {
								if (val.img) {
									val.imgBox = val.img.split(',')
								}
								val.xingji = parseInt(val.goodsRank / 20)
								val.isInert = Number.isInteger(val.goodsRank / 20)
							})

						}
						_this.pingJList = res.data.data
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
					url: '/api/oauth/shop/goods-comm-list',
					dengl: true,
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
						if (res.data.data) {
							res.data.data.map(function(val, i) {
								if (val.img) {
									val.imgBox = val.img.split(',')
								}
								val.xingji = parseInt(val.goodsRank / 20)
								val.isInert = Number.isInteger(val.goodsRank / 20)
							})

						}
						_this.pingJList = _this.pingJList.concat(res.data.data)
						_this.loadingType = 0; //将loadingType归0重置
						uni.hideNavigationBarLoading(); //关闭加载动画
					}
				})
			},

			houtui() {
				uni.navigateTo({
					url: 'productDetails?id=' + this.goodsId
				})
			},
			add() {
				this.isAdd = !this.isAdd
			},
			reduce() {
				this.num--
				if (this.num <= 0) {
					this.num = 0
				}
			},
			jia() {
				this.num++
			},
			togLi(index, itemId) {
				// this.id =itemId ;
				this.$set(this.id, index, itemId)
			},
			isActive() {
				var _this = this
				if (!this.isCollect) {
					this.$https({
						url: '/api/shop/mall-add-collect',
						data: JSON.stringify({
							goodsId: this.goodsId
						}),
						method: 'POST',
						haeder: true,
						success: function(res) {
							_this.isCollect = !_this.isCollect
						}
					})
				} else {
					this.$https({
						url: '/api/shop/mall-cancel-collect',
						data: JSON.stringify({
							goodsId: this.goodsId
						}),
						method: 'POST',
						haeder: true,
						success: function(res) {
							_this.isCollect = !_this.isCollect
						}
					})
				}

			},
			jindian(shopId) {
				uni.navigateTo({
					url: '../shop/shop?id=' + shopId
				})
			},
			gouwuche: function() {
				this.$https({
					url: '/api/shop/order-add-cart',
					data: JSON.stringify({
						cartAttr: [{
							goodsNum: this.num,
							specKey: this.guige[this.indexx].key
						}],
						goodsId: this.goodsId,
						shopId: this.shopId
					}),
					method: 'post',
					haeder: true,
					success: function(res) {
						uni.showToast({
							title: res.data.message
						})
					}
				})
			},

			qiehuan: function(ind) {
				this.indexx = ind
				this.gui = this.guige[ind].keyName
			},
			goumaia: function() {
				uni.navigateTo({
					url: '../cart/orderForm/orderForm?goodsId=' + this.goodsId + '&cartAttr=' + JSON
						.stringify({
							cartAttr: [{
								goodsNum: this.num,
								specKey: this.guige[this.indexx].keyName,
								goodsLogo: this.list.goodsLogo,
								integral: this.list.integral,
								goodsName: this.list.goodsName,
								kuaidi: this.list.kuaidi,
								shopPrice: this.list.shopPrice,
								goodsId: this.list.goodsId,
								key: this.guige[this.indexx].key,
								shopId: this.shopId
							}]
						}) + '&dingdan=2'
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		padding-left: 25rpx;
		padding-right: 25rpx;

		.pXing {
			display: flex;
			height: 110rpx;
			width: 100%;
			line-height: 110rpx;

			justify-content: space-between;

			.xin {

				text {
					padding-right: 12rpx;
					font-size: 30rpx;
				}

				image {
					display: inline-block;
					width: 34rpx;
					height: 34rpx;
					padding-right: 8rpx;

				}
			}
		}

		.man {
			justify-content: space-between;
			font-size: 24rpx;
			color: #999999;


		}

		.pingList {

			background-color: #f5f5f5;
			box-sizing: border-box;
			width: 710upx;
			padding: 20upx;
			overflow: hidden;
			margin-bottom: 28rpx;

			.imgsBox {
				overflow: hidden;
			}

			.img {
				float: left;
			}

			.imgTop {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-bottom: 20upx;

				.imgL {
					display: flex;
					align-items: center;

					.xin {
						display: inline-block;
						padding-left: 15rpx;

						text {
							align-items: center;
							line-height: 80rpx;
							padding-right: 12rpx;
							font-size: 24rpx;
						}

						image {
							display: inline-block;
							width: 25rpx;
							height: 25rpx;
							padding-right: 6rpx;

						}
					}

					image {
						width: 80upx;
						height: 80upx;
						border-radius: 150upx;
					}
				}

				.time {
					font-size: 24rpx;
					color: #676767;
				}
			}

			.guige {
				font-size: 26rpx;
				color: #676767;
				// padding-bottom: 30rpx;
				line-height: 45rpx;
			}

			.pCont {
				font-size: 26rpx;
				line-height: 45rpx;
				// border-bottom: 1rpx solid #bfbfbf;
				// padding-bottom: 20rpx;

				image {
					display: block;
					width: 150rpx;
					height: 100rpx;
					padding-bottom: 12rpx;
					padding-top: 12rpx;
					padding-right: 12rpx;
				}

				text {
					line-height: 45rpx;
				}
			}

			.reply {
				padding-top: 10rpx;
				font-size: 26rpx;
				line-height: 45rpx;
				color: #666666;
			}
		}
	}


	.mask {
		width: 100%;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.6);
		position: fixed;
		z-index: 10;
		top: 0;
		left: 0;
	}

	.butt {
		width: 100%;
		height: 70%;
		// overflow-y: scroll;
		position: fixed;
		bottom: 0;
		left: 0;
		padding: 30upx;
		box-sizing: border-box;
		background-color: white;
		z-index: 20;
		border-top-left-radius: 5%;
		border-top-right-radius: 5%;
		z-index: 99999;

		.mTop {
			display: flex;
			align-items: center;
			height: 30%;
			justify-content: space-between;
			width: 100%;
			height: auto;
			// border-bottom: 1rpx solid #dddddd;
			padding-bottom: 30upx;
			box-sizing: border-box;

			.cover {
				width: 200upx;
				height: 200upx;
				margin-right: 20upx;
			}

			.mRight {
				flex: 1 auto;
				height: 200upx;
				display: flex;
				justify-content: space-between;
				flex-direction: column;

				.price {
					color: #ed2138;
					font-size: 30rpx;
					margin-top: 40rpx;
				}

				.mItem {
					color: #666666;
					font-size: 26rpx;
				}
			}

		}

		.mButton {
			width: 100%;
			height: 50%;

			.color,
			.mNumber {
				height: 30%;

				.bod {
					border: 1rpx solid #285cfe;
					color: #285cfe;
				}
			}

			.name {
				display: block;
				font-size: 28rpx;
				color: #aaaaaa;
				margin: 50rpx 0 30rpx 0;
			}

			.cor {
				font-size: 26rpx;
				padding: 10rpx 30rpx;
				display: inline-block;
				background-color: #f4f4f2;
				border-radius: 8%;
				margin-right: 30rpx;

			}

		}

		.mNumber {
			display: flex;
			justify-content: space-between;
			flex-direction: row;
			align-items: center;

			.name {}

			.n_right {
				display: flex;
				flex-direction: row;

				.cor {
					margin-left: 30rpx;
				}
			}
		}

		.btn {
			background-color: #2b5cff;
			color: #fefefe;
		}
	}


	.bottom {
		width: 750upx;
		height: 100upx;
		background-color: #fff;
		border-top: 1px solid #ccc;
		position: fixed;
		bottom: 0upx;
		left: 0upx;

		.leftA {
			float: left;
			padding-left: 20upx;
			width: 350upx;

			.kefua {
				float: left;
				padding: 20upx;

				image {
					padding-left: 5upx;
					width: 41upx;
					height: 38upx;
					float: left;
				}

				.keyboard {
					text {
						float: left;
						color: #333;
						font-size: 26upx;
					}
				}

			}



		}

	}

	.Box {
		float: left;

	}

	.detail {
		max-height: 200rpx;
		overflow-y: auto;
		text-align: center;
	}

	.rightA {
		width: 300upx;
		float: right;

	}

	.bottBoxss {

		float: right;
		width: 337rpx;
		padding: 20upx;
		height: 50upx;

		.onna {
			button {
				background-color: #007AFF !important;
				border: 1px solid #007AFF !important;
				color: #fff !important;
			}
		}

		.onnb {
			button {
				background-color: #fff !important;
				border: 1px solid #007AFF !important;
				color: #007AFF !important;
			}
		}

		.bott {
			display: block;
			width: calc(50% - 20rpx);
			margin-right: 20upx;
			float: right;

			button {
				padding: 0;
				background-color: #fff;
				border: 1px solid #999;
				border-radius: 40upx;
				font-size: 24upx;
				color: #999;
				font-family: Microsoft YaHei;
			}

		}
	}

	.rightA {
		width: 300upx;
		float: right;

	}

	.bottBoxss {

		float: right;
		width: 337rpx;
		padding: 20upx;
		height: 50upx;

		.onna {
			button {
				background-color: #007AFF !important;
				border: 1px solid #007AFF !important;
				color: #fff !important;
			}
		}

		.onnb {
			button {
				background-color: #fff !important;
				border: 1px solid #007AFF !important;
				color: #007AFF !important;
			}
		}

		.bott {
			display: block;
			width: calc(50% - 20rpx);
			margin-right: 20upx;
			float: right;

			button {
				padding: 0;
				background-color: #fff;
				border: 1px solid #999;
				border-radius: 40upx;
				font-size: 24upx;
				color: #999;
				font-family: Microsoft YaHei;
			}

		}
	}
</style>
