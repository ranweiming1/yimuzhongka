<template>
	<view class="pages" :style="'height:' +pageHeight+'px'">
		<view class='d' @tap='d'>
			<view></view>
			<view></view>
		</view>
		<view class='qin'>
			<view>亲,欢迎登录</view>
		</view>
		<view class="input-tiem">
			<input v-model='phone' placeholder='请输入手机号码' class='shoujihaoma' />
			<input v-model='password' placeholder='请输入密码' password='true' class='shoujihaoma' />
		</view>
		<view class='denglu'>
			<!-- <view>短信验证码登录</view> -->
			<view @tap='xiuga'>忘记密码</view>
		</view>
		<view class='quedingxuan' @tap='denglusss()'>登录</view>
		<view class="nozh">没有账户? <i @tap='login'> 立即注册</i></view>
		<view class='shejiaozhanghao' v-if="pdType">其他方式登录</view>
		<view class='anniu' v-if="pdType">
			<view @tap='denglu'>
				<image src='../../static/weixinanniu.png'></image>
			</view>
			<view @tap="zhifubao">
				<image src='../../static/zhifubaoanniu.png'></image>
			</view>
		</view>
		<view style='width:100%;overflow-x: auto;'>{{msg}}</view>
		<view class='gengduo' @tap='xuanxiangxianshi'>更多选项</view>
		<view class="clear" style="height: 100rpx;"></view>
		<view class='zhezhao' v-if='xianshi'>
			<view>
				<view class='bangzhu' @tap="help">帮助中心</view>
				<view class='bangzhu' @tap='xinwenzixun'>新闻</view>
				<view class='bangzhu' @tap='g'>关于我们</view>
				<view class='bangzhu' @tap='qux'>取消</view>
			</view>
		</view>

		<view class="check-yinsi">
			<checkbox-group class="" @change="zhuceLog">
				<checkbox class="checkbox" style="transform:scale(0.7)" :checked="isLog"><text>登录即代表您已同意</text><text
						style="color: #007AFF;" @tap.stop='yinsi(6)'>《毅木重卡隐私政策》</text></checkbox>
			</checkbox-group>
		</view>

	</view>
</template>

