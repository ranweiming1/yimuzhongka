<template>
	<view>
		<!-- <view class="one_line">
		</view> -->
		<view class="await">
			<text>{{t?'待付款':deList.shippingStatus==0?'未发货':deList.shippingStatus==1?'已发货':deList.shippingStatus==2?'退货中':'退货完成'}}</text>
		</view>

		<!-- 揽件信息 -->
		<view class="collect" v-if="deList.shippingStatus!=0">
			<view class="collimg">
				<image src="../../../static/icon_44.png" mode=""></image>
			</view>
			<view class="colltext">
				<view class="collh2">
					<text>您的订单已经由{{deList.shippingName}}快递揽件</text>
				</view>
				<view class="collspan">
					<text>2019-05-06 15:25 25</text>
				</view>
			</view>
			<view class="collenter">
				<image src="../../../static/icon_26.png" mode=""></image>
			</view>
		</view>

		<!-- 填充默认地址，若无，参考订单状态添加地址样式 -->
		<view class="siteBox">
			<view class="content">
				<view class="nome">
					<text>{{deList.consignee}}</text>
				</view>
				<view class="call">
					<text>{{deList.mobile}}</text>
				</view>
				<!-- 默认地址标签样式 -->
				<view class="label">
					<text>默认</text>
				</view>
			</view>
			<view class="p">
				<text>{{deList.address}}</text>
			</view>

			<!-- <view class="imgBox">
				<!-- <image src="../../../static/icon_26.png" mode=""></image> -->
			<!-- </view> -->
		</view>

		<view class="radios">
			<text>订单编号：<text selectable="true">{{deList.orderSn}}</text></text>
			<view class="guanb">
				<text>{{deList.addTime}}</text>
			</view>
		</view>
		<!-- 订单信息 -->
		<view class="xinxi" v-for="(item,index) in deList.goodsList">
			<view class="biaot">
				<text>订单信息</text>
			</view>
			<view class="xinXi" v-for="(ite,inde) in deList.goodsList[0].specList">


				<view class="imgBox_a" @tap='g(item.goodsId)'>
					<image :src="item.goodsLogo" mode=""></image>
				</view>
				<view class="txt_c" @tap='g(item.goodsId)'>
					<view class="title">
						<text>{{item.goodsName}}</text>
					</view>
					<view class="spec">
						<text>已选：＂{{ite.specKeyName}}＂</text>
					</view>
					<view class="radColor">
						<text>{{ite.goodsPrice?'￥'+ite.goodsPrice+'.00':'0'}}</text>
					</view>

					<!-- 这是数量加减 -->
					<view class="jia">
						<text>X{{item.goodsNum}}</text>
					</view>
				</view>
				<view class="uni-padding-wrap uni-common-mt bott" @tap="afterSole(deList.orderSn,item.goodsLogo,item.goodsName,ite.goodsPrice,ite.specKeyName,ite.goodsNum,deList.orderId)"
				 v-if='s'>
					<button type="primary">申请售后</button>
				</view>
			</view>

		</view>
		<view class="basic">
			<view class="left_a">
				<text>运费</text>
			</view>
			<view class="right_a">
				<text>{{kuaidi?'￥'+kuaidi:'0'}}</text>
			</view>
		</view>
		<view class="uni-form-item uni-column">
			<view class="title"><text>给卖家备注</text></view>
			<view class="titleTwo"><text>{{deList.userNote}}</text></view>
		</view>


		<view class="basic">
			<view class="left_a">
				<text>优惠券</text>
			</view>
			<view class="right_a">
				<text>已抵扣<text style="padding-left: 5rpx;">{{deList.couponPrice?'￥'+deList.couponPrice.toFixed(2):'0'}}</text></text>
			</view>
		</view>

		<view class="basic">
			<view class="left_a">
				<text>支付方式</text>
			</view>
			<view class="right_a">
				<view class="img_l">
					<image src="../../../static/wx.png" mode=""></image>
				</view>
				<text>微信安全支付</text>
			</view>
		</view>

		<view class="basic aa">
			<view class="left_a">
				<text>商品金额</text>
			</view>
			<view class="right_a">
				<text>{{deList.orderAmount?'￥'+deList.orderAmount+'.00':'0'}}</text>
			</view>
		</view>
		<view class="basic aa">
			<view class="left_a">
				<text>优惠券减免</text>
			</view>
			<view class="right_a">
				<text>{{deList.couponPrice?'-￥'+deList.couponPrice:0}}</text>
			</view>
		</view>
		<view class="basic aa ssa">
			<view class="left_a">
				<text>运费</text>
			</view>
			<view class="right_a">
				<text>{{kuaidi?'￥'+kuaidi:'0'}}</text>
			</view>
		</view>
		<view style='height:150rpx;'></view>
		<!-- 底部 -->
		<view class="bottom">
			<view class="leftA">
				<view class="kefua">
					<!-- <image src="../../../static/icon_36.png" mode=""></image>
					<view class="keyboard">
						<text>客服</text>
					</view> -->

				</view>

			</view>
			<view class="rightA">
				<view class="bottBox">
					<view class="uni-padding-wrap uni-common-mt bott onna">
						<button type="primary" @tap='wuliu' v-if='!t'>查看物流</button>
						<button type='primary' @tap='zhifu' v-if='t'>去支付</button>
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
				deList: {},
				code: '',
				order: '',
				com: '',
				dz: '',
				kuaidi: '',
				t: false,
				s: true
			}
		},
		onLoad(option) {
			var _this = this
			this.$https({
				url: '/api/user/order-detail',
				data: {
					order_id: option.orderId
				},
				dengl: false,
				success: function(res) {
					_this.deList = res.data.data
					console.log(res.data.data.userNote)
					_this.order = res.data.data.orderSn
					_this.com = res.data.data.shippingName
					_this.dz = res.data.data.cityInfo
					_this.kuaidi = res.data.data.goodsList[0].specList[0].kuaidi
					_this.code = res.data.data.shippingCode
					console.log(res.data.data)
					// _this.code=res.data.data.shippingCode
					console.log(res.data.data.shippingCode)
				}
			})
			if (option.zhuangtai == 0) {
				this.t = true
				this.s = false
			}
		},
		methods: {
			wuliu() {
				// console.log('222')
				uni.navigateTo({
					url: './deliver?code=' + this.code + '&order=' + this.order + '&com=' + this.com + '&dz=' + this.dz + '&goods=' +
						JSON.stringify(this.deList.goodsList)
				})
			},
			afterSole(oS, lG, gN, gP, sKN, Num, orderId) {
				// console.log(22222)
				uni.navigateTo({
					url: "./deliver_01?oS=" + oS + '&lG=' + lG + '&gN=' + gN + '&gP=' + gP + '&sKN=' + sKN + '&time=' + this.deList.addTime +
						'&num=' + Num + '&orderId=' + orderId
				})
			},
			g: function(id) {
				uni.navigateTo({
					url: '../../index/productDetails?id=' + id
				})
			},
			zhifu: function() {
				console.log(838382, '支付')
				this.$https({
					url: '/api/pay/unifiedOrder',
					data: JSON.stringify({
						orderNo: this.deList.orderSn,
						payMethod: 1
					}),
					method: 'post',
					haeder: true,
					success: res => {
						var obj = {};
						obj.appid = res.data.data.appId;
						obj.partnerid = res.data.data.partnerId;
						obj.prepayid = res.data.data.prepayId;
						obj.package = res.data.data.packageValue;
						obj.noncestr = res.data.data.nonceStr;
						obj.timestamp = res.data.data.timeStamp;
						obj.sign = res.data.data.sign;
						uni.requestPayment({
							provider: 'wxpay',
							orderInfo: obj,
							success: res => {
								console.log(res)
								this.t = false
							},
							fail(fait) {
								console.log(fait)
							}
						})
					}
				})
			}
		},
	}
