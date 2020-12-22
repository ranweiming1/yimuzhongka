<template>
	<view>
		<!-- <view class="line" style="height: 50rpx;background-color: #006ee3;"></view> -->
		<!-- 背景图 -->
		<view class="bg_img">
			<image src="../../static/icon_21.png" mode=""></image>
		</view>
		<tabBar :currentPage='currentPage'></tabBar>
		<view class='top' style='position:relative;width:100%;z-index:99;height:100rpx;z-index:99999;margin-top:-505rpx;'>
			<view style='height:100rpx;position:absolute;width:100%;'>
				<text style='position:absolute;width:100%;top:0;left:0;height:40rpx;text-align:center;color:#fff;font-size:32rpx;'>个人中心</text>
			</view>
			<view style='position:absolute;right:20rpx;top:0;z-index:99999;'>
				<image src='../../static/icon_22.png' style='width:38rpx;height:42rpx;' @tap='k'></image>
				<image src='../../static/shezhi.png' style='width:41rpx;height:39rpx;margin-left:20rpx;' @tap='shezhi'></image>
			</view>
		</view>
		<!-- 头部 -->
		<!-- <view class="top">
			<view class="textBox">
				<text>个人中心</text>
			</view>
			<view class="imgBox">
				<image src="../../static/icon_22.png" mode=""></image>
			</view>
		</view>
 -->
		<!-- 用户名 -->
		<view class="userBox" style='position:relative;margin:0 auto;z-index:99999;'>
			<view class="img_a" @tap='xiugaigerenxinxi'>
				<image :src="headimg?headimg:'../../static/img_06.jpg'" mode=""></image>
			</view>
			<view class="text_a">
				<view class="yonghum" @tap='xiugaigerenxinxi'>
					<text>{{userName?userName:'暂无用户名'}}</text>
				</view>
				<view class="phone" style='font-size:24rpx;'>
					<text>{{phone}}</text>
				</view>
			</view>
			<view class="imgRight" @tap='xiugaigerenxinxi'>
				<!-- <image src="../../static/icon_23.png" mode=""></image> -->
			</view>
			<view style='float:right;color:#fff;margin-top:66rpx;margin-right:45rpx;width:116rpx;height:51rpx;line-height:51rpx;text-align:center;color:#fff;font-size:24rpx;background:linear-gradient(#ff9a3b,#fb751e);border-radius:50rpx;'
			 @tap='tiaozhuan'>
				<view>签到</view>
			</view>
		</view>

		<!-- 数值栏 -->
		<view class="bgWhite">
			<view class="yong" @tap='jifen'>
				<text>{{payPoints}}</text>
				<view class="jin">
					<text>我的积分</text>
				</view>
			</view>

			<view class="ji" @tap='shoucang'>
				<text @tap='shoucang'>{{(collectCount-1)>0?collectCount-1:0}}</text>
				<view class="fen" @tap='shoucang'>
					<text>我的收藏</text>
				</view>
			</view>

			<view class="youhui" @tap='youhuiquan'>
				<text>{{couponCount}}</text>
				<view class="quan">
					<text>红包卡券</text>
				</view>
			</view>

			<view class="shou" @tap='fenX'>
				<text>{{userMoney}}</text>
				<view class="cang">
					<text>我的佣金</text>
				</view>
			</view>
		</view>
		<view style='position:relative;z-index:99;background:#fff;width:100%;border-radius:20rpx;'>
			<image src='../../static/jifen.png' style='width:335rpx;height:140rpx;margin-left:30rpx;margin-top:40rpx;' @tap='jifen'></image>
			<image src='../../static/fenxiangxianjin.png' style='width:335rpx;height:140rpx;margin-left:30rpx;margin-top:40rpx;'
			 @tap='ques'></image>
		</view>
		<view style='width:670rpx;margin:0 auto;margin-top:50rpx;overflow:hidden;position:relative;'>
			<view style='font-size:34rpx;color:#000;float:left;'>我的订单</view>
			<view style='font-size:26rpx;color:#666;float:right;' @tap='daiFu(0)'>查看全部</view>
		</view>
		<!-- 订单状态栏 -->
		<view class="state">
			<view class="fu" @tap="daiFu(1)">
				<view class="imgBox_a">
					<view v-if="fukuan!=0">{{fukuan}}</view>
					<image src="../../static/fk.png" mode=""></image>
				</view>
				<view class="kuan">
					<text>待付款</text>
				</view>
			</view>

			<view class="dai" @tap="daiFu(2)">
				<view class="imgBox_a">
					<view  v-if="fahuo!=0">{{fahuo}}</view>
					<image src="../../static/fh.png" mode=""></image>
				</view>

				<view class="fahuo">
					<text>待发货</text>
				</view>
			</view>

			<view class="ping" @tap="daiFu(3)">
				<view class="imgBox_a">
					<view  v-if="shouhuo!=0">{{shouhuo}}</view>
					<image src="../../static/sh.png" mode=""></image>
				</view>

				<view class="jia">
					<text>待收货</text>
				</view>
			</view>

			<view class="tui" @tap="daiFu(4)">
				<view class="imgBox_a">
					<view  v-if="pingjia!=0">{{pingjia}}</view>
					<image src="../../static/pj.png" mode=""></image>
				</view>

				<view class="kuan">
					<text>待评价</text>
				</view>
			</view>

			<view class="ding" @tap="tuiKuan">
				<view class="imgBox_a">
					<view v-if="tuikuan!=0">{{tuikuan}}</view>
					<image src="../../static/qb.png" mode=""></image>
				</view>

				<view class="dan">
					<text>退款/售后</text>
				</view>
			</view>
		</view>


		<!-- 常用工具 -->
		<view class="tool">
			<view class="tit_a">
				<text>常用工具</text>
			</view>
			<swiper style='height:400rpx;background:#f4f7f9;margin-top:20rpx;' @change='gaibian' :current='n'>
				<swiper-item>
					<view class="icons">
						<view @tap="about">
							<view class="imgBox">
								<image src="../../static/wt.png" mode=""></image>
							</view>
							<view class="textBox">
								<text>关于我们</text>
							</view>
						</view>

						<view @tap='dizhiguanli'>
							<view class="imgBox">
								<image src="../../static/wz.png" mode=""></image>
							</view>
							<view class="textBox">
								<text>地址管理</text>
							</view>
						</view>

						<view @tap="aiChe">
							<view class="imgBox">
								<image src="../../static/kf.png" mode=""></image>
							</view>
							<view class="textBox">
								<text>我的爱车</text>
							</view>
						</view>

						<view @tap="liulan">
							<view class="imgBox">
								<image src="../../static/hb.png" mode=""></image>
							</view>
							<view class="textBox">
								<text>浏览记录
									<!-- #ifdef APP-PLUS -->

									<!-- #endif --></text>
							</view>
						</view>

						<view @tap="ques">
							<view class="imgBox">
								<image src="../../static/sm.png" mode=""></image>
							</view>
							<view class="textBox">
								<text>推荐好友</text>
							</view>
						</view>

						<view @tap='problem'>
							<view class="imgBox">
								<image src="../../static/zj.png" mode=""></image>
							</view>
							<view class="textBox">
								<text>常见问题</text>
							</view>
						</view>

						<view @tap='k'>
							<view class="imgBox">
								<image src="../../static/sc.png" mode=""></image>
							</view>
							<view class="textBox">
								<text>官方客服</text>
							</view>
						</view>

						<view @tap='shezhi'>
							<view class="imgBox">
								<image src="../../static/sz.png" mode=""></image>
							</view>
							<view class="textBox">
								<text>我的设置</text>
							</view>
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class='icons'>
						<view @tap='ruzhu'>
							<view class='imgBox'>
								<image src='../../static/shangjia.png'></image>
							</view>
							<view class='textBox'>
								<text>商家入驻</text>
							</view>
						</view>
						<view @tap='fenX'>
							<view class='imgBox'>
								<image src='../../static/shouyi.png'></image>
							</view>
							<view class='textBox'>
								<text>我的收益</text>
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
			<view style='width:80rpx;height:8rpx;background:#dedede;borderradius:10rpx;margin:0 auto;margin-top:-30rpx;'>
				<view :style='n==0?"width:60rpx;height:8rpx;background:#ffae0c;border-radius:0 10rpx 10rpx 0;":"width:60rpx;height:8rpx;background:#ffae0c;border-radius:0 10rpx 10rpx 0;margin-left:20rpx;"'></view>
			</view>
		</view>
		<swiper style='wdith:100%;height:179rpx;margin-top:60rpx;' @tap='jifen'>
			<swiper-item>
				<image src='../../static/guangga.png' style='width:750rpx;height:179rpx;'></image>
			</swiper-item>
		</swiper>
		<view style='text-align:center;overflow: hidden;'>
			<view style='width:6rpx;height:20rpx;background:#ccc;transform:rotateZ(30deg);border-radius:10rpx;float:left;margin-top:15rpx;margin-left:273rpx;'></view>
			<view style='width:6rpx;height:30rpx;background:#ccc;transform:rotateZ(30deg);border-radius:10rpx;margin-left:6rpx;float:left;margin-top:10rpx;'></view>
			<view style='float:left;margin-left:20rpx;'>推荐产品</view>
			<view style='width:6rpx;height:30rpx;background:#ccc;transform:rotateZ(30deg);border-radius:10rpx;margin-left:20rpx;float:left;margin-top:10rpx;'></view>
			<view style='width:6rpx;height:20rpx;background:#ccc;transform:rotateZ(30deg);border-radius:10rpx;margin-left:6rpx;float:left;margin-top:15rpx;'></view>
			<image src='../../static/n8.png' style='float:right;width:30rpx;height:30rpx;padding: 0 28rpx; padding-top: 10rpx;'
			 @tap='q'></image>
		</view>
		<view class="activeCss">
			<view v-for='(item,index) in list' class="content-item" @tap='tz(item.goodsId)' v-if='xianshi'>
				<view class="imgBox">
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
		<view class="clearCss">


			<view v-for='(item,index) in list' class="content-item" @tap='tz(item.goodsId)' v-if='!xianshi'>
				<view class="imgBox">
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
						<view class="coupon-item">
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

		<!-- <view style='margin-top:900rpx;margin-left:20rpx;font-size:30rpx;text-align:center;'>
			<view style='display:inline-block;'>招商电话</view>
			<view style='margin-left:20rpx;display:inline-block;'>
				<view v-for='item in pingtaidianhua' @tap='bodadianhua(item.phone)'>{{item.phone}}</view>
			</view>
		</view> -->
		<!-- <view style='position:fixed;bottom:81rpx;left:0;width:100%;background:#a5cbf6;margin:20rpx;height:50rpx;line-height:50rpx;color:#fff;' v-if='t'>
			<image src='../../static/close_901px_1199932_easyicon1.png' style='width:50rpx;height:50rpx;right:50rpx;position:absolute;top:0;z-index:9;' @tap='guanbi'></image>
			<swiper :circular='true' :interval='3000' :duration='6000' :autoplay='true' :indicator-dots='false'>
				<swiper-item></swiper-item>
				<swiper-item>滑动文字滑动文字滑动文字滑动文字滑动文字</swiper-item>
				<swiper-item>滑动滑动滑动滑动滑动滑动滑动滑动滑动滑动</swiper-item>
				<swiper-item></swiper-item>
			</swiper>
		</view> -->
		<view style='width:20rpx;position:fixed;bottom:81rpx;right:0;background:#fff;height:50rpx;margin-bottom:20rpx;'></view>
		<view style='height:300rpx;'></view>
		<!-- <view style='position:fixed;top:0;left:0;width:100%;height:100%;' v-if='xianshidenglu' @tap='dengluweizhi'></view> -->
		<view style='position:fixed;left:0;width:calc(100% - 50rpx);bottom:100rpx;height:100rpx;background:rgba(0,0,0,0.6);line-height:100rpx;color:#fff;padding-left:50rpx;font-size:24rpx;'
		 v-if='xianshidenglu'>
		 <image src='../../static/6ef74f70be674fdc834aa269ed7f8078.png' style='width:20rpx;height:20rpx;margin-right:20rpx;' @tap='g'></image>
			登录查看更多
			<view style='float:right;padding:0 40rpx;background:#2d5eff;border-radius:50rpx;line-height:60rpx;margin-top:20rpx;margin-right:20rpx;font-size:24rpx;' @tap='deng'>立即登录/注册</view>
		</view>
	</view>
