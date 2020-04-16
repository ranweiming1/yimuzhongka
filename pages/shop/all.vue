<template>
	<view>
		<!-- 头部 -->
		<view class="top">
			<view class="textBox">
				<input class="uni-input" focus placeholder="请输入关键字" />
			</view>
			<view class="imgBox">
				<image src="../../static/icon_43.png" mode=""></image>
			</view>
		</view>
		
		<!-- 这里有一个筛选 -->
		<view class="zhanwie">
			<text>我只是占位符</text>
		</view>
		
		<!-- 热门推荐 -->
			<view class="hahah list uni-flex uni-column" v-for="(i , n) in 4">
				<view class="content ">
					<view class="imgBox">
						<image src="../../static/img_02.jpg" mode="widthFix"></image>
					</view>
					<view class="txt_a">
						<text class="span_a">自营</text>
						<text>化学小子 玻璃清洁剂 汽车前档风玻璃清洗剂</text>
						<view class="txt_aa">
							<text>买一送三</text>
							<text>满199-100元</text>
						</view>
						<view class="txt_aas">
							<text>税后价：<text>￥980.00</text></text>
							<text>销量：1256</text>
						</view>
		
					</view>
				</view>
			</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.top {
		width: 710upx;
		margin: 20upx;
		overflow: hidden;
		.textBox {
			float: left;
			margin-left: 70upx;
			background-color: #f0f0f0;
			border-radius: 50upx;
	
			input {
				height: 60upx;
				width: 520upx;
				line-height: 60upx;
				padding-left: 20upx;
				font-size: 26upx;
			}
	
			.uni-input-placeholder {
				color: #999 !important;
			}
	
		}
	
		.imgBox {
			padding-left: 30upx;
			padding-right: 20upx;
			padding-top: 10upx;
			float: right;
	
			image {
				width: 44upx;
				height:39upx;
			}
		}
	}
	.zhanwie{
		width: 710upx;
		padding: 20upx;
		border-bottom: 1px solid #ccc;
		text-align: center;
		
		text{
			font-size: 30upx;
			color: #333;
		}
	}
	.content {
		display: black;
		width: 710upx;
		padding: 20upx;
		border-bottom: 1px dotted #ccc;
		padding-bottom: 20upx;
		overflow: hidden;
	
		.imgBox {
			image {
				width: 30%;
				height: inherit;
				float: left;
			}
		}
	
		.txt_a {
			padding-top: 10upx;
			width: 67%;
			margin-left: 20upx;
			float: left;
	
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
				padding-top: 10upx;
	
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
