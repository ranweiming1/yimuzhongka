<template>
	<view style="background-color: #f4f6f8;">
		<view style='posotion:relative;height:570rpx;'>
			<view class="bg">
				<image src="../../static/icon_39_2.png" mode=""></image>
			</view>

			<!-- 头部 -->
			<view class="top toubu1">
				<view class='back' @tap='back' style='float:left;margin-top:10rpx;margin-left:20rpx;'>
					<image src='../../static/icon_26-2.png' style='width:18rpx;height:32rpx;'></image>
				</view>
				<view class="textBox">
					<input class="uni-input" @confirm="search" v-model="value" placeholder="请输入关键字" />
				</view>
				<!-- <view class="imgBox">
					<image src="../../static/icon_40.png" mode=""></image>
				</view> -->
			</view>

			<view class="head">
				<view class="head_img">
					<image :src="store.storeLogo" mode=""></image>
				</view>
				<view class="head_text">
					<view class="h2">
						<text>{{store.shopName}}</text>
					</view>

					<!-- 根据星级综合分值现实 -->
					<view class="star1">
						<image src="../../static/icon_41.png" mode=""></image>
					</view>
				</view>
				<view class="collect">
					<text @tap="shouC(shopsId)">{{!isShow?'收藏店铺':'取消收藏'}}</text>
				</view>
				<!-- <view class="collect">
				<text @tap="shouC">取消收藏</text>
			</view> -->
			</view>

			<!-- banner 轮播图-->
			<swiper class="banner" :autoplay="autoplay" :indicator-active-color="activeColor" :indicator-color="indColor"
			 scroll-x indicator-dots :interval="interval" :duration="duration" style="height:262rpx;">
				<swiper-item v-for='(item,index) in banner' @tap='tiaozhuan(item.type,item.businessId)'>
					<image :src="item.img" mode=""></image>
				</swiper-item>

			</swiper>
		</view>

		<!-- 优惠券轮播-->
		<scroll-view style="width:calc(100% - 30rpx);" scroll-x="true" class="swipe-list">
			<view class="swiperPage" v-for="(item,i) in quan">
				<view class="pageLeft">
					<image src="../../static/yhq_bag.png" mode=""></image>
					<view class="spansTop">
						<text>{{item.money}}</text>
						<span>元</span>
					</view>
					<view class="spansBut">
						<text>满{{item.condition}}可用</text>
					</view>
				</view>
				<view class="pageCenter">
					<p style="font-size: 22rpx;color: #000000;line-height: 30rpx;">满{{item.condition}}-{{item.money}}立减劵</p>
					<p style="font-size: 20rpx;color: #282828;line-height: 30rpx">{{item.name}}</p>
					<p style="font-size: 18rpx;color: #888888;line-height: 30rpx">使用时间:{{item.useStartTime.split(' ')[0]}}-{{item.useEndTime.split(' ')[0]}}</p>
				</view>
				<view class="pageRight">
					<view class="right_bot">
						领取
					</view>
				</view>
			</view>


		</scroll-view>
		<!-- 公司简介 -->
		<view class="ticket_a">
			<view class="briefTop">
				<span style="color: #000000;font-size: 28rpx; display: inline-block;">公司简介</span>
				<span style="color: #3564ff;font-size: 25rpx;display: inline-block;float: right;">更多</span>
			</view>
			<view class="briefContent">
				<text>商家简介：新华社沈阳11月20日电（记者陈梦阳、汪伟）沈阳市中级人民华社沈阳11月20日电（记者陈梦阳、汪伟）沈阳市中级人民法院20日裁定受理债权人法院20日裁定受理债权人对华晨汽车集团控股 有限公司（以下</text>
			</view>
		</view>

		<!-- 热门推荐 -->
		<view class="BoxBox">
			<view style='text-align:center;overflow: hidden;'>
				<view style='width:6rpx;height:20rpx;background:#ccc;transform:rotateZ(30deg);border-radius:10rpx;float:left;margin-top:15rpx;margin-left:273rpx;'></view>
				<view style='width:6rpx;height:30rpx;background:#ccc;transform:rotateZ(30deg);border-radius:10rpx;margin-left:6rpx;float:left;margin-top:10rpx;'></view>
				<view style='float:left;margin-left:20rpx;'>热门产品</view>
				<view style='width:6rpx;height:30rpx;background:#ccc;transform:rotateZ(30deg);border-radius:10rpx;margin-left:20rpx;float:left;margin-top:10rpx;'></view>
				<view style='width:6rpx;height:20rpx;background:#ccc;transform:rotateZ(30deg);border-radius:10rpx;margin-left:6rpx;float:left;margin-top:15rpx;'></view>
			</view>

			<view class="hahah list uni-flex uni-column">
				<view class="content" @click="detail(item.goodsId)" v-for="(item , index) in gList">
					<view class="imgBox">
						<image :src="item.goodsLogo" mode="widthFix"></image>
					</view>
					<view class="txt_a">
						<text class="span_a" v-if="item.selfStatus=='Y'">自营</text>
						<text class="titleText">{{item.goodsName}}</text>
						<view class="txt_aa">
							<!-- <text>买一送三</text> -->
							<text v-for="(items,indexs) in item.couponDTOS">满{{items.condition}}-{{items.money}}元</text>
						</view>
						<view class="txt_aas">
							<text>税后价：<text>￥{{item.shopPrice?item.shopPrice:'暂无价格'}}</text></text>
							<text>包邮</text>
						</view>

					</view>
				</view>
			</view>
			<!-- <view class="hahah list uni-flex uni-column">
				<view class="content" @click="detail(item.goodsId)" v-for="(item , index) in 5">
					<view class="imgBox">
						<image :src="gList[0].goodsLogo" mode="widthFix"></image>
					</view>
					<view class="txt_a">
						<text class="span_a">自营</text>
						<text>店铺</text>
						<view class="txt_aa">
							<text>满400-30元</text>
						</view>
						<view class="txt_aas">
							<text>税后价：<text>￥100</text></text>
						</view>

					</view>
				</view>
			</view>
		 -->
		</view>
		<buttom bottom="1" :can="shopsId"></buttom>
	</view>
