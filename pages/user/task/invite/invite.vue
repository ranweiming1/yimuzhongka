<template>
	<view>
		<view class="Box">
			<view class="imgBox">
				<image src="../../../../static/img_11.jpg" mode=""></image>
			</view>

			<!-- 文字较多时，内部进度条 -->
			<view class="brief">
				<text>1、登记成功，新朋友将可获得“回梦丹”；“回梦丹”：使用后下一小时内将获得双倍经验，如已经领取了双倍经验，则可累计获得3倍经验。
					2、在本服通过组队推荐建立关联的玩家，则推荐人将在被推荐玩家50、55、60、65、70、100级时获得额外的奖励（该奖励每个月最多获得10次）；
					4、被推荐玩家因在线时间扣除的点卡，将其总量的15%折算为等价的“免费时间”奖励给推荐人梦幻账户，生效期限最长半年（6个月）</text>
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
	.imgBox {
		image {
			width: 750upx;
			height: 1334upx;
		}
	}
	.brief{
		position: fixed;
		top: 40%;
		left: 20upx;
		background-color: #fff;
		box-shadow: 0 0 5px #ccc;
		width: 670upx;
		height: 500upx;
		border-radius: 20upx;
		padding: 20upx;
		
		text{
			color: #333;
			line-height: 40upx;
			font-size: 28upx;
		}
	}
</style>
