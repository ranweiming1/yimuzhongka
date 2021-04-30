<template>
	<view>
		<!-- 导航栏-->
		<view class="navBar">
			<view class="naviL" @tap="naviBack">
				<image src="../../static/icon_26-2.png" mode=""></image>
			</view>
			<!-- <view class="naviR">
				<view class="right_L" @tap="naviBack" v-if='titleIndex!=1'>
					商品
					<view class="add" v-if="titleIndex==0">
						<image src="../../static/icon_09.png" mode=""></image>
					</view>
				</view>
				<view class="right_R" @tap="toggle(1)" :style='titleIndex==1?"float:none;margin:0 auto;":""'>
					<text>店铺</text>

					<view class="add" v-if="titleIndex==1">
						<image src="../../static/icon_09.png" mode=""></image>
					</view>
				</view>
			</view> -->
			<view class="text-title">
				<text>店铺</text>
			</view>

		</view>
		<!-- 列表 -->
		<view class="content">
			<view class="content-item" v-for="(item,i) in shopList">
				<view class="item-title">
					<view class="item-title-logo fl">
						<image :src="item.storeLogo" mode=""></image>
					</view>
					<view class="item-title-center fl">
						<view class="center-shopName">
							{{item.shopName}}
						</view>
						<view class="center-honor">
							<view class="center-honorList" v-for="(item,i) in 5">
								<image src="../../static/xing_icon1.png" mode=""></image>
							</view>
							<view class="center-honorList text">{{item.starId}}</view>
						</view>
					</view>
					<view class="item-title-right fr" @tap="shopDetail(item.id)">
						进店逛逛
					</view>
				</view>
				<view class="item-list">
					<view class="itemsList fl" v-for="(ite,t) in item.goodsDTOList">
						<view class="list-img" @tap="detail(ite.goodsId)">
							<image :src="ite.goodsLogo" mode=""></image>
						</view>
						<view class="list-name">
							{{ite.goodsName}}
						</view>
						<view class="list-price">
							￥{{ite.marketPrice?ite.marketPrice.toFixed(2):'暂无价格'}}
						</view>
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
				titleIndex: 1,
				page: 1,
				loadingType: 0,
				shopList: []
			}
		},
		onLoad() {
			this.load()
		},
		methods: {
			toggle(index) {
				this.titleIndex = index
			},
			detail(id){
				console.log(id)
				uni.navigateTo({
					url:'../index/productDetails?id='+id
				})
			},
			naviBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			shopDetail(id) {
				uni.navigateTo({
					url: './shop?id=' + id
				})
			},
			load: function() { //第一次回去数据
				var _this = this;
				this.loadingType = 0;
				uni.showNavigationBarLoading();
				this.$https({
					url: '/api/shop/store-shop-list',
					data: {
						limit: 10,
						page: 1
					},
					dengl: false,
					success: function(res) {
						console.log(res.data.data)
						_this.shopList = res.data.data
						if (res.data.data.length < 10) {
							// uni.showToast({
							// 	title: '已是最新',
							// 	duration: 2000
							// });
							_this.loadingType = 2
						}
						uni.hideNavigationBarLoading(); //关闭加载动画
						uni.stopPullDownRefresh();
					}

				})
			},
		},
		onReachBottom: function() {
			var _this = this
			this.page++; //每触底一次 page +1
			if (_this.loadingType != 0) { //loadingType!=0;直接返回
				return false;
			}
			this.loadingType = 1;
			// console.log(page);
			uni.showNavigationBarLoading(); //显示加载动画
			this.$https({
				url: '/api/shop/store-shop-list',
				dengl: false,
				data: {
					limit: 10,
					page: this.page
				},
				success: function(res) {
					_this.shopList = _this.shopList.concat(res.data.data)
					if (res.data.data.length < 10) { //没有数据
						_this.loadingType = 2;
						uni.hideNavigationBarLoading(); //关闭加载动画
					} else {
						_this.loadingType = 0; //将loadingType归0重	
					}
					uni.hideNavigationBarLoading(); //关闭加载动画

				}
			});

		},
	}
</script>

<style lang="scss">
	page {
		background-color: #e5e5e5;
	}

	.navBar {
		overflow: hidden;
		background-color: #FFFFFF;
		border-bottom: 1rpx solid #e5e5e5;
		padding-top: 70rpx !important;
		height: 90rpx;
		line-height: 90rpx;
		font-size: 32rpx;
		text-align: center;
		position: fixed;
		top: 0;
		left: 0;
		background: #fff;
		z-index: 999;
		right: 0;

		.text-title {
			display: inline-block;
			margin-right: 90rpx;

			text {
				font-size: 32rpx;
			}
		}

		.naviL {
			float: left;
			width: 90rpx;
			height: 90rpx;


			image {
				width: 18rpx;
				height: 32rpx;
				display: block;
				padding: 29rpx 32rpx;
			}

		}

		.naviR {

			.right_L,
			.right_R {
				width: 50%;
				text-align: center;
				font-size: 32rpx;
				color: #666;
			}

			.add {
				width: 34rpx;
				height: 6rpx;
				background-color: #2b5cff;
				margin-left: 50%;
				transform: translateX(-18rpx);
				margin-top: 16rpx;
				margin-bottom: 10rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.right_L {
				float: left;
			}

			.right_R {
				float: right;
			}
		}
	}

	.fl {
		float: left;
	}

	.fr {
		float: right;
	}

	// 列表
	.content {
		background-color: #e5e5e5;
		padding: 28rpx;
		margin-top: 160rpx;

		.content-item {
			background-color: #FFFFFF;
			padding: 22rpx;
			border-radius: 15rpx;
			overflow: hidden;
			margin-bottom: 25rpx;

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
						height: 200rpx;

						image {
							width: 100%;
							display: block;
							height: 200rpx;
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
</style>
