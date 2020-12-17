<template>
	<view>
		<!-- <view class="one_line">
		</view> -->

		<view class="radios" style="border-top:1rpx solid #ccc;">
			<text>订单编号：{{content.oS}}</text>
			<view class="guanb">
				<text>{{content.time}}</text>
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
					<text>{{content.gN}}</text>
				</view>
				<view class="spec">
					<text>已选：＂{{content.sKN}}＂</text>
				</view>
				<view class="radColor">
					<text>{{content.gP?'￥'+content.gP+'.00':'0'}}</text>
				</view>

				<!-- 这是数量加减 -->
				<view class="jia">
					<text>X{{content.num}}</text>
				</view>
			</view>
		</view>
		<view class="basic aa" @tap="huan">
			<view class="left_a">
				<text>我要换货</text>
			</view>
			<view class="right_a">
				<view class="img_a">
					<image src="../../../static/icon_26.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="basic aa" @tap="tui" >
			<view class="left_a">
				<text>我要退货</text>
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
	export default {
		data() {
			return {
				content:{},
			}
		},
		onLoad(options) {
			this.content=options
			console.log(this.content)
		},
		methods: {
			huan() {
				uni.navigateTo({
					url: './refund_01?oS='+ this.content.oS+'&lG='+this.content.lG+'&gN='+this.content.gN+'&gP='+this.content.gP+'&sKN='+this.content.sKN+'&time='+this.content.time+'&num='+this.content.num+'&orderId='+this.content.orderId+'&type=1'
				})
			},
			tui(){
				uni.navigateTo({
					url: './refund_01?oS='+ this.content.oS+'&lG='+this.content.lG+'&gN='+this.content.gN+'&gP='+this.content.gP+'&sKN='+this.content.sKN+'&time='+this.content.time+'&num='+this.content.num+'&orderId='+this.content.orderId
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
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
		    width: 100%;
		    background-color: #fff;
		    overflow: hidden;
		    padding:0 20rpx;
		    box-sizing: border-box;
		    height: 90rpx;
		    line-height: 90rpx;
		    margin-bottom: 20rpx;

		.left_a {
			float: left;

			text {
				font-size: 28upx;
				color: #333;
			}
		}

		.right_a {
			float: right;
			padding-right: 10upx;

			text {
				font-size: 28upx;
				float: right;

				text {
					color: #ff670c;
				}
			}

			.img_l {
				float: left;
				padding-right: 10upx;
				padding-top: 5upx;

				image {
					width: 45upx;
					height: 45upx;
				}

			}

			.img_a {
				float: right;
				padding: 35.5rpx 0upx 35.5upx 20upx;

				image {
					width: 12upx;
					height: 19upx;
					display: block;
				}

			}
		}
	}
</style>
