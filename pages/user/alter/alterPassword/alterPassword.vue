<template>
	<view>
		<view class="uni-form-item uni-column">
			<view class="title"><text>手机号</text></view>
			<input class="uni-input" name="input" v-model='phone' placeholder="请输入手机号" />
		</view>
		<view class="uni-form-item uni-column">
			<view class="title"><text>验证码</text></view>
			<input class="uni-input" name="input" placeholder="请输入验证码" v-model='smsCode' maxlength='4' style='width:300rpx;' />

			<view class="uni-padding-wrap uni-common-mt bott">
				<button type="primary" @tap='huoquyanzhengma'>{{yanzh}}</button>
			</view>
		</view>
		<view class="uni-form-item uni-column">
			<view class="title"><text>新密码</text></view>
			<input class="uni-input" name="pa" placeholder="请输入密码" v-model='newPassword' password='true' />
		</view>
		<view class="uni-form-item uni-column">
			<view class="title"><text>确认密码</text></view>
			<input class="uni-input" name="input" placeholder="请输入密码" v-model='isPassword' password='true' />
		</view>
		<view class="uni-padding-wrap uni-common-mt botts">
			<button type="primary" @tap='tijiao'>提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: '',
				smsCode: '',
				newPassword: '',
				isPassword: '',
				yanzh: '获取验证码',
				nu: 60,
				z: true,
				c: ''
			}
		},
		methods: {
			//获取验证码
			huoquyanzhengma: function() {
				var _this = this
				if (!this.$jiaoyan(this.phone)) {
					uni.showToast({
						title: '手机号码不正确',
						icon:'none'
					})
				} else {
					if (this.z) {
						this.nu = 60
						this.$https({
							url: '/api/oauth/sendSms/user-password',
							data: {
								phone: this.phone
							},
							dengl: true,
							success: function(res) {
								_this.z = false
								_this.c = setInterval(function() {
									if (_this.nu >= 0) {
										_this.nu = _this.nu - 1
										_this.yanzh = _this.nu + 's后重新发送'
									} else {
										_this.yanzh = '获取验证码'
										_this.z = true
										clearInterval(_this.c)
									}
								}, 1000)
								uni.showToast({
									title: res.data.message,
									icon:'none'
								})
							}
						})
					}
				}
			},
			//提交密码
			tijiao: function() {
				if (!this.$jiaoyan(this.phone)) {
					uni.showToast({
						title: '请输入正确的手机号',
						icon: 'none'
					})
				} else
				if (this.smsCode.length < 4) {
					uni.showToast({
						title: '请输入4位数验证码',
						icon: 'none'
					})
				} else if (this.newPassword.length < 6 || this.isPassword.length < 6) {
					uni.showToast({
						title: '密码不得小于6位数',
						icon: 'none'
					})
				} else {
					this.$https({
						url: '/api/oauth/getBack-password',
						data: {
							isPassword: this.isPassword,
							newPassword: this.newPassword,
							phone: this.phone,
							smsCode: this.smsCode
						},
						haeder: true,
						dengl: true,
						method: 'post',
						success: function(res) {
							if (res.data.code == 0) {
								uni.showToast({
									title: res.data.message,
									icon: 'none'
								})
								setTimeout(function(){
									uni.clearStorageSync()
									uni.navigateTo({
										url:'../../../enter/enter?isTypes=1'
									})
						
								},1000)
							} else {
								uni.showToast({
									title: res.data.message?res.data.message:'修改失败',
									icon: 'none'
								})
							}
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f7f7f7;
	}

	button {
		background-color: #2b5cff !important;
	}

	.uni-column {
		margin-bottom: 20upx;
		background-color: #fff;
		overflow: hidden;

		.title {
			float: left;
			padding-left: 20upx;

			text {
				line-height: 90upx;
				font-size: 32upx;
			}
		}

		.uni-input {
			float: left;
			padding-top: 27upx;
			font-size: 28upx;
			padding-left: 20upx;
			font-family: Microsoft YaHei;
			width: calc(100% - 200rpx);
		}
	}

	.bott {
		width: 260upx;
		float: right;
		padding: 20upx;

		button {
			border-radius: 40upx;
			font-size: 24upx;
			font-family: Microsoft YaHei;
		}

	}

	.botts {
		width: 670upx;
		position: fixed;
		bottom: 40upx;
		left: 40upx;

		button {
			border-radius: 40upx;
			font-family: Microsoft YaHei;
		}

	}
</style>
