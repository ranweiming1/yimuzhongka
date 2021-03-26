<template>
	<view style="background-color: #f4f6f8;">
	<!-- ----------------店铺1------------------- -->
		<view class="shop-one"  v-if="shopStyle==1">
			<view class="shop-top">
				<view class="shop-bag">
					<swiper class="logo-swper-list" :current="currentIndex" :circular="true" :duration="100"
						@change="swierChange">
						<swiper-item class="logo-swper-item" v-for="(item,i) in banner" :key="i">
							<image :src="item.img" mode=""></image>
						</swiper-item>
					</swiper>
					<view class="swper-item-icon">
						<text>高分好店</text><text>4.8分</text>
					</view>
					<div class="logo-swper-dots">
						<div v-for="(item,i) in banner" class="dots-item">
							<div :class="i==currentIndex?'add-dots':'move-dots'"></div>
						</div>
					</div>
				</view>
				<view class="shop-search">
					<view class="shop-search-back" @tap='back'>
						<image src="../../static/icon_26-2.png" mode=""></image>
					</view>
					<view class="shop-search-input">
						<input type="text" @confirm="search" v-model="value" placeholder="请输入关键字" />
					</view>
				</view>
			</view>

			<view class="shop-company">
				<view class="shop-company-name">
					<view class="company-name-title">
						公司简介
					</view>
					<view :class="isShowCont?'company-name-right-rotate':'company-name-right'" @tap="showContent">
						<image :src="isShowCont?'../../static/icon_26-4.png':'../../static/icon_26.png'" mode=""></image>
					</view>
				</view>
				<view :class="isShowCont?'showContent':'shop-company-content'">
					<rich-text :nodes="jieshao"></rich-text>
				</view>
			</view>

			<view class="shop-discount">
				<view class="shop-discount-top">
					<view class="discount-top-name">
						{{store.shopName}}
					</view>
					<view class="discount-top-icon">
						<image src="../../static/honerIcon.png" mode=""></image>
					</view>
					<view class="discount-top-bott" @tap="shouC(shopsId)">
						收藏
					</view>
				</view>
				<view class="shop-discount-center">
					<view class="discount-center-xing">
						<view class="xing-item" v-for="(item,i) in 5">
							<image src="../../static/xing_icon.png" mode=""></image>
						</view>
					</view>
					<view class="discount-center-score">
						5分
					</view>
				</view>

				<view class="shop-coupon" v-if="quan">
					<scroll-view scroll-x="true" style="width: 100%;">
						<view class="coupon-item" v-for="(item,i) in quan">
							<view class="shop-coupon-img">
								<image src=""
									:src="(i%2==0)?'../../static/coupon_odd.png':'../../static/coupon_even.png'"
									mode=""></image>
							</view>
							<view class="coupon-icon" :style="(i%2)?'background: #b8bdcd;':'background: #ffbe71;'">
								优惠
							</view>
							<view class="coupon-price">
								<text
									style="font-size: 26rpx;display:block; float: left;margin-top: 2rpx;">￥</text>{{item.money}}
							</view>
							<view class="coupon-right">
								<view class="coupon-right-man">
									满{{item.condition}}元可用
								</view>
								<view class="coupon-right-data">
									有效期至 {{item.useEndTime.split(' ')[0]}}
								</view>
							</view>
						</view>

					</scroll-view>
				</view>
			</view>


			<view class="shop-classify">
				<scroll-view class="shop-classify-scroll" scroll-x="true" style="width: 100%;">
					<view class="classify-scroll-item" v-for="(item,i) in typeList">{{item.cateTitle}}</view>

				</scroll-view>
			</view>
			<view class="shop-hort">
				<view class="hort-title">
					<view class="hort-title-left">
						<text class="text-line" style="padding-right: 8rpx;">——</text>
						<text style="display: inline-block;position: relative;">热门商品<text
								class="text-yuan"></text></text>
						<text class="text-line" style="padding-left: 8rpx;">——</text>
					</view>

				</view>
				<view class="hort-list">
					<view class="hort-list-item" v-for="(item,i) in gList" @tap="detail(item.goodsId)">
						<view class="list-item-logo">
							<image class="logo-border" src="../../static/bckBorder.png" mode=""></image>
							<image :src="item.goodsLogo" mode=""></image>
						</view>
						<view class="list-item-right">
							<view class="item-title">
								<view class="hort-title-right">
									热
								</view>
								<view class="item-right-title">
									{{item.goodsName}}
								</view>
							</view>
							<view class="item-right-bottom">
								<view class="item-right-price">
									￥{{item.marketPrice?item.marketPrice.toFixed(2):'暂无价格'}}
								</view>
								<view class="item-right-sales">
									{{item.salesSum}}人已付款
								</view>
							</view>
						</view>

					</view>
				</view>
			</view>
		</view>
		<!------------------------- 店铺2 ------------------------------>
		<view class="shop-two" v-if="shopStyle==3">
			<view style='posotion:relative;height:660rpx;'>
				<view class="bg">
					<image src="../../static/icon_39_2.png" mode=""></image>
				</view>

				<!-- 头部 -->
				<view class="top toubu1">
					<view class='back' @tap='back' style='float:left;padding: 10rpx 35rpx;'>
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
						<image
							:src="store.storeLogo?store.storeLogo:'../../static/230abf8eb0244a128649f337a7d4aae3.png'"
							mode=""></image>
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
				<swiper class="banner" :autoplay="autoplay" :indicator-active-color="activeColor"
					:indicator-color="indColor" scroll-x indicator-dots :interval="interval" :duration="duration"
					style="height:350rpx;">
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
						<p style="font-size: 22rpx;color: #000000;line-height: 30rpx;">
							满{{item.condition}}-{{item.money}}立减劵</p>
						<p style="font-size: 20rpx;color: #282828;line-height: 30rpx">{{item.name}}</p>
						<p style="font-size: 18rpx;color: #888888;line-height: 30rpx">
							使用时间:{{item.useStartTime.split(' ')[0]}}-{{item.useEndTime.split(' ')[0]}}</p>
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
					<span style="color: #3564ff;font-size: 25rpx;display: inline-block;float: right;"
						@tap="showContent">{{isShowCont?'收起':'更多'}}</span>
				</view>
				<view :class="isShowCont?'showContent':'briefContent'">
					<rich-text :nodes="jieshao"></rich-text>
					<!-- <text>{{jieshao}}</text> -->
				</view>
			</view>

			<!-- 热门推荐 -->
			<view class="BoxBox">
				<view style='text-align:center;overflow: hidden;'>
					<view
						style='width:6rpx;height:20rpx;background:#ccc;transform:rotateZ(30deg);border-radius:10rpx;float:left;margin-top:15rpx;margin-left:273rpx;'>
					</view>
					<view
						style='width:6rpx;height:30rpx;background:#ccc;transform:rotateZ(30deg);border-radius:10rpx;margin-left:6rpx;float:left;margin-top:10rpx;'>
					</view>
					<view style='float:left;margin-left:20rpx;'>热门产品</view>
					<view
						style='width:6rpx;height:30rpx;background:#ccc;transform:rotateZ(30deg);border-radius:10rpx;margin-left:20rpx;float:left;margin-top:10rpx;'>
					</view>
					<view
						style='width:6rpx;height:20rpx;background:#ccc;transform:rotateZ(30deg);border-radius:10rpx;margin-left:6rpx;float:left;margin-top:15rpx;'>
					</view>
				</view>

				<view class="activeCss">
					<view class="content-item" @tap="detail(item.goodsId)" v-for="(item , index) in gList">
						<view class="imgBox">
							<image :src="item.goodsLogo" mode=""></image>
						</view>
						<view class="content-item-text">
							<view class="title_top"><strong><strong></strong></strong>
								<text class="span_a" v-if="item.selfStatus=='Y'">自营</text>
								<text class="titleText">{{item.goodsName}}</text>
							</view>
							<view class="item-coupon">
								<view class="coupon-item" v-for="(items,indexs) in item.couponDTOS">
									<text>满{{items.condition}}-{{items.money}}元</text>
								</view>
								<view class="coupon-item">
									<text>包邮</text>
								</view>

							</view>
							<view class="item-price">
								<text class="price-text">￥{{item.marketPrice?item.marketPrice.toFixed(2):'暂无价格'}}</text>
								<text class="shop-sales">销量：{{item.salesSum}}</text>
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

		</view>
		<!--================================== 店铺3 =======================================-->
		<view class="shop-three" v-if="shopStyle==1">
			<view class="shop-top">
				<view class="shop-bag">
					<image src="../../static/shopBagTwo.png" mode=""></image>
				</view>
				<view class="shop-search">
					<view class="shop-search-back" @tap='back'>
						<image src="../../static/icon_26-2.png" mode=""></image>
					</view>
					<view class="shop-search-input">
						<input type="text" @confirm="search" v-model="value" placeholder="请输入关键字" />
					</view>
				</view>
				<view class="shop-logo-swper">
					<swiper class="logo-swper-list" :current="currentIndex" :circular="true" next-margin="95rpx"
						:duration="100" @change="swierChange">
						<swiper-item class="logo-swper-item" v-for="(item,i) in banner" :key="i">
							<image class="slide-image" :src="item.img" :class="currentIndex === i?'active':''" mode="">
							</image>
						</swiper-item>
					</swiper>
					<div class="logo-swper-dots">
						<div v-for="(item,i) in banner" class="dots-item">
							<div :class="i==currentIndex?'add-dots':'move-dots'"></div>
						</div>
					</div>
				</view>
			</view>
			<view class="shop-discount">
				<view class="shop-discount-top">
					<view class="discount-top-name">
						{{store.shopName}}
					</view>
					<view class="discount-top-icon">
						<image src="../../static/honerIcon.png" mode=""></image>
					</view>
					<view class="discount-top-bott" @tap="shouC(shopsId)">
						{{!isShow?'收藏':'取消收藏'}}
					</view>
				</view>
				<view class="shop-discount-center">
					<view class="discount-center-xing">
						<view class="xing-item" v-for="(item,i) in 5">
							<image src="../../static/xing_icon.png" mode=""></image>
						</view>
					</view>
					<view class="discount-center-score">
						5分
					</view>
				</view>

				<view class="shop-coupon" v-if="quan">
					<scroll-view scroll-x="true" style="width: 100%;">
						<view class="coupon-item" v-for="(item,i) in quan">
							<view class="shop-coupon-img">
								<image src=""
									:src="(i%2==0)?'../../static/coupon_odd.png':'../../static/coupon_even.png'"
									mode=""></image>
							</view>
							<view class="coupon-icon" :style="(i%2)?'background: #b8bdcd;':'background: #ffbe71;'">
								优惠
							</view>
							<view class="coupon-price">
								<text
									style="font-size: 26rpx;display:block; float: left;margin-top: 2rpx;">￥</text>{{item.money}}
							</view>
							<view class="coupon-right">
								<view class="coupon-right-man">
									满{{item.condition}}元可用
								</view>
								<view class="coupon-right-data">
									有效期至 {{item.useEndTime.split(' ')[0]}}
								</view>
							</view>
						</view>

					</scroll-view>
				</view>
			</view>
			<view class="shop-company">
				<view class="shop-company-name">
					<view class="company-name-title">
						公司简介
					</view>
					<view :class="isShowCont?'company-name-right-rotate':'company-name-right'" @tap="showContent">
						<image :src="isShowCont?'../../static/icon_26-4.png':'../../static/icon_26.png'" mode=""></image>
					</view>
				</view>
				<view :class="isShowCont?'showContent':'shop-company-content'">
					<rich-text :nodes="jieshao"></rich-text>
				</view>
			</view>
			<view class="shop-classify">
				<scroll-view class="shop-classify-scroll" scroll-x="true" style="width: 100%;">
					<view class="classify-scroll-item" v-for="(item,i) in typeList">{{item.cateTitle}}</view>
				</scroll-view>
			</view>
			<view class="shop-hort">
				<view class="hort-title">
					<view class="hort-title-left">
						热门产品
					</view>
					<view class="hort-title-right">
						热
					</view>
				</view>
				<view class="hort-list">
					<view class="hort-list-item" v-for="(item,i) in gList" @tap="detail(item.goodsId)">
						<view class="list-item-logo">
							<image :src="item.goodsLogo" mode=""></image>
						</view>
						<view class="list-item-right">
							<view class="item-right-title">
								{{item.goodsName}}
							</view>
							<view class="item-right-spec" v-if="false">
								商品规格
							</view>
							<view class="item-right-bottom">
								<view class="item-right-price">
									￥{{item.marketPrice?item.marketPrice.toFixed(2):'暂无价格'}}
								</view>
								<view class="item-right-sales">
									{{item.salesSum}}人已付款
								</view>
							</view>
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
				gList: [],
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
				quan: [],
				id: '',
				jieshao: '',
				isShowCont: false,
				currentIndex: 0,
				typeList:[],
				shopStyle:''
			}
		},
		components: {
			buttom
		},
		onLoad(option) {
			// console.log(2222)
			var shopsId = option.id
			this.shopsId = option.id
			this.id = option.s
			var _this = this
			this.$https({
				url: '/api/oauth/shop/store-index',
				data: {
					// shopId: option.id
					shopId: 11
				},
				dengl: uni.getStorageSync('Authorization') ? false : true,
				success: function(res) {
					_this.store = res.data.data.storeShop
					_this.gList = res.data.data.goodsList
					_this.ban = res.data.data.banners
					_this.youhui = res.data.data.goodsList.couponDTOS

				}

			})
			console.log(this.gList)
			// 分类
			this.$https({
				url: '/api/oauth/get-one-list',
				data: {
					// shopId: option.id
					shopId: 11
				},
				dengl: true,
				success: function(res) {
					_this.typeList = res.data.data
				}
			})
			this.$https({
				url: '/api/oauth/shop/store-shop-detail',
				data: {
					// shopId: option.id
					shopId: 11
				},
				dengl: uni.getStorageSync('Authorization') ? false : true,
				success: function(res) {
					_this.isShow = res.data.data.shopCollectStatus
					_this.jieshao = res.data.data.introduction,
					_this.shopStyle=res.data.data.modelId
				}
			})
			this.$https({
				url: '/api/oauth/shop/get-store-banner-list',
				data: {
					// shopId: option.id
					shopId: 11
				},
				method: 'post',
				dengl: uni.getStorageSync('Authorization') ? false : true,
				success: res => {
					this.banner = res.data.data
					if (res.data.data.length == 0) {
						this.banner = [{
							img: '../../static/banner.jpg'
						}]
					}
				}
			})
			this.$https({
				url: '/api/oauth/shop/store-coupon-list',
				data: {
					// shopId: option.id
					shopId: 11
				},
				dengl: uni.getStorageSync('Authorization') ? false : true,
				success: res => {
					this.quan = res.data.data
				}
			})
		},
		methods: {
			swierChange: function(e) {
				this.currentIndex = e.detail.current
			},
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
			showContent() {
				this.isShowCont = !this.isShowCont
			},
			shouC(id) {
				if (this.denglufangfatiaozhuan()) {
					var _this = this
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
				}
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
	.shop-one {
		.shop-top {
			.shop-bag {
				position: relative;
				top: 0;
				left: 0;
				right: 0;

				swiper {
					height: 375rpx;
				}

				image {
					width: 100%;
					height: 100%;

				}


				.swper-item-icon {
					position: absolute;
					color: #000f20;
					top: 190rpx;
					left: 40rpx;
					height: 50rpx;
					line-height: 50rpx;
					width: 245rpx;
					font-size: 24rpx;
					border-radius: 10rpx;
					overflow: hidden;

					text:first-child {
						display: inline-block;
						background: #f5d14a;
						width: 156rpx;
						text-align: center;
					}

					text:last-child {
						text-align: center;
						background: #fff;
						display: inline-block;
						width: calc(100% - 156rpx);
					}
				}

				.logo-swper-dots {
					overflow: hidden;
					position: absolute;
					bottom: 40rpx;
					right: 40rpx;

					.dots-item {
						float: left;
						margin-right: 6rpx;
					}

					.move-dots {

						width: 10rpx;
						height: 10rpx;
						border-radius: 50%;
						background-color: #edebe9;

					}

					.add-dots {
						width: 30rpx;
						height: 12rpx;
						background: #f4cc3d;
						border-radius: 8rpx;
					}
				}


			}

			.shop-search {
				position: absolute;
				overflow: hidden;
				margin-top: 90rpx !important;
				top: 0;

				.shop-search-back {
					float: left;
					padding: 15rpx 35rpx;
					height: 100%;


					image {
						width: 18rpx;
						height: 32rpx;
						display: inline-block;

					}
				}

				.shop-search-input {
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

				}
			}

		}

		.shop-discount {
			background-color: #fff;
			padding: 35rpx 30rpx 20rpx 30rpx;

			.shop-discount-top {
				overflow: hidden;

				.discount-top-name {
					font-size: 34rpx;
					color: #181818;
					float: left;
					margin-right: 30rpx;
				}

				.discount-top-icon {
					float: left;

					image {
						height: 30rpx;
						width: 20rpx;
						display: inline-block;
						vertical-align: middle;
					}
				}

				.discount-top-bott {
					height: 50rpx;
					width: 140rpx;
					line-height: 50rpx;
					box-sizing: border-box;
					border: 2rpx solid #ff6600;
					float: right;
					border-radius: 40rpx;
					text-align: center;
					color: #ff6600;
					font-size: 24rpx;
					margin-right: 20rpx;
				}
			}

			.shop-discount-center {
				overflow: hidden;
				line-height: 50rpx;
				margin-bottom: 20rpx;

				.discount-center-xing {
					float: left;
					margin-right: 10rpx;

					.xing-item {
						float: left;
						margin-right: 6rpx;

						image {
							height: 22rpx;
							width: 22rpx;
						}
					}
				}

				.discount-center-score {
					float: left;
					font-size: 20rpx;
					color: #ff6600;
					vertical-align: middle;
				}
			}

			.shop-coupon {
				width: 100%;

				scroll-view {
					height: 120rpx;
					white-space: nowrap;

					.coupon-item:nth-child(even) .coupon-icon {
						color: #737889;
					}

					.coupon-item:nth-child(odd) .coupon-icon {
						color: #FF6600;
					}

					.coupon-item {
						height: 120rpx;
						display: inline-block;
						width: calc((100% - 10rpx)/2);
						margin-right: 10rpx;
						position: relative;
						border-radius: 15rpx;
						overflow: hidden;

						.shop-coupon-img {
							position: absolute;
							width: 100%;
							height: 120rpx;

							image {
								width: 100%;
								height: 120rpx;
								display: block;
							}
						}

						.coupon-icon {
							font-size: 23rpx;
							opacity: 0.5;
							width: 130rpx;
							text-align: center;
							height: 36rpx;
							line-height: 36rpx;
							border-bottom-right-radius: 15rpx;
						}

						.coupon-price {
							position: relative;
							color: #fff;
							float: left;
							margin: 20rpx 15rpx 25rpx 30rpx;
							font-size: 38rpx;
						}

						.coupon-right {
							position: relative;
							color: #fff;

							.coupon-right-man {
								font-size: 26rpx;
								margin-bottom: 10rpx;
							}

							.coupon-right-data {
								font-size: 20rpx;
							}
						}

					}
				}
			}


		}

		.shop-company {
			width: 100%;
			box-sizing: border-box;
			padding: 30rpx 40rpx 20rpx 30rpx;
			background-color: #fff;
			// height: 200rpx;
			position: relative;
			top: -20rpx;
			border-top-left-radius: 25rpx;
			border-top-right-radius: 25rpx;

			.shop-company-name {
				font-size: 24rpx;
				margin-bottom: 20rpx;
				overflow: hidden;

				.company-name-title {
					float: left;
				}

				.company-name-right {
					float: right;

					image {
						width: 14rpx;
						height: 22rpx;
					}
				}
				.company-name-right-rotate{
					float: right;
					image {
						width: 22rpx;
						height: 14rpx;
						
					}
				}
				
			}

			.shop-company-content {
				font-size: 22rpx;
				line-height: 35rpx;
				word-break: break-word;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 4;
				-webkit-box-orient: vertical;

			}
			.showContent {
				color: #666;
				font-size: 23rpx;
				line-height:35rpx;
			}

		}

		.shop-classify {
			padding: 0 30rpx;

			.shop-classify-scroll {
				white-space: nowrap;
				height: 100rpx;
				line-height: 100rpx;

				.classify-scroll-item {
					font-size: 30rpx;
					display: inline-block;
					margin-right: 35rpx;
				}

				.classify-scroll-item:last-child {
					margin-right: 0;
				}
			}

		}

		.shop-hort {
			background-color: #fff;

			.hort-title {
				overflow: hidden;
				height: 45rpx;
				padding-top: 30rpx;
				padding-left: 30rpx;

				.hort-title-left {
					font-size: 30rpx;
					color: #181818;
					text-align: center;

					.text-line {
						color: #ed5d1f;

					}

					.text-yuan {
						width: 10rpx;
						height: 10rpx;
						background: #ed5d1f;
						display: inline-block;
						border-radius: 50%;
						position: absolute;
						top: 2.5rpx;
						right: -5px;
					}
				}

			}

			.hort-list {
				margin: 30rpx 28rpx;
				overflow: hidden;

				.hort-list-item:nth-child(odd) {
					float: left;
				}

				.hort-list-item:nth-child(even) {
					float: right;
				}

				.hort-list-item {
					border-bottom: 1rpx solid #f6f6f6;
					width: calc((100% - 28rpx)/2);
					box-sizing: border-box;
					height: 456rpx;
					border-radius: 15rpx;
					overflow: hidden;
					margin-bottom: 28rpx;
					box-shadow: 0 1px 2px 1px rgba(0, 19, 41, 0.08);

					.list-item-logo {
						width: 100%;
						height: 332rpx;
						box-sizing: border-box;
						position: relative;

						.logo-border {
							position: absolute;
						}

						image {

							width: 100%;
							height: 100%;
							display: block;
						}
					}

					.item-title {
						padding-left: 15rpx;
						padding-top: 20rpx;
						overflow: hidden;
					}

					.list-item-right {
						box-sizing: border-box;
						height: calc(100% - 332rpx);
						position: relative;

						.hort-title-right {
							// padding-left: ;
						}

						.hort-title-right {
							height: 34rpx;
							line-height: 34rpx;
							font-size: 24rpx;
							color: #ff4267;
							border: 2rpx solid #ff4267;
							box-sizing: border-box;
							width: 48rpx;
							text-align: center;
							border-radius: 20rpx;
							background: #ffecf0;
							float: left;
							margin-right: 10rpx;
						}

						.item-right-title {
							font-size: 26rpx;
							width: calc(100% - 73rpx);
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}


						.item-right-bottom {
							overflow: hidden;
							font-size: 24rpx;
							width: 100%;
							box-sizing: border-box;
							position: absolute;
							bottom: 20rpx;

							.item-right-price {
								float: left;
								color: #ed5d1f;
								padding-left: 15rpx;

								text {
									font-size: 11px;
									display: inline-block;
									float: left;
									margin-right: 9rpxr
								}
							}

							.item-right-sales {
								color: #9b9b9b;
								margin-right: 15rpx;
								float: right;
								font-size: 20rpx;
							}
						}
					}
				}



			}


		}

	}

	.shop-two {
		.activeCss {
			padding: 20rpx 28rpx;

			.content-item {
				background-color: #fff;
			}
		}

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
			width: 700rpx;
			position: absolute;
			top: 330upx;
			left: 25upx;
			right: 25rpx;
			margin: 0 auto;
			display: block;
			box-shadow: 0 0 5px #999;
			border-radius: 20upx;

			image {
				width: 100%;
				height: 350upx;
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

			.showContent {
				color: #666;
				font-size: 23rpx;
				line-height: 45rpx;
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
						height: 320rpx !important;
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
	}

	.shop-three {

		.shop-top {
			.shop-bag {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;

				image {
					width: 100%;
					height: 450rpx;
				}
			}

			.shop-search {
				position: relative;
				overflow: hidden;
				margin-top: 90rpx !important;

				.shop-search-back {
					float: left;
					padding: 15rpx 35rpx;
					height: 100%;


					image {
						width: 18rpx;
						height: 32rpx;
						display: inline-block;

					}
				}

				.shop-search-input {
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

				}
			}

			.shop-logo-swper {
				width: 100%;
				margin-left: 30rpx;
				position: relative;
				top: 40rpx;
				box-sizing: border-box;

				.logo-swper-dots {
					overflow: hidden;
					position: absolute;
					bottom: 20rpx;
					right: 150rpx;

					.dots-item {
						float: left;
						margin-right: 6rpx;
					}

					.move-dots {

						width: 10rpx;
						height: 10rpx;
						border-radius: 50%;
						background-color: #edebe9;

					}

					.add-dots {
						width: 30rpx;
						height: 12rpx;
						background: #ff6600;
						border-radius: 8rpx;
					}
				}



				.logo-swper-list {
					// width: 625rpx;
					height: 313rpx;
					// border-radius: 20rpx;
					overflow: hidden;

					.slide-image {
						position: absolute;
						height: 260rpx;
						width: 520rpx;
						opacity: 0.7;
						margin-right: 20rpx;
						border-radius: 20rpx;
						overflow: hidden;
						top: 52rpx;
					}

					.active {
						width: 626rpx;
						height: 313rpx;
						opacity: 1;
						z-index: 10;
						border-radius: 20rpx;
						overflow: hidden;
						top: 0;

						transition: all 0.2s ease-in 0s;
					}

				}
			}
		}

		.shop-discount {
			background-color: #fff;
			padding: 90rpx 30rpx 20rpx 30rpx;

			.shop-discount-top {
				overflow: hidden;

				.discount-top-name {
					font-size: 34rpx;
					color: #181818;
					float: left;
					margin-right: 30rpx;
				}

				.discount-top-icon {
					float: left;

					image {
						height: 30rpx;
						width: 20rpx;
						display: inline-block;
						vertical-align: middle;
					}
				}

				.discount-top-bott {
					height: 50rpx;
					width: 140rpx;
					line-height: 50rpx;
					box-sizing: border-box;
					border: 2rpx solid #ff6600;
					float: right;
					border-radius: 40rpx;
					text-align: center;
					color: #ff6600;
					font-size: 24rpx;
					margin-right: 20rpx;
				}
			}

			.shop-discount-center {
				overflow: hidden;
				line-height: 50rpx;
				margin-bottom: 20rpx;

				.discount-center-xing {
					float: left;
					margin-right: 10rpx;

					.xing-item {
						float: left;
						margin-right: 6rpx;

						image {
							height: 22rpx;
							width: 22rpx;
						}
					}
				}

				.discount-center-score {
					float: left;
					font-size: 20rpx;
					color: #ff6600;
					vertical-align: middle;
				}
			}

			.shop-coupon {
				width: 100%;

				scroll-view {
					height: 120rpx;
					white-space: nowrap;

					.coupon-item:nth-child(even) .coupon-icon {
						color: #737889;
					}

					.coupon-item:nth-child(odd) .coupon-icon {
						color: #FF6600;
					}

					.coupon-item {
						height: 120rpx;
						display: inline-block;
						width: calc((100% - 10rpx)/2);
						margin-right: 10rpx;
						position: relative;
						border-radius: 15rpx;
						overflow: hidden;

						.shop-coupon-img {
							position: absolute;
							width: 100%;
							height: 120rpx;

							image {
								width: 100%;
								height: 120rpx;
								display: block;
							}
						}

						.coupon-icon {
							font-size: 23rpx;
							opacity: 0.5;
							width: 130rpx;
							text-align: center;
							height: 36rpx;
							line-height: 36rpx;
							border-bottom-right-radius: 15rpx;
						}

						.coupon-price {
							position: relative;
							color: #fff;
							float: left;
							margin: 20rpx 15rpx 25rpx 30rpx;
							font-size: 38rpx;
						}

						.coupon-right {
							position: relative;
							color: #fff;

							.coupon-right-man {
								font-size: 26rpx;
								margin-bottom: 10rpx;
							}

							.coupon-right-data {
								font-size: 20rpx;
							}
						}

					}
				}
			}


		}

		.shop-company {
			width: 100%;
			box-sizing: border-box;
			padding: 30rpx 40rpx 20rpx 30rpx;
			background-color: #fff;
			margin-top: 10rpx;
			// height: 200rpx;

			.shop-company-name {
				font-size: 24rpx;
				margin-bottom: 20rpx;
				overflow: hidden;

				.company-name-title {
					float: left;
				}

				.company-name-right {
					float: right;

					image {
						width: 14rpx;
						height: 22rpx;
					}
				}
				.company-name-right-rotate{
					float: right;
					image {
						width: 22rpx;
						height: 14rpx;
						
					}
				}
			}

			.shop-company-content {
				font-size: 22rpx;
				line-height: 35rpx;
				color: #666;
				word-break: break-word;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 4;
				-webkit-box-orient: vertical;

			}

			.showContent {
				color: #666;
				font-size: 23rpx;
				line-height:35rpx;
			}

		}

		.shop-classify {
			padding: 0 30rpx;

			.shop-classify-scroll {
				white-space: nowrap;
				height: 100rpx;
				line-height: 100rpx;

				.classify-scroll-item {
					font-size: 30rpx;
					display: inline-block;
					margin-right: 35rpx;
				}

				.classify-scroll-item:last-child {
					margin-right: 0;
				}
			}

		}

		.shop-hort {
			background-color: #fff;

			.hort-title {
				overflow: hidden;
				height: 45rpx;
				padding-top: 30rpx;
				padding-left: 30rpx;

				.hort-title-left {
					font-size: 30rpx;
					color: #181818;
					float: left;
				}

				.hort-title-right {
					height: 34rpx;
					line-height: 34rpx;
					font-size: 24rpx;
					color: #ff4267;
					border: 2rpx solid #ff4267;
					box-sizing: border-box;
					width: 48rpx;
					text-align: center;
					float: left;
					border-radius: 20rpx;
					background: #ffecf0;
					margin-left: 12rpx;
				}
			}

			.hort-list {

				.hort-list-item {
					overflow: hidden;
					padding: 20rpx 30rpx;
					border-bottom: 1rpx solid #f6f6f6;

					.list-item-logo {
						float: left;

						image {
							width: 200rpx;
							height: 200rpx;
							border-radius: 15rpx;
							overflow: hidden;
							display: block;
						}
					}

					.list-item-right {
						width: calc(100% - 200rpx);
						float: left;
						box-sizing: border-box;
						padding-left: 20rpx;
						height: 200rpx;
						position: relative;

						.item-right-title {
							font-size: 26rpx;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}

						.item-right-spec {
							line-height: 52rpx;
							font-size: 22rpx;
							color: #bcbcbc;
							background: #f8f8f8;
							width: fit-content;
							padding: 0 15rpx;
							border-radius: 6rpx;
							margin-top: 6rpx;
						}

						.item-right-bottom {
							overflow: hidden;
							font-size: 24rpx;
							position: absolute;
							bottom: 10rpx;

							.item-right-price {
								float: left;
								color: #ed5d1f;

								text {
									font-size: 11px;
									display: inline-block;
									float: left;
									margin-right: 9rpxr
								}
							}

							.item-right-sales {
								color: #9b9b9b;
								margin-left: 35rpx;
								float: left;
							}
						}
					}
				}



			}


		}

	}
</style>
