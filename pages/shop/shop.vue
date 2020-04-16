<template>
	<view>
		<view class="bg">
			<image src="../../static/icon_39.png" mode=""></image>
		</view>

		<!-- 头部 -->
		<view class="top">
			<view class="textBox">
				<input class="uni-input" focus placeholder="请输入关键字" />
			</view>
			<view class="imgBox">
				<image src="../../static/icon_40.png" mode=""></image>
			</view>
		</view>

		<view class="head">
			<view class="head_img">
				<image src="../../static/img_13.jpg" mode=""></image>
			</view>
			<view class="head_text">
				<view class="h2">
					<text>九块九车品专营店</text>
				</view>

				<!-- 根据星级综合分值现实 -->
				<view class="star1">
					<image src="../../static/icon_41.png" mode=""></image>
				</view>
			</view>
			<view class="collect">
				<text>收藏店铺</text>
			</view>
		</view>

		<!-- banner 轮播图-->
		<view class="banner">
			<image src="../../static/banner.jpg" mode=""></image>
		</view>

		<!-- 优惠券入口 -->
		<view class="ticket_a">
			<image src="../../static/icon_42.png" mode=""></image>
		</view>

		<!-- 热门推荐 -->
		<view class="BoxBox">
			<view class="biaot">
				<text>热门推荐</text>
				<view class="dele">
					<text>更多</text>
				</view>
			</view>
			
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

	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.bg {
		position: absolute;
		top: 0upx;
		left: 0upx;

		image {
			width: 750upx;
			height: 450upx;
		}
	}

	.top {
		position: absolute;
		top: 20upx;
		right: 20upx;
		z-index: 99;
		overflow: hidden;

		.textBox {
			float: left;
			background-color: rgba(255, 255, 255, 0.6);
			border-radius: 50upx;

			input {
				height: 60upx;
				width: 520upx;
				line-height: 60upx;
				padding-left: 20upx;
				font-size: 26upx;
			}

			.uni-input-placeholder {
				color: #ffffff !important;
			}

		}

		.imgBox {
			padding-left: 30upx;
			padding-right: 20upx;
			float: right;

			image {
				width: 40upx;
				height: 7upx;
			}
		}
	}

	.head {
		width: 710upx;
		position: absolute;
		left: 30upx;
		top: 150upx;

		.head_img {
			float: left;

			image {

				width: 115upx;
				height: 115upx;
				border-radius: 5upx;
			}
		}

		.head_text {
			float: left;
			padding-left: 20upx;

			.h2 {
				text {
					font-size: 36upx;
					color: #fff;
				}
			}

			.star1 {
				padding-top: 20upx;

				image {
					width: 216upx;
					height: 36upx !important;
					display: block;
				}
			}
		}

		.collect {
			float: right;
			margin-top: 30upx;
			text-align: center;
			width: 150upx;
			height: 50upx;
			border: 1px solid #fff;
			border-radius: 40upx;

			text {
				padding-bottom: 20upx;
				overflow: hidden;
				font-size: 20upx;
				color: #fff;
				line-height: 30upx;
			}
		}

	}

	.banner {
		width: 93%;
		position: absolute;
		top: 300upx;
		left: 30upx;
		margin: 0 auto;
		display: block;
		box-shadow: 0 0 5px #999;
		border-radius: 20upx;

		image {
			width: 100%;
			height: 262upx;
			margin: 0 auto;
			display: block;
			border-radius: 20upx;
		}
	}

	.ticket_a {
		position: absolute;
		top: 580upx;
		left: 30upx;

		image {
			width: 690upx;
			height: 205upx;
		}
	}

	.BoxBox {
		background-color: #fff;
		position: absolute;
		top: 800upx;
		left: 0upx;
		margin-bottom:70upx;
	}

	.biaot {
		border-bottom: 1px solid #ccc;
		font-size: 30upx;
		line-height: 80upx;
		padding-left: 20upx;

		.dele {
			float: right;
			padding-right: 20upx;

			text {
				font-size: 26upx;
				color: #666;
				line-height: 50upx;
			}
		}
	}

	.list {
		width: 710upx;
		margin: 20upx;
		overflow: hidden;
		padding-top: 10upx;

		.content {
			display: black;
			width: 100%;
			// height: 250upx;
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
	}
</style>
