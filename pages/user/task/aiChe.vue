<template>
	<view>
		<view style='position:fixed;width:100%;height:100%;top:0;left:0;background:rgba(0,0,0,0.6);z-index:9999999;' v-if='tianj'>
			<view style='width:70%;height:60%;background:#fff;top:0;left:0;bottom:0;right:0;margin:auto;position:fixed;'>
				<view style='overflow:hidden;'>
					<image :src='listz[nu].myCarImg' style='width:90%;margin:0 auto;display:block;' @tap='shangchuan'></image>
					<view>
						<input :value='listz[nu].carNum' @input='chepai' style='border:1px solid #ddd;width:90%;margin:0 auto;font-size:24rpx;text-align:center;'>
						<input :value='listz[nu].carCate.carName' @input='pinpai' style='border:1px solid #ddd;width:90%;margin:0 auto;margin-top:20rpx;font-size:24rpx;text-align:center;'>
					</view>
					<view>
						<view style='float:left;width:40%;margin-left:5%;background:#ddd;text-align:center;margin-top:50rpx;font-size:26rpx;line-height:60rpx;border-radius:10rpx;'
						 @tap='quxiao'>取消</view>
						<view style='float:right;width:40%;margin-right:5%;background:#2b5cff;color:#fff;text-align:center;margin-top:50rpx;font-size:26rpx;line-height:60rpx;border-radius:10rpx;'
						 @tap='tijiao'>确定</view>
					</view>
				</view>
			</view>
		</view>
		<view>

		</view>
		<view class="siteBox-list">
			<view class="siteBox" v-for='(item,index) in listz'>
				<view class="content">
					<image :src='item.carCate.logo' style='width:80rpx;height:80rpx;border-radius:50%;border:4rpx solid #efefef;float:left;'></image>
					<view style='float:left;margin-left:20rpx;'>
						<view>{{item.carCate.carName}}</view>
						<view>{{item.carNum}}</view>
					</view>
					<image :src='item.myCarImg' style='width:190rpx;height:150rpx;border-radius:20rpx;float:right;'></image>
				</view>
				<view class="edit">
					<view @tap='bianji(index)'>
						<image src='../../../static/bianji.png' style='width:29rpx;height:29rpx;margin-right:20rpx;'></image>编辑
					</view>
					<text style='float:left;margin-top:20rpx;'>|</text>
					<view @tap='shanchuaichez(index)'>
						<image src='../../../static/shanch.png' style='width:22rpx;height:29rpx;margin-right:20rpx;'></image>删除
					</view>
				</view>
			</view>

		</view>
		<view style='height:160rpx;' v-if='listz.length==0'>
			<image src='../../../static/zanwu.png' style='width:259rpx;height:210rpx;margin:0 auto;displau:block;margin-left:245rpx;'></image>
			<view style='margin-top:50rpx;text-align:center; '>暂无爱车，快去添加吧</view>
		</view>
		<view class="uni-padding-wrap uni-common-mt bott">
			<button type="primary" style="background: #2b5cff" @tap='fanhui'>添加爱车</button>
		</view>
		<view class="del-mask" v-if='x'>
			<view class="del-mask-content">
				<view class="mask-title">你确定要删除{{listz[nu].carNum}}</view>
				<view class="mask-bot">
					<view class="bot-left" @tap='quxiaoaiche'>取消</view>
					<view class="bot-right" @tap=shanchuche(index)>确定</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listz: [],
				tianj: false,
				nu: 0,
				x: false
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
		onShow() {
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
			bianji: function(index) {
				this.nu = index
				this.tianj = true
			},
			quxiao: function() {
				this.tianj = false
			},
			tijiao: function() {
				var a = 0
				if (this.listz[this.nu].carNum.substring(1, 2) == 'A' || this.listz[this.nu].carNum.substring(1, 2) == 'B' || this
					.listz[this.nu].carNum.substring(1, 2) == 'C' || this.listz[this.nu].carNum.substring(1, 2) == 'D' || this.listz[
						this.nu].carNum.substring(1, 2) == 'E' || this.listz[this.nu].carNum.substring(1, 2) == 'F' || this.listz[this.nu]
					.carNum.substring(1, 2) == 'G' || this.listz[this.nu].carNum.substring(1, 2) == 'H' || this.listz[this.nu].carNum
					.substring(1, 2) == 'I' || this.listz[this.nu].carNum.substring(1, 2) == 'J' || this.listz[this.nu].carNum.substring(
						1, 2) == 'K' || this.listz[this.nu].carNum.substring(1, 2) == 'L' || this.listz[this.nu].carNum == 'M' || this.listz[
						this.nu].carNum.substring(1, 2) == 'N' || this.listz[this.nu].carNum.substring(1, 2) == 'O' || this.listz[this.nu]
					.carNum.substring(1, 2) == 'P' || this.listz[this.nu].carNum.substring(1, 2) == 'Q' || this.listz[this.nu].carNum
					.substring(1, 2) == 'I' || this.listz[this.nu].carNum.substring(1, 2) == 'S' || this.listz[this.nu].carNum.substring(
						1, 2) == 'T' || this.listz[this.nu].carNum.substring(1, 2) == 'U' || this.listz[this.nu].carNum.substring(1, 2) ==
					'V' || this.listz[this.nu].carNum.substring(1, 2) == 'W' || this.listz[this.nu].carNum.substring(1, 2) == 'X' ||
					this.listz[this.nu].carNum.substring(1, 2) == 'Y' || this.listz[this.nu].carNum.substring(1, 2) == 'Z') {
					a = 1
				}
				if (a == 0 || this.listz[this.nu].carNum.length > 8 || this.listz[this.nu].carNum.length < 7) {
					uni.showToast({
						title: '请输入正确的车牌号'
					})
					return false
				}
				var a = 0
				if (!
					/^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/
					.test(this.listz[this.nu].carNum)) {
					a = 1
				}
				if (a == 1) {
					uni.showToast({
						title: '请输入正确的车牌号'
					})
					return false
				}
				this.$https({
					url: '/api/user/edit-my-favorite-car',
					data: JSON.stringify({
						carCateId: this.listz[this.nu].carCateId,
						carNum: this.listz[this.nu].carNum,
						id: this.listz[this.nu].id,
						myCarImg: this.listz[this.nu].myCarImg
					}),
					method: 'post',
					haeder: true,
					success: function(res) {
						if (res.data.code == 0) {
							uni.showToast({
								title: '修改成功'
							})
							this.$https({
								url: '/api/user/my-favorite-car-list',
								data: {},
								success: res => {
									this.listz = res.data.data
								}
							})
						} else {
							uni.showToast({
								title: res.data.message
							})
						}
					}
				})
			},
			shangchuan: function() {
				uni.chooseImage({
					success: chooseImageRes => {
						uni.uploadFile({
							url: this.webUrl + '/api/oauth/oss/upload',
							filePath: chooseImageRes.tempFilePaths[0],
							name: 'img',
							success: res => {
								this.listz[this.nu].myCarImg = JSON.parse(res.data).data.url
							}
						})
					}
				})
			},
			shanchuaiche: function(index) {
				this.$https({
					url: '/api/user/delete-my-favorite-car',
					data: {
						carId: this.listz[index].id
					},
					header: true,
					method: 'post',
					success: res => {
						this.x = false
						if (res.data.code == 0) {
							uni.showToast({
								title: '删除成功'
							})
							this.$https({
								url: '/api/user/my-favorite-car-list',
								data: {},
								success: res => {
									this.listz = res.data.data
								}
							})
						} else {
							uni.showToast({
								title: '删除失败'
							})
						}
					}
				})
			},
			shanchuaichez: function(index) {
				this.nu = index
				this.x = true
			},
			shanchuche: function(index) {
				var index = this.nu
				this.shanchuaiche(index)
			},
			quxiaoaiche: function() {
				this.x = false
			},
			chepai: function(e) {
				this.listz[this.nu].carNum = e.detail.value
			},
			pinpai: function(e) {
				this.listz[this.nu].carCate.carName = e.detail.value
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #f4f6f8;
	}

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

	.siteBox-list {
		margin-bottom: 140rpx;
	}

	.siteBox {
		width: 680upx;
		margin: 20upx;
		overflow: hidden;
		padding-top: 20upx;
		padding-bottom: 40upx;
		border-bottom: 1px solid #e5e5e5;
		background: #fff;
		border-radius: 20rpx;
		padding: 30rpx 10rpx 20rpx 20rpx;

		.radios {
			float: left;
			padding-top: 30upx;
			padding-right: 10upx;
		}

		.content {
			width: 100%;
			line-height: 40rpx;
			overflow: hidden;
			margin-top: 20rpx;

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
			margin-top: 20upx;

			view {
				font-size: 24upx;
				color: #999;
				line-height: 80upx;
				width: 49%;
				float: left;
				text-align: center;
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
