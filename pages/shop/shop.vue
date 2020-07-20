<template>
	<view>
		<view style='posotion:relative;height:570rpx;'>
			<view class="bg">
				<image src="../../static/icon_39.png" mode=""></image>
			</view>

			<!-- 头部 -->
			<view class="top toubu">
				<view class="textBox">
					<input class="uni-input" @confirm="search" v-model="value" placeholder="请输入关键字" />
				</view>
				<view class="imgBox">
					<image src="../../static/icon_40.png" mode=""></image>
				</view>
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
			<swiper class="banner" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration"
			 style="height:262rpx;">
				<swiper-item>
					<image src="../../static/banner.jpg" mode=""></image>
				</swiper-item>
			</swiper>
		</view>

		<!-- 优惠券入口 -->
		<view class="ticket_a">
			<image src="../../static/icon_42.png" mode=""></image>
		</view>

		<!-- 热门推荐 -->
		<view class="BoxBox">
			<view class="biaot">
				<text>热门推荐</text>
				<view class="dele" @tap="more">
					<text>更多</text>
				</view>
			</view>

			<view class="hahah list uni-flex uni-column" @click="detail(item.goodsId)" v-for="(item , index) in gList">
				<view class="content ">
					<view class="imgBox">
						<image :src="item.goodsLogo" mode="widthFix"></image>
					</view>
					<view class="txt_a">
						<text class="span_a" v-if="item.selfStatus=='Y'">自营</text>
						<text>{{item.goodsName}}</text>
						<view class="txt_aa">
							<!-- <text>买一送三</text> -->
							<text v-for="(items,indexs) in item.couponDTOS">满{{items.condition}}-{{items.money}}元</text>
						</view>
						<view class="txt_aas">
							<text>税后价：<text>￥{{item.shopPrice?item.shopPrice:'暂无价格'}}</text></text>
							<text>销量：{{item.salesSum}}</text>
						</view>

					</view>
				</view>
			</view>
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
				value: ''
			}
		},
		components: {
			buttom
		},
		onLoad(option) {
			// console.log(2222)
			var shopsId = option.id
			this.shopsId = option.id
			console.log(option)
			var _this = this
			this.$https({
					url: '/api/shop/store-index',
					data: {
						shopId: option.id
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
			console.log(this.bottom)
		},
		methods: {
			detail(id) {
				uni.navigateTo({
					url: '../index/productDetails?id=' + id
				})
				this.$https({
					url: '/api/oauth/shop/goods-brows-history-add',
					data: {
						goodsId: id
					},
					method: 'POST',
					dengl: true,
					success(res) {
						// console.log('添加成功')
						console.log(res.data)
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
		margin-left: 100upx;
		z-index: 99;
		overflow: hidden;

		.textBox {
			float: left;
			background-color: rgba(255, 255, 255, 0.6);
			border-radius: 50upx;

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
		margin-top:50rpx;
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
		top: 300upx;
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

	.ticket_a {
		margin-left: 30upx;

		image {
			width: 690upx;
			height: 205upx;
		}
	}

	.BoxBox {
		background-color: #fff;
		margin-top:30rpx;
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
		width: 710upx;
		margin: 20upx;
		overflow: hidden;
		padding-top: 10upx;
		position: relative;

		.content {
			display: black;
			width: 100%;
			// height: 250upx;
			border-bottom: 1px dotted #ccc;
			padding-bottom: 20upx;
			overflow: hidden;

			.imgBox {
				image {
					width: 30%;
					height: inherit;
					float: left;
				}
			}

			.txt_a {
				padding-top: 10upx;
				width: 67%;
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
					position: absolute;
					width: 100%;
					left:calc(30% +20rpx);
					bottom: 30rpx;

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
	}
</style>
