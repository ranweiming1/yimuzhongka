<template>
	<view>
		<view class="basic">
			<view class="left_a">
				<text>手机号</text>
			</view>
			<view class="right_a">
				<view class="img_a">
					<image src="../../../static/icon_26.png" mode=""></image>
				</view>
				<input type="text" :value="phone" disabled="true" placeholder="请输入密码" />
				<!-- <text></text> -->
			</view>
		</view>
		<view class="basic" v-if="false">
			<view class="left_a">
				<text>关联账号</text>
			</view>
			<view class="right_a">
				<view class="img_a">
					<image src="../../../static/icon_26.png" mode=""></image>
				</view>
				<input type="text" value="" placeholder="请输入密码" />
				<!-- <text></text> -->
			</view>
		</view>
		<view class="basic">
			<view class="left_a">
				<text>登录手机号修改</text>
			</view>
			<view class="right_a">
				<view class="img_a">
					<image src="../../../static/icon_26.png" mode=""></image>
				</view>
				<input type="number" placeholder="请输入手机号" placeholder-style="line-height:70rpx" />
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
				<input type="text" value="" placeholder="请输入密码" />
				<!-- <text></text> -->
			</view>
		</view>
		<view class="basic">
			<view class="left_a">
				<text>安全中心</text>
			</view>
			<view class="right_a">
				<view class="img_a">
					<image src="../../../static/icon_26.png" mode=""></image>
				</view>
				<!-- <input type="text" value="" placeholder="请输入密码" /> -->
				<!-- <text></text> -->
			</view>
		</view>
		<view class="basic">
			<view class="left_a">
				<text>通知公告</text>
			</view>
			<view class="right_a">
				<view class="img_a">
					<image src="../../../static/icon_26.png" mode=""></image>
				</view>
				<!-- <input type="text" value="" placeholder="请输入密码" /> -->
				<!-- <text></text> -->
			</view>
		</view>
		<view class=" uni-padding-wrap uni-common-mt quit">
			<button type="primary">退出登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: ''
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

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f7f7f7;
	}

	.basic {
		margin-top: 20upx;
		width: 710upx;
		background-color: #fff;
		overflow: hidden;
		padding: 20upx;
		padding-bottom: 20upx;
		box-sizing: border-box;

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
				font-size: 28upx;
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
