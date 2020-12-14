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

		<view class="form-item">
			<view class='uni-form-item'>
				<view class='title'><text>用户名</text></view>
				<input class='uni-input' v-model='accountName' placeholder='请输入期望账户名仅限字母跟数字' @blur='zhanghu'>
			</view>
			<view class="uni-form-item">
				<view class="title"><text>手机号</text></view>
				<input class="uni-input" name="input" v-model='legalPhone' placeholder="请输入手机号" />
			</view>
		</view>
		<!-- 填写信息 -->
		<view class='uni-form-items'>
			<text>填写公司信息</text>
		</view>

		<view class="form-item">
			<view class="uni-form-item">
				<view class="title"><text>店铺名称</text></view>
				<input class="uni-input" name="input" v-model='storeName' placeholder="请输入店铺名称" />
			</view>
			<view class="uni-form-item">
				<view class="title"><text>法人姓名</text></view>
				<input class="uni-input" name="input" v-model='legalName' placeholder="请输入法人姓名" />
			</view>
			<view class="uni-form-item">
				<view class="title">
					<text class="texts" style="margin-top: 15rpx;">统一社会信用代码</text>
					<text class="texts">营业执照号</text>
				</view>
				<input class="uni-input" name="input" v-model='businessName' placeholder="请输入营业执照号" />
			</view>
			<view class='uni-form-item'>
				<view class='title'><text>银行卡号</text></view>
				<input class='uni-input' v-model='bankCardNum' placeholder='请输入银行卡号'>
			</view>
			<view class='uni-form-item'>
				<view class='title'><text>银行</text></view>
				<input class='uni-input' v-model='bankName' placeholder='请输入银行'>
			</view>
			<view class="uni-form-item" style="height: 135rpx;">
				<view class="title">
					<text class="texts" style="margin-top: 20rpx;font-size:28rpx;line-height: 50rpx;">详细地址</text>
					<text class="texts">这里是详细地址什么大厦几零几</text>
				</view>
				<input class="uni-input" name="input" style="line-height: 135rpx;height: 135rpx;" v-model='area' placeholder='详细地址' />
			</view>
			<view class='uni-form-item'>
				<view class='title'><text>邮箱</text></view>
				<input class='uni-input' v-model='email' placeholder='请输入邮箱'>
			</view>
		</view>

		<view class='uni-form-items'>
			<text>填写负责人信息</text>
		</view>

		<view class="form-item">
			<view class="uni-form-item">
				<view class="title"><text>负责人姓名</text></view>
				<input class="uni-input" name="input" v-model='principal' placeholder="请输入负责人姓名" />
			</view>
			<view class="uni-form-item">
				<view class="title"><text>负责人电话</text></view>
				<input class="uni-input" name="input" v-model='princPhone' placeholder="请输入新手机号" />
			</view>
			<view class="uni-form-item">
				<view class="title"><text>部门</text></view>
				<input class="uni-input" name="input" v-model='departmentName' placeholder="请输入部门名称" />
			</view>
		</view>

		<view class='uni-form-items'>
			<text>填写旺铺信息</text>
		</view>

		<view class="form-item">
			<!-- <view class="uni-form-item">
				<view class="title"><text>主营行业</text></view>
				<view class="item-cont" @tap="beCareful">
					<view class="imgBox">
						<image src="../../../static/icon_26.png" mode=""></image>
					</view>
					<view class="cont">
						<text>{{industry}}</text>
					</view>

				</view>
			</view> -->
			<!-- <view class="uni-form-item">
				<view class="title"><text>主营汽车品牌</text></view>
				<view class="imgBox">
					<image src="../../../static/icon_26.png" mode=""></image>
				</view>
				<view class="cont">
					<text>奥迪</text>
				</view>
			</view> -->
			<view class="uni-form-item">
				<view class="title"><text>主营分类</text></view>
				<view class="imgBox">
					<image src="../../../static/icon_26.png" mode=""></image>
				</view>
				<view class="cont" @tap="checkType">
					<text>请选择分类</text>
				</view>
			</view>
		</view>

		<view class="uni-buttom">
			<view class="check-item">
				<view class="chec-item" @tap="checks">
					<view :class="isCheck?'':'add'"></view>
				</view>
				<text>我已阅读并同意《<text style="color: #ee4646;">商家入驻协议</text>》</text>
			</view>
			<view class="bott-item" @tap="nextPage">
				<text>下一页</text>
			</view>
		</view>

		<view class="mask-item" v-if="isMask">
			<view class="mask-content">
				<view class="item-title">
					主营行业
				</view>
				<view class="item-content">
					<view :class="isActive==item?'item-add item-content-item ':'item-content-item '" @tap="activeCss(item)" v-for="(item,index) in hangyeList">
						{{item}}
					</view>
				</view>
				<view class="item-bot" @tap="beConfirm">
					确定
				</view>
			</view>
		</view>

		<view class="class-mask" v-if="classType">
			<view class="Box">
				<scroll-view class="left" scroll-y style="height: 100%">
					<view :class="id==index?'on':'none'" @tap="togLi(index)" v-for="(item ,index) in allList" :key=item.id>
						<text v-if='id==index' class="image"></text>
						<text>{{item.cateTitle}}</text>
					</view>
				</scroll-view>
				<view class="class-mask-right">
					<scroll-view scroll-y :scroll-top="scrollTop" scroll-with-animation>
						<view class="li-content" v-for="(item , index) in rList">
							<view class="li-title">
								{{item.cateTitle}}
							</view>
							<view class="li" v-for="(ite , inde) in item.childsList" @tap="checkList(ite.id)">
								<view class="imgpp">
									<image :src="ite.imgUrl" mode=""></image>
								</view>
								<view class="checked" v-if='ite.isCheck'>
									<image src="../../../static/checked.png" mode=""></image>
								</view>
								<view class="zhiya">
									<text>{{ite.cateTitle}}</text>
								</view>
							</view>
						</view>
					</scroll-view>

					<view class="mask-buttom">
						<view @tap="checkType" class="mask-buttom-cancel">
							取消
						</view>
						<view class="mask-buttom-confirm">
							确定
						</view>
					</view>

				</view>

			</view>

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				inde: 0,
				xing: ['男', '女', '未知'],
				accountName: '',
				area: '',
				cardImg1: '../../../static/img_10.jpg.png',
				cardImg2: '../../../static/img_10.jpg.png',
				email: '',
				holdImg: '../../../static/img_10.jpg.png',
				license: '../../../static/img_10.jpg.png',
				mermberId: '',
				princPhone: '',
				principal: '',
				sex: '',
				storeLogo: '../../../static/img_10.jpg.png',
				storeName: '',
				legalPhone: '',
				departmentName: '',
				businessName: '',
				bankName: '',
				t: true,
				text: '依据《中华人民共和国电子商务法》规定，用户在网络平台发布信息需提供真实身份信息建立登记档案，并定期核验更新，否则网络平台运营者不得为其提供相关服务。请根据您的实际情况选择备案方式（提交后不可变更）感谢您的配合。',
				isCheck: false,
				hangyeList: ['商用车配件', '工程机械配件', '整车及专用车', '其他配件'],
				isActive: '',
				industry: '',
				isMask: false,
				height: "",
				allList: [],
				rList: {},
				id: 0,
				classType: false,
				checkedList: []
			}
		},
		onLoad: function() {
			var _this = this
			if (this.classType) {
				uni.setNavigationBarTitle({
					title: '商家入驻（选择主营分类）'
				})
			}
			this.height = uni.getSystemInfoSync().windowHeight;
			this.$https({
				url: '/api/oauth/shop/mall-lists',
				data: {},
				dengl: true,
				success: function(res) {
					_this.allList = res.data.data.goodsCates

					_this.rList = res.data.data.goodsCates[0].childsList
					_this.rList.map(function(val, i) {
						val.childsList.map(function(item, index) {
							_this.$set(item, 'isCheck', false)
						})
						console.log(val)

					})

				},
			})

			this.$https({
				url: '/api/shop/appr-info',
				data: {},
				success: function(res) {
					if (res.data.data.id) {
						_this.accountName = res.data.data.accountName
						_this.area = res.data.data.area
						_this.email = res.data.data.email
						_this.legalCardId = res.data.data.legalCardId
						_this.inde = res.data.data.sex
						_this.storeName = res.data.data.storeName
						_this.legalName = res.data.data.legalName
						_this.legalPhone = res.data.data.legalPhone
						_this.principal = res.data.data.principal
						_this.princPhone = res.data.data.princPhone
						_this.storeLogo = res.data.data.storeLogo
						_this.license = res.data.data.license
						_this.cardImg1 = res.data.data.cardImg1
						_this.cardImg2 = res.data.data.cardImg2
						_this.holdImg = res.data.data.holdImg
						_this.t = false
					}
				}
			})
		},
		methods: {
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
			checkList: function(id) {
				var that = this
				// this.rList[index].childsList[indexs].isCheck =!this.rList[index].childsList[indexs].isCheck
				// 把Id添加到数组
				this.rList.map(function(val, i) {
					val.childsList.map(function(item, index) {
						if (id == item.id) {
							item.isCheck = !item.isCheck
							if (item.isCheck) {
								that.checkedList.push(item.id)
							}
						}
					})
				})
				this.checkedList.map(function(ite,ind){
					if(id==ite){
					console.log(ite,2222)
						that.checkedList.splice(ite)
					}
				})
				console.log(this.checkedList)
			},

			checkType: function() {
				this.classType = !this.classType
			},
			togLi(index, id) {
				this.id = index;
				this.rList = this.allList[index].childsList
			},
			activeCss(index) {
				this.isActive = index
			},
			beConfirm: function() {
				this.beCareful()
				this.industry = this.isActive
			},
			beCareful: function() {
				this.isMask = !this.isMask
			},
			checks() {
				this.isCheck = !this.isCheck
			},
			nextPage: function() {
				uni.navigateTo({
					url: './leagueTwo'
				})
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
							}
						})
					}
				})
			},
			shenfenzhengx: function() {
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
			shenfenzhengxxx: function() {
				uni.chooseImage({
					success: res => {
						uni.uploadFile({
							url: this.webUrl + '/api/oauth/oss/upload',
							filePath: res.tempFilePaths[0],
							name: 'img',
							success: res => {
								this.holdImg = JSON.parse(res.data).data.url
							}
						})
					}
				})
			},
			//上传信息
			shangchuan: function() {
				var _this = this
				var nu = false
				for (var i = 0; i < this.accountName.length; i++) {
					if (this.accountName.charCodeAt(i) > 255) {
						nu = true
					}
				}
				if (nu) {
					uni.showToast({
						title: '账户名不能包含汉字重新输入',
						icon: 'none'
					})
				} else if (!_this.$jiaoyanEmail(_this.email)) {
					uni.showToast({
						title: '请输入有效邮箱',
						icon: 'none'
					})
				} else if (!_this.$jiaoyanCard(_this.legalCardId)) {
					uni.showToast({
						title: '请输入正确身份证号',
						icon: 'none'
					})
				} else if (!_this.$jiaoyan(_this.legalPhone)) {
					uni.showToast({
						title: '请输入正确的手机号',
						icon: 'none'
					})
				} else if (!_this.$jiaoyan(_this.princPhone)) {
					uni.showToast({
						title: '请输入正确的手机号',
						icon: 'none'
					})
				} else {
					this.$https({
						url: '/api/shop/add-merchat',
						data: JSON.stringify({
							accountName: this.accountName,
							area: this.area,
							cardImg1: this.cardImg1,
							cardImg2: this.cardImg2,
							holdImg: this.holdImg,
							email: this.email,
							legalCardId: this.legalCardId,
							legalName: this.legalName,
							legalPhone: this.legalPhone,
							license: this.license,
							princPhone: this.princPhone,
							princpal: this.princpal,
							sex: this.inde,
							storeLogo: this.storeLogo,
							storeName: this.storeName
						}),
						method: 'post',
						haeder: true,
						success: function(res) {
							uni.showToast({
								title: res.data.message
							})
						}
					})
				}
			},
			zhanghu: function() {
				var nu = 0
				for (var i = 0; i < this.accountName.length; i++) {
					if (this.accountName.charCodeAt(i) > 255) {
						uni.showToast({
							title: '账户名不能包含汉字重新输入',
							icon: 'none'
						})
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f7f7f7;
		// padding-bottom: 150upx;
	}

	.class-mask {
		height: 100%;
		width: 100%;
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background-color: #FFFFFF;
		z-index: 99;
		box-sizing: border-box;

		.Box {
			width: 750upx;
			overflow: hidden;
			height: 100%;

			.li-content {
				font-size: 26rpx;
				color: #333;
				overflow: hidden;

				.li-title {
					margin-top: 10rpx;
					text-align: left;
					padding-left: 25rpx;
					padding-bottom: 25rpx;
				}

				.checked {
					width: 30rpx;
					height: 30rpx;
					position: absolute;
					right: 3rpx;
					top: 0;

					image {
						width: 100%;
						height: 100%;
					}
				}
			}

			.li-content:nth-child(n+1) {
				margin-top: 30rpx;
			}



			.left {
				text-align: center;
				width: 170upx;
				float: left;
				background-color: #f6f6f6;

				.on {
					width: 100%;
					box-sizing: border-box;
					// height: 90upx;
					background-color: #fff;
					padding: 25rpx 25rpx;
					margin-top: 25rpx;
					position: relative;

					.image {
						position: absolute;
						background: #2b5cff;
						width: 8rpx;
						height: 80%;
						display: block;
						left: 0;
						top: 0;
						bottom: 0;
						right: 0;
						margin: auto;
						margin-left: 0;
						border-radius: 5rpx;

					}

					text {
						color: #007AFF;
						font-size: 26upx;
					}
				}

				.none {
					margin-top: 25rpx;
					width: 100%;
					box-sizing: border-box;
					padding: 25rpx 25rpx;
					background-color: #f6f6f6;

					text {
						color: #333;
						font-size: 26upx;
						margin-left: 15rpx;
					}
				}
			}

			.class-mask-right {
				width: calc(100% - 170rpx);
				text-align: center;
				overflow: hidden;
				background-color: #fff;
				height: 100%;

				scroll-view {
					height: calc(100% - 140rpx);
					padding-right: 20rpx;
					box-sizing: border-box;
				}

				.mask-buttom {
					padding: 20rpx 30rpx 10rpx 30rpx;
					box-sizing: border-box;
					overflow: hidden;
					position: fixed;
					bottom: 20rpx;
					left: 170rpx;
					right: 0;
					background-color: #FFFFFF;

					view {
						width: calc(50% - 15rpx);
						border-radius: 45rpx;
						background-color: #ccc;
						height: 80rpx;
						line-height: 80rpx;
						font-size: 28rpx;
					}

					view:first-child {
						float: left;
						color: #333;

					}

					view:last-child {
						float: right;
						background-color: #2b5cff;
						color: #fff;
					}
				}

				.li {
					margin-bottom: 30upx;
					width: 33.33%;
					float: left;
					position: relative;

					.imgpp {
						image {
							width: 120upx;
							height: 120upx;
						}
					}

					.zhiya {
						text {
							font-size: 26upx;
							color: #333;
							line-height: 50upx;
						}
					}
				}

			}

		}

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
		z-index: 99;

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
				overflow: hidden;

				.item-content-item {
					float: left;
					width: fit-content;
					background-color: #f7f7f7;
					color: #333;
					height: 50rpx;
					line-height: 50rpx;
					padding: 10rpx 15rpx;
					border-radius: 10rpx;
					margin-right: 15rpx;
					margin-bottom: 15rpx;
				}

				.item-add {
					background-color: #2b5cff;
					color: #fff;
				}
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

	.swiperS {
		position: relative;
		height: 80rpx;
		background: #f7f7f7;

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

			swiper-item {
				// white-space: nowrap
			}
		}
	}

	.uni-form-items {
		height: 96rpx;
		line-height: 96rpx;
		padding-left: 30rpx;
		color: #333333;
		font-size: 28rpx;
	}

	.form-item {
		background-color: #fff;
		padding-left: 30rpx;
		box-sizing: border-box;
	}

	.uni-form-item {
		height: 100rpx;
		line-height: 100rpx;
		border-bottom: 1rpx solid #f1f1f1;
		overflow: hidden;
		padding-right: 30rpx;

		.item-cont {
			height: 100%;
			overflow: hidden;
		}

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

	.uni-form-item:last-child {
		border: none;
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

	.tis {
		background-color: #ffffcc;
		text-align: center;

		text {
			font-size: 24upx;
			color: #ff0000;
			line-height: 60upx;
		}
	}
</style>
