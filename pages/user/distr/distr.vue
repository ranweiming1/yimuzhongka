<template>
	<view>
		<!-- 头部 -->
		<view class="top toubu">
			<view class="textBox">
				<text>分销员</text>
			</view>
			<view class="imgBox" @tap='wenti'>
				<image src="../../../static/icon_34.png" mode=""></image>
			</view>
		</view>

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
				<text style='display:block;border-radius:50%;'>?</text>
			</view>
		</view>
<view style='width:100%;position:fixed;top:0;left:0;height:100%;background:rgba(0,0,0,0.5);z-index:99999;' v-if='gui' @tap='g'>
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
		</view>
		<view style='width:100%;height:100%;position:fixed;top:0;left:0;background:rgba(0,0,0,0.6);z-index:99999;' v-if='wenzi' @tap='went'>
			<view style='width:600rpx;height:200rpx;background:#fff;position:absolute;top:0;left:0;bottom:0;right:0;margin:auto;'>
				<view>问题</view>
			</view>
		</view>
		<view class="uni-padding-wrap uni-common-mt botts">
			<button @tap="tiX" type="primary" style="background: #2b5cff;">我要提现</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				wenzi:false,
				gui:false
			}
		},
		methods: {
			tiX() {
				uni.navigateTo({
					url:'applyFor'
				})
			},
			wenti:function(){
				this.wenzi=true
			},
			went:function(){
				this.wenzi=false
			},
			t:function(){
				this.gui=true
			},
			g:function(){
				this.gui=false
			}
		}
	}
</script>

<style lang="scss">
	.top {
		border-bottom: 1px solid #ccc;
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
				color: #333;
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

	.distr {
		position: relative;
		top: 190upx;
		left: 25upx;

		.imgBox_a {
			image {
				width: 700upx;
				height: 270upx;
				box-shadow: 0 0 8px #ccc;
			}
		}
	}

	.leijis {
		position: absolute;
		left: 30%;
		top: 20upx;
		text-align: center;

		.one {
			color: #fff;
			font-size: 28upx;
		}

		.two {
			font-size: 72upx;
			font-weight: bold;
			color: #fff;
		}
	}

	.shuzhi {
		width: 700upx;
		position: absolute;
		top: 170upx;
		left: 60upx;
		overflow: hidden;

		.jia {
			width: 200upx;
			float: left;

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
			margin-left: 30%;
			float: left;

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
		width: 40upx;
		border: 1px solid #fff;
		border-radius:50%;
		text {
			line-height: 40upx;
			color: #fff;
			font-size: 26upx;
		}
	}

	.history {
		padding-bottom: 100upx;
		width: 750upx;
		position: absolute;
		top: 460upx;
		left: 0;

		.tit_b {
			width: 750upx;
			border-bottom: 20upx solid #f7f7f7;
			padding: 20upx;

			text {
				font-size: 36upx;
				color: #333;
			}
		}

		.li {
			width: 710upx;
			padding: 20upx;
			overflow: hidden;
			border-bottom: 1px dotted #ccc;

			.text_y {
				float: left;

				.phone {
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
				line-height: 35upx;
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
		width: 620upx;
		position: fixed;
		bottom: 40upx;
		left: 65rpx;

		button {
			border-radius: 40upx;
			font-family: Microsoft YaHei;
		}

	}
</style>
