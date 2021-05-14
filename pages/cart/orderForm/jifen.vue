<template>
	<view>
		<view class='shouhuodizhi' @tap='tianjia' v-if='x'>+添加收货地址</view>
		<view class="rece-address" @tap='dizhitiaozhuan' v-if='!x'>
			<view class="address-left">
				<view class='name'>
					<view style='color:#333;padding-right:10rpx;font-size:30rpx;float:left;'>{{dizhi.username}}</view>
					<view style='float:left;font-size:24rpx;color:#666;line-height:40rpx;'>{{dizhi.phone}}</view>
					<view
						style='float:left;font-size:18rpx;color:#ff6633;padding:5rpx;background:#fdf1ec;margin-top:5rpx;'
						v-if='!(dizhi.isDefault==0)'>默认</view>
				</view>
				<view style='font-size:26rpx;color:#333;line-height:40rpx;'>{{dizhi.address}}</view>
			</view>
			<view class="address-right">
				<image src='../../../static/icon_26.png'>
				</image>
			</view>

		</view>
		<view class='dingdan'>
			<view class='dianpuxinxi'>订单信息</view>
			<view class='dianpumingcheng'>
				<view class="box-xinxi">
					<image :src='obj.goodsLogo'></image>
					<view class="xinxi-right">
						<view class="xinxi-title">{{obj.goodsName}}</view>
						<view class="box-bottom">
							<view class="order-price">
								{{obj.integral+'积分'}}{{obj.shopPrice?'+￥'+obj.shopPrice.toFixed(2):''}}
							</view>
							<view class="jia">
								<text @tap="jianshao">-</text>
								<input type="number" @input="getJifen" v-model='num'>
								<text @tap="zengjia">+</text>
							</view>
						</view>
					</view>
				</view>
				<view class="userNote">
					<view class="title"><text>给卖家备注</text></view>
					<input class="uni-input" name="input" v-model='remak' placeholder="添加备注" />
				</view>
			</view>
		</view>
		<view class="userNote mar-buttom" v-if="obj.shopPrice">
			<view class="left_a">
				<text>支付方式</text>
			</view>
			<view class="right_a">
				<picker @change='xuanze' :value='index' :range='zhifu'>
					<view class="img_l">
						<image :src="index==0?'../../../static/wx.png':'../../../static/z.png'" mode=""></image>
					</view>
					<view class="img_a">
						<image src="../../../static/icon_26.png" mode=""></image>
					</view>
					<text>{{zhifu[index]}}</text>
				</picker>
			</view>
		</view>
		<view class="userNote mar-buttom">
			<view class="left_a">
				<text>扣除积分</text>
			</view>
			<view class="right_a">
				<!-- <view class="img_a">
					<image src="../../../static/icon_26.png" mode=""></image>
				</view> -->
				<text>-{{jifenCount}}积分</text>
			</view>
		</view>
		<view style="height: 200rpx;"></view>
		<view class="duihuan" @tap='tijiao'>立即兑换</view>

		<view class="cashMask" v-if="isCash">
			<view class="cash-con">
				<!-- <view class="cash-icon">
					<image :src="index==0?'../../../static/wxtixian.png':'../../../static/checked.png'" mode=""></image>
				</view> -->
				<view class="cash-text">
					积分兑换发起，将扣除<text style="color: #FF0000;">{{jifenCount}}</text>积分！
				</view>
				<view class="cash-butt">
					<view class="cash-bot" @tap="zfCancel">
						取消
					</view>
					<view class="cash-bot" @tap="zfCanfirm">
						确认
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
				dizhi: {},
				id: 0,
				obj: {},
				remak: '',
				num: 1,
				x: false,
				arr: ['微信支付', '支付宝'],
				zhifu: ['微信支付', '支付宝'],
				index: 0,
				jifenCount: '',
				wodejifen: '',
				isCash: false
			}
		},
		onLoad(option) {
			//获取默认地址
			if (option.wodejifen) {
				this.wodejifen = option.wodejifen
				console.log(option)
			}
			if (option.dizhi) {
				this.dizhi = JSON.parse(option.dizhi)
			} else {
				this.$https({
					url: '/api/user/my-address',
					success: res => {
						var n = 0
						res.data.data.map(n => {
							if (n.isDefault == 1) {
								this.dizhi = n
								n++
							}
						})
						if (n == 0) {
							this.dizhi = res.data.data[0]
						}
						if (res.data.data.length == 0) {
							this.x = true
						} else {
							this.x = false
						}
					}
				})
			}
			if (option.good) {
				this.id = option.good
			} else {
				this.id = option.id
			}
			//商品的信息
			this.$https({
				url: '/api/oauth/shop/mall-integral-goods-detail',
				data: {
					goods_id: option.good ? option.good : option.id
				},
				dengl: true,
				success: (res) => {
					this.obj = res.data.data.detail
					this.jifenCount = res.data.data.detail.integral
				}
			})
		},

		methods: {
			getJifen: function() {
				this.jifenCount = this.$numMul(this.num, this.obj.integral)
			},
			zfCancel: function() {
				this.isCash = !this.isCash
			},
			zfCanfirm: function() {
				var _this = this
				this.$https({
					url: '/api/shop/order-submit-integral-order',
					data: {
						addressId: this.dizhi.id,
						goodsId: this.id,
						goodsNum: this.num,
						userNote: this.remak
					},
					method: 'post',
					haeder: true,
					success: res => {
						if (res.data.code != 0) {
							uni.showToast({
								title: res.data.message ? res.data.message : '兑换失败',
								icon: 'none'
							})
							return false
						}
						this.$https({
							url: '/api/pay/unifiedOrder',
							data: JSON.stringify({
								orderNo: res.data.data.orderSn,
								payMethod: 2
							}),
							method: 'post',
							haeder: true,
							success: function(res) {
								_this.isCash = false
								if (res.data.code == 0) {
									_this.$https({
										url: '/api/user/order-list',
										data: {
											status: 2,
											page: 1,
											limit: 10,
										},
										success: res => {
											uni.redirectTo({
												url: '../../user/allState/shipped?orderId=' +
													res.data.data[0]
													.orderId
											})
										}
									})
								} else {
									uni.showToast({
										title: res.data.message ? res.data
											.message : '兑换失败',
										icon: 'none'
									})
								}
							}

						})

					}
				})

			},
			tianjia: function() {
				uni.navigateTo({
					url: '../../user/leagu/siteList/address?j=1&id=' + this.id
				})
			},
			xuanze: function(e) {
				this.index = e.detail.value
			},
			tijiao: function() {
				var _this = this
				if (this.jifenCount > this.wodejifen) {
					uni.showToast({
						title: '你的积分不足',
						icon: 'none'
					})
					return false
				}
				if (!this.obj.shopPrice) {
					this.isCash = true
					return false
				}
				this.$https({
					url: '/api/shop/order-submit-integral-order',
					data: {
						addressId: this.dizhi.id,
						goodsId: this.id,
						goodsNum: this.num,
						userNote: this.remak
					},
					method: 'post',
					haeder: true,
					success: res => {
						if (res.data.code != 0) {
							uni.showToast({
								title: res.data.message ? res.data.message : '兑换失败',
								icon: 'none'
							})
						}
						if (_this.index == 0) {
							_this.$https({
								url: '/api/pay/unifiedOrder',
								data: JSON.stringify({
									orderNo: res.data.data.orderSn,
									payMethod: 3
								}),
								method: 'post',
								haeder: true,
								success: function(res) {
									var obj = {}
									obj.appid = res.data.data.appId
									obj.partnerid = res.data.data.partnerId
									obj.prapayid = res.data.data.parpayId
									obj.package = res.data.data.packageValue
									obj.noncestr = res.data.data.noncestr
									obj.timestamp = res.data.data.timeStamp
									obj.sign = res.data.data.sign

									uni.requestPayment({
										provider: 'wxpay',
										orderInfo: obj,
										success: function(res) {
											_this.$https({
												url: '/api/user/order-list',
												data: {
													status: 2,
													page: 1,
													limit: 10,
												},
												success: res => {
													uni.redirectTo({
														url: '../../user/allState/shipped?orderId=' +
															res
															.data
															.data[
																0
															]
															.orderId
													})
												}
											})
										},
										fail: function(res) {
											_this.$https({
												url: '/api/user/order-list',
												data: {
													status: 1,
													page: 1,
													limit: 10,
												},
												success: res => {
													uni.redirectTo({
														url: '../../user/allState/shipped?orderId=' +
															res
															.data
															.data[
																0
															]
															.orderId +
															'&zhuangtai=0'
													})
												}
											})
										}
									})
								},
							})
						} else {
							_this.$https({
								url: '/api/pay/ali/pay-unified-order',
								data: JSON.stringify({
									orderNo: res.data.data.orderSn,
									payMethod: 5
								}),
								haeder: true,
								method: 'post',
								success: res => {
									uni.requestPayment({
										provider: 'alipay',
										orderInfo: res.data.data.aliEncryptStr,
										success: res => {
											_this.$https({
												url: '/api/user/order-list',
												data: {
													status: 2,
													page: 1,
													limit: 10,
												},
												success: res => {
													uni.redirectTo({
														url: '../../user/allState/shipped?orderId=' +
															res
															.data
															.data[
																0
															]
															.orderId
													})
												}
											})
										},
										fail: function(err) {
											_this.$https({
												url: '/api/user/order-list',
												data: {
													status: 1,
													page: 1,
													limit: 10,
												},
												success: res => {
													uni.redirectTo({
														url: '../../user/allState/shipped?orderId=' +
															res
															.data
															.data[
																0
															]
															.orderId +
															'&zhuangtai=0'
													})
												}
											})
										}
									})
								}
							})
						}

					}
				})
			},
			dizhitiaozhuan: function() {
				uni.navigateTo({
					url: '../../user/leagu/siteList/siteList?jifen=1&id=' + this.id
				})
			},
			jianshao: function() {
				if (this.num > 1) {
					this.num--
					this.jifenCount = this.$numMul(this.num, this.obj.integral)

				} else {
					uni.showToast({
						title: '商品数量不能小于0',
						icon: 'none'
					})
				}
			},
			zengjia: function() {
				this.num++
				this.jifenCount = this.$numMul(this.num, this.obj.integral)
			}
		}
	}