<script>
	export default {

		data() {
			return {
				screenHeight: this.screenHeight,
				statusBarHeight: this.statusBarHeight,
				phone: '',
				password: '',
				xianshi: false,
				pdType: '',
				es: '',
				ess: '',
				as: '',
				ass: '',
				msg: '',
				isLog: false,
				pageHeight: ''
			}
		},
		onReady() {
			var _this = this
			uni.getSystemInfo({
				success(res) {
					console.log(res)
					var phoneHeight = res.windowHeight;
					console.log(res.windowHeight, 333);
					// 计算组件的高度
					let view = uni.createSelectorQuery().select('.pages');
					view.boundingClientRect(data => {
						// _this.navHeight = data.height;
						console.log(data.height, 333444);
						_this.pageHeight = phoneHeight >= data.height ? phoneHeight : data.height
					}).exec();
				}
			});
		},
		onLoad() {
			var _this = this

			if (uni.getStorageSync('pdType')) {
				_this.pdType = uni.getStorageSync('pdType')
			} else {
				_this.$https({
					url: '/api/oauth/wx-ali-auth-login-switch',
					method: 'POST',
					dengl: true,
					data: {},
					success(res) {
						uni.setStorageSync('pdType', res.data.data == 'disable' ? false : true)
						_this.pdType = res.data.data == 'disable' ? false : true
					}
				})
			}

		},

		computed: {
			style() {
				let style = `height:${this.screenHeight - this.statusBarHeight}px; `;
				return style;
			},
		},
		methods: {
			zhuceLog(e) {
				console.log(e)
				this.isLog = !this.isLog
				// console.log(this.isLog)
			},
			yinsi() {
				uni.navigateTo({
					url: './protocol?type=6'
				})
			},
			denglusss: function() {
				if (this.isLog) {
					this.$https({
						url: '/api/oauth/phoneLogin',
						data: {
							phone: this.phone,
							password: this.password
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
									uni.navigateBack({
										delta: 1
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
				} else {
					uni.showToast({
						title: '请阅读并勾选页面底部协议',
						icon: 'none'
					})
				}
			},
			//跳转到注册页面
			login: function() {
				uni.navigateTo({
					url: 'login'
				})
			},
			//跳转到修改密码
			xiuga: function() {
				uni.navigateTo({
					url: '../user/alter/alterPassword/alterPassword'
				})
			},
			denglu: function() {
				var _this = this
				if (this.isLog) {
					uni.getProvider({
						service: 'oauth',
						success: function(res) {
							if (res.provider.indexOf('weixin') >= 0) {
								uni.login({
									provider: 'weixin',
									success: function(res) {
										_this.as = JSON.stringify(res)
										uni.getUserInfo({
											provider: 'weixin',
											success: function(res) {
												_this.$https({
													url: '/api/oauth/wxLogin',
													// data: JSON.stringify(res.userInfo),
													data: {
														openid: res
															.userInfo
															.openId
													},
													dengl: true,
													method: 'post',
													// haeder: true,
													success: function(res) {
														if (res.data.code > 0) {
															uni.showModal({
																title: '您未绑定微信，请先登录账号',
																cancelText: '去登录',
																confirmText: '去注册',
																success: res => {
																	if (res.confirm) {
																		uni.navigateTo({
																			url: 'login'
																		})
																	}
																}
															})
															return false
														}else{
															_this.ass =JSON.stringify(res)
															uni.setStorageSync('Authorization',res.data.data.access_token)
															uni.showToast({
																title: '微信登录成功'
															})
															setTimeout(
																function() {
																	uni.reLaunch({
																		url: '../index/index'
																	})
																}, 1000
															)
														}
														
													}
												})
											},
											fail(err) {
												_this.ess = JSON.stringify(err)
											}
										})
									},
									fail: function(ress) {
										_this.es = JSON.stringify(ress)
										uni.getUserInfo({
											provider: 'weixin',
											success: function(res) {}
										})
									}
								})
							}
						},
						fail: function(re) {
							_this.q = JSON.stringify(re)
						}
					})
				} else {
					uni.showToast({
						title: '请阅读并勾选页面底部协议',
						icon: 'none'
					})
				}
			},

			zhifubao: function() {
				// var x =
				// 	"success=true&result_code=200&app_id=2021002109663210&auth_code=bd7c5b7f1978452ca1c090c6ee97SX14&scope=kuaijie&alipay_open_id=20881021499251069541915331413014&user_id=2088912697617145&target_id=7839630598576605153"
				// console.log(x.split('&'))


				// var msg = x.split('&').filter(function(item) {
				// 	console.log(item)
				// 	return item.split('=')[0] == 'alipay_open_id'
				// })


				if (this.isLog) {
					this.$https({
						url: '/api/oauth/ali/get-auth-code ',
						data: {},
						method: 'post',
						dengl: true,
						success: res => {
							let alipayLogin = uni.requireNativePlugin("henter-alipay-login")
							var _this = this
							alipayLogin.login({
								authInfo: res.data.data,
								appScheme: 'yimuzhongka'
							}, result => {
								// consresult.resultole.log(result)
								var msg = ''
								result.result.split('&').map(function(val, i) {
									if (val.split('=')[0] == 'alipay_open_id') {
										console.log(val, val.split('=')[1])
										msg = val.split('=')[1]
									}
								})
								_this.$https({
									url: '/api/oauth/aliLogin',
									data: {
										aliOpenid: msg
									},
									method: 'post',
									dengl: true,
									success: res => {
										console.log(res, 888)
										if (res.data.code == 0) {
											uni.setStorageSync('Authorization', res
												.data
												.data.access_token)
											uni.showToast({
												title: '支付宝登录成功',
												icon: 'none'
											})
											setTimeout(function() {
												uni.reLaunch({
													url: '../index/index'
												})
											}, 2600)
										} else {
											uni.showModal({
												title: '您未绑定支付宝，请先登录账号',
												cancelText: '去登录',
												confirmText: '去注册',
												success: res => {
													if (res.confirm) {
														uni.navigateTo({
															url: 'login'
														})
													}
												}
											})
										}

									}
								})
							})
						}
					})
					// var self=this
					// uni.request({
					// 	url:'http://f16f9b26-294e-4306-abba-67659f8e5ad8.bspapp.com/http/alipay',
					// 	success(data) {
					// 		data = data.data
					// 		if (data.status == 200) {
					// 			let authInfo = data.data.data;
					// 			const PPAliPay = uni.requireNativePlugin('PP-Alipay');
					// 			PPAliPay.login({ authInfo: authInfo,appScheme:'alipay123456789' }, result => {
					// 				self.msg = JSON.stringify(result)
					// 				console.log(JSON.stringify(result))
					// 			});
					// 		}
					// 	}
					// })
				} else {
					uni.showToast({
						title: '请阅读并勾选页面底部协议',
						icon: 'none'
					})
				}
			},
			help: function() {
				uni.navigateTo({
					url: '/pages/user/commission/commission'
				})
			},
			d: function() {
				uni.navigateBack({
					delta: 1
				})
			},
			xuanxiangxianshi: function() {
				this.xianshi = true
			},
			xinwenzixun: function() {
				uni.navigateTo({
					url: '../news/news'
				})
			},
			g: function() {
				uni.navigateTo({
					url: '../user/AboutUs/AboutUs'
				})
			},
			qux: function() {
				this.xianshi = false
			}
		}
	}
</script>

<style lang="scss">
	.pages {
		position: relative;
	}

	.check-yinsi {
		position: absolute;
		bottom: 50rpx;
		left: 0;
		right: 0;

		.checkbox {
			text {
				margin-left: 10rpx;
			}
		}
	}

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
		top: 500upx;
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
			margin-bottom: 80upx;
			border-bottom: 1px solid #ccc;
		}

		.uni-input {
			float: left;
			line-height: 40upx;
			font-size: 24upx;
			color: #999;
		}
	}

	.bott {
		top: 780upx !important;
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

	.d {
		padding-top: 90rpx;
		margin-left: 50rpx;
		font-size: 30rpx;
		height: 100rpx;
	}

	.d view {
		width: 5rpx;
		height: 50rpx;
		background: #111;
		transform: rotateZ(-135deg);
		position: absolute;
	}

	.d view:first-child {
		transform: rotateZ(135deg);
	}

	.qin {
		margin-top: 80rpx;
		text-align: center;
		font-size: 50rpx;
		color: #000;
		margin-bottom: 80rpx;
	}

	.qin view {
		margin-left: 20rpx;
	}

	.nozh {
		color: #000;
		font-size: 30rpx;
		margin-top: 40rpx;
		margin-bottom: 80rpx;

		text-align: center;
	}

	.nozh i {
		margin-left: 15rpx;
		font-weight: bold;
		color: #fe3434;
		display: inline-block;
	}

	.input-tiem {
		box-sizing: border-box;
		padding: 0 25rpx;

		input {
			height: 100rpx;
			line-height: 100rpx;
			color: #999;
			font-size: 28rpx;
			border-bottom: 1px solid #ddd;
			padding: 0 10rpx;
		}
	}

	// .shoujihaoma {
	// 	width: 700rpx;
	// 	margin: 0 auto;
	// 	line-height: 80rpx;
	// 	color: #999;
	// 	font-size: 28rpx;
	// 	border-bottom: 1px solid #ddd;
	// 	margin-top: 20rpx;
	// 	padding-bottom: 20rpx;
	// }

	.denglu {
		overflow: hidden;
		color: #000;
		font-size: 24rpx;
		width: 100%;
		padding: 25rpx 25rpx 40rpx 25rpx;
		box-sizing: border-box;
	}

	.denglu view {
		display: inline-block;
	}

	.denglu view:last-child {
		float: right;
	}

	.quedingxuan {
		width: 700rpx;
		margin: 0 auto;
		background: #3462fe;
		color: #fff;
		height: 94rpx;
		line-height: 94rpx;
		text-align: center;
		border-radius: 50rpx;
		// margin-top: 60rpx;
	}

	.shejiaozhanghao {
		text-align: center;
		// margin-top: 60rpx;
		color: #a1b2c1;
		font-size: 30rpx;
	}

	.anniu {
		overflow: hidden;
		margin-top: 10rpx;
		text-align: center;
	}

	.anniu view {
		display: inline-block;
		width: 100rpx;
		height: 100rpx;
		background: #00c486;
		border-radius: 50%;
		margin: 40rpx 50rpx;
	}

	.anniu view:nth-child(2) {
		background: #00baef;
	}

	.anniu view:nth-child(3) {
		background: #009fe8;
	}

	.anniu image {
		width: 50rpx;
		height: 40rpx;
		margin-top: 30rpx;
	}

	.gengduo {
		color: #666;
		text-align: center;
		// margin-top: 60rpx;
		font-size: 28rpx;
		padding-bottom: 80rpx;

	}

	.zhezhao {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 99;
		background: rgba(0, 0, 0, 0.2);
	}

	.zhezhao>view {
		background: #fff;
		height: 385rpx;
		border-radius: 10rpx 10rpx 0 0;
		position: fixed;
		bottom: 0;
		width: 100%;
		left: 0;
	}

	.bangzhu {
		width: 700rpx;
		border-bottom: #efefef;
		color: #000;
		font-size: 26rpx;
		text-align: center;
		height: 90rpx;
		line-height: 90rpx;
		margin: 0 auto;
	}

	.bangzhu:nth-child(3) {
		border-bottom: 0;
	}

	.bangzhu:last-child {
		border-top: #efefef solid 13rpx;
		width: 100%;
		border-bottom: none;
	}
</style>
