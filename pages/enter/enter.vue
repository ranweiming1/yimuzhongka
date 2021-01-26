<template>
	<view>
		<view class='d' @tap='d'>
			<view></view>
			<view></view>
		</view>
		<view class='qin'>
			<view>亲,欢迎登录</view>
			<view>没有账户?<i @tap='login'>立即注册</i></view>
		</view>
		<view class="input-tiem">
			<input v-model='phone' placeholder='请输入手机号码' class='shoujihaoma' />
			<input v-model='password' placeholder='请输入密码' password='true' class='shoujihaoma' />
		</view>
		<view class='denglu'>
			<!-- <view>短信验证码登录</view> -->
			<view @tap='xiuga'>忘记密码</view>
		</view>
		<view class='quedingxuan' @tap='denglusss()'>确认</view>
		<view class='shejiaozhanghao' v-if="pdType">社交账号登录</view>
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
		<view class='zhezhao' v-if='xianshi'>
			<view>
				<view class='bangzhu' @tap="help">帮助中心</view>
				<view class='bangzhu' @tap='xinwenzixun'>新闻</view>
				<view class='bangzhu' @tap='g'>关于我们</view>
				<view class='bangzhu' @tap='qux'>取消</view>
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
				phone: '',
				password: '',
				xianshi: false,
				pdType: '',
				es: '',
				ess: '',
				as: '',
				ass: '',
				msg: ''
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: function(e) {}
			})
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
			denglusss: function() {
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
											console.log(res)
											_this.$https({
												url: '/api/oauth/wxLogin',
												// data: JSON.stringify(res.userInfo),
												data: {
													openid: res.userInfo.openId
												},
												dengl: true,
												method: 'post',
												// haeder: true,
												success: function(res) {
													if(res.data.code>0){
														uni.showToast({
															title:res.data.message,
															icon:'none'
														})
													}
													_this.ass = JSON.stringify(res)
													uni.setStorageSync('Authorization', res.data.data.access_token)
													uni.showToast({
														title: '微信登录成功'
													})
													setTimeout(function() {
														uni.reLaunch({
															url: '../index/index'
														})
													}, 1000)
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
			},

			zhifubao: function() {
				this.$https({
					url: '/api/oauth/ali/get-auth-code ',
					data: {},
					method: 'post',
					dengl: true,
					success: res => {
						var PPALiPay = uni.requireNativePlugin('PP-Alipay')
						var _this = this
						PPALiPay.login({
							authInfo: res.data.data,
							appScheme: 'yimuzhongka'
						}, result => {
							_this.msg=JSON.stringify(result)	
							_this.$https({
								url: '/api/oauth/aliLogin',
								data: {
									aliOpenid: result.data.alipayOpenId
								},
								method: 'post',
								dengl: true,
								success: res => {
									if (res.data.code == 0) {
										uni.setStorageSync('Authorization', res.data.data.access_token)
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
										uni.showToast({
											title: '未绑定支付宝',
											icon: 'none'
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
		margin-top: 90rpx;
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
		font-size: 50rpx;
		color: #000;
		margin-bottom: 80rpx;
	}

	.qin view {
		margin-left: 20rpx;
	}

	.qin view:last-child {
		color: #999;
		font-size: 30rpx;
		margin-top: 10rpx;
	}

	.qin view i {
		color: #3462fe;
		display: inline-block;
	}

	.input-tiem {
		box-sizing: border-box;
		padding: 0 25rpx;

		input {
			height: 90rpx;
			line-height: 90rpx;
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
		margin-top: 20rpx;
		color: #000;
		font-size: 24rpx;
		width: 700rpx;
		margin: 60rpx auto;
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
		margin-top: 60rpx;
	}

	.shejiaozhanghao {
		text-align: center;
		margin-top: 60rpx;
		color: #a1b2c1;
		font-size: 30rpx;
	}

	.anniu {
		overflow: hidden;
		margin-top: 50rpx;
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
		margin-top: 60rpx;
		font-size: 28rpx;
	}

	.zhezhao {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
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
