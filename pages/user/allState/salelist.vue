<template>
	<view class="bodys">
		<!-- 	<view class="">
			<view class="radios">
				<text>店铺名</text>
				<view class="guanb">
					<text></text>
				</view>
			</view>
		</view> -->
		<view class="listBox" v-for="(item,index) in saleList">
			<view class="radios">
				<!-- 店铺名称待确认 -->
				<text>{{item.storeShopDTO.shopName}}</text>
				<view class="guanb">
					<text>{{item.approvalStatus==0?'审核已通过':item.approvalStatus==2?'待卖家同意':'卖家已拒绝'}}</text>
				</view>
			</view>
			<view class="xinxi">
				<view class="xinxi1"
					@tap="detail(item.id,item.goodsName,item.specValue,item.goodsImg,item.approvalStatus)">
					<view class="imgBox_a">
						<image :src="item.goodsImg" mode=""></image>
					</view>
					<view class="txt_c">
						<view class="title">
							<text>{{item.goodsName}}</text>
						</view>
						<view class="spec">
							<text>已选：＂{{item.specValue}}＂</text>
						</view>
						<view class="radColor">
							<text>{{item.goodsFee?'￥'+item.goodsFee.toFixed(2):'0'}}</text>
						</view>

						<!-- 数量 -->
						<view class="jia">
							<text>x{{item.buyNum}}</text>
						</view>
					</view>

				</view>
				<view class="zongj">
					<text>{{item.refundDesc}}</text>
				</view>
				<view class="exa-type">
					<view class="exa-title-one" v-if="item.approvalStatus==2">
						<text style="color: #FF0000;padding-right: 20rpx;">待商家处理</text> <text>请耐心等待</text>
					</view>
					<view class="exa-title-two" v-if="item.approvalStatus==3">
						<text style="padding-right: 20rpx;">商家已驳回</text><text
							style="color: #FF0000;">{{item.storeRemark?item.storeRemark:''}}</text>
					</view>
					<view class="exa-title-three" v-if="item.approvalStatus==0">
						<text style="padding-right: 20rpx;">审核通过</text>
						<text>{{item.logisticsCode&&item.logisticsCode!=null?'退款中，请耐心等待':'请填写物流信息'}}
						</text>
					</view>
					<view class="exa-title-three" v-if="item.endStatus==1">
						<text
							style="padding-right: 20rpx;">{{item.refundMethod==0?'退货成功':'换货成功'}}</text><text>{{item.refundMethod==0?'退款成功￥'+item.goodsFee.toFixed(2):'换货已完成'}}</text>
					</view>
					<view class="exa-bott" v-if="item.approvalStatus==3"
						@tap="applyAgain(item.id,item.outTradeNo,item.goodsImg,item.goodsName,item.totalFee,item.specValue,item.buyNum,item.specKey,item.goodsId)">
						再次申请
					</view>
				</view>
			</view>
		</view>
		<view v-if='saleList.length==0' style='text-align:center;margin-top:100rpx;'>
			<image src='../../../static/d.png' style='width:283rpx;height:184rpx;display:block;margin:50rpx auto;'>
			</image>
			<view style='text-align:center;'>暂无订单</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				saleList: []
			}
		},
		onLoad() {
			var _this = this
			this.$https({
				url: '/api/shop/order-refund-list',
				dengl: false,
				haeder: true,
				data: {},
				method: 'post',
				success(res) {
					_this.saleList = res.data.data
					console.log(res.data.data)
				}
			})
		},
		methods: {
			detail: function(id, name, value, logo, approvalStatus) {
				if (approvalStatus != 0) {
					uni.showToast({
						title: approvalStatus == 2 ? '请等待卖家同意退货' : '审核失败，请与卖家协商重新申请',
						icon: 'none'
					})
					return false
				}
				uni.navigateTo({
					url: './refund?id=' + id
				})
			},
			applyAgain(id, oS, lG, gN, gP, sKN, Num, sKY,gID) {
				uni.navigateTo({
					url: './deliver_01?id=' + id + '&oS=' + oS + '&lG=' + lG + '&gN=' + gN + '&gP=' + gP +'&sKN=' + sKN + '&num=' + Num + '&sKY=' + sKY+'&gID='+gID
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f7f7f7;
	}

	.listBox {
		margin-top: 20rpx;
		background-color: #FFFFFF;
	}

	.xinxi {
		overflow: hidden;
		width: 710upx;
		padding: 20upx;
		// border-bottom: 20upx solid #f7f7f7;


		.xinxi1 {
			overflow: hidden;
			width: 710upx;
			// padding: 20upx;
			// border-bottom: 20upx solid #f7f7f7;
		}

		.imgBox_a {
			float: left;
			padding-top: 20upx;

			image {
				width: 215upx;
				height: 160upx;
			}
		}

		.zongj {
			// float: right;
			background-color: #f7f7f7;
			border-radius: 25rpx;
			margin-top: 10upx;
			padding: 8rpx 20rpx;

			text {
				font-size: 26upx;
				// padding-left: 20rpx;
				color: #333;
				line-height: 50rpx;
			}
		}

		.exa-type {
			color: 30rpx;
			overflow: hidden;
			font-size: 30rpx;
			width: 100%;
			padding: 0 10rpx;
			box-sizing: border-box;
		}

		.exa-title {
			font-size: 30rpx;
			height: 80rpx;
			line-height: 80rpx;
		}

		.exa-title-one {
			height: 80rpx;
			line-height: 80rpx;
			font-size: 30rpx;
			color: #333;
		}

		.exa-title-two {
			padding: 25rpx 0;
			line-height: 45rpx;
		}

		.exa-title-three {
			height: 80rpx;
			line-height: 80rpx;
			font-size: 30rpx;
			color: #333;
		}

		.exa-bott {
			float: right;
			width: 180rpx;
			height: 64rpx;
			text-align: center;
			line-height: 64rpx;
			border-radius: 45rpx;
			color: #007AFF;
			background-color: #fff;
			border: 1px solid #007AFF;
			font-size: 28rpx;
		}

		.txt_c {
			float: left;
			width: 470upx;
			padding-left: 20upx;

			.title {
				padding-top: 10upx;

				text {
					font-size: 30upx;
					line-height: 30upx;
					color: #333;
				}
			}

			.spec {
				font-size: 26upx;
				line-height: 40upx;
				color: #666;
			}

			.radColor {
				float: left;
				color: #ff0000;
				font-size: 32upx;
			}

			.jia {
				float: right;

				text {
					font-size: 20upx;
					color: #666;
				}
			}
		}
	}

	.radios {
		width: 710upx;
		padding: 20upx;
		overflow: hidden;
		padding-top: 10upx;
		overflow: hidden;
		border-bottom: 1px solid #f7f7f7;

		text {
			font-size: 28upx;
			color: #333;
			line-height: 40upx;
			padding-right: 10upx;
		}

		image {
			width: 12upx;
			height: 26upx;
		}
	}

	.guanb {
		float: right;

		text {
			font-size: 28upx;
			color: #ff0000;
		}
	}
</style>
