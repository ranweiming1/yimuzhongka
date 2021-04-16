<template>
	<view style='huangdong'>
		<!-- 文字轮播 -->
		<!-- <view class='swiperS'>
			<view class="swiper-item">
				<view :style='nu'>{{text+text+text+text+text+text+text+text+text+text}}</view>
			</view>
		</view> -->
		<view class="boxScroll">
			<view class="animate">
				{{text}}
			</view>
		</view>
		<view class='uni-form-items'>
			<text>上传店铺logo</text>
			<text class="label-item" @tap="beCareful">注意事项</text>
		</view>

		<view class="form-item">
			<view class="uni-img-item">
				<view class="img-center">
					<image @tap='dianpu' :src="storeLogo" mode=""></image>
					<text>上传店铺logo</text>
				</view>
			</view>
		</view>

		<view class='uni-form-items'>
			<text>上传营业执照</text>
			<text class="label-item" @tap="beCareful">注意事项</text>
		</view>

		<view class="form-item">
			<view class="uni-img-item">
				<view class="img-center">
					<image @tap='yingyezhizhao' :src='license' mode=""></image>
					<text>上传营业执照</text>
				</view>
			</view>
		</view>

		<view class='uni-form-items'>
			<text>上传法人身份证</text>
			<text class="label-item" @tap="beCareful">注意事项</text>
		</view>

		<view class="form-item">
			<view class="uni-img-item">
				<view class="img-center fl">
					<image @tap='shenfenzheng' :src="cardImg1" mode=""></image>
					<text>上传身份证正面</text>
				</view>
				<view class="img-center fr">
					<image @tap='shenfenzhengF' :src="cardImg2" mode=""></image>
					<text>上传身份证反面</text>
				</view>
			</view>
			<view class='uni-form-item'>
				<view class='title'><text>姓名</text></view>
				<input class='uni-input' v-model='legalName' placeholder='请输入姓名'  disabled >
			</view>
			<view class='uni-form-item'>
				<view class='title'><text>身份证号</text></view>
				<input class='uni-input' v-model='legalCardId' placeholder='请输入身份证号' disabled >
			</view>
			<view class='uni-form-item'>
				<view class='title'><text>银行卡号</text></view>
				<input class='uni-input' v-model='bankCardNo' placeholder='请输入银行卡号' @blur='jiaoyanyinhangka'
					:disabled='jiaoyananniu'>
			</view>
			<view class='uni-form-item'>
				<view class='title'><text>预留手机号</text></view>
				<input class='uni-input' v-model='shoujihao' placeholder='请输入预留手机号' @blur='jiaoyanyinhangka'
					:disabled='jiaoyananniu'></input>
			</view>
			<view class='uni-form-item'>
				<view class='title'><text>银行名称</text></view>
				<input class='uni-input' v-model='mingcheng' placeholder='请输入银行名称'>
			</view>
			<view class='uni-form-item'>
				<view class='title'><text>开户行</text></view>
				<input class='uni-input' v-model='kaihuhang' placeholder='请输入开户行'>
			</view>

		</view>
		<view class="uni-buttom">
			<view class="check-item">
				<view class="chec-item" @tap="checks">
					<image v-if="isCheck" src="../../../static/checked.png" mode=""></image>
				</view>
				<text  @tap='goAgre'>我已阅读并同意《<text style="color: #ee4646;">商家入驻协议</text>》</text>
			</view>
			<view class="bott-item" @tap="submit">
				<text>提交</text>
			</view>
		</view>
		<view class="mask-item" v-if="isMask">
			<view class="mask-content">
				<view class="item-title">
					注意事项
				</view>
				<view class="item-content">
					{{logoCare}}
				</view>
				<view class="item-bot" @tap="beCareful">
					确定
				</view>
			</view>
		</view>
		<view class="cashMask" v-if="isSubmit">
			<view class="cash-con">
				<view class="cash-icon">
					<image src="../../../static/checked.png" mode=""></image>
				</view>
				<view class="cash-text">
					<view class="">
						您已提交审核
					</view>
					<view class="">
						审核需要1-3个工作日,请耐心等待！
					</view>

				</view>
				<view class="cash-bot" @tap="hide">
					确认
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				text: '依据《中华人民共和国电子商务法》规定，用户在网络平台发布信息需提供真实身份信息建立登记档案，并定期核验更新，否则网络平台运营者不得为其提供相关服务。请根据您的实际情况选择备案方式（提交后不可变更）感谢您的配合。',
				isCheck: false,
				cardImg1: '../../../static/uploadBag.png',
				cardImg2: '../../../static/uploadBag.png',
				license: '../../../static/uploadBag.png',
				storeLogo: '../../../static/uploadBag.png',
				logoCare: '上传图像格式为：JPG、png,  大小不得大于1M.',
				isMask: false,
				legalCardId: '',
				legalName: '',
				shuju: '',
				bankCardNo: '',
				shoujihao: '',
				jiaoyananniu: false,
				mingcheng: '',
				id: '',
				nu: '',
				list: ['依据《中华人民共和国电子商务法》规定，用户在网络平台发布信息需提供真实身份信息建立登记档案，并定期核验更新，否则网络平台运营者不得为其提供相关服务。请根据您的实际情况选择备案方式（提交后不可变更）感谢您的配合。',
					'依据《中华人民共和国电子商务法》规定，用户在网络平台发布信息需提供真实身份信息建立登记档案，并定期核验更新，否则网络平台运营者不得为其提供相关服务。请根据您的实际情况选择备案方式（提交后不可变更）感谢您的配合。'
				],
				isSubmit: false,
				resMsg: '银行卡信息错误',
				kaihuhang:'',
				sex:'',
				xxId:''
			}
		},
		onLoad: function(option) {
			this.shuju = JSON.parse(option.o)
			var _this = this
			console.log(JSON.parse(option.o))
			//获取用户id
			this.$https({
				url: '/api/user/my-info',
				data: {},
				success: res => {
					this.id = res.data.data.id
				}
			})
			this.$https({
				url: '/api/shop/appr-info',
				data: {},
				dengl: false,
				method: 'POST',
				success: function(res) {
					if (res.data.data) {
						_this.cardImg1 = res.data.data.cardImg1
						_this.sex = res.data.data.sex
						_this.cardImg2 = res.data.data.cardImg2
						_this.license = res.data.data.license
						_this.storeLogo = res.data.data.storeLogo
						_this.legalCardId = res.data.data.legalCardId
						_this.legalName = res.data.data.legalName
						_this.bankCardNo = res.data.data.bankCardNo
						_this.shoujihao = res.data.data.sqrPhone
						_this.mingcheng = res.data.data.bankName
						_this.kaihuhang=res.data.data.accountBank
						_this.jiaoyananniu=true
						_this.xxId=res.data.data.id
						
					}
					
				}
			})
			setTimeout(function() {
				_this.nu = 'margin-left:-3300%;transition:210s;'
			})
		},
		methods: {
			hide(){
				this.isSubmit=false
				uni.reLaunch({
					url:'../user'
				})
			},
			goAgre(){
				uni.navigateTo({
					url:'../../enter/protocol?type=3'
				})
			},
			checks() {

				this.isCheck = !this.isCheck
				console.log((this.isCheck))
			},
			jiaoyanKongGe(str) {
				if (str.indexOf(" ") == -1) {
					// console.log("没有空格");
					return true
				} else {
					// console.log("有空格");
					return false
				}

			},
			beCareful: function() {
				this.isMask = !this.isMask
			},
			yingyezhizhao: function() {
				var _this = this
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					success: res => {
						uni.uploadFile({
							url: _this.webUrl + '/oauth/oss/upload',
							filePath: res.tempFiles[0].path,
							name: 'img',
							success: res => {
								this.license = JSON.parse(res.data).data.url
							}
						})
					}
				})
			},
			shenfenzheng: function() {
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					success: res => {
						uni.uploadFile({
							url: this.webUrl + '/oauth/oss/upload',
							filePath: res.tempFilePaths[0],
							name: 'img',
							success: res => {
								this.cardImg1 = JSON.parse(res.data).data.url
								uni.request({
									url: this.webUrl + '/oauth/get-ocr-id-card-info',
									data: {
										imgPath: this.cardImg1,
										imgType: 0
									},
									header: {
										'Content-Type': 'application/x-www-form-urlencoded'
									},
									method: 'post',
									success: res => {
										if (res.data.code == 0) {
											this.legalName = JSON.parse(res.data
													.data)
												.name
											this.legalCardId = JSON.parse(res.data
												.data).num
												this.sex=JSON.parse(res.data
												.data).sex
											this.jiaoyanyinhangka()
										} else {
											uni.showToast({
												title: '身份证无法识别，请重新上传',
												icon: 'none'
											})
										}

									}
								})
							}
						})
					}
				})
			},
			shenfenzhengF: function() {
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					success: res => {
						uni.uploadFile({
							url: this.webUrl + '/oauth/oss/upload',
							filePath: res.tempFilePaths[0],
							name: 'img',
							success: res => {
								this.cardImg2 = JSON.parse(res.data).data.url
							},
						})
					}
				})
			},
			dianpu: function() {
				var _this = this
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					success: res => {
						console.log(res.tempFilePaths[0], res)
						uni.uploadFile({
							url: _this.webUrl + '/oauth/oss/upload',
							filePath: res.tempFilePaths[0],
							name: 'img',
							success: res => {
								console.log(res)
								this.storeLogo = JSON.parse(res.data).data.url
							}
						})
					}
				})
			},
			submit: function() {
				console.log(this.kaihuhang)
				var _this=this
				var obj = {}
				var shuju = this.shuju
				obj.accountName = shuju.accountName
				obj.sqrPhone = this.shoujihao
				obj.storeName = shuju.storeName
				obj.legalName = this.legalName
				obj.licenseNo = shuju.licenseNo
				obj.area = shuju.area
				obj.email = shuju.email
				obj.principal = shuju.principal
				obj.princPhone = shuju.princPhone
				obj.fzrDept = shuju.fzrDept
				// obj.cateIdList = shuju.cateIdList
				obj.storeLogo = this.storeLogo
				obj.license = this.license
				obj.cardImg1 = this.cardImg1
				obj.cardImg2 = this.cardImg2
				obj.legalCardId = this.legalCardId
				obj.bankCardNo = this.bankCardNo
				obj.bankName = this.mingcheng
				obj.mermberId = this.id
				obj.legalPhone = shuju.sqrPhone
				obj.holder=this.legalName
				obj.accountBank=this.kaihuhang
				obj.address=shuju.address
				obj.carBrandId=''
				obj.holdImg=''
				obj.sex=this.sex=='女'?'1':'0'
				if(this.xxId){
					obj.id=this.xxId
				}
				console.log(obj)
				if (obj.storeLogo == '../../../static/uploadBag.png') {
					uni.showToast({
						title: '请上传店铺logo',
						icon: 'none'
					})
					return false
				}
				if (obj.license == '../../../static/uploadBag.png') {
					uni.showToast({
						title: '请上传营业执照',
						icon: 'none'
					})
					return false
				}
				if (obj.cardImg1 == '../../../static/uploadBag.png') {
					uni.showToast({
						title: '请上传身份证正面',
						icon: 'none'
					})
					return false
				}
				if (obj.cardImg2 == '../../../static/uploadBag.png') {
					uni.showToast({
						title: '请上传身份证反面',
						icon: 'none'
					})
					return false
				}
				if (!this.jiaoyananniu) {
					uni.showToast({
						title: this.resMsg,
						icon: 'none'
					})
					return false
				}
				if (!this.isCheck) {
					uni.showToast({
						title: '请阅读并同意商家入驻协议',
						icon: 'none'
					})
					return false
				}
				if (this.jiaoyananniu) {
					this.$https({
						url: '/api/shop/add-merchat',
						data: obj,
						haeder: true,
						method: 'post',
						success: res => {
							// 入驻成功跳转页面
							console.log(res)
							if (res.data.code == 0) {
								_this.isSubmit=true
							}else{
							uni.showToast({
								title: res.data.message,
								icon: 'none'
							})
							}
						}
					})
				}
			},
			jiaoyanyinhangka: function() {
				if (this.bankCardNo && this.legalCardId && this.legalName && this.shoujihao) {
					if (!this.jiaoyanKongGe(this.bankCardNo)) {
						uni.showToast({
							title: '银行卡号不允许有空格',
							icon: 'none'
						})
					} else {
						uni.request({
							url: this.webUrl + '/oauth/get-bank-card4',
							data: {
								cardNumber: this.bankCardNo,
								idNumber: this.legalCardId,
								name: this.legalName,
								phoneNumber: this.shoujihao
							},
							header: {
								'Content-Type': 'application/x-www-form-urlencoded'
							},
							method: 'post',
							success: res => {
								if (res.data.code == 0) {
									this.jiaoyananniu = true
								} else {
									this.jiaoyananniu = false
									this.resMsg = res.data.message
								}
							}
						})

					}
				}
			}
		}

	}
