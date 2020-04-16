<template>
	<view>
		<!-- 提示 -->
		<view class="tis">
			<text>剩余付款时间：26分25秒</text>
		</view>
		
		<view class="await">
			<text>待付款</text>
		</view>
		<!-- 填充默认地址，若无，参考订单状态添加地址样式 -->
		<view class="siteBox">
			<view class="content">
				<view class="nome">
					<text>张继科</text>
				</view>
				<view class="call">
					<text>15066458795</text>
				</view>
				<!-- 默认地址标签样式 -->
				<view class="label">
					<text>默认</text>
				</view>
				<view class="p">
					<text>山东省济南市槐荫区张庄路街道路街道明南区16号楼明南区16号楼(菜鸟驿站代收)</text>
				</view>
			</view>
		
			<view class="imgBox">
				<image src="../../../static/icon_26.png" mode=""></image>
			</view>
		</view>
		
		<view class="radios">
			<text>订单编号：45644152412141</text>
			<view class="guanb">
				<text>2019-05-25  15:55:56</text>
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
		
		<view class="basic">
			<view class="left_a">
				<text>运费</text>
			</view>
			<view class="right_a">
				<view class="img_a">
					<image src="../../../static/icon_26.png" mode=""></image>
				</view>
				<text>￥10.00</text>
			</view>
		</view>
		<view class="uni-form-item uni-column">
			<view class="title"><text>给卖家备注</text></view>
			<input class="uni-input" name="input" placeholder="" />
		</view>
		
		
		<view class="basic">
			<view class="left_a">
				<text>优惠券</text>
			</view>
			<view class="right_a">
				<view class="img_a">
					<image src="../../../static/icon_26.png" mode=""></image>
				</view>
				<text>已抵扣<text>￥30</text></text>
			</view>
		</view>
		
		<view class="basic">
			<view class="left_a">
				<text>支付方式</text>
			</view>
			<view class="right_a">
				<view class="img_l">
					<image src="../../../static/wx.png" mode=""></image>
				</view>
				<view class="img_a">
					<image src="../../../static/icon_26.png" mode=""></image>
				</view>
				<text>微信安全支付</text>
			</view>
		</view>
		
		<view class="basic aa">
			<view class="left_a">
				<text>商品金额</text>
			</view>
			<view class="right_a">
				<view class="img_a">
					<image src="../../../static/icon_26.png" mode=""></image>
				</view>
				<text>￥853.00</text>
			</view>
		</view>
		<view class="basic aa">
			<view class="left_a">
				<text>优惠券减免</text>
			</view>
			<view class="right_a">
				<view class="img_a">
					<image src="../../../static/icon_26.png" mode=""></image>
				</view>
				<text>-￥30</text>
			</view>
		</view>
		<view class="basic aa ssa">
			<view class="left_a">
				<text>运费</text>
			</view>
			<view class="right_a">
				<view class="img_a">
					<image src="../../../static/icon_26.png" mode=""></image>
				</view>
				<text>￥200</text>
			</view>
		</view>
		
		<!-- 底部 -->
		<view class="bottom">
			<view class="leftA">
				<view class="kefua">
					<image src="../../../static/icon_36.png" mode=""></image>
					<view class="keyboard">
						<text>客服</text>
					</view>
					
				</view>
                
			</view>
			<view class="rightA">
				<view class="bottBox">
					<view class="uni-padding-wrap uni-common-mt bott onna">
						<button type="primary">立即支付</button>
					</view>
					<view class="uni-padding-wrap uni-common-mt bott" @click="openPopup">
						<button type="primary">取消订单</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.tis{
		background-color: #f9e1c1;
		text-align: center;
		text{
			font-size: 24upx;
			color: #ff0000;
			line-height:60upx;
		}
	}
	.await{
		width: 710upx;
		padding-left: 20upx;
		border-bottom: 20upx solid #f7f7f7;
		text{
			font-size: 28upx;
			line-height: 80upx;
			color: #333;
		}
	}
	.siteBox {
		width: 710upx;
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
	
			.label {
				float: left;
				font-size: 18upx;
				color: #ff6633;
				padding: 5upx;
				margin-top: 5upx;
				background-color: #fdf1ec;
			}
	
			.p {
				float: left;
				font-size: 26upx;
				color: #333;
				line-height: 40upx;
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
	.guanb{
		float: right;
		text{
			font-size: 28upx;
			color: #999;
		}
	}
	.xinxi {
		overflow: hidden;
		width: 710upx;
		padding: 20upx;
		border-bottom: 1px dotted #ccc;
	
		.biaot{
			text {
				font-size: 28upx;
			}
		}
	
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
	.aa{
		border-bottom: 1px dotted #ccc;
	}
	.ssa{
		margin-bottom: 100upx;
	}
	.bottom{
		width: 750upx;
		height: 100upx;
		background-color: #fff;
		border-top:1px solid #ccc ;
		position: fixed;
		bottom: 0upx;
		left: 0upx;
		.leftA{
			float: left;
			padding-left: 20upx;
			width: 150upx;
			.kefua{
				float: left;
				padding:20upx;
				image{
					padding-left: 5upx;
					width:41upx;
					height:38upx;
					float: left;
				}
				.keyboard{
					text{
						float: left;
						color: #333;
						font-size: 26upx;
					}
				}
				
			}
			

	
		}
		
	}
	
	.rightA{
		width:300upx;
		float:right;
		
	}
	.bottBox {
		
		float: right;
		width: 710upx;
		padding: 20upx;
		height: 50upx;
	    .onna{
			button{
				background-color: #007AFF !important;
				border: 1px solid #007AFF !important;
				color: #fff !important;
			}
		}
		.onnb{
			button{
				background-color: #fff !important;
				border: 1px solid #007AFF !important;
				color: #007AFF !important;
			}
		}
		.bott {
			display: block;
			width: 180upx;
			margin-right: 20upx;
			float: right;
	
			button {
				background-color: #fff;
				border: 1px solid #999;
				border-radius: 40upx;
				font-size: 24upx;
				color: #999;
				font-family: Microsoft YaHei;
			}
	
		}
	}
</style>
