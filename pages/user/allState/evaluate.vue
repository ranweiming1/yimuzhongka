<template>
	<view class="">
		<view class="one_line">
		</view>
		<view class="radios">
			<text>订单编号：{{dList.orderSn}}</text>
			<view class="guanb">
				<text>{{dList.addTime}}</text>
			</view>
		</view>
		<!-- 订单信息 -->
		<view class="" v-for="(item,index) in dList.goodsList">
		<view class="xinxi">
			<view class="biaot">
				<text>订单信息</text>
			</view>
			<view class="imgBox_a">
				<image :src="item.goodsLogo" mode=""></image>
			</view>
			<view class="txt_c">
				<view class="title">
					<text>{{item.goodsName}}</text>
				</view>
				<view class="spec">
					<text>已选：＂{{item.specKeyName}}＂</text>
				</view>
				<view class="radColor">
					<text>{{item.goodsPrice?'￥'+item.goodsPrice+'.00':'0'}}</text>
				</view>


				<view class="jia">
					<text>X{{item.goodsNum}}</text>
				</view>
			</view>
		</view>


			<view class="pingj">
				<view class="pingzi">
					<text>描述相符</text>
				</view>
				<!-- 选中 -->
				<view class="pingimgxuan" v-for="(item, index) in 5" @tap="xing(index)">
					<image :src="(Number3>index)?'../../../static/xing_01.png':'../../../static/xing.png'"></image>
				</view>
				<!-- 默认 -->
				<!-- <view class="pingimg">
				<image src="../../../static/xing.png" mode=""></image>
			</view> -->
				<!-- <view class="spanaa">
					<text>还不错</text>
				</view> -->
			</view>
			<view class="uni-form-item uni-column">
				<textarea class="uni-input" name="input" style="text-overflow: ellipsis" v-model="value" placeholder="宝贝满足你的期待吗？说说它的优点和美中不足的地方吧" />
				<view class="imgBox" @tap="chuanImg">
					<image :src="cImg" mode="" v-model="img"></image>
				</view>
			</view>
		</view>
		<view class="biaota">
			<text>店铺评价</text>
		</view>
		<view class="pingj">
			<view class="pingzi">
				<text>店铺评价</text>
			</view>
			<!-- 默认 -->
			<view class="pingimg" v-for="(itex, index) in 5" @tap="xing1(index)">
				<image :src="(Number1>index)?'../../../static/xing_01.png':'../../../static/xing.png'"></image>
			</view>
		</view>
		<view class="pingj">
			<view class="pingzi">
				<text>物流评价</text>
			</view>
			<!-- 默认 -->
			<view class="pingimg" v-for="(item, index) in 5" @tap="xing2(index)">
				<image :src="(Number2>index)?'../../../static/xing_01.png':'../../../static/xing.png'" mode=""></image>
			</view>
		</view>
		<view class="uni-padding-wrap uni-common-mt botts" @tap="primise">
			<button type="primary">提交评价</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: {},
				Number3: 0,
				Number1: 0,
				Number2: 0,
				cImg: '../../../static/img_10.jpg.png',
				goodsId: '',
				value: '',
				img: '',
				dList:[]
			}
		},
		onLoad(option) {
			var _this = this
			this.goodsId=option.goodsId
			console.log(option)
			this.$https({
				url: '/api/user/order-detail',
				data: {
					order_id: option.orderId
				},
				dengl: false,
				success: function(res) {
					_this.dList = res.data.data
					console.log(res.data.data)
					// _this.code=res.data.data.shippingCode
					console.log(res.data.data.shippingCode)
				}
			})
		},
		methods: {
			xing(ind) {
				this.Number3 = ind + 1;
			},
			xing1(ind) {
				this.Number1 = ind + 1
			},
			xing2(ind) {
				this.Number2 = ind + 1
			},
			chuanImg() {
				uni.chooseImage({
					success: res => {
						uni.uploadFile({
							url: this.webUrl + '/api/oauth/oss/upload',
							filePath: res.tempFilePaths[0],
							name: 'img',
							success: res => {
								this.cImg = JSON.parse(res.data).data.url
							}
						})
					}
				})
			},
			primise() {
				var _this = this
				this.$https({
					url: '/api/shop/order-comm-submit',
					data: JSON.stringify({
						content: _this.value,
						goodsId: _this.goodsId,
						img: "",
						readStatus: "",
						score: 0
					}),
					dengl: false,
					haeder: true,
					method:'post',
					success() {
						uni.navigateBack({

						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f7f7f7;
	}

	.radios {
		background-color: #fff;
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

		.guanb {
			float: right;

			text {
				font-size: 28upx;
				color: #999;
			}
		}
	}

	.xinxi {
		margin-bottom: 20upx;
		background-color: #fff;
		overflow: hidden;
		width: 710upx;
		padding: 20upx;
		border-bottom: 1px dotted #ccc;

		.imgBox_a {
			float: left;
			padding-top: 20upx;

			image {
				width: 215upx;
				height: 160upx;
			}
		}

		.txt_c {
			float: left;
			width: 460upx;
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
		background-color: #fff;
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

		.guanb {
			float: right;

			text {
				font-size: 28upx;
				color: #999;
			}
		}
	}

	.botts {
		width: 670upx;
		position: fixed;
		bottom: 40upx;
		left: 40upx;

		button {
			border-radius: 40upx;
			font-family: Microsoft YaHei;
		}

	}

	.pingj {
		width: 710upx;
		background-color: #fff;
		padding: 20upx;
		overflow: hidden;

		.pingzi {
			padding-right: 10upx;
			float: left;

			text {
				font-size: 30upx;
				color: #333;
			}
		}

		.pingimg {
			padding-right: 10upx;
			float: left;

			image {
				width: 41upx;
				height: 41upx;
			}
		}

		.pingimgxuan {
			padding-right: 10upx;
			float: left;

			image {
				width: 41upx;
				height: 41upx;
			}
		}

		.spanaa {
			float: left;
			padding-left: 10upx;

			text {
				font-size: 26upx;
				color: #999;
			}
		}
	}

	.uni-column {
		width: 710upx;
		padding: 20upx;
		background-color: #fff;

		.imgBox {
			padding-top: 30upx;
			padding-left: 20upx;

			image {
				width: 175upx;
				height: 175upx;
			}
		}
	}

	.biaot {
		padding-bottom: 20upx;

		text {
			font-size: 28upx;
		}
	}

	.biaota {
		margin-top: 20upx;
		border-bottom: 1px solid #f7f7f7;
		width: 710upx;
		padding: 20upx;
		background-color: #ffffff;
		padding-bottom: 20upx;

		text {
			font-size: 28upx;
		}
	}
</style>
