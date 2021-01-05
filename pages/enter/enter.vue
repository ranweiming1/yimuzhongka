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
		<view class='shejiaozhanghao'>社交账号登录</view>
		<view class='anniu'>
			<view @tap='denglu'>
				<image src='../../static/weixinanniu.png'></image>
			</view>
			<view @tap="zhifubao">
				<image src='../../static/zhifubaoanniu.png'></image>
			</view>
		</view>
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
		onLoad() {
			uni.getSystemInfo({
				success: function(e) {}
			})
		},
		data() {
			return {
				screenHeight: this.screenHeight,
				statusBarHeight: this.statusBarHeight,
				phone: '',
				password: '',
				xianshi: false,
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
										}
									})
								},
								fail: function(ress) {
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
					url: '/api/oauth/ali/get-appid',
					data: {},
					method: 'post',
					dengl: true,
					success: res => {
						var alipayUrl = 'https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=' + res.data.data +
							'&scope=auth_user&redirect_uri=https://www.yimuzk.com'
						var openURL = 'alipays://platformapi/startapp?appId=20000067&url=' + encodeURIComponent(alipayUrl)
						plus.runtime.openURL(openURL, err => {

						})
					}
				})
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
