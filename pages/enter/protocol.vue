<template>
	<view>
		<!-- 背景 -->
		<view :style="style" class="bg_img">
			<image src="../../static/icon_12.png" mode=""></image>
			<image src="../../static/icon_13.png" mode=""></image>
		</view>
		<view class="white">
			<view class="title">
				平台注册协议须知
			</view>
			<!-- 内容较多，需要右侧有进度条，进度条样式参考效果图 -->
			<text> 一、《用户协议》条款的接受
				请您认真阅读本协议，尤其是免除或者限制本平台责任的条款及其它限制您权利的条款，一旦您注册即表示您已经阅读并且同意与本平台达成协议，完全理解并接受所有的《用户协议》条款。阅读本协议过程中，如果您不同意本协议或其中任何条款约定，您应立即停止注册程序。
				二、用户注册条件1、用户申请注册成为本平台的用户应同时满足下列全部条件： 在注册之日以及此后使用本平台服务期间必须以恋爱或者婚姻为目的； 在注册之日以及此后使用本平台服务期间必须是单身状态，包括未婚、离异或是丧偶；
				在注册之日必须年满18周岁以上。
				请您认真阅读本协议，尤其是免除或者限制本平台责任的条款及其它限制您权利的条款，一旦您注册即表示您已经阅读并且同意与本平台达成协议，完全理解并接受所有的《用户协议》条款。阅读本协议过程中，如果您不同意本协议或其中任何条款约定，您应立即停止注册程序。
				二、用户注册条件1、用户申请注册成为本平台的用户应同时满足下列全部条件
			</text>
			<view class="span">
				<view class="uni-padding-wrap">
					<view>
						<checkbox-group @change='checkchange'>
							<checkbox class="checkbox" style="transform:scale(0.7)" :checked="isOk" value='1'><text style="font-size: 28rpx;">我已仔细阅读，并同意履行该协议须知</text></checkbox>
						</checkbox-group>
					</view>
				</view>
			</view>
			<view class="uni-padding-wrap uni-common-mt bott" @click="zhuce">
				<button type="primary" style='background:#1a5fe3'>注册</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(option) {
			// console.log(option)
			// console.log('-=-=-=-=-=-')
			// console.log(this.CustomBar * 1)
			this.phone = option.phone
			this.password = option.password
			this.checkCode = option.checkCode
			uni.getSystemInfo({
				success: function(e) {
					// console.log(e)
				}
			})
		},
		data() {
			return {
				screenHeight: this.screenHeight,
				statusBarHeight: this.statusBarHeight,
				isOk: false,
				phone: '',
				password: '',
				checkCode: ''
			}
		},
		computed: {
			style() {
				let style = `height:${this.screenHeight - this.statusBarHeight}px; `;
				return style;
			},

		},
		methods: {
			checkchange(e) {
				this.isOk = e.detail.value[0]
				// console.log(this.isOk)

			},
			zhuce() {
				var _this = this
				if (this.isOk) {
					uni.navigateTo({
						url: './login?isOk=' + _this.isOk+'&phone='+this.phone+'&password='+this.password+'&checkCode='+this.checkCode
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.bg_img {
		width: 100%;

		image:nth-child(1) {
			width: 100%;
			height: 400upx;
			position: absolute;
			top: 0;
			left: 0;
		}

		image:nth-child(2) {
			width: 100%;
			height: 130upx;
			position: fixed;
			bottom: 0;
			left: 0;
		}
	}

	.white {
		z-index: 999999;
		margin: 0 auto;
		background-color: #fff;
		width: 690upx;
		height: initial;
		border-radius: 20upx;
		box-shadow: 0 0 5px #ccc;
		position: fixed;
		top: 5%;
		left: 30upx;
		padding-bottom: 30upx;

		.title {
			text-align: center;
			line-height: 100upx;
			height: 100upx;
			font-size: 36upx;
			border-bottom: 1px solid #ccc;
			font-family: Microsoft YaHei;
		}

		text {
			display: block;
			padding: 20upx;
			color: #666;
			line-height: 50upx;
			font-size: 26upx;
		}

		.span {
			font-size: 26upx;
			padding-bottom: 20upx;
			color: #999;
			padding-left: 20upx;
		}

		.span text {
			line-height: 40upx;

		}

		.bott {
			width: 210upx;
			margin: 0 auto;

		}

		.bott button {
			border-radius: 80upx;
		}

	}
</style>
