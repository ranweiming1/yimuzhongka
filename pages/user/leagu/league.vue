<template>
	<view>
		<view class="one_line">
		</view>
		
		<view class="uni-form-item uni-column">
			<view class="title"><text>店铺名称</text></view>
			<input class="uni-input" name="input" placeholder="请输入手机号" />
		</view>
		<view class="uni-form-item uni-column">
			<view class="title"><text>法人姓名</text></view>
			<input class="uni-input" name="input" placeholder="请输入新手机号" />
		</view>
		<view class="uni-form-item uni-column">
			<view class="title"><text>法人电话</text></view>
			<input class="uni-input" name="input" placeholder="请输入新手机号" />
		</view>
		<view class="uni-form-item uni-column">
			<view class="title"><text>负责人姓名</text></view>
			<input class="uni-input" name="input" placeholder="请输入新手机号" />
		</view>
		<view class="uni-form-item uni-column">
			<view class="title"><text>负责人电话</text></view>
			<input class="uni-input" name="input" placeholder="请输入新手机号" />
		</view>
		
		
		<!-- 提示 -->
		<view class="tis">
			<text>提示：上传图像格式为：png，jpg，大小不得大于1M</text>
		</view>
		
		<view class="uni-form-item uni-column">
			<view class="title"><text>上传营业执照</text></view>
			<view class="imgBox">
				<image src="../../../static/img_10.jpg.png" mode=""></image>
			</view>
		</view>
		
		<view class="uni-form-item uni-column">
			<view class="title"><text>上传营业执照</text></view>
			<view class="imgBox">
				<image src="../../../static/img_10.jpg.png" mode=""></image>
			</view>
			<view class="imgBox">
				<image src="../../../static/img_10.jpg.png" mode=""></image>
			</view>
		</view>
		<view class="uni-form-item uni-column">
			<view class="title"><text>上传营业执照</text></view>
			<view class="imgBox">
				<image src="../../../static/img_10.jpg.png" mode=""></image>
			</view>
		</view>
		
		<view class="uni-padding-wrap uni-common-mt botts">
			<button type="primary">提交</button>
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
		padding-bottom: 150upx;
	}
	.uni-column{
		margin-bottom: 20upx;
		background-color: #fff;
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
		
		.imgBox{
			float: left;
			padding-top: 30upx;
			padding-left: 20upx;
			image{
				width: 175upx;
				height: 175upx;
			}
		}
	}
	.botts{
		width: 670upx;
		position: fixed;
		bottom: 40upx;
		left: 40upx;
		
		button{
			border-radius: 40upx;
			font-family:Microsoft YaHei;
		}
		
	}
	.tis{
		background-color: #ffffcc;
		text-align: center;
		text{
			font-size: 24upx;
			color: #ff0000;
			line-height:60upx;
		}
	}
</style>
