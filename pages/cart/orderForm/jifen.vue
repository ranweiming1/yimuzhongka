<template>
	<view>
		<view class='shouhuodizhi' @tap='tianjia' v-if='x'>+添加收货地址</view>
		<view style='overflow:hidden;padding:10rpx 20rpx;border-bottom:1px solid #ccc;' @tap='dizhitiaozhuan' v-if='!x'>
			<view style='float:left;width:calca(100% - 10rpx);'>
				<view class='name'>
					<view style='color:#333;padding-right:10rpx;font-size:30rpx;float:left;'>{{dizhi.username}}</view>
					<view style='float:left;font-size:24rpx;color:#666;line-height:40rpx;'>{{dizhi.phone}}</view>
					<view style='float:left;font-size:18rpx;color:#ff6633;padding:5rpx;background:#fdf1ec;margin-top:5rpx;' v-if='!(dizhi.isDefault==0)'>默认</view>
				</view>
				<view style='font-size:26rpx;color:#333;line-height:40rpx;'>{{dizhi.address}}</view>
			</view>
			<image src='../../../static/icon_26.png' style='float:right;width:20rpx;height:20rpx;margin-top:10rpx;'></image>
		</view>
		<view class='dingdan'>
			<view class='dianpuxinxi'>订单信息</view>
			<view class='dianpumingcheng'>
				<view style='overflow:hidden;margin-top:5rpx;border-bottom:1px solid #eee;padding-bottom:10rpx;'>
					<image :src='obj.goodsLogo' style='float:left;width:200rpx;height:200rpx;'></image>
					<view style='float:left;width:490rpx;margin-top:20rpx;margin-left:20rpx;'>
						<view>{{obj.goodsName}}</view>
						<view>{{obj.shopPrice.toFixed(2)}}元+{{obj.integral}}积分</view>
						<view style='overflow:hidden;text-align:right;overflow:hidden;float:right;font-size:50rpx;'>
							<view style='display:inline-block;line-height:60rpx;float:left;' @tap='jianshao'>-</view>
							<input v-model='num' style='display:inline-block;width:100rpx;height:60rpx;float:left;text-align:center;border:1px solid #eee;margin:0 20rpx;font-size:40rpx;'>
							<view style='display:inline-block;line-height:60rpx;float:left;' @tap=zengjia>+</view>
						</view>
					</view>
				</view>
			</view>
			<view style='overflow:hidden;margin-top:30rpx;'>给卖家备注</view>
			<textarea style='border:1px solid #f1f1f1;height:300rpx;width:690rpx;margin-top:20rpx;' v-model='remak'></textarea>
			<view style='margin:20rpx auto;width:300rpx;background:#3366ff;color:#fff;font-size:30rpx;line-height:90rpx;text-align:center;border-radius:45rpx;'
			 @tap='tijiao'>立即兑换</view>
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
				x: false
			}
		},
		onLoad(option) {
			//获取默认地址
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
				}
			})
		},
		methods: {
			tianjia: function() {
				uni.navigateTo({
					url: '../../user/leagu/siteList/address?j=1&id=' + this.id
				})
			},
			tijiao: function() {
				this.$https({
					url: '/api/shop/order-submit-integral-order',
					data: {
						addressId: this.dizhi.id,
						goodsId: this.id,
						goodsNum: 1,
						userNote: this.remak
					},
					method: 'post',
					haeder: true,
					success: res => {
						this.$https({
							url: '/api/pay/unifiedOrder',
							method: 'post',
							data: JSON.stringify({
								orderNo: res.data.data.orderSn,
								payMethod: 3
							}),
							haeder: true,
							success: res => {
								console.log(res)
								if (res.data.code == 0) {
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
										success: function() {

										},
										fail: function() {
											uni.showToast({
												title: '支付失败请重新支付',
												icon:'none'
											})
										}
									})
								}else{
									console.log(res.data.message)
									uni.showToast({
										title: res.data.message?res.data.message:'兑换失败',
										icon:'none'
									})
								}

							}
						})
					}
				})
			},
			dizhitiaozhuan: function() {
				uni.navigateTo({
					url: '../../user/leagu/siteList/siteList?jifen=1&id=' + this.id
				})
			},
			jianshao: function() {
				if (this.num > 1)
					this.num--
			},
			zengjia: function() {
				this.num++
			}
		}
	}
</script>

<style>
	.shouhuodizhi {
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
		padding: 20rpx;
	}

	.dianpuxinxi {
		padding: 0 20rpx;
	}
</style>
