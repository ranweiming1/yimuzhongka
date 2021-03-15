<template>
	<view>
		<!-- 头部 -->
		<!-- #ifndef H5 -->
		<view class="top">
			<view style='float:left;padding: 4rpx 35rpx;' @tap='bac'>
				<image src='../../../static/icon_26-2.png' style='width:18rpx;height:30rpx;'></image>
			</view>
			<view class="textBox">
				<text>我的佣金</text>
			</view>
			<view class="imgBox" @tap='wenti'>
				<image src="../../../static/icon_34.png" mode=""></image>
			</view>
		</view>
		<!-- #endif -->

		<!-- 分销卡片 -->
		<view class="distr">
			<view class="imgBox_a">
				<image src="../../../static/icon_35.png" mode=""></image>
			</view>
			<view class="leijis">
				<view class="one">
					<text>累计收益(元)</text>
				</view>
				<view class="two">
					<text>263.00</text>
				</view>
				<view class="three">
					<text>已含冻结金额：100元</text>
				</view>
			</view>
			<view class="shuzhi">
				<view class="jia">
					<view class="imgBox_b">
						<image src="../../../static/jia.png" mode=""></image>
					</view>
					<view class="texts">
						<view class="sou">
							<text>收入</text>
						</view>
						<view class="shu">
							<text>￥800.00</text>
						</view>
					</view>
				</view>
				<view class="jian">
					<view class="imgBox_b">
						<image src="../../../static/jia.png" mode=""></image>
					</view>
					<view class="texts">
						<view class="sou">
							<text>支出</text>
						</view>
						<view class="shu">
							<text>￥800.00</text>
						</view>
					</view>
				</view>
			</view>

			<!-- 提现 -->
			<view class="cash" @tap="t">
				提现
			</view>
		</view>
		<view style='width:100%;position:fixed;top:0;left:0;height:100%;background:rgba(0,0,0,0.5);z-index:99999;' v-if='gui'
		 @tap='g'>
			<view style='width:400rpx;height:500rpx;position:absolute;top:0;left:0;bottom:0;right:0;margin:auto;background:#fff;text-align:center'>提现规则</view>
		</view>
		<!-- 历史明细 -->
		<view class="history">
			<view class="tit_b">
				<text>历史明细</text>
			</view>

			<view class="li">
				<view class="text_y">
					<view class="phone">
						<text>用户188****2568</text>
					</view>
					<view class="neirs">
						<text>推荐好友下单结算成功</text>
					</view>
				</view>

				<!-- 增值状态 -->
				<view class="jine">
					<text>分佣+23.00</text>
				</view>
			</view>
			<view class="li">
				<view class="text_y">
					<view class="phone">
						<text>用户188****2568</text>
					</view>
					<view class="neirs">
						<text>推荐好友下单结算成功</text>
					</view>
				</view>

				<!-- 增值状态 -->
				<view class="jine">
					<text>分佣+23.00</text>
				</view>
			</view>
			<view class="li">
				<view class="text_y">
					<view class="phone">
						<text>用户188****2568</text>
					</view>
					<view class="neirs">
						<text>推荐好友下单结算成功</text>
					</view>
				</view>

				<!-- 增值状态 -->
				<view class="jine">
					<text>分佣+23.00</text>
				</view>
			</view>

			<view class="li">
				<view class="text_y">
					<view class="phone">
						<text>用户188****2568</text>
					</view>
					<view class="neirs">
						<text>推荐好友下单结算成功</text>
					</view>
				</view>

				<!-- 负值状态 -->
				<view class="jineFu">
					<text>分佣+23.00</text>
				</view>
			</view>
			<view class="li">
				<view class="text_y">
					<view class="phone">
						<text>用户188****2568</text>
					</view>
					<view class="neirs">
						<text>推荐好友下单结算成功</text>
					</view>
				</view>

				<!-- 负值状态 -->
				<view class="jineFu">
					<text>分佣+23.00</text>
				</view>
			</view>
			<view class="li">
				<view class="text_y">
					<view class="phone">
						<text>2019-09-25</text>
					</view>
					<view class="neirs">
						<text>申请提现到银行卡</text>
					</view>
				</view>

				<!-- 负值状态 -->
				<view class="jineFu">
					<text>提现-23.00</text>
				</view>
			</view>
			<view class="uni-padding-wrap uni-common-mt botts">
				<button @tap="tiX" type="primary" style="background: #2b5cff;">我要提现</button>
			</view>
		</view>
		<view style='width:100%;height:100%;position:fixed;top:0;left:0;background:rgba(0,0,0,0.6);z-index:99999;' v-if='wenzi'
		 @tap='went'>
			<view style='width:600rpx;height:200rpx;background:#fff;position:absolute;top:0;left:0;bottom:0;right:0;margin:auto;'>
				<view>问题</view>
			</view>
		</view>



	</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				wenzi: false,
				gui: false
			}
		},
		onLoad: function() {
			//佣金
			this.$https({
				url: '/api/user/my-bound-index',
				data: {},
				success: function(res) {

				}
			})
		},
		methods: {
			tiX() {
				uni.navigateTo({
					url: 'applyFor'
				})
			},
			wenti: function() {
				this.wenzi = true
			},
			went: function() {
				this.wenzi = false
			},
			t: function() {
				this.gui = true
			},
			g: function() {
				this.gui = false
			},
			bac: function() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss">
	.clear {
		height: 160rpx;
	}

	.top {
		border-bottom: 1px solid #e5e5e5;
		position: fixed;
		top: 0upx;
		left: 0upx;
		width: 750upx;
		margin: 0 auto;
		overflow: hidden;
		height: 80rpx;
		line-height: 80rpx;
		z-index: 9;
		background: #fff;
		padding-top: 70rpx !important;

		.textBox {
			padding-left: 40%;

			text {
				font-size: 30upx;
				color: #000;
				float: left;
				line-height: 80upx;
			}
		}

		.imgBox {
			float: right;

			image {
				width: 40upx;
				height: 40upx;
				padding: 15upx 30upx;
			}
		}
	}

	.distr {
		position: relative;
		top: 190rpx;
		width: 690rpx;
		left: 30rpx;
		right: 30rpx;
		overflow: hidden;
		height: 328rpx;

		.imgBox_a {
			position: absolute;
			left: 0;
			right: 0;

			image {
				width: 100%;
				height: 330upx;
				box-shadow: 0 0 8px #ccc;
			}
		}
	}

	.leijis {
		position: relative;
		// left: 30%;
		margin-top: 35upx;
		text-align: center;

		.one {
			color: #fff;
			font-size: 28upx;
		}

		.two {
			font-size: 60upx;
			font-weight: bold;
			color: #fff;
			margin-top: 10rpx;
			margin-bottom: 5rpx;
			text-shadow: 2px 2px 5px #0994da;
		}

		.three {
			color: #fff;
			font-size: 28upx;
		}
	}

	.shuzhi {
		width: 690rpx;
		position: relative;
		// left: 90rpx;
		overflow: hidden;
		margin-bottom: 45rpx;
		margin-top: 30rpx;


		.jia {
			width: 50%;
			float: left;
			box-sizing: border-box;
			padding-left: 85rpx;

			.imgBox_b {
				float: left;
				padding-top: 20upx;

				image {
					width: 40upx;
					height: 40upx;
				}
			}

			.texts {
				float: left;
				padding-left: 10upx;
				font-size: 28upx;
				color: #fff;
			}
		}

		.jian {
			width: 50%;
			float: left;
			box-sizing: border-box;
			padding-left: 85rpx;

			.imgBox_b {
				float: left;
				padding-top: 20upx;

				image {
					width: 40upx;
					height: 40upx;
				}
			}

			.texts {
				float: left;
				padding-left: 10upx;
				font-size: 28upx;
				color: #fff;
			}
		}
	}

	.cash {

		position: absolute;
		right: 80upx;
		top: 30upx;
		text-align: center;
		width: 94upx;
		height: 48upx;
		border: 1px solid #fff;
		color: #fff;
		font-size: 24upx;
		line-height: 48upx;
	}

	.history {
		// margin-bottom: 200upx;
		width: 750upx;
		position: absolute;
		top: 540upx;
		left: 0;

		.tit_b {
			width: 750upx;
			border-bottom: 20upx solid #f7f7f7;
			padding: 20upx;
			padding-left: 30upx;

			text {
				font-size: 34upx;
				color: #010101;
			}
		}

		.li {
			// width: 710upx;
			margin: 0 25rpx 0 30upx;
			overflow: hidden;
			border-bottom: 1px dashed #ccc;
			padding: 25rpx 0 25rpx 10rpx;
			box-sizing: border-box;

			.text_y {
				float: left;

				.phone {
					margin-bottom: 10upx;

					text {
						font-size: 30upx;
						color: #666;
						line-height: 35upx;
					}
				}

				.neirs {
					text {
						font-size: 30upx;
						color: #666;
						line-height: 35upx;
					}
				}

			}

			.jine {
				float: right;
				padding-top: 20upx;
				font-size: 30upx;
				color: #ff0000;
				line-height: 45upx;
			}

			.jineFu {
				float: right;
				padding-top: 20upx;
				font-size: 30upx;
				color: #3399ff;
				line-height: 35upx;
			}
		}
	}

	.botts {

		margin: 80rpx 67rpx;

		button {
			border-radius: 45upx;
			font-family: Microsoft YaHei;
			height: 80rpx;
			line-height: 80rpx;
		}

	}
</style>
