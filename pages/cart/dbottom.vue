<template>
	<view>
		<view class='heighta'></view>
		<view :class="tongyongdibu?'index-d tongyongdibu':'index-d'">
			<view :class="bottom==1?'active-index':''" @tap='index(can)'>
				<image :src="bottom==1?'../../static/s9.png':'../../static/n9.png'" class="slide-image index-im" mode="widthFix"></image>
				<p :style='bottom==1?"color:#3463fe":""'>首页</p>
			</view>
			<view :class="bottom==2?'active-index':''" @tap='commodity(can)'>
				<image :src="bottom==2?'../../static/s8.png':'../../static/n8.png'" class="slide-image index-im" mode="widthFix"></image>
				<p :style='bottom==2?"color:#3463fe;":""'>全部宝贝</p>
			</view>
			<view :class="bottom==3?'active-index':''" @tap='tongzhi(can)'>
				<image :src="bottom==3?'../../static/s6.png':'../../static/n6.png'" class="slide-image index-im" mode="widthFix"></image>
				<p :style='bottom==3?"color:#3463fe":""'>分类</p>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tongyongdibu: false,
			}
		},
		props: ['bottom', 'can'],
		methods: {
			//跳转首页
			index: function(can) {
				uni.redirectTo({
					url: '../shop/shop?id=' + can,

				})
			},
			// 全部宝贝
			commodity: function(can) {
				uni.redirectTo({
					url: '../shop/all?id=' + can
				})
			},
			//分类
			tongzhi: function(can) {
				uni.redirectTo({
					url: '../shop/classifys?id=' + can
				})
			},

		}
	}
</script>

<style>
	.heighta {
		height: 136rpx;
	}

	.tongyongdibu {
		padding-bottom: 60rpx;
	}

	.index-d {
		height: 90rpx;
	}
</style>