</script>

<style lang="less">
	page {
		background-color: #fafafa;
	}

	.rece-address {
		background-color: #fff;
		overflow: hidden;
		padding: 20rpx;
		border-bottom: 1px solid #e5e5e5;
		border-top: 1px solid #e5e5e5;
		width: 100%;
		box-sizing: border-box;


	}

	.address-right {
		display: inline-block;
		// float: right;
		vertical-align: middle;
		width: 50rpx;
		padding: 20rpx 0;
		overflow: hidden;

		image {
			width: 12rpx;
			height: 19rpx;
			display: block;
			float: right;
		}
	}

	.address-left {
		// float: left;
		width: calc(100% - 50rpx);
		display: inline-block;
		box-sizing: border-box;
		vertical-align: middle;
	}

	.shouhuodizhi {
		background-color: #fff;
		border: 1px solid #007aff;
		color: #007aff;
		padding: 15rpx 20rpx;
		font-size: 26rpx;
		border-radius: 10rpx;
		margin-bottom: 20rpx;
		margin: 20rpx auto;
		width: 200rpx;
	}

	.name {
		overflow: hidden;
	}

	.dingdan {
		overflow: hidden;
		// padding: 0 25rpx;
		width: 100%;
		box-sizing: border-box;
		background-color: #fff;
	}

	.dianpuxinxi {
		// padding: 0 20rpx;
		padding: 0 25rpx;
		height: 90rpx;
		line-height: 90rpx;
	}

	.dianpumingcheng {
		padding: 0 25rpx;
	}

	.box-xinxi {
		overflow: hidden;
		font-size: 26rpx;
		// margin-top: 5rpx;
		border-bottom: 1px dashed #eee;

		padding-bottom: 40rpx;

		image {
			width: 200rpx;
			height: 200rpx;
			display: block;
			float: left;
		}

		.xinxi-right {
			float: left;
			width: calc(100% - 200rpx);
			font-size: 26rpx;
			padding-left: 20upx;
			box-sizing: border-box;
			position: relative;
			min-height: 200rpx;

			.xinxi-title {
				font-size: 30rpx;
				line-height: 40rpx;
				color: #333;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 3;
				font-size: 26rpx;
			}

			.box-bottom {
				position: absolute;
				bottom: 0;
				overflow: hidden;
				width: calc(100% - 20rpx);
				line-height: 40rpx;

				.order-price {
					float: left;
					color: #ff0000;
					font-size: 30rpx;
					font-weight: 500;
				}

				.jia {
					float: right;
					border: 2rpx solid #ececec;
					border-radius: 8rpx;
					height: 40rpx;
					line-height: 40rpx;
					box-sizing: border-box;
					float: right;
					overflow: hidden;

					text {
						font-size: 26upx;
						color: #666;
						float: left;
						padding: 0 13rpx;
					}

					input {
						max-width: 60rpx;
						border-left: 1rpx solid #ececec;
						border-right: 1rpx solid #ececec;
						float: left;
						padding: 0 20rpx;
						// box-sizing: border-box;S
						height: 40rpx;
						line-height: 40rpx;
						display: inline-block;
						text-align: center;
						font-size: 18rpx;
						color: #979797;
					}
				}

			}

		}
	}

	.mar-buttom {
		margin-top: 20rpx;
		padding: 0 25rpx;
		width: 100%;
		box-sizing: border-box;
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
				margin-bottom: 50rpx;
			}

			.cash-butt {
				width: 100%;
				box-sizing: border-box;
				overflow: hidden;
			}

			.cash-bot {
				height: 70rpx;
				line-height: 70rpx;
				background: #007AEE;
				border-radius: 45rpx;
				color: #fff;
				width: calc(50% - 20rpx);
				float: right;
			}

			.cash-butt :first-child {
				background-color: #ccc;
				float: left;
			}
		}
	}

	.duihuan {
		margin: 0 auto;
		width: 670rpx;
		background: #3366ff;
		color: #fff;
		font-size: 30rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		border-radius: 40rpx;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 40rpx;
	}

	.userNote {
		background-color: #fff;
		overflow: hidden;
		height: 90rpx;
		line-height: 90rpx;
		// border-bottom: 1rpx dashed #bfbfbf;
		width: 100%;
		font-size: 26upx;
		color: #333;

		.title {
			float: left;
			width: 25%
		}

		input {
			height: 90rpx;
			line-height: 90rpx;
			width: 75%;
			float: right;
			text-align: right;
			font-size: 26rpx;
		}

		.left_a {
			float: left;

			text {
				font-size: 26upx;
				color: #333;
			}
		}

		.right_a {
			float: right;

			text {
				font-size: 24upx;
				float: right;
				color: #333333;
			}

			.img_l {
				float: left;
				padding-right: 10upx;
				padding-top: 22.5rpx;

				image {
					width: 45upx;
					height: 45upx;
					display: block;
				}

			}

			.img_a {
				float: right;
				padding: 35.5rpx 0 35.5rpx 20rpx;

				image {
					width: 12upx;
					height: 19upx;
					display: block;
				}

			}
		}
	}
</style>
