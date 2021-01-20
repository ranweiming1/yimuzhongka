<template>
	<view>
		<view class="Box">
			<view class="imgBox">
				<image :src="s" mode=""></image>
				<view>
					<image src='../../../../static/f.jpg'></image>
					<view>
						<tki-qrcode :val='val' size='250' style='width:250rpx;height:250rpx;position:absolute;top:0;left:0;right:0;bottom:0;margin:auto;'></tki-qrcode>
					</view>
				</view>
			</view>
			
			<!-- 文字较多时，内部进度条 -->
			<!-- <view class="brief"> -->
				<!-- <rich-text :nodes='w'></rich-text> -->
			<!-- </view> -->
		</view>
	</view>
</template>

<script>
	import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue'
	export default {
		data() {
			return {
				s:'../../../../static/ff.jpg',
				w:'',
				val:''
			}
		},
		components:{tkiQrcode},
		onLoad(option){
			this.val='yimuzhongka://'+option.code
			var _this=this
			this.$https({url:'/api/task/get-share-page',success:function(res){
				// _this.s=res.data.data.backgroundImg
				_this.w=res.data.data.content
			}})
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.imgBox {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		>view{
			width:700rpx;
			height:600rpx;
			position:absolute;
			bottom:60rpx;
			left:25rpx;
			>view{
				position:absolute;
				height:100%;
				width:100%;
				left:0;
				top:0;
			}
			>image{
				border-radius:20rpx;
			}
		}
		image {
			width: 100%;
			height: 100%;
		}
	}
	.brief{
		position: fixed;
		top: 40%;
		left: 20upx;
		background-color: #fff;
		box-shadow: 0 0 5px #ccc;
		width: 670upx;
		height: 40%;
		border-radius: 20upx;
		padding: 20upx;
		overflow-y:auto;
		text{
			color: #333;
			line-height: 40upx;
			font-size: 28upx;
		}
	}
</style>
