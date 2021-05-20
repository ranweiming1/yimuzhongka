<template>
	<view class="">
		<view class="clearCss">
			<view class="content-item " v-for="(item,index) in lList" @tap="detail(item.goodsId)">
				<view class="imgBox">
					<image :src="item.goodsLogo" mode=""></image>
				</view>
				<view class="content-item-text">
					<view class="title_top">
						<text class="span_a" v-if="item.selfStatus=='Y'">自营</text>						
						<text class="titleText">{{item.goodsName}}</text>
					</view>
					<view class="item-coupon">
						<view class="coupon-item" v-for="(items,indexs) in item.couponDTOS">
							<text>满{{items.condition}}-{{items.money}}元</text>
						</view>
						<view class="coupon-item" v-if='item.kuaidi==0'>
							<text>包邮</text>
						</view>

					</view>
					<view class="item-price">
						<text class="price-text">￥{{item.marketPrice?item.marketPrice.toFixed(2):'暂无价格'}}</text>
						<text class="shop-sales">销量：{{item.salesSum}}</text>
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
				lList: {}
			}
		},
		onLoad() {
			var _this = this
			this.$https({
				url: '/api/user/goods-browsing-history',
				data: {},
				dengl: false,
				success: function(res) {
					_this.lList = res.data.data
					console.log(res.data.data)
				}
			})
		},
		methods: {
			detail(id) {
				uni.navigateTo({
					url: '../../index/productDetails?id=' + id
				})
			}
		}
	}
</script>

<style lang="scss">
	.shop-sales {
		color: #999999;
		font-size:22upx;
		float: right;
		
	}
	.content {
		display: black;
		width: 710upx;
		padding: 20upx;
		border-bottom: 1px dotted #ccc;
		overflow: hidden;



		.txt_a {
			padding-top: 10upx;
			width: calc(100% - 200rpx);
			padding-left: 20rpx;
			box-sizing: border-box;
			float: left;
			height: 200rpx;
			position: relative;

			text {
				font-size: 30upx;
			}

			.span_a {
				background-color: #fff;
				color: #ff6600;
				border: 1px solid #ff6600;
				border-radius: 5upx;
				padding: 5upx 10upx;
				font-size: 18upx;
				margin-right: 10upx;
				line-height: 30upx;
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
				position: absolute;
				bottom: 0;
				width: calc(100% - 20rpx);
				box-sizing: border-box;

				text {
					color: #333;
					font-size: 32upx;

					text {
						color: #ff3333;
						font-size: 32upx;
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

	.content:first-child {
		border-top: 1px solid #ccc;
	}
</style>
