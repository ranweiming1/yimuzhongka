<template>
	<view>
		<!-- <view class="one_line">
		</view> -->

		<view class="textBox">
			<view class="top_title">
				<text>订单编号：{{order}}</text>
			</view>
			<view class="top_title" v-if="com">
				<text>承运公司：{{com}}快递</text>
			</view>
			<view class="" v-if="wuList.nu">
				<text>运单编号：{{wuList.nu}}</text>
			</view>
		</view>
		<view class="xinXi">
			<view class="imgBox_a" @tap='g(item.goodsId)'>
				<image :src="goods[0].goodsLogo" mode=""></image>
			</view>
			<view class="txt_c" @tap='g(item.goodsId)'>
				<view class="title">
					<text>{{goods[0].goodsName}}</text>
				</view>
				<view class="spec">
					<text>已选：＂{{goods[0].specKeyName}}＂</text>
				</view>
				<view class="radColor">
					<text>{{goods[0].goodsPrice?'￥'+goods[0].goodsPrice+'.00':'0'}}</text>
				</view>

				<!-- 这是数量加减 -->
				<view class="jia">
					<text>X{{goods[0].goodsNum}}</text>
				</view>
			</view>
			
		</view>

		<!-- 物流状态插件 -->
		<view class="wu_l">
			<view class="content1 bgf">
				<view v-if="">
					<view class="flex list">
						<view class="time"></view>
						<view class="info flex1">
							<view class="title address">[收货地址] {{dz}}</view>
						</view>
					</view>
					<view class="flex list" :class="{one: index == 0 && wlInfo.delivery_status == 1}" v-for="(item, index) in wlInfo.data"
					 :key="index">
						<view class="time">
							<view class="day">{{item.time}}</view>
							<!-- <view>{{item.timeArr[1]}}</view> -->
						</view>
						<view class="info flex1">
							<view class="title">{{(index==0&&wlInfo.state ==1)?'揽件中':(index==0&&wlInfo.state== 2)?'疑难':(index==0&&wlInfo.state) == 3 ? '已签收':(index==0&&wlInfo.state == 4) ? '退签中':(index==0&&wlInfo.state==5)? '派件中':(index==0&&wlInfo.state==6)? '退回':(index==0&&wlInfo.state==7)? '转投':(index==0&&wlInfo.state == 10)? '待清关':(index==0&&wlInfo.state == 11) ? '清关中':(index==0&&wlInfo.state == 12) ? '已清关':(index==0&&wlInfo.state == 13) ? '清关异常': (index==0&&wlInfo.state == 14)?'拒签':'' }}</view>
							<view class="text" style="font-size: 24rpx;">{{item.context}}</view>
						</view>
					</view>
				</view>
				<view class="flex list" v-if="!wlInfo.data.length>0"><text style="margin-left: 40rpx;">暂无物流信息</text></view>
			</view>

		</view>

		<view class="wil-box" style="display: none;">
			<view class="wul-box-item">
				<view class="wul-box-left">
					<view class="box-left-imgs img-befores">
						<!-- <image src="../../../static/xiadan_bef.png" mode=""></image> -->
						<image src="../../../static/shouhuo_bef.png" mode=""></image>
					</view>
				</view>

				<view class="wul-box-right" style="border-left: 1rpx dashed #cdccca;">
					<view class="box-right-data">
						<text>[收货地址] {{dz}}</text>
					</view>

				</view>
			</view>
			<view class="wul-box-item" v-for="(item, index) in wlInfo.data">
				<view class="wul-box-left">
					<view class="box-lef-data">
						<text>{{item.data}}</text>
					</view>
					<view class="box-lef-time">
						<text>{{item.time}}</text>
					</view>
					<view class="box-left-img" :class="index!=0?'addYuan':''">
						<image v-if="index==0" src="../../../static/xiadan_bef.png" mode=""></image>
						<image v-if="index==0" src="../../../static/xiadan_aft.png" mode=""></image>
					</view>
				</view>

				<view class="wul-box-right">
					<view class="box-right-data" v-if="index==0">
						<text>{{wlInfo.state == 0?'运输中':wlInfo.state ==1?'已揽件':wlInfo.state == 3 ? '已签收':wlInfo.state == 4 ? '退货完成':wlInfo.state==5? '派件中':wlInfo.state==6? '运输中':wlInfo.state==7? '转投':wlInfo.state == 10? '待清关':wlInfo.state == 11 ? '清关中':wlInfo.state == 12 ? '已清关':wlInfo.state == 13 ? '清关异常': wlInfo.state == 14?'拒签':'' }}</text>
					</view>
					<view class="box-right-time">
						<text>{{item.context}}</text>
					</view>
				</view>
			</view>

		</view>
		<!-- 热门推荐 -->
		<view class="biaot">
			<text>热门推荐</text>
			<view class="dele" @tap='gengduoxx'>
				<text>更多</text>
			</view>
		</view>
		<view class="activeCss">
			<view class="content-item" v-for="(item,index) in hotList" @tap="detail(item.goodsId)">
				<view class="imgBox">
					<image :src="item.goodsLogo" mode=""></image>
				</view>
				<view class="content-item-text">
					<view class="title_top">
						<text class="span_a" v-if="item.selfStatus=='Y'">自营</text>
						<text>{{item.goodsName}}</text>
					</view>
					<view class="item-coupon">
						<view class="coupon-item" v-for="(items,indexs) in item.couponDTOS">
							<text>满{{items.condition}}-{{items.money}}元</text>
						</view>
						<view class="coupon-item" v-if='item.kuaidi==0'>
							<text>包邮</text>
						</view>

					</view>

					<view class="item-price">
						<text class="price-text">￥{{item.marketPrice?item.marketPrice.toFixed(2):'暂无价格'}}</text>
						<text class="shop-sales">销量：{{item.salesSum}}</text>
					</view>

				</view>

			</view>
			<view v-if='hotList.length==0' @tap='tiaozhuan'>
				<image src='../../../static/d.png' style='width:283rpx;height:184rpx;display:block;margin:100rpx auto;'></image>
				<view>暂无推荐,去逛逛</view>
			</view>
		</view>

	</view>
