<template>
	<view>
		<!-- 文字轮播 -->
		<view class='swiperS'>
			<view class="swiper-item">
				<swiper :circular='true' style="height: 80rpx;" :interval='2000' :duration='6000' :autoplay='true' :indicator-dots='false'>
					<swiper-item style="padding-right:20rpx;">{{text}}</swiper-item>
					<swiper-item style='padding-right:20rpx;'>{{text}}</swiper-item>
				</swiper>
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
				<input class='uni-input' v-model='legalName' placeholder='请输入姓名'>
			</view>
			<view class='uni-form-item'>
				<view class='title'><text>身份证号</text></view>
				<input class='uni-input' v-model='legalCardId' placeholder='请输入身份证号'>
			</view>
			<view class='uni-form-item'>
				<view class='title'><text>银行卡号</text></view>
				<input class='uni-input' v-model='bankCardNo' placeholder='请输入银行卡号' @blur='jiaoyanyinhangka'>
			</view>
			<view class='uni-form-item'>
				<view class='title'><text>预留手机号</text></view>
				<input class='uni-input' v-model='shoujihao' placeholder='请输入预留手机号' @blur='jiaoyanyinhangka'></input>
			</view>
			<view class='uni-form-item'>
				<view class='title'><text>银行名称</text></view>
				<input class='uni-input' v-model='mingcheng' placeholder='请输入银行名称'>
			</view>

		</view>
		<view class="uni-buttom">
			<view class="check-item">
				<view class="chec-item" @tap="checks">
					<view :class="isCheck?'':'add'"></view>
				</view>
				<text>我已阅读并同意《<text style="color: #ee4646;">商家入驻协议</text>》</text>
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
				mingcheng:'',
				id:''
			}
		},
		onLoad: function(option) {
			this.shuju = JSON.parse(option.o)
			//获取用户id
			this.$https({url:'/api/user/my-info',data:{},success:res=>{
				this.id=res.data.data.id
			}})
		},
		methods: {
			checks() {

				this.isCheck = !this.isCheck
				console.log((this.isCheck))
			},
			beCareful: function() {
				this.isMask = !this.isMask
			},
			yingyezhizhao: function() {
				var _this = this
				uni.chooseImage({
					success: res => {
						uni.uploadFile({
							url: _this.webUrl + '/api/oauth/oss/upload',
							filePath: res.tempFilePaths[0],
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
					success: res => {
						uni.uploadFile({
							url: this.webUrl + '/api/oauth/oss/upload',
							filePath: res.tempFilePaths[0],
							name: 'img',
							success: res => {
								this.cardImg1 = JSON.parse(res.data).data.url
								uni.request({
									url: this.webUrl + '/api/oauth/get-ocr-id-card-info',
									data: {
										imgPath: this.cardImg1,
										imgType: 0
									},
									header: {
										'Content-Type': 'application/x-www-form-urlencoded'
									},
									method: 'post',
									success: res => {
										this.legalName = JSON.parse(res.data.data).name
										this.legalCardId = JSON.parse(res.data.data).num
										this.jiaoyanyinhangka()
									}
								})
							}
						})
					}
				})
			},
			shenfenzhengF: function() {
				uni.chooseImage({
					success: res => {
						uni.uploadFile({
							url: this.webUrl + '/api/oauth/oss/upload',
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
					success: res => {
						uni.uploadFile({
							url: _this.webUrl + '/api/oauth/oss/upload',
							filePath: res.tempFilePaths[0],
							name: 'img',
							success: res => {
								this.storeLogo = JSON.parse(res.data).data.url
							}
						})
					}
				})
			},
			submit: function() {
				var obj={}
				var shuju=this.shuju
				obj.accountName=shuju.accountName
				obj.sqrPhone=shuju.sqrPhone
				obj.storeName=shuju.storeName
				obj.legalName=this.legalName
				obj.lecenseNo=shuju.lecenseNo
				obj.area=shuju.area
				obj.email=shuju.email
				obj.principal=shuju.principal
				obj.princPhone=shuju.princPhone
				obj.fzrDept=shuju.fzrDept
				obj.cateIdList=JSON.parse(shuju.cateIdList)
				obj.storeLogo=this.storeLogo
				obj.license=shuju.license
				obj.cardImg1=shuju.cardImg1
				obj.cardImg2=shuju.cardImg2
				obj.legalCardId=this.legalCardId
				obj.bankCardNo=this.bankCardNo
				obj.bankName=this.mingcheng
				obj.mermberId=this.id
				if(this.jiaoyananniu){
					this.$https({url:'/api/shop/add-merchat',data:obj,haeder:true,method:'post',success:res=>{uni.showToast({title:res.data.message,icon:'none'})}})
				}
			},
			jiaoyanyinhangka:function(){
				if(this.bankCardNo&&this.legalCardId&&this.legalName&&this.shoujihao){
					uni.request({url:this.webUrl+'/api/oauth/get-bank-card4',data:{cardNumber:this.bankCardNo,idNumber:this.legalCardId,name:this.legalName,phoneNumber:this.shoujihao},header:{'Content-Type':'application/x-www-form-urlencoded'},method:'post',success:res=>{if(res.data.code==0){this.jiaoyananniu=true}else{this.jiaoyananniu=false}uni.showToast({title:res.data.message})}})
				}
			}
		}
	}
</script>

<style lang="scss">
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
		float: right;
	}

	.swiperS {
		position: relative;
		height: 75rpx;
		background: #f7f7f7;

		.swiper-item {
			position: absolute;
			top: 0;
			left: 30rpx;
			width: 100%;
			background-color: #f7f7f7;
			// margin: 20rpx;
			height: 75rpx;
			line-height: 75rpx;
			color: #ee4646;
			font-size: 22rpx;


			swiper-item {
				// white-space: nowrap
				width: fit-content;
			}
		}
	}

	.uni-form-items {
		height: 95rpx;
		line-height: 95rpx;
		padding-left: 30rpx;
		color: #333333;
		font-size: 28rpx;

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
		padding-left: 30rpx;
		box-sizing: border-box;
		overflow: hidden;

		.uni-img-item {
			padding-right: 30rpx;
			border-bottom: 1rpx solid #f1f1f1;

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
				border: 1rpx solid #e6e6e6;
				border-radius: 50%;
				display: inline-block;
				vertical-align: middle;
				margin-right: 15rpx;
				box-sizing: border-box;

				view {
					box-sizing: border-box;
					margin: 6rpx;
					background: #2b5cff;
					width: 25rpx;
					height: 25rpx;
					border-radius: 50%;
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
