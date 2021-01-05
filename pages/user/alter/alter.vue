<template>
	<view>
		<view class="basic">
			<view class="left_a">
				<text>手机号</text>
			</view>
			<view class="right_a">
				<!-- <view class="img_a">
					<image src="../../../static/icon_26.png" mode=""></image>
				</view> -->
				<!-- <input type="text" :value="phone" disabled="true" placeholder="请输入密码" /> -->
				<text style='font-size:26rpx;line-height:70rpx;color:#999;'>{{phone?phone:'手机号'}}</text>
				<!-- <text></text> -->
			</view>
		</view>
		<!-- <view class="basic" v-if="false">
			<view class="left_a">
				<text>关联账号</text>
			</view>
			<view class="right_a">
				<view class="img_a">
					<image src="../../../static/icon_26.png" mode=""></image>
				</view> -->
		<!-- <input type="text" value="" placeholder="请输入密码" /> -->
		<!-- <text></text> -->
		<!-- </view>
		</view> -->
		<view class="basic">
			<view class="left_a">
				<text>登录手机号修改</text>
			</view>
			<view class="right_a">
				<view class="img_a">
					<image src="../../../static/icon_26.png" mode=""></image>
				</view>
				<text style='font-size:26rpx;line-height:70rpx;color:#999;' @tap='gengg'>去修改手机号</text>
				<!-- <input type="number" placeholder="请输入手机号" placeholder-style="line-height:70rpx" /> -->
				<!-- <text>15066212365</text> -->
			</view>
		</view>

		<view class="basic">
			<view class="left_a">
				<text>登录密码修改</text>
			</view>
			<view class="right_a">
				<view class="img_a">
					<image src="../../../static/icon_26.png" mode=""></image>
				</view>
				<!-- <input type="text" value="" placeholder="请输入密码" /> -->
				<text style='font-size:26rpx;line-height:70rpx;color:#999;' @tap='gm'>去修改密码</text>
				<!-- <text></text> -->
			</view>
		</view>

		<view class="basic">
			<view class="imgLogo">
				<image src="../../../static/zhifubao.png" mode=""></image>
			</view>
			<view class="imgTitle">
				<text>支付宝</text>
			</view>
			<view class="right_a">
				<view class="img_a">
					<image src="../../../static/icon_26.png" mode=""></image>
				</view>
				<text style='font-size:26rpx;line-height:70rpx;color:#999;' @tap='gm'>绑定支付宝</text>
			</view>
		</view>

		<view class="basic">
			<view class="imgLogo">
				<image src="../../../static/WeChat.png" mode=""></image>
			</view>
			<view class="imgTitle">
				<text>微信</text>
			</view>
			<view class="right_a">
				<view class="img_a">
					<image src="../../../static/icon_26.png" mode=""></image>
				</view>
				<text style='font-size:26rpx;line-height:70rpx;color:#999;' @tap='bindWx'>绑定微信</text>
			</view>
		</view>
		<!-- <view class="basic">
			<view class="left_a">
				<text>安全中心</text>
			</view>
			<view class="right_a">
				<view class="img_a">
					<image src="../../../static/icon_26.png" mode=""></image>
				</view> -->
		<!-- <input type="text" value="" placeholder="请输入密码" /> -->
		<!-- <text></text> -->
		<!-- </view>
		</view>
		<view class="basic">
			<view class="left_a">
				<text>通知公告</text>
			</view>
			<view class="right_a">
				<view class="img_a">
					<image src="../../../static/icon_26.png" mode=""></image>
				</view> -->
		<!-- <input type="text" value="" placeholder="请输入密码" /> -->
		<!-- <text></text> -->
		<!-- </view>
		</view> -->
		<view class="">
			{{ceshi+'测试111'}}
		</view>
		<view class="">
			{{ceshiT+'测试22'}}
		</view>
		<view class="">
			{{ceshiS+'返回'}}
		</view>
		<view class=" uni-padding-wrap uni-common-mt quit" @tap='t'>
			<button type="primary">退出登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: '',
				ceshi:'',
				ceshiT:'',
				ceshiS:''
			}
		},
		onLoad() {
			var _this = this
			this.$https({
				url: '/api/user/my-info',
				data: {},
				denglu: false,
				success: function(res) {
					// _this.infoList = res.data.data
					// _this.nickname = res.data.data.nickname
					// // console.log(res.data.data)
					_this.phone = res.data.data.phone
					// console.log(res.data.data)
				}
			})
		},
		methods: {
			t: function() {
				uni.setStorageSync('Authorization', '')
				uni.showToast({
					title: '退出成功'
				})
				setTimeout(function() {
					uni.navigateTo({
						url: '../../enter/enter'
					})
				}, 1000)
			},
			gengg: function() {
				uni.navigateTo({
					url: 'alterCall/alterCall'
				})
			},
			gm: function() {
				uni.navigateTo({
					url: 'alterPassword/alterPassword'
				})
			},
			bindWx: function() {
				var _this = this
				uni.getProvider({
					service: 'oauth',
					success: function(res) {
						console.log(res,9999)
						if (res.provider.indexOf('weixin') >= 0) {
							uni.login({
								provider: 'weixin',
								success: function(res) {
									// console.log(res,22)
									uni.getUserInfo({
										provider: 'weixin',
										success: function(res) {
											console.log(res,333,'测试数据')
											_this.ceshi=JSON.stringify(res.userInfo.openId)
											_this.$https({
												url: '/api/user/bind-wx-ali-auth-info',
												data:{
													bindType:'0',
													identityCode:res.userInfo.openId
												},
												dengl: false,
												method: 'post',
												success: function(res) {
													console.log(res)
													_this.ceshiS=JSON.stringify(res)
													// uni.setStorageSync('Authorization', res.data.data.access_token)
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
										fail:function(rs){
											console.log(rs)
											_this.ceshiT=JSON.stringify(rs)
										},
									
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
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f7f7f7;
	}

	.basic {
		margin-top: 20upx;
		width: 100%;
		background-color: #fff;
		overflow: hidden;
		padding: 20upx;
		padding-bottom: 20upx;
		box-sizing: border-box;

		.imgLogo {
			float: left;
			padding: 10rpx 20rpx;

			image {
				width: 50rpx;
				height: 50rpx;
				display: block;
			}
		}

		.imgTitle {
			float: left;
			line-height: 70rpx;

		}

		.left_a {
			float: left;
			padding-left: 20upx;

			text {
				font-size: 28upx;
				color: #333;
				line-height: 30upx;
				line-height: 70upx;
			}
		}



		.right_a {
			float: right;
			padding-right: 10upx;

			input {
				height: 70rpx;
				font-size: 30upx;
				float: right;
				color: #999;
				line-height: 70upx;
			}

			.input {
				height: 70rpx;
				font-size: 28upx;
				float: right;
				text-align: center;
				color: #999;
				line-height: 70upx;
			}

			.img_a {
				float: right;
				padding: 30upx 0upx 20upx 20upx;

				image {
					width: 12upx;
					height: 14upx;
					display: block;
				}

			}
		}
	}

	.basic:first-child {
		margin-top: 0;
		border-top: 1rpx solid #dce0e6;
	}

	.quit {
		overflow: hidden;
		padding-top: 10%;
		position: fixed;
		bottom: 5%;
		left: 7%;
		width: 650upx;
		margin: 0 auto;
		color: #fff;

		font-family: Microsoft YaHei;

		button {

			border-radius: 50upx 50upx;
			background-color: #dce0e6;
		}
	}
</style>
