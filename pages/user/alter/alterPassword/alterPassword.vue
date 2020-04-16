<template>
	<view>
		<view class="one_line">
		</view>
		
		<view class="uni-form-item uni-column">
			<view class="title"><text>手机号</text></view>
			<input class="uni-input" name="input" placeholder="请输入手机号" />
		</view>
		<view class="uni-form-item uni-column">
			<view class="title"><text>验证码</text></view>
			<input class="uni-input" name="input" placeholder="请输入验证码" />
			
			<view class="uni-padding-wrap uni-common-mt bott">
				<button type="primary">获取验证码</button>
			</view>
		</view>
		<view class="uni-form-item uni-column">
			<view class="title"><text>新密码</text></view>
			<input class="uni-input" name="input" placeholder="请输入新手机号" />
		</view>
		<view class="uni-form-item uni-column">
			<view class="title"><text>确认密码</text></view>
			<input class="uni-input" name="input" placeholder="请输入新手机号" />
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
