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
				<input class="uni-input" password type="" v-model='account.password' placeholder="请输入密码" />
			</view>
			<view class="uni-form-item uni-column">
				<image src="../../static/icon_15.png" mode=""></image>
				<input class="uni-input" type="number" maxlength='4' v-model='account.checkCode' placeholder="请输入验证码" />
				<view @tap='fasongyanzhengma'><text v-if='isYan' style="border-left: 0;padding-left: 2rpx;">({{yanZ}}s)</text>{{yanText}}</view>
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
		<!-- <view class="shortcut">
			<image src="../../static/icon_16.png" mode=""></image>
			<text>第三方登录</text>
			<image src="../../static/icon_17.png" mode=""></image>
			<view class="link">
				<image src="../../static/WeChat.png" mode=""></image>
			</view>
		</view> -->

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
				isLog: false,
				yanZ: 60,
				isYan: false,
				yanText: '发送验证码',
				y: true
			}
		},
		onLoad(option) {
			if (option.phone != 'undefined') {
				this.isLog = option.isOk
				this.account.phone = option.phone == 'undefined' ? '' : option.phone
				this.account.password = option.password == 'undefined' ? '' : option.password
				this.account.checkCode = option.checkCode == 'undefined' ? '' : option.checkCode
			}
			uni.getSystemInfo({
				success: function(e) {}
			})
		},
		onShow: function() {
			if (uni.getStorageSync('Authorization')) {
				uni.showToast({
					title: '你已登录,跳转到首页',
					icon: 'none'
				})
				setTimeout(function() {
					uni.reLaunch({
						url: '../index/index'
					})
				}, 2000)
			}
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
			fasongyanzhengma: function() {
				var _this = this
				if (_this.isYan) {
					uni.showToast({
						title: '已发送验证码'
					})
					return;
				}
				if (this.$jiaoyan(this.account.phone) && this.y) {
					this.y = false
					this.$https({
						url: '/api/oauth/sendSms/user-register',
						data: {
							phone: this.account.phone
						},
						dengl: true,
						success: function(res) {
							_this.isYan = true
							var timer = setInterval(function() {
								if (_this.yanZ == 0) {
									_this.isYan = false
									_this.yanZ = 60
									clearInterval(timer)
								}
								_this.yanText = '重新发送'
								_this.yanZ--
								_this.y = true
							}, 1000)

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
				var _this = this
				if(uni.getStorageSync('yaoqi')){
					this.account.shaerCode=uni.getStorageSync('yaoqi').split('code=')[0]
				}
				if (this.isLog) {
					if (!_this.$jiaoyan(_this.account.phone)) {
						uni.showToast({
							title: '请输入正确的手机号',
							icon: 'none'
						})
					} else if (!_this.account.password.length > 5) {
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
								if (res.data) {
									uni.showToast({
										title: '操作成功'
									})
									
									setTimeout(function() {
										_this.$https({
											url: '/api/oauth/phoneLogin',
											data: {
												phone: _this.account.phone,
												password: _this.account.password
											},
											dengl: true,
											method: 'post',
											success: function(res) {
												if (res.data.data) {
													uni.setStorageSync('Authorization', res.data.data.access_token)
													uni.showToast({
														title: '登录成功'
													})
													setTimeout(function() {
														uni.reLaunch({
															url:'../index/index'
														})
													}, 1900)
													uni.setStorageSync('d', '')
												} else {
													uni.showToast({
														title: res.data.message,
														icon: 'none'
													})
												}
											}
										})
										
									}, 1500)
								} else {
									uni.showToast({
										title: res.data.message
									})
									if (res.data.message == '手机号已被注册') {
										setTimeout(function() {
											uni.navigateTo({
												url: 'enter'
											})
										}, 1000)
									}
								}
							}
						})
					}

				} else {
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
				this.isLog = e.detail.value[0]
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
		left: 30rpx;
		top: 470upx;
		right: 30rpx;
		box-sizing: border-box;

		image {
			width: 30upx;
			height: 38upx;
			float: left;
			padding-right: 20upx;
			margin-top: 31rpx;
		}

		.uni-form-item {
			overflow: hidden;
			margin: 0 auto;
			width: 100%;
			float: left;
			height: 100rpx;
			line-height: 100rpx;
			border-bottom: 1px solid #ccc;
			padding: 0 10rpx;
			box-sizing: border-box;


			input {
				height: 100rpx;
				line-height: 100rpx;
				width: calc(100% - 50rpx);
				font-size: 24upx;
				color: #999;
			}

		}

		.uni-form-item:nth-child(3) {
			input {
				width: calc(60% - 50rpx);
			}

			view {
				font-size: 24upx;
				color: #666;
				float: right;
				// padding-right: 50upx;
				width: 40%;
				text-align: center;
				border-left: 1px solid #ccc;
				box-sizing: border-box;
				height: 40rpx;
				line-height: 40rpx;
				margin-top: 25rpx;
			}
		}

		.uni-input {
			float: left;
			font-size: 24upx;
			color: #999;
		}
	}

	.bott {
		top: 830upx !important;
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
