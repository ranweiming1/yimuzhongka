<template>
	<view>
		<view class="uni-form-item uni-column">
			<view class="title"><text>原手机号</text></view>
			<input class="uni-input" v-model='oldPhone' name="number" placeholder="请输入手机号" />
		</view>
		<view class="uni-form-item uni-column">
			<view class="title"><text>验证码</text></view>
			<input class="uni-input" name="number" v-model='smsCode' maxlength=4 placeholder="请输入验证码" />
			
			<view class="uni-padding-wrap uni-common-mt bott">
				<button type="primary" @tap='huoqu'>{{yanzheng}}</button>
			</view>
		</view>
		<view class="uni-form-item uni-column">
			<view class="title"><text>新手机号</text></view>
			<input class="uni-input" name="input" v-model='newPhone' placeholder="请输入新手机号" />
		</view>
		
		<view class="uni-padding-wrap uni-common-mt botts">
			<button type="primary" @tap='tijiaoxiugai'>提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				oldPhone:'',
				smsCode:'',
				newPhone:'',
				yanzheng:'获取验证码',
				dianji:true,
				dingshiqi:''
			}
		},
		methods: {
			huoqu:function(){
				if(this.dianji){
					this.dianji=false
				var _this=this
				this.$https({url:'/api/oauth/sendSms/user-auth',data:{phone:this.oldPhone},denglu:true,success:res=>{
					uni.showToast({
						title:res.data.message
					})
				}})
				this.yanzheng='60s重新获取'
				var num=60
				this.dingshiqi=setInterval(function(){
					if(num>0){
					num--
					_this.yanzheng=num+'s重新获取'
					}else{
						_this.dianji=true
						clearInterval(_this.dingshiqi)
					}
				},1000)
				}
			},
			tijiaoxiugai:function(){
				var _this=this
				this.$https({url:'/api/user/change-phone',data:{newPhone:this.newPhone,oldPhone:this.oldPhone,smsCode:this.smsCode},method:'post',success:res=>{
					if(res.data.code==0){
						uni.showToast({
							title:'操作成功'
						})
						return flase
					}
					uni.showToast({
						title:res.data.message
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
		height: 100rpx;
		line-height: 100rpx;
    	.title{
    		float: left;
    		padding-left: 20upx;
    		text{
    			line-height: 100upx;
    			font-size: 32upx;
    		}
    	}
    	.uni-input{
    		float: left;
    		// padding-top: 27upx;
			line-height: 100rpx;
			height: 100rpx;
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
			background-color: #2b5cff;
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
			background-color: #2b5cff;
		}
		
	}
</style>
