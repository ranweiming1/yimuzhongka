<template>
	<view class="frame">
		<!-- <view class="line" style="height: 50rpx;"></view> -->
		<view class="top toubu">
			<view class="left">
				<text>首页</text>
				<image src="../../static/icon_09.png" mode=""></image>
			</view>
			<view class="right">
				<image src="../../static/icon_10.png" mode="" @tap="search"></image>
				<!-- <image src="../../static/icon_11.png" mode=""></image> -->
			</view>
		</view>
		<!-- 这是轮播图 -->
		<view class="banner">
			<swiper class="swiper" style="height: 360rpx;border-radius:20rpx;" :autoplay="autoplay" :interval="interval"
			 :duration="duration" :circular='true'>
				<swiper-item v-for="(item, index) in banList" style='border-radius:20rpx;' @tap='b(item.businessId,item.type)'>
					<image :src="item.img" mode="" style='border-radius:20rpx;'></image>
				</swiper-item>
			</swiper>
		</view>
		<view style='margin:0 20rpx;overflow:hidden;line-height: 50rpx;'>
			<image style='width:20rpx;height:20rpx;float:left;margin-top:15rpx;' src='../../static/gonggao.jpg'></image>
			<view style='float:left;margin-left:10rpx;font-size:26rpx;line-height: 50rpx;'>[通知公告]</view>
			<swiper class='swiper' style='height:50rpx;float:left;width:calc(100% - 200rpx);color:#999;font-size:22rpx;line-height:50rpx;padding-left: 10rpx;'
			 :autoplay='autoplay' :interval='interval' :duration='duration' :circular='true' :vertical='true'>
				<swiper-item v-for='item in g' @tap='t(item)'>{{item.noticeTitle}}</swiper-item>
			</swiper>
		</view>
		<!-- 分类 -->
		<!-- <view class="cate-section"> -->
		<!-- <view class="cate-item" v-for="(item,index) in cateList" :key=item.id>
				<image :src="item.imgUrl"></image>
				<text>{{item.cateTitle}}</text>
			</view> -->
		<!-- </view> -->
		<swiper style="height: 440rpx;width:90%;margin-left:5%;text-align:center;" :interval="interval" :duration="duration"
		 @change='qiehuan' :disable-programmatic-animation='true'>
			<swiper-item class="cate-section" v-for="(item,index) in list" :key='item.id'>
				<view class="cate-item" v-for="(items,indexs) in item" @tap="fenLei(index,indexs)">
					<image :src="items.imgUrl" style='margin:0 auto;'></image>
					<text style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;margin-top:20rpx;">{{items.cateTitle}}</text>
				</view>
			</swiper-item>
		</swiper>
		<view style='text-align:center;border-bottom:10px solid #efefef;padding-bottom:20rpx;'>
			<view v-for='(item,index) in list' :style='int==index?"width:30rpx;height:10rpx;background:#2d5eff;display:inline-block;margin-left:20rpx;border-radius:6rpx;":"width:30rpx;height:10rpx;background:#ddd;display:inline-block;margin-left:20rpx;border-radius:6rpx;"'></view>
		</view>
		<!-- 这也是轮播--优惠券 -->
		<!-- <view class="lunb">
			<image src="../../static/img_01.png" mode=""></image>
		</view> -->
		<swiper class="lunb" style="height: 160rpx;" :autoplay="autoplay" :interval="interval" :duration="duration">
			<swiper-item @tap='tiaoz'>
				<image src="../../static/img_01.png" mode=""></image>
			</swiper-item>
		</swiper>

		<!-- 热门推荐 ps:懒加载-->
		<view class="recommend" style='overflow:hidden; padding: 20rpx 0'>
			<view class="title">
				<text>热门推荐</text>
				<image style='display:inline-block;width:36rpx;height:34rpx;margin-top:10rpx;margin-right:30rpx;' src='../../static/n8.png'
				 @tap='q'></image>
				<text @tap="more">更多</text>
			</view>
			<view class="clearCss">
				<view class="content-item" v-for="(item , index) in hotList" v-if='y' @tap="detail(item.goodsId)">
					<view class="imgBox">
						<image :src="item.goodsLogo" mode="widthFix"></image>
					</view>
					<view class="content-item-text">
						<view class="title_top">
							<text class="span_a" v-if="item.selfStatus=='Y'">自营</text>
							<text class="titleText">{{item.goodsName}}</text>
						</view>
						<view class="item-coupon">
							<view class="coupon-item" v-for="(items,indexs) in item.couponDTOS">
								<text>满{{items.condition}}-{{items.money}}元</text>
							</view>
							<view class="coupon-item" v-if='item.kuaidi==0'>
								<text>包邮</text>
							</view>
						</view>

						<view class="diZhi">
							<text>{{item.sendAddr}}</text>
						</view>
						<view class="item-price">
							<text class="price-text">￥{{item.marketPrice?item.marketPrice.toFixed(2):'暂无价格'}}</text>
							<view class="but_Icon">
								<view class="icons">
									<text class="icon1" @click.stop='dianpu(item.shopId)'>旺铺</text>
									<view class="icon2">
										<image src="../../static/qiyerenzheng.png" mode="">
									</view>
									<text class="icon2">购</text>
									<text class="icon2">品</text>
								</view>

							</view>

						</view>

					</view>
				</view>

			</view>
			<view class="activeCss">
				<view class="content-item" v-for='(item,index) in hotList' @tap='detail(item.goodsId)' v-if='!y' style="border-radius: 20rpx;overflow: hidden;">
					<view class="imgBox">
						<!-- <image :src="item.goodsLogo" mode="widthFix"></image> -->
						<image :src="item.goodsLogo" mode=""></image>
					</view>
					<view class="content-item-text">
						<view class="title_top">
							<text class="span_a" v-if="item.selfStatus=='Y'">自营</text>
							<text class="titleText">{{item.goodsName}}</text>
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

			</view>
		</view>
		<view class='zhezhao' v-if='youhuiquanle'>
			<view style='width:471rpx;margin:0 auto;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);'>
				<image src='../../static/youhu.png' style='width:471rpx;height:281rpx;display:block;'></image>
				<view style='background:#2b5cff;overflow:hidden;'>
					<view v-for='item in youhuiquan' style='background:#fff;overflow:hidden;width:90%;margin:10rpx auto;position:relative;'>
						<view style='background:#2b5cff;width:20rpx;height:20rpx;border-radius:50%;margin-top:40rpx;position:absolute;margin-left:-10rpx;'></view>
						<view style='float:left;width:102rpx;height:100rpx;border-right:1px dashed #fdba60;line-height:100rpx;font-size:40rpx;color:#fdba60;'>
							<view style='float:left;margin-left:20rpx;font-size:20rpx;margin-top:10rpx;'>￥</view>{{item.money}}
						</view>
						<view style='float:left;margin-left:20rpx;'>
							<view style='font-size:30rpx;margin-top:10rpx;'>满{{item.condition}}元可用</view>
							<view style='color:#999;font-size:16rpx;margin-top:3rpx;'>{{item.name}}</view>
							<view style='color:#999;font-size:16rpx;'>{{item.useEndTime}}到期</view>
						</view>
						<view style='background:#2b5cff;widthL20rpx;height:20rpx;border-radius:50%;margin-top:40rpx;position:absolute;right:-10rpx;'></view>
					</view>
					<view style='width:200rpx;height:50rpx;border-radius:50rpx;color:#fff;background:linear-gradient(#ffad00,#ff6300);text-align:center;line-height:50rpx;margin:20rpx auto;'
					 @tap='lingqu'>立即领取</view>
				</view>
				<view style='width:50rpx;height:50rpx;border:1px solid #fff;border-radius:50%;text-align:center;line-height:50rpx;margin:0 auto;color:#fff;margin-top:30rpx;'
				 @tap='guan'>X</view>
			</view>
		</view>
		<view class='zhezhao' v-if='shangpinxiangqing'>
			<view style='width:471rpx;margin:auto;height:200rpx;position:absolute;left:0;bottom:0;right:0;top:0;background:#fff;'>
				<view style='font-size:22rpx;text-align:center;margin-top:20rpx;'>您的好友给您分享了一个商品，是否查看?</view>
				<view style='text-align:center;margin-top:50rpx;'>
					<view style='display:inline-block;width:100rpx;height:60rpx;line-height:60rpx;background:#fefefe;border:1px solid #eee;border-radius:10rpx;'
					 @tap='quxiao'>取消</view>
					<view style='display:inline-block;width:100rpx;height:60rpx;line-height:60rpx;background:#2b5cff;border-radius:10rpx;color:#fff;margin-left:20rpx;'
					 @tap='tiaozhuan'>确定</view>
				</view>
			</view>
		</view>
		<view class="line" style="height: 140rpx;">

		</view>
		<view style='position:fixed;left:0;width:calc(100% - 50rpx);height:100rpx;background:rgba(0,0,0,0.6);bottom:100rpx;line-height:100rpx;color:#fff;padding-left:50rpx;font-size:24rpx;'
		 v-if='xianshidenglu' @tap='denglu'>
			登录查看更多
			<view style='float:right;padding:0 40rpx;background:#2d5eff;border-radius:50rpx;line-height:60rpx;margin-top:20rpx;margin-right:20rpx;font-size:24rpx;'>一键登录</view>
		</view>
		<tabBar :currentPage="currentPage"></tabBar>
		<view class='main'>
			<code-elf-guide></code-elf-guide>
		</view>
		<swiper style='position:fixed;top:0;left:0;height:100%;width:100%;z-index:999999999;' v-if='xianshi'>
			<swiper-item v-for='item in l' style='width:100%;height:100%;position:absolute;z-index:9999999999;'>
				<image :src='item.img' style='width:100%;height:100%;'></image>
			</swiper-item>
		</swiper>
		<view style='width:100%;height:100%;position:fixed;left:0;top:0;z-index:99999;background:#fff;' v-if='xianshi'></view>
		<view style='position:fixed;top:200rpx;right:20rpx;z-index:9999999999999;width:130rpx;height:50rpx;text-align:center;color:#fff;font-size:20rpx;line-height:50rpx;border:1px solid #fff;border-radius:50rpx;'
		 v-if='xianshi' @tap='tiaoguo'>{{a}}s跳过广告</view>
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
				list: [],
				youhuiquan: [],
				youhuiquanle: false,
				id: '',
				index: '',
				phone: '',
				int: 0,
				shangpinxiangqing: false,
				xinxi: '',
				xianshidenglu: false,
				y: true,
				l: [],
				xianshi: true,
				a: 5,
				g: []
			}
		},
		components: {
			tabBar,
		},
		onShow() {
			if (uni.getStorageSync('Authorization')) {
				this.xianshidenglu = false
			} else {
				this.xianshidenglu = true
			}
			var _this = this
			this.list = []
			this.$https({
				url: '/api/oauth/shop/mall-index',
				data: {
					mobileCode: ''
				},
				dengl: true,
				// dengl: false,
				success: function(res) {
					_this.cateList = res.data.data.cateList
					_this.hotList = res.data.data.recommedGoods
					// _this.id=res.data.data.cateList
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
				},
			})
			this.$https({
				url: '/api/oauth/get-index-banner-list',
				data: {},
				method: 'post',
				dengl: true,
				success: res => {
					this.banList = res.data.data
				}
			})
			//获取优惠券
			this.$https({
				url: '/api/oauth/shop/coupon-couple-List',
				data: {},
				dengl: true,
				success: function(res) {
					_this.youhuiquan = res.data.data
				}
			})
			// this.$https({
			// 	url:'/api/user/my-index',
			// 	data:{},
			// 	dengl:false,
			// 	success:function(res){
			// 		console.log(res)
			// 		_this.phone=res.data.data.phone
			// 	}
			// })
			if (uni.getStorageSync('y')) {
				this.youhuiquanle = false
			} else {
				this.youhuiquanle = true
			}
			// this.$https({
			// 	url: '/api/user/my-info',
			// 	data: {},
			// 	success: function(resa) {
			// 		//获取粘贴板内容
			uni.getClipboardData({
				success: function(res) {
					// 				if (resa.data.data.payPoints != res.data.split('分享给你')[1].split(',')[0]) {
					if (res.data.indexOf('我在毅木重卡发现一个好东西，分享给你') >= 0) {
						uni.setClipboardData({
							data: '',
							success: function() {

							}
						})
						_this.shangpinxiangqing = true
						_this.xinxi = res.data
					}
					// 				}
				}
			})
			// 	}
			// })
			//广告
			if (!uni.getStorageSync('g')) {
				this.$https({
					url: '/api/oauth/get-start-advertise',
					data: {},
					method: 'post',
					dengl: true,
					success: res => {
						this.l = res.data.data
						uni.setStorageSync('g', 1)
						setInterval(r => {
							if (this.a == 0) {
								this.xianshi = false
							}
							this.a--
						}, 1000)
					}
				})
			}
			if (uni.getStorageSync('g')) {
				this.xianshi = false
			}
			//公告
			this.$https({
				url: '/api/oauth/get-system-notice',
				data: {},
				method: 'post',
				dengl: true,
				success: res => {
					this.g = res.data.data
				}
			})
		},
		methods: {
			detail(id) {
				uni.navigateTo({
					url: 'productDetails?id=' + id+'&tiaozhuan=1'
				})
				this.$https({
					url: '/api/shop/goods-brows-history-add',
					data: {
						goodsId: id
					},
					method: 'POST',
					success(res) {}
				})
			},
			more() {
				uni.navigateTo({
					url: '../classify/fenlOne'
				})
			},
			guan: function() {
				this.youhuiquanle = false
				uni.setStorageSync('y', '123')
			},
			fenLei: function(id, index) {
				// this.id=id
				// this.index=index
				// console.log(this.list[id][index].id)
				var id = this.list[id][index].id
				uni.navigateTo({
					url: '../classify/classify?id=' + id
				})
			},
			lingqu: function() {
				var _this = this
				var a = []
				this.youhuiquan.map(function(n) {
					a.push(n.id)
				})
				var _this = this
				//判断是否是新人
				this.$https({
					url: '/api/shop/coupon-couple',
					data: {},
					success: function(res) {
						if (res.data.dara) {
							this.$https({
								url: '/api/shop/coupon-couple-add',
								data: {
									ids: a
								},
								method: 'post',
								success: function(res) {
									uni.showToast({
										title: res.data.message
									})
									_this.youhuiquanle = false
								}
							})
						} else {
							uni.showToast({
								title: '您不是新人，无法领取优惠券',
								icon: 'none'
							})
							uni.setStorageSync('y', '123')
						}
					},
				})
			},
			search: function() {
				uni.navigateTo({
					url: '../search/search'
				})
			},
			qiehuan: function(e) {
				this.int = e.detail.current
			},
			quxiao: function() {
				this.shangpinxiangqing = false
			},
			tiaozhuan: function() {
				uni.navigateTo({
					url: 'productDetails?id=' + this.xinxi.split(',')[1] + '&str=' + this.xinxi.split(',')[0].split('分享给你')[1]
				})
				this.shangpinxiangqing = false
			},
			tiaoz: function() {
				uni.navigateTo({
					url: '../user/sale/sale'
				})
			},
			denglu: function() {
				uni.navigateTo({
					url: '../enter/enter'
				})
			},
			q: function() {
				this.y = !this.y
			},
			dianpu: function(id) {
				uni.navigateTo({
					url: '../shop/shop?id=' + id
				})
			},
			tiaoguo: function() {
				this.xianshi = false
			},
			t: function(i) {
				uni.navigateTo({
					url: '../news/news_details/news_details?i=' + JSON.stringify(i)
				})
			},
			b: function(id, type) {
				if (type == 1) {
					uni.navigateTo({
						url: 'productDetails?id=' + id
					})
				} else if (type == 2) {
					uni.navigateTo({
						url: '../shop/shop?id=' + id
					})
				}
			}

		}
	}
