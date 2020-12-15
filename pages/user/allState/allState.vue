<template>
	<view>
		<!-- 头部 -->
		<view class="top" style='width:100%;background:#fff;position:fixed;top:0rpx;z-index:99999;left:0;padding-top:60rpx;'>
			<view class='back' @tap='back' style='float:left;padding:10rpx 20rpx 15rpx 20rpx;'>
				<image src='../../../static/icon_26-2.png' style='width:18rpx;height:32rpx;'></image>
			</view>
			<view class="textBox">
				<input class="uni-input" placeholder="请输入关键字" />
			</view>
			<view class="imgBox" @tap="shopCar" style='margin-right:20rpx;'>
				<image src="../../../static/icon_43.png" mode=""></image>
			</view>
		</view>

		<!-- 状态栏 -->
		<view class="topBox" style='position:fixed;top:135rpx;left:0;width:100%;background:#fff;padding-top:20rpx;z-index:99999;'>
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
        <view style='height:200rpx;'></view>
		<view v-if='dList.length==0' @tap='tiaozhuan'>
			<image src='../../../static/d.png' style='width:283rpx;height:184rpx;display:block;margin:50rpx auto;'></image>
			<view style='text-align:center;'>您还未有订单,去逛逛</view>
		</view>
		<!-- 订单信息 -->
		<view class="listBox" v-for="(item,index) in dList">
			<view class="radios">
				<!-- 店铺名称待确认 -->
				<text>{{item.storeShopDTO.shopName}}</text>
				<view class="guanb">
					<text>{{item.status==0?'待付款':item.status==1?'已付款.待发货':item.status==2?'已发货.待收货':item.status==3?'退货中':item.status==4?'退货完成':item.status==5?'待评价':item.status==6?'已评价':''}}</text>
				</view>
			</view>
			<view class="xinxi" v-for="(ite,inde) in item.goodsList">
				<view class="xinxi1" @tap="detail(item.orderId,item.status)" v-for="(i,n) in ite.specList">
					<view class="imgBox_a">
						<image :src="ite.goodsLogo" mode=""></image>
					</view>
					<view class="txt_c">
						<view class="title">
							<text>{{ite.goodsName}}</text>
						</view>
						<view class="spec">
							<text>已选：＂{{i.specKeyName}}＂</text>
						</view>
						<view class="radColor">
							<text>{{i.goodsPrice?'￥'+i.goodsPrice+'.00':'0'}}</text>
						</view>

						<!-- 数量 -->
						<view class="jia">
							<text>X{{i.goodsNum}}</text>
						</view>
					</view>

				</view>
				<view class="zongj">
					<text>{{ite.specList.length}}种货品 总金额：{{item.orderAmount?'￥'+item.orderAmount+'.00':'0'}}</text>
				</view>
				<view class="bottBox">
					<view class="uni-padding-wrap uni-common-mt bott onnb" v-if="item.status==2" @tap="confirm(item.orderId)">
						<button type="primary">确认收货</button>
					</view>
					<view class="uni-padding-wrap uni-common-mt bott" v-if="item.status==0" @tap='shanchu(item.orderId)'>
						<button type="primary">删除订单</button>
					</view>
					<view class="uni-padding-wrap uni-common-mt bott onna" @tap="goPing(item.orderSn,item.orderId,item.goodsList)" v-if="item.status==5&&item.orderStatus==1">
						<button type="primary">去评价</button>
					</view>
					<!-- <view class="uni-padding-wrap uni-common-mt bott" v-if="item.orderStatus==1">
						<button type="primary">再次购买</button>
					</view> -->
					<view class="uni-padding-wrap uni-common-mt bott" v-if="item.orderStatus==2">
						<button type="primary">追加评论</button>
					</view>
					<view class="uni-padding-wrap uni-common-mt bott onna" v-if="item.payStatus==0" @tap="zhifu(item.orderSn)">
						<button type="primary">去支付</button>
					</view>
