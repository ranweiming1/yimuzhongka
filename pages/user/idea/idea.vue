<template>
	<view>
		<view class="one_line">
		</view>
		
		<view class="uni-textarea">
			<textarea placeholder-style="color:#999999" placeholder="请详述你的问题，以便我们为您提供更好的帮助"/>
		</view>
		<view class="idea">			
			<!-- 上传图片占位 -->
			<view class="imgBox">
				<image src="../../../static/img_10.jpg.png" mode=""></image>
			</view>
		</view>
		
		<view class="uni-form-item uni-column">
			<view class="title"><text>联系电话</text></view>
			<input class="uni-input" name="input" placeholder="请输入手机号" />
		</view>
		
		<view class="uni-padding-wrap uni-common-mt bott">
			<button type="primary">提交问题</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f7f7f7;
	}
    .idea{
		width:710upx ;
		padding: 20upx;
		background-color: #fff;
		.imgBox{
			image{
				width: 185upx;
				height: 185upx;
			}
		}
	}
	.uni-textarea{
		width: 710upx;
		background-color: #fff;
		padding: 20upx;
		margin-top: 20upx;
		
		textarea{
			width: 100%;
		}
	}
	.uni-column{
		background-color: #fff;
		margin-top: 20upx;
		overflow: hidden;
		.title{
			float: left;
			padding-left: 20upx;
			text{
				line-height: 90upx;
				font-size: 32upx;
			}
		}
		.uni-input{
			float: left;
			padding-top: 27upx;
			font-size: 28upx;
			padding-left: 20upx;
			font-family:Microsoft YaHei ;
		}
	}
	.bott{
		margin: 50upx;
		font-family: Microsoft YaHei;
	}
	.bott button{
			border-radius: 50upx;
			line-height:90upx;
			background-color: #1a5fe3;
		}
</style>