</script>

<style lang="scss">
	.tis {
		background-color: #f9e1c1;
		text-align: center;

		text {
			font-size: 24upx;
			color: #ff0000;
			line-height: 60upx;
		}
	}

	.await {
		width: 710upx;
		padding: 20upx;
		border-bottom: 20upx solid #f7f7f7;

		text {
			font-size: 28upx;
			line-height: 30upx;
			color: #333;
		}
	}

	.siteBox {
		width: 710upx;
		padding: 20upx;
		background-color: #fff;
		overflow: hidden;
		border-bottom: 1px solid #e5e5e5;

		.content {
			float: left;
			width: 100%;

			.nome {
				float: left;
				font-size: 29upx;
				color: #333;
				padding-right: 10upx;
			}

			.call {
				float: left;
				font-size: 24upx;
				color: #989898;
				line-height: 47upx;
				padding-right: 10upx;
			}

			.label {
				float: left;
				font-size: 18upx;
				color: #ff6633;
				padding: 5upx;
				margin-top: 5upx;
				background-color: #fdf1ec;
			}


		}

		.p {
			float: left;
			font-size: 25upx;
			color: #333;
			line-height: 47upx;
			display: block;
		}

	}

	.radios {
		width: 710upx;
		padding: 20upx;
		overflow: hidden;
		padding-top: 10upx;
		overflow: hidden;
		border-bottom: 1px solid #e5e5e5;

		text {
			font-size: 27upx;
			color: #333;
			line-height: 40upx;
			padding-right: 10upx;
		}

		image {
			width: 12upx;
			height: 26upx;
		}
	}

	.guanb {
		float: right;

		text {
			font-size: 24upx;
			color: #999;
		}
	}

	.xinxi {
		overflow: hidden;
		width: 710upx;
		padding: 20upx;
		border-bottom: 1px dotted #ccc;
		padding-bottom: 0;

		.biaot {
			text {
				font-size: 28upx;
			}
		}

		.xinXi {
			overflow: hidden;
			width: 710upx;
			// padding: 20upx;
			border-bottom: 1px dotted #ccc;

			// padding: 20rpx;
			.bott {
				margin: 20rpx;
				display: block;
				width: 180upx;
				margin-right: 20upx;
				float: right;

				button {
					background-color: #fff;
					border: 1px solid #999;
					border-radius: 40upx;
					font-size: 24upx;
					color: #999;
					font-family: Microsoft YaHei;
				}

			}
		}

		.xinXi:last-child {
			border: none;
			padding-top: 20rpx;
			box-sizing: border-box;
			width: 100%;
		}

		.imgBox_a {
			float: left;
			// padding-top: 20upx;

			image {
				width: 200upx;
				height: 200upx;
			}
		}

		.txt_c {
			float: left;
			width: calc(100% - 200rpx);
			box-sizing: border-box;
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
		align-items: center;
		display: -webkit-flex;
		min-height: 90rpx;

		.title {
			float: left;
			padding-left: 20upx;
			height: 100%;


			text {
				// line-height: 90upx;
				font-size: 28upx;
			}
		}

		.titleTwo {
			width: 70%;
			float: right;
			padding: 20rpx;

			text {
				line-height: 50upx;
				font-size: 28upx;
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

	.aa {
		border-bottom: 1px dotted #ccc;
	}

	.ssa {
		margin-bottom: 100upx;
	}

	.bottom {
		width: 750upx;
		height: 100upx;
		background-color: #fff;
		border-top: 1px solid #ccc;
		position: fixed;
		bottom: 0upx;
		left: 0upx;
		// padding-right: 10rpx;
		// box-sizing: border-box;

		.leftA {
			float: left;
			padding-left: 20upx;
			width: 150upx;

			.kefua {
				float: left;
				padding: 20upx;

				image {
					padding-left: 5upx;
					width: 41upx;
					height: 38upx;
					float: left;
				}

				.keyboard {
					text {
						float: left;
						color: #333;
						font-size: 26upx;
					}
				}

			}



		}

	}

	.rightA {
		width: 300upx;
		float: right;

	}

	.bottBox {

		float: right;
		width: 710upx;
		padding: 20upx;
		height: 50upx;

		.onna {
			button {
				background-color: #007AFF !important;
				border: 1px solid #007AFF !important;
				color: #fff !important;
			}
		}

		.onnb {
			button {
				background-color: #fff !important;
				border: 1px solid #007AFF !important;
				color: #007AFF !important;
			}
		}

		.bott {
			display: block;
			width: 180upx;
			margin-right: 20upx;
			float: right;

			button {
				background-color: #fff;
				border: 1px solid #999;
				border-radius: 40upx;
				font-size: 24upx;
				color: #999;
				font-family: Microsoft YaHei;
			}

		}
	}

	.collect {
		width: 710upx;
		padding: 20upx;
		border-bottom: 20upx solid #f7f7f7;
		overflow: hidden;

		.collimg {
			padding-top: 30upx;
			float: left;

			image {
				width: 44upx;
				height: 41upx;
			}
		}

		.colltext {
			float: left;
			padding-left: 20upx;

			.collh2 {
				text {
					font-size: 30upx;
					line-height: 40upx;
					color: #333;
				}
			}

			.collspan {
				text {
					font-size: 22upx;
					line-height: 30upx;
					color: #999;
				}
			}
		}

		.collenter {
			float: right;

			image {
				width: 12upx;
				height: 20upx;
			}
		}
	}
</style>
