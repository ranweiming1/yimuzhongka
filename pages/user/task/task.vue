<template>
	<view>
		<!-- 背景图 -->
		<view class="bg_img">
		</view>

		<!-- 头部 -->
		<view class="top">
			<view class="textBox">
				<text>任务中心</text>
			</view>
			<view class="imgBox">
				<image src="../../../static/icon_31.png" mode=""></image>
			</view>
		</view>

		<!-- 用户名 -->
		<view class="userBox">
			<view class="img_a">
				<image src="../../../static/img_06.jpg" mode=""></image>
			</view>
			<view class="text_a">
				<view class="yonghum">
					<text>这里是用户名</text>
				</view>
				<view class="phone">
					<text>187****2365</text>
				</view>
			</view>
			<view class="imgRight">
				<view class="uni-padding-wrap uni-common-mt bott">
					<button type="primary">点击签到</button>
				</view>
			</view>

			<view class="jil">
				<view class="leiji">
					<text>累计签到3天</text>
				</view>
				<view class="rig">
					<text>50 <text>积分数</text> </text>
					<view class="img_o">
						<image src="../../../static/icon_23.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>



		<!-- 进度条 -->
		<view class="bgWhite">
			<view class="Box">
				<view class="formerly">
					<view class="date">
						<text>+5分</text>
					</view>
					<view class="ima_p">
						<image src="../../../static/icon_32.png" mode=""></image>
					</view>
					<view class="date">
						<text>周一</text>
					</view>
				</view>

				<view class="formerly_a">
					<view class="date">
						<text>+5分</text>
					</view>
					<view class="ima_p">
						<image src="../../../static/icon_33.png" mode=""></image>
					</view>
					<view class="date">
						<text>周一</text>
					</view>
				</view>

				<view class="formerly_a">
					<view class="date">
						<text>+5分</text>
					</view>
					<view class="ima_p">
						<image src="../../../static/icon_33.png" mode=""></image>
					</view>
					<view class="date">
						<text>周二</text>
					</view>
				</view>

				<view class="formerly_b">
					<view class="date">
						<text>+5分</text>
					</view>
					<view class="ima_p">
						<image src="../../../static/icon_33.png" mode=""></image>
					</view>
					<view class="date">
						<text>周三</text>
					</view>
				</view>
				<view class="formerly_c">
					<view class="date">
						<text>+5分</text>
					</view>
					<view class="ima_p">
						<image src="../../../static/icon_33.png" mode=""></image>
					</view>
					<view class="date">
						<text>周四</text>
					</view>
				</view>
				<view class="formerly_d">
					<view class="date">
						<text>+5分</text>
					</view>
					<view class="ima_p">
						<image src="../../../static/icon_33.png" mode=""></image>
					</view>
					<view class="date">
						<text>周五</text>
					</view>
				</view>
				<view class="formerly_e">
					<view class="date">
						<text>+5分</text>
					</view>
					<view class="ima_p">
						<image src="../../../static/icon_33.png" mode=""></image>
					</view>
					<view class="date">
						<text>周六</text>
					</view>
				</view>
				<view class="formerly_f">
					<view class="date">
						<text>+5分</text>
					</view>
					<view class="ima_p">
						<image src="../../../static/icon_33.png" mode=""></image>
					</view>
					<view class="date">
						<text>周日</text>
					</view>
				</view>
			</view>
		</view>

		<view class="gain">
			<view class="tit">
				<text>做任务赚积分</text>
			</view>
			<view class="frame">
				<view class="ul">
					<view class="title_u">
						<text>购买商品</text>
					</view>
					<view class="span">
						<text>奖励10积分</text>
					</view>
					<view class="uni-padding-wrap uni-common-mt bottg">
						<button type="primary">点击签到</button>
					</view>
				</view>
				
				<view class="ul">
					<view class="title_u">
						<text>购买商品</text>
					</view>
					<view class="span">
						<text>奖励10积分</text>
					</view>
					<view class="uni-padding-wrap uni-common-mt bottg">
						<button type="primary">点击签到</button>
					</view>
				</view>
				
				<view class="ul">
					<view class="title_u">
						<text>购买商品</text>
					</view>
					<view class="span">
						<text>奖励10积分</text>
					</view>
					<view class="uni-padding-wrap uni-common-mt bottg">
						<button type="primary">点击签到</button>
					</view>
				</view>
				
				<view class="ul">
					<view class="title_u">
						<text>购买商品</text>
					</view>
					<view class="span">
						<text>奖励10积分</text>
					</view>
					<view class="uni-padding-wrap uni-common-mt bottg">
						<button type="primary">点击签到</button>
					</view>
				</view>
				
				<view class="ul">
					<view class="title_u">
						<text>购买商品</text>
					</view>
					<view class="span">
						<text>奖励10积分</text>
					</view>
					<view class="uni-padding-wrap uni-common-mt bottg">
						<button type="primary">点击签到</button>
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
	.bg_img {
		background-color: #2b5cff;
		width: 750upx;
		height: 440upx;
	}

	.top {
		position: fixed;
		top: 0upx;
		left: 0upx;
		width: 750upx;
		margin: 0 auto;
		overflow: hidden;

		.textBox {
			padding-left: 40%;

			text {
				font-size: 38upx;
				color: #fff;
				float: left;
				line-height: 90upx;
			}
		}

		.imgBox {
			float: right;

			image {
				width: 42upx;
				height: 42upx;
				padding: 30upx;
			}
		}
	}

	.userBox {
		width: 700upx;
		position: absolute;
		top: 120upx;
		left: 25upx;
		overflow: hidden;

		.img_a {
			float: left;

			image {
				width: 120upx;
				height: 120upx;
				border-radius: 120upx;
			}
		}

		.text_a {
			float: left;
			padding-left: 20upx;
			width: 350upx;

			.yonghum {
				font-size: 34upx;
				color: #fff;
				line-height: 70upx;
			}

			.phone {
				font-size: 24upx;
				color: #fff;
			}
		}

		.imgRight {
			float: right;
			padding-top: 35upx;

			image {
				width: 12upx;
				height: 20upx;
			}
		}

		.jil {
			width: 710upx;
			float: left;
			padding-left: 20upx;
			padding-right: 20upx;
			display: block;

			.leiji {
				text {
					padding-top: 30upx;
					float: left;
					font-size: 36upx;
					color: #fff;
					text-align: center;
				}
			}

			.rig {
				float: right;
				padding-right: 50upx;
				text-align: center;

				text {
					width: 100upx;
					font-size: 58upx;
					float: left;
					color: #fff;

					text {
						font-size: 20upx;
						float: left;
					}
				}

				.img_o {
					float: left;
					padding-top: 40upx;

					image {
						width: 16upx;
						height: 28upx;
					}
				}
			}

		}
	}

	.bgWhite {
		width: 660upx;
		height: 120upx;
		box-shadow: 0 0 5px #ccc;
		position: absolute;
		top: 380upx;
		left: 25upx;
		background-color: #fff;
		border-radius: 20upx;
		padding: 50upx 20upx 20upx 20upx;
	}

	.bott {
		width: 150upx;
		float: right;

		button {
			background-color: #fff;
			color: #2b5cff;
			border-radius: 40upx;
			font-size: 24upx;
			font-family: Microsoft YaHei;
		}

	}

	.Box {
		position: relative;
		padding-top: 30upx;
		width: 620upx;
		height: 2upx;
		margin-left: 20upx;
		border-bottom: 1px solid #007AFF;

		.formerly {
			position: absolute;
			top: -30upx;
			left: -15upx;
			text-align: center;

			.date {
				text {
					font-size: 24upx;
				}
			}

			.ima_p {
				image {
					width: 32upx;
					height: 32upx;
				}
			}
		}

		.formerly_a {
			position: absolute;
			top: -30upx;
			left: 12%;
			text-align: center;

			.date {
				text {
					font-size: 24upx;
				}
			}

			.ima_p {
				image {
					width: 32upx;
					height: 32upx;
				}
			}
		}

		.formerly_b {
			position: absolute;
			top: -30upx;
			left: 28%;
			text-align: center;

			.date {
				text {
					font-size: 24upx;
				}
			}

			.ima_p {
				image {
					width: 32upx;
					height: 32upx;
				}
			}
		}

		.formerly_c {
			position: absolute;
			top: -30upx;
			left: 43%;
			text-align: center;

			.date {
				text {
					font-size: 24upx;
				}
			}

			.ima_p {
				image {
					width: 32upx;
					height: 32upx;
				}
			}
		}

		.formerly_d {
			position: absolute;
			top: -30upx;
			left: 60%;
			text-align: center;

			.date {
				text {
					font-size: 24upx;
				}
			}

			.ima_p {
				image {
					width: 32upx;
					height: 32upx;
				}
			}
		}

		.formerly_e {
			position: absolute;
			top: -30upx;
			right: 13%;
			text-align: center;

			.date {
				text {
					font-size: 24upx;
				}
			}

			.ima_p {
				image {
					width: 32upx;
					height: 32upx;
				}
			}
		}

		.formerly_f {
			position: absolute;
			top: -30upx;
			right: -20upx;
			text-align: center;

			.date {
				text {
					font-size: 24upx;
				}
			}

			.ima_p {
				image {
					width: 32upx;
					height: 32upx;
				}
			}
		}
	}

	.gain {
		position: absolute;
		top: 590upx;
		left: 20upx;

		.tit {
			text {}
		}

		.frame {
			width: 660upx;
			height: 460upx;
			margin-left: 8upx;
			margin-top: 20upx;
			box-shadow: 0 0 5px #ccc;
			background-color: #fff;
			border-radius: 20upx;
			padding: 20upx 20upx 20upx 20upx;
			overflow: hidden;

			.ul {
				border-bottom: 1px dotted #ccc;
				overflow: hidden;
				margin-bottom: 20upx;
				margin-top: 20upx;
				padding-bottom: 20upx;

				.title_u {
					font-size: 30upx;
					line-height: 50upx;
					color: #333;
					float: left;
					padding-right: 20upx;
				}

				.span {
					float: left;
					font-size: 24upx;
					line-height: 50upx;
					color: #999;
				}

				.bottg {
					width: 140upx;
					float: right;

					button {
						background-color: #2b5cff;
						color: #fff;
						border-radius: 10upx;
						font-size: 22upx;
						font-family: Microsoft YaHei;
					}
				}
			}


		}

	}
</style>
