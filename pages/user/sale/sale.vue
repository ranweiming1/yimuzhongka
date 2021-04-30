<template>
	<view>

		<!-- tab切换样式  start-->
		<view :class="shixiao==0?'yes':'none'" @tap='keshiyong'>
			<text>可使用</text>
			<!-- 下图为选中状态下划线 -->
			<view class="imgBox" v-if='shixiao==0'>
				<image src="../../../static/icon_09.png" mode=""></image>
			</view>
		</view>

		<view :class="shixiao==1?'yes':'none'" @tap='yishixiao'>
			<text>已失效</text>
			<view class='imgBox' v-if='shixiao==1'>
				<image src='../../../static/icon_09.png'></image>
			</view>
		</view>
		<!-- tab切换样式  end-->


		<!-- 可使用状态优惠券 -->
		<view class="valid " v-if='shixiao==0'>
			<view v-if='youhuiquan.length==0' style='box-shadow:none;'>
				<image src='../../../static/y.png' style='width:300rpx;height:150rpx;display:block;margin:20rpx auto;'>
				</image>
				<view style='text-align:center;'>暂无可用优惠券</view>
			</view>
			<view v-for='item in youhuiquan' class="coupon-box">
				<view class="imgBox" style='position:relative;'>
					<image src="../../../static/icon_27.png" mode=""></image>
					<view class="sum" style='width:200rpx;position:absolute;height:210rpx;top:0;left:0;'>
						<text>{{item.couponDTO.money?item.couponDTO.money:''}}<text>元</text></text>
						<view class="tianjan">
							<text>满{{item.couponDTO.condition?item.couponDTO.condition:''}}可用</text>
						</view>
					</view>
				</view>
				<view class="float">
					<view class="h2">
						<text>满{{item.couponDTO.condition?item.couponDTO.condition:''}}-{{item.couponDTO.money?item.couponDTO.money:''}}立减券</text>
					</view>
					<view class="p">
						<text>{{item.couponDTO.name?item.couponDTO.name:''}}</text>
					</view>
					<view class="span">
						<text>使用时间：{{item.couponDTO.useStartTime.split(' ')[0]}}-{{item.couponDTO.useEndTime.split(' ')[0]}}</text>
					</view>
				</view>

				<view class="bott" :style="item.couponDTO.isType?'background:#ccc':''">
					<text
						@tap='shiyong(item.couponDTO.id,item.couponDTO.money,item.couponDTO.shopId,item.couponDTO.isType)'>{{item.couponDTO.isType?'不可用':'使用'}}</text>
				</view>
				<view class="coupon-tips">
					{{item.couponDTO.shopId==null?'平台优惠券':'店铺优惠券'}}
				</view>
			</view>
		</view>

		<!-- 不可使用状态 -->

		<view class="cannot" v-if='shixiao==1' style='height:auto;'>
			<view v-if='youhuiquan.length==0' style='box-shadow:none;'>
				<image src='../../../static/y.png' style='width:300rpx;height:150rpx;display:block;margin:20rpx auto;'>
				</image>
				<view style='text-align:center;'>暂无可用优惠券</view>
			</view>
			<view v-for='item in youhuiquan' class="coupon-box">
				<view class="imgBox" style='position:relative;'>
					<image src="../../../static/icon_28.png" mode=""></image>
					<view class="sum" style='position:absolute;left:0;top:0;width:200rpx;height:210rpx;'>
						<text>{{item.couponDTO.money?item.couponDTO.money:''}}<text>元</text></text>
						<view class="tianjan">
							<text>满{{item.couponDTO.condtion?item.couponDTO.condtion:''}}可用</text>
						</view>
					</view>
				</view>
				<view class="float">
					<view class="h2">
						<text>满{{item.couponDTO.condition?item.couponDTO.condition:''}}-{{item.couponDTO.money?item.couponDTO.money:''}}立减券</text>
					</view>
					<view class="p">
						<text>{{item.couponDTO.name?item.couponDTO.name:''}}</text>
					</view>
					<view class="span">
						<text>使用时间：{{item.couponDTO.useStartTime}}-{{item.couponDTO.useEndTime}}</text>
					</view>
				</view>

				<view class="bott">
					<text>已使用</text>
				</view>
				<view class="coupon-tips">
					{{item.couponDTO.shopId==null?'平台优惠券':'店铺优惠券'}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shixiao: 0,
				goodsId: '',
				cartAttr: '',
				zhid: '',
				youhuiquan: [],
				dingdan: '',
				shopId: '',
				y: '',
				id: '',
				money: '',
				jine: '',
				dingdan: '',
				obj: {}
			}
		},
		onLoad: function(options) {
			var _this = this

			//获取优惠券
			if (options.shopId) {
				_this.shopId = options.shopId
				// _this.jine = options.jine
				_this.obj = JSON.parse(options.obj)
				_this.dingdan = options.dingdan
				this.$https({
					url: '/api/shop/select-my-coupon-list',
					data: {
						shopId: options.shopId
					},
					dengl: false,
					success(res) {
						res.data.data = res.data.data ? res.data.data : []
						var arr = []
						if (res.data.data) {
							res.data.data.map((val, i) => {
								if (val.useEndTime) {
									val.useEndTime = val.useEndTime.replace(/-/g, '.')
								}
								if (val.useStartTime) {
									val.useStartTime = val.useStartTime.replace(/-/g, '.')
								}
								val.isType = val.condition > JSON.parse(options.obj).jine ? true :
									false
								var str = {}
								str.couponDTO = val
								arr.push(str)
							})
							console.log(arr)
						}
						_this.youhuiquan = arr
					}

				})
			} else {
				this.$https({
					url: '/api/shop/myCoupon-list',
					data: {
						type: this.shixiao
					},
					success: function(res) {
						res.data.data = res.data.data ? res.data.data : []
						if (res.data.data) {
							res.data.data.map(function(val, i) {
								if (val.couponDTO.useEndTime) {
									val.couponDTO.useEndTime = val.couponDTO.useEndTime.replace(
										/-/g, '.')
								}
								if (val.couponDTO.useStartTime) {
									val.couponDTO.useStartTime = val.couponDTO.useStartTime
										.replace(/-/g, '.')
								}
							})
						}
						var arr = []
						_this.youhuiquan = res.data.data
					}
				})
			}
			// if (options.goodsId) {
			// 	this.goodsId = options.goodsId
			// 	this.cartAttr = options.cartAttr
			// 	this.zhid = options.zhid
			// 	this.dingdan = options.dingdan
			// 	this.shopId = options.shopId
			// 	this.id = options.id
			// 	this.money = options.money
			// 	this.y = JSON.parse(options.y)
			// }

		},
		methods: {
			keshiyong: function() {
				this.shixiao = 0
				this.youhui()
			},
			yishixiao: function() {
				this.shixiao = 1
				if (this.shopId) {
					this.youhuiquan = []
				} else {
					this.youhui()
				}
			},
			//获取优惠券
			youhui: function() {
				var _this = this
				this.youhuiquan = []
				if (this.shopId) {
					this.$https({
						url: '/api/shop/select-my-coupon-list',
						data: {
							shopId: this.shopId
						},
						dengl: false,
						success(res) {
							res.data.data = res.data.data ? res.data.data : []
							var arr = []
							if (res.data.data) {
								res.data.data.map((val, i) => {
									if (val.useEndTime) {
										val.useEndTime = val.useEndTime.replace(/-/g, '.')
									}
									if (val.useStartTime) {
										val.useStartTime = val.useStartTime.replace(/-/g, '.')
									}
									val.isType = val.condition > _this.obj.jine ? true : false
									var str = {}
									str.couponDTO = val
									arr.push(str)
								})
							}
							_this.youhuiquan = arr
						}

					})
				} else {
					this.$https({
						url: '/api/shop/myCoupon-list',
						data: {
							type: this.shixiao
						},
						success: function(res) {
							res.data.data = res.data.data ? res.data.data : []
							var arr = []
							if (res.data.data) {
								res.data.data.map(function(val, i) {
									if (val.couponDTO.useEndTime) {
										val.couponDTO.useEndTime = val.couponDTO.useEndTime
											.replace(/-/g, '.')
									}
									if (val.couponDTO.useStartTime) {
										val.couponDTO.useStartTime = val.couponDTO.useStartTime
											.replace(/-/g, '.')
									}
								})
							}
							_this.youhuiquan = res.data.data
						}
					})
				}
			},
			shiyong: function(id, money, shopId, isType) {
				var aum = 0
				var _this = this
				if (isType) {
					uni.showToast({
						title: '不符合满减条件',
						icon: 'none'
					})
					return
				}
				if (this.dingdan == 2) {
					// 如果是从商品购买进来
					var pages = getCurrentPages();
					var prevPage = pages[pages.length - 2];
					prevPage.$vm.cartAttr[_this.obj.index].couponId = id
					prevPage.$vm.cartAttr[_this.obj.index].money = money
					if (this.obj.couponDJ == 'N') {
						// 不可叠加使用时候,平台优惠券清空
						prevPage.$vm.commCouponId = ''
						prevPage.$vm.commMoney = 0
					}
					prevPage.$vm.countYF()
					uni.navigateBack({})
				} else if (this.dingdan == 1) {
					console.log(this.obj)
					var pages = getCurrentPages();
					var prevPage = pages[pages.length - 2];
					prevPage.$vm.cartAttr[_this.obj.index].couponId = id
					prevPage.$vm.cartAttr[_this.obj.index].money = money
					// 当isEnough(可叠加商品)为true,也就是达到满减的时候,不论我当前店铺含不含可叠加商品,我使用店铺优惠券都没有影响;
					// 当isEnough为false时,也就是所有可使用优惠券的商品加起来符合满减条件的时候,如果当前店铺内含有可叠加上皮内,平台全不变,店铺券也没有影响;
					// 但是当前店铺没没有可叠加商品的时候,清空平台优惠券
					if (!this.obj.isEnough) {
						if (!this.obj.isDJ) {
							prevPage.$vm.commCouponId = ''
							prevPage.$vm.commMoney = 0
						}
					}
					prevPage.$vm.countYF()
					uni.navigateBack({})
				} else {
					if (shopId != null) {
						uni.navigateTo({
							url: '../../shop/shop?id=' + shopId
						})

					} else {
						uni.navigateTo({
							url: '../../index/index'
						})
					}
				}

				// if (this.y) {
				// 	this.y.map(function(n) {
				// 		if (_this.shopId == n.shopId) {
				// 			n.money = money
				// 			n.couponId = id
				// 		}
				// 	})
				// 	uni.navigateTo({
				// 		url: '../../cart/orderForm/orderForm?goodsId=' + this.goodsId + '&cartAttr=' + this
				// 			.cartAttr + '&zhid=' + this.zhid + '&id=' + id + '&money=' + money + '&dingdan=' +
				// 			this.dingdan + '&shopId=' + this.shopId + '&coupid=' + this.id + '&y=' + JSON
				// 			.stringify(this.y)
				// 	})
				// } 
			}
		},
	}
