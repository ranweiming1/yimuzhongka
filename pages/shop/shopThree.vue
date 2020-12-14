<template>
	<view>
		<view class="shop-top">
			<view class="shop-bag">
				<swiper class="logo-swper-list" :current="currentIndex" :circular="true" :duration="100" @change="swierChange">
					<swiper-item class="logo-swper-item" v-for="(item,i) in 5" :key="i">
						<image src="../../static/shopBagThree.png" mode=""></image>
					</swiper-item>
				</swiper>
				<view class="swper-item-icon">
					<text>高分好店</text><text>4.8分</text>
				</view>
				<div class="logo-swper-dots">
					<div v-for="(item,i) in 5" class="dots-item">
						<div :class="i==currentIndex?'add-dots':'move-dots'"></div>
					</div>
				</div>
			</view>
			<view class="shop-search">
				<view class="shop-search-back" @tap='back'>
					<image src="../../static/icon_26-2.png" mode=""></image>
				</view>
				<view class="shop-search-input">
					<input type="text" placeholder="请输入关键字" />
				</view>
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

		<view class="shop-discount">
			<view class="shop-discount-top">
				<view class="discount-top-name">
					开山东开创集团
				</view>
				<view class="discount-top-icon">
					<image src="../../static/honerIcon.png" mode=""></image>
				</view>
				<view class="discount-top-bott">
					收藏
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

			<view class="shop-coupon">
				<scroll-view scroll-x="true" style="width: 100%;">
					<view class="coupon-item" v-for="(item,i) in 5">
						<view class="shop-coupon-img">
							<image src="" :src="(i%2==0)?'../../static/coupon_odd.png':'../../static/coupon_even.png'" mode=""></image>
						</view>
						<view class="coupon-icon" :style="(i%2)?'background: #b8bdcd;':'background: #ffbe71;'">
							优惠
						</view>
						<view class="coupon-price">
							<text style="font-size: 26rpx;display:block; float: left;margin-top: 2rpx;">￥</text>500
						</view>
						<view class="coupon-right">
							<view class="coupon-right-man">
								满1000元可用
							</view>
							<view class="coupon-right-data">
								有效期至 2020
							</view>
						</view>
					</view>

				</scroll-view>
			</view>
		</view>


		<view class="shop-classify">
			<scroll-view class="shop-classify-scroll" scroll-x="true" style="width: 100%;">
				<view class="classify-scroll-item" v-for="(item,i) in 5">这是分类</view>

			</scroll-view>
		</view>
		<view class="shop-hort">
			<view class="hort-title">
				<view class="hort-title-left">
					<text class="text-line" style="padding-right: 8rpx;">——</text>
					<text style="display: inline-block;position: relative;">热门商品<text class="text-yuan"></text></text>
					<text class="text-line" style="padding-left: 8rpx;">——</text>
				</view>

			</view>
			<view class="hort-list">
				<view class="hort-list-item" v-for="(item,i) in 5">
					<view class="list-item-logo">
						<image class="logo-border" src="../../static/bckBorder.png" mode=""></image>
						<image src="../../static/Bitmap.png" mode=""></image>
					</view>
					<view class="list-item-right">
						<view class="item-title">
							<view class="hort-title-right">
								热
							</view>
							<view class="item-right-title">
								商品名称商品名称商品名称
							</view>
						</view>
						<view class="item-right-bottom">
							<view class="item-right-price">
								<text>￥</text>价格
							</view>
							<view class="item-right-sales">
								8978人已付款
							</view>
						</view>
					</view>

				</view>
			</view>
		</view>


		<buttom bottom="4" :can="shopsId"></buttom>
	</view>
</template>

<script>
	import buttom from '../cart/dbottom.vue'
	export default {
		data() {
			return {
				currentIndex: 0
			}
		},
		methods: {
			swierChange(e) {
				this.currentIndex = e.detail.current
			},
			back: function() {
				uni.navigateBack({
					delta: 1
				})
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
			position: relative;
			top: 0;
			left: 0;
			right: 0;

			swiper {
				height: 470rpx;
			}

			image {
				width: 100%;
				height: 100%;

			}


			.swper-item-icon {
				position: absolute;
				color: #000f20;
				top: 190rpx;
				left: 40rpx;
				height: 50rpx;
				line-height: 50rpx;
				width: 245rpx;
				font-size: 24rpx;
				border-radius: 10rpx;
				overflow: hidden;

				text:first-child {
					display: inline-block;
					background: #f5d14a;
					width: 156rpx;
					text-align: center;
				}

				text:last-child {
					text-align: center;
					background: #fff;
					display: inline-block;
					width: calc(100% - 156rpx);
				}
			}

			.logo-swper-dots {
				overflow: hidden;
				position: absolute;
				bottom: 40rpx;
				right: 40rpx;

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
					background: #f4cc3d;
					border-radius: 8rpx;
				}
			}


		}

		.shop-search {
			position: absolute;
			overflow: hidden;
			margin-top: 90rpx !important;
			top: 0;

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

	}

	.shop-discount {
		background-color: #fff;
		padding: 35rpx 30rpx 20rpx 30rpx;

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
		height: 200rpx;
		position: relative;
		top: -20rpx;
		border-top-left-radius: 25rpx;
		border-top-right-radius: 25rpx;

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
				text-align: center;

				.text-line {
					color: #ed5d1f;

				}

				.text-yuan {
					width: 10rpx;
					height: 10rpx;
					background: #ed5d1f;
					display: inline-block;
					border-radius: 50%;
					position: absolute;
					top: 2.5rpx;
					right: -5px;
				}
			}

		}

		.hort-list {
			margin: 30rpx 28rpx;
			overflow: hidden;

			.hort-list-item:nth-child(odd) {
				float: left;
			}

			.hort-list-item:nth-child(even) {
				float: right;
			}

			.hort-list-item {
				border-bottom: 1rpx solid #f6f6f6;
				width: calc((100% - 28rpx)/2);
				box-sizing: border-box;
				height: 420rpx;
				border-radius: 15rpx;
				overflow: hidden;
				margin-bottom: 28rpx;
				box-shadow: 0 1px 2px 1px rgba(0, 19, 41, 0.08);

				.list-item-logo {
					width: 100%;
					height: 296rpx;
					box-sizing: border-box;
					position: relative;

					.logo-border {
						position: absolute;
					}

					image {

						width: 100%;
						height: 100%;
						display: block;
					}
				}

				.item-title {
					padding-left: 15rpx;
					padding-top: 20rpx;
					overflow: hidden;
				}

				.list-item-right {
					box-sizing: border-box;
					height: calc(100% - 296rpx);
					position: relative;

					.hort-title-right {
						// padding-left: ;
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
						border-radius: 20rpx;
						background: #ffecf0;
						float: left;
						margin-right: 10rpx;
					}

					.item-right-title {
						font-size: 26rpx;
						width: calc(100% - 73rpx);
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}


					.item-right-bottom {
						overflow: hidden;
						font-size: 24rpx;

						position: absolute;
						bottom: 20rpx;

						.item-right-price {
							float: left;
							color: #ed5d1f;
							padding-left: 15rpx;

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
							font-size: 20rpx;
						}
					}
				}
			}



		}


	}
</style>
