<template>
	<view class="frame">
		<view class="top">
			<view class="left">
				<text>首页</text>
				<image src="../../static/icon_09.png" mode=""></image>
			</view>
			<view class="right">
				<image src="../../static/icon_10.png" mode=""></image>
				<image src="../../static/icon_11.png" mode=""></image>
			</view>
		</view>
		<!-- 这是轮播图 -->
		<view class="banner">
			<swiper class="swiper" style="height: 262rpx;" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
			 :duration="duration">
				<swiper-item v-for="(item, index) in banList">
					<image :src="item.img" mode=""></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 分类 -->
		<!-- <view class="cate-section"> -->
		<!-- <view class="cate-item" v-for="(item,index) in cateList" :key=item.id>
				<image :src="item.imgUrl"></image>
				<text>{{item.cateTitle}}</text>
			</view> -->
		<!-- </view> -->
		<swiper style="height: 440rpx;" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
			<swiper-item class="cate-section" v-for="(item,index) in list" :key=item.id>
				<view class="cate-item" v-for="(items,indexs) in item">
					<image :src="items.imgUrl"></image>
					<text style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;">{{items.cateTitle}}</text>
				</view>
			</swiper-item>

		</swiper>

		<!-- 这也是轮播--优惠券 -->
		<!-- <view class="lunb">
			<image src="../../static/img_01.png" mode=""></image>
		</view> -->
		<swiper class="lunb" style="height: 160rpx;" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
		 :duration="duration">
			<swiper-item>
				<image src="../../static/img_01.png" mode=""></image>
			</swiper-item>
		</swiper>

		<!-- 热门推荐 ps:懒加载-->
		<view class="recommend">
			<view class="title">
				<text>热门推荐</text>
				<text>更多</text>
			</view>
			<view class="hahah list uni-flex uni-column" v-for="(item , index) in hotList">
				<view @click="detail(item.shopId)" class="content ">
					<view class="imgBox">
						<image :src="item.goodsLogo" mode="widthFix"></image>
					</view>
					<view class="txt_a">
						<text v-if="item.selfStatus=='Y'" class="span_a">自营</text>
						<text>{{item.goodsName}}</text>
						<view class="txt_aa">
							<text>买一送三</text>
							<text>满199-100元</text>
						</view>
						<view class="txt_aas">
							<text>税后价：<text>￥{{item.shopPrice}}</text></text>
							<text>销量：{{item.salesSum}}</text>
						</view>

					</view>
				</view>

			</view>
		</view>
		<tabBar :currentPage="currentPage"></tabBar>
	</view>
</template>

<script>
	import tabBar from '@/components/tabBar/tabBar.vue';
	export default {
		data() {
			return {
				currentPage: 'index',
				banList: [],
				cateList: [],
				hotList: {},
				wai: [],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				list: []
			}
		},
		components: {
			tabBar,
		},
		onLoad() {
			var _this = this
			this.$https({
				url: '/api/shop/mall-index',
				data: {},
				// dengl: false,
				success: function(res) {
					_this.banList = res.data.data.bannerList
					_this.cateList = res.data.data.cateList
					_this.hotList = res.data.data.recommedGoods
					//得到要循环的数量值
					var num = Math.ceil(_this.cateList.length / 8)
					for (var i = 0; i < num; i++) {
						var arr = []
						_this.cateList.map(function(n, index) {
							if (index >= i * 8 && index < (i + 1) * 8) {
								arr.push(n)
							}
						})
						_this.list.push(arr)
					}
					// console.log(res.data.data.cateList.request.index)
				}
			})
		},
		methods: {
			detail(id){
				uni.navigateTo({
					url:'productDetails?id='+id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../style/gg.css';

	.top {
		width: 100%;
		height: 90upx;
		overflow: hidden;

		.left {
			float: left;

			text {
				font-size: 38upx;
				font-weight: 500;
				display: block;
				padding: 20upx 20upx 5upx 30upx;
			}

			image {
				width: 34upx;
				height: 4upx;
				float: left;
				padding-left: 50upx;
			}
		}

		.right {
			float: right;
			margin-right: 20upx;

			image {
				margin: 20upx;
				width: 36upx;
				height: 36upx;
			}
		}
	}

	.banner {
		width: 90%;
		margin: 0 auto;
		display: block;
		box-shadow: 0 0 5px #ccc;
		border-radius: 20upx;

		image {
			width: 100%;
			height: 262upx;
			margin: 0 auto;
			display: block;
			border-radius: 20upx;
		}
	}

	.cate-section {
		display: flex;
		justify-content: space-around;
		align-items: flax-start;
		flex-wrap: wrap;
		padding: 30upx 0upx;
		background: #fff;
		border-bottom: 20upx solid #f2f4f7;
		overflow: hidden;

		.cate-item {
			display: flex;
			flex-direction: column;
			flex-wrap: nowrap;
			font-size: 30upx;
			color: #333333;
			width: 23%;
			margin-bottom: 20upx;
			padding-left: 1%;
		}

		image {
			width: 110upx;
			height: 110upx;
			margin-bottom: 15upx;
		}

	}

	.lunb {
		padding-top: 10upx;
		padding-bottom: 10px;
		;

		image {
			display: block;
			width: 726upx;
			height: 160upx;
			margin: 0 auto;
		}
	}

	.recommend {
		padding: 20upx;

		.title {
			border-bottom: 1px solid #ccc;
			height: 50upx;
			padding-bottom: 20upx;
			overflow: hidden;
		}

		.title text {
			float: left;
			font-size: 36upx;
			color: #333;
			font-weight: bold;
		}

		.title text:nth-child(2) {
			float: right;
			font-size: 24upx;
			color: #999;
			font-weight: 500;
			line-height: 50upx;
		}

		.list {
			overflow: hidden;
			padding-top: 10upx;

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
	}
</style>
