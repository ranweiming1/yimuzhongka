<template>
	<view>

		<view class="await">
			<text>卖家同意退货</text>
		</view>

		<!-- 订单信息 -->
		<view class="xinxi">
			<view class="imgBox_a">
				<image :src="baseCont.goodsImg" mode=""></image>
			</view>
			<view class="txt_c">
				<view class="title">
					<text>{{baseCont.goodsName}}</text>
				</view>
				<view class="spec">
					<text>已选：＂{{baseCont.specValue}}＂</text>
				</view>
				<!-- 这是数量加减 -->
				<view class="jia">
					<text>x{{baseCont.buyNum}}</text>
				</view>
			</view>
		</view>
		<!-- 填充默认地址，若无，参考订单状态添加地址样式 -->
		<view class="siteBox">
			<view class="content">
				<view class="biaot">
					<text>退货信息</text>
				</view>

				<view class="p" v-if="baseCont.storeAddr">
					<text selectable="true">收货地址：{{baseCont.storeAddr}}</text>
				</view>
				<view class="nome">
					<text selectable="true">收件人：{{baseCont.storeName}}</text>
				</view>
				<view class="call">
					<text selectable="true">手机号：{{baseCont.storePhone}}</text>
				</view>
			</view>

		</view>
		<view class="basic-list">
			<view class="basic aa">
				<view class="left_a">
					<text>输入物流公司</text>
				</view>
				<view class="right_a" v-if="!isXiugai">
					<view class="img_a">
						<image src="../../../static/icon_26.png" mode=""></image>
					</view>
				</view>
				<view class="right_input">
					<input type="text" v-model="comName" :disabled="isXiugai" placeholder="请输入物流公司" />
				</view>
			</view>
			<view class="basic aa">
				<view class="left_a">
					<text>填写物流单号</text>
				</view>

				<view class="right_a" v-if="!isXiugai">
					<view class="img_a">
						<image src="../../../static/icon_26.png" mode=""></image>
					</view>
				</view>
				<view class="right_input">
					<input type="text" :disabled="isXiugai" v-model="comCode" placeholder="请输入物流单号" />
				</view>
			</view>
		</view>
		<view class="submit-bot" v-if="!isXiugai">
			<view class="bottom-bott" @tap="submit">
				提交
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				baseCont: {},
				comCode: '',
				comName: '',
				id: '',
				isXiugai:false
			}
		},
		onLoad(option) {
			console.log(option)
			this.id = option.id
			var that = this
			this.$https({
				url: '/api/shop/order-refund-detail',
				dengl: false,
				data: {
					refundId: option.id
				},
				method: 'post',
				success(res) {
					that.baseCont = res.data.data
					if(res.data.data.logisticsName&&res.data.data.logisticsName!=null){
						that.comCode=res.data.data.logisticsCode
						that.comName=res.data.data.logisticsName
						that.isXiugai=true
					}
				}
			})

		},
		methods: {
			submit: function() {
				if (!this.comName) {
					uni.showToast({
						title: '请输入物流公司',
						icon:'none'
					})
				} 
				
				// else if (!this.checkCode(this.comCode)) {
				// 	uni.showToast({
				// 		title: '请输入正确的物流单号',
				// 		icon: 'none'
				// 	})
				// }
				else {
					this.$https({
						url: '/api/shop/order-refund-logistics',
						dengl: false,
						data: {
							refundId: this.id,
							logisticsCode: this.comCode,
							logisticsName: this.comName
						},
						method: 'post',
						success(res) {
							console.log(res)
							if (res.data.code == 0) {
								uni.showToast({
									title: '提交成功'
								})
								uni.navigateBack({

								})
							} else {
								uni.showToast({
									title: '提交失败',
									icon: 'none'
								})
							}
						}
					})
				}
			},
			checkCode(code) {
				
				// if (this.comName.indexOf('顺丰') == 0) {
				// 	if (/^[A-Za-z0-9-]{4,35}$/.test(code)) {
				// 		return true
				// 	} else {
				// 		return false
				// 	}
				// }
				// if (this.comName.indexOf('圆通') == 0) {
				// 	if (/^[A-Za-z0-9]{2}[0-9]{10}$|^[A-Za-z0-9]{2}[0-9]{8}$|^[6-9][0-9]{17}$|^[DD]{2}[8-9][0-9]{15}$|^[Y][0-9]{12}$/.test(
				// 			code)) {
				// 		return true
				// 	} else {
				// 		return false
				// 	}
				// }
				// if (this.comName.indexOf('申通') == 0) {
				// 	if (
				// 		/^(268|888|588|688|368|468|568|668|768|868|968)[0-9]{9}$|^(11|22|40|268|888|588|688|368|468|568|668|768|868|968)[0-9]{10}$|^(STO)[0-9]{10}$|^(33)[0-9]{11}$|^(4)[0-9]{12}$|^(55)[0-9]{11}$|^(66)[0-9]{11}$|^(77)[0-9]{11}$|^(88)[0-9]{11}$|^(99)[0-9]{11}$/
				// 		.test(code)) {
				// 		return true
				// 	} else {
				// 		return false
				// 	}
				// }
				// if (this.comName.indexOf('韵达') == 0) {
				// 	if (/^(10|11|12|13|14|15|16|17|19|18|50|55|58|80|88|66|31|77|39)[0-9]{11}$|^[0-9]{13}$/.test(code)) {
				// 		return true
				// 	} else {
				// 		return false
				// 	}
				// }
				// if (this.comName.indexOf('中通') == 0) {
				// 	if (
				// 		/^((010|768|765|778|779|719|828|618|680|518|688|880|660|805|988|628|205|717|718|728|738|761|762|763|701|757|751|359|358|100|200|118|128|689|738|528|852)[0-9]{9})$|^((5711|2008|2009|2010|2013)[0-9]{8})$|^((91|92|93|94|95|98|36|68|39|50|53|37)[0-9]{10})$|^(4)[0-9]{11}$|^(90)[0-9]{10}$|^(120)[0-9]{9}$|^(780)[0-9]{9}$|^(881)[0-9]{9}$|^(882|885)[0-9]{9}$|^(54|55|56)[0-9]{10}$|^(960)[0-9]{9}$|^(665|666)[0-9]{9}$|^(63)[0-9]{10}$|^(64)[0-9]{10}$|^(72)[0-9]{10}$|^2[1-9][0-9]{10}$/
				// 		.test(code)) {
				// 		return true
				// 	} else {
				// 		return false
				// 	}
				// }
				// if (this.comName.indexOf('百世') == 0) {
				// 	if (
				// 		/^((A|B|D|E)[0-9]{12})$|^(BXA[0-9]{10})$|^(K8[0-9]{11})$|^(02[0-9]{11})$|^(000[0-9]{10})$|^(C0000[0-9]{8})$|^((21|22|23|24|25|26|27|28|29|30|31|32|33|34|35|36|37|38|39|61|63)[0-9]{10})$|^((50|51)[0-9]{12})$|^7[0-9]{13}$|^6[0-9]{13}$|^58[0-9]{14}$/
				// 		.test(code)) {
				// 		return true
				// 	} else {
				// 		return false
				// 	}
				// }
				// if (this.comName.indexOf('邮政') == 0) {
				// 	if (
				// 		/^([GA]|[KQ]|[PH]){2}[0-9]{9}([2-5][0-9]|[1][1-9]|[6][0-5])$|^[99]{2}[0-9]{11}$|^[96]{2}[0-9]{11}$|^[98]{2}[0-9]{11}$/
				// 		.test(code)) {
				// 		return true
				// 	} else {
				// 		return false
				// 	}
				// }
				// if (this.comName.indexOf('天天') == 0) {
				// 	if (/(66|77|88|(5(5|6|8)))\d{10}|(99(5|8))\d{9}|TT(66|88|99|(5(6|7)))\d{11}/.test(code)) {
				// 		return true
				// 	} else {
				// 		return false
				// 	}
				// }
				// if (this.comName.indexOf('德邦') == 0) {
				// 	if (/^[0-9]{8,10}$|^\d{15,}[-\d]+$\d{11}/.test(code)) {
				// 		return true
				// 	} else {
				// 		return false
				// 	}
				// }
				
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f5f5f4;
	}
	
	.submit-bot {
		position: fixed;
		bottom: 0;
		background: #fff;
		width: 100%;

		.bottom-bott {
			height: 90rpx;
			line-height: 90rpx;
			background: #2b5cff;
			color: #fff;
			text-align: center;
			margin: 40rpx 65rpx;
			margin-top: 20rpx;
			border-radius: 45rpx;
			font-size: 30rpx;
		}

	}

	.await {
		background-color: #fff;
		width: 100%;
		padding: 0 30upx;
		margin-bottom: 20rpx;
		height: 90rpx;
		line-height: 90rpx;
		box-sizing: border-box;
		border-top: 1px solid #e5e5e5;

		text {
			font-size: 30rpx;
			color: #333;
		}
	}

	.xinxi {
		margin-bottom: 20rpx;
		background-color: #fff;
		overflow: hidden;
		width: 100%;
		padding: 30rpx;
		box-sizing: border-box;

		.imgBox_a {
			float: left;

			image {
				width: 215rpx;
				height: 160upx;
				display: block;
			}
		}

		.txt_c {
			float: left;
			width: calc(100% - 215rpx);
			padding-left: 20rpx;
			box-sizing: border-box;

			.title {
				margin-bottom: 20rpx;

				text {
					font-size: 30upx;
					line-height: 30upx;
					color: #333;
				}
			}

			.spec {
				font-size: 26upx;
				color: #999999;
				width: 95%;
				float: left;

				text {
					line-height: 30rpx;
				}
			}

			.radColor {
				float: left;
				color: #ff0000;
				font-size: 32upx;
			}

			.jia {
				float: right;
				width: 5%;
				box-sizing: border-box;
				padding-left: 10rpx;

				text {
					font-size: 26upx;
					color: #333;
				}
			}
		}
	}

	.siteBox {
		width: 100%;
		height: initial;
	padding: 28rpx 30upx;
		background-color: #fff;
		overflow: hidden;
		margin-bottom: 20rpx;
		box-sizing: border-box;

		.content {
			float: left;
			width: 100%;

			.biaot {
				padding-bottom: 20rpx;
			


				text {
					font-size: 30rpx;
				}
			}

			.nome {
				float: left;
				font-size: 26upx;
				color: #333;
				padding-right: 10upx;
				line-height: 45rpx;
				margin-bottom: 10rpx;
			}

			.call {
				float: right;
				font-size: 26upx;
				color: #333;
				line-height: 45rpx;
				padding-right: 10upx;
			}

			.p {
				// float: left;
				font-size: 26upx;
				color: #333;
				line-height: 45rpx;
			}
		}
	}

	.basic:last-child {
		border: none;
	}

	

	.basic {
		width: 100%;
		background-color: #fff;
		overflow: hidden;
		padding: 0 30rpx;
		border-bottom: 1px solid #e5e5e5;
		height: 100rpx;
		line-height: 100rpx;
		box-sizing: border-box;

		.left_a {
			float: left;

			text {
				font-size: 28upx;
				color: #333;
			}
		}

		.right_input {
			float: right;
			height: 100%;

			input {
				height: 100%;
				line-height: 100%;
				font-size: 28rpx;
				color: #999999;
				text-align: right;
			}
		}

		.right_a {
			float: right;
			padding-right: 10upx;
			margin-left: 15rpx;

			text {
				font-size: 28upx;
				float: right;

				text {
					color: #ff670c;
				}
			}

			.img_l {
				float: left;
				padding-right: 10upx;
				padding-top: 5upx;

				image {
					width: 45upx;
					height: 45upx;
				}

			}

			.img_a {
				float: right;

				image {
					width: 12upx;
					height: 19upx;
					display: inline-block;
					vertical-align: middle;
				}

			}
		}
	}
</style>
