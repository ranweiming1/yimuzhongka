<template>
	<view style='width:100%;overflow:hidden;'>

		<!-- #ifndef H5 -->
		<view class="top">
			<view class='back' @tap='back' style='float:left;'>
				<image src='../../../static/icon_26-2.png' mode=''></image>
			</view>
			<view class="textBox">
				<text>{{x?'资讯详情':'公告详情'}}</text>
			</view>
		</view>
		<!-- #endif -->

		<view class="neir">
			<view class="title">
				<text>{{x?title:objtitle}}</text>
			</view>
			<view class="left">
				<text>发布时间：{{x?create_time:objtz}}</text>
			</view>
			<view class="right" v-if='x'>
				<text>浏览量：{{description}}</text>
			</view>
		</view>
		<!-- <view class="img" v-if='x'>
			<image :src="image" mode=""></image>
		</view> -->
		<view class="txt">
			<rich-text :nodes='x?content:objcont'></rich-text>
		</view>
		<view style="height: 20rpx;background-color: #f8f8f8;width: 100%;" v-if='x'>

		</view>


		<!-- 华丽丽的分割线 -->
		<!-- <view class="one_line">
		</view> -->

		<!-- 评价标题 -->
		<view class="evaluate" v-if='x'>
			<view class="title_a">
				<text>用户评价</text>
			</view>
			<!-- 用户评价 -->
			<view class="toux" v-for="(item,index) in pingjia">
				<view class="imgBox_a">
					<image mode=""
						:src="item.userDTO.headimg?item.userDTO.headimg:item.userDTO.sex==1?'../../../static/307930aca7b24a8f938121e2bac851d4.png':'../../../static/3a03a3d7ebe4442f847932f34b37765a.png'">
					</image>
				</view>
				<view class="mingc">
					<text>{{item.userDTO.phone.replace(/(\d{3})\d{4}(\d{4})/,'$1****$2')}}</text>
					<view class="time">
						<text>{{item.createTime}}</text>
					</view>
					<view class="huay">
						<text>{{item.content}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="publish" v-if='fabiao' @tap='tianj'>
			<view class="imgBox_b">
				<image src="../../../static/icon_19.png" mode=""></image>
			</view>
			<view class="textBox_b">
				<text>发表评价</text>
			</view>
		</view>
		<view style='position:fixed;top:0;left:0;bottom:0;right:0;background:rgba(0,0,0,0.5);z-index:99999;'
			v-if='pinglun'>
			<view
				style='width:600rpx;height:600rpx;background:#fff;border-radius:10rpx;position:absolute;left:0;top:0;right:0;bottom:0;margin:auto;'>
				<view style='text-align:center;margin-top:40rpx;margin-bottom: 50rpx;'>添加评论</view>
				<textarea placeholder='请输入评论60字以内'
					style='width:500rpx;margin:0 auto;height:300rpx;border:1px solid #eee;padding: 20rpx;box-sizing: border-box;'
					v-model='pinglunneirong'></textarea>
				<view
					style='overflow:hidden;width:400rpx;margin:10rpx auto;position: absolute;left: 0;right: 0;bottom: 30rpx;'>
					<button style='color:#666;width:45%;float:left;max-width:45%;' @tap='quxiaopinglun'>取消</button>
					<button style='color:#fff;background:#007aff;width:45%;float:right;max-width:45%;'
						@tap='tianjia'>确定</button>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				title: '',
				create_time: '',
				description: '',
				content: '',
				pingjia: [],
				pinglun: false,
				pinglunneirong: '',
				newsid: '',
				image: '',
				shifoupingjia: true,
				fabiao: false,
				objtitle: {},
				x: true,
				objcont: '',
				objtz: ''
			}
		},
		onLoad: function(option) {
			this.newsid = option.id
			var _this = this
			this.$https({
				url: '/api/oauth/news/article-detail',
				data: {
					id: option.id
				},
				dengl: true,
				success: function(res) {
					_this.title = res.data.data.article.title
					_this.create_time = res.data.data.article.createTime
					_this.description = res.data.data.article.hits
					_this.content = res.data.data.article.content
					_this.image = res.data.data.article.image
					_this.pingjia = res.data.data.commList
					_this.shifoupingjia = res.data.data.article.allowComment == 'Y' ? true : res.data.data
						.allowComment == 'N' ?
						false : false
					_this.fabiao = res.data.data.article.allowComment
					_this.fabiao = _this.fabiao == 'Y'
				}
			})
			if (option.i) {
				this.x = false
				this.objtitle = JSON.parse(option.i).noticeTitle
				this.objcont = JSON.parse(option.i).noticeContent
				this.objtz = JSON.parse(option.i).createTime
			}

		},
		methods: {
			tianj: function() {
				if (this.denglufangfatiaozhuan()) {
					this.pinglun = true
				}
			},
			tianjia: function() {
				if (this.pinglunneirong.length > 60) {
					uni.showToast({
						title: '评论内容不能超过60字',
						icon: 'none'
					})
					return false
				}
				var _this = this
				this.$https({
					url: '/api/news/article-comm-add',
					data: {
						content: _this.pinglunneirong,
						newsId: _this.newsid
					},
					dengl: false,
					method: 'POST',
					success: function(res) {
						// console.log(res)
						if (res.data.code == 0) {
							uni.showToast({
								title: res.data.message
							})
							_this.pinglun = false
							_this.pinglunneirong = ''
							_this.$https({
								url: '/api/oauth/news/article-detail',
								data: {
									id: _this.newsid
								},
								success: function(res) {
									_this.pingjia = res.data.data.commList
								}
							})
						} else {
							uni.showToast({
								title: '请输入正确的内容',
								icon: 'none'
							})
						}
					}
				})
			},
			quxiaopinglun: function() {
				this.pinglun = false
			},
			back: function() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss">
	.top {
		overflow: hidden;
		border-bottom: 1px solid #e5e5e5;
		height: 90rpx;
		text-align: center;
		position: fixed;
		width: 100%;
		left: 0;
		top: 0;
		z-index: 99999;
		background: #fff;
		padding-top: 70rpx;

		.back {
			width: 90rpx;
			height: 90rpx;
			line-height: 90rpx;

			image {
				width: 18rpx;
				height: 32rpx;
				display: block;
				padding: 29rpx 36rpx;
			}
		}

		.textBox {
			margin-right: 90rpx;
			display: inline-block;

			text {
				font-size: 32rpx;
				color: #333;
				float: left;
				line-height: 90upx;
			}
		}


		.imgBox {
			float: right;
			width: 90rpx;
			height: 90rpx;
			line-height: 90rpx;

			image {
				width: 36upx;
				height: 36upx;
				display: block;
				margin: 27rpx;
			}
		}
	}

	.neir {
		overflow: hidden;
		margin-top: 200rpx;

		.title {
			font-size: 36upx;
			line-height: 40upx;
			padding: 20rpx 25rpx;
			color: #333;
			text-align: center;
		}

		.left {
			color: #999;
			font-size: 24upx;
			line-height: 30upx;
			float: left;
			padding-left: 25upx;
		}

		.right {
			color: #999;
			font-size: 24upx;
			line-height: 30upx;
			float: right;
			padding-right: 25upx;
		}
	}

	.img {
		margin: 30rpx 25rpx 0 25rpx;

		image {
			display: block;
			width: 100%;
			height: 300upx;
		}
	}

	.txt {
		font-size: 28upx;
		color: #333;
		line-height: 50upx;
		padding: 25upx;
	}

	.one_line {
		background-color: #f8f8f8;
		width: 750upx;
		height: 20upx;
	}

	.title_a {
		font-size: 32upx;
		padding-left: 20upx;
		line-height: 70upx;
		color: #333;
	}

	.toux {
		width: 100%;
		box-sizing: border-box;
		padding: 20rpx;
		overflow: hidden;
		border-bottom: 1px solid #ccc;

		image {
			width: 80upx;
			height: 80upx;
			border-radius: 150upx;
		}
	}

	.evaluate {
		width: 750upx;
		padding-bottom: 100upx;
	}

	.mingc {
		float: left;
		width: 630upx;

		text {
			font-size: 26upx;
			padding-left: 20upx;
		}

		.time {
			float: right;
			color: #333;
			font-size: 26upx;
			line-height: 50upx;

			text {
				font-size: 24rpx;
			}
		}
	}

	.imgBox_a {
		float: left;
		margin-top: 10upx;
	}

	.huay {
		width: 630upx;
		float: left;
		color: #999;
		line-height: 40upx;

		text {
			display: block;
			width: 100%;
			word-break: break-all;
			box-sizing: border-box;
		}
	}

	.publish {
		background: #2b5cff;
		position: fixed;
		bottom: 0upx;
		left: 0upx;
		width: 750upx;
		height: 100upx;
		overflow: hidden;

		.imgBox_b {
			image {
				width: 38upx;
				height: 38upx;
				float: left;
				padding-left: 38%;
				padding-top: 30upx;
				padding-right: 20upx;
			}
		}

		.textBox_b {
			font-size: 30upx;
			line-height: 90upx;
			color: #fff;
			float: left;
		}
	}
</style>
