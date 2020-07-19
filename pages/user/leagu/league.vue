<template>
	<view>
		<view class='uni-form-item uni-column'>
			<view class='title'><text>期望账户名</text></view>
			<input class='uni-input' v-model='accountName' placeholder='请输入期望账户名仅限字母跟数字' @blur='zhanghu'>
		</view>
		<view class='uni-form-item uni-column'>
			<view class='title'><text>地域</text></view>
			<input class='uni-input' style='color:#666;' v-model='area' placeholder='地域'>
		</view>
		<view class='uni-form-item uni-column'>
			<view class='title'><text>邮箱</text></view>
			<input class='uni-input' v-model='email' placeholder='请输入邮箱'>
		</view>
		<view class='uni-form-item uni-column'>
			<view class='title'><text>法人身份证号</text></view>
			<input class='uni-input' v-model='legalCardId' placeholder='请输入法人身份证号'>
		</view>
		<view class='uni-form-item uni-column'>
			<view class='title'><text>性别</text></view>
			<picker class='uni-input' :value='inde' :range='xing'>{{xing[inde]}}</picker>
		</view>
		<view class="uni-form-item uni-column">
			<view class="title"><text>店铺名称</text></view>
			<input class="uni-input" name="input" v-model='storeName' placeholder="请输入店铺名称" />
		</view>
		<view class="uni-form-item uni-column">
			<view class="title"><text>法人姓名</text></view>
			<input class="uni-input" name="input" v-model='legalName' placeholder="请输入法人姓名" />
		</view>
		<view class="uni-form-item uni-column">
			<view class="title"><text>法人电话</text></view>
			<input class="uni-input" name="input" v-model='legalPhone' placeholder="请输入手机号" />
		</view>
		<view class="uni-form-item uni-column">
			<view class="title"><text>负责人姓名</text></view>
			<input class="uni-input" name="input" v-model='principal' placeholder="请输入负责人姓名" />
		</view>
		<view class="uni-form-item uni-column">
			<view class="title"><text>负责人电话</text></view>
			<input class="uni-input" name="input" v-model='princPhone' placeholder="请输入新手机号" />
		</view>


		<!-- 提示 -->
		<view class="tis">
			<text>提示：上传图像格式为：png，jpg，大小不得大于1M</text>
		</view>

		<view class="uni-form-item uni-column">
			<view class="title"><text>上传店铺logo</text></view>
			<view class="imgBox">
				<image @tap='dianpu' :src="storeLogo" mode=""></image>
			</view>
		</view>
		<view class='uni-form-item uni-column'>
			<view class='title'><text>上传营业执照</text></view>
			<view class='imgBox'>
				<image @tap='yingyezhizhao' :src='license'></image>
			</view>
		</view>
		<view class="uni-form-item uni-column">
			<view class="title"><text>上传法人身份证</text></view>
			<view class="imgBox">
				<image @tap='shenfenzheng' :src="cardImg1" mode=""></image>
			</view>
			<view class="imgBox">
				<image @tap='shenfenzhengx' :src="cardImg2" mode=""></image>
			</view>
		</view>
		<view class="uni-form-item uni-column">
			<view class="title"><text>法人手持身份证</text></view>
			<view class="imgBox">
				<image @tap='shenfenzhengxxx' :src="holdImg" mode=""></image>
			</view>
		</view>

		<view class="uni-padding-wrap uni-common-mt botts" style='background:#fff;width:100%;left:0;bottom:0;overflow:hidden;'>
			<button type="primary" @tap='shangchuan' style='margin-bottom:20rpx;width:710rpx;'>提交</button>
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
				legalCardId: '',
				legalName: '',
				license: '../../../static/img_10.jpg.png',
				mermberId: '',
				princPhone: '',
				principal: '',
				sex: '',
				storeLogo: '../../../static/img_10.jpg.png',
				storeName: '',
				legalPhone: ''
			}
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
				var nu=false
				for(var i=0;i<this.accountName.length;i++){
					if(this.accountName.charCodeAt(i)>255){
						nu=true
					}
				}
				if(nu){
					uni.showToast({
						title:'账户名不能包含汉字重新输入',
						icon:'none'
					})
				}else if (!_this.$jiaoyanEmail(_this.email)) {
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
			zhanghu:function(){
				var nu=0
				for(var i=0;i<this.accountName.length;i++){
					if(this.accountName.charCodeAt(i)>255){
						uni.showToast({
							title:'账户名不能包含汉字重新输入',
							icon:'none'
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
		padding-bottom: 150upx;
	}

	.uni-column {
		margin-bottom: 20upx;
		background-color: #fff;
		overflow: hidden;

		.title {
			float: left;
			padding-left: 20upx;

			text {
				line-height: 90upx;
				font-size: 32upx;
			}
		}

		.uni-input {
			float: left;
			padding-top: 27upx;
			font-size: 28upx;
			padding-left: 20upx;
			font-family: Microsoft YaHei;
		}

		.imgBox {
			float: left;
			padding-top: 30upx;
			padding-left: 20upx;

			image {
				width: 175upx;
				height: 175upx;
			}
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
