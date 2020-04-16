<template>
	<view>
		<view class="one_line">
		</view>

		<view class="went">
			<text>申请退款后款项多久能够到账？</text>
		</view>
		<view class="neir">
			<text>若买家在之前付款时选择信用卡支付，相关退款成功款项将暂时“冻结”，可查看支付宝账户中的“不可用余额”。
				买卖双方无法协商解决，可以要求艺粹客服帮助介入核实处理（退款申请客服介入的方法介绍）。退款到账时间请关注艺粹客服的最终处理意见。
				若买家在之前付款时选择信用卡支付，相关退款成功款项将暂时“冻结”，可查看支付宝账户中的“不可用余额”。
				买卖双方无法协商解决，可以要求艺粹客服帮助介入核实处理（退款申请客服介入的方法介绍）。退款到账时间请关注艺粹客服的最终处理意见。 </text>
		</view>
		
		
		<view class="span">
			<text>若您的问题还未解决，您可以</text>
		</view>
		<view class="txtBox">
			<text>联系在线客服</text>
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
	.went {
		width: 710upx;
		background: #fff;
		padding: 20upx;
		overflow: hidden;
		border-bottom: 1px dotted #ccc;

		text {
			float: left;
			font-size: 30upx;
		}
	}
	.neir{
		width: 710upx;
		padding: 20upx;
		text{
			font-size: 28upx;
			color: #666;
			line-height: 40upx;
		}
	}
	.span{
		position: fixed;
		left: 30%;
		bottom:9%;
		text-align: center;
		text{
			color: #999;
			font-size: 26upx;
		}
	}
	.txtBox{
		width: 600upx;
		background-color: #2b5cff;
		position: fixed;
		left: 10%;
		bottom: 2%;
		text-align: center;
		border-radius:50upx ;
		
		text{
			color: #fff;
			line-height: 80upx;
			font-size: 26upx;
		}
	}
</style>
