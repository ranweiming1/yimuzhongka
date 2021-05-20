<template>
	<view>
		<view class="shop-top">
			<view class="shop-bag">
				<image src="../../static/shopBagTwo.png" mode=""></image>
			</view>
			<view class="shop-search">
				<view class="shop-search-back" @tap='back'>
					<image src="../../static/icon_26-2.png" mode=""></image>
				</view>
				<view class="shop-search-input">
					<input type="text" @confirm="search" v-model="value" placeholder="请输入关键字" />
				</view>
			</view>
			<view class="shop-logo-swper">
				<swiper class="logo-swper-list" :current="currentIndex" :circular="true" next-margin="95rpx" :duration="100"
				 @change="swierChange">
					<swiper-item class="logo-swper-item" v-for="(item,i) in banner" :key="i">
						<image class="slide-image" :src="item.img" :class="currentIndex === i?'active':''" mode=""></image>
					</swiper-item>
				</swiper>
				<div class="logo-swper-dots">
					<div v-for="(item,i) in banner" class="dots-item">
						<div :class="i==currentIndex?'add-dots':'move-dots'"></div>
					</div>
				</div>
			</view>
		</view>
		<view class="shop-discount">
			<view class="shop-discount-top">
				<view class="discount-top-name">
					{{store.shopName}}
				</view>
				<view class="discount-top-icon">
					<image src="../../static/honerIcon.png" mode=""></image>
				</view>
				<view class="discount-top-bott" @tap="shouC(shopsId)">
					{{!isShow?'收藏':'取消收藏'}}
				</view>
			</view>
			<view class="shop-discount-center">
				<view class="discount-center-xing">
					<view class="xing-item" v-for="(item,i) in 5">
						<image src="../../static/xing_icon.png" mode=""></image>
					</view>
				</view>
				<view class="discount-center-score">
					5分
				</view>
			</view>

			<view class="shop-coupon" v-if="quan.length>0">
				<scroll-view scroll-x="true" style="width: 100%;">
					<view class="coupon-item" v-for="(item,i) in quan">
						<view class="shop-coupon-img">
							<image src="" :src="(i%2==0)?'../../static/coupon_odd.png':'../../static/coupon_even.png'" mode=""></image>
						</view>
						<view class="coupon-icon" :style="(i%2)?'background: #b8bdcd;':'background: #ffbe71;'">
							优惠
						</view>
						<view class="coupon-price">
							<text style="font-size: 26rpx;display:block; float: left;margin-top: 2rpx;">￥</text>{{item.money}}
						</view>
						<view class="coupon-right">
							<view class="coupon-right-man">
								满{{item.condition}}元可用
							</view>
							<view class="coupon-right-data">
								有效期至 2020
							</view>
						</view>
					</view>

				</scroll-view>
			</view>
		</view>
		<view class="shop-company">
			<view class="shop-company-name">
				<view class="company-name-title">
					公司简介
				</view>
				<view class="company-name-right">
					<image src="../../static/icon_26.png" mode=""></image>
				</view>
			</view>
			<view class="shop-company-content">
				<text>
					公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介
				</text>
			</view>
		</view>
		<view class="shop-classify">
			<scroll-view class="shop-classify-scroll" scroll-x="true" style="width: 100%;">
				<view class="classify-scroll-item" v-for="(item,i) in typeList">{{item.cateTitle}}</view>

			</scroll-view>
		</view>
		<view class="shop-hort">
			<view class="hort-title">
				<view class="hort-title-left">
					热门产品
				</view>
				<view class="hort-title-right">
					热
				</view>
			</view>
			<view class="hort-list">
				<view class="hort-list-item" v-for="(item,i) in gList" @tap="detail(item.goodsId)">
					<view class="list-item-logo">
						<image :src="item.goodsLogo"  mode=""></image>
					</view>
					<view class="list-item-right">
						<view class="item-right-title">
							{{item.goodsName}}
						</view>
						<view class="item-right-spec" v-if="false">
							商品规格
						</view>
						<view class="item-right-bottom">
							<view class="item-right-price">
								￥{{item.marketPrice?item.marketPrice.toFixed(2):'暂无价格'}}
							</view>
							<view class="item-right-sales">
								{{item.salesSum}}人已付款
							</view>
						</view>
					</view>

				</view>
			</view>
		</view>


		<buttom bottom="1" :can="shopsId"></buttom>
	</view>
</template>

