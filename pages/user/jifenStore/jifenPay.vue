<template style="background: #f7f7f7; overflow: hidden; display: block;">
	<view>
		<view class="one_line">
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
					<text>加减占位</text>
				</view>
			</view>
		</view>

		<view class="beiz">
			<text>给卖家备注</text>
		</view>

		<view class="basic">
			<view class="left_a">
				<text>付款方式</text>
			</view>
			<view class="right_a">
				<view class="img_a">
					<image src="../../../static/icon_26.png" mode=""></image>
				</view>
				<text>积分抵扣</text>
			</view>
		</view>

		<!-- 底部 -->
		<view class="bottom">
			<view class="leftA">
				<text>合计：<text>562积分</text></text>
			</view>
			<view class="rightA">
				<text>结 算</text>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">

	page {
		background: red !important;
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

	.imgBox {
		float: right;
		padding-top: 40upx;

		image {
			width: 12upx;
			height: 20upx;
		}
	}

	.xinxi {
		overflow: hidden;
		width: 710upx;
		padding: 20upx;
		border-bottom: 1px dotted #ccc;

		.biaoyi {
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

	.beiz {
		width: 750upx;
		padding-left: 20upx;
		border-bottom: 20upx solid #f7f7f7;
		padding-top: 10upx;
		padding-bottom: 10upx;

		text {
			font-size: 26upx;
			line-height: 70upx;
			color: #333;
		}
	}

	.basic {
		width: 710upx;
		background-color: #fff;
		overflow: hidden;
		padding: 20upx;
		padding-bottom: 20upx;
		border-bottom: 1px dotted #ccc;
		

		.left_a {
			float: left;
			padding-left: 20upx;

			text {
				font-size: 28upx;
				color: #999;
				line-height: 30upx;
				line-height: 70upx;
			}
		}

		.right_a {
			float: right;
			padding-right: 10upx;

			text {
				font-size: 28upx;
				float: right;
				line-height: 70upx;
			}

			.img_a {
				float: right;
				padding: 30upx 0upx 20upx 20upx;

				image {
					width: 12upx;
					height: 14upx;
					display: block;
				}

			}
		}
	}
	
	.bottom{
		width: 750upx;
		height: 100upx;
		border-top:1px solid #ccc ;
		position: fixed;
		bottom: 0upx;
		left: 0upx;
		.leftA{
			float: left;
			padding-left: 20upx;
			text{
				font-size: 28upx;
				color: #333;
				line-height: 90upx;
				text{
					font-size: 28upx;
					color: #ff0000;
				}
			}
		}
		.rightA{
			float: right;
			width: 260upx;
			height: 100%;
			text-align: center;
			background-color: #2b5cff;
			text{
				font-size: 30upx;
				color: #fff;
				line-height: 90upx;
				
			}
		}
	}
</style>