</template>

<script>
	import buttom from '../cart/dbottom.vue'
	export default {
		data() {
			return {
				bottom: '',
				store: {},
				shopsId: '',
				gList: {},
				ban: {},
				youhui: {},
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				isShow: '',
				value: '',
				indColor: '#fff',
				activeColor: '#2b5cff',
				scrollLeft: '30rpx',
				banner: [],
				quan: []
			}
		},
		components: {
			buttom
		},
		onLoad(option) {
			// console.log(2222)
			var shopsId = option.id
			this.shopsId = option.id
			var _this = this
			this.$https({
					url: '/api/shop/store-index',
					data: {
						shopId: option.id
						// shopId: 6
					},
					dengl: false,
					success: function(res) {
						_this.store = res.data.data.storeShop
						_this.gList = res.data.data.goodsList
						_this.ban = res.data.data.banners
						_this.youhui = res.data.data.goodsList.couponDTOS

					}

				}),
				this.$https({
					url: '/api/shop/store-shop-detail',
					data: {
						shopId: option.id
					},
					dengl: false,
					success: function(res) {
						_this.isShow = res.data.data.shopCollectStatus
					}
				})
			this.$https({
				url: '/api/shop/get-store-banner-list',
				data: {
					shopId: option.id
				},
				method: 'post',
				success: res => {
					this.banner = res.data.data
				}
			})
			this.$https({
				url: '/api/oauth/shop/store-coupon-list',
				data: {
					shopId: option.id
				},
				success: res => {
					this.quan = res.data.data
				}
			})
		},
		methods: {
			detail(id) {
				uni.navigateTo({
					url: '../index/productDetails?id=' + id
				})
				this.$https({
					url: '/api/shop/goods-brows-history-add',
					data: {
						goodsId: id
					},
					method: 'POST',
					dengl: true,
					success(res) {
						// console.log('添加成功')
					}
				})
			},
			shouC(id) {
				var _this = this
				console.log(id)
				this.$https({
					url: '/api/shop/shop-collect',
					data: {
						shopId: id
					},
					method: 'POST',
					success: function(res) {
						_this.isShow = !_this.isShow
					},

				})
			},
			more() {
				uni.navigateTo({
					url: 'all?id=' + this.shopsId
				})
			},
			search() {
				uni.navigateTo({
					url: './all?shopsId=' + this.shopsId + '&keywords=' + this.value
				})
				this.value = ''
			},
			back: function() {
				uni.navigateBack({
					delta: 1
				})
			},
			tiaozhuan: function(type, businessId) {
				if (type == 1) {
					uni.navigateTo({
						url: '../index/productDetails?id=' + businessId
					})
				} else if (type == 2) {
					uni.navigateTo({
						url: 'shop?id=' + businessId
					})
				}
			}

		}
	}
</script>