<script>
	import buttom from '../cart/dbottom.vue'
	export default {
		data() {
			return {
				currentIndex: 0,
				banner: [],
				store: {},
				isShow: '',
				gList: [],
				typeList: [],
				quan: [],
				value: '',
				shopsId: ''

			}
		},
		components: {
			buttom
		},
		onLoad(option) {
			var _this = this
			this.shopsId = option.id
			this.$https({
				url: '/api/oauth/shop/store-index',
				data: {
					shopId: option.id
					// shopId: 10
				},
				success: function(res) {
					_this.store = res.data.data.storeShop
					_this.gList = res.data.data.goodsList
					_this.ban = res.data.data.banners
					_this.youhui = res.data.data.goodsList.couponDTOS

				}

			})
			this.$https({
				url: '/api/oauth/shop/store-shop-detail',
				data: {
					shopId: option.id
				},
				dengl: true,
				success: function(res) {
					_this.isShow = res.data.data.shopCollectStatus
				}
			})
			// 分类
			this.$https({
				url: '/api/oauth/get-one-list',
				data: {
					// shopId: option.id
				},
				dengl: true,
				success: function(res) {
					_this.typeList = res.data.data
				}
			})
			this.$https({
					url: '/api/oauth/shop/get-store-banner-list',
					data: {
						shopId: option.id
					},
					method: 'post',
					success: res => {
						this.banner = res.data.data
					}
				}),
				this.$https({
					url: '/api/oauth/shop/store-coupon-list',
					data: {
						shopId: option.id
					},
					success: res => {
						this.quan = res.data.data
					}
				})
		},
		methods: {
			swierChange: function(e) {
				this.currentIndex = e.detail.current
			},
			back: function() {
				uni.navigateBack({
					delta: 1
				})
			},
			detail(id) {
				uni.navigateTo({
					url: '../index/productDetails?id=' + id
				})
			},
			search() {
				uni.navigateTo({
					url: './all?shopsId=' + this.shopsId + '&keywords=' + this.value
				})
				this.value = ''
			},
			shouC(id) {
				if (this.denglufangfatiaozhuan()) {
					var _this = this
					this.$https({
						url: '/api/shop/shop-collect',
						data: {
							shopId: id
						},
						method: 'POST',
						success: function(res) {
							_this.isShow = !_this.isShow
						},

					})
				}
			},
		},
		components: {
			buttom
		},
	}
</script>

