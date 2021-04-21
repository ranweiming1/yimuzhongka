<template>
	<view class='huangdong' :style="isProm?'height:100vh;overflow:hidden':''">
		<view class="top">
			<view class="back" @tap='back'>
				<image src='../../../static/icon_26-2.png' style='width:18rpx;height:32rpx;'></image>
			</view>
			<view class="textBox" :style="isIcon?'':'margin-right:90rpx'"><text>地址管理</text></view>
			<view class="imgBox" v-if="isIcon" @tap='problemGo'>
				<image src='../../../static/defitCon.png' style='width:36rpx;height:36rpx;'></image>
			</view>
		</view>
		<view class="boxScroll">
			<view class="animate">
				{{text}}
			</view>
		</view>
		<view class="form-item">
			<view class="uni-form-item">
				<view class="title"><text>店铺名称</text></view>
				<input class="uni-input" name="input" v-model='storeName' placeholder="请输入店铺名称" />
			</view>
			<view class='uni-form-item'>
				<view class='title'><text>用户名</text></view>
				<input class='uni-input' v-model='accountName' placeholder='仅限字母+数字' @blur='zhanghu'>
			</view>


		</view>
		<!-- 填写信息 -->
		<view class='uni-form-items'>
			<text>填写公司信息</text>
		</view>

		<view class="form-item">

			<view class="uni-form-item">
				<view class="title"><text>法人姓名</text></view>
				<input class="uni-input" name="input" v-model='legalName' placeholder="请输入法人姓名" />
			</view>
			<view class="uni-form-item">
				<view class="title"><text>法人手机号</text></view>
				<input class="uni-input" name="input" v-model='sqrPhone' placeholder="请输入法人手机号" />
			</view>
			<view class="uni-form-item">
				<view class="title">
					<text style="margin-top: 15rpx;">统一社会信用代码</text>
					<text class="texts"></text>
				</view>
				<input class="uni-input" name="input" v-model='licenseNo' placeholder="请输入营业执照号" />
			</view>
			<view class="uni-form-item">
				<view class="title"><text>请选择省市区</text></view>
				<view class='uni-input'>
					<pick-regions :defaultRegion='defaultRegionCode' @getRegion='handleGetRegion'>
						<view style='font-size:28rpx;line-height:100rpx;color: #333;'>{{area}}</view>
					</pick-regions>
				</view>
			</view>
			<!-- <view class="uni-form-item">
				<view class="title"><text>省/市/区</text></view>
				<input class="uni-input" name="input" v-model='area' placeholder="请输入省/市/区" />
			</view> -->
			<view class="uni-form-item" style="height: 135rpx;">
				<view class="title">
					<text style="margin-top: 20rpx;font-size:28rpx;line-height: 50rpx;">详细地址</text>
					<view class="texts"></view>
				</view>
				<input class='uni-input' v-model='adress' name='input' placeholder='请输入详细地址信息'>
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
				<input class="uni-input" name="input" v-model='fzrDept' placeholder="请输入部门名称" />
			</view>
		</view>
		<!-- <view class='uni-form-items'>
			<text>填写旺铺信息</text>
		</view> -->

		<!-- <view class="form-item"> -->
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
		<!-- <view class="uni-form-item">
				<view class="title"><text>主营分类</text></view>
				<view class="imgBox">
					<image src="../../../static/icon_26.png" mode=""></image>
				</view>
				<view class="cont" @tap="checkType">
					<text>{{lei}}</text>
				</view>
			</view> -->
		<!-- </view> -->

		<view class="uni-buttom">
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
					<view :class="isActive==item?'item-add item-content-item ':'item-content-item '"
						@tap="activeCss(item)" v-for="(item,index) in hangyeList">
						{{item}}
					</view>
				</view>
				<view class="item-bot" @tap="beConfirm">
					确定
				</view>
			</view>
		</view>

		<view class="xyTips" v-if="isProm">
			<view class="tips_cont">
				<view class="tips_title">
					审核失败原因
				</view>
				<view v-for="(item,index) in defultL">
					{{index+1+'、'+item.content}}
				</view>

				<view class="tips_bot" @tap='problemGo'>
					确认
				</view>
			</view>


		</view>

		<view class="class-mask" v-if="classType">
			<view class="Box">
				<scroll-view class="left" scroll-y style="height: 100%">
					<view :class="id==index?'on':'none'" @tap="togLi(index,item.id)" v-for="(item ,index) in allList"
						:key=item.id>
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
						<view @tap='queding' class="mask-buttom-confirm">
							确定
						</view>
					</view>

				</view>

			</view>

		</view>

	</view>
</template>

