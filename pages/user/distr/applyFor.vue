<template>
	<view >
		<view class="one_line">
		</view>
		
		<view class="uni-form-item uni-column">
			<view class="title"><text>提现到</text></view>
			<input class="uni-input" name="input" placeholder="微信" />
			<view class="uni-padding-wrap uni-common-mt bott">
				<button type="primary">绑定微信</button>
			</view>
		</view>
		<view class="uni-form-item uni-column">
			<view class="title"><text>提现金额</text></view>
			<input class="uni-input" name="input" placeholder="请输入金额" />
		</view>
		<view class="uni-form-item uni-column">
			<view class="title"><text>绑定手机号</text></view>
			<input class="uni-input" name="input" placeholder="请输入手机号" />
		</view>
		<view class="uni-form-item uni-column">
			<view class="title"><text>验证码</text></view>
			<input class="uni-input" name="input" placeholder="请输入验证码" />
			<view class="uni-padding-wrap uni-common-mt bott">
				<button type="primary">获取验证码</button>
			</view>
		</view>
		
		<view class="uni-padding-wrap uni-common-mt botts">
			<button type="primary">提交</button>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	page{
		background-color: #f7f7f7;
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
	}
	
	.bott{
		width: 200upx;
		float: right;
		padding: 20upx;
		button{
			color: #007AEE;
			border: 1px solid #007AEE;
			background-color: #fff;
			border-radius: 40upx;
			font-size:24upx;
			font-family:Microsoft YaHei;
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
</style>
