<template>
	<view>
		<!-- 头部 -->
		<view class="top">
			<view class="textBox">
				<input class="uni-input" focus placeholder="请输入关键字" />
			</view>
			<view class="imgBox" @tap="shopCar">
				<image src="../../../static/icon_43.png" mode=""></image>
			</view>
		</view>

		<!-- 状态栏 -->
		<view class="topBox">
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

		<!-- 订单信息 -->
		<view class="listBox" v-for="(item,index) in dList">
			<view class="radios">
				<text>米其林官方旗舰店</text>
				<view class="guanb">
					<text>{{item.orderStatus==0?'待付款':item.orderStatus==1?'交易完成':'交易关闭'}}</text>
				</view>
			</view>
			<view class="xinxi" v-for="(ite,inde) in item.goodsList" @tap="detail(item.orderId)">
				<view class="imgBox_a">
					<image :src="ite.goodsLogo" mode=""></image>
				</view>
				<view class="txt_c">
					<view class="title">
						<text>{{ite.goodsName}}</text>
					</view>
					<view class="spec">
						<text>已选：＂{{ite.specKeyName}}＂</text>
					</view>
					<view class="radColor">
						<text>￥{{ite.goodsPrice}}.00</text>
					</view>
			
					<!-- 数量 -->
					<view class="jia">
						<text>X{{ite.goodsNum}}</text>
					</view>
				</view>
				<view class="zongj">
					<text>{{ite.goodsNum}}种货品 总金额：￥{{item.orderAmount}}.00</text>
				</view>
				<view class="bottBox">
					<view class="uni-padding-wrap uni-common-mt bott">
						<button type="primary">删除订单</button>
					</view>
					<view class="uni-padding-wrap uni-common-mt bott onna" @tap="goPing(6)" v-if="item.status==4">
						<button type="primary">去评价</button>
					</view>
					<view class="uni-padding-wrap uni-common-mt bott" v-if="item.status==4">
						<button type="primary">再次购买</button>
					</view>
					<view class="uni-padding-wrap uni-common-mt bott">
						<button type="primary">追加评论</button>
					</view>
					<view class="uni-padding-wrap uni-common-mt bott onna" v-if="item.status==1">
						<button type="primary">去支付</button>
					</view>
					<view class="uni-padding-wrap uni-common-mt bott" @click="openPopup" v-if="item.status==1">
						<button type="primary">取消订单</button>
					</view>
					<view class="uni-padding-wrap uni-common-mt bott onnb" v-if="item.status==3">
						<button type="primary">确认收货</button>
					</view>
					<view class="uni-padding-wrap uni-common-mt bott" v-if="item.status==3">
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
					<view class="li_box"  v-for="(i , n) in 5">
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
				id:'',
				dList:{}
			}
		},
		components: {
			tabBar,
			uniPopup
		},
		onLoad(option) {
			var _this=this
			this.id=option.id
			this.$https({
				url:'/api/user/order-list',
				data:{status:option.id},
				dengl:false,
				success:function(res){
					 _this.dList=res.data.data
					 // _this.gList=res.data.data
					console.log(res.data.data)
					// console.log(res.data.data.goodsList)
					_this.toggle(option.id)
				}
			})
		},
		methods: {
			select: function() {
				// console.log(1)
			},
			openPopup() {
				this.$refs.popup.open()
			},
			closePopup() {
				this.$refs.popup.close()
			},
			toggle(index){
				var _this=this
				// console.log(e.target)
				this.id=index
				this.$https({
					url:'/api/user/order-list',
					data:{status:index},
					dengl:false,
					success:function(res){
						_this.dList=res.data.data
					}
				})
				
			},
			goPing(id){
				uni.navigateTo({
					url:'./evaluate?id='+id
				})
			},
			shopCar(){
				uni.switchTab({
					url:'../../cart/cart'
				})
			},
			detail(id){
				uni.navigateTo({
					url:'./shipped?orderId='+id
				})
			}
			
		}
	}
</script>

<style lang="scss">
	.top {
		width: 710upx;
		margin: 20upx;
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
    .guanb{
		float: right;
		text{
			font-size: 28upx;
			color: #ff0000;
		}
	}
	.bottBox {
		overflow: hidden;
		width: 710upx;
		padding: 20upx;
		height: 50upx;
        .onna{
			button{
				background-color: #007AFF !important;
				border: 1px solid #007AFF !important;
				color: #fff !important;
			}
		}
		.onnb{
			button{
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
.text_uo{
		
	.tit_box{
		text-align: center;
		width: 700upx;
		height: 80upx;
		border-bottom:1px solid #ccc ;
		text{
			font-size: 38upx;
			color: #333;
			line-height: 50upx;
		}
	}
	.li_box{
		overflow: hidden;
		width: 700upx;
		border-bottom: 1px dotted #ccc;
		text{
			float: left;
			font-size: 28upx;
			color: #333;
			line-height:80upx;
		}
		.radioss{
			float: right;
			padding-top: 15upx;
		}
	}
}
</style>