<style lang="scss">
	.bg {
		position: absolute;
		top: 0upx;
		left: 0upx;

		image {
			width: 750upx;
			height: 450upx;
		}
	}

	.top {
		position: relative;
		// margin-top: 20upx;
		z-index: 99;
		overflow: hidden;

		.textBox {
			float: left;
			background-color: rgba(255, 255, 255, 0.6);
			border-radius: 50upx;
			margin-left: 50rpx;

			input {
				height: 60upx;
				width: 520upx;
				line-height: 60upx;
				padding-left: 20upx;
				font-size: 26upx;
			}

			.uni-input-placeholder {
				color: #ffffff !important;
			}

		}

		.imgBox {
			padding-left: 30upx;
			padding-right: 20upx;
			float: right;

			image {
				width: 40upx;
				height: 7upx;
			}
		}
	}

	.head {
		width: 710upx;
		position: relative;
		margin-left: 20upx;
		margin-top: 50rpx;

		.head_img {
			float: left;

			image {

				width: 115upx;
				height: 115upx;
				border-radius: 5upx;
			}
		}

		.head_text {
			float: left;
			padding-left: 20upx;
			width: 315rpx;

			.h2 {
				text {
					font-size: 36upx;
					color: #fff;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					display: block;
					width: 350rpx;
				}
			}

			.star1 {
				padding-top: 20upx;

				image {
					width: 216upx;
					height: 36upx !important;
					display: block;
				}
			}
		}

		.collect {
			float: right;
			margin-top: 30upx;
			text-align: center;
			width: 150upx;
			height: 50upx;
			border: 1px solid #fff;
			border-radius: 40upx;
			line-height: 50upx;

			text {
				display: block;
				padding-bottom: 20upx;
				overflow: hidden;
				font-size: 24upx;
				color: #fff;
			}
		}

	}

	.banner {
		width: 93%;
		position: absolute;
		top: 330upx;
		left: 30upx;
		margin: 0 auto;
		display: block;
		box-shadow: 0 0 5px #999;
		border-radius: 20upx;

		image {
			width: 100%;
			height: 262upx;
			margin: 0 auto;
			display: block;
			border-radius: 20upx;
		}
	}

	.swipe-list {
		white-space: nowrap;
		position: relative;
		left: 30rpx;
		top: -20rpx;

		.swiperPage {
			width: fit-content;
			height: 115rpx;
			background-color: #FFFFFF;
			border-top-right-radius: 10rpx;
			border-bottom-right-radius: 10rpx;
			display: inline-block;
			margin-right: 20rpx;

			.pageLeft {
				width: 117rpx;
				height: 115rpx;
				float: left;
				// background-color: #416cf8;
				border-top-left-radius: 10rpx;
				border-bottom-left-radius: 10rpx;
				position: relative;
				overflow: hidden;

				image {
					position: absolute;
					left: 0;
					top: 0;
					width: 100%;
					height: 100%;
				}

				.spansTop {
					color: #FFFFFF;
					text-align: center;
					margin-top: 15rpx;
					position: relative;

					text {
						font-size: 28rpx;
					}

					span {
						font-size: 20rpx;
					}
				}

				.spansBut {
					text-align: center;
					position: relative;

					text {
						font-size: 18rpx;
					}

					color: #FFFFFF;
				}
			}
		}

		.pageCenter {
			float: left;
			height: 100%;
			box-sizing: border-box;
			padding: 15rpx 0 15rpx 15rpx;
		}

		.pageRight {
			float: right;
			height: 100%;
			width: 100rpx;
			position: relative;
			margin-right: 20rpx;
			margin-left: 15rpx;

			.right_bot {
				position: absolute;
				width: 100rpx;
				height: 50rpx;
				background: -webkit-linear-gradient(left, #f19260, #f26f40, #f35125);
				font-size: 20rpx;
				border-radius: 30rpx;
				text-align: center;
				line-height: 50rpx;
				top: 50%;
				transform: translateY(-25rpx);
				color: #FFFFFF;
				// right: 30rpx;

			}
		}

	}

	.ticket_a {
		margin-left: 30upx;
		background: #fff;
		margin-right: 30rpx;
		padding: 35rpx 30rpx;
		border-radius: 10rpx;

		.briefTop {
			overflow: hidden;
			margin-bottom: 10rpx;
		}

		.briefContent {
			color: #666;
			font-size: 23rpx;
			line-height: 45rpx;
			-webkit-line-clamp: 3;
			-webkit-box-orient: vertical;
			display: -webkit-box;
			text-overflow: ellipsis;
			overflow: hidden;
		}

		image {
			width: 690upx;
			height: 205upx;
		}
	}

	.BoxBox {
		// background-color: #fff;
		margin-top: 30rpx;
	}

	.biaot {
		border-bottom: 1px solid #ccc;
		font-size: 30upx;
		line-height: 80upx;
		padding-left: 20upx;

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

	.list {
		// width: 710upx;
		margin: 30upx;
		overflow: hidden;
		padding-top: 10upx;
		position: relative;

		.content:nth-child(odd) {
			float: left;
		}

		.content:nth-child(even) {
			float: right;
		}

		.content {
			margin-bottom: 20upx;
			display: black;
			width: calc(50% - 13rpx);
			// float: left;
			box-shadow: 0 0 5px #ccc;
			border-radius: 20upx;
			padding-bottom: 20upx;
			overflow: hidden;
			background-color: #FFFFFF;
			height: 500rpx;

			.imgBox {
				
				image {
					width: 100%;
					height: 320rpx!important;
					float: left;
				}
			}

			.txt_a {
				padding-top: 10upx;
				width: 90%;
				margin-left: 20upx;
				float: left;

				.titleText {
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}

				text {
					font-size: 26upx;
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
						margin-right: 6upx;
						font-size: 20upx;
					}
				}

				.txt_aas {
					padding-top: 15upx;

					text {
						color: #333;
						font-size: 26upx;

						text {
							color: #ff3333;
							font-size: 26upx;
							font-weight: bold;
						}
					}

					text:nth-child(2) {
						color: #999999;
						font-size: 24upx;
						float: right;
						line-height: 40upx;
					}
				}

			}
		}

		.Boxaaa {
			overflow: hidden;
			margin-bottom: 20upx;
		}
	}
</style>
