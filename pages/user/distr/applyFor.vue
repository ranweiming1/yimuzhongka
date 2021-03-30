<template>
	<view>
		<!-- <view class="one_line" style="border-top:0">
		</view> -->
		<!-- <view style='margin-top:30rpx;text-align:center;margin-bottom:20rpx;'>可提现金额:￥{{ji}}</view> -->
		<view class="uni-form-item uni-column" style="border-top: 1px solid #e5e5e5;">
			<view class="title"><text>提现到</text></view>
			<input class="uni-input" disabled name="input" placeholder="微信" />
			<view class="uni-padding-wrap uni-common-mt bott" v-if="!wxName" @tap="bindWx">
				<button type="primary">绑定微信</button>
			</view>
			<view class="wx-name" v-if="wxName">
				{{wxName}}
			</view>
		</view>
		<view class="uni-form-item uni-column">
			<view class="title"><text>提现金额</text></view>
			<input class="uni-input" name="input" v-model="money" @input='judge' :placeholder="'可提现金额：' + ji+'元'" />
			<view class='uni-padding-wrap uni-common-mt bott'>
				<button type='primary' @tap='tixian'>全部提现</button>
			</view>
		</view>
		<view class="uni-form-item uni-column">
			<view class="title"><text>手机号</text></view>
			<input class="uni-input" v-model='shouji' name="input" placeholder="请输入手机号" />
		</view>
		<view class="uni-form-item uni-column">
			<view class="title"><text>验证码</text></view>
			<input class="uni-input" name="input" v-model='yanzhengz' placeholder="请输入验证码" />
			<view class="uni-padding-wrap uni-common-mt bott">
				<button type="primary" @tap='huoquyanzheng'>{{yanzh}}</button>
			</view>
		</view>
		<view class="kefuPhone" @tap='callPhone'>
			如有疑问，请联系客服
		</view>
		<view class="uni-padding-wrap uni-common-mt botts" @tap='cashOut'>
			<button type="primary" style="background: #2b5cff;">我要提现</button>
		</view>
		<!-- <view class="item-rule" @tap='ruleToggle'>
			提现规则
		</view> -->
		<!-- 提现成功弹框 -->
		<view class="cashMask" v-if="isCash">
			<view class="cash-con">
				<view class="cash-icon">
					<image src="../../../static/wxtixian.png" mode=""></image>
				</view>
				<view class="cash-text">
					提现申请发起成功，微信处理中！
				</view>
				<view class="cash-bot" @tap="goBack">
					确认
				</view>
			</view>
		</view>

	</view>

</template>

