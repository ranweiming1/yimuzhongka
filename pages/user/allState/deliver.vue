<template>
	<view>
		<!-- <view class="one_line">
		</view> -->

		<view class="textBox">
			<view class="">
				<text>订单编号：{{order}}</text>
			</view>
			<view class="">
				<text>承运公司：{{com}}快递</text>
			</view>
			<view class="">
				<text>运单编号：{{wuList.nu}}</text>
			</view>
		</view>

		<!-- 物流状态插件 -->
		<view class="wu_l">
			<logistics :wlInfo="wlInfo"></logistics>
			<!-- <view v-for="(item, index) in tracesData" :key="index">
				<trackNode :is-first="index===tracesData.length-1" :is-newest="index===0" :is-main-node="item.isMainNode"
				 :node-data="item"></trackNode>
			</view> -->
		</view>
		<!-- 热门推荐 -->
		<view class="biaot">
			<text>热门推荐</text>
			<view class="dele">
				<text>更多</text>
			</view>
		</view>

		<view class="hahah list uni-flex uni-column" v-for="(i , n) in 4">
			<view class="content ">
				<view class="imgBox">
					<image src="../../../static/img_02.jpg" mode="widthFix"></image>
				</view>
				<view class="txt_a">
					<text class="span_a">自营</text>
					<text>化学小子 玻璃清洁剂 风玻璃清洗剂</text>
					<view class="txt_aa">
						<text>买一送三</text>
						<text>满199-100元</text>
					</view>
					<view class="txt_aas">
						<text>税后价：<text>￥980.00</text></text>
					</view>

				</view>
			</view>
		</view>

	</view>
</template>

<script>
	// import LeeLogistics from '@/components/lee-logistics/lee-logistics.vue'
	// import trackNode from '../../../components/trackNode/trackNode.vue'
	import logistics from '../../../components/xinyuLogistics/xinyuLogistics.vue'
	export default {
		data() {
			return {
				wuList: {},
				order: '',
				com: '',
				wlInfo: {
					delivery_status: 1, //快递状态 1已签收 2配送中
					post_name: '韵达快递', //快递名称
					logo: 'https://cdn.kuaidi100.com/images/all/56/yunda.png', //快递logo
					exp_phone: '95546', //快递电话
					post_no: '4304678557725', //快递单号
					addr: '江西省南昌市青云谱区', //收货地址
					//物流信息
					list: [{
							"time": "2020-04-12 13:00:57",
							"timeArr": ['2020-04-12', '13:00:57'],
							"context": "江西南昌青云谱区 快件已被 丰巢智能柜 代签收。",
							"location": ""
						},
						{
							"time": "2020-04-12 12:58:53",
							"timeArr": ['2020-04-12', '12:58:53'],
							"context": "江西南昌青云谱区 进行派件扫描；派送业务员：张三；联系电话：88888888888",
							"location": ""
						},
						{
							"time": "2020-04-11 15:45:44",
							"timeArr": ['2020-04-11', '15:45:44'],
							"context": "江西南昌分拨中心 从站点发出，本次转运目的地：江西南昌青云谱区",
							"location": ""
						},
						{
							"time": "2020-04-11 15:08:45",
							"timeArr": ['2020-04-11', '15:08:45'],
							"context": "江西南昌分拨中心 在分拨中心进行卸车扫描",
							"location": ""
						},
						{
							"time": "2020-04-10 17:42:41",
							"timeArr": ['2020-04-10', '17:42:41'],
							"context": "浙江义乌分拨中心 进行装车扫描，发往：江西南昌分拨中心",
							"location": ""
						},
						{
							"time": "2020-04-10 17:39:38",
							"timeArr": ['2020-04-10', '17:39:38'],
							"context": "浙江义乌分拨中心 在分拨中心进行称重扫描",
							"location": ""
						},
						{
							"time": "2020-04-10 16:02:46",
							"timeArr": ['2020-04-10', '16:02:46'],
							"context": "浙江义乌城西公司 进行下级地点扫描，发往：江西南昌地区包",
							"location": ""
						},
						{
							"time": "2020-04-10 15:48:42",
							"timeArr": ['2020-04-10', '15:48:42'],
							"context": "浙江义乌城西公司城西营销部 进行揽件扫描",
							"location": ""
						}
					]
				}
			}
		},
		components: {
			// trackNode
			logistics
		},
		onLoad(option) {
			var _this = this
			this.order = option.order
			this.com = option.com
			this.$https({
				url: '/api/shop/logistics-detail',
				data: {
					logistics: option.code
				},
				dengl: false,
				success(res) {
					_this.wuList = res.data.data
					console.log(res)
					console.log(res.data.data.nu)
				}
			})
			console.log(option)
		}
	}
</script>

<style lang="scss">
	.textBox {
		width: 710upx;
		padding: 20upx;
		border-bottom: 20upx solid #f7f7f7;
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
		box-sizing: border-box;
		padding: 20rpx 40rpx 200rpx;
		width: 710upx;
		padding: 20upx;
		// text-align: center;

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
		margin-bottom: 30upx;

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
</style>