</template>

<script>
	import tabBar from '@/components/tabBar/tabBar.vue';
	export default {
		data() {
			return {
				currentPage: 'user',
				userName: '',
				phone: '',
				//佣金
				userMoney: 0,
				//积分
				payPoints: 0,
				//优惠券
				couponCount: 0,
				//收藏
				collectCount: 0,
				headimg: '../../static/img_06.jpg',
				myCode: '',
				pingtaidianhua: '',
				t: true,
				xianshidenglu: false,
				list: [],
				n: 0,
				xianshi: true,
				id: '',
				fukuan: 0,
				fahuo: 0,
				shouhuo: 0,
				pingjia: 0,
				tuikuan: 0
			}
		},
		components: {
			tabBar,
		},
		onShow: function() {
			var _this = this
			if (!uni.getStorageSync('Authorization')) {
				this.xianshidenglu = true
			}else{
				this.xianshidenglu=false
			}
			//判断是否登录
			if (uni.getStorageSync('Authorization')) {
				this.$https({
					url: '/api/user/my-info',
					data: {},
					denglu: false,
					success: function(res) {
						_this.userName = res.data.data.nickname
						_this.headimg = res.data.data.headimg
						// console.log(res.data.data)
						_this.phone = res.data.data.phone
						// console.log(res.data.data)
						_this.myCode = res.data.data.myCode
						_this.id = res.data.data.id
					}
				})
				//
				this.$https({
					url: '/api/user/my-index',
					data: {},
					dengl: false,
					success: function(res) {
						console.log(res.data.data)
						_this.userMoney = res.data.data.userMoney
						_this.payPoints = res.data.data.payPoints
						_this.couponCount = res.data.data.couponCount
						_this.collectCount = res.data.data.collectCount
						_this.fukuan = res.data.data.countInfo.unpayCount
						_this.fahuo = res.data.data.countInfo.undeliverCount
						_this.shouhuo = res.data.data.countInfo.deliveringCount
						_this.pingjia = res.data.data.countInfo.unevalCount
						_this.tuikuan = res.data.data.countInfo.returnCount
						// console.log(res.data.data)
					}
				})
			}
			this.$https({
				url: '/api/oauth/user/my-platform-phone-list',
				dengl:true,
				success: function(res) {
					_this.pingtaidianhua = res.data.data
				}
			})
			this.$https({
				url: '/api/oauth/shop/mall-index',
				data: {
					mobileCode: ''
				},
				dengl: true,
				success: res => {
					this.list = res.data.data.recommedGoods
				}
			})
		},
		methods: {
			xiugaigerenxinxi: function() {
				if (this.denglufangfatiaozhuan()) {
					uni.navigateTo({
						url: 'alter'
					})
				}
			},
			//
			dizhiguanli: function() {
				if (this.denglufangfatiaozhuan()) {
					uni.navigateTo({
						url: 'leagu/siteList/siteList'
					})
				}
			},
			//收藏
			shoucang: function() {
				if (this.denglufangfatiaozhuan()) {
					uni.navigateTo({
						url: '../search/store'
					})
				}
			},
			problem: function() {
				uni.navigateTo({
					url: './commission/commission'
				})
			},
			//优惠券
			youhuiquan: function() {
				if (this.denglufangfatiaozhuan()) {
					uni.navigateTo({
						url: 'sale/sale'
					})
				}
			},
			pers: function() {
				uni.navigateTo({
					url: 'task/task'
				})
			},
			fenX: function() {
				if (this.denglufangfatiaozhuan()) {
					uni.navigateTo({
						url: 'distr/distr'
					})
				}
			},
			tuiJi: function() {
				uni.navigateTo({
					// url:'distr/distrDetail'
				})
			},
			ques: function() {
				if (this.denglufangfatiaozhuan()) {
					// uni.navigateTo({
					// 	url: './task/invite/invite'
					// })
					this.$https({
						url: '/api/user/my-info',
						data: {},
						success: res => {
							uni.share({
								provider: 'weixin',
								scene: 'WXSceneSession',
								type: 0,
								href: 'https://yimuzk.com:8087?myCode=' + res.data.data.myCode,
								title: '我在毅木重卡发现了一个好东西,分享给你看看',
								summary: '商品描述',
								success: function() {

								}
							})
						}
					})
				}

			},
			jifen: function() {
				if (this.denglufangfatiaozhuan()) {
					uni.navigateTo({
						url: './jifenStore/jifenStore'
					})
				}
			},
			about: function() {
				uni.navigateTo({
					url: 'AboutUs/AboutUs'
				})
			},
			ruzhu: function() {
				if (this.denglufangfatiaozhuan()) {
					uni.navigateTo({
						url: './leagu/league'
					})
				}
			},
			daiFu: function(index) {
				if (this.denglufangfatiaozhuan()) {
					uni.navigateTo({
						url: 'allState/allState?id=' + index
					})
				}
			},
			liulan: function() {
				if (this.denglufangfatiaozhuan()) {
					uni.navigateTo({
						url: 'task/liulan'
					})
				}
			},
			shezhi: function() {
				if (this.denglufangfatiaozhuan()) {
					uni.navigateTo({
						url: "./alter/alter"
					})
				}
			},
			tuiKuan: function() {
				if (this.denglufangfatiaozhuan()) {
					uni.navigateTo({
						url: './allState/salelist'
					})
				}
			},
			aiChe: function() {
				if (this.denglufangfatiaozhuan()) {
					uni.navigateTo({
						url: 'task/aiChe'
					})
				}
			},
			//复制邀请码
			fuzhi: function() {
				uni.setClipboardData({
					data: this.myCode,
					success: function() {
						uni.showToast({
							title: '复制成功,快去邀请好友吧',
							icon: 'none'
						})
					}
				})
			},
			tiaozhuan: function() {
				uni.navigateTo({
					url: 'task/task'
				})
			},
			bodadianhua: function(ph) {
				uni.makePhoneCall({
					phoneNumber: ph
				})
			},
			guanbi: function() {
				this.t = false
			},
			dengluweizhi: function() {},
			deng: function() {
				uni.navigateTo({
					url: '../enter/enter'
				})
			},
			tz: function(id) {
				uni.navigateTo({
					url: '../index/productDetails?id=' + id
				})
				this.$https({
					url: '/api/shop/goods-brows-history-add',
					data: {
						goodsId: id
					},
					methods: 'POST',
					success: res => {

					}
				})
			},
			gaibian: function(e) {
				this.n = e.detail.current
			},
			q: function() {
				this.xianshi = !this.xianshi
			},
			dianpu: function(id) {
				uni.navigateTo({
					url: '../shop/shop?id=' + id
				})
			},
			k: function() {
				if (this.denglufangfatiaozhuan()) {
					uni.navigateTo({
						url: '../index/ke?id=' + this.id
					})
				}
			},
			g:function(){
				this.xianshidenglu=false
			}
		}
	}
