<template>
	<view>
		<view class="one_line">
		</view>

		<view class="top">
			<!-- 轮播图 -->
			<view class="imgBox">
				<image src="../../../static/img_08.jpg" mode=""></image>
			</view>
			<view class="h2">
				<text>行车记录仪行车记录仪G300行车记录仪G300G300</text>
			</view>
			<view class="p">
				<text>269积分</text>
			</view>
			<view class="span">
				<text>25人已兑换</text>
			</view>
		</view>

		<view class="xiangq">
			<view class="img_b">
				<image src="../../../static/icon_29.png" mode=""></image>
			</view>
			<view class="txt">
				<text>兑换须知</text>
			</view>
			<view class="jians">
				<text>1、点击“立即兑换",在“确认订单"页面点击“使用优惠”,在页面上方输入优惠码,点击“兑换”并返回即可看到优惠后的订单
					2、点击"提交订单”并支付即可完成兑换(实付19元邮费即享)。使用说明1,每个ID限领取一次,同一收货地址、收货手机号、收货人姓名,默认为一个客户;
					3、如您在使用中遇到问题,可咨询线上客服(周一至周五0:00-17:00) ;
					4、领取后7天内券码有效,兑换码不退、不换;
					5、.配送范围全国(除台湾,香港,澳门,西藏,新疆,宁夏,青海,甘肃,内蒙古,海南) 
					</text>
					
			</view>
			<view class="uni-padding-wrap uni-common-mt bott">
				<button type="primary">立即兑换</button>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.top {
		width: 710upx;
		padding: 20upx;
		border-bottom: 20upx solid #f7f7f7;
		overflow: hidden;

		.imgBox {
			float: left;

			image {
				width: 750upx;
				height: 350upx;
			}
		}

		.h2 {
			font-size: 30upx;
			line-height: 60upx;
			color: #333;
		}

		.p {
			font-size: 26upx;
			color: #ff0000;
			line-height: 30upx;
			float: left;
		}

		.span {
			font-size: 26upx;
			color: #999999;
			line-height: 30upx;
			float: right;
		}
	}

	.xiangq {
		overflow: hidden;
		width: 710upx;
		margin: 20upx;

		.img_b {
			float: left;
			padding-right: 10upx;

			image {
				width: 6upx;
				height: 30upx;
			}
		}

		.txt {
			font-size: 30upx;
			color: #333;
		}
		.jians{
			padding-top: 20upx;
			font-size: 24upx;
			padding-bottom: 100upx;
			line-height: 40upx;
			color: #666;
		}
		.bott{
			width: 670upx;
			position: fixed;
			bottom: 40upx;
			left: 40upx;
			
			button{
				border-radius: 40upx;
				font-family:Microsoft YaHei;
			}
			
		}
	}
</style>
