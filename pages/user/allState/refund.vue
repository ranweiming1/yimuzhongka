<template>
	<view>

		<view class="await">
			<text>卖家同意退货</text>
		</view>

		<!-- 订单信息 -->
		<view class="xinxi">
			<view class="imgBox_a">
				<image :src="baseCont.goodsImg" mode=""></image>
			</view>
			<view class="txt_c">
				<view class="title">
					<text>{{baseCont.goodsName}}</text>
				</view>
				<view class="spec">
					<text>已选：＂{{baseCont.specValue}}＂</text>
				</view>
				<!-- 这是数量加减 -->
				<view class="jia">
					<text>x{{baseCont.buyNum}}</text>
				</view>
			</view>
		</view>
		<!-- 填充默认地址，若无，参考订单状态添加地址样式 -->
		<view class="siteBox">
			<view class="content">
				<view class="biaot">
					<text>退货信息</text>
				</view>

				<view class="p">
					<text>山东省济南市槐荫区张庄路街道路街道明南区16号楼明南区16号楼(菜鸟驿站代收)</text>
				</view>
				<view class="nome">
					<text>收件人：张继科</text>
				</view>
				<view class="call">
					<text>手机号：15066458795</text>
				</view>
			</view>

		</view>
		<view class="basic-list">
			<view class="basic aa">
				<view class="left_a">
					<text>选择物流公司</text>
				</view>
				<view class="right_a">
					<view class="img_a">
						<image src="../../../static/icon_26.png" mode=""></image>
					</view>
				</view>
				<view class="right_input">
					<input type="text" value="请输入物流公司" />
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
				<view class="right_input">
					<input type="text" value="请输入物流单号" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				baseCont: {}
			}
		},
		onLoad(option) {
			console.log(option)
			var that = this
			this.$https({
				url: '/api/shop/order-refund-detail',
				dengl: false,
				data: {
					refundId: option.id
				},
				method: 'post',
				success(res) {
					that.baseCont = res.data.data
					console.log(res.data.data)
				}
			})

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f5f5f4;
	}

	.await {
		background-color: #fff;
		width: 100%;
		padding: 0 30upx;
		margin-bottom: 20rpx;
		height: 90rpx;
		line-height: 90rpx;
		border-top: 1px solid #e5e5e5;

		text {
			font-size: 30rpx;
			color: #333;
		}
	}

	.xinxi {
		margin-bottom: 20rpx;
		background-color: #fff;
		overflow: hidden;
		width: 100%;
		padding: 30rpx;
		box-sizing: border-box;

		.imgBox_a {
			float: left;

			image {
				width: 215rpx;
				height: 160upx;
				display: block;
			}
		}

		.txt_c {
			float: left;
			width: calc(100% - 215rpx);
			padding-left: 20rpx;
			box-sizing: border-box;

			.title {
				margin-bottom: 20rpx;

				text {
					font-size: 30upx;
					line-height: 30upx;
					color: #333;
				}
			}

			.spec {
				font-size: 26upx;
				color: #999999;
				width: 95%;
				float: left;

				text {
					line-height: 30rpx;
				}
			}

			.radColor {
				float: left;
				color: #ff0000;
				font-size: 32upx;
			}

			.jia {
				float: right;
				width: 5%;
				box-sizing: border-box;
				padding-left: 10rpx;

				text {
					font-size: 26upx;
					color: #333;
				}
			}
		}
	}

	.siteBox {
		width: 100%;
		height: initial;
		padding: 28rpx 30upx;
		background-color: #fff;
		overflow: hidden;
		margin-bottom: 20rpx;
		box-sizing: border-box;

		.content {
			float: left;

			.biaot {
				padding-bottom: 20rpx;

				text {
					font-size: 30rpx;
				}
			}

			.nome {
				float: left;
				font-size: 26upx;
				color: #333;
				padding-right: 10upx;
				line-height: 45rpx;
				margin-bottom: 10rpx;
			}

			.call {
				float: right;
				font-size: 26upx;
				color: #333;
				line-height: 45rpx;
				padding-right: 10upx;
			}

			.p {
				float: left;
				font-size: 26upx;
				color: #333;
				line-height: 45rpx;
			}
		}
	}

	.basic:last-child {
		border: none;
	}

	.basic {
		width: 100%;
		background-color: #fff;
		overflow: hidden;
		padding: 0 30rpx;
		border-bottom: 1px solid #e5e5e5;
		height: 100rpx;
		line-height: 100rpx;
		box-sizing: border-box;

		.left_a {
			float: left;

			text {
				font-size: 28upx;
				color: #333;
			}
		}

		.right_input {
			float: right;
			height: 100%;

			input {
				height: 100%;
				line-height: 100%;
				font-size: 28rpx;
				color: #999999;
				text-align: right;
			}
		}

		.right_a {
			float: right;
			padding-right: 10upx;
			margin-left: 15rpx;

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

				image {
					width: 12upx;
					height: 19upx;
					display: inline-block;
					vertical-align: middle;
				}

			}
		}
	}
</style>