</script>

<style lang="scss">
	.activeCss {
		padding: 20rpx 28rpx;
		width: 100%;
		box-sizing: border-box;
	}

	.bg_img {
		image {
			width: 750upx;
			height: 460upx;
		}
	}


	.top {
		position: fixed;
		top: 33upx;
		left: 0upx;
		width: 750upx;
		margin: 0 auto;
		overflow: hidden;

		.textBox {
			padding-left: 40%;

			text {
				font-size: 38upx;
				color: #fff;
				float: left;
				line-height: 90upx;
			}
		}

		.imgBox {
			float: right;

			image {
				width: 38upx;
				height: 42upx;
				padding: 30upx;
			}
		}
	}

	.userBox {
		top: 30upx;
		left: 25upx;
		overflow: hidden;
		width: 700rpx;

		.img_a {
			float: left;

			image {
				width: 120upx;
				height: 120upx;
				border-radius: 120upx;
			}
		}

		.text_a {
			float: left;
			padding-left: 20upx;

			.yonghum {
				font-size: 34upx;
				color: #fff;
				line-height: 70upx;
			}

			.phone {
				font-size: 24upx;
				color: #fff;
			}
		}

		.imgRight {
			float: left;
			padding: 45upx;

			image {
				width: 12upx;
				height: 20upx;
			}
		}
	}

	.bgWhite {
		width: 670upx;
		height: 120upx;
		box-shadow: 0 0 5px #ccc;
		background-color: #fff;
		border-radius: 20rpx 20rpx 0 0;
		position: relative;
		margin: 0 auto;
		margin-top: 46rpx;
		padding-top: 43rpx;
		z-index: 999;

		.yong {
			text-align: center;
			width: 160upx;
			float: left;
			border-right: 1px solid #f0f0f0;

			text {
				font-size: 34upx;
				color: #333;
			}

			.jin text {
				font-size: 24upx;
				color: #999;
			}
		}

		.ji {
			float: left;
			text-align: center;
			width: 165upx;
			border-right: 1px solid #f0f0f0;

			text {
				font-size: 34upx;
				color: #333;
			}

			.fen text {
				font-size: 24upx;
				color: #999;
			}
		}

		.youhui {
			float: left;
			text-align: center;
			width: 165upx;
			border-right: 1px solid #f0f0f0;

			text {
				font-size: 34upx;
				color: #333;
			}

			.quan text {
				font-size: 24upx;
				color: #999;
			}
		}

		.shou {
			float: left;
			text-align: center;
			width: 160upx;

			text {
				font-size: 34upx;
				color: #333;
			}

			.cang text {
				font-size: 24upx;
				color: #999;
			}
		}
	}

	.state {
		width: 670upx;
		height: 161upx;
		background-color: #f4f7f9;
		border-radius: 20upx;
		padding: 30upx 20upx 20upx 20upx;
		margin: 0 auto;
		position: relative;
		z-index: 99;
		margin-top: 30rpx;

		>view {
			float: left;
			text-align: center;
			width: 130upx;

			text {
				font-size: 22upx;
				margin-top: 30rpx;
				display: block;
			}

			image {
				width: 45upx;
				height: 45upx;
				display: block;
				position: relative;
				margin: 0 auto;
				margin-top: 30rpx;
			}
		}
	}

	.lunb {

		image {
			width: 700upx;
			height: 230upx;
		}

	}

	.tool {
		width: 670upx;
		height: 420upx;
		background-color: #fff;
		margin-bottom: 120upx;
		margin: 0 auto;
		margin-top: 45rpx;

		.tit_a {
			text {
				font-size: 34upx;
				color: #333;
			}
		}

		.icons {
			overflow: hidden;
			border-radius: 20rpx;
			padding: 30rpx 20rpx 20rpx 20rpx;
			padding-top: 10rpx;

			>view {
				float: left;
				text-align: center;
				width: 25%;
				margin-top: 40upx;

				text {
					font-size: 26upx;
				}

				image {
					width: 60upx;
					height: 60upx;
				}
			}


			.textBox {
				margin-top: 10upx;
			}
		}
	}

	.imgBox_a {
		position: relative;

		view {
			position: absolute;
			border: 1px solid #fb751e;
			padding: 0 9rpx;
			border-radius: 45rpx;
			min-width: 15rpx;
			color: #fb751e;
			right: 30rpx;
			top: -10rpx;
			font-size: 20rpx;
			background: #fff;
			z-index: 999;
		}
	}
</style>
