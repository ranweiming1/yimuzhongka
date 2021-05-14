<template>
	<view class="bodys">
		<!-- 	<view class="">
			<view class="radios">
				<text>店铺名</text>
				<view class="guanb">
					<text></text>
				</view>
			</view>
		</view> -->
		<view class="listBox" v-for="(item,index) in saleList">
			<view class="radios">
				<!-- 店铺名称待确认 -->
				<text>{{item.storeShopDTO.shopName}}</text>
				<view class="guanb">
					<text>{{item.endStatus==0?'处理中':'已完结'}}</text>
				</view>
			</view>
			<view class="xinxi">
				<view class="xinxi1"
					@tap="detail(item.id,item.goodsName,item.specValue,item.goodsImg,item.approvalStatus,item.endStatus)">
					<view class="imgBox_a">
						<image :src="item.goodsImg" mode=""></image>
					</view>
					<view class="txt_c">
						<view class="title">
							<text>{{item.goodsName}}</text>
						</view>
						<view class="spec">
							<text>已选：＂{{item.specValue}}＂</text>
						</view>
						<view class="radColor">
							<text>{{item.refundFee?'￥'+item.refundFee.toFixed(2):'0'}}</text>
						</view>

						<!-- 数量 -->
						<view class="jia">
							<text>x{{item.buyNum}}</text>
						</view>
					</view>

				</view>
				<view class="zongj">
					<text>{{item.refundDesc}}</text>
				</view>
				<view class="exa-type" v-if="item.endStatus==0">
					<view class="exa-title-one" v-if="item.approvalStatus==2">
						<text style="color: #FF0000;padding-right: 20rpx;">待商家处理</text> <text>请耐心等待</text>
					</view>
					<view class="exa-title-two" v-if="item.approvalStatus==3">
						<text style="padding-right: 20rpx;">商家已驳回</text><text
							style="color: #FF0000;">{{item.storeRemark?item.storeRemark:''}}</text>
					</view>
					<view class="exa-title-three" v-if="item.approvalStatus==0">
						<text style="padding-right: 20rpx;">审核通过</text>
						<text>{{item.logisticsCode&&item.logisticsCode!=null?'退款中，请耐心等待':'请填写物流信息'}}
						</text>
					</view>
					<!-- <view class="exa-title-three" v-if="item.endStatus==1">
						<text
							style="padding-right: 20rpx;">{{item.refundMethod==0?'退货成功':'换货成功'}}</text><text>{{item.refundMethod==0?'退款成功￥'+item.refundFee.toFixed(2):'换货已完成'}}</text>
					</view> -->
					<view class="exa-bott" v-if="item.approvalStatus==3"
						@tap="applyAgain(item.id,item.outTradeNo,item.goodsImg,item.goodsName,item.goodsFee,item.specValue,item.buyNum,item.specKey,item.goodsId,item.refundFee)">
						再次申请
					</view>
					<view class="exa-bott" @tap="revokeRun(item.id)" v-if="item.approvalStatus!=0">
						撤销申请
					</view>
				</view>
			</view>
		</view>
		<view v-if='saleList.length==0' style='text-align:center;margin-top:100rpx;'>
			<image src='../../../static/d.png' style='width:283rpx;height:184rpx;display:block;margin:50rpx auto;'>
			</image>
			<view style='text-align:center;'>暂无订单</view>
		</view>
		<!-- 撤销申请 -->
		<view class="del-mask" v-if='isRevoke' style="z-index: 9999999;">
			<view class="del-mask-content">
				<view class="mask-title">您确定撤销售后申请?</view>
				<view class="mask-bot">
					<view class="bot-left" @tap='quxiao'>取消</view>
					<view class="bot-right" @tap='shanchuDD'>确定</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				saleList: [],
				page: 1,
				loadingType: 0,
				isRevoke: false,
				ordId: ''
			}
		},
		onLoad() {
			var _this = this
			// this.$https({
			// 	url: '/api/shop/order-refund-list',
			// 	dengl: false,
			// 	haeder: true,
			// 	data: {},
			// 	method: 'post',
			// 	success(res) {
			// 		_this.saleList = res.data.data
			// 		console.log(res.data.data)
			// 	}
			// })
			this.getNews()
		},
		onPullDownRefresh() {
			//下拉的生命周期
			this.getNews()
		},
		onReachBottom() {
			var data = {
				page: this.page + 1,
				limit: 10,
			}
			this.getMoreNews(data)
		},
		methods: {
			detail: function(id, name, value, logo, approvalStatus, endStatus) {
				if (endStatus == 1) {
					uni.showToast({
						title: '售后已完成',
						icon: 'none'
					})
				} else {
					if (approvalStatus != 0) {
						uni.showToast({
							title: approvalStatus == 2 ? '请等待卖家同意退货' : '审核失败，请与卖家协商重新申请',
							icon: 'none'
						})
						return false
					}
					uni.navigateTo({
						url: './refund?id=' + id
					})
				}

			},
			shanchuDD() {
				var _this = this
				this.quxiao()
				this.$https({
					url: '/api/shop/order-refund-revoke',
					data: {
						id: this.ordId
					},
					dengl: false,
					success: function(res) {
						if (res.data.code == 0) {
							uni.showToast({
								title: '撤销成功'
							})
							_this.getNews()

						} else {
							uni.showToast({
								title: '操作失败',
								icon: 'none'
							})
						}
					}
				})
			},
			quxiao() {
				this.isRevoke = !this.isRevoke
			},
			revokeRun(id) {
				this.ordId = id
				this.isRevoke = !this.isRevoke
			},
			applyAgain(id, oS, lG, gN, gP, sKN, Num, sKY, gID, paidPri) {
				uni.navigateTo({
					url: './deliver_01?id=' + id + '&oS=' + oS + '&lG=' + lG + '&gN=' + gN + '&gP=' + gP +
						'&sKN=' + sKN + '&num=' + Num + '&sKY=' + sKY + '&gID=' + gID + '&paidPri=' + paidPri
				})
			},
			getNews() {
				this.page = 1
				var _this = this
				//标题读取样式激活
				uni.showNavigationBarLoading()
				this.$https({
					url: '/api/shop/order-refund-list',
					data: {
						page: _this.page,
						limit: 10,

					},
					dengl: false,
					success: function(res) {
						_this.saleList = res.data.data
						//隐藏标题读取 
						uni.hideNavigationBarLoading()
						uni.stopPullDownRefresh()
					}
				})

			},
			getMoreNews(data) {
				var _this = this
				this.page++

				if (_this.loadingType != 0) {
					return false; //loadingType!=0;直接返回
				}
				_this.loadingType = 1;
				uni.showNavigationBarLoading();
				this.$https({
					url: '/api/shop/order-refund-list',
					dengl: false,
					data: data,
					success(res) {
						if (res.data.data.length < 10 || res.data.data ==
							'null') { //当之前的数据长度等于count时跳出函数，不继续执行下面语句
							_this.loadingType = 2;
							uni.showToast({
								title: '已加载全部数据',
								icon: 'none',
								duration: 2000
							})
							uni.hideNavigationBarLoading(); //关闭加载动画
							return false;
						}
						_this.saleList = _this.saleList.concat(res.data.data)
						_this.loadingType = 0; //将loadingType归0重置
						uni.hideNavigationBarLoading(); //关闭加载动画
					}
				})
			},

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f7f7f7;
	}

	.listBox {
		margin-top: 20rpx;
		background-color: #FFFFFF;
	}

	.xinxi {
		overflow: hidden;
		width: 710upx;
		padding: 20upx;
		// border-bottom: 20upx solid #f7f7f7;


		.xinxi1 {
			overflow: hidden;
			width: 710upx;
			// padding: 20upx;
			// border-bottom: 20upx solid #f7f7f7;
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
			// float: right;
			background-color: #f7f7f7;
			border-radius: 25rpx;
			margin-top: 10upx;
			padding: 8rpx 20rpx;

			text {
				font-size: 26upx;
				// padding-left: 20rpx;
				color: #333;
				line-height: 50rpx;
			}
		}

		.exa-type {
			color: 30rpx;
			overflow: hidden;
			font-size: 30rpx;
			width: 100%;
			padding: 0 10rpx;
			box-sizing: border-box;
		}

		.exa-title {
			font-size: 30rpx;
			height: 80rpx;
			line-height: 80rpx;
		}

		.exa-title-one {
			height: 80rpx;
			line-height: 80rpx;
			font-size: 30rpx;
			color: #333;
		}

		.exa-title-two {
			padding: 25rpx 0;
			line-height: 45rpx;
		}

		.exa-title-three {
			height: 80rpx;
			line-height: 80rpx;
			font-size: 30rpx;
			color: #333;
		}

		.exa-bott {
			float: right;
			width: 180rpx;
			height: 64rpx;
			text-align: center;
			line-height: 64rpx;
			border-radius: 45rpx;
			color: #007AFF;
			background-color: #fff;
			border: 1px solid #007AFF;
			font-size: 28rpx;
			margin-left: 20rpx;
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

	.guanb {
		float: right;

		text {
			font-size: 28upx;
			color: #ff0000;
		}
	}
</style>
