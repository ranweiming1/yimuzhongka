<template>
	<view>
		<view class="one_line">
		</view>
		
		<view class="await">
			<text>卖家同意退货</text>
		</view>
		
		<view class="radios">
			<text>订单编号：45644152412141</text>
			<view class="guanb">
				<text>2019-05-25 15:55:56</text>
			</view>
		</view>
		<!-- 订单信息 -->
		<view class="xinxi">
			<view class="biaot">
				<text>订单信息</text>
			</view>
			<view class="imgBox_a">
				<image src="../../../static/img_09.jpg" mode=""></image>
			</view>
			<view class="txt_c">
				<view class="title">
					<text>车载商品监控稍等稍等程等程序做序做着的限制性</text>
				</view>
				<view class="spec">
					<text>已选：＂黄色＂</text>
				</view>
				<view class="radColor">
					<text>562积分</text>
				</view>
		
				<!-- 这是数量加减 -->
				<view class="jia">
					<text>X1</text>
				</view>
			</view>
		</view>
		<!-- 填充默认地址，若无，参考订单状态添加地址样式 -->
		<view class="siteBox">
			<view class="content">
				<view class="biaot">
					<text>退货信息</text>
				</view>
				<view class="nome">
					<text>张继科</text>
				</view>
				<view class="call">
					<text>15066458795</text>
				</view>
				<view class="p">
					<text>山东省济南市槐荫区张庄路街道路街道明南区16号楼明南区16号楼(菜鸟驿站代收)</text>
				</view>
			</view>
		
			<view class="imgBox">
				<image src="../../../static/icon_26.png" mode=""></image>
			</view>
		</view>
		<view class="basic aa">
			<view class="left_a">
				<text>选择物流公司</text>
			</view>
			<view class="right_a">
				<view class="img_a">
					<image src="../../../static/icon_26.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="basic aa">
			<view class="left_a">
				<text>填写物流单号</text>
			</view>
			<view class="right_a">
				<view class="img_a">
					<image src="../../../static/icon_26.png" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		onLoad() {
			
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f7f7f7;
	}
	.await {
		background-color: #fff;
		width: 710upx;
		padding: 20upx;
		border-bottom: 20upx solid #f7f7f7;
	
		text {
			font-size: 28upx;
			line-height:30upx;
			color: #333;
		}
	}
	.radios {
		background-color: #fff;
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
		.guanb {
			float: right;
		
			text {
				font-size: 28upx;
				color: #999;
			}
		}
	}
	.biaot {
		padding-bottom: 20upx;
		text {
			font-size: 28upx;
		}
	}
	.xinxi {
		margin-bottom: 20upx;
		background-color: #fff;
		overflow: hidden;
		width: 710upx;
		padding: 20upx;
		border-bottom: 1px dotted #ccc;
		.imgBox_a {
			float: left;
			padding-top: 20upx;
	
			image {
				width: 215upx;
				height: 160upx;
			}
		}
	
		.txt_c {
			float: left;
			width: 460upx;
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
	.siteBox {
		width: 710upx;
		height: initial;
		padding: 20upx;
		background-color: #fff;
		overflow: hidden;
		border-bottom: 1px solid #ccc;
	
		.content {
			float: left;
			width: 80%;
	
			.nome {
				float: left;
				font-size: 30upx;
				color: #333;
				padding-right: 10upx;
			}
	
			.call {
				float: left;
				font-size: 24upx;
				color: #666;
				line-height: 40upx;
				padding-right: 10upx;
			}
			.p {
				float: left;
				font-size: 26upx;
				color: #333;
				line-height: 40upx;
			}
		}
	}
	.basic {
		width: 710upx;
		background-color: #fff;
		overflow: hidden;
		padding: 20upx;
		padding-bottom: 10upx;
		border-bottom: 20upx solid #f7f7f7;
		.left_a {
			float: left;
	
			text {
				font-size: 28upx;
				color: #333;
				line-height: 50upx;
			}
		}
	
		.right_a {
			float: right;
			padding-right: 10upx;
			text {
				font-size: 28upx;
				float: right;
				line-height: 50upx;
				text{
					color: #ff670c;
				}
			}
	        .img_l{
				float:left;
				padding-right: 10upx;
				padding-top: 5upx;
				image{
					width: 45upx;
					height: 45upx;
				}
				
			}
			.img_a {
				float: right;
				padding: 20upx 0upx 20upx 20upx;
	
				image {
					width: 12upx;
					height: 14upx;
					display: block;
				}
	
			}
		}
	}
</style>