<script>
	export default {
		data() {
			return {
				ji: 0,
				shouji: '',
				yanzhengz: '',
				yanzh: '获取验证码',
				num: 60,
				fasong: true,
				phone: '',
				wxName: '',
				money: '',
				isCash: false
			}
		},
		onLoad(options) {
			var that = this
			this.ji = options.money
			this.$https({
				url: '/api/oauth/user/my-platform-phone-list',
				dengl: false,
				data: {},
				success: function(res) {
					console.log(res.data.data)
					that.phone = res.data.data[0].phone

				}
			})
			this.$https({
				url: '/api/user/my-info',
				data: {},
				denglu: false,
				success: function(res) {
					that.wxName = res.data.data.wxName
				}
			})
		},
		methods: {
			tixian() {
				this.money = this.ji
			},
			goBack() {
				this.isCash = !this.isCash
				uni.navigateBack({
					delta: 1
				})
			},
			judge(e) {
				if (e.detail.value > this.ji) {
					uni.showToast({
						title: '佣金余额不足',
						icon: 'none'
					})
				}
			},
			cashOut() {
				console.log(this.shouji, this.money)
				var that = this
				if (!this.wxName) {
					uni.showToast({
						title: '请绑定微信',
						icon: 'none'
					})
				} else if (!this.money) {
					uni.showToast({
						title: '请输入提现金额',
						icon: 'none'
					})
				} else if (!this.shouji) {
					uni.showToast({
						title: '请输入手机号',
						icon: 'none'
					})
				} else if (this.yanzhengz.length < 4) {
					uni.showToast({
						title: '请输入正确的验证码',
						icon: 'none'
					})
				} else {
					this.$https({
						url: '/api/pay/amt/entPay',
						data: {
							amount: that.money,
							phone: that.shouji,
							smsCode: that.yanzhengz
						},
						success: function(res) {
							if (res.data.code == 0) {
								that.isCash = !that.isCash
							} else {
								uni.showToast({
									title: res.data.message,
									icon: 'none'
								})
							}

							console.log(res)
						}
					})

				}
			},
			bindWx: function() {
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
											_this.$https({
												url: '/api/user/bind-wx-ali-auth-info',
												data: {
													bindType: '0',
													identityCode: res
														.userInfo.openId,
													accountName: res
														.userInfo.nickName
												},
												dengl: false,
												method: 'post',
												success: function(res) {
													// uni.setStorageSync('Authorization', res.data.data.access_token)
													if (res.data
														.code == 0) {
														uni.showToast({
															title: '微信绑定成功'
														})
														_this.$https({
															url: '/api/user/my-info',
															data: {},
															success: res => {
																_this
																	.wxName =
																	res
																	.data
																	.data
																	.wxName
															}
														})
													} else {
														uni.showToast({
															title: res
																.data
																.message,
															icon: 'none'
														})
													}

													// setTimeout(function() {
													// 	uni.reLaunch({
													// 		url: '../index/index'
													// 	})
													// }, 1000)
												}
											})
										},
										fail: function(rs) {
											console.log(rs)
											uni.showToast({
												title: '绑定失败，请重试',
												icon: 'none'
											})
											// _this.ceshiT = JSON.stringify(rs)
										},

									})

								},
								fail: function(ress) {
									uni.showToast({
										title: '绑定失败，请重试',
										icon: 'none'
									})
								}
							})
						}
					},
					fail: function(re) {
						uni.showToast({
							title: '绑定失败，请重试',
							icon: 'none'
						})
					}
				})

			},

			callPhone: function() {
				console.log(this.phone)
				uni.makePhoneCall({
					phoneNumber: this.phone,
					success: (res) => {
						console.log('调用成功!')
					},
					fail: (res) => {
						console.log('调用失败!')
					}

				});
			},
			huoquyanzheng: function() {
				var _this = this
				if (!this.$jiaoyan(this.shouji)) {
					uni.showToast({
						title: '请输入正确的手机号',
						icon: 'none'
					})
				} else {
					if (this.fasong) {
						this.fasong = false
						this.$https({
							url: '/api/oauth/sendSms/user-auth',
							data: {
								phone: this.shouji
							},
							success: function(res) {
								_this.yanzheng = '60s后重新发送'
								var timer = setInterval(function() {
									if (_this.num >= 1) {
										_this.num--
										_this.yanzh = (_this.num == 0 ? '' : _this.num + 's后') +
											'重新发送'
									} else {
										_this.fasong = true
										clearInterval(timer)
										_this.num = 60
									}
								}, 1000)
							}
						})
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f7f7f7;
	}

	.cashMask {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.3);
		z-index: 99;

		.cash-con {
			background: #fff;
			position: absolute;
			z-index: 999;
			left: 50rpx;
			right: 50rpx;
			box-sizing: border-box;
			top: 50%;
			margin-top: -50%;
			border-radius: 20rpx;
			padding: 50rpx;
			text-align: center;

			.cash-icon {
				text-align: center;
				margin-bottom: 20rpx;

				image {
					width: 100rpx;
					height: 100rpx;
					display: inline-block;
				}
			}

			.cash-text {
				font-size: 32rpx;
				margin-bottom: 50rpx;
			}

			.cash-bot {
				height: 70rpx;
				line-height: 70rpx;
				background: #007AEE;
				border-radius: 45rpx;
				color: #fff;
			}
		}
	}

	.kefuPhone {
		width: 100%;
		padding-right: 30rpx;
		text-align: right;
		box-sizing: border-box;
		font-size: 24rpx;
		color: #000000;
	}

	.item-rule {
		position: fixed;
		bottom: 40rpx;
		left: 0;
		right: 0;
		text-align: center;
		height: 80rpx;
		line-height: 80rpx;
		color: #2e2e2e;
	}

	.wx-name {
		height: 100rpx;
		line-height: 100rpx;
		float: right;
		box-sizing: border-box;
		padding-right: 30rpx;
		font-size: 28rpx;
		color: #2e2e2e;
	}

	.uni-column {
		margin-bottom: 20upx;
		background-color: #fff;
		overflow: hidden;
		height: 100rpx;
		line-height: 100rpx;

		.title {
			width: 210rpx;
			float: left;
			padding-left: 30upx;
			box-sizing: border-box;

			text {
				line-height: 90upx;
				font-size: 30upx;
			}
		}

		.uni-input {
			float: left;
			// padding-top: 27upx;
			height: 100rpx;
			line-height: 100rpx;
			font-size: 28upx;
			padding-right: 20upx;
			box-sizing: border-box;
			font-family: Microsoft YaHei;
			width: calc(100% - 440rpx);
		}
	}

	.bott {
		width: 230upx;
		float: right;
		padding: 20rpx 30rpx 20rpx 0;
		box-sizing: border-box;

		button {
			color: #007AEE;
			border: 1px solid #007AEE;
			background-color: #fff;
			border-radius: 40upx;
			font-size: 22rpx;
			font-family: Microsoft YaHei;
			height: 60rpx;
			line-height: 60rpx;
		}

	}

	.botts {
		// width: 670upx;
		position: fixed;
		bottom: 40upx;
		left: 60upx;
		right: 60rpx;
		// margin: 100rpx 60rpx 0 60rpx;

		button {
			height: 80rpx;
			line-height: 80rpx;
			border-radius: 40upx;
			font-family: Microsoft YaHei;
		}

	}
</style>