<!-- 					<view class="uni-padding-wrap uni-common-mt bott" @click="openPopup1(item.orderId)" v-if="item.payStatus==0">
						<button type="primary">取消订单</button>
					</view> -->
					<view class="uni-padding-wrap uni-common-mt bott" v-if="item.status==2" @tap="wuliu(item.shippingCode,item.orderSn,item.shippingName,item.cityInfo+item.address)">		
						<button type="primary">查看物流</button>
					</view>

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
				page: 1
			}
		},
		components: {
			tabBar,
			uniPopup
		},
		onLoad(option) {
			var _this = this
			this.id = option.id
			// this.$https({
			// 	url: '/api/user/order-list',
			// 	data: {
			// 		status: option.id
			// 	},
			// 	dengl: false,
			// 	success: function(res) {
			// 		_this.dList = res.data.data
			// 		// _this.gList=res.data.data
			// 		console.log(res.data.data)
			// 		_this.toggle(option.id)
			// 	}
			// })
			// // 上拉加载

			this.getNewsList();
		},
		onReachBottom: function() {
			var _this = this
			_this.page++; //每触底一次 page +1
			var page_num=_this.page*10
			// console.log(_this.hotRecommendlist.length);
			if (_this.loadingType != 0) { //loadingType!=0;直接返回
				return false;
			}
			_this.loadingType = 1;
			// console.log(page);
			uni.showNavigationBarLoading(); //显示加载动画
			this.$https({
				url: '/api/user/order-list',
				dengl:false,
				data: {
					status: _this.id,
					page_num:page_num
				},
				success: function(res) {
					_this.dList = res.data.data
					if (_this.dList.length<page_num) { //没有数据
					// console.log(page_num)
						_this.loadingType = 2;
						uni.hideNavigationBarLoading(); //关闭加载动画
					}else{
					_this.loadingType = 0; //将loadingType归0重	
					}
					uni.hideNavigationBarLoading(); //关闭加载动画

				}
			});

		},
		methods: {
			getNewsList: function() { //第一次回去数据
				var _this = this;
				_this.loadingType = 0;
				uni.showNavigationBarLoading();
				this.$https({
					url: '/api/user/order-list',
					data: {
						status: _this.id,
					},
					dengl: false,
					success: function(res) {
						_this.dList = res.data.data
						// _this.gList=res.data.data
						console.log(res.data.data.length)
						console.log(res.data.data)
						_this.toggle(_this.id)
						if (res.data.data.length < 10) {
							uni.showToast({
								title: '已是最新',
								duration: 2000
							});
						}
						uni.hideNavigationBarLoading(); //关闭加载动画
						uni.stopPullDownRefresh();
					}

				})
			},
			confirm(orderId) {
				var _this = this
				console.log(orderId)
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
						console.log(res)
						uni.showToast({
							title:res.data.message
						})
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
			openPopup1:function(orderId){
				this.$https({
					url:'/api/user/order-handle',
					data:JSON.stringify({orderId:orderId,type:1}),
					method:'post',
					haeder:true,
					success:res=>{
						uni.showToast({
							title:res.data.message
						})
						this.toggle(1)
					}
				})
			},
			wuliu(code,order,com,dz) {
				// console.log('222')
				uni.navigateTo({
					url: './deliver?code=' + code + '&order=' + order + '&com=' + com + '&dz=' + dz
				})
			},
			toggle(index) {
				var _this = this
				// console.log(e.target)
				this.id = index
				this.$https({
					url: '/api/user/order-list',
					data: {
						status: index
					},
					dengl: false,
					success: function(res) {
						_this.dList = res.data.data
					}
				})

			},
			goPing(orderSn, orderId,goodids) {
				uni.navigateTo({
					url: './evaluate?orderSn=' + orderSn + '&orderId=' + orderId+'&goodsId='+goodids[0].goodsId
				})
			},
			shopCar() {
				uni.reLaunch({
					url: '../../cart/cart'
				})
			},
			detail(id,t) {
				uni.navigateTo({
					url: './shipped?orderId=' + id+'&zhuangtai='+t
				})
			},
			zhifu(orderSn) {
				var _this = this
				var orderNo = orderSn
				this.$https({
					url: '/api/pay/unifiedOrder',
					data: JSON.stringify({
						orderNo: orderNo,
						payMethod: 1
					}),
					method: 'post',
					dengl: false,
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
						console.log(res.data)
						uni.requestPayment({
							provider: 'wxpay',
							orderInfo: obj,
							success: function(res) {},
							fail: function(res) {
							}
						})
					}
				})
			},
			back:function(){
				uni.navigateBack({
					delta:1
				})
			},
			tiaozhuan:function(){
				uni.navigateTo({
					url:'../../classify/fenlOne'
				})
			},
			//删除订单
			shanchu:function(id){
				this.openPopup1(id)
			}
		}
	}
</script>

<style lang="scss">
	.loading-text{
		display: block;
		
		text-align: center;
		margin-top:100rpx;
	}
	page{
		background-color: #f7f7f7;
	}
	.listBox{
		background-color: #fff;
	}
	.top {
		width: 710upx;
		padding: 20upx;
		overflow: hidden;

		.textBox {
			float: left;
			margin-left: 70upx;
			background-color: #f0f0f0;
			border-radius: 50upx;

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

		.imgBox {
			padding-left: 30upx;
			padding-right: 20upx;
			padding-top: 10upx;
			float: right;

			image {
				width: 44upx;
				height: 39upx;
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

	.xinxi {
		overflow: hidden;
		width: 710upx;
		padding: 20upx;
		border-bottom: 20upx solid #f7f7f7;

		.xinxi1 {
			overflow: hidden;
			width: 710upx;
			// padding: 20upx;
			border-bottom: 1upx dashed #f7f7f7;
		}

		.imgBox_a {
			float: left;
			padding-top: 20upx;

			image {
				width: 215upx;
				height: 160upx;
			}
		}

		.zongj {
			float: right;
			padding-top: 10upx;

			text {
				font-size: 26upx;
				color: #333;
			}
		}

		.txt_c {
			float: left;
			width: 470upx;
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
		width: 710upx;
		padding: 20upx;
		overflow: hidden;
		padding-top: 10upx;
		overflow: hidden;
		border-bottom: 1px solid #f7f7f7;
		padding-bottom:30rpx;
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
