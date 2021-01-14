<template>
	<view style='overflow:hidden;width:100%;'>
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
			<!-- <view class="biaot">
				<text>订单信息</text>
			</view> -->
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
				<!-- <view class="radColor">
					<text>{{content.gP?'￥'+content.gP+'.00':'0'}}</text>
				</view> -->

				<!-- 这是数量加减 -->
				<view class="jia">
					<text>x{{content.num}}</text>
				</view>
			</view>
		</view>

		<view class="basic aa" @tap="openPopups(1)">
			<view class="left_a">
				<text>货物状态 <text style="color: #ee3030;font-size: 40rpx;display: inline-block;margin-left: 10rpx;vertical-align: middle;">*</text></text>
			</view>
			<view class="right_a">
				<view class="img_a">
					<image src="../../../static/icon_26.png" mode=""></image>
				</view>
				<text v-model="typeValue">{{typeValue}}</text>
			</view>
		</view>

		<view class="basic aa" @tap="openPopup(2)">
			<view class="left_a">
				<text>退货原因 <text style="color: #ee3030;font-size: 40rpx;display: inline-block;margin-left: 10rpx;vertical-align: middle;">*</text></text>
			</view>
			<view class="right_a">
				<view class="img_a">
					<image src="../../../static/icon_26.png" mode=""></image>
				</view>
				<text v-model="value">{{value}}</text>
			</view>
		</view>

		<view class="reason-list">
			<view class="reason-item">
				<view class="title"><text>退款金额：</text></view>
				<input class="uni-input" style="color: #ff0000;" @blur="inpuBlur(price)" v-model="price" :placeholder="price" />
			</view>

			<view class="reason-item">
				<view class="title"><text style="color: #999999;font-size: 24rpx;">可修改，最多{{content.gP?'￥'+content.gP+'.00':'0'}},含发货邮费￥00.00</text></view>
			</view>
			<view class="reason-item">
				<view class="title">
					<text>退款方式</text>
				</view>
				<view class="right_a">
					<view class="img_a">
						<image src="../../../static/icon_26.png" mode=""></image>
					</view>
				</view>
				<view class="input-text" style="float: right;">

					<text>卖家同意退货后再决定</text>
				</view>
			</view>


		</view>
		<view class="uni-form-item uni-column">
			<view class="title"><text>退货说明和凭证</text></view>
			<view class="reason-items">
				<!-- 				<view class="title"><text>退货说明：</text></view> -->
				<textarea name="input" v-model="exp" placeholder="请补充描述" placeholder-style="line-height:50rpx" />
				</view>
			<view class="imgBox" @tap="chuanImg">
				<image :src="pingImg" mode=""></image>
			</view>
		</view>
		<!-- <view class='g'></view> -->
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
					<radio-group class="li_box" v-for="(i , n) in values" @change="change(n)">
						<text>{{i.label}}</text>
						<label class="radioss">
							<radio color="#007AEE" :value="i" :checked="index==n" />
						</label>
					</radio-group>
				</view>
				<view class="uni-padding-wrap uni-common-mt bottaaa" @tap="confirm()">
					<button type="primary" @tap="confirm()">确定</button>
				</view>
			</view>

		</uni-popup>
		<!-- 退货状态 -->
		<uni-popup ref="popups" type="bottom" class="tanchu">
			<button @click="closePopups">×</button>
			<view class="neira">
				<view class="text_uo">
					<view class="tit_box">
						<text>选择退款原因</text>
					</view>
					<radio-group class="li_box" v-for="(i , n) in typeList" @change="changes(n)">
						<text>{{i.label}}</text>
						<label class="radioss">
							<radio color="#007AEE" :value="i" :checked="shouIndex==n" />
						</label>
					</radio-group>
				</view>
				<view class="uni-padding-wrap uni-common-mt bottaaa" @tap="confirms()">
					<button type="primary" @tap="confirms()">确定</button>
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
				values: [],
				content: {},
				gId: '',
				exp: '',
				pric: '',
				typeValue: '请选择货物状态',
				typeList: [{
						id: 0,
						label:"已收到货"
					},
					{
						id: 1,
						label: "未收到货"
					}
				],
				typeIndex: '',
				shouIndex:'y',
				price:''
			}
		},
		components: {
			uniPopup
		},
		onLoad(option) {
			console.log(option)
			this.content = option
			this.price=option.gP
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
		//退款原因
		// this.$https({
		// 	url: '/api/oauth/get-refund-reason-list',
		// 	data: {status:this.shouIndex?this.shouIndex:'0'},
		// 	method: 'post',
		// 	success: res => {
		// 		this.values = res.data.data
		// 	}
		// })
		},
		methods: {
			primary() {
				// if (!_this.value)
				// console.log(this.content.gP,this.price,this.price>this.content.gP)
				var _this = this
				var num = this.content.type == 1 ? 1 : 0
				if (_this.value == "请选择退款原因") {
					console.log(2222)
					uni.showToast({
						title: '请选择退款原因',
						icon: 'none'
					})
				}else if(!_this.price){
					uni.showToast({
						title: '请输入退款金额',
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
							proofImg: _this.pingImg=='../../../static/img_10.jpg.png'?'':_this.pingImg,
							refundCaption: _this.exp,
							refundFee: _this.price,
							refundDesc: _this.value,
							refundMethod: num,
							status:_this.shouIndex
						}),
						success(res) {
							if(res.data.code==0){
								uni.showToast({
									title: '提交成功',
									icon: 'none'
								})
								setTimeout(function(){
									uni.navigateBack({
										delta:3
									})
								},2000)
								
							}else{
								uni.showToast({
									title: '提交失败',
									icon: 'none'
								})
							}
						
							// console.log(_this.pingImg)
						}
					})
				}
			},
			inpuBlur(val){
				if (val > this.content.gP){
					console.log(9999)
					uni.showToast({
						title: '退款金额不能大于金额',
						icon: 'none'
					})
				}
			},
			confirm() {
				this.value = this.values[this.index].label
				this.closePopup()
			},
			
			confirms() {
				var that=this
					this.typeValue = this.typeList[this.shouIndex].label
					//退款原因
					this.$https({
						url: '/api/oauth/get-refund-reason-list',
						data: {status:this.shouIndex},
						method: 'post',
						success: res => {
							this.values = res.data.data
						}
					})
				this.closePopups()
			},
			change(n) {			
				this.index = n
				// console.log(this.index)
			},
			changes(n) {
					this.shouIndex=n
				// console.log(this.index)
			},
			openPopup(index) {
				if(this.shouIndex=='y'){
					return
				}else{
				this.$refs.popup.open()
				this.typeIndex = index}
			},
			openPopups(index) {
				this.$refs.popups.open()
				this.typeIndex = index
			},
			closePopup() {

					
				this.$refs.popup.close()
			},
			closePopups() {
				this.$refs.popups.close()
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
		background-color: #f5f5f4;
	}
	.g{
		height:100rpx;
	}
	.reason-items{
		width: 100%;
		textarea{
		width: 100%;
			box-sizing: border-box;
			padding: 25rpx;
			font-size: 28rpx;
			color: #333;
			line-height: 50rpx;
			min-height:100rpx;
			height:150rpx;
			color: #333;
		}
		textarea::-webkit-input-placeholder {
		      line-height: 50rpx;
		   }
		   textarea:-moz-placeholder {
		      line-height: 50rpx;
		   }
	}
	.reason-item {
			overflow: hidden;
			height: 83rpx;
			line-height: 83rpx;
			font-size: 28rpx;
			color: #333;
			width: 100%;
			
			.title {
				float: left;
			}

			input {
				height: 100%;
				line-height: 100%;
				float: left;
				text-align: left;
				color: #ff0336;
			}

			.img_a {
				float: right;
				padding-left: 30rpx;
				// padding-top: 10rpx;
				vertical-align: middle;

				image {
					width: 14rpx;
					height: 24rpx;
					display: inline-block;
					vertical-align: middle;
				}

			}

		}

	.reason-list {
		background-color: #fff;
		padding-left: 25rpx;
		padding-right: 20rpx;
		overflow: hidden;
		margin-bottom: 20rpx;

			}

	.xinxi {
		margin-bottom: 20upx;
		background-color: #fff;
		overflow: hidden;
		// width: 710upx;
		padding: 27upx 30rpx;
		border-top: 1px solid #e5e5e5;

		.imgBox_a {
			float: left;
			// padding-top: 20upx;

			image {
				width: 215upx;
				height: 160upx;
				display: block;
			}
		}

		.txt_c {
			float: left;
			width: calc(100% - 215rpx);
			padding-left: 20upx;
			box-sizing: border-box;

			.title {
				padding-top: 10upx;
				color: #0c0c0c;
				font-size: 26rpx;
				margin-bottom: 15rpx;

				text {
					font-size: 30upx;
					line-height: 34upx;
					color: #333;
				}
			}

			.spec {
				font-size: 24upx;
				color: #999999;

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


				text {
					font-size: 20upx;
					color: #0c0c0c;
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
		width: 100%;
		background-color: #fff;
		overflow: hidden;
		padding: 30rpx 20rpx 0 25rpx;
		border-bottom: 1rpx solid #fdfdfc;
		height: 135rpx;
		border-top: 1rpx solid #fdfdfc;
		font-size: 29rpx;
		margin-bottom: 20rpx;
		box-sizing: border-box;

		.left_a {
			float: left;

			text {
				font-size: 28rpx;
				color: #333;
				// line-height: 50upx;
			}
		}

		.right_a {
			float: right;
			padding-right: 10upx;

			text {
				font-size: 28upx;
				float: right;
				// line-height: 50upx;
				color: #949494;

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
				padding-left: 30rpx;
				padding-top: 10rpx;

				image {
					width: 14rpx;
					height: 24rpx;
					display: block;
				}

			}
		}
	}

	.uni-column {
		background-color: #fff;
		overflow: hidden;
		border-bottom: 20upx solid #f7f7f7;
		margin-bottom: 150rpx;

		.title {
			padding-left: 25upx;
			padding-top: 25rpx;

			text {
				// line-height: 90upx;
				color: #333;
				font-size: 28upx;
			}
		}

		.uni-input {
			padding-top: 27upx;
			font-size: 28upx;
			color: #ff0000;
			padding-left: 20upx;
			font-family: Microsoft YaHei;
		}

		.imgBox {
			float: left;
			padding: 25rpx 25rpx 40rpx 25rpx;

			image {
				width: 175upx;
				height: 175upx;
				display: block;
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
			background-color: #2b5cff;
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