</script>

<style lang="scss">
	.boxScroll {
		width: 100%;
		box-sizing: border-box;
		margin: 0 auto;
		overflow: hidden;
		background: #f7f7f7;
		height: 80rpx;
		line-height: 80rpx;
	}

	.cashMask {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.3);
		z-index: 99;

		.cash-con {
			background: #fff;
			position: absolute;
			z-index: 999;
			left: 50rpx;
			right: 50rpx;
			box-sizing: border-box;
			top: 50%;
			margin-top: -50%;
			border-radius: 20rpx;
			padding: 50rpx;
			text-align: center;

			.cash-icon {
				text-align: center;
				margin-bottom: 20rpx;

				image {
					width: 100rpx;
					height: 100rpx;
					display: inline-block;
				}
			}

			.cash-text {
				font-size: 32rpx;
				margin-bottom: 40rpx;

				>view {
					line-height: 50rpx;
				}
			}

			.cash-bot {
				height: 70rpx;
				line-height: 70rpx;
				background: #007AEE;
				border-radius: 45rpx;
				color: #fff;
			}
		}
	}


	.animate {
		padding-left: 20rpx;
		font-size: 22rpx;
		color: #ee4646;
		display: inline-block;
		white-space: nowrap;
		animation: 15s wordsLoop linear infinite normal;
	}

	@keyframes wordsLoop {
		0% {
			transform: translateX(200rpx);
			-webkit-transform: translateX(200rpx);
		}

		100% {
			transform: translateX(-100%);
			-webkit-transform: translateX(-100%);
		}
	}

	@-webkit-keyframes wordsLoop {
		0% {
			transform: translateX(200rpx);
			-webkit-transform: translateX(200rpx);
		}

		100% {
			transform: translateX(-100%);
			-webkit-transform: translateX(-100%);
		}
	}

	.huangdong {
		width: 100%;
		overflow: hidden;
	}

	.mask-item {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.5);
		font-size: 28rpx;
		color: #333;

		.mask-content {
			position: absolute;
			z-index: 99;
			background-color: #fff;
			top: 50%;
			transform: translateY(-50%);
			left: 50rpx;
			right: 50rpx;
			border-radius: 15rpx;
			text-align: center;

			.item-title {
				font-size: 32rpx;
				padding-top: 40rpx;
				font-weight: 500;
			}

			.item-content {
				line-height: 50rpx;
				padding: 15rpx 25rpx;
				text-align: left;
			}

			.item-bot {
				width: 200rpx;
				height: 60rpx;
				line-height: 60rpx;
				background-color: #2b5cff;
				border-radius: 45rpx;
				color: #fff;
				text-align: center;
				display: inline-block;
				margin-bottom: 40rpx;
			}
		}
	}

	page {
		background-color: #f7f7f7;
	}

	.fl {
		float: left;
	}

	.fr {
		margin-left: 20rpx;
		float: right;
	}

	.swiperS {
		position: relative;
		height: 80rpx;
		background: #f7f7f7;
		width: 100%;


		.swiper-item {
			position: absolute;
			top: 0;
			left: 30rpx;
			width: 100%;
			background-color: #f7f7f7;
			// margin: 20rpx;
			height: 80rpx;
			line-height: 80rpx;
			color: #ee4646;
			font-size: 22rpx;
			box-sizing: border-box;

			view {
				width: 3300%;
			}
		}
	}

	.uni-form-items {
		height: 95rpx;
		line-height: 95rpx;
		padding-left: 30rpx;
		color: #333333;
		font-size: 28rpx;
		width: 100%;
		box-sizing: border-box;

		.label-item {
			background-color: #ee4646;
			color: #fff;
			font-size: 20rpx;
			padding: 7rpx 13rpx;
			border-radius: 10rpx;
			margin-left: 30rpx;

		}
	}

	.form-item {
		background-color: #fff;
		padding: 0 30rpx;
		box-sizing: border-box;
		overflow: hidden;
		width: 100%;

		.uni-img-item {
			// padding-right: 30rpx;
			border-bottom: 1rpx solid #f1f1f1;
			overflow: hidden;

			.img-center {
				overflow: hidden;
				width: 325rpx;
				text-align: center;
				margin-bottom: 45rpx;
			}

			image {
				display: block;
				width: 325rpx;
				height: 230rpx;
				margin-top: 30rpx;
				border-radius: 10rpx;
				margin-bottom: 25rpx;
			}

			text {
				margin-bottom: 45rpx;
				font-size: 26rpx;
				color: #333;
			}
		}
	}

	.form-item :last-child {
		border: none;
	}

	.uni-form-item {
		height: 100rpx;
		line-height: 100rpx;
		border-bottom: 1rpx solid #f1f1f1;
		overflow: hidden;
		padding-right: 30rpx;

		.title {
			float: left;
			color: #666666;
			font-size: 28rpx;

			.texts {
				font-size: 22rpx;
				display: block;
				line-height: 35rpx;
			}

		}

		.uni-input {
			float: right;
			text-align: right;
			font-size: 28rpx;
			padding-left: 20upx;
			font-family: Microsoft YaHei;
			height: 100rpx;
			line-height: 100rpx;
			color: #333333;
		}

		.cont {
			float: right;
			color: #333;
			font-size: 28rpx;
			margin-right: 15rpx;
		}

		.imgBox {
			width: 14rpx;
			height: 25rpx;
			float: right;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	.uni-buttom {
		background-color: #fff;
		font-size: 22rpx;
		color: #333;
		margin-top: 40rpx;
		padding-bottom: 25rpx;

		.check-item {
			height: 84rpx;
			line-height: 84rpx;
			padding-left: 30rpx;

			.chec-item {
				display: inline-block;
				vertical-align: middle;
				margin-right: 15rpx;
				// box-sizing: border-box;
				background: #fff;
				border-radius: 50%;
				width: 31rpx;
				height: 31rpx;
				border: 1rpx solid #e7e7e7;

				image {
					width: 31rpx;
					height: 31rpx;
					display: block;
				}

				.add {
					background: #fff;
				}
			}
		}

		.bott-item {
			background-color: #2b5cff;
			height: 90rpx;
			border-radius: 45rpx;
			font-family: Microsoft YaHei;
			text-align: center;
			margin-right: 30rpx;
			margin-left: 30rpx;
			font-size: 24rpx;
			color: #fff;
			line-height: 90rpx;
		}
	}
</style>
