<template>
	<view>
		<!-- 头部 -->
		<!-- #ifndef H5 -->
		<view class="top">
			<view class='back' @tap='back'>
				<image src='../../../static/icon_26-2.png'></image>
			</view>
			<view class="textBox">
				<input class="uni-input" v-model="searchVal" placeholder="请输入关键字" />
			</view>
			<view class="imgBox" @tap='searchOrder'>
				<image src="../../../static/icon_10.png" mode=""></image>
			</view>
		</view>
		<!-- #endif -->

		<!-- 状态栏 -->
		<view class="topBox" v-if="!isSearch"
			style='position:fixed;top:170rpx;left:0;width:100%;background:#fff;padding-top:20rpx;z-index:99999;'>
			<!-- 选中样式 -->
			<view class="none on" @tap="toggle(0)">
				<view class="ontext">
					<text>全部</text>
				</view>
				<view class="onimg" v-if="id==0">
					<image src="../../../static/icon_09.png" mode=""></image>
				</view>
			</view>
			<!-- 默认样式 -->
			<view class="none" @tap="toggle(1)">
				<view class="ontext">
					<text>待付款</text>
				</view>
				<view class="onimg" v-if="id==1">
					<image src="../../../static/icon_09.png" mode=""></image>
				</view>
			</view>
			<view class="none" @tap="toggle(2)">
				<view class="ontext">
					<text>待发货</text>
				</view>
				<view class="onimg" v-if="id==2">
					<image src="../../../static/icon_09.png" mode=""></image>
				</view>
			</view>
			<view class="none" @tap="toggle(3)">
				<view class="ontext">
					<text>待收货</text>
				</view>
				<view class="onimg" v-if="id==3">
					<image src="../../../static/icon_09.png" mode=""></image>
				</view>
			</view>
			<view class="none" @tap="toggle(4)">
				<view class="ontext">
					<text>待评价</text>
				</view>
				<view class="onimg" v-if="id==4">
					<image src="../../../static/icon_09.png" mode=""></image>
				</view>
			</view>
		</view>
		<view :style="isSearch?'height:200rpx':'height:240rpx'"></view>
		<view v-if='dList.length==0' @tap='tiaozhuan'>
			<image src='../../../static/d.png' style='width:283rpx;height:184rpx;display:block;margin:50rpx auto;'>
			</image>
			<view style='text-align:center;'>{{!isSearch?'您还未有订单,去逛逛':'暂无相关订单,去逛逛'}}</view>
		</view>
		<!-- 订单信息 -->
		<view class="listBox" v-for="(item,index) in dList">
			<view class="radios">
				<!-- 店铺名称待确认 -->
				<text>{{item.orderType==1?'积分商城':(item.storeShopDTO.shopName?item.storeShopDTO.shopName:'')}}</text>
				<view class="guanb">
					<!-- :item.status==3?'退货中':item.status==4?'退货完成' -->
					<text>{{item.status==0?'待付款':item.status==1?'待发货':item.status==2?'待收货':item.status==4?'交易关闭':item.status==5?'交易完成':item.status==6?'交易完成':item.status==7?'交易关闭':''}}</text>
				</view>
			</view>
			<view class="xinxi_box">
				<view class="xinxi" v-for="(ite,inde) in item.goodsList">
					<view class="xinxi1" @tap="detail(item.orderId,item.status)" v-for="(i,n) in ite.specList">
						<view class="imgBox_a">
							<image :src="ite.goodsLogo" mode=""></image>
						</view>
						<view class="txt_c">
							<view class="title">
								<text>{{ite.goodsName}}</text>
							</view>
							<view class="spec" v-if="i.specKeyName">
								<text>已选：＂{{i.specKeyName}}＂</text>
							</view>
							<view class="xi_butt">
								<view class="radColor">
									<text>{{item.orderType==1?(item.integral+'积分'+(i.goodsPrice?'+￥'+i.goodsPrice.toFixed(2):'')):(i.goodsPrice?'￥'+i.goodsPrice.toFixed(2):'0')}}</text>
								</view>
								<view class="isSale" v-if="i.isSend!=0">
									{{i.isSend==1?'售后申请中':'售后完成'}}
								</view>
								<!-- 数量 -->
								<view class="jia">
									<text>X{{i.goodsNum}}</text>
								</view>
							</view>

						</view>

					</view>
				</view>
				<view class="zongj">
					<text v-if="(item.orderType==0)">{{item.countNum}}种货品</text><text style="padding-left: 15rpx;"
						v-if="(item.orderType==0)">总金额：{{item.orderAmount?'￥'+item.orderAmount.toFixed(2):'0'}}</text>
					<text v-if="(item.orderType==0)" style="font-size: 30rpx;font-weight: bold;padding-left: 15rpx;">
						{{item.status==0?'需付款':'实付款'}}：{{item.totalAmount?'￥'+item.totalAmount.toFixed(2):'0'}}</text>

					<text v-if="(item.orderType==1)">{{item.countNum}}种货品 积分抵扣：{{item.integralMoney+'积分'}}</text>
					<text v-if="(item.orderType==1)" style="font-size: 30rpx;font-weight: bold;padding-left: 15rpx;">
						{{item.status==0?'需付款':'实付款'}}：{{item.totalAmount?'￥'+item.totalAmount.toFixed(2):'0'}}
					</text>



				</view>
				<view class="bottBox">
					<!-- v-if="(item.orderType==0&&item.status!=1)||(item.orderType==1&&item.status!=5&&item.status!=1)" -->
					<view class="uni-padding-wrap uni-common-mt bott onnb" v-if="item.status==2"
						@tap="confirm(item.orderId)">
						<button type="primary">确认收货</button>
					</view>
					<view class="uni-padding-wrap uni-common-mt bott" v-if="id==0&&(item.orderStatus!=0)"
						@tap='xianshi(item.orderId,1)'>
						<button type="primary">删除订单</button>
					</view>
					<view class="uni-padding-wrap uni-common-mt bott onna"
						v-if="(item.status==5&&item.orderStatus==1&&item.orderType!=1)"
						@tap="goPing(item.orderSn,item.orderId,item.goodsList)">

						<button type="primary">去评价</button>
					</view>
					<!-- <view class="uni-padding-wrap uni-common-mt bott" v-if="item.orderStatus==1">
								<button type="primary">再次购买</button>
							</view> -->
					<!-- <view class="uni-padding-wrap uni-common-mt bott" v-if="item.orderStatus==2">
								<button type="primary">追加评论</button>
							</view> -->
					<view class="uni-padding-wrap uni-common-mt bott onna" v-if="item.status==0&&item.orderStatus!=3"
						@tap="zfChange(item.orderSn,item.orderType)">
						<!-- @tap="zhifu(item.orderSn,item.payMethod)" -->
						<button type="primary">去支付</button>
					</view>
					<view class="uni-padding-wrap uni-common-mt bott" v-if="item.status==7">
						<button type="primary">已取消</button>
					</view>
					<!-- 需要添加取消订单的接口 -->
					<view class="uni-padding-wrap uni-common-mt bott" @tap='xianshi(item.orderId,4)'
						v-if="item.status==0">
						<button type="primary">取消订单</button>
					</view>
					<view class="uni-padding-wrap uni-common-mt bott" v-if="item.status==2"
						@tap="wuliu(item.shippingCode,item.orderSn,item.shippingName,item.cityInfo+item.address,item.goodsList)">
						<button type="primary">查看物流</button>
					</view>

				</view>


			</view>

		</view>


		<view class="del-mask" v-if='shanchu' style="z-index: 9999999;">
			<view class="del-mask-content">
				<view class="mask-title">您确定{{isType==1?'删除':'取消'}}订单?</view>
				<view class="mask-bot">
					<view class="bot-left" @tap='quxiao'>取消</view>
					<view class="bot-right" @tap='shanchuDD'>确定</view>
				</view>
			</view>
		</view>
		<!-- 弹出框内容 -->
		<uni-popup ref="popup" type="bottom" class="tanchu">
			<button @click="closePopup">×</button>
			<view class="neira">
				<view class="text_uo">
					<view class="tit_box">
						<text>选择退款原因</text>
					</view>
					<view class="li_box" v-for="(i , n) in 5">
						<text>质量问题</text>
						<view class="radioss">
							<radio value="r2" />
						</view>
					</view>
				</view>
				<view class="uni-padding-wrap uni-common-mt bottaaa">
					<button type="primary">确定</button>
				</view>
			</view>
		</uni-popup>
		<view class="mask-type" v-if="isZf">
			<view class="mask-cont">
				<view class="mask-bot">
					<view class="" @tap="zfCom">
						取消
					</view>
					<view class="" @tap="zhiCam">
						确认
					</view>
				</view>
				<view class="mask-item">
					<picker-view :value="value" @change="bindChange" class="picker-view">
						<picker-view-column>
							<view v-for="(item,index) in zhifu" :key="index">{{zhifu[index]}}</view>
						</picker-view-column>
					</picker-view>
				</view>
			</view>
		</view>

		<text class="loading-text" v-if='dList.length>9'>
			{{loadingType === 0 ? contentText.contentdown : loadingType === 1 ? contentText.contentrefresh : contentText.contentnomore}}
		</text>
	</view>
