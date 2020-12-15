<template>
	<view>
		<view class="top toubu">
			<view style='float:left;margin-left:20rpx;width:calc(20% - 20rpx);margin-top:20rpx;' @tap='back'>
				<image src='../../../../static/icon_26-2.png' style='width:18rpx;height:32rpx;'></image>
			</view>
			<view style='float:left;padding:20rpx 0;width:60%;text-align:center;'>地址管理</view>
			<view class="imgBox" @tap='tianjia'>
				<text>添加</text>
			</view>
		</view>
		<view v-if='list.length==0'>
			<image src='../../../../static/s.png' style='width:299rpx;height:150rpx;display:block;margin:2rpx auto;position:fixed;top:calc((100% - 150rpx)/2);left:calc((100% - 299rpx)/2);'></image>
			<view style='text-align:center;position:fixed;top:200rpx;width:100%;text-align:center;height:100rpx;'>暂无收货地址</view>
		</view>
		<radio-group @change='checkboxChange'>
			<view class="siteBox" v-for='item in list'>
				<view class="radios" v-if='xianshi'>
					<radio :value='item.id' />
				</view>
				<view class="content">
					<view class="nome">
						<text>{{item.username}}</text>
					</view>
					<view class="call">
						<text>{{item.phone}}</text>
					</view>
					<!-- 默认地址标签样式 -->
					<view class="label" v-if='item.isDefault==1'>
						<text>默认</text>
					</view>
					<view class="p">
						<text>{{item.cityInfo+item.address}}</text>
					</view>
				</view>
				<view class="edit">
					<text @tap='bianji(item.index)'>编辑</text>
				</view>
			</view>
		</radio-group>
		<view class="line" style="height: 120rpx;">

		</view>
		<view class="uni-padding-wrap uni-common-mt bott" v-if='xianshi'>
			<button type="primary" style="background: #2b5cff" @tap='fanhui'>确定并返回</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				rds: '',
				goodsId: '',
				cartAttr: '',
				id: '',
				moneys: '',
				dingdan: '',
				shopId: '',
				y: '',
				xianshi: false,
				jifenid: 0
			}
		},
		onLoad: function(options) {
			console.log(options)
			if (options.goodsId) {
				this.goodsId = options.goodsId
				this.cartAttr = options.cartAttr
				this.id = options.id
				this.moneys = options.money
				this.dingdan = options.dingdan
				this.shopId = options.shopId
				this.y = JSON.parse(options.y)
				this.xianshi = true
			}
			if (options.jifen) {
				this.xianshi = true
				this.jifenid = options.id
			}
			var _this = this
			this.$https({
				url: '/api/user/my-address',
				data: {},
				dengl: false,
				success: function(res) {
					res.data.data.map(function(n, index) {
						n.index = index
					})
					_this.list = res.data.data
				}
			})
			//添加收货地址
			// _this.$https({
			// 	url: '/api/user/address-add-edit',
			// 	data: JSON.stringify({
			// 		address: res.detailInfo,
			// 		cityInfo: res.provinceName + res.cityName + res.countyName,
			// 		phone: res.telNumber,
			// 		username: res.userName
			// 	}),
			// 	haeder: true,
			// 	dengl: false,
			// 	method: 'post',
			// 	success: function(res) {
			// 		//刷新地址列表
			// 		_this.$https({
			// 			url: '/api/user/my-address',
			// 			data: {},
			// 			dengl: false,
			// 			success: function(res) {
			// 				res.data.data.map(function(n, index) {
			// 					n.index = index
			// 				})
			// 				_this.list = res.data.data
			// 			}
			// 		})
			// 	}
			// })


		},
		onShow() {
			var _this = this
			this.$https({
				url: '/api/user/my-address',
				data: {},
				dengl: false,
				success: function(res) {
					res.data.data.map(function(n, index) {
						n.index = index
					})
					_this.list = res.data.data
				}
			})
		},
		methods: {
			tianjia: function() {
				// console.log(1111)
				var _this = this
				uni.navigateTo({
					url: './address'
				})
			},
			checkboxChange: function(e) {
				var _this = this
				this.list.map(function(n) {
					if (e.detail.value == n.id) {
						_this.rds = n
					}
				})
			},
			bianji: function(index) {
				uni.navigateTo({
					url: 'address?address=' + JSON.stringify(this.list[index])
				})
			},
			fanhui: function() {
				if (this.jifenid == 0) {
					uni.redirectTo({
						url: '../../../cart/orderForm/orderForm?goodsId=' + this.goodsId + '&cartAttr=' + this.cartAttr + '&zhid=' +
							JSON.stringify(this.rds) + '&id=' + this.id + '&money=' + this.moneys + '&dingdan=' + this.dingdan +
							'&shopId=' + this.shopId + '&y=' + JSON.stringify(this.y)
					})
				} else {
					uni.redirectTo({
						url: '../../../cart/orderForm/jifen?dizhi=' + JSON.stringify(this.rds) + '&id=' + this.jifenid
					})
				}
			},
			back: function() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss">
	checkbox {
		border-radius: 50%;
	}

	radio-group {
		margin-top: 160rpx;
	}

	.top {
		width: 750upx;
		margin: 0 auto;
		overflow: hidden;
		border-bottom: 1px solid #e5e5e5;
		position: fixed;
		top: 0;

		.textBox {
			padding-left: 40%;

			text {
				font-size: 38upx;
				color: #333;
				float: left;
				line-height: 90upx;
			}
		}

		.imgBox {
			float: right;
			padding: 20upx 0;
			width: 20%;
			text-align: right;

			text {
				font-size: 26upx;
				color: #333;
				margin-right: 20rpx;
			}
		}
	}

	.siteBox {
		width: 710upx;
		margin: 20upx;
		overflow: hidden;
		padding-top: 20upx;
		padding-bottom: 40upx;
		border-bottom: 1px solid #e5e5e5;

		.radios {
			float: left;
			padding-top: 30upx;
			padding-right: 10upx;
		}

		.content {
			float: left;
			width: 80%;

			.nome {
				float: left;
				font-size: 30upx;
				color: #333;
				padding-right: 10upx;
			}

			.call {
				float: left;
				font-size: 24upx;
				color: #666;
				line-height: 40upx;
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

			.p {
				font-size: 26upx;
				color: #333;
				line-height: 40upx;
				width: 100%;
				clear: both;
			}
		}

		.edit {
			float: right;
			margin-top: 20upx;
			border-left: 1px solid #e5e5e5;

			text {
				font-size: 24upx;
				color: #999;
				line-height: 80upx;
				padding-left: 20upx;
			}
		}

	}

	.bott {
		width: 670upx;
		position: fixed;
		bottom: 40upx;
		left: 40upx;

		button {
			border-radius: 40upx;
			font-family: Microsoft YaHei;
		}

	}
</style>
