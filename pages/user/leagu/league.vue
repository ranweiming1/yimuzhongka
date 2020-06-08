<template>
	<view>
		<view class='uni-form-item uni-column'>
			<view class='title'><text>期望账户名</text></view>
			<input class='uni-input' v-model='accountName' placeholder='请输入期望账户名'>
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
				<image :src='license'></image>
			</view>
		</view>
		<view class="uni-form-item uni-column">
			<view class="title"><text>上传法人身份证</text></view>
			<view class="imgBox">
				<image :src="cardImg1" mode=""></image>
			</view>
			<view class="imgBox">
				<image :src="cardImg2" mode=""></image>
			</view>
		</view>
		<view class="uni-form-item uni-column">
			<view class="title"><text>法人手持身份证</text></view>
			<view class="imgBox">
				<image :src="holdImg" mode=""></image>
			</view>
		</view>

		<view class="uni-padding-wrap uni-common-mt botts">
			<button type="primary">提交</button>
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
				storeName: ''
			}
		},
		methods: {
			dianpu: function() {
				var _this = this
				var na = ''

				function urlTobase64(url) {
					uni.request({
						url: url,
						method: 'GET',
						responseType: 'arraybuffer',
						success: res => {
							let base64 = uni.arrayBufferToBase64(res.data); //把arraybuffer转成base64
							base64 = 'data:image/jpeg;base64,' + base64; //不加上这串字符，在页面无法显示
							na = base64
							uni.uploadFile({
								url: _this.webUrl + '/api/oauth/oss/upload',
								filePath: base64,
								name: 'file',
								formData: {
									'img': 'file'
								},
								success: res => {
									console.log(res)
								}
							})
						}
					});
				}
				uni.chooseImage({
					success: res => {
						// urlTobase64(res.tempFilePaths[0])
						uni.uploadFile({
							url: _this.webUrl + '/api/oauth/oss/upload',
							filePath: res.tempFilePaths[0],
							name: 'file',
							formData: {
								'img': res.tempFilePaths[0]
							},
							header:{
								"Content-Type": "multipart/form-data; boundary=----WebKitFormBoundaryUDNRYWELUKfZd1yr"
							},
							success: res => {
								console.log(res)
							}
						})
					}
				})
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
