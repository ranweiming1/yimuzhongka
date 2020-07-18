<template>
	<view>
		<view class="top">
			<view class="textBox">
				<text>我的爱车</text>
			</view>
			<view class="imgBox" @tap='tianjia'>
				<text>添加</text>
			</view>
		</view>
		<view style='position:fixed;width:100%;height:100%;top:0;left:0;background:rgba(0,0,0,0.6);z-index:9999999;' v-if='tianj'>
			<view style='width:70%;height:60%;background:#fff;top:0;left:0;bottom:0;right:0;margin:auto;position:fixed;'>
				<view style='overflow:hidden;'>
					<image :src='listz[nu].myCarImg' style='width:90%;margin:0 auto;display:block;' @tap='shangchuan'></image>
					<view>
						<input :value='listz[nu].carNum' style='border:1px solid #ddd;width:90%;margin:0 auto;font-size:20rpx;text-align:center;'>
						<input :value='listz[nu].carCate.carName' style='border:1px solid #ddd;width:90%;margin:0 auto;margin-top:20rpx;font-size:20rpx;text-align:center;'>
					</view>
					<view>
						<view style='float:left;width:40%;margin-left:5%;background:#ddd;text-align:center;margin-top:50rpx;font-size:26rpx;line-height:60rpx;border-radius:10rpx;' @tap='quxiao'>取消</view>
						<view style='float:right;width:40%;margin-right:5%;background:#2b5cff;color:#fff;text-align:center;margin-top:50rpx;font-size:26rpx;line-height:60rpx;border-radius:10rpx;' @tap='tijiao'>确定</view>
					</view>
				</view>
			</view>
		</view>
		<view class="siteBox" v-for='(item,index) in listz'>
			<view class="content">
				<view class="d">
					<text>{{item.carCate.carName}}</text>
				</view>
				<view class="nome">
					<text>{{item.carNum}}</text>
				</view>
			</view>
			<view class="edit">
				<text @tap='bianji(index)'>编辑</text>
			</view>
		</view>
		<view class="uni-padding-wrap uni-common-mt bott">
			<button type="primary" style="background: #2b5cff" @tap='fanhui'>添加爱车</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listz: [],
				tianj:false,
				nu:0
			}
		},
		onLoad: function() {
			var _this = this
			this.$https({
				url: '/api/user/my-favorite-car-list',
				data: {},
				success: function(res) {
					_this.listz = res.data.data
				}
			})
		},
		methods: {
			fanhui: function() {
				uni.navigateTo({
					url: '../../shop/car?id=1'
				})
			},
			tianjia: function() {
				uni.navigateTo({
					url: '../../shop/car?id=1'
				})
			},
			bianji:function(index){
				this.nu=index
				this.tianj=true
			},
			quxiao:function(){
				this.tianj=false
			},
			tijiao:function(){
				this.$https({url:'/api/user/edit-my-favorite-car',data:JSON.stringify({carCateId:this.listz[this.nu].carCateId,carNum:this.listz[this.nu].carNum,id:this.listz[this.nu].id,myCarImg:this.listz[this.nu].myCarImg}),method:'post',haeder:true,success:function(res){
					
				}})
			},
			shangchuan:function(){
				uni.chooseImage({
					success:chooseImageRes=>{
						uni.uploadFile({
							url:this.webUrl+'/api/oauth/oss/upload',
							filePath:chooseImageRes.tempFilePaths[0],
							name:'img',
							success:res=>{
								this.listz[this.nu].myCarImg=JSON.parse(res.data).data.url
							}
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	checkbox {
		border-radius: 50%;
	}

	.top {
		width: 750upx;
		margin: 0 auto;
		overflow: hidden;
		border-bottom: 1px solid #e5e5e5;

		.textBox {
			padding-left: 40%;

			text {
				font-size: 38upx;
				color: #333;
				float: left;
				line-height: 90upx;
			}
		}

		.imgBox {
			float: right;
			padding: 20upx;

			text {
				font-size: 26upx;
				color: #333;
			}
		}
	}

	.siteBox {
		width: 710upx;
		margin: 20upx;
		overflow: hidden;
		padding-top: 20upx;
		padding-bottom: 40upx;
		border-bottom: 1px solid #e5e5e5;

		.radios {
			float: left;
			padding-top: 30upx;
			padding-right: 10upx;
		}

		.content {
			float: left;
			width: 80%;
			line-height: 40rpx;

			.nome {
				float: left;
				font-size: 30upx;
				color: #333;
				padding-right: 10upx;
			}

			// .call {
			// 	float: left;
			// 	font-size: 24upx;
			// 	color: #666;
			// 	line-height: 40upx;
			// 	padding-right: 10upx;
			// }

			// .label {
			// 	float: left;
			// 	font-size: 18upx;
			// 	color: #ff6633;
			// 	padding: 5upx;
			// 	margin-top: 5upx;
			// 	background-color: #fdf1ec;
			// }

			.p {
				float: left;
				font-size: 26upx;
				color: #333;
				line-height: 40upx;
			}
		}

		.edit {
			float: right;
			margin-top: 20upx;
			border-left: 1px solid #e5e5e5;

			text {
				font-size: 24upx;
				color: #999;
				line-height: 80upx;
				padding-left: 20upx;
			}
		}

	}

	.bott {
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
