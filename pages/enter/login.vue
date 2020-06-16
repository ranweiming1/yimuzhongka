<template>
	<view>
		<!-- 背景 -->
		<view :style="style" class="bg_img">
			<image src="../../static/icon_12.png" mode=""></image>
			<image src="../../static/icon_13.png" mode=""></image>
		</view>
		<!-- logo -->
		<view class="logo">
			<image src="../../static/logo.png" mode=""></image>
		</view>
		<!-- 输入框 -->
		<view class="uni-common-mt">
			<view class="uni-form-item uni-column">
				<image src="../../static/icon_14.png" mode=""></image>
				<input class="uni-input" type="number" v-model='account.phone' placeholder="请输入手机号" />
			</view>
			<view class="uni-form-item uni-column">
				<image src="../../static/icon_15.png" mode=""></image>
				<input class="uni-input" password type="text" v-model='account.password' placeholder="请输入密码" />
			</view>
			<view class="uni-form-item uni-column">
				<image src="../../static/icon_15.png" mode=""></image>
				<input class="uni-input" type="number" v-model='account.checkCode' placeholder="请输入验证码" />
				<text @tap='fasongyanzhengma'>发送验证码</text>
			</view>
		</view>
		<!-- 提交按钮 -->
		<view class="uni-padding-wrap uni-common-mt bott">
			<button type="primary" @tap='zhuce'>注册</button>
			<view class="enroll" @tap='enter'>
				<text>已有账号？立即登录</text>
			</view>
			<checkbox-group @change="zhuceLog">
				<checkbox class="checkbox" style="transform:scale(0.7)" :checked="isLog" value="1"><text @tap="prot">注册协议</text></checkbox>
			</checkbox-group>
		</view>
		<!-- 第三方登录 -->
		<view class="shortcut">
			<image src="../../static/icon_16.png" mode=""></image>
			<text>第三方登录</text>
			<image src="../../static/icon_17.png" mode=""></image>
			<view class="link">
				<image src="../../static/WeChat.png" mode=""></image>
				<image src="../../static/QQ.png" mode=""></image>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				screenHeight: this.screenHeight,
				statusBarHeight: this.statusBarHeight,
				//账户信息
				account: {},
				isLog:false
			}
		},
		onLoad(option) {
			// console.log(option)
			if (option.isOk) {
				this.isLog = option.isOk
				this.account.phone = option.phone
				this.account.password = option.password
				this.account.checkCode = option.checkCode
			}
			uni.getSystemInfo({
				success: function(e) {
					// console.log(e)
				}
			})
		},
		computed: {
			style() {
				let style = `height:${this.screenHeight - this.statusBarHeight}px; `;
				return style;
			},

		},
		methods: {
			enter: function() {
				uni.navigateTo({
					url: 'enter'
				})
			},
			//发送验证码
			fasongyanzhengma: function() {
				if (this.$jiaoyan(this.account.phone)) {
					this.$https({
						url: '/api/oauth/sendSms/user-register',
						data: {
							phone: this.account.phone
						},
						dengl: true,
						success: function(res) {
							if (res.data.data) {
								uni.showToast({
									title: '发送成功'
								})
							} else {
								uni.showToast({
									title: res.data.message,
									icon: 'none'
								})
							}
						}
					})
				} else {
					uni.showToast({
						title: '请输入正确的手机号',
						icon: 'none'
					})
				}
			},
			//注册按钮
			zhuce: function() {
				var _this=this
				if(this.isLog){
					if (!_this.$jiaoyan(_this.account.phone)) {
							uni.showToast({
								title: '请输入正确的手机号',
								icon: 'none'
							})
						} else if (!_this.account.password.length<6) {
							uni.showToast({
								title: '请输入大于6位的密码',
								icon: 'none'
							})
						} else if (!_this.account.checkCode) {
							uni.showToast({
								title: '请输入验证码',
								icon: 'none'
							})
						} else {
							_this.$https({
								url: '/api/oauth/register',
								data: _this.account,
								dengl: true,
								method: 'post',
								success: function(res) {
									uni.showToast({
										title: res.data.message
									})
									setTimeout(function() {
										uni.navigateTo({
											url: 'enter'
										})
									}, 1500)
								}
							})
						}
					
				}else{
					uni.showToast({
					    title: '请勾选注册协议',
					});
				}
				
				},
			prot() {
				uni.navigateTo({
					url: './protocol?phone=' + this.account.phone + '&password=' + this.account.password + '&checkCode=' + this.account
						.checkCode
				})
			},
			zhuceLog(e) {
				// if(this.isLog){
				// // this.isLog=1
				// }
				this.isLog=e.detail.value[0]
				console.log(this.isLog)

			}
		}

	}
</script>

<style lang="scss">
	.bg_img {
		width: 100%;

		// position: relative;
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

	.logo {
		position: absolute;
		left: 25%;
		top: 8%;

		image {
			width: 360upx;
			height: 100upx;
		}
	}

	.uni-common-mt {
		position: fixed;
		left: 20upx;
		top: 470upx;
		width: 90%;
		margin: 0 auto;
		margin-left: 2%;

		image {
			width: 30upx;
			height: 38upx;
			float: left;
			padding-right: 20upx;
			padding-bottom: 20upx;
		}

		.uni-form-item {
			margin: 0 auto;
			width: 100%;
			float: left;
			margin-bottom: 40upx;
			border-bottom: 1px solid #ccc;

			text {
				font-size: 24upx;
				color: #666;
				float: right;
				padding-right: 50upx;
				border-left: 1px solid #ccc;
				padding-left: 50upx;
			}
		}

		.uni-input {
			float: left;
			line-height: 40upx;
			font-size: 24upx;
			color: #999;
		}
	}

	.bott {
		top: 800upx !important;
		font-family: Microsoft YaHei;
	}

	.bott button {
		border-radius: 50upx;
		line-height: 90upx;
		background-color: #1a5fe3;
		box-shadow: -1px 4px 5px #B5B5B5;
	}

	.enroll {
		float: left;
		padding-top: 30upx;

	}

	.enroll text {
		font-size: 26upx;
		color: #333;
	}

	.checkbox {
		float: right;
		padding-top: 30rpx;
	}

	.forget {
		float: right;
		padding-top: 30upx;
	}

	.forget text {
		font-size: 26upx;
		color: #333;
	}

	.shortcut {
		display: block;
		text-align: center;
		position: fixed;
		bottom: 110upx;
		left: 10%;
		font-size: 24upx;
		color: #666;

		.link {
			display: block;

			image {
				margin: 50upx;
				width: 85upx;
				height: 85upx;
			}

		}
	}

	.shortcut text {
		padding: 20upx;
		line-height: 40upx;
	}

	.shortcut image {
		width: 220upx;
		height: 2upx;
	}
</style>
