<template>
	<view>
		<view class="line-top">
			<view class="list-item">
				<view class="list-item-title">
					<text>积分获取规则：</text>
				</view>
				<view class="list-item-cont">
					<text>积分分为：消费积分、奖励积分、 赠送积分</text>
					<p>1、消费积分：指用户在APP平台上消费购买配件或维修服务每消费1元积10分。</p>
					<p>2、奖励积分：成功注册后获得新人积分50分；邀请用户或者商家即赠送积分100分。</p>
					<p>3、赠送积分：积极参与本平台各类活动，根据活动获得相应积分。</p>

				</view>
			</view>
			<view class="list-item">
				<view class="list-item-title">
					<text>积分换购规则：</text>
				</view>
				<view class="list-item-cont">
					<p>1、消费按1元=10积分</p>
					<p>2、积分不清零、作废、逾期(或按1年作废) </p>
					<p>2、积分不可转增其他用户。</p>
					<p>4、积分的数值精确到个位（小数点后全部舍弃，不进行四舍五入）</p>
					<p>5、买家在完成该笔交易后（支付系统显示该交易状态为“交易成功”）后，才能得到此次交易的相应积分。</p>
					<p>6、用户在商城中购物交易后，可以获取相应的积分奖励，奖励的积分可用于积分换购，0元兑换商品或以积分+现金的形式，用更优惠的价格购买商品。</p>

				</view>
			</view>
			<view class="list-item">
				<view class="list-item-title">
					<text>积分兑换说明：</text>
				</view>
				<view class="list-item-cont">
					<p>1、积分可兑换成礼品、折扣券、抵现金，也可参加抽奖活动。相关优惠产品会定期更新，每次兑换活动奖品数量有限，先兑先得，兑完为止。</p>
					<p>2、兑换成功后将从会员帐户中扣减相应积分分值。</p>
					<p>3、订单一旦生成若无礼品质量问题，不予办理礼品退换货。</p>
					<p>4、由于积分兑换是为会员提供的回馈性质的服务，因此在积分商城兑换的礼品均不提供发票。</p>

				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.line-top {
		border-top: 1rpx solid #e5e5e5;
		// padding: 0 20rpx;
		width: 100%;
		box-sizing: border-box;
		font-size: 30rpx;
		color: #333;
		color: #333;
	}

	.list-item {
		border-bottom: 20rpx solid #f7f7f7;
		padding: 0 20rpx;
	}

	.list-item-title {
		height: 90rpx;
		line-height: 90rpx;
		border-bottom: 1rpx dashed #bfbfbf;
		padding: 0 10rpx;

		text {
			font-size: 30rpx;
		}
	}

	.list-item-cont {
		color: #666;
		font-size: 28rpx;
		padding: 20rpx 10rpx;

		text {
			line-height: 50rpx;
		}

		p {
			line-height: 50rpx;
		}
	}
</style>
