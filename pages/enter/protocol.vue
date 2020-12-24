<template>
	<view>
		<!-- 背景 -->
		<view :style="style" class="bg_img">
			<image src="../../static/icon_12.png" mode=""></image>
			<image src="../../static/icon_13.png" mode=""></image>
		</view>
		<view class="white" style='height:90%;'>
			<view class="title">
				平台注册协议须知
			</view>
			<!-- 内容较多，需要右侧有进度条，进度条样式参考效果图 -->
			<view class="" style='position:absolute;height:60%;overflow-y:auto;width: 100%;'>
			<rich-text :nodes='content'></rich-text>
			</view>
			<view class="span" style='position:absolute;bottom:100rpx;left:0;width:100%:height:100rpx;'>
				<view class="uni-padding-wrap">
					<view>
						<checkbox-group @change='checkchange'>
							<checkbox class="checkbox" style="transform:scale(0.7)" :checked="isOk" value='1'><text style="font-size: 28rpx;">我已仔细阅读，并同意履行该协议须知</text></checkbox>
						</checkbox-group>
					</view>
				</view>
			</view>
			<view class="uni-padding-wrap uni-common-mt bott" @click="zhuce" style='position:absolute;margin:auto;bottom:20rpx;left:calc(50% - 100rpx);width:200rpx;'>
				<button type="primary" style='background:#1a5fe3'>注册</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				screenHeight: this.screenHeight,
				statusBarHeight: this.statusBarHeight,
				isOk: false,
				phone: '',
				password: '',
				checkCode: '',
				content:''
			}
		},
		onLoad(option) {
			// console.log(option)
			// console.log('-=-=-=-=-=-')
			// console.log(this.CustomBar * 1)
			this.phone = option.phone
			this.password = option.password
			this.checkCode = option.checkCode
			uni.getSystemInfo({
				success: function(e) {
					// console.log(e)
				}
			})
			this.$https({
				url: '/api/oauth/help/protocol-info',
				data: {},
				dengl: true,
				success: res => {
					this.content = res.data.data.content
					console.log(res.data.data,this.content)
				}
			})
		},
		
		computed: {
			style() {
				let style = `height:${this.screenHeight - this.statusBarHeight}px; `;
				return style;
			},

		},
		methods: {
			checkchange(e) {
				this.isOk = e.detail.value[0]
				// console.log(this.isOk)

			},
			zhuce() {
				var _this = this
				if (this.isOk) {
					uni.navigateTo({
						url: './login?isOk=' + _this.isOk + '&phone=' + this.phone + '&password=' + this.password + '&checkCode=' +
							this.checkCode
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.bg_img {
		width: 100%;

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

	.white {
		z-index: 999999;
		margin: 0 auto;
		background-color: #fff;
		width: 690upx;
		height: initial;
		border-radius: 20upx;
		box-shadow: 0 0 5px #ccc;
		position: fixed;
		top: 5%;
		left: 30upx;
		padding-bottom: 30upx;

		.title {
			text-align: center;
			line-height: 100upx;
			height: 100upx;
			font-size: 36upx;
			border-bottom: 1px solid #ccc;
			font-family: Microsoft YaHei;
		}

		text {
			display: block;
			padding: 20upx;
			color: #666;
			line-height: 50upx;
			font-size: 26upx;
		}

		.span {
			font-size: 26upx;
			padding-bottom: 20upx;
			color: #999;
			padding-left: 20upx;
		}

		.span text {
			line-height: 40upx;

		}

		.bott {
			width: 210upx;
			margin: 0 auto;

		}

		.bott button {
			border-radius: 80upx;
		}

	}
</style>