</template>

<script>
	// import trackNode from '../../../components/trackNode/trackNode.vue'
	// import logistics from '../../../components/xinyuLogistics/xinyuLogistics.vue'
	export default {
		data() {
			return {
				wuList: {},
				order: '',
				com: '',
				hotList: {},
				dz: '',
				// 
				wlInfo: {
					state: 1, //快递状态 1已签收 2配送中			
					addr: '', //收货地址
					//物流信息

				},
				goods:[]
			}
		},
		components: {
			// trackNode
			// logistics
		},
		onLoad(option) {
			var _this = this
			console.log(option)
			this.order = option.order
			this.com = option.com
			this.dz = option.dz
			this.goods=JSON.parse(option.goods)
			this.$https({
				url: '/api/shop/logistics-detail',
				data: {
					logistics: option.code,
					// logistics: '9881116420003',

				},
				dengl: false,
				success(res) {
					_this.wuList = res.data.data
					_this.wlInfo = res.data.data.logisticsInfo
					// _this.list=res.data.data.data
					_this.hotList = res.data.data?res.data.data.recommedGoods:''
					if(res.data.code==0){
						uni.showToast({
							title:'操作成功'
						})
					}else{
						uni.showToast({
							title:res.data.message
						})
						_this.hotList=[]
					}
					_this.state = res.data.data.state
					// _this.time=res.data.data.data[0].time
					// console.log(res.data.data.data)
				}
			})
		},
		methods: {
			detail(id) {
				uni.navigateTo({
					url: '../../index/productDetails?id=' + id
				})
				this.$https({
					url: '/api/shop/goods-brows-history-add',
					data: {
						goodsId: id
					},
					method: 'POST',
					dengl: true,
					success(res) {
						console.log('添加成功')
						console.log(res.data)
					}
				})
			},
			gengduoxx: function() {
				uni.navigateTo({
					url: '../../classify/fenlOne'
				})
			},
			tiaozhuan:function(){
				uni.navigateTo({
					url:'../../index/index'
				})
			}
		}
	}
</script>

