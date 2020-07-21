<template>
	<view>
		<view class="Box">
			<view class="imgBox">
				<image :src="s" mode=""></image>
			</view>

			<!-- 文字较多时，内部进度条 -->
			<view class="brief">
				<rich-text :nodes='w'></rich-text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				s:'../../../../static/img_11.jpg',
				w:''
			}
		},
		onLoad(){
			var _this=this
			this.$https({url:'/api/task/get-share-page',success:function(res){
				_this.s=res.data.data.backgroundImg
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
