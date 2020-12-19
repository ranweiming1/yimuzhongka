<template>
	<view class="content">
		<view class="content-top">
			<view class="cont-top-left">
				<view class="left-logo" @tap="callPhone">
					<image src="../../../static/phone_icon.png" mode=""></image>
				</view>
				<view class="left-bottom">
					<view class="left-bottom-top">
						<text>热线电话</text>
					</view>
					<view class="left-bottom-bot">
						<text>7:00-21:00</text>
					</view>
				</view>
			</view>
			<view class="cont-top-right">
				<view class="left-logo" @tap="onlineService">
					<image src="../../../static/kefu_icon.png" mode=""></image>
				</view>
				<view class="left-bottom">
					<view class="left-bottom-top">
						<text>在线客服</text>
					</view>
					<view class="left-bottom-bot">
						<text>8:00-20:00</text>
					</view>
				</view>
			</view>

		</view>
		<view class="content-bottom">
			<view class="content-bottom-title">
				<text>常见问题</text>
			</view>
			<view class="cont-text">
				<view class="cont-text-item" v-for="(item,i) in contList" @tap='detail(item.id)'>
					<view class="cont-text-left">
						<text>{{item.title}}</text>
					</view>
					<view class="cont-text-img" >
						<image src="../../../static/icon_26.png" mode=""></image>
					</view>
				</view>

			</view>
		</view>
	</view>


</template>

<script>
	export default {
		data() {
			return {
				contList: [],
				id:'',
				phone:''
			}
		},
		onLoad() {
			var that = this
			this.$https({
				url: '/api/oauth/help/problem-list',
				dengl: true,
				data: {},
				success: function(res) {
					console.log(res.data.data)
					that.contList = res.data.data

				}
			})
			this.$https({
				url: '/api/user/my-info',
				dengl: false,
				data: {},
				success: function(res) {
					that.id = res.data.data.id
			
				}
			})
			this.$https({
				url: '/api/user/my-platform-phone-list',
				dengl: false,
				data: {},
				success: function(res) {
					console.log(res.data.data)
					that.phone = res.data.data[0].phone
			
				}
			})
		},
		methods: {
			detail: function(id) {
				uni.navigateTo({
					url: '../FAQ/FAQdetails/FAQdetails?id='+id
				})
			},
			callPhone: function() {
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
			onlineService: function() {
				uni.navigateTo({
					url:'../../index/ke?id='+this.id
				})
			},
		}
	}
</script>

<style lang="scss">
	.content-top {
		background: #fff;
		border-top: 1rpx solid #e6e6e6;
		padding: 40rpx 0;
		box-sizing: border-box;
		overflow: hidden;

		.cont-top-left {
			width: 50%;
			text-align: center;
			float: left;
		}

		.cont-top-right {
			width: 50%;
			text-align: center;
			float: right;
		}

		.left-logo {
			display: inline-block;
			margin-bottom: 25rpx;

			image {
				height: 100rpx;
				width: 100rpx;
				display: block;
			}
		}

		.left-bottom-top {
			margin-bottom: 20rpx;

			text {
				font-size: 28rpx;
				color: #333;
			}
		}

		.left-bottom-bot {
			text {
				color: #999999;
				font-size: 24rpx;
			}
		}
	}

	.content-bottom {
		font-size: 28rpx;
		color: #333;

		.content-bottom-title {
			height: 92rpx;
			line-height: 92rpx;
			background: #f7f7f7;
			padding-left: 40rpx;
		}

		.cont-text {
			padding: 0 20rpx;
		}

		.cont-text-item {
			height: 100rpx;
			line-height: 100rpx;
			box-sizing: border-box;
			border-bottom: 1rpx solid #e6e6e6;
			overflow: hidden;
			padding-left: 20rpx;

			.cont-text-left {
				float: left;
			}

			.cont-text-img {
				float: right;
				padding: 40rpx 20rpx 40rpx 40rpx;

				image {
					width: 12rpx;
					height: 20rpx;
					display: block;
				}
			}
		}

	}
</style>
