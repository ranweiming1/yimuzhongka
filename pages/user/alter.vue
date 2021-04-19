<template>
	<view class="bg">

		<!-- 修改资料 -->
		<view class="alter">
			<view class="left">
				<view class="h2">
					<input v-model='nickname' placeholder='暂无用户名' :disabled='jinyong' :style='jinyong?"":"border:1px solid #f2f2f2;"'
					 @blur='xiugai'>
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
				<image :src="headimg?headimg:index==0?'../../static/3a03a3d7ebe4442f847932f34b37765a.png':'../../static/307930aca7b24a8f938121e2bac851d4.png'" mode="" @tap='toux'></image>
			</view>
		</view>
		<view class="basic-list">

			<!-- 基础资料 -->
			<view class="basic">
				<view class="left_a">
					<text>绑定手机号</text>
				</view>
				<view class="right_a">
					<view class="img_a">
						<image src="../../static/icon_26.png" mode=""></image>
					</view>
					<text @tap='bangding' style='text-align:right;font-size:24rpx;line-height:105rpx;'>{{phone}}</text>
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
					<picker :range='arrsex' :value='index' class='shou' @change='sex' style='width:300rpx;line-height:105rpx;margin-top:0;'>{{arrsex[index]}}</picker>
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
					<picker mode='date' :value='date' @change='bindDateC' style='width:220rpx;font-size:24rpx;line-height:105rpx;margin-top:0;'
					 class='shou'>{{date}}</picker>
				</view>
			</view>
		</view>

		<view class="basic-list basic-list-two">
			<view class="basic">
				<view class="left_a">
					<text>公司名称</text>
				</view>
				<view class="right_a">
					<view class="img_a">
						<image src="../../static/icon_26.png" mode=""></image>
					</view>
					<input v-model='userName' @blur='shurukuang' style='text-align:right;line-height:105rpx;float:right;font-size:24rpx;height:105rpx;'>
				</view>
			</view>
			<view class='basic'>
				<view class='left_a'>
					<text>请选择地址</text>
				</view>
				<view class='right_a'>
					<pick-regions :defaultRegion='defaultRegionCode' @getRegion='handleGetRegion'>
						<view style='font-size:24rpx;line-height:105rpx;'>{{regionName}}</view>
					</pick-regions>
				</view>
			</view>

		</view>

		<view class=" uni-padding-wrap uni-common-mt quit">
			<view @tap='tuichu'>退出登录</view>
		</view>
	</view>
</template>

