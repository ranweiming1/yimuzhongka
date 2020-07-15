<template>
	<view>
		<!-- <view class="one_line">
		</view> -->

		<!-- <view class="radios">
			<text>订单编号：{{orList.orderSn}}</text>
			<view class="guanb">
				<text>{{orList.addTime}}</text>
			</view>
		</view> -->
		<!-- 订单信息 -->
		<view class="xinxi">
			<view class="biaot">
				<text>订单信息</text>
			</view>
			<view class="imgBox_a">
				<image :src="content.lG" mode=""></image>
			</view>
			<view class="txt_c">
				<view class="title">
					<text>{{content.gN}}</text>
				</view>
				<view class="spec">
					<text>已选：＂{{content.sKN}}＂</text>
				</view>
				<view class="radColor">
					<text>{{content.gP?'￥'+content.gP+'.00':'0'}}</text>
				</view>

				<!-- 这是数量加减 -->
				<view class="jia">
					<text>X{{content.num}}</text>
				</view>
			</view>
		</view>

		<view class="basic aa" @tap="openPopup">
			<view class="left_a">
				<text>退货原因</text>
			</view>
			<view class="right_a">
				<view class="img_a">
					<image src="../../../static/icon_26.png" mode=""></image>
				</view>
				<text v-model="value">{{value}}</text>
			</view>
		</view>
		<view class="uni-form-item uni-column">
			<view class="title"><text>退款金额</text></view>
			<input class="uni-input" disabled="true" name="input" :placeholder="content.gP?'￥'+content.gP+'.00':'0'" />
		</view>
		<view class="basic aa">
			<view class="left_a">
				<text>退款方式</text>
			</view>
			<view class="right_a">
				<view class="img_a">
					<image src="../../../static/icon_26.png" mode=""></image>
				</view>
			</view>
			<view class="" style="float: left;">

				<text style="line-height: 50rpx;font-size: 28rpx;color:#808080;">卖家同意后，请您自行寄回，并填写物流单号</text>
			</view>
		</view>
		<view class="uni-form-item uni-column">
			<view class="title"><text>退货说明</text></view>
			<input class="uni-input" name="input" v-model="exp" placeholder="选填" />
		</view>

		<view class="uni-form-item uni-column">
			<view class="title"><text>上传凭证</text></view>
			<view class="imgBox" @tap="chuanImg">
				<image :src="pingImg" mode=""></image>
			</view>
		</view>
		<view class="uni-padding-wrap uni-common-mt botts" @tap="primary">
			<button type="primary">提交</button>
		</view>
		<!-- 弹出框内容 -->
		<uni-popup ref="popup" type="bottom" class="tanchu">
			<button @click="closePopup">×</button>
			<view class="neira">
				<view class="text_uo">
					<view class="tit_box">
						<text>选择退款原因</text>
					</view>
					<radio-group class="li_box" v-for="(i , n) in 5" @change="change(n)">
						<text v-model="values">{{values}}</text>
						<label class="radioss">
							<radio :value="i" :checked="index==n" />
						</label>
					</radio-group>
				</view>
				<view class="uni-padding-wrap uni-common-mt bottaaa" @tap="confirm">
					<button type="primary" @tap="confirm">确定</button>
				</view>
			</view>

		</uni-popup>

	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default {
		data() {
			return {
				pingImg: '../../../static/img_10.jpg.png',
				orList: [],
				value: '请选择退款原因',
				index: 'c',
				values: '质量问题',
				content: {},
				gId: '',
				exp: '',
				pric: '',
			}
		},
		components: {
			uniPopup
		},
		onLoad(option) {
			console.log(option)
			this.content = option
			var _this = this
			this.$https({
				url: '/api/user/order-detail',
				dengl: false,
				data: {
					order_id: option.orderId
				},
				success(res) {
					// console.log(res.data.data)
					_this.orList = res.data.data
					// console.log(_this.orList)
					_this.gId = res.data.data.goodsList[0].goodsId
				}
			})
		},
		methods: {
			primary() {
				// if (!_this.value)
				var _this = this
				var num = this.content.type==1?1:0
				console.log(num)
				if(!_this.value){
					console.log(2222)
					uni.showToast({
						title: '请选择退款原因',
						icon: 'none'
					})
				}else{
				this.$https({
					url: '/api/shop/order-refund-info-add',
					dengl: false,
					method: 'post',
					haeder: true,
					data: JSON.stringify({
						goodsId: _this.gId,
						orderNo: _this.content.oS,
						proofImg: _this.pingImg,
						refundCaption: _this.exp,
						refundFee: _this.content.gP,
						refundDesc: _this.value,
						refundMethod:num
					}),
					success(res) {
						
						// console.log(_this.pingImg)
					}
				})
				}
			},
			confirm() {
				// console.log(this.values)
				// console.log(this.pric)
				this.value = this.values
				this.closePopup()
			},
			change(n) {
				this.index = n
				// console.log(this.index)
			},
			openPopup() {
				this.$refs.popup.open()
			},
			closePopup() {
				this.$refs.popup.close()
			},
			chuanImg() {
				uni.chooseImage({
					success: res => {
						uni.uploadFile({
							url: this.webUrl + '/api/oauth/oss/upload',
							filePath: res.tempFilePaths[0],
							name: 'img',
							success: res => {
								this.pingImg = JSON.parse(res.data).data.url
							}
						})
					}
				})
			},

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f7f7f7;
	}

	.xinxi {
		margin-bottom: 20upx;
		background-color: #fff;
		overflow: hidden;
		width: 710upx;
		padding: 20upx;
		border-bottom: 1px dotted #ccc;

		.imgBox_a {
			float: left;
			padding-top: 20upx;

			image {
				width: 215upx;
				height: 160upx;
			}
		}

		.txt_c {
			float: left;
			width: 460upx;
			padding-left: 20upx;

			.title {
				padding-top: 10upx;

				text {
					font-size: 30upx;
					line-height: 30upx;
					color: #333;
				}
			}

			.spec {
				font-size: 26upx;
				line-height: 40upx;
				color: #666;
			}

			.radColor {
				float: left;
				color: #ff0000;
				font-size: 32upx;
			}

			.jia {
				float: right;

				text {
					font-size: 20upx;
					color: #666;
				}
			}
		}
	}

	.radios {
		background-color: #fff;
		width: 710upx;
		padding: 20upx;
		overflow: hidden;
		padding-top: 10upx;
		overflow: hidden;
		border-bottom: 1px solid #f7f7f7;

		text {
			font-size: 28upx;
			color: #333;
			line-height: 40upx;
			padding-right: 10upx;
		}

		image {
			width: 12upx;
			height: 26upx;
		}

		.guanb {
			float: right;

			text {
				font-size: 28upx;
				color: #999;
			}
		}
	}

	.basic {
		width: 710upx;
		background-color: #fff;
		overflow: hidden;
		padding: 20upx;
		padding-bottom: 10upx;
		border-bottom: 20upx solid #f7f7f7;

		.left_a {
			float: left;

			text {
				font-size: 28upx;
				color: #333;
				line-height: 50upx;
			}
		}

		.right_a {
			float: right;
			padding-right: 10upx;

			text {
				font-size: 28upx;
				float: right;
				line-height: 50upx;

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
				padding: 20upx 0upx 20upx 20upx;

				image {
					width: 12upx;
					height: 14upx;
					display: block;
				}

			}
		}
	}

	.uni-column {
		background-color: #fff;
		overflow: hidden;
		border-bottom: 20upx solid #f7f7f7;

		.title {
			float: left;
			padding-left: 20upx;

			text {
				line-height: 90upx;
				font-size: 28upx;
			}
		}

		.uni-input {
			float: left;
			padding-top: 27upx;
			font-size: 28upx;
			color: #ff0000;
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

	.tanchu {
		button {
			position: absolute;
			top: 10upx;
			right: 10upx;
			z-index: 9999;
			background: none !important;
			border: none !important;
		}

		button:after {
			border: none !important;
		}
	}

	.neira {
		width: 695upx;
		height: 650upx;
		background-color: #fff;
		border-radius: 20upx 20upx 0 0;
		position: relative;
		padding: 30upx;
		overflow: hidden;
	}

	.bottaaa {
		width: 670upx;
		height: 80upx;
		background-color: #007AEE;
		text-align: center;
		position: fixed;
		bottom: 40upx;
		border-radius: 40upx !important;
		left: 40upx;

		button {
			position: initial;
			border-radius: 40upx !important;
			font-family: Microsoft YaHei;
		}

	}

	.radios {
		float: left;
		padding-top: 30upx;
		padding-right: 10upx;
	}

	.text_uo {

		.tit_box {
			text-align: center;
			width: 700upx;
			height: 80upx;
			border-bottom: 1px solid #ccc;

			text {
				font-size: 38upx;
				color: #333;
				line-height: 50upx;
			}
		}

		.li_box {
			overflow: hidden;
			width: 700upx;
			border-bottom: 1px dotted #ccc;

			text {
				float: left;
				font-size: 28upx;
				color: #333;
				line-height: 80upx;
			}

			.radioss {
				float: right;
				padding-top: 15upx;
			}
		}
	}
</style>
