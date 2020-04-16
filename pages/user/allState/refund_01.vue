<template>
	<view>
		<view class="one_line">
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
					<text>￥52.00</text>
				</view>
		
				<!-- 这是数量加减 -->
				<view class="jia">
					<text>X1</text>
				</view>
			</view>
		</view>
		
		<view class="basic aa">
			<view class="left_a">
				<text>退款原因</text>
			</view>
			<view class="right_a">
				<view class="img_a">
					<image src="../../../static/icon_26.png" mode=""></image>
				</view>
				<text>请选择原因</text>
			</view>
		</view>
		<view class="uni-form-item uni-column">
			<view class="title"><text>退款金额</text></view>
			<input class="uni-input" name="input" placeholder="¥29.00" />
		</view>
		<view class="basic aa">
			<view class="left_a">
				<text>退款方式</text>
			</view>
			<view class="right_a">
				<view class="img_a">
					<image src="../../../static/icon_26.png" mode=""></image>
				</view>
				<text>商家同意退货后再选择</text>
			</view>
		</view>
		<view class="uni-form-item uni-column">
			<view class="title"><text>退款说明</text></view>
			<input class="uni-input" name="input" placeholder="选填" />
		</view>
		
		<view class="uni-form-item uni-column">
			<view class="title"><text>上传凭证</text></view>
			<view class="imgBox">
				<image src="../../../static/img_10.jpg.png" mode=""></image>
			</view>
		</view>
		<view class="uni-padding-wrap uni-common-mt botts">
			<button type="primary">提交</button>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	page{
		background-color: #f7f7f7;
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
	.uni-column{
		background-color: #fff;
		overflow: hidden;
		border-bottom: 20upx solid #f7f7f7;
		.title{
			float: left;
			padding-left: 20upx;
			text{
				line-height: 90upx;
				font-size:28upx;
			}
		}
		.uni-input{
			float: left;
			padding-top: 27upx;
			font-size: 28upx;
			color: #ff0000;
			padding-left: 20upx;
			font-family:Microsoft YaHei ;
		}
		
		.imgBox{
			float: left;
			padding-top: 30upx;
			padding-left: 20upx;
			image{
				width: 175upx;
				height: 175upx;
			}
		}
	}
	.botts{
		width: 670upx;
		position: fixed;
		bottom: 40upx;
		left: 40upx;
		
		button{
			border-radius: 40upx;
			font-family:Microsoft YaHei;
		}
		
	}
</style>
