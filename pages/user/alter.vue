
<template>
	<view class="bg">

		<!-- 修改资料 -->
		<view class="alter">
			<view class="left">
				<view class="h2">
					<input v-model='nickname' placeholder='暂无用户名' :disabled='jinyong' :style='jinyong?"":"border:1px solid #f2f2f2;"' @blur='xiugai'>
					<!-- 点击图片可修改头像 -->
					<view class="imgBox" @tap='bianji'>
						<image src="../../static/icon_25.png" mode=""></image>
					</view>
				</view>
				<view class="span">
					<text>点击修改昵称</text>
				</view>

			</view>
            <!-- 点击图标也可修改昵称 -->
			<view class="right">
				<image :src="headimg" mode="" @tap='toux'></image>
			</view>
		</view>

		<!-- 基础资料 -->
			<view class="basic">
				<view class="left_a">
					<text>绑定手机号</text>
				</view>
				<view class="right_a">
					<view class="img_a">
						<image src="../../static/icon_26.png" mode=""></image>
					</view>
					<text @tap='bangding'>{{phone}}</text>
				</view>
			</view>

			<view class="basic">
				<view class="left_a">
					<text>性别</text>
				</view>
				<view class="right_a">
					<view class="img_a">
						<image src="../../static/icon_26.png" mode=""></image>
					</view>
					<picker :range='arrsex' :value='index' class='shou' @change='sex'>{{arrsex[index]}}</picker>
				</view>
			</view>

			<view class="basic">
				<view class="left_a">
					<text>生日</text>
				</view>
				<view class="right_a">
					<view class="img_a">
						<image src="../../static/icon_26.png" mode=""></image>
					</view>
					<picker mode='date' :value='date' @change='bindDateC' style='width:220rpx;' class='shou'>{{date}}</picker>
				</view>
			</view>
			<view class=" uni-padding-wrap uni-common-mt quit">
				<button type="primary" @tap='tuichu'>退出登录</button>
			</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				jinyong:true,
				nickname:'',
				arrsex:[
					'男',
					'女',
					'未知'
				],
				index:0,
				date:'2020-05-06',
				phone:'手机',
				headimg:'../../static/img_06.jpg'
			}
		},
		onLoad:function(){
			//请求个人信息
			this.$https({url:'/api/user/my-info',dengl:false,success:res=>{
				if(res.data.code==0){
					this.nickname=res.data.data.nickname
					this.phone=res.data.data.phone
					this.index=res.data.data.sex?res.data.data.sex:0
					this.birth=res.data.data.birth?res.data.data.birth:'2020-05-06'
				}
			}})
		},
		methods:{
			bianji:function(){
				this.jinyong=false
			},
			bindDateC:function(e){
				this.date=e.target.value
				this.$https({url:'/api/user/edit-member-info',data:{birth:e.detail.value},dengl:false,method:'post',haeder:true,success:function(res){
					uni.showToast({
						title:res.data.message
					})
					_this.qingqiu()
				}})
			},
			xiugai:function(){
				var _this=this
				this.$https({url:'/api/user/edit-member-info',data:{nickname:this.nickname},dengl:false,method:'post',haeder:true,success:function(res){
					if(res.data.code==0){
						_this.qingqiu()
						uni.showToast({
							title:res.data.message
						})
					}
				}})
			},
			bangding:function(){
				uni.navigateTo({
					url:'alter/alterCall/alterCall'
				})
			},
			//更改性别
			sex:function(e){
				var _this=this
				this.$https({url:'/api/user/edit-member-info',data:{sex:e.detail.value},dengl:false,method:'post',haeder:true,success:function(res){
					_this.qingqiu()
					uni.showToast({
						title:res.data.message
					})
				}})
			},
			qingqiu:function(){
				var _this=this
				this.$https({url:'/api/user/my-info',dengl:false,success:function(res){
					_this.nickname=res.data.data.nickname
					_this.phone=res.data.data.phone
					_this.index=res.data.data.sex
					_this.birth=res.data.data.birth?res.data.data.birth:'2020-05-06'
				}})
			},
			tuichu:function(){
				uni.setStorageSync('Authorization','')
				uni.showToast({
					title:'退出登录成功'
				})
			},
			toux:function(){
				var _this=this
				uni.chooseImage({
					success:function(res){
						uni.uploadFile({
							url:_this.webUrl+'/api/oauth/oss/upload',
							filePath:res.tempFilePaths[0],
							name:'img',
							success:function(res){
								_this.headimg=JSON.parse(res.data).data.url
								var img=JSON.parse(res.data).data.url
								_this.$https({url:'/api/user/edit-member-info',data:{headimg:img},method:'post',haeder:true,success:function(res){
									_this.qingqiu()
								}})
							}
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	
	.alter {
		width: 750upx;
		background-color: #fff;
		overflow: hidden;
		padding-bottom: 20upx;
		border-bottom: 20upx solid #f2f4f7;

		.left {
			float: left;
			margin-top: 60upx;
			margin-left: 20upx;

			.h2 {
				font-size: 36upx;
				color: #333;
				line-height: 60upx;
				input {
					float: left;
					width:200rpx;
				}
				.imgBox {
					float: left;
					padding-top: 15upx;
					padding-left: 15upx;

					image {
						display: block;
						float: left;
						width: 28upx;
						height: 27upx;

					}
				}

			}

			.span {
				float: inherit;
				font-size: 22upx;
				color: #999;
			}


		}

		.right {
			float: right;
			margin-top: 40upx;
			margin-right: 20upx;

			image {
				width: 120upx;
				height: 120upx;
				border-radius: 60upx;
			}
		}
	}

	page{
		background: #f7f7f7;
	}
	.basic {
		width: 710upx;
		background-color: #fff;
		overflow: hidden;
		padding: 20upx;
		padding-bottom: 20upx;
		border-bottom: 1px dotted #ccc;

		.left_a {
			float: left;
			padding-left: 20upx;

			text {
				font-size: 28upx;
				color: #999;
				line-height: 30upx;
				line-height: 70upx;
			}
		}
		page{
			background: #f7f7f7;
		}
		.right_a {
			float: right;
			padding-right: 10upx;

			text {
				font-size: 28upx;
				float: right;
				line-height: 70upx;
			}
			.img_a {
				float: right;
				padding: 30upx 0upx 20upx 20upx;

				image {
					width: 12upx;
					height: 14upx;
					display: block;
				}

			}
			.shou{
				float:right;
				margin-top:10rpx;
				text-align:right;
				font-size:28rpx;
			}
		}
        

	}
	.quit{
		overflow: hidden;
		padding-top:10%;
		width: 650upx;
		margin: 0 auto;
		color: #fff;
		position: fixed;
		bottom: 5%;
		left: 7%;
		
		font-family: Microsoft YaHei;
		
		button{
			
			border-radius:50upx 50upx;
			background-color: #dce0e6;
		}
	}
</style>
