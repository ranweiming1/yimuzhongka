<template>
	<view>

		<view class="edit-mask" v-if='tianj'>
			<view class="edit-mask-cont">
				<view class="edit-title">
					编辑爱车
				</view>
				<view class="edit-img">
					<img :src='listz[nu].myCarImg?listz[nu].myCarImg:ediImg' @tap='shangchuan' mode="widthFix"></img>
				</view>
				<view class="edit-cont">
					<view class="edit-cont-top">
						<input type="text" :value='listz[nu].carNum' @input='chepai' />
					</view>
					<view class="edit-cont-top">
						<input type="text" :value='listz[nu].carCate.carName' style="width: 100%;" />
					</view>
				</view>
				<view @tap='quxiao' class="edit-bot">
					<view class="edit-bot-left">
						取消
					</view>
					<view @tap='tijiao' class="edit-bot-right">
						确定
					</view>
				</view>
			</view>
		</view>

		<view class="siteBox-list">
			<view class="siteBox" v-for='(item,index) in listz'>
				<view class="content">
					<image :src='item.carCate.logo' style='width:80rpx;height:80rpx;border-radius:50%;border:4rpx solid #efefef;float:left;'></image>
					<view style='float:left;margin-left:20rpx;'>
						<view>{{item.carCate.carName}}</view>
						<view>{{item.carNum}}</view>
					</view>
					<view class="car-logo">

						<img :src='item.myCarImg'></img>
					</view>
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
				x: false,
				xianshi: false,
				chenghumingcheng: '鲁',
				cheng: ['京', '津', '沪', '渝', '蒙', '新', '藏', '宁', '桂', '黑', '吉', '辽', '晋', '冀', '青', '鲁', '豫', '苏', '皖', '浙', '闽',
					'赣', '湘', '鄂', '粤', '琼', '甘', '陕', '贵', '云', '川'
				],
				index: '',
				ediImg:'../../../static/img_10.jpg.png'
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
			dianji: function(z) {
				this.index = z
				this.chenghumingcheng = this.cheng[z]
			},
			xuanze: function() {
				this.xianshi = !this.xianshi
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
						title: '请输入正确的车牌号',
						icon: 'none'
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
						title: '请输入正确的车牌号',
						icon: 'none'
					})
					return false
				}
				if (this.listz[this.nu].myCarImg == '../../static/img_10.jpg.png') {
					uni.showToast({
						title: '请选择图片',
						icon: 'none'
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
								console.log(JSON.parse(res.data), this.listz[this.nu].myCarImg)
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

	.checkbox {
		border-radius: 50%;
	}

	.edit-mask {
		position: fixed;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		background: rgba(0, 0, 0, 0.5);
		z-index: 99;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;

		.edit-mask-cont {
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			left: 70rpx;
			right: 70rpx;
			z-index: 999;
			background: #fff;
			border-radius: 10rpx;
			text-align: center;

			.edit-title {
				font-size: 30rpx;
				color: #333333;
				padding-top: 50rpx;
				padding-bottom: 40rpx;
			}

			.edit-img {
				margin: auto;
				width: 485rpx;
				box-sizing: border-box;
				border-radius: 15rpx;
				overflow: hidden;
				margin-bottom: 20rpx;
				height: 335rpx;

				img {
					width: 100%;
					display: block;
					object-fit: cover;
				}
			}

			.edit-cont {
				margin: auto;
				width: 485rpx;
				box-sizing: border-box;

				.edit-cont-top {
					overflow: hidden;
					width: 100%;
					border: 1rpx solid #efefef;
					height: 75rpx;
					line-height: 75rpx;
					box-sizing: border-box;
					border-radius: 10rpx;
					margin-bottom: 20rpx;



				}

				.country-left {
					float: left;
					width: 130rpx;
					background: #efefef;
					font-size: 28rpx;

					i {
						width: 0;
						height: 0;
						border: 10rpx solid #949494;
						border-bottom: 0;
						border-color: #949494 transparent transparent transparent;
						display: inline-block;
						vertical-align: middle;
						margin-left: 15rpx;
					}
				}

				input {
					height: 75rpx;
					line-height: 75rpx;
					width: 100%;
					box-sizing: border-box;
					text-align: left;
					padding-left: 35rpx;
					font-size: 26rpx;
					color: #999999;
				}
			}

			.edit-bot {
				margin-top: 30rpx;
				overflow: hidden;
				margin: auto;
				width: 485rpx;
				box-sizing: border-box;
				margin-bottom: 50rpx;

				view {
					width: calc(50% - 30rpx);
					height: 75rpx;
					line-height: 75rpx;
					border-radius: 10rpx;
					font-size: 24rpx;
				}

				.edit-bot-left {
					float: left;
					background: #eeeeee;
					color: #666666;
				}

				.edit-bot-right {
					float: right;
					background-color: #2b5cff;
					color: #FFFFFF;
				}

			}
		}
	}


	.cont-top {
		display: inline-block;
		margin-top: 25rpx;
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
		// margin-bottom: 140rpx;
		padding-bottom: 200rpx;
		overflow: hidden;
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

			.car-logo {
				width: 190rpx;
				height: 150rpx;
				border-radius: 20rpx;
				float: right;
				overflow: hidden;

				img {
					width: 100%;
					// height: 100%;
					display: block;
					object-fit: cover;
				}
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
