<template>
	<view class="">
		<view class="one_line">
		</view>
		<view class="radios">
			<text>订单编号：45644152412141</text>
			<view class="guanb">
				<text>2019-05-25 15:55:56</text>
			</view>
		</view>
		<!-- 订单信息 -->
		<view class="xinxi">
			<view class="biaot">
				<text>订单信息</text>
			</view>
			<view class="imgBox_a">
				<image :src="list.shopDTO.storeLogo" mode=""></image>
			</view>
			<view class="txt_c">
				<view class="title">
					<text>{{list.shopDTO.shopName}}</text>
				</view>
				<view class="spec">
					<text>已选：＂黄色＂</text>
				</view>
				<view class="radColor">
					<text>¥ {{list.shopPrice}}</text>
				</view>


				<view class="jia">
					<text>X1</text>
				</view>
			</view>
		</view>

		<view class="pingj">
			<view class="pingzi">
				<text>描述相符</text>
			</view>
			<!-- 选中 -->
			<view class="pingimgxuan" v-for="(item, index) in 5" @tap="xing(index)">
				<image :src="(Number>index)?'../../../static/xing_01.png':'../../../static/xing.png'"></image>
			</view>
			<!-- 默认 -->
			<!-- <view class="pingimg">
				<image src="../../../static/xing.png" mode=""></image>
			</view> -->
			<view class="spanaa">
				<text>还不错</text>
			</view>
		</view>
		<view class="uni-form-item uni-column">
			<input class="uni-input" name="input" v-model="value" placeholder="宝贝满足你的期待吗？说说它的优点和美中不足的地方吧" />
			<view class="imgBox" @tap="chuanImg">
				<image :src="cImg" mode="" v-model="img"></image>
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
				Number: 0,
				Number1: 0,
				Number2: 0,
				cImg: '../../../static/img_10.jpg.png',
				goodsId:'',
				value:'',
				img:''
			}
		},
		onLoad(option) {
			var _this = this
			this.goodsId=option.id
			console.log(option)
			this.$https({
				url: '/api/shop/mall-goods-detail',
				data: {
					goods_id: option.id
				},
				dengl: false,
				success(res) {
					_this.list = res.data.data.detail
					console.log(res.data.data)
				}
			})
		},
		methods: {
			xing(ind) {

				this.Number = ind + 1;
				console.log(ind)
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
				console.log(this.img)
				var _this=this
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
					success() {
						console.log('提交成功')
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
