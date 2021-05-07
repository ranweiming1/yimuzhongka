<template>
	<view>

		<view class="siteBox">
			<!-- 无地址样式 -->
			<view class="noneBox" v-if='!z'>
				<text @tap='tiaozhuan'>+ 添加收货地址</text>
			</view>

			<!-- 已设置地址样式 -->
			<view class="addBox" v-if='z'>
				<view class="content" @tap='qiehuandizhi'>
					<view style="overflow: hidden;">
						<view class="nome">
							<text>{{dizhi.username}}</text>
						</view>
						<view class="call">
							<text>{{dizhi.phone}}</text>
						</view>
						<!-- 默认地址标签样式 -->
						<view class="label" v-if='dizhi.isDefault'>
							<text>默认</text>
						</view>
					</view>
					<view class="p">
						<text>{{dizhi.address}}</text>
					</view>
				</view>

				<view class="imgBox" @tap='qiehuandizhi'>
					<image src="../../../static/icon_26.png" mode=""
						style='width:12rpx;height:19rpx;margin-top:20rpx;float:right;'></image>
				</view>
			</view>
		</view>
		<view style='width:400rpx;overflow:hidden;'>{{str}}</view>
		<!-- 订单信息 -->
		<view class="xinxi">
			<!-- 标题 -->
			<view class="biaot">
				<text>订单信息</text>
			</view>
			<!-- 一级列表：店铺列表循环 -->

			<view class="shop-list" v-for='(item,index) in cartAttr' v-if='item.cartAttr'>
				<!-- 店铺名称 -->
				<view style='padding-bottom: 25rpx;'>{{item.shopName}}</view>
				<view class="content-list">
					<view class="box-list-single">
						<!-- 二级列表：相同店铺内商品循环（不同规格或不同商品） ；只循环商品信息 -->
						<view class="box-content" v-for='(items,indexs) in item.cartAttr'>
							<view class="imgBox_a">
								<image :src="items.goodsLogo" mode=""></image>
							</view>
							<view class="txt_c">
								<view class="title">
									<text>{{items.goodsName}}
									</text>
								</view>
								<view class="spec">
									<text>已选：{{items.specKeyName}}</text>
								</view>
								<view class="box-bottom">
									<view class="order-price">
										￥{{items.goodsPrice.toFixed(2)}}
									</view>
									<view class="jia">
										<text>-</text>
										<input disabled="" type="number" v-model='items.goodsNum' @blur='shuzi'>
										<text>+</text>
									</view>
								</view>
							</view>
							<view class="basic">
								<view class="left_a">
									<text>运费</text>
								</view>
								<view class="right_a">
									<!-- <view class="img_a">
									<image src="../../../static/icon_26.png" mode=""></image>
								</view> -->
									<text>￥{{items.kuaidi}}</text>
								</view>
							</view>
						</view>

					</view>
					<!-- 一个店铺，一个运费一个备注；所以运费需要累加 ；-->

					<!-- 存在店铺优惠券，不取消隐藏即可 -->
					<view class="basic aa" v-if="couponX">
						<view class="left_a">
							<text>店铺优惠券</text>
						</view>
						<view class="right_a" @tap='youhuiquan(item.shopId,item.zongjia,index)'>
							<view class="img_a">
								<image src="../../../static/icon_26.png" mode=""></image>
							</view>
							<text>已抵扣<text>￥{{item.money?item.money:0}}</text></text>
						</view>
					</view>
					<view class="basic">
						<view class="title"><text>给卖家备注</text></view>
						<input class="uni-input" name="input" v-model='item.userNote' placeholder="添加备注" />
					</view>

				</view>

			</view>

		</view>

		<!-- 总数据 -->
		<!-- 总优惠券无数据 -->
		<view class="basic mar-buttom" v-if="couponX">
			<view class="left_a">
				<text>平台优惠券</text>
			</view>
			<view class="right_a" @tap='pingtai'>
				<view class="img_a">
					<image src="../../../static/icon_26.png" mode=""></image>
				</view>
				<text>已抵扣<text>￥{{commMoney?commMoney:0}}</text></text>
			</view>
		</view>
		<view class="basic mar-buttom">
			<view class="left_a">
				<text>支付方式</text>
			</view>
			<view class="right_a">
				<picker @change='xuanze' :value='index' :range='arr'>
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
		<view class=" mar-buttom" style="margin-bottom: 120rpx;overflow: hidden;">
			<view class="basic aa">
				<view class="left_a">
					<text>商品金额</text>
				</view>
				<view class="right_a">
					<view class="img_a">
						<image src="../../../static/icon_26.png" mode=""></image>
					</view>
					<text>￥{{shangpin.toFixed(2)}}</text>
				</view>
			</view>
			<view class="basic aa">
				<view class="left_a">
					<text>优惠券减免</text>
				</view>
				<view class="right_a">
					<view class="img_a">
						<image src="../../../static/icon_26.png" mode=""></image>
					</view>
					<text>-￥{{countJM}}</text>
				</view>
			</view>
			<view class="basic">
				<view class="left_a">
					<text>运费</text>
				</view>
				<view class="right_a">
					<!-- <view class="img_a">
						<image src="../../../static/icon_26.png" mode=""></image>
					</view> -->
					<text>￥{{yunfei}}</text>
				</view>
			</view>
		</view>
		<!-- <view style='height:150rpx;'></view> -->
		<!-- 底部 -->
		<view class="bottom">
			<view class="leftA" style='margin-top:10rpx;'>
				<view class="ppp">
					<text>合计：<text style='font-size:20rpx;'>￥<text
								style='font-size:30rpx;display:inline-block;'>{{heji.toFixed(2)}}</text></text></text>
				</view>
				<view class="yunf">
					<text>(含运费)</text>
				</view>
			</view>
			<view class="rightA" @tap='tanchuang'>
				<text>结 算</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsId: '',
				cartAttr: [],
				dizhi: {},
				yunfei: 0,
				shangpin: 0,
				heji: 0,
				moneys: 0,
				id: '',
				dingdan: '',
				//保存优惠券
				youhui: [],
				shopId: 0,
				xinxi: '',
				yao: '',
				z: '',
				arr: ['微信支付', '支付宝'],
				zhifu: ['微信支付', '支付宝'],
				index: 0,
				orderType: true,
				couponX: true,
				commCouponId: '',
				couArr: [],
				commMoney: 0,
				countJM: 0,
				isEnough: false
			}
		},
		onLoad: function(options) {
			var _this = this
			this.yao = options.str
			if (options.goodsId) {
				this.goodsId = options.goodsId
				this.cartAttr = JSON.parse(options.cartAttr).cartAttr
				if (options.dingdan == 1) {
					this.cartAttr = this.cartAttr.filter(function(item) {
						if (item.cartAttr) {
							return item
						}
					})
					this.cartAttr.map(function(n, index) {
						if (n.cartAttr) {
							// 使用filter过滤元素
							n.cartAttr = n.cartAttr.filter(function(item) {
								if (!item.xuanzhong) {} else {
									return item
								}
							})
							n.specList = n.specList.filter(function(item) {
								if (!item.xuanzhong) {} else {
									return item
								}
							})
						}


					})
					// console.log(this.cartAttr, 8798754654345)
				} else if (options.dingdan == 2) {
					this.cartAttr.map(function(n) {
						n.cartAttr1 = {}
						var obj = {}
						n.cartAttr1.goodsNum = n.goodsNum
						n.cartAttr1.specKeyName = n.specKeyName
						n.cartAttr1.goodsLogo = n.goodsLogo
						n.cartAttr1.integral = n.integral
						n.cartAttr1.goodsName = n.goodsName
						n.cartAttr1.kuaidi = n.kuaidi
						n.cartAttr1.specKey = n.specKey
						n.cartAttr1.goodsPrice = n.goodsPrice
						n.cartAttr1.goodsId = n.goodsId
						n.cartAttr1.xuanzhong = n.xuanzhong
						n.cartAttr1.couponUse = n.couponUse
						n.cartAttr1.couponDJ = n.couponDJ
						n.cartAttr = [n.cartAttr1]
						_this.couponX = n.couponUse == 'Y' ? true : false

					})
					this.cartAttr[0].specList = this.cartAttr[0].cartAttr
					this.cartAttr.map(n => {
						n.specList[0].xuanzhong = true
					})

				}
				if (options.zhid) {
					this.dizhi = JSON.parse(options.zhid)
					this.z = 1
				}
				if (options.moneys) {
					this.moneys = options.money
					// this.countJM=this.moneys+this.commMoney
				}
				this.id = options.id
				this.dingdan = options.dingdan
				if (options.y && options.y != 'undefined') {
					this.youhui = JSON.parse(options.y)
				}
				if (!options.y) {
					this.cartAttr.map(function(n) {
						_this.youhui.push({
							shopId: n.shopId
						})
					})
				}
				var arr = []

				this.cartAttr.map(function(n) {
					// console.log(_this.cartAttr,'dsfhdskjafhsjkah',n)
					if (n.specList) {
						n.specList.map(function(z) {
							_this.yunfei += parseInt(z.kuaidi)
						})
					}
					//计算总价
					n.zongjia = 0
					if (n.specList) {
						n.specList.map(function(a) {
							n.zongjia += a.goodsPrice * a.goodsNum
						})
						n.zongjia = (Math.round(n.zongjia * 100) / 100)
					}
				})
				this.cartAttr.map(function(n) {
					if (n.cartAttr) {
						n.cartAttr.map(function(z) {
							_this.shangpin = _this.$numAdd(_this.shangpin,_this.$numMul(z.goodsPrice ,z.goodsNum) ) 
						})
						_this.shangpin = (Math.round(_this.shangpin * 100) / 100)
					}
					_this.moneys += +(n.moneys ? n.moneys : 0)
					// _this.countJM=this.moneys+this.commMoney
				})
				if (options.shopId) {
					this.shopId = options.shopId
					//判断选的哪个店铺的优惠券
					this.cartAttr.map(function(n, index) {
						if (options.shopId == n.shopId) {
							_this.youhui[index].couponId = options.id
							_this.youhui[index].moneys = options.money
						}
					})
				}
			}
			if (!options.zhid) {
				//获取地址列表
				this.$https({
					url: '/api/user/my-address',
					data: {},
					success: function(res) {
						_this.z = res.data.data.length > 0
						var isDzhi = false
						res.data.data.map(function(n) {
							if (n.isDefault == 1) {
								//默认地址
								isDzhi = true
								_this.dizhi = n
							}
						})
						if (!isDzhi) {
							_this.dizhi = res.data.data[0]
						}
					}
				})
			}
			//计算运费

			// console.log(this.cartAttr, 4564654657468787898)
			// this.cartAttr.map(function(z) {
			// 	_this.moneys += +(z.moneys ? z.moneys : 0)
			// })
			this.heji = (+this.yunfei) + (+this.shangpin) - this.moneys - this.commMoney
			this.countJM = this.moneys + this.commMoney
		},
		onShow: function() {
			//更新收货地址
			// this.$https({
			// 	url: '/api/user/my-address',
			// 	data: {},
			// 	success: res => {
			// 		if (res.data.data.length == 0) {
			// 			this.dizhi = {}
			// 			this.z = false
			// 		}
			// 	}
			// })
			this.$https({
				url: '/api/user/my-address',
				data: {},
				success: (res) => {
					this.z = res.data.data.length > 0
					var isDzhi = false
					res.data.data.map((n) => {
						if (n.isDefault == 1) {
							//默认地址
							isDzhi = true
							this.dizhi = n
						}
					})
					if (!isDzhi) {
						this.dizhi = res.data.data[0]
					}
				}
			})
		},
		methods: {
			pingtai() {
				var obj = {}
				let _this = this,
					jine = 0,
					jineTwo = 0
				if (this.dingdan == 2) {
					this.cartAttr[0].goodsNum = this.cartAttr[0].cartAttr[0].goodsNum
					obj.jine = this.cartAttr[0].zongjia
					obj.index = 0
					obj.couponUse = this.cartAttr[0].cartAttr[0].couponUse
					obj.couponDJ = this.cartAttr[0].cartAttr[0].couponDJ

				} else if (this.dingdan == 1) {
					var arr = [],
						arr2 = [],
						goods = [],
						goods2 = []
					this.cartAttr.map(function(val, x) {
						val.specList.map(function(v, i) {
							console.log(v)
							if (v.couponUse == 'Y') {
								var objs = {}
								jine += v.goodsNum * v.goodsPrice
								objs.fIndex = x
								objs.index = i
								goods.push(v.goodsId)
								if (v.couponDJ == 'Y') {
									var obj = {}
									jineTwo += v.goodsNum * v.goodsPrice
									obj.fIndex = x
									obj.index = i
									goods2.push(v.goodsId)
									arr2.push(obj)
								}
							}
							arr.push(objs)
							console.log(v, 888898998798, jine)
						})
					})
					console.log(arr, goods, arr2, goods2)
					obj.jine = (Math.round(jine * 100) / 100)
					obj.jineTwo = (Math.round(jineTwo * 100) / 100)
					obj.useId = goods
					obj.userIndex = arr
					obj.dieJId = goods2
					obj.dieJIndex = arr2
				}
				uni.navigateTo({
					url: '../../user/sale/newSale/newSale?dingdan=' + this.dingdan + '&obj=' + JSON
						.stringify(obj)
				})



			},

			tanchuang: function() {
				if (!this.z) {
					uni.showToast({
						title: '请选择收货地址',
						icon: 'none'
					})
					return false
				}
				if (!this.orderType) {
					uni.showToast({
						title: '订单已提交请勿重复提交',
						icon: 'none'
					})
					return false
				}
				let _this = this
				var orderVoList = [],
					shopIds = [],
					commCouponVO = {}
				this.cartAttr.map(function(item, index) {
					// 如果有cartAttr说明数组是被选中数组
					if (item.cartAttr) {
						var goodsIds = []
						var obj = {}
						obj.cartVO = {}
						obj.cartVO.cartAttr = []
						obj.couponVO = {}
						var arrs = []
						item.specList.map(function(val, i) {
							console.log(val)
							var objs = {}
							goodsIds.push(val.goodsId)
							obj.cartVO.goodsId = val.goodsId
							obj.cartVO.myCode = val.myCode
							obj.cartVO.shopId = item.shopId
							obj.cartVO.status = 'a'
							objs.goodsNum = val.goodsNum
							objs.specKey = val.specKey
							obj.cartVO.cartAttr.push(objs)
							if (val.couponUse) {
								arrs.push(val.goodsId)
							}
						})
						obj.couponId = item.couponId ? item.couponId : null
						obj.couponVO.couponId = item.couponId ? item.couponId : null
						obj.couponVO.goodsIds = item.couponId ? arrs.join(',') : null
						obj.shopId = item.shopId
						obj.userNote = item.userNote ? item.userNote : null
						obj.goodsIds = goodsIds.join(',')
						orderVoList.push(obj)


					}
					shopIds.push(item.shopId)
				})
				shopIds = shopIds.join(',')
				commCouponVO.commCouponId = this.commCouponId ? this.commCouponId : null
				commCouponVO.goodsIds = this.commCouponId ? (this.dingdan == 2 ? orderVoList.goodsId : this.couArr.join(',')) : null
				console.log(orderVoList, commCouponVO)
				//提交订单
				this.$https({
					url: '/api/shop/order-order-submitOrder',
					data: JSON.stringify({
						commCouponVO:commCouponVO,
						addressId: '' + this.dizhi.id,
						orderVoList: orderVoList,
						orderFrom: +this.dingdan,
						shopIds: shopIds,
						myCode: this.yao

					}),
					method: 'post',
					haeder: true,
					success: function(res) {
						_this.orderType = false
						if (res.data.code != 0) {
							uni.showToast({
								title: res.data.message,
								icon: 'none'
							})
						}
						if (_this.index == 0) {
							_this.$https({
								url: '/api/pay/unifiedOrder',
								data: JSON.stringify({
									orderNo: res.data.data[0],
									payMethod: 1
								}),
								method: 'post',
								haeder: true,
								success: function(res) {
									var obj = {}
									obj.appid = res.data.data.appId
									obj.partnerid = res.data.data.partnerId
									obj.prepayid = res.data.data.prepayId
									obj.package = res.data.data.packageValue
									obj.noncestr = res.data.data.nonceStr
									obj.timestamp = res.data.data.timeStamp
									obj.sign = res.data.data.sign
									uni.requestPayment({
										provider: 'wxpay',
										orderInfo: obj,
										success: function(res) {
											_this.$https({
												url: '/api/user/order-list',
												data: {
													status: 2
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
													status: 1
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
									orderNo: res.data.data[0],
									payMethod: 4
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
													status: 2
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
													status: 1
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
				// uni.showModal({
				// 	title: '支付成功',
				// 	content: '您已成功购买该商品\n感谢您的支持',
				// 	success: function(res) {
				// 		if (res.confirm) {
				// 			console.log('用户点击确定');
				// 		} else if (res.cancel) {
				// 			console.log('用户点击取消');
				// 		}
				// 	},




				// });
			},

			countYF() {
				var _this = this
				this.moneys = 0
				this.cartAttr.map(function(z, index) {
					if (z.money) {
						_this.moneys += z.money
					}
				})
				this.jisuanjine()
			},


			tiaozhuan: function() {
				if (this.dingdan == 2) {
					this.cartAttr[0].goodsNum = this.cartAttr[0].cartAttr[0].goodsNum
				}
				uni.navigateTo({
					url: '../../user/leagu/siteList/address?goodsId=' + this.goodsId + '&cartAttr=' + JSON
						.stringify({
							cartAttr: this.cartAttr
						}) + '&zhid=' + JSON.stringify(this.dizhi) + '&id=' + this.id + '&money=' + this
						.moneys + '&dingdan=' + this.dingdan +
						'&shopId=' + this.shopId + '&y=' + JSON.stringify(this.youhui)
				})
			},
			qiehuandizhi: function() {
				if (this.dingdan == 2) {
					this.cartAttr[0].goodsNum = this.cartAttr[0].cartAttr[0].goodsNum
				}
				//填充信息
				uni.navigateTo({
					url: '../../user/leagu/siteList/siteList?goodsId=' + this.goodsId + '&cartAttr=' + JSON
						.stringify({
							cartAttr: this.cartAttr
						}) + '&zhid=' + JSON.stringify(this.dizhi) + '&id=' + this.id + '&money=' + this
						.moneys + '&dingdan=' + this.dingdan +
						'&shopId=' + this.shopId + '&y=' + JSON.stringify(this.youhui)
				})
			},
			youhuiquan: function(id, pri, num) {

				var obj = {},
					_this = this,
					jine = 0
				if (this.dingdan == 2) {
					this.cartAttr[0].goodsNum = this.cartAttr[0].cartAttr[0].goodsNum
					obj.jine = pri
					obj.index = num
					obj.couponUse = this.cartAttr[0].cartAttr[0].couponUse
					obj.couponDJ = this.cartAttr[0].cartAttr[0].couponDJ
					uni.navigateTo({
						url: '../../user/sale/sale?shopId=' + id + '&dingdan=' + this.dingdan + '&obj=' + JSON
							.stringify(obj)
					})
				} else if (this.dingdan == 1) {
					var isDj = false
					this.cartAttr[num].specList.map(function(v, i) {
						if (v.couponUse == 'Y') {
							jine += v.goodsNum * v.goodsPrice
						}
						if (v.couponDJ == "Y") {
							isDj = true
						}
					})
					obj.jine = (Math.round(jine * 100) / 100)
					obj.index = num
					obj.isDJ = isDj
					obj.isEnough = this.isEnough
				}
				uni.navigateTo({
					url: '../../user/sale/sale?shopId=' + id + '&dingdan=' + this.dingdan + '&obj=' + JSON
						.stringify(obj)
				})
			},
			shangpinj: function(index, indexs) {
				if (this.cartAttr[index].cartAttr[indexs].goodsNum > 1) {
					this.cartAttr[index].cartAttr[indexs].goodsNum--
					this.jisuanjine()
				}
			},
			zengjia: function(index, indexs) {
				this.cartAttr[index].cartAttr[indexs].goodsNum++
				this.jisuanjine()
			},
			shuzi: function() {
				this.shangpin = 0
				var _this = this
				this.cartAttr.map(function(z) {
					z.cartAttr.map(function(x) {
						_this.shangpin += x.goodsPrice * x.goodsNum
					})
				})
				this.heji = this.yunfei + this.shangpin - this.countJM
			},
			jisuanjine: function() {
				var _this = this
				_this.shangpin = 0
				this.cartAttr.map(function(n) {
					n.cartAttr.map(function(z) {
						// console.log(z)
						_this.shangpin += z.goodsPrice * z.goodsNum
					})
				})
				this.countJM = this.moneys + this.commMoney
				this.heji = this.yunfei + this.shangpin - this.countJM
			},
			xuanze: function(e) {
				this.index = e.detail.value
			},
			feiqi() {
				var arr = []
				var _this = this
				this.cartAttr.map(function(n) {
					var a = []
					n.cartVO = {}
					n.cartVO.cartAttr = []
					if (n.specList) {
						n.specList.map(function(z) {
							if (z.xuanzhong) {
								var obj = {}
								obj.goodsNum = z.goodsNum
								obj.specKey = z.specKey
								n.cartVO.cartAttr.push(obj)
							}
						})
					}
					n.cartVO.goodsId = n.goodsId
					n.cartVO.shopId = n.shopId
					n.cartVO.status = 'a'
					_this.youhui.map(function(s) {
						if (s.shopId == n.shopId) {
							n.couponId = s.couponId
						}
					})
					if (n.specList) {
						n.specList.map(function(n) {
							if (n.xuanzhong) {
								a.push(n.goodsId)
							}
						})
					}
					n.goodsIds = a.join(',')
				})
				var dingdan = []
				dingdan = this.cartAttr
				dingdan.map((n, index) => {
					var list = []
					if (n.specList) {
						n.specList.map(z => {
							if (z.xuanzhong) {
								list.push(z)
							}
						})
					}
					n.specList = list
				})
				var as = []
				console.log(dingdan)
				dingdan.map((n, index) => {
					n.specList.map(z => {
						if (z.xuanzhong) {
							as.push(n)
						}
					})
				})
				this.cartAttr.map(function(n) {
					arr.push(n.shopId)
					n.specList.map(x => {
						if (x.xuanzhong) {
							arr.push(n.shopId)
						}
					})
				})
				var arr = arr.join(',')
			},
		}
	}
</script>

<style lang="scss">
	.shop-list {
		margin-bottom: 20rpx;
		background-color: #fff;
		padding: 25rpx 25rpx 0 25rpx;
		box-sizing: border-box;

	}

	page {
		background-color: #fafafa;
	}

	.noneBox {
		width: 250upx;
		text-align: center;
		margin: 20rpx auto;
		padding-top: 20upx;
		padding-bottom: 40upx;
		padding-bottom: 20upx;

		text {
			display: block;
			border: 1px solid #007AFF;
			color: #007AFF;
			background-color: #fff;
			padding: 15upx 20upx;
			font-size: 26upx;
			border-radius: 10upx;
			margin-bottom: 20upx;
		}
	}

	.siteBox {
		width: 100%;
		// height: initial;
		padding: 20upx;
		background-color: #fff;
		overflow: hidden;
		border-bottom: 1px solid #e5e5e5;
		border-top: 1px solid #e5e5e5;
		box-sizing: border-box;

		.addBox {
			overflow: hidden;

		}

		.imgBox {
			overflow: hidden;
			float: right;
			padding-top: 20rpx;
			padding-left: 30rpx;
			padding-bottom: 20rpx;

			image {
				width: 6px;
				height: 10px;
				display: block;
			}
		}

		.content {
			float: left;
			width: 80%;
			overflow: hidden;

			.nome {
				float: left;
				font-size: 30upx;
				color: #333;
				padding-right: 20upx;
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

			.p {
				font-size: 26upx;
				color: #333;
				line-height: 47upx;
				display: block;
			}
		}
	}

	.xinxi {
		overflow: hidden;

		width: 100%;
		box-sizing: border-box;
		// border-bottom: 1px dotted #ccc;
		margin: 0 auto;

		.biaoyi {
			text {
				font-size: 28upx;
			}
		}

		.biaot {
			border: none;
			margin-bottom: 0;
			font-size: 28rpx;
			background-color: #fff;
			padding: 0 25rpx;
			padding-top: 30rpx;

		}


		.box-content {
			width: 100%;
			box-sizing: border-box;
			overflow: hidden;
			// padding-bottom: 30rpx;
		}

		.box-content:last-child {
			border-bottom: 1rpx dashed #bfbfbf;
		}

		.imgBox_a {
			float: left;

			image {
				width: 200upx;
				height: 200upx;
				display: block;
			}
		}

		.txt_c {
			float: left;
			width: calc(100% - 200rpx);
			padding-left: 20upx;
			box-sizing: border-box;
			position: relative;
			min-height: 200rpx;

			.title {
				padding-top: 10upx;

				text {
					font-size: 30rpx;
					line-height: 40rpx;
					color: #333;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					font-size: 26rpx;
				}
			}

			.spec {
				font-size: 22upx;
				line-height: 32upx;
				color: #666;

				text {
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
				}

				margin-bottom: 10rpx;

			}

			.box-bottom {
				position: absolute;
				bottom: 0;
				overflow: hidden;
				width: calc(100% - 20rpx);
				line-height: 40rpx;

				.order-price {
					float: left;
					color: #ff6600;
					font-size: 26rpx;
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
						width: 50px;
						border-left: 1rpx solid #ececec;
						border-right: 1rpx solid #ececec;
						float: left;
						height: 40rpx;
						line-height: 40rpx;
						text-align: center;
						font-size: 18rpx;
						color: #979797;
					}
				}

			}

			.radColor {
				float: left;
				color: #ff0000;
				font-size: 32upx;
			}
		}
	}

	.mar-buttom {
		margin-bottom: 20rpx;
		width: 100%;
		box-sizing: border-box;
		padding: 0 25rpx;
		background-color: #fff;
	}

	.basic {
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

	.uni-column {
		background-color: #fff;
		overflow: hidden;

		.title {
			padding-left: 20upx;

			text {
				line-height: 90upx;
				font-size: 28upx;
			}
		}

		.uni-input {
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
		border-bottom: 1rpx dashed #bfbfbf;
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
		z-index: 99999;
		padding: 0 15rpx;
		box-sizing: border-box;

		.leftA {
			float: left;
			padding-left: 20upx;

			.ppp {
				float: left;

				text {
					font-size: 28upx;
					color: #333;
					line-height: 90upx;

					text {
						font-size: 28upx;
						color: #ff6600;
					}

				}
			}

			.yunf {
				float: left;
				padding-left: 10upx;

				text {
					line-height: 90upx;
					font-size: 24upx;
					color: #999;
				}
			}

		}

		.rightA {
			float: right;
			width: 200upx;
			height: 69rpx;
			text-align: center;
			background-color: #2b5cff;
			border-radius: 50rpx;
			line-height: 69rpx;
			margin-top: 20rpx;
			margin-right: 20rpx;

			text {
				font-size: 28upx;
				color: #fff;
				display: block;

			}
		}
	}
</style>
