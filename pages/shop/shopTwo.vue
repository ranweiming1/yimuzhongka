<template>
	<view>
		<view class="shop-top">
			<view class="shop-bag">
				<image src="../../static/shopBagTwo.png" mode=""></image>
			</view>
			<view class="shop-search">
				<view class="shop-search-back">
					<image src="../../static/icon_26-2.png" mode=""></image>
				</view>
				<view class="shop-search-input">
					<input type="text" placeholder="请输入关键字" />
				</view>
			</view>
			<view class="shop-logo-swper">
				<swiper class="logo-swper-list" :current="currentIndex" :circular="true" next-margin="95rpx" :duration="100"
				 @change="swierChange">
					<swiper-item class="logo-swper-item" v-for="(item,i) in 5" :key="i">
						<image src="../../static/Bitmap.png" class="slide-image" :class="currentIndex === i?'active':''" mode=""></image>
					</swiper-item>
				</swiper>
				<div class="logo-swper-dots">
					<div v-for="(item,i) in 5" class="dots-item">
						<div :class="i==currentIndex?'add-dots':'move-dots'"></div>
					</div>
				</div>
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
		<view class="shop-company">
			<view class="shop-company-name">
				公司简介
			</view>
			<view class="shop-company-content">
				<text>
					公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介
				</text>
			</view>
		</view>


	</view>
</template>

<script>
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
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f6f6f6;
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
				margin-left: 20rpx;
				margin-top: 14rpx;
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
				height: 352rpx;
				// border-radius: 20rpx;
				overflow: hidden;

				.slide-image {
					position: absolute;
					height: 300rpx;
					width: 530rpx;
					opacity: 0.7;
					margin-right: 20rpx;
					border-radius: 20rpx;
					overflow: hidden;
					top: 52rpx;
				}

				.active {
					width: 625rpx;
					height: 352rpx;
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
			line-height: 40rpx;
		}

		.shop-company-content {
			font-size: 22rpx;
			line-height: 34rpx;

		}

	}
</style>
