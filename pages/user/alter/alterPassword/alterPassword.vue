<template>
	<view>
		<view class="one_line">
		</view>
		
		<view class="uni-form-item uni-column">
			<view class="title"><text>手机号</text></view>
			<input class="uni-input" name="input" v-model='phone' placeholder="请输入手机号" />
		</view>
		<view class="uni-form-item uni-column">
			<view class="title"><text>验证码</text></view>
			<input class="uni-input" name="input" placeholder="请输入验证码" v-model='smsCode' />
			
			<view class="uni-padding-wrap uni-common-mt bott">
				<button type="primary" @tap='huoquyanzhengma'>获取验证码</button>
			</view>
		</view>
		<view class="uni-form-item uni-column">
			<view class="title"><text>新密码</text></view>
			<input class="uni-input" name="input" placeholder="请输入密码" v-model='newPassword'/>
		</view>
		<view class="uni-form-item uni-column">
			<view class="title"><text>确认密码</text></view>
			<input class="uni-input" name="input" placeholder="请输入密码" v-model='isPassword'/>
		</view>
		<view class="uni-padding-wrap uni-common-mt botts">
			<button type="primary" @tap='tijiao'>提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone:'',
				smsCode:'',
				newPassword:'',
				isPassword:''
			}
		},
		methods: {
			//获取验证码
			huoquyanzhengma:function(){
				var _this=this
				if(!this.$jiaoyan(this.phone)){
					uni.showToast({
						title:'手机号码不正确'
					})
				}else{
				this.$https({url:'/api/oauth/sendSms/user-password',data:{phone:this.phone},dengl:true,success:function(res){
					uni.showToast({
						title:res.data.message
					})
				}})
				}
			},
			//提交密码
			tijiao:function(){
				this.$https({url:'/api/user/getBack-password',data:{isPassword:this.isPassword,newPassword:this.newPassword,phone:this.phone,smsCode:this.smsCode},dengl:true,method:'post',success:function(){
					uni.showToast({
						title:res.data.data
					})
				}})
			}
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