</script>

<style lang="scss">
	.coupon-box {
		border-radius: 15rpx;
		position: relative;

		.coupon-tips {
			position: absolute;
			min-width: 150rpx;
			box-sizing: border-box;
			padding: 0 20rpx;
			background: linear-gradient(to right, #ff9429, #ff6759);
			right: 0;
			top: 0;
			text-align: center;
			border-top-right-radius: 15rpx;
			border-bottom-left-radius: 10rpx;
			color: #fff;
			font-size: 22rpx;
			height: 40rpx;
			line-height: 40rpx;
			opacity: 60%;
		}
	}

	.yes {
		width: 375upx;
		text-align: center;
		float: left;
		padding-bottom: 20upx;

		text {
			width: 32upx;
			color: #333;
			line-height: 80upx;
		}

		.imgBox {
			image {
				width: 34upx;
				height: 6upx;
				display: block;
				margin: 0 auto;
			}
		}
	}

	.none {
		width: 375upx;
		text-align: center;
		float: left;

		text {
			width: 32upx;
			color: #999;
			line-height: 80upx;
		}
	}

	.valid {
		overflow: hidden;
		position: relative;
		// margin: 20upx;
		border-radius: 10upx;
		background-color: #fff;
		padding: 20rpx;
		width: 100%;
		box-sizing: border-box;

		>view {
			overflow: hidden;
			box-shadow: 0 0 5px #ccc;
			margin-bottom: 30rpx;
		}

		.imgBox {
			float: left;
			padding-right: 20upx;

			image {
				width: 200upx;
				height: 210upx;
				display: block;
			}

			.sum {
				text-align: center;
				overflow: hidden;

				>text {
					font-size: 60upx;
					color: #fff;
					margin-top: 20%;
					display: block;

					text {
						font-size: 30upx;
						color: #fff;
					}
				}

				.tianjan {
					text {
						color: #fff;
						font-size: 20upx;
						line-height: 50upx;
					}

				}
			}
		}

		.float {
			float: left;
			width: calc(100% - 380rpx);

			.h2 {
				font-size: 32upx;
				color: #333;
				line-height: 50upx;
				padding-top: 30upx;
			}

			.p {
				font-size: 24upx;
				color: #666;
				line-height: 50upx;
			}

			.span {
				font-size: 20upx;
				;
				color: #999;
				line-height: 30upx;
			}
		}

		.bott {
			float: right;
			color: #fff;
			margin: 80upx 20upx;
			padding: 10upx 20upx;
			border-radius: 30upx;
			font-size: 22upx;
			max-width: 90rpx;
			background: linear-gradient(to right, #ff9429, #ff6759);
		}
	}

	// 不可使用样式
	.cannot {
		overflow: hidden;
		position: relative;
		width: 710upx;
		height: 205upx;
		margin: 20upx;
		border-radius: 10upx;
		background-color: #fff;

		>view {
			overflow: hidden;
			box-shadow: 0 0 5px #ccc;
			margin-top: 50rpx;
		}

		.coupon-tips {
			background: #CCCCCC;
		}

		.imgBox {
			float: left;
			padding-right: 20upx;

			image {
				width: 200upx;
				height: 205upx;
				display: block;
			}

			.sum {
				position: absolute;
				top: 15%;
				left: 6%;
				text-align: center;

				text {
					font-size: 60upx;
					color: #fff;

					text {
						font-size: 30upx;
						color: #fff;
					}
				}

				.tianjan {
					text {
						color: #fff;
						font-size: 20upx;
						line-height: 50upx;
					}

				}
			}
		}

		.float {
			float: left;
			width: 48%;

			.h2 {
				font-size: 32upx;
				color: #333;
				line-height: 50upx;
				padding-top: 30upx;
			}

			.p {
				font-size: 24upx;
				color: #666;
				line-height: 50upx;
			}

			.span {
				font-size: 20upx;
				;
				color: #999;
				line-height: 30upx;
			}
		}

		.bott {
			float: right;
			color: #fff;
			margin: 80upx 20upx;
			padding: 10upx 20upx;
			border-radius: 30upx;
			font-size: 22upx;
			background: #cccccc;
		}
	}
</style>
