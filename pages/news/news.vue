<template>
	<view style='overflow:hidden;width:100%;'>
		<!-- #ifndef H5 -->
		<view class="top">
			<view class='back' @tap='back' style='float:left;'>
				<image src='../../static/icon_26-2.png' style='width:18rpx;height:32rpx;' mode=''></image>
			</view>
			<view class="textBox">
				<text>新闻资讯</text>
			</view>
		</view>
		<!-- #endif -->
		<!-- 广告浮窗 链接到效果图/个人中心/6-3分销页面 -->
		<!-- <view class="float" bindtap='>
			<image src="../../static/icon_20.png" mode=""></image>
		</view> -->

		<!-- 超出一屏翻页 -->
		<view class="list-cont">
			<view class="list" v-for='item in newz' @tap='tiaozhuan(item.id)'>
				<view class="tit">
					<text>{{item.title}}</text>
					<view class="span">
						<text>发布时间:{{item.createTime}}</text>
					</view>
				</view>

				<view class="img">
					<image :src="item.image" mode=""></image>
				</view>
			</view>
		</view>
		<view style='position:fixed;left:0;width:calc(100% - 50rpx);bottom:100rpx;height:100rpx;background:rgba(0,0,0,0.6);line-height:100rpx;color:#fff;padding-left:50rpx;font-size:24rpx;z-index: 9999;'
		 v-if='xianshidenglu'>
			<image src='../../static/6ef74f70be674fdc834aa269ed7f8078.png' style='width:20rpx;height:20rpx;margin-right:20rpx;'
			 @tap='g'></image>
			登录后体验更多精彩
			<view style='float:right;padding:0 40rpx;background:#2d5eff;border-radius:50rpx;line-height:60rpx;margin-top:20rpx;margin-right:20rpx;font-size:24rpx;'
			 @tap='deng'>立即登录/注册</view>
		</view>
		<tabBar :currentPage='currentPage'></tabBar>
	</view>

</template>

<script>
	import tabBar from '@/components/tabBar/tabBar.vue';
	export default {
		data() {
			return {
				currentPage: 'news',
				newz: [],
				xianshidenglu: false,
			}
		},
		onShow: function() {
			var _this = this
			if (!uni.getStorageSync('Authorization')) {
				this.xianshidenglu = true
			} else {
				this.xianshidenglu = false
			}
			//新闻资讯
			this.$https({
				url: '/api/oauth/news/article-list',
				data: {},
				dengl: true,
				success: function(res) {
					_this.newz = res.data.data
				}
			})
		},
		methods: {
			tiaozhuan: function(id) {
				uni.navigateTo({
					url: 'news_details/news_details?id=' + id
				})
			},
			g: function() {
				this.xianshidenglu = false
			},
			deng: function() {
				uni.navigateTo({
					url: '../enter/enter'
				})
			},
		},
		components: {
			tabBar,
		}
	}
</script>

<style lang="scss">
	.float {
		position: fixed;
		bottom: 30%;
		right: 10upx;
		z-index: 99999;

		image {
			width: 185upx;
			height: 150upx;
		}
	}

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

	.list-cont {
		margin-top: 160rpx;
		overflow: hidden;
	}

	.one_line {
		position: fixed;
		top: 80upx;
		left: 0upx;
		z-index: 2;
		width: 750upx;
		height: 1upx;
		border-top: 1px solid #e5e5e5;
	}

	.list {
		font-size: 30upx;
		color: #333333;
		position: relative;
		height: 210upx;
		margin-top: 30upx;
		border-bottom: 1px dotted #ccc;

		.span {
			font-size: 24upx;
			color: #999;
		}

		.tit {
			width: 450upx;
			padding-right: 10upx;
			float: left;
			padding-left: 20upx;
		}

		.tit text {
			line-height: 50upx;
		}

		.span text {
			position: absolute;
			bottom: 30upx;
			left: 20upx;
		}

		.img {
			float: left;
		}

		.img image {
			width: 255upx;
			height: 180upx;
		}
	}
</style>