<style lang="scss">
	page {
		background-color: #f6f6f6;
		color: #181818;
	}

	.shop-top {
		.shop-bag {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;

			image {
				width: 100%;
				height: 450rpx;
			}
		}

		.shop-search {
			position: relative;
			overflow: hidden;
			margin-top: 90rpx !important;

			.shop-search-back {
				float: left;
				padding: 15rpx 35rpx;
				height: 100%;


				image {
					width: 18rpx;
					height: 32rpx;
					display: inline-block;

				}
			}

			.shop-search-input {
				float: left;
				background-color: rgba(255, 255, 255, 0.6);
				border-radius: 50upx;
				margin-left: 50rpx;

				input {
					height: 60upx;
					width: 520upx;
					line-height: 60upx;
					padding-left: 20upx;
					font-size: 26upx;
				}

			}
		}

		.shop-logo-swper {
			width: 100%;
			margin-left: 30rpx;
			position: relative;
			top: 40rpx;
			box-sizing: border-box;

			.logo-swper-dots {
				overflow: hidden;
				position: absolute;
				bottom: 20rpx;
				right: 150rpx;

				.dots-item {
					float: left;
					margin-right: 6rpx;
				}

				.move-dots {

					width: 10rpx;
					height: 10rpx;
					border-radius: 50%;
					background-color: #edebe9;

				}

				.add-dots {
					width: 30rpx;
					height: 12rpx;
					background: #ff6600;
					border-radius: 8rpx;
				}
			}



			.logo-swper-list {
				// width: 625rpx;
				height: 313rpx;
				// border-radius: 20rpx;
				overflow: hidden;

				.slide-image {
					position: absolute;
					height: 260rpx;
					width: 520rpx;
					opacity: 0.7;
					margin-right: 20rpx;
					border-radius: 20rpx;
					overflow: hidden;
					top: 52rpx;
				}

				.active {
					width: 626rpx;
					height: 313rpx;
					opacity: 1;
					z-index: 10;
					border-radius: 20rpx;
					overflow: hidden;
					top: 0;

					transition: all 0.2s ease-in 0s;
				}

			}
		}
	}

	.shop-discount {
		background-color: #fff;
		padding: 90rpx 30rpx 20rpx 30rpx;

		.shop-discount-top {
			overflow: hidden;

			.discount-top-name {
				font-size: 34rpx;
				color: #181818;
				float: left;
				margin-right: 30rpx;
			}

			.discount-top-icon {
				float: left;

				image {
					height: 30rpx;
					width: 20rpx;
					display: inline-block;
					vertical-align: middle;
				}
			}

			.discount-top-bott {
				height: 50rpx;
				width: 140rpx;
				line-height: 50rpx;
				box-sizing: border-box;
				border: 2rpx solid #ff6600;
				float: right;
				border-radius: 40rpx;
				text-align: center;
				color: #ff6600;
				font-size: 24rpx;
				margin-right: 20rpx;
			}
		}

		.shop-discount-center {
			overflow: hidden;
			line-height: 50rpx;
			margin-bottom: 20rpx;

			.discount-center-xing {
				float: left;
				margin-right: 10rpx;

				.xing-item {
					float: left;
					margin-right: 6rpx;

					image {
						height: 22rpx;
						width: 22rpx;
					}
				}
			}

			.discount-center-score {
				float: left;
				font-size: 20rpx;
				color: #ff6600;
				vertical-align: middle;
			}
		}

		.shop-coupon {
			width: 100%;

			scroll-view {
				height: 120rpx;
				white-space: nowrap;

				.coupon-item:nth-child(even) .coupon-icon {
					color: #737889;
				}

				.coupon-item:nth-child(odd) .coupon-icon {
					color: #FF6600;
				}

				.coupon-item {
					height: 120rpx;
					display: inline-block;
					width: calc((100% - 10rpx)/2);
					margin-right: 10rpx;
					position: relative;
					border-radius: 15rpx;
					overflow: hidden;

					.shop-coupon-img {
						position: absolute;
						width: 100%;
						height: 120rpx;

						image {
							width: 100%;
							height: 120rpx;
							display: block;
						}
					}

					.coupon-icon {
						font-size: 23rpx;
						opacity: 0.5;
						width: 130rpx;
						text-align: center;
						height: 36rpx;
						line-height: 36rpx;
						border-bottom-right-radius: 15rpx;
					}

					.coupon-price {
						position: relative;
						color: #fff;
						float: left;
						margin: 20rpx 15rpx 25rpx 30rpx;
						font-size: 38rpx;
					}

					.coupon-right {
						position: relative;
						color: #fff;

						.coupon-right-man {
							font-size: 26rpx;
							margin-bottom: 10rpx;
						}

						.coupon-right-data {
							font-size: 20rpx;
						}
					}

				}
			}
		}


	}

	.shop-company {
		width: 100%;
		box-sizing: border-box;
		padding: 30rpx 40rpx 20rpx 30rpx;
		background-color: #fff;
		margin-top: 10rpx;
		height: 200rpx;

		.shop-company-name {
			font-size: 24rpx;
			margin-bottom: 20rpx;
			overflow: hidden;

			.company-name-title {
				float: left;
			}

			.company-name-right {
				float: right;

				image {
					width: 14rpx;
					height: 22rpx;
				}
			}
		}

		.shop-company-content {
			font-size: 22rpx;
			line-height: 35rpx;

			text {
				word-break: break-word;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 3;
				-webkit-box-orient: vertical;
			}

		}

	}

	.shop-classify {
		padding: 0 30rpx;

		.shop-classify-scroll {
			white-space: nowrap;
			height: 100rpx;
			line-height: 100rpx;

			.classify-scroll-item {
				font-size: 30rpx;
				display: inline-block;
				margin-right: 35rpx;
			}

			.classify-scroll-item:last-child {
				margin-right: 0;
			}
		}

	}

	.shop-hort {
		background-color: #fff;

		.hort-title {
			overflow: hidden;
			height: 45rpx;
			padding-top: 30rpx;
			padding-left: 30rpx;

			.hort-title-left {
				font-size: 30rpx;
				color: #181818;
				float: left;
			}

			.hort-title-right {
				height: 34rpx;
				line-height: 34rpx;
				font-size: 24rpx;
				color: #ff4267;
				border: 2rpx solid #ff4267;
				box-sizing: border-box;
				width: 48rpx;
				text-align: center;
				float: left;
				border-radius: 20rpx;
				background: #ffecf0;
				margin-left: 12rpx;
			}
		}

		.hort-list {

			.hort-list-item {
				overflow: hidden;
				padding: 20rpx 30rpx;
				border-bottom: 1rpx solid #f6f6f6;

				.list-item-logo {
					float: left;

					image {
						width: 200rpx;
						height: 200rpx;
						border-radius: 15rpx;
						overflow: hidden;
						display: block;
					}
				}

				.list-item-right {
					width: calc(100% - 200rpx);
					float: left;
					box-sizing: border-box;
					padding-left: 20rpx;
					height: 200rpx;
					position: relative;

					.item-right-title {
						font-size: 26rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}

					.item-right-spec {
						line-height: 52rpx;
						font-size: 22rpx;
						color: #bcbcbc;
						background: #f8f8f8;
						width: fit-content;
						padding: 0 15rpx;
						border-radius: 6rpx;
						margin-top: 6rpx;
					}

					.item-right-bottom {
						overflow: hidden;
						font-size: 24rpx;
						position: absolute;
						bottom: 10rpx;

						.item-right-price {
							float: left;
							color: #ed5d1f;

							text {
								font-size: 11px;
								display: inline-block;
								float: left;
								margin-right: 9rpxr
							}
						}

						.item-right-sales {
							color: #9b9b9b;
							margin-left: 35rpx;
							float: left;
						}
					}
				}
			}



		}


	}
</style>
