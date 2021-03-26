<template>
	<view>
		<!-- <view class="one_line" style="border-top:0">
		</view> -->
		<!-- <view style='margin-top:30rpx;text-align:center;margin-bottom:20rpx;'>可提现金额:￥{{ji}}</view> -->
		<view class="uni-form-item uni-column" style="border-top: 1px solid #e5e5e5;">
			<view class="title"><text>提现到</text></view>
			<input class="uni-input" name="input" placeholder="微信" />
			<view class="uni-padding-wrap uni-common-mt bott">
				<button type="primary">绑定微信</button>
			</view>
		</view>
		<view class="uni-form-item uni-column">
			<view class="title"><text>提现金额</text></view>
			<input class="uni-input" name="input" :placeholder="'可提现金额：' + ji+'元'" />
			<view class='uni-padding-wrap uni-common-mt bott'>
				<button type='primary'>全部提现</button>
			</view>
		</view>
		<view class="uni-form-item uni-column">
			<view class="title"><text>绑定手机号</text></view>
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
		<view class="uni-padding-wrap uni-common-mt botts">
			<button type="primary" style="background: #2b5cff;">我要提现</button>
		</view>
		<!-- <view class="item-rule" @tap='ruleToggle'>
			提现规则
		</view> -->
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
				phone: ''
			}
		},
		onLoad() {
			var that=this
			this.$https({
				url: '/api/oauth/user/my-platform-phone-list',
				dengl: false,
				data: {},
				success: function(res) {
					console.log(res.data.data)
					that.phone = res.data.data[0].phone

				}
			})
		},
		methods: {
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
		width: 670upx;
		position: fixed;
		bottom: 40upx;
		left: 40upx;
		// margin: 100rpx 60rpx 0 60rpx;

		button {
			border-radius: 40upx;
			font-family: Microsoft YaHei;
		}

	}
</style>