<script>
	import pickRegions from '@/components/pick-regions/pick-regions.vue'
	export default {
		data() {
			return {
				inde: 0,
				xing: ['男', '女', '未知'],
				accountName: '',
				adress: '',
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
				sqrPhone: '',
				legalPhone: '',
				departmentName: '',
				licenseNo: '',
				bankCardNo: '',
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
				checkedList: [],
				lei: '请选择分类',
				nu: '',
				// area: '',
				legalName: '',
				fzrDept: '',
				isProm: false,
				isIcon: false,
				merchantId: '',
				defultL: [],
				defaultRegion: ['山东省', '济南市', '历城区'],
				defaultRegionCode: '370104',
				region: [],
				area: '请选择省/市/区'
			}
		},

		onLoad: function() {
			var _this = this
			this.height = uni.getSystemInfoSync().windowHeight;
			// this.created()
			this.$https({
				url: '/api/shop/appr-info',
				data: {},
				dengl: false,
				method: 'POST',
				success: function(res) {
					if (res.data.data) {
						_this.isIcon = true
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
						_this.sqrPhone = res.data.data.legalPhone
						_this.licenseNo = res.data.data.licenseNo
						_this.fzrDept = res.data.data.fzrDept
						_this.adress = res.data.data.adress
						// _this.lei = res.data.data.cateIdList.length > 0 ? '已选择分类' : '请选择分类'
						_this.t = false
						_this.merchantId = res.data.data.id
					} else {
						this.isIcon = false
					}
				}
			})
			setTimeout(function() {
				_this.nu = 'margin-left:-3300%;transition:210s;'
			})
		},
		methods: {
			back: function() {
				uni.navigateBack({
					delta: 1
				})
			},
			problemGo: function() {
				var _this = this
				if (!this.isProm) {
					this.$https({
						url: '/api/shop/get-shop-audit-list',
						data: {
							merchantId: _this.merchantId
						},
						dengl: false,
						method: 'POST',
						success(res) {
							console.log(res)
							_this.defultL = res.data.data
						}
					})
				}
				this.isProm = !this.isProm
			},
			jiaoyanCode(code) {
				if (/^[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/g.test(code)) {
					return true
				} else {
					return false
				}
			},
			jiaoyanName(name) {
				if (/^[\u2E80-\u9FFF]+$/.test(name)) {
					return true
				} else {
					return false
				}
			},
			handleGetRegion: function(region) {
				var _this = this
				if (this.region) {
					this.area = region[1].name.indexOf('市辖区') == -1 ? region[0].name + '-' + region[1].name + '-' +
						region[2].name : region[0].name + '-' + region[2].name
				}
			},
			dianpu: function() {
				var _this = this
				uni.chooseImage({
					success: res => {
						uni.uploadFile({
							url: _this.webUrl + '/oauth/oss/upload',
							filePath: res.tempFilePaths[0],
							name: 'img',
							success: res => {
								this.storeLogo = JSON.parse(res.data).data.url
							}
						})
					}
				})
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
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
							} else {
								that.checkedList.map(function(ite, ind) {
									if (id == ite) {
										that.checkedList.splice(ind, 1)
									}
								})
							}
						}
					})
					console.log(that.checkedList)
				})
			},

			checkType: function() {
				this.classType = !this.classType
				if (this.classType) {
					uni.setNavigationBarTitle({
						title: '商家入驻（选择主营分类）'
					})
				} else {
					uni.setNavigationBarTitle({
						title: '商家入驻'
					})
				}
			},
			togLi(index, id) {
				this.id = index;
				var _this = this
				// this.rList = this.allList[index].childsList
				this.$https({
					url: '/api/oauth/get-one-child-list',
					data: {
						cateId: id
					},
					dengl: true,
					success: res => {
						_this.rList = res.data.data
					}
				})
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
				var nu = false
				for (var i = 0; i < this.accountName.length; i++) {
					if (this.accountName.charCodeAt(i) > 255) {
						this.nu = true
					}
				}
				if (!this.storeName) {
					uni.showToast({
						title: '请输入店铺名',
						icon: 'none'
					})
					return false
				}
				if (nu) {
					uni.showToast({
						title: '账户名不能包含汉字重新输入',
						icon: 'none'
					})
					return false
				}
				if (!this.legalName) {
					uni.showToast({
						title: '请输入法人姓名',
						icon: 'none'
					})
					return false
				}
				if (!this.jiaoyanName(this.legalName)) {
					uni.showToast({
						title: '姓名不允许出现特殊字符',
						icon: 'none'
					})
					return false
				}
				if (!this.$jiaoyan(this.sqrPhone) || !this.$jiaoyan(this.princPhone)) {
					uni.showToast({
						title: '请输入正确的手机号',
						icon: 'none'
					})
					return false
				}
				if (!this.$jiaoyanEmail(this.email)) {
					uni.showToast({
						title: '请输入正确的邮箱号',
						icon: 'none'
					})
					return false
				}
				if (!this.accountName) {
					uni.showToast({
						title: '请输入账户名',
						icon: 'none'
					})
					return false
				}

				if (!this.licenseNo) {
					uni.showToast({
						title: '请输入营业执照号',
						icon: 'none'
					})
					return false
				}
				if (!this.jiaoyanCode(this.licenseNo)) {
					uni.showToast({
						title: '请输入正确的营业执照号',
						icon: 'none'
					})
					return false
				}
				if (this.area == '请选择省/市/区') {
					uni.showToast({
						title: '请选择省/市/区',
						icon: 'none'
					})
					return false
				}
				if (!this.adress) {
					uni.showToast({
						title: '请输入详细地址',
						icon: 'none'
					})
					return false
				}
				if (!this.principal) {
					uni.showToast({
						title: '请输入负责人姓名',
						icon: 'none'
					})
					return false
				}
				if (!this.jiaoyanName(this.principal)) {
					uni.showToast({
						title: '法人姓名不允许出现特殊字符',
						icon: 'none'
					})
					return false
				}
				if (!this.fzrDept) {
					uni.showToast({
						title: '请输入部门',
						icon: 'none'
					})
					return false
				}
				// if (this.checkedList.length == 0) {
				// 	uni.showToast({
				// 		title: '请选择分类',
				// 		icon: 'none'
				// 	})
				// 	return false
				// }
				var obj = {}
				obj.accountName = this.accountName
				obj.sqrPhone = this.sqrPhone
				obj.storeName = this.storeName
				obj.legalName = this.legalName
				obj.licenseNo = this.licenseNo
				obj.area = this.area
				obj.email = this.email
				obj.principal = this.principal
				obj.princPhone = this.princPhone
				obj.fzrDept = this.fzrDept
				obj.cateIdList = ''
				obj.address = this.adress
				console.log(this.area)
				uni.navigateTo({
					url: './leagueTwo?o=' + JSON.stringify(obj)
				})
			},
			yingyezhizhao: function() {
				var _this = this
				uni.chooseImage({
					success: res => {
						uni.uploadFile({
							url: _this.webUrl + '/oauth/oss/upload',
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
							url: this.webUrl + '/oauth/oss/upload',
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
			shenfenzhengxxx: function() {
				uni.chooseImage({
					success: res => {
						uni.uploadFile({
							url: this.webUrl + '/oauth/oss/upload',
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
								title: res.data.message,
								icon: 'none'
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
			},
			queding: function() {
				this.classType = false
				this.lei = '已选择分类'
			}
		},

	}
</script>

<style lang="scss">
	page {
		background-color: #f7f7f7;
		// padding-bottom: 150upx;
	}

	.xyTips {
		position: fixed;
		z-index: 998;
		// height: 100%;
		width: 100%;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(0, 0, 0, 0.4);
		font-size: 26rpx;

		.tips_title {
			text-align: center;
			font-size: 30rpx;
			margin-bottom: 30rpx;
		}

		.tips_cont {
			position: absolute;
			z-index: 999;
			background: #fff;
			top: 50%;
			transform: translateY(-50%);
			left: 90rpx;
			right: 90rpx;
			border-radius: 20rpx;
			box-sizing: border-box;
			padding: 30rpx 50rpx;

			>view {
				display: block;
				color: #333;
				line-height: 45rpx;

			}

			.tips_bot {
				margin-top: 30rpx;
				text-align: center;
				width: 40%;
				height: 65rpx;
				border-radius: 45rpx;
				line-height: 65rpx;
				height: 65rpx;
				font-size: 26rpx;
				font-size: 26rpx;
				background-color: #1a5fe3;
				color: #fff;
				margin-left: 50%;
				transform: translateX(-50%);


			}
		}
	}



	.top {
		overflow: hidden;
		// border-bottom: 1px solid #e5e5e5;
		height: 90rpx;
		text-align: center;
		position: fixed;
		width: 100%;
		left: 0;
		top: 0;
		z-index: 99999;
		background: #fff;
		padding-top: 70rpx;

		.back {
			width: 90rpx;
			height: 90rpx;
			line-height: 90rpx;
			float: left;

			image {
				width: 18rpx;
				height: 32rpx;
				display: block;
				padding: 29rpx 36rpx;
			}
		}

		.textBox {
			display: inline-block;

			text {
				font-size: 32rpx;
				color: #333;
				float: left;
				line-height: 90upx;
			}
		}


		.imgBox {
			float: right;
			width: 90rpx;
			height: 90rpx;
			line-height: 90rpx;

			image {
				display: inline-block;
				vertical-align: middle;
			}
		}
	}


	.defult {
		// height: 96rpx;
		// line-height: 80rpx;
		padding: 0 30rpx;
		padding-top: 30rpx;
		color: #333333;
		font-size: 28rpx;
		text-align: right;
		width: 100%;
		box-sizing: border-box;
		color: #ee4646;

		image {
			width: 32rpx;
			height: 32rpx;
			display: inline-block;
			vertical-align: middle;
			padding-right: 10rpx;
		}
	}

	.boxScroll {
		width: 100%;
		box-sizing: border-box;
		margin: 0 auto;
		overflow: hidden;
		background: #f7f7f7;
		height: 80rpx;
		line-height: 80rpx;
		margin-top: 160rpx;
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

			view {
				width: 3300%;
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

		.picker {
			overflow: hidden;
		}

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
			width: 420rpx;
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