</template>

<script>
	import tabBar from '@/components/tabBar/tabBar.vue';
	// 弹出层
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default {
		data() {
			return {
				currentPage: 'cart',
				id: '',
				dList: [],
				// 上拉加载
				loadingType: 0,
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				page: 1,
				as: 1,
				shanchu: false,
				orderId: '',
				qiandao: {},
				searchVal: '',
				isSearch: false,
				zhifu: ['微信支付', '支付宝'],
				index: 0,
				isZf: false,
				orderSn: '',
				// payMeth:'',
				orderType: '',
				isType: ''
			}
		},
		components: {
			tabBar,
			uniPopup
		},
		onLoad(option) {
			var _this = this
			this.id = option.id
		
			// // 上拉加载
			console.log(option)
			if (option.taskId) {
				this.qiandao.taskId = option.taskId
				this.qiandao.isRen = option.isRen
				this.qiandao.taskType = option.taskType
			}else{
				this.qiandao=''
			}
			console.log(this.qiandao)
			var data = {
				status: this.id,
				page: this.page,
				limit: 10,
				searchValue: this.searchVal
			}
			this.getListInfo(data);
		},
		onShow: function() {
			this.as = 2
			this.page = 1
			// if (this.isSearch) {
			// 	this.page = 1
			// }
			var data = {
				status: this.isSearch ? 0 : this.id,
				page: this.page,
				limit: 10,
				searchValue: this.searchVal
			}
			this.getListInfo(data);
			uni.pageScrollTo({
				scrollTop: 0,
			});
		},
		onReachBottom: function() {
			// var _this = this
			// _this.page++; //每触底一次 page +1
			// var limit = _this.page * 10
			// // console.log(_this.hotRecommendlist.length);
			// if (_this.loadingType != 0) { //loadingType!=0;直接返回
			// 	return false;
			// }
			// _this.loadingType = 1;
			// // console.log(page);
			// uni.showNavigationBarLoading(); //显示加载动画
			// this.$https({
			// 	url: '/api/user/order-list',
			// 	dengl: false,
			// 	data: {
			// 		status: _this.id,
			// 		limit: limit
			// 	},
			// 	success: function(res) {
			// 		_this.dList = res.data.data
			// 		if (_this.dList.length < limit) { //没有数据
			// 			// console.log(limit)
			// 			_this.loadingType = 2;
			// 			uni.hideNavigationBarLoading(); //关闭加载动画
			// 		} else {
			// 			_this.loadingType = 0; //将loadingType归0重	
			// 		}
			// 		uni.hideNavigationBarLoading(); //关闭加载动画

			// 	}
			// });
			var data = {
				status: this.isSearch ? 0 : this.id,
				page: this.page + 1,
				limit: 10,
				searchValue: this.searchVal
			}
			this.getMoreListInfo(data)

		},
		onPullDownRefresh: function() {
			this.page = 1
			var data = {
				status: this.isSearch ? 0 : this.id,
				page: this.page,
				limit: 10,
				searchValue: this.searchVal
			}
			this.getListInfo(data);
			// this.getListInfo()
		},
		methods: {
			xianshi: function(id, isType) {
				this.shanchu = true
				this.isType = isType
				this.orderId = id
			},
			canfirmOrd: function() {
				var that = this
				this.$https({
					url: '/api/user/order-handle',
					data: JSON.stringify({
						orderId: that.orderId,
						type: that.isType
					}),
					method: 'post',
					haeder: true,
					success: res => {
						// if(res.data)
						if (res.data.code == 0) {
							uni.showToast({
								title: res.data.message
							})
							var data = {
								status: this.id,
								page: this.page,
								limit: 10,
								searchValue: this.searchVal
							}

							this.getListInfo(data);
						} else {
							uni.showToast({
								title: res.data.message ? res.data.message : '操作失败',
								icon: "none"
							})
						}

					}
				})
			},
			zfChange: function(orderSn, orderType) {
				this.orderSn = orderSn
				// this.payMeth=payMeth
				this.orderType = orderType
				this.zfCom()
				console.log(this.orderSn, this.orderType)
			},
			zfCom: function() {
				this.isZf = !this.isZf
			},
			bindChange(e) {
				this.index = e.detail.value[0]
				// this.payMeth=index
			},
			quxiao: function() {
				this.shanchu = false
			},
			getNewsList: function() { //第一次回去数据
				var _this = this;
				var page = 1
				_this.loadingType = 0;
				uni.showNavigationBarLoading();
				this.$https({
					url: '/api/user/order-list',
					data: {
						status: this.isSearch ? 0 : this.id,
						page: this.page,
						limit: 10,
						searchValue: this.searchVal
					},
					dengl: false,
					success: function(res) {
						if (res.data.data) {
							res.data.data.map(function(z) {
								var count = 0
								if (z.goodsList) {
									z.goodsList.map(function(x) {
										if (x.specList) {
											x.specList.map(function(v) {
												count += v.goodsNum
											})
										}
									})
									z.countNum = count
								}
							})
						}
						_this.dList = res.data.data
						// _this.toggle(_this.id)
						if (res.data.code == 0) {
							if (_this.as == 1)
								uni.showToast({
									title: '已是最新',
									duration: 2000
								});
						} else {
							uni.showToast({
								title: res.data.message
							})
							_this.dList = []
						}
						uni.hideNavigationBarLoading(); //关闭加载动画
						uni.stopPullDownRefresh();
					}

				})
			},

			getListInfo: function(data) {
				var that = this;
				this.page = 1
				this.$https({
					url: '/api/user/order-list',
					dengl: false,
					data: data,
					success(res) {
						if (res.data.data) {
							res.data.data.map(function(z) {
								var count = 0
								if (z.goodsList) {
									z.goodsList.map(function(x) {
										if (x.specList) {
											x.specList.map(function(v) {
												count += v.goodsNum
											})
										}
									})
									z.countNum = count
								}
							})
						}
						that.dList = res.data.data
						console.log(that.dList, 888)
						uni.hideNavigationBarLoading();
						uni.stopPullDownRefresh(); //得到数据后停止下拉刷新
					}
				})
			},
			/* 上拉加载 */
			getMoreListInfo(data) {
				var that = this
				this.page++

				if (that.loadingType != 0) {
					return false; //loadingType!=0;直接返回
				}
				that.loadingType = 1;
				uni.showNavigationBarLoading();
				this.$https({
					url: '/api/user/order-list',
					dengl: false,
					data: data,
					success(res) {
						if (res.data.data < 10 || res.data.data == 'null') { //当之前的数据长度等于count时跳出函数，不继续执行下面语句
							that.loadingType = 2;
							uni.hideNavigationBarLoading(); //关闭加载动画
							return false;
						}
						if (res.data.data) {
							res.data.data.map(function(z) {
								var count = 0
								if (z.goodsList) {
									z.goodsList.map(function(x) {
										if (x.specList) {
											x.specList.map(function(v) {
												count += v.goodsNum
											})
										}
									})
									z.countNum = count
								}
							})
						}
						that.dList = that.dList.concat(res.data.data)
						that.loadingType = 0; //将loadingType归0重置
						uni.hideNavigationBarLoading(); //关闭加载动画
					}
				})
			},

			confirm(orderId) {
				var _this = this
				this.$https({
					url: '/api/user/order-handle',
					dengl: false,
					method: 'post',
					haeder: true,
					data: JSON.stringify({
						orderId: orderId,
						type: 2
					}),
					success: function(res) {
						if (res.data.code == 0) {
							uni.showToast({
								title: '收货成功',
							})
							_this.getNewsList()
						} else {
							uni.showToast({
								title: '操作失败',
								icon: 'none',
								duration: 2000
							})
						}

					}
				})
			},
			select() {
				// console.log(1)

			},
			openPopup() {
				this.$refs.popup.open()
			},
			closePopup() {
				this.$refs.popup.close()
			},
			openPopup1: function() {
				var that = this
				this.$https({
					url: '/api/user/order-handle',
					data: JSON.stringify({
						orderId: that.orderId,
						type: that.isType
					}),
					method: 'post',
					haeder: true,
					success: res => {
						if (res.data.code == 0) {
							uni.showToast({
								title: res.data.message,
							})
							this.page = 1
							var data = {
								status: this.isSearch ? 0 : this.id,
								page: this.page,
								limit: 10,
								searchValue: this.searchVal
							}

							this.getListInfo(data);
							uni.pageScrollTo({
								scrollTop: 0,
							});

						} else {
							uni.showToast({
								title: res.data.message ? res.data.message : '操作失败',
								icon: 'none'
							})

						}

					}
				})
			},
			wuliu(code, order, com, dz, good) {
				uni.navigateTo({
					url: './deliver?code=' + code + '&order=' + order + '&com=' + com + '&dz=' + dz + '&goods=' +
						JSON.stringify(
							good)
				})
			},
			toggle(index) {
				var _this = this
				this.id = index
				this.page = 1
				var data = {
					status: this.id,
					page: this.page,
					limit: 10,
					searchValue: this.searchVal
				}
				uni.pageScrollTo({
					scrollTop: 0,
				});
				this.getListInfo(data);

			},
			goPing(orderSn, orderId, goodids) {
				if (this.qiandao) {
					uni.navigateTo({
						url: './evaluate?orderSn=' + orderSn + '&orderId=' + orderId + '&goodsId=' + goodids[0]
							.goodsId + '&taskId=' + this.qiandao.taskId + '&isRen=' + this.qiandao.isRen +
							'&taskType=' + this.qiandao.taskType
					})
				} else {
					uni.navigateTo({
						url: './evaluate?orderSn=' + orderSn + '&orderId=' + orderId + '&goodsId=' + goodids[0]
							.goodsId
					})
				}
			},
			searchOrder() {
				this.isSearch = true
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 100,
				});
				this.page = 1
				var data = {
					status: 0,
					page: this.page,
					limit: 10,
					searchValue: this.searchVal
				}
				this.getListInfo(data);
			},
			detail(id, t) {
				uni.navigateTo({
					url: './shipped?orderId=' + id + '&zhuangtai=' + t
				})
			},
			zhiCam() {
				var _this = this
				var orderNo = this.orderSn
				var payMeth = this.index == 0 ? (this.orderType == 0 ? 1 : 3) : (this.orderType == 0 ? 4 : 5)
				console.log(this.index, this.orderType, payMeth)
				// if (payMeth == )
				this.isZf = false

				if (payMeth == 1 || payMeth == 3) {
					_this.$https({
						url: '/api/pay/unifiedOrder',
						data: JSON.stringify({
							orderNo: orderNo,
							payMethod: payMeth
						}),
						method: 'post',
						dengl: false,
						haeder: true,
						success: function(res) {
							if (res.data.code == 0) {
								var obj = {}
								obj.appid = res.data.data.appId
								obj.partnerid = res.data.data.partnerId
								obj.prepayid = res.data.data.prepayId
								obj.package = res.data.data.packageValue
								obj.noncestr = res.data.data.nonceStr
								obj.timestamp = res.data.data.timeStamp
								obj.sign = res.data.data.sign
								console.log(res.data)
								uni.requestPayment({
									provider: 'wxpay',
									orderInfo: obj,
									success: function(res) {

									},
									fail: function(res) {}
								})
							} else {
								uni.showToast({
									title: '支付失败',
									icon: 'none',
									duration: 2000
								})
							}

						}
					})

				} else if (payMeth == 4 || payMeth == 5) {
					_this.$https({
						url: '/api/pay/ali/pay-unified-order',
						data: JSON.stringify({
							orderNo: orderNo,
							payMethod: payMeth
						}),
						haeder: true,
						method: 'post',
						success: res => {
							if (res.data.code == 0) {
								uni.requestPayment({
									provider: 'alipay',
									orderInfo: res.data.data.aliEncryptStr,
									success: res => {},
									fail: function(err) {}
								})
							} else {
								uni.showToast({
									title: '支付失败',
									icon: 'none',
									duration: 2000
								})
							}
						}
					})
				}


			},
			back: function() {
				if (this.isSearch) {
					this.isSearch = false
					this.searchVal = ''
					this.page = 1
					var data = {
						status: this.id,
						page: this.page,
						limit: 10,
						searchValue: this.searchVal
					}
					this.getListInfo(data)

				} else {
					uni.navigateBack({
						delta: 1
					})
				}

			},
			tiaozhuan: function() {
				uni.navigateTo({
					url: '../../classify/fenlOne'
				})
			},
			//删除订单
			shanchuDD: function(id) {
				this.openPopup1(id)
				this.shanchu = !this.shanchu
			}
		}
	}