</script>

<style lang="scss" scoped>
	@import '../../style/gg.css';

	.clearCss {
		padding: 0 28rpx;
		.content-item {
			padding: 20rpx 10rpx;
		}
	}
	.activeCss{
		padding: 0 28rpx;
		padding-bottom: 10rpx;
	}

	.loading-text {
		display: block;

		text-align: center;
	}

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
				height: 7upx;
				float: left;
				padding-left: 50upx;
			}
		}

		.right {
			float: right;
			margin-right: 20upx;
			margin-top: 10rpx;

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
		box-shadow: 0 0 5px 3px #ccc;
		border-radius: 20upx;
		margin-bottom: 20rpx;
		overflow: hidden;
		margin-top: 10rpx;

		image {
			width: 100%;
			height: 360upx;
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
			text-align: right;
			margin: 0 28rpx;
		}

		>view:nth-child(2n) {
			// clear: left
		}

		.title text {
			float: left;
			font-size: 36upx;
			color: #333;
			font-weight: bold;
		}

		.title text:nth-child(3) {
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
				position: relative;

				.imgBox {
					image {
						width: 200rpx;
						height: 200rpx !important;
						float: left;
					}
				}

				.txt_a {
					padding-top: 10upx;
					width: 67%;
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
							margin-right: 20upx;
							font-size: 20upx;
						}
					}

					.txt_aas {
						padding-top: 10upx;
						margin-top: 20rpx;

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
							line-height: 50upx;
						}
					}

				}
			}

		}
	}

	.zhezhao {
		width: 100%;
		background: rgba(0, 0, 0, 0.6);
		top: 0;
		left: 0;
		height: 100%;
		z-index: 99999;
		position: fixed;
	}
</style>
