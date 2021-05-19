<template>
	<view class="">
		<!-- 	<view class="one_line">
		</view> -->
		<view class="radios">
			<text>订单编号：<text selectable="true">{{dList.orderSn}}</text></text>
			<view class="guanb">
				<text>{{dList.addTime}}</text>
			</view>
		</view>
		<!-- 订单信息 -->
		<view class="box-box" v-for="(item,index) in dList.goodsList">
			<view class="box-small-box" v-for="(i,n) in item.specList">
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
						<view class="spec" v-if="i.specKeyName">
							<text>已选：＂{{i.specKeyName}}＂</text>
						</view>
						<view class="radColor">
							<text>{{dList.orderType==1?(dList.integral+'积分'+(i.goodsPrice?'+￥'+i.goodsPrice.toFixed(2):'')):i.goodsPrice?'￥'+i.goodsPrice.toFixed(2):'0'}}</text>
						</view>


						<view class="jia">
							<text>X{{i.goodsNum}}</text>
						</view>
					</view>
				</view>


				<view class="pingj">
					<view class="pingzi">
						<text>描述相符</text>
					</view>
					<!-- 选中 -->
					<view class="pingimgxuan" v-for="(item, indexs) in 5" @tap="xing(indexs,index,n)">
						<image :src="(i.goodsRank>indexs)?'../../../static/xing_01.png':'../../../static/xing.png'">
						</image>
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
					<textarea class="uni-input" name="input" style="text-overflow: ellipsis" v-model="i.content"
						placeholder="宝贝满足你的期待吗？说说它的优点和美中不足的地方吧" />
					<!-- <view class="imgBox" @tap="chuanImg">
						<image :src="cImg" mode="" v-model="img"></image>
					</view> -->
					<view class="up-pic">
						<view class='flex pic-box'>
							<block v-for="(val, idx) in i.img">
								<view class='ap-box'>
									<view class='add-pic'>
										<image class='add-pic' :src="val"></image>
										<view class='img-de' @tap='imgDelete1(idx,index,n)'>
											<image class='img' src='../../../static/q071.png'></image>
										</view>
									</view>
								</view>
							</block>
							<view class='add-pic' @tap='images(index,n)' v-if="i.img.length<3">
								<image class='img' :src='cImg'></image>
							</view>
						</view>
					</view>
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
				<text>物流服务</text>
			</view>
			<!-- 默认 -->
			<view class="pingimg" v-for="(item, index) in 5" @tap="xing2(index)">
				<image :src="(Number2>index)?'../../../static/xing_01.png':'../../../static/xing.png'" mode=""></image>
			</view>
		</view>
		<view style="height:200rpx;;"></view>
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
				dList: [],
				orderId: '',
				qiandao: {},
				comList: [],
				// comList[n].img: [],
				str: '',
				shopCount: 0

			}
		},
		onLoad(option) {
			console.log(option)
			var _this = this
			var shopCount = 0
			if (option.taskId) {
				this.qiandao.taskId = option.taskId
				this.qiandao.isRen = option.isRen
				this.qiandao.taskType = option.taskType
			}
			this.goodsId = option.goodsId
			this.orderId = option.orderId
			this.$https({
				url: '/api/user/order-detail',
				data: {
					order_id: option.orderId
					// order_id: 2222
				},
				dengl: false,
				success: function(res) {
					// var arr = []
					res.data.data.goodsList.map(function(z, i) {
						z.specList.map(function(val, i) {
							shopCount++
							// var obj = {}
							val.content = ''
							// val.goodsId=val.goodsId
							val.goodsRank = 5
							val.img = []
							// val.specKey=val.specKey
							// val.specKeyValue=val.specKeyName
							// arr.push(obj)

						})
					})
					// _this.comList=arr
					_this.shopCount = shopCount
					_this.dList = res.data.data
					console.log(res.data.data, shopCount, _this.dList)

				},
			})
		},
		onShow() {
			// console.log(this.comList[n],45646546)
		},
		methods: {
			xing(ind, index, n) {
				console.log(ind, n, index)
				this.dList.goodsList[index].specList[n].goodsRank = ind + 1;
				// console.log(ind,n,this.comList[n].goodsRank)
			},
			xing1(ind) {
				this.Number1 = ind + 1
			},
			xing2(ind) {
				this.Number2 = ind + 1
			},
			chuanImg() {
				uni.chooseImage({
					sizeType: ['compressed'],
					count: 9,
					success: chooseImageRes => {
						uni.uploadFile({
							url: this.webUrl + '/oauth/oss/upload',
							filePath: chooseImageRes.tempFilePaths[0],
							name: 'img',
							success: res => {
								this.cImg = JSON.parse(res.data).data.url
							}
						})
					}
				})
			},
			imgDelete1: function(idx, index, indexs) {
				this.dList.goodsList[index].specList[indexs].img.splice(idx, 1)

			},
			// 选择图片
			images(index, indexs) {
				// console.log(inde)
				var _this = this
				var imgbox = this.dList.goodsList[index].specList[indexs].img
				// var picid = index
				var n = 3
				if (3 > imgbox.length > 0) {
					n = 3 - imgbox.length;
				} else if (imgbox == 3) {
					n = 1
				}
				uni.chooseImage({
					sizeType: ['compressed'],
					count: n,
					sourceType: ['album', 'camera'],
					success: chooseImageRes => {
						var tempFilePaths = chooseImageRes.tempFilePaths
						if (imgbox.length == 0) {
							imgbox = tempFilePaths
						} else if (3 > imgbox.length) {
							imgbox = imgbox.concat(tempFilePaths)
						} else {
							imgbox[picid] = tempFilePaths[0];
						}
						imgbox.map(function(val, i) {
							if (val.indexOf('http://ymzk-shop') == -1) {
								uni.uploadFile({
									url: _this.webUrl + '/oauth/oss/upload',
									filePath: val,
									name: 'img',
									success: res => {
										var path = JSON.parse(res.data).data.url
										_this.$set(_this.dList.goodsList[index].specList[
											indexs].img, i, path)
									}
								})
							}

						})
					}
				})


			},
			lingJifen(taskId, isRen, taskType) {
				this.$https({
					url: '/api/task/center-task-insert',
					data: {
						taskId: taskId,
						taskType: taskType
					},
					method: 'POST',
					success: function(res) {
						// isRen = true

					}
				})
			},
			primise() {
				var _this = this
				var arr = []
				var objBox = {}
				this.dList.goodsList.map(function(val, i) {
					val.specList.map(function(z, idx) {
						var obj = {}
						if (_this.shopCount > 1) {
							obj.content = z.content
							obj.goodsId = z.goodsId
							obj.goodsRank = z.goodsRank * 20
							obj.img = z.img.join(',')
							obj.specKey = z.specKey
							obj.specKeyValue = z.specKeyName
							obj.readStatus = ''
						} else {
							obj.content = z.content
							obj.goodsId = z.goodsId
							obj.goodsRank = z.goodsRank * 20
							obj.img = z.img.join(',')
							obj.specKey = z.specKey
							obj.specKeyValue = z.specKeyName
							obj.readStatus = ''
							obj.orderId = val.orderId
							obj.serviceRank = _this.Number2 * 20
							obj.deliverRank = _this.Number1 * 20
						}
						arr.push(obj)
					})
				})
				// if(_this.shopCount>1){
				objBox.orderId = this.dList.orderId
				objBox.serviceRank = _this.Number2 * 20
				objBox.deliverRank = _this.Number1 * 20
				// }
				objBox.goodsCommVOList = arr
				if (_this.Number1 == 0) {
					uni.showToast({
						title: '请对店铺做出评价',
						icon: 'none'
					})
					return false
				}
				if (_this.Number2 == 0) {
					uni.showToast({
						title: '物流服务做出评价',
						icon: 'none'
					})
					return false
				}
				console.log(objBox, JSON.stringify(objBox))
				// JSON.stringify({
				// 	content: _this.value,
				// 	goodsId: _this.goodsId,
				// 	img: _this.cImg == '../../static/img_10.jpg.png' ? '' : _this.cImg,
				// 	readStatus: "",
				// 	goodsRank: _this.Number3 * 20,
				// 	deliverRank: _this.Number1 * 20,
				// 	serviceRank: _this.Number2 * 20,
				// 	orderId: this.orderId
				// })
				this.$https({
					url: '/api/shop/order-comm-more-submit',
					data: JSON.stringify(objBox),
					dengl: false,
					haeder: true,
					method: 'post',
					success(res) {
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						})
						if (res.data.code == 0) {
							if (_this.qiandao) {
								_this.lingJifen(_this.qiandao.taskId, _this.qiandao.isRen, _this.qiandao.taskType)

							}
							setTimeout(function() {
								uni.navigateBack({
									delta: 1
								})
								// uni.redirectTo({
								// 	url: 'allState?id=4'
								// })
							}, 1000)
						}
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

	.box-box {
		margin-bottom: 20rpx;
	}

	.box-small-box {
		margin-bottom: 20rpx;
	}

	.radios {
		background-color: #fff;
		width: 710upx;
		padding: 20upx;
		overflow: hidden;
		padding-top: 10upx;
		overflow: hidden;
		border-bottom: 1px solid #f0f0f0;

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

	.flex {
		display: flex;
	}

	.up-pic {
		/* padding:20rpx 24rpx; */
		margin-bottom: 30rpx;
		width: 100%;
		justify-content: center;
	}

	.pic-box {
		flex-flow: wrap;
		width: 100%;
	}

	.ap-box {
		position: relative;
	}

	.add-pic {
		width: 200rpx;
		height: 200rpx;
		display: block;
		float: left;
		position: relative;
		margin: 0 30rpx 40rpx 0;
	}

	.add-pic image {
		width: 200rpx;
		height: 200rpx;
	}

	/* 删除图片 */
	.img-de {
		position: absolute;
		right: -12rpx;
		top: -10rpx;
		z-index: 999;

		image {
			width: 45rpx;
			height: 45rpx;
			display: block;
			border-radius: 50%;

		}

	}

	.xinxi {
		// margin-bottom: 20upx;
		background-color: #fff;
		overflow: hidden;
		width: 710upx;
		padding: 20upx;
		border-bottom: 1px dotted #f0f0f0f0;

		.imgBox_a {
			float: left;
			padding-top: 20upx;

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
			background-color: #007AFF;
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

	textarea {
		width: 100%;
	}
</style>