</script>

<style lang="scss">
	.mask-type {
		position: fixed;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.3);
		z-index: 99999;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;

		.mask-cont {
			height: 500rpx;
			background: #fff;
			position: fixed;
			width: 100%;
			bottom: 0;
		}

		.mask-bot {
			height: 80rpx;
			line-height: 80rpx;
			background-color: #ddd;
			overflow: hidden;
			padding: 0 30rpx;

			>view {
				float: left;
			}
		}

		.mask-bot :last-child {
			float: right;
			color: #2b5cff;
		}

		.picker-view {
			height: 400rpx;
			width: 100%;
			text-align: center;
		}
	}

	.loading-text {
		display: block;

		text-align: center;
		margin-top: 100rpx;
	}

	page {
		background-color: #f7f7f7;
	}

	.listBox {
		background-color: #fff;
	}

	// .top {
	// 	width: 710upx;
	// 	padding: 20upx;
	// 	overflow: hidden;

	// 	.textBox {
	// 		float: left;
	// 		margin-left: 70upx;
	// 		background-color: #f0f0f0;
	// 		border-radius: 50upx;

	// 		input {
	// 			height: 60upx;
	// 			width: 520upx;
	// 			line-height: 60upx;
	// 			padding-left: 20upx;
	// 			font-size: 26upx;
	// 		}

	// 		.uni-input-placeholder {
	// 			color: #999 !important;
	// 		}

	// 	}

	// 	.imgBox {
	// 		padding-left: 30upx;
	// 		padding-right: 20upx;
	// 		padding-top: 10upx;
	// 		float: right;

	// 		image {
	// 			width: 44upx;
	// 			height: 39upx;
	// 		}
	// 	}

	// 	.uni-input-placeholder {
	// 		color: #999 !important;
	// 	}
	// }
	.top {

		box-sizing: border-box;
		width: 100%;
		background: #fff;
		position: fixed;
		top: 0rpx;
		z-index: 99999;
		left: 0;
		padding: 20rpx 0;
		padding-top: 90rpx !important;

		.textBox {
			float: left;
			margin-left: 25upx;
			background-color: #f0f0f0;
			border-radius: 50upx;
			width: calc(100% - 215rpx);
			box-sizing: border-box;

			input {
				height: 60upx;
				width: 520upx;
				line-height: 60upx;
				padding-left: 20upx;
				font-size: 26upx;
			}

			.uni-input-placeholder {
				color: #999 !important;
			}

		}

		.back {
			float: left;
			padding: 15rpx 36rpx;
			width: 90rpx;
			box-sizing: border-box;

			image {
				width: 18rpx;
				height: 32rpx;
			}
		}

		.imgBox {
			padding-left: 27upx;
			padding-right: 27upx;
			padding-top: 10upx;
			width: 90rpx;
			box-sizing: border-box;
			float: right;

			image {
				width: 36upx;
				height: 36upx;
			}
		}
	}


	.topBox {
		overflow: hidden;
		border-bottom: 1px solid #f0f0f0;

		.none {
			text-align: center;
			float: left;
			width: 150upx;

			.ontext {
				text {
					font-size: 30upx;
					color: #333;
				}
			}

			.onimg {
				padding-left: 60upx;
				padding-top: 15upx;

				image {
					display: block;
					width: 34upx;
					height: 6upx;
				}
			}
		}
	}

	.xinxi_box {
		padding: 20upx;
		border-bottom: 20upx solid #f7f7f7;
		overflow: hidden;

		width: 710upx;

		.zongj {
			float: right;
			padding-top: 10upx;

			text {
				font-size: 26upx;
				color: #333;
			}
		}

	}

	.xinxi {
		overflow: hidden;
		width: 710upx;

		.xinxi1 {
			overflow: hidden;
			width: 710upx;
			// padding: 20upx;
			border-bottom: 1upx dashed #f7f7f7;
		}


		.imgBox_a {
			float: left;
			margin-bottom: 20rpx;

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
			height: 200rpx;
			box-sizing: border-box;
			position: relative;

			.title {
				// padding-top: 10upx;

				text {
					font-size: 28upx;
					line-height: 45upx;
					color: #333;
					word-break: break-all;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
					overflow: hidden;
				}
			}


			.spec {
				font-size: 26upx;
				line-height: 40upx;
				color: #666;
				margin-top: 10rpx;
				word-break: break-all;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
			}

			.xi_butt {
				position: absolute;
				bottom: 0;
				width: 100%;
				box-sizing: border-box;
				padding: 0 20rpx;
				overflow: hidden;

				.isSale {
					font-size: 24rpx;
					color: #ff6600;
					/* float: left; */
					display: inline-block;
					vertical-align: middle;
					margin-left: 30rpx;
				}
			}

			.radColor {
				display: inline-block;
				vertical-align: middle;
				color: #ff0000;
				font-size: 32upx;

				// left: 20rpx;
			}

			.jia {
				float: right;
				// float: right;
				// position: absolute;
				bottom: 0;
				right: 20rpx;

				text {
					font-size: 20upx;
					color: #666;
				}
			}
		}
	}

	.radios {
		width: 710upx;
		padding: 20upx;
		overflow: hidden;
		padding-top: 10upx;
		overflow: hidden;
		border-bottom: 1px solid #f7f7f7;
		padding-bottom: 30rpx;

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
	}

	.guanb {
		float: right;

		text {
			font-size: 28upx;
			color: #ff0000;
		}
	}

	.bottBox {
		overflow: hidden;
		// width: 710upx;
		width: 100%;
		box-sizing: border-box;

		// padding: 20upx;
		// height: 50upx;
		.uni-padding-wrap {
			margin: 20rpx 0 10rpx 0;
		}

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

	.bottBox :first-child {
		margin-right: 0;
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
