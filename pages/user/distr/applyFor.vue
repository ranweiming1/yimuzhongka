<template>
	<view>
		<view class="one_line" style="border-top:0">
		</view>
		<view style='margin-top:30rpx;text-align:center;margin-bottom:20rpx;'>可提现金额:￥{{ji}}</view>
		<view class="uni-form-item uni-column" style="border-top: 1px solid #e5e5e5;">
			<view class="title"><text>提现到</text></view>
			<input class="uni-input" name="input" placeholder="微信" />
			<view class="uni-padding-wrap uni-common-mt bott">
				<button type="primary">绑定微信</button>
			</view>
		</view>
		<view class="uni-form-item uni-column">
			<view class="title"><text>提现金额</text></view>
			<input class="uni-input" name="input" placeholder="请输入金额" />
			<view class='uni-padding-wrap uni-common-mt bott'>
				<button type='primary'>全部提现</button>
			</view>
		</view>
		<view class="uni-form-item uni-column">
			<view class="title"><text>绑定手机号</text></view>
			<input class="uni-input" v-model='shouji' name="input" placeholder="请输入手机号" />
		</view>
		<view class="uni-form-item uni-column">
			<view class="title"><text>验证码</text></view>
			<input class="uni-input" name="input" v-model='yanzhengz' placeholder="请输入验证码" />
			<view class="uni-padding-wrap uni-common-mt bott">
				<button type="primary" @tap='huoquyanzheng'>{{yanzh}}</button>
			</view>
		</view>

		<view class="uni-padding-wrap uni-common-mt botts">
			<button type="primary" style="background: #2b5cff;">我要提现</button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				ji:0,
				shouji:'',
				yanzhengz:'',
				yanzh:'获取验证码',
				num:60,
				fasong:true
			}
		},
		methods:{
			huoquyanzheng:function(){
				var _this=this
				if(!this.$jiaoyan(this.shouji)){
					uni.showToast({
						title:'请输入正确的手机号'
					})
				}else{
					if(this.fasong){
						this.fasong=false
				        this.$https({url:'/api/oauth/sendSms/user-auth',data:{phone:this.shouji},success:function(res){
						    _this.yanzheng='60s后重新发送'
						    var timer=setInterval(function(){
							    if(_this.num>=1){
								    _this.num--
								    _this.yanzh=(_this.num==0?'':_this.num+'s后')+'重新发送'
							    }else{
								    _this.fasong=true
								    clearInterval(timer)
									_this.num=60
							    }
						    },1000)
				        }})
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f7f7f7;
	}

	.uni-column {
		margin-bottom: 20upx;
		background-color: #fff;
		overflow: hidden;

		.title {
			float: left;
			padding-left: 20upx;
			text {
				line-height: 90upx;
				font-size: 32upx;
			}
		}

		.uni-input {
			float: left;
			padding-top: 27upx;
			font-size: 28upx;
			padding-left: 20upx;
			font-family: Microsoft YaHei;
			width:300rpx;
		}
	}

	.bott {
		width: 230upx;
		float: right;
		padding: 20upx;

		button {
			color: #007AEE;
			border: 1px solid #007AEE;
			background-color: #fff;
			border-radius: 40upx;
			font-size: 24upx;
			font-family: Microsoft YaHei;
		}

	}

	.botts {
		width: 670upx;
		position: fixed;
		bottom: 40upx;
		left: 40upx;

		button {
			border-radius: 40upx;
			font-family: Microsoft YaHei;
		}

	}
</style>
