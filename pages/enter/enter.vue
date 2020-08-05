<template>
	<view>
		<!-- 背景 -->
		<view :style="style" class="bg_img">
			<image src="../../static/icon_12.png" mode=""></image>
			<image src="../../static/icon_13.png" mode=""></image>
		</view>
		<!-- logo -->
		<view class="logo">
			<image src="../../static/logo.png" mode=""></image>
		</view>
		<!-- 输入框 -->
		<view class="uni-common-mt">
			<view class="uni-form-item uni-column">
				<image src="../../static/icon_14.png" mode=""></image>
				<input class="uni-input" type="number" v-model='phone' placeholder="请输入手机号" />
			</view>
			<view class="uni-form-item uni-column">
				<image src="../../static/icon_15.png" mode=""></image>
				<input class="uni-input" password v-model='password' type="text" placeholder="请输入密码" />
			</view>
		</view>
		<view style='overflow-x:auto;width:600rpx;'>{{q}}</view>
		<!-- 提交按钮 -->
		<view class="uni-padding-wrap uni-common-mt bott">
			<button type="primary" @tap='denglusss'>登录</button>
			<view class="enroll" @tap='login'>
				<text>注册账号</text>
			</view>
			<view class="forget">
				<text @tap='xiuga'>忘记密码</text>
			</view>
		</view>
		<!-- 第三方登录 -->
		<view class="shortcut">
			<image src="../../static/icon_16.png" mode=""></image>
			<text style='width:200rpx;height:700rpx;overflow:hidden;'>第三方登录{{q}}</text>
			<image src="../../static/icon_17.png" mode=""></image>
			<view class="link" @tap='denglu'>
				<image src="../../static/WeChat.png" mode=""></image>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		onLoad() {
			console.log('-=-=-=-=-=-')
			console.log(this.CustomBar * 1)
			uni.getSystemInfo({
				success: function(e) {
					console.log(e)
				}
			})
		},
		data() {
			return {
				screenHeight: this.screenHeight,
				statusBarHeight : this.statusBarHeight ,
				phone:'',
				password:'',
				q:'1231'
			}
		},
		computed: {
			style() {
				let style = `height:${this.screenHeight - this.statusBarHeight}px; `;
				return style;
			},
		},
		methods:{
			denglusss:function(){
				this.$https({url:'/api/oauth/phoneLogin',data:{phone:this.phone,password:this.password},dengl:true,method:'post',success:function(res){
					if(res.data.data){
						uni.setStorageSync('Authorization',res.data.data.access_token)
						uni.showToast({
							title:'登录成功'
						})
						setTimeout(function(){
							uni.reLaunch({
								url:'../index/index'
							})
						},1900)
					}else{
						uni.showToast({
							title:res.data.message
						})
					}
				}})
			},
			//跳转到注册页面
			login:function(){
				uni.navigateTo({
					url:'login'
				})
			},
			//跳转到修改密码
			xiuga:function(){
				uni.navigateTo({
					url:'../user/alter/alterPassword/alterPassword'
				})
			},
			denglu:function(){
				var _this=this
				uni.getProvider({
					service:'oauth',
					success:function(res){
						if(res.provider.indexOf('weixin')>=0){
							uni.login({
								provider:'weixin',
								success:function(res){
									_this.q=JSON.stringify(res)
									uni.getUserInfo({
										provider:'weixin',
										success:function(res){
											_this.$https({url:'/api/oauth/wxLogin',data:JSON.stringify(res),method:'post',haeder:true,success:function(res){
												
											}})
										}
									})
								},
								fail:function(ress){
									_this.q=JSON.stringify(res)+'123'
									uni.getUserInfo({
										provider:'weixin',
										success:function(res){
											_this.q=JSON.stringify(res)+'12312'
										}
									})
								}
							})
						}
					},
					fail:function(re){
						_this.q=JSON.stringify(re)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.bg_img {
		width: 100%;
		// position: relative;
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
	.logo{
		position: absolute;
		left:25%;
		top:8%;
		image{
			width: 360upx;
			height: 100upx;
		}
	}
	.uni-common-mt{
		position:fixed;
		left:20upx;
		top:500upx;
		width: 90%;
		margin: 0 auto;
		margin-left: 2%;
		
		image{
			width: 30upx;
			height: 38upx;
			float: left;
			padding-right: 20upx;
			padding-bottom: 20upx;
		}
		.uni-form-item{
			margin: 0 auto;
			width:100%;
			float: left;
			margin-bottom: 80upx;
			border-bottom: 1px solid #ccc;
		}
		.uni-input{
			float: left;
			line-height: 40upx;
			font-size: 24upx;
			color: #999;
		}
	}
	.bott{
		top: 780upx !important;
		font-family: Microsoft YaHei;
	}
	.bott button{
			border-radius: 50upx;
			line-height:90upx;
			background-color: #1a5fe3;
			box-shadow: -1px 4px 5px #B5B5B5;
		}
		.enroll {
			float: left;
			padding-top: 30upx;
			
		}
		.enroll text{
			font-size: 26upx;
			color: #333;
		}
		.forget{
			float: right;
			padding-top: 30upx;
		}
		.forget text{
			font-size: 26upx;
			color: #333;
		}
		.shortcut{
			display: block;
			text-align: center;
			position: fixed;
			bottom:110upx;
			left:10%;
			font-size: 24upx;
			color: #666;
			
			.link{
				display: block;
				image{
					margin: 50upx;
					width: 85upx;
					height: 85upx;
				}
				
			}
		}
		.shortcut text{
			padding: 20upx;
			line-height: 40upx;
		}
		.shortcut image{
			width: 220upx;
			height: 2upx;
		}
		
</style>