<style lang="scss">
	.xinXi {
		overflow: hidden;
		width: 100%;
		// padding: 20upx;
		border-bottom: 20rpx solid #f5f5f5;
		box-sizing: border-box;
		padding: 20rpx;

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
			position: relative;
			height: 200rpx;

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
				position: absolute;
				bottom: 0rpx;
				left: 20rpx;
			}

			.jia {
				float: right;
				bottom: 0rpx;
				right: 20rpx;
				position: absolute;

				text {
					font-size: 20upx;
					color: #666;
				}
			}
		}

	}

	.wil-box {
		width: 100%;
		box-sizing: border-box;
		color: #999999;
		padding: 40rpx 0;
		border-bottom: 20rpx solid #f5f5f5;

		.box-left-img {
			width: 48rpx;
			height: 48rpx;
			border: 1rpx solid #c6c6c6;
			border-radius: 50%;
			padding: 10rpx;
			box-sizing: border-box;
			text-align: center;
			position: absolute;
			right: -24rpx;
			top: 0;
			background-color: #FFFFFF;
			z-index: 9;

			image {
				width: 100%;
				height: 100%;
				display: block;
			}
		}

		.addYuan {
			width: 12rpx;
			height: 12rpx;
			right: -6rpx;
			padding: 0;
			background-color: #cecece;
		}

		.box-left-imgs {
			width: 48rpx;
			height: 48rpx;
			border-radius: 50%;
			box-sizing: border-box;
			text-align: center;
			position: absolute;
			right: -24rpx;
			top: 0;
			background-color: #FFFFFF;
			z-index: 9;

			image {
				width: 100%;
				height: 100%;
				display: block;
			}
		}

		.img-before {
			background: #ff6600;
			border: 1rpx solid #ff6600;
		}

		.wul-box-item {
			overflow: hidden;
			width: 100%;
			box-sizing: border-box;

			.box-lef-data {
				margin-bottom: 10rpx;
				font-size: 24rpx;
			}

			.box-lef-time {
				font-size: 22rpx;
			}

			.box-right-data {
				font-size: 28rpx;
			}

			.box-right-time {
				font-size: 24rpx;
				// width: calc(100% - 100rpx);
			}


			.wul-box-left {
				width: 150rpx;
				padding: 0 30rpx;
				text-align: right;
				box-sizing: border-box;
				// border-right: 1rpx solid #f0f0f0;
				position: relative;
				float: left;
				padding-bottom: 50rpx;
			}

			.wul-box-right {
				width: calc(100% - 150rpx);
				padding-right: 70rpx;
				box-sizing: border-box;
				padding-left: 30rpx;
				float: left;
				border-left: 1rpx solid #cdccca;
				padding-bottom: 50rpx;


			}
		}

		.wul-box-item:last-child .wul-box-left {
			border-right: none;
			padding-bottom: 0;
		}

		.wul-box-item:last-child .wul-box-right {
			border-left: none;
			padding-bottom: 0;
		}
	}

	.activeCss {
		padding: 0 20rpx;
	}

	.top_title {
		line-height: 64rpx;
	}

	.textBox {
		width: 710upx;
		padding: 20upx;
		border-bottom: 20upx solid #f5f5f5;
		border-top: 1rpx solid #e5e5e5;

		text {
			font-size: 30upx;
			line-height: 40upx;
			color: #333;
		}
	}

	.wu_l {
		// width: 100vw;
		// height: auto;
		// box-sizing: border-box;
		// padding: 20rpx 40rpx 200rpx;
		// width: 710upx;
		// padding: 20upx;
		// text-align: center;
		border-bottom: 20rpx solid #f5f5f5;

		text {
			font-size: 28upx;
			color: #999;
		}
	}

	.biaot {
		border-bottom: 1px solid #e5e5e5;
		font-size: 30upx;
		line-height: 80upx;
		padding-left: 20upx;
		// margin-bottom: 30upx;

		.dele {
			float: right;
			padding-right: 20upx;

			text {
				font-size: 26upx;
				color: #666;
				line-height: 50upx;
			}
		}
	}

	.content {
		display: black;
		width: 340upx;
		margin-bottom: 30upx;
		margin-left: 25upx;
		float: left;
		box-shadow: 0 0 5px #ccc;
		border-radius: 20upx;
		padding-bottom: 20upx;
		overflow: hidden;

		.imgBox {
			image {
				width: 100%;
				height: inherit;
				float: left;
			}
		}

		.txt_a {
			padding-top: 10upx;
			width: 90%;
			margin-left: 20upx;
			float: left;

			text {
				font-size: 30upx;
			}

			.span_a {
				background-color: #fff;
				color: #ff6600;
				border: 1px solid #ff6600;
				border-radius: 5upx;
				padding: 5upx 10upx;
				font-size: 18upx;
				margin-right: 10upx;
				line-height: 30upx;
			}

			.txt_aa {
				text {
					border: 1px dotted #ff3333;
					background-color: #fff;
					font-size: 16upx;
					line-height: 30upx;
					padding: 5upx 10upx;
					color: #ff3333;
					margin-right: 20upx;
					font-size: 20upx;
				}
			}

			.txt_aas {
				padding-top: 10upx;

				text {
					color: #333;
					font-size: 32upx;

					text {
						color: #ff3333;
						font-size: 32upx;
						font-weight: bold;
					}
				}

				text:nth-child(2) {
					color: #999999;
					font-size: 24upx;
					float: right;
					line-height: 50upx;
				}
			}

		}
	}

	// 物流信息
	.page {
		height: 100vh;
		/* #ifdef H5 */
		height: calc(100vh - 44px);
		/* #endif */
		font-size: 24rpx;
		background-color: #F6F7F8;
		overflow-y: auto;
	}

	/*flex 转换成flex容器*/
	.flex {
		display: flex;
		flex-direction: row;
	}

	/*flex1 自动填充*/
	.flex1 {
		flex: 1;
	}

	/*ali-c 竖直居中*/
	.ali-c {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.bgf {
		background-color: #fff;
	}

	.express {
		//圆通快递
		background-color: #ffffff;
		border-radius: 20rpx;
		margin: 30rpx 20rpx 30rpx 20rpx;

		.top {
			padding: 28rpx 29rpx 25rpx 29rpx;

			.img {
				display: block;
				width: 88rpx;
				height: 88rpx;
				border-radius: 50%;
			}

			.text {
				margin-left: 20rpx;

				.text1 {
					margin-bottom: 6rpx;
					font-size: 28rpx;
					color: #000000;
				}

				.text2 {
					font-size: 20rpx;
					color: #000000;
				}
			}
		}

		.right {
			background-color: rgba(8, 175, 254, 0.02);
			border-radius: 0rpx 0rpx 20rpx 20rpx;
			padding: 15rpx 30rpx 20rpx 30rpx;

			.text {
				color: #666666;
				font-size: 22rpx;
			}
		}
	}

	//收货地址
	.content1 {
		// margin: 20rpx;
		padding: 40rpx 46rpx 40rpx 5rpx;
		// border-radius: 20rpx;

		.list {
			&:first-child {
				.info::before {
					bottom: -20rpx;
					margin-top: 40rpx;
					border-left: 1px dashed #e5e5e5;
				}

				.title {
					margin-bottom: 56rpx;

					&::before {
						width: 46rpx;
						height: 46rpx;
						left: -23rpx;
						background: url('data:image/png;base64,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') no-repeat center;
						background-size: 46rpx 46rpx;
					}
				}
			}

			&:last-child {
				.info::before {
					height: 32rpx;
				}
			}

			&.one {
				.info::before {
					margin-top: 20rpx;
				}

				.title {
					color: #1a1a1a;

					&::before {
						width: 46rpx;
						height: 46rpx;
						left: -23rpx;
						background: url('data:image/png;base64,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') no-repeat center;
						background-size: 46rpx 46rpx;
					}
				}

				.text {
					color: #666;
				}

				.time {
					color: #333;

					.day {
						font-size: 24rpx;
					}
				}
			}
		}

		.time {
			width: 180rpx;
			padding-right: 30rpx;
			font-size: 20rpx;
			text-align: right;
			color: #999;

			.day {
				margin-bottom: 4rpx;
			}
		}

		.info {
			position: relative;
			padding-top: 12rpx;
			color: #999;

			&::before {
				content: "";
				position: absolute;
				left: 0;
				top: 0;
				bottom: 0;
				z-index: 1;
				width: 0;
				border-left: 1px solid #e5e5e5;
			}

			.title {
				position: relative;
				margin-bottom: 10rpx;
				padding-left: 32rpx;
				font-size: 27rpx;

				&::before {
					content: "";
					position: absolute;
					left: -3px;
					top: 0;
					bottom: 0;
					z-index: 1;
					width: 7px;
					height: 7px;
					margin: auto 0;
					border-radius: 50%;
					background-color: #cecece;
				}

				&.address {
					font-size: 24rpx;
					color: #333;
				}
			}

			.text {
				padding: 0 0 44rpx 32rpx;
			}
		}

		.last:last-child {
			.info {
				&::before {

					border-left: none;
				}
			}
		}
	}
</style>
