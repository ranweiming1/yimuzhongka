<template>
	<view>
		<view class="top">
			<view class="textBox">
				<text>资讯详情</text>
			</view>
			<view class="imgBox">
				<image src="../../../static/icon_18.png" mode=""></image>
			</view>
		</view>
		
		
		<view class="neir">
			<view class="title">
				<text>申请退款后款项多久能够到账？</text>
			</view>
			<view class="left">
				<text>发布时间：2018-15-15</text>
			</view>
			<view class="right">
				<text>浏览量：153</text>
			</view>
		</view>
		<view class="img">
			<image src="../../../static/img_04.jpg" mode=""></image>
		</view>
		<view class="txt">
			<text>浩威商城隶属长洁贸易（上海）有限公司，是集一站式、仓储式及市场批发销售的清洁用品供应商，公司拥有专业的电子商务团队、物流配送团队及完善的售后服务，
				公司为了能更好的服务众多客户，在上海九星市场拆迁之际经过多方位考量，扩大营业面积提升购物体验，本着便捷，优惠，高效的六字方针持续为新老客户提供更优质的产品和后续服务。
			</text>
		</view>

		<!-- 华丽丽的分割线 -->
		<view class="one_line">
		</view>

		<!-- 评价标题 -->
		<view class="evaluate">
			<view class="title_a">
				<text>用户评价</text>
			</view>
			<!-- 用户评价 -->
			<view class="toux">
				<view class="imgBox_a">
					<image src="../../../static/img_05.jpg" mode=""></image>
				</view>
				<view class="mingc">
					<text>秋天的风</text>
					<view class="time">
						<text>2019/05/05</text>
					</view>
					<view class="huay">
						<text>性价比高，做工精致，质量很好，性价比高，做工精致材质纯正质量很好，性价比高，做工精致</text>
					</view>
				</view>
			</view>
			<view class="toux">
				<view class="imgBox_a">
					<image src="../../../static/img_05.jpg" mode=""></image>
				</view>
				<view class="mingc">
					<text>秋天的风</text>
					<view class="time">
						<text>2019/05/05</text>
					</view>
					<view class="huay">
						<text>性价比高，做工精致，质量很好，性价比高，做工精致材质纯正质量很好，性价比高，做工精致</text>
					</view>
				</view>
			</view>
			<view class="toux">
				<view class="imgBox_a">
					<image src="../../../static/img_05.jpg" mode=""></image>
				</view>
				<view class="mingc">
					<text>秋天的风</text>
					<view class="time">
						<text>2019/05/05</text>
					</view>
					<view class="huay">
						<text>性价比高，做工精致，质量很好，性价比高，做工精致材质纯正质量很好，性价比高，做工精致</text>
					</view>
				</view>
			</view>
		</view>
		<view class="publish">
			<view class="imgBox_b">
				<image src="../../../static/icon_19.png" mode=""></image>
			</view>
			<view class="textBox_b">
				<text>发表评价</text>
			</view>
		</view>
	</view>

</template>

<script>
</script>

<style lang="scss">
	


	.top {
		width: 750upx;
		margin: 0 auto;
		overflow: hidden;
		border-bottom: 1px solid #e5e5e5;

		.textBox {
			padding-left: 40%;

			text {
				font-size: 38upx;
				color: #333;
				float: left;
				line-height: 90upx;
			}
		}

		.imgBox {
			float: right;

			image {
				width: 34upx;
				height: 32upx;
				padding: 30upx;
			}
		}
	}

	.neir {
		overflow: hidden;

		.title {
			font-size: 36upx;
			line-height: 40upx;
			padding-top: 20upx;
			padding-bottom: 20upx;
			color: #333;
			text-align: center;
		}

		.left {
			color: #999;
			font-size: 24upx;
			line-height: 30upx;
			float: left;
			padding-left: 25upx;
		}

		.right {
			color: #999;
			font-size: 24upx;
			line-height: 30upx;
			float: right;
			padding-right: 25upx;
		}
	}

	.img {
		padding-left: 25upx;
		padding-top: 30upx;

		image {
			display: block;
			width: 700upx;
			height: 300upx;
		}
	}

	.txt {
		font-size: 28upx;
		color: #333;
		line-height: 50upx;
		padding: 25upx;
	}

	.one_line {
		background-color: #f8f8f8;
		width: 750upx;
		height: 20upx;
	}

	.title_a {
		font-size: 32upx;
		padding-left: 20upx;
		line-height: 70upx;
		color: #333;
	}
	
	.toux {
		padding-top: 20upx;
		padding-left: 20upx;
		width: 750upx;
		overflow: hidden;
		border-bottom: 1px solid #ccc;
		padding-bottom: 20upx;
		image {
			width: 80upx;
			height: 80upx;
			border-radius: 150upx;
		}
	}
	
	.evaluate {
		width: 750upx;
		margin-bottom: 100upx;
	}
	.mingc{
		float: left;
		width: 630upx;
		text{
			font-size: 26upx;
			padding-left: 20upx;
		}
		.time{
			float: right;
			color: #333;
			font-size: 26upx;
			line-height: 50upx;
		}
	}
	.imgBox_a{
		float: left;
		margin-top: 10upx;
	}
	.huay{
		width: 630upx;
		float: left;
		color: #999;
		line-height: 40upx;
	}
	.publish{
		background: #2b5cff;
		position: fixed;
		bottom: 0upx;
		left: 0upx;
		width: 750upx;
		height: 100upx;
		overflow: hidden;
		.imgBox_b{
			image{
				width:38upx ;
				height: 38upx;
				float: left;
				padding-left: 38%;
				padding-top: 30upx;
				padding-right: 20upx;
			}
		}
		.textBox_b{
			font-size: 30upx;
			line-height: 90upx;
			color: #fff;
			float: left;
		}
	}
	
</style>
