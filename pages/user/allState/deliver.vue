<template>
	<view>
		<view class="one_line">
		</view>
		
		<view class="textBox">
			<view class="">
				<text>订单编号：1231313313</text>
			</view>
			<view class="">
				<text>承运公司：韵达快递</text>
			</view>
			<view class="">
				<text>运单编号：7846446464646</text>
			</view>
		</view>
		
		<!-- 物流状态插件 -->
		<view class="wul">
			<text>占位</text>
		</view>
		
		<!-- 热门推荐 -->
		<view class="biaot">
			<text>热门推荐</text>
			<view class="dele">
				<text>更多</text>
			</view>
		</view>
		
		<view class="hahah list uni-flex uni-column" v-for="(i , n) in 4">
			<view class="content ">
				<view class="imgBox">
					<image src="../../../static/img_02.jpg" mode="widthFix"></image>
				</view>
				<view class="txt_a">
					<text class="span_a">自营</text>
					<text>化学小子 玻璃清洁剂 风玻璃清洗剂</text>
					<view class="txt_aa">
						<text>买一送三</text>
						<text>满199-100元</text>
					</view>
					<view class="txt_aas">
						<text>税后价：<text>￥980.00</text></text>
					</view>
			
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
</script>

<style lang="scss">
	.textBox{
		width: 710upx;
		padding: 20upx;
		border-bottom: 20upx solid #f7f7f7;
		text{
			font-size: 30upx;
			line-height: 40upx;
			color: #333;
		}
	}
	.wul{
		width: 710upx;
		padding: 20upx;
		text-align: center;
		text{
			font-size: 28upx;
			color: #999;
		}
	}
	.biaot{
		border-bottom: 1px solid #ccc;
		font-size: 30upx;
		line-height: 80upx;
		padding-left: 20upx;
		margin-bottom: 30upx;
		.dele{
			float: right;
			padding-right: 20upx;
			text{
				font-size: 26upx;
				color: #666;
				line-height: 50upx;
			}
		}
	}
	
	.content {
		display: black;
		width:340upx;
		margin-bottom: 30upx;
		margin-left:25upx;
		float: left;
		box-shadow: 0 0 5px #ccc;
		border-radius:20upx;
	    padding-bottom: 20upx;
		overflow: hidden;
		.imgBox{
			image {
				width: 100%;
				height: inherit;
				float: left;
			}
		}
		.txt_a {
			padding-top: 10upx;
			width:90%;
			margin-left: 20upx;
			float: left;
	        text{
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
				padding-top:10upx;
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
</style>
