<template>
	<view :class="xiana==2?'back':''">
		<!-- 状态栏 -->
		<view class="topBox">
			<!-- 默认样式 -->
			<view class="none" @tap='shangpin'>
				<view class="ontext">
					<text>商品</text>
				</view>
				<view v-if='xiana==1' class='onimg'>
					<image src='../../static/icon_09.png'></image>
				</view>
			</view>

			<!-- 选中样式 -->
			<view class="none on" @tap='dianpuyangshi'>
				<view class="ontext">
					<text>店铺</text>
				</view>
				<view v-if='xiana==2' class="onimg">
					<image src="../../static/icon_09.png" mode=""></image>
				</view>
			</view>
		</view>

		<!-- 列表 -->
		<view v-if="(xiana==1&&shopList==0)||(xiana==2&&storeList==0)" >
			<image src='../../static/d.png' style='width:283rpx;height:184rpx;display:block;margin:50rpx auto;'>
			</image>
			<view style='text-align:center;'>暂无收藏</view>
		</view>
		<view class="contents" v-if='xiana==2'>
			<view class="content-item" v-for="(item,i) in storeList" v-if="item.storeShopDTO&&item.storeShopDTO!=null"  @tap="shopDetail(item.storeShopDTO.id)">
				<view class="item-title">
					<view class="item-title-logo fl">
						<image :src="item.storeShopDTO.storeLogo" mode=""></image>
					</view>
					<view class="item-title-center fl">
						<view class="center-shopName">
							{{item.storeShopDTO.shopName}}
						</view>
						<view class="center-honor">
							<view class="center-honorList" v-for="(item,i) in item.star">
								<image src="../../static/xing_icon1.png" mode=""></image>
							</view>
							<view class="center-honorList" v-if="!item.isInert">
								<image src="../../static/xingxing1.png" mode=""></image>
							</view>
							<view class="center-honorList text">{{(item.storeShopDTO.starId/20)}}</view>
						</view>
					</view>
					<view class="item-title-right fr" @tap="shopDetail(item.storeShopDTO.id)">
						进店逛逛
					</view>
				</view>
				<view class="item-list">
					<view class="itemsList fl" v-for="(i,t) in item.storeShopDTO.goodsDTOList ">
						<view class="list-img">
							<image :src="i.goodsLogo" mode=""></image>
						</view>
						<!-- <view class="list-name">
							{{i.goodsName}}
						</view> -->
						<!-- <view class="list-price">
							￥{{i.marketPrice?i.marketPrice.toFixed(2):'暂无价格'}}
						</view> -->
					</view>
				</view>
			</view>
		</view>

		<view class='hahah list uni-flex uni-column' v-if='xiana==1'>
			<view class='content' v-for="(item,index) in shopList" @tap="detail(item.goodsId)" v-if='item'>
				<view class='imgBox'>
					<image :src="item.goodsLogo" mode='widthFix'></image>
				</view>
				<view class='txt_a'>
					<view class="txt_title">
						<view class="titleText"><text class='span_a' v-if="item.selfStatus=='Y'">自营</text>{{item.goodsName}}</view>
					</view>

					<view class='txt_aa'>
						<text v-for="(ite,inde) in item.couponDTOS">满{{ite.condition}}-{{ite.money}}元</text>
					</view>
					<view class='txt_aas'>
						<view class="view"><text>{{item.shopPrice?'￥'+item.shopPrice:'暂无价格'}}</text></view>
						<view style='text-align:right;color:#666;font-size:22rpx;font-weight: bold;'>{{item.sendAddr}}</view>
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
				xiana: 1,
				shopList: [],
				storeList: [],
			}
		},
		onLoad: function() {
			var _this = this
			this.$https({
				url: '/api/user/my-collects',
				data: {},
				dengl: false,
				success: function(res) {
					_this.shopList = res.data.data

				}
			})
		},
		onShow() {
			if(this.xiana==1){
				this.shangpin()
			}else{
				this.dianpuyangshi()
			}
		},

		methods: {
			shangpin: function() {
				this.xiana = 1
				var _this = this
				this.$https({
					url: '/api/user/my-collects',
					data: {},
					dengl: false,
					success: function(res) {
						_this.shopList = res.data.data
				
					}
				})
			},
			dianpuyangshi: function() {
				var _this = this
				this.xiana = 2
				this.$https({
					url: '/api/shop/shop-collect-list',
					data: {},
					dengl: false,
					success: function(res) {
						if (res.data.data) {
							res.data.data.map(function(item) {
									item.isInert = Number.isInteger(item.starId / 20)
									item.star=parseInt((item.storeShopDTO.starId)/20)
							})
						}
						_this.storeList = res.data.data
					}
				})
			},
			shopDetail(id) {
				uni.navigateTo({
					url: '../shop/shop?id=' + id
				})
			},
			detail(id) {
				uni.navigateTo({
					url: '../index/productDetails?id=' + id
				})
				this.$https({
					url: '/api/shop/goods-brows-history-add',
					data: {
						goodsId: id
					},
					method: 'POST',
					dengl: true,
					success(res) {}
				})
			},
			jindian(id) {
				uni.navigateTo({
					url: '../shop/shop?id=' + id
				})
			}

		},

	}
</script>