<script>
	import pickRegions from '@/components/pick-regions/pick-regions.vue'
	export default {
		data() {
			return {
				jinyong: true,
				nickname: '',
				arrsex: [
					'男',
					'女',
					'未知'
				],
				index: 0,
				date: '2020-05-06',
				phone: '手机',
				headimg: '../../static/img_06.jpg',
				userName: '',
				defaultRegion: ['山东省', '济南市', '历城区'],
				defaultRegionCode: '370104',
				region: [],
				regionName: '请选择省市县'
			}
		},
		onLoad: function() {
			//请求个人信息
			this.$https({
				url: '/api/user/my-info',
				dengl: false,
				success: res => {
					if (res.data.code == 0) {
						this.nickname = res.data.data.nickname
						this.phone = res.data.data.phone
						this.index = res.data.data.sex ? res.data.data.sex : 0
						this.birth = res.data.data.birth ? res.data.data.birth : '2020-05-06'
						this.userName = res.data.data.userName
						this.headimg = res.data.data.headimg
						this.regionName = res.data.data.area ? res.data.data.area : '请选择省市县'
					}
				}
			})
		},
		onShow:function(){
			this.$https({
				url:'/api/user/my-info',
				success:res=>{
					if(res.data.code==0){
						this.nickname=res.data.data.nickname
						this.phone=res.data.data.phone
						this.index=res.data.data.sex?res.data.data.sex:0
						this.birth=res.data.data.birth?res.data.data.birth:'2020-05-06'
						this.userName=res.data.data.userName
						this.headimg=res.data.data.headimg
						this.regionName=res.data.data.area?res.data.data.area:'请选择省市县'
					}
				}
			})
		},
		components: {
			pickRegions
		},
		methods: {
			bianji: function() {
				this.jinyong = false
			},
			bindDateC: function(e) {
				this.date = e.target.value
				var _this = this
				this.$https({
					url: '/api/user/edit-member-info',
					data: {
						birth: e.detail.value
					},
					dengl: false,
					method: 'post',
					haeder: true,
					success: function(res) {
						uni.showToast({
							title: res.data.message
						})
						_this.qingqiu()
					}
				})
			},
			xiugai: function() {
				var _this = this
				this.$https({
					url: '/api/user/edit-member-info',
					data: {
						nickname: this.nickname
					},
					dengl: false,
					method: 'post',
					haeder: true,
					success: function(res) {
						if (res.data.code == 0) {
							_this.qingqiu()
							uni.showToast({
								title: res.data.message
							})
						}
					}
				})
			},
			bangding: function() {
				uni.navigateTo({
					url: 'alter/alterCall/alterCall'
				})
			},
			//更改性别
			sex: function(e) {
				var _this = this
				this.$https({
					url: '/api/user/edit-member-info',
					data: {
						sex: e.detail.value
					},
					dengl: false,
					method: 'post',
					haeder: true,
					success: function(res) {
						_this.qingqiu()
						uni.showToast({
							title: res.data.message
						})
					}
				})
			},
			qingqiu: function() {
				var _this = this
				this.$https({
					url: '/api/user/my-info',
					dengl: false,
					success: function(res) {
						_this.nickname = res.data.data.nickname
						_this.phone = res.data.data.phone
						_this.index = res.data.data.sex
						_this.birth = res.data.data.birth ? res.data.data.birth : '2020-05-06'
						_this.userName = res.data.data.userName
						_this.headimg = res.data.data.headimg
						_this.regionName = res.data.data.area ? res.data.data.area : '请选择省市县'
					}
				})
			},
			tuichu: function() {
				uni.setStorageSync('Authorization', '')
				uni.showToast({
					title: '退出登录成功'
				})
				setTimeout(function() {
					uni.navigateTo({
						url: '../enter/enter'
					})
				})
			},
			toux: function() {
				var _this = this
				uni.chooseImage({
					sizeType:['compressed'],
					success: function(res) {
						uni.uploadFile({
							url: _this.webUrl + '/oauth/oss/upload',
							filePath: res.tempFilePaths[0],
							name: 'img',
							success: function(res) {
								_this.headimg = uni.getStorageSync('phoneModel')=='ios'?JSON.parse(res.data).data.url+'?x-oss-process=image/quality,q_60':JSON.parse(res.data).data.url
								var img = JSON.parse(res.data).data.url
								_this.$https({
									url: '/api/user/edit-member-info',
									data: {
										headimg: img
									},
									method: 'post',
									haeder: true,
									success: function(res) {
										_this.qingqiu()
									}
								})
							}
						})
					}
				})
			},
			shurukuang: function() {
				var _this = this
				this.$https({
					url: '/api/user/edit-member-info',
					data: {
						userName: this.userName
					},
					method: 'post',
					haeder: true,
					success: function(res) {
						_this.qingqiu()
					}
				})
			},
			handleGetRegion: function(region) {
				var _this = this
				if (this.region) {
					this.regionName = region[0].name + '-' + region[1].name + '-' + region[2].name
					this.$https({
						url: '/api/user/edit-member-info',
						data: {
							area: this.regionName
						},
						method: 'post',
						haeder: true,
						success: function(res) {
							_this.qingqiu()
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.bg {
		border-top: 6rpx solid #fff;
	}

	.alter {
		width: 750upx;
		background-color: #fff;
		overflow: hidden;
		padding-bottom: 20upx;
		border-bottom: 1rpx solid #eeeeee;
		border-top: 1rpx solid #e5e5e5;
		margin-bottom: 20rpx;

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
					width: 200rpx;
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

	page {
		background: #f7f7f7;
	}



	.basic-list {
		width: 100%;
		background-color: #FFFFFF;
		border-top: 1rpx solid #eeeeee;
	}

	.basic-list-two {
		border-top: none;
		margin-top: 15rpx;
	}

	.basic {
		// width: 710upx;
		background-color: #fff;
		overflow: hidden;
		margin: 0 25rpx 0 30rpx;
		height: 105rpx;
		line-height: 105rpx;
		// margin: 0 20rpx;
		// padding-bottom: 20upx;
		border-bottom: 1px dashed #ccc;

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

		page {
			background: #f7f7f7;
		}

		.right_a {
			float: right;
			padding-right: 18upx;
			height: 100%;
			line-height: 100%;


			text {
				font-size: 28upx;
				float: right;
				line-height: 70upx;
			}

			.img_a {
				float: right;
				// padding: 30upx 0upx 20upx 20upx;
				// margin-top: 50%;
				margin-top: 44rpx;
				margin-left: 25rpx;
				

				image {

					width: 12upx;
					height: 19upx;
					display: block;
				}

			}

			.shou {
				float: right;
				margin-top: 10rpx;
				text-align: right;
				font-size: 28rpx;
			}
		}


	}

	.basic:last-child {
		border: none;
	}

	.quit {
		overflow: hidden;

		margin: 0 auto;
		color: #fff;
		position: fixed;
		bottom: 10%;
		left: 75rpx;
		right: 75rpx;

		font-family: Microsoft YaHei;

		view {

			border-radius: 50upx 50upx;
			background-color: #2b5cff;
			color: #fff;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
		}
	}
</style>