<style lang="scss">
	page{
		background-color: #f7f7f7;
	}
	.topBox {
		overflow: hidden;
		border-bottom: 1px solid #f0f0f0;
		width: 710upx;
		padding: 20upx 20upx 0 20upx;
		background-color: #FFFFFF;

		.on {
			.ontext {
				text {
					color: #333 !important;
				}
			}
		}



		.none {
			text-align: center;
			float: left;
			width: 50%;

			.ontext {
				text {
					font-size: 30upx;
					color: #999;
				}
			}

			.onimg {
				margin-left: 45%;
				margin-top: 20upx;

				image {
					display: block;
					width: 34upx;
					height: 6upx;
				}
			}
		}
	}

	.back {
		position: fixed;
		top: 0;
		bottom: 0;
		background: #f7f7f7;
	}

	.listBox {
		width: 690upx;
		overflow: hidden;
		padding: 20upx;

		.liBox {
			padding: 10upx;
			float: left;
			width: 100%;
			border-radius: 10upx;
			margin-bottom: 20upx;
			box-shadow: 0 0 10upx #ccc;

			.imgBox {
				float: left;

				image {
					width: 100upx;
					height: 100upx;
					border-radius: 100upx;
				}
			}

			.texBox {
				float: left;
				padding-left: 20upx;

				.h2Box {
					padding-top: 5upx;

					text {
						line-height: 50upx;
						font-size: 32upx;
						color: #333;
					}
				}

				.spanBox {
					text {
						font-size: 24upx;
						color: #333;
					}
				}
			}

			.bottBox {
				float: right;
				margin-top: 25upx;
				margin-right: 10upx;

				text {
					font-size: 20upx;
					color: #999;
					float: left;
					padding: 5upx 20upx;
					line-height: 40upx;
					background-color: #fff;
					border: 1px solid #ccc;
					border-radius: 50upx;
				}
			}
		}
	}

	// 列表
	.fl {
		float: left;
	}

	.fr {
		float: right;
	}

	.contents {
		// background-color: #e5e5e5;
		padding: 28rpx;

		.content-item {
			background-color: #FFFFFF;
			padding: 22rpx;
			border-radius: 15rpx;
			overflow: hidden;
			margin-bottom:30rpx;
			box-shadow: 0 0 6rpx #ccc;


			.item-title {
				overflow: hidden;

				.item-title-logo {
					image {
						width: 96rpx;
						height: 96rpx;
						border-radius: 50%;
						border: 1rpx solid #e5e5e5;
					}
				}


			}

			.item-title-center {
				margin-top: 10rpx;
				margin-left: 15rpx;
				font-size: 30rpx;

				.center-honor {
					display: flex;
					margin-top: 15rpx;

					.text {
						color: #666;
						font-size: 24rpx;
						margin-left: 10rpx;
					}

					.center-honorList {
						width: 25rpx;
						height: 25rpx;
						margin-right: 6rpx;
						line-height: 25rpx;

						image {
							width: 100%;
							height: 100%;
						}

					}
				}
			}

			.item-title-right {
				width: 130rpx;
				height: 50rpx;
				line-height: 50rpx;
				border-radius: 45rpx;
				text-align: center;
				color: #999999;
				font-size: 22rpx;
				border: 2rpx solid #999999;
				box-sizing: border-box;
				margin-top: 24rpx;
			}

			.item-list {
				width: 100%;
				overflow: hidden;
				margin-top: 40rpx;

				.itemsList {
					width: calc((100% - 20rpx)/3);
					margin-right: 10rpx;
					font-size: 22rpx;
					color: #333333;

					.list-img {
						border-radius: 15rpx;
						overflow: hidden;

						image {
							width: 100%;
							height: 160rpx;
							display: block;
						}
					}

					.list-name {
						margin-top: 20rpx;
					}

					.list-price {
						font-size: 20rpx;
						color: #fa3535;
						margin-top: 10rpx;
						margin-bottom: 10rpx;
					}
				}

				.itemsList:last-child {
					margin-right: 0;
				}
			}



		}
	}

	.list {
		overflow: hidden;
		// column-count: 2;
		// column-gap: 25rpx;
		padding-left: 30rpx;
		padding-right: 30rpx;
	}
	.content:nth-child(even){
		float: right;
	}
	.content {
		// break-inside: avoid;
		box-sizing: border-box;

		margin-top: 30upx;
		margin-bottom: 10upx;
		display: block;
		width: calc(50% - 15rpx);
		// margin-left: 25upx;
		float: left;
		box-shadow: 0 0 5upx #ccc;
		border-radius: 20upx;
		padding-bottom: 20upx;
		overflow: hidden;
		height: 500rpx;
		box-sizing: border-box;
		background-color: #fff;

		.imgBox {
			overflow: hidden;
			image {
				width: 100%;
				height: 320rpx!important;
				float: left;
			}
		}

		.txt_a {
			padding-top: 10upx;
			width: 90%;
			margin-left: 20upx;
			float: left;
			.titleText {
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}
			.txt_title{
				view{
					
				width: 100%;
				font-size: 26upx;
				}
			}
			text {
				font-size: 26upx;
			
			}

			.span_a {
				background-color: #fff;
				color: #ff6600;
				border: 1px solid #ff6600;
				border-radius: 5upx;
				padding: 5upx 10upx;
				font-size: 18upx;
				margin-right: 10upx;
				line-height: 20upx;
				display: inline-block;
				border-radius: 6rpx;
				vertical-align: middle;
			}

			.txt_aa {
				text {
					border: 1px dotted #ff3333;
					background-color: #fff;
					font-size: 16upx;
					line-height: 30upx;
					padding: 5upx 10upx;
					color: #ff3333;
					margin-right: 20upx;
					font-size: 20upx;
				}
			}

			.txt_aas {
				padding-top: 10upx;
				overflow: hidden;
				.view {
					color: #333;
					font-size:26upx;
					float: left;

					text {
						color: #ff3333;
						font-size: 26upx;
						font-weight: bold;
					}
				}

				text:nth-child(2) {
					color: #999999;
					font-size: 24upx;
					float: right;
					line-height: 50upx;
				}
			}
		}
	}
</style>
