<template>
	<view>
		<!-- <view class="line" style="height: 50rpx;background-color: #006ee3;"></view> -->
		<!-- 背景图 -->
		<view class="bg_img">
			<image src="../../static/icon_21.png" mode=""></image>
		</view>
		<tabBar :currentPage='currentPage'></tabBar>

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
		<view class="userBox">
			<view class="img_a" @tap='xiugaigerenxinxi'>
				<image :src="headimg?headimg:'../../static/img_06.jpg'" mode=""></image>
			</view>
			<view class="text_a">
				<view class="yonghum" @tap='xiugaigerenxinxi'>
					<text>{{userName?userName:'暂无用户名'}}</text>
				</view>
				<view class="phone" @tap='fuzhi' style='font-size:24rpx;'>
					<text>{{myCode}}    <text style='background:#5cb1f3;color:#fff;margin-left:10rpx;width:130rpx;display:inline-block;text-align:center;border-radius:10rpx;'>复制邀请码</text></text>
				</view>
			</view>
			<view class="imgRight" @tap='xiugaigerenxinxi'>
				<!-- <image src="../../static/icon_23.png" mode=""></image> -->
			</view>
			<view style='float:left;color:#fff;margin-top:66rpx;margin-left:20rpx;' @tap='tiaozhuan'>
				<view>任务中心</view>
			</view>
		</view>

		<!-- 数值栏 -->
		<view class="bgWhite">
			<view class="yong">
				<text>¥{{userMoney}}</text>
				<view class="jin">
					<text>佣金</text>
				</view>
			</view>

			<view class="ji" @tap="jifen">
				<text>{{payPoints}}</text>
				<view class="fen">
					<text>积分</text>
				</view>
			</view>

			<view class="youhui" @tap='youhuiquan'>
				<text>{{couponCount}}</text>
				<view class="quan">
					<text>优惠券</text>
				</view>
			</view>

			<view class="shou">
				<text @tap='shoucang'>{{collectCount}}</text>
				<view class="cang">
					<text @tap='shoucang'>收藏</text>
				</view>
			</view>
		</view>

		<!-- 订单状态栏 -->
		<view class="state">
			<view class="fu" @tap="daiFu(1)">
				<view class="imgBox_a">
					<image src="../../static/fk.png" mode=""></image>
				</view>
				<view class="kuan">
					<text>待付款</text>
				</view>
			</view>

			<view class="dai" @tap="daiFu(2)">
				<view class="imgBox_a">
					<image src="../../static/fh.png" mode=""></image>
				</view>

				<view class="fahuo">
					<text>待发货</text>
				</view>
			</view>

			<view class="ping" @tap="daiFu(4)">
				<view class="imgBox_a">
					<image src="../../static/pj.png" mode=""></image>
				</view>

				<view class="jia">
					<text>待评价</text>
				</view>
			</view>

			<view class="tui" @tap="tuiKuan">
				<view class="imgBox_a">
					<image src="../../static/tk.png" mode=""></image>
				</view>

				<view class="kuan">
					<text>退款/售后</text>
				</view>
			</view>

			<view class="ding" @tap="daiFu(0)">
				<view class="imgBox_a">
					<image src="../../static/qb.png" mode=""></image>
				</view>

				<view class="dan">
					<text>全部订单</text>
				</view>
			</view>
		</view>

		<!-- 这是个轮播图 -->
		<view class="lunb">
			<image @tap="pers" src="../../static/icon_24.png" mode=""></image>
		</view>

		<!-- 常用工具 -->
		<view class="tool">
			<view class="tit_a">
				<text>常用工具</text>
			</view>
			<view class="icons">
				<view @tap="ques">
					<view class="imgBox">
						<image src="../../static/wt.png" mode=""></image>
					</view>
					<view class="textBox">
						<text>推荐好友</text>
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

				<view @tap="about">
					<view class="imgBox">
						<image src="../../static/kf.png" mode=""></image>
					</view>
					<view class="textBox">
						<text>关于我们</text>
					</view>
				</view>

				<view @tap="fenX">
					<view class="imgBox">
						<image src="../../static/hb.png" mode=""></image>
					</view>
					<view class="textBox">
						<text>我的收益  <!-- #ifdef APP-PLUS -->
						
						<!-- #endif --></text>
					</view>
				</view>

				<view @tap="ruzhu">
					<view class="imgBox">
						<image src="../../static/sm.png" mode=""></image>
					</view>
					<view class="textBox">
						<text>商家入驻</text>
					</view>
				</view>

				<view  @tap="liulan">
					<view class="imgBox">
						<image src="../../static/zj.png" mode=""></image>
					</view>
					<view class="textBox">
						<text>浏览记录</text>
					</view>
				</view>

				<view @tap="aiChe(1)">
					<view class="imgBox">
						<image src="../../static/sc.png" mode=""></image>
					</view>
					<view class="textBox">
						<text>我的爱车</text>
					</view>
				</view>

				<view @tap='shezhi'>
					<view class="imgBox">
						<image src="../../static/sz.png" mode=""></image>
					</view>
					<view class="textBox">
						<text>账号设置</text>
					</view>
				</view>
			</view>
		</view>
		<view style='margin-top:900rpx;margin-left:20rpx;font-size:30rpx;text-align:center;'>
			<view style='display:inline-block;'>招商电话</view>
			<view style='margin-left:20rpx;display:inline-block;'>
				<view v-for='item in pingtaidianhua' @tap='bodadianhua(item.phone)'>{{item.phone}}</view>
			</view>
		</view>
		<view style='position:fixed;bottom:81rpx;left:0;width:100%;background:#a5cbf6;margin:20rpx;height:50rpx;line-height:50rpx;color:#fff;' v-if='t'>
			<image src='../../static/close_901px_1199932_easyicon1.png' style='width:50rpx;height:50rpx;right:50rpx;position:absolute;top:0;z-index:9;' @tap='guanbi'></image>
			<swiper :circular='true' :interval='3000' :duration='6000' :autoplay='true' :indicator-dots='false'>
				<swiper-item></swiper-item>
				<swiper-item>滑动文字滑动文字滑动文字滑动文字滑动文字</swiper-item>
				<swiper-item>滑动滑动滑动滑动滑动滑动滑动滑动滑动滑动</swiper-item>
				<swiper-item></swiper-item>
			</swiper>
		</view>
		<view style='width:20rpx;position:fixed;bottom:81rpx;right:0;background:#fff;height:50rpx;margin-bottom:20rpx;'></view>
		<view style='height:300rpx;'></view>
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
				headimg:'../../static/img_06.jpg',
				myCode:'',
				pingtaidianhua:'',
				t:true
			}
		},
		components: {
			tabBar,
		},
		onShow: function() {
			var _this = this
			this.$https({
				url: '/api/user/my-info',
				data: {},
				denglu: false,
				success: function(res) {
					_this.userName = res.data.data.userName
					_this.headimg=res.data.data.headimg
					// console.log(res.data.data)
					_this.phone = res.data.data.phone
					// console.log(res.data.data)
					_this.myCode=res.data.data.myCode
				}
			})
			//
			this.$https({
				url: '/api/user/my-index',
				data: {},
				dengl: false,
				success: function(res) {
					_this.userMoney = res.data.data.userMoney
					_this.payPoints = res.data.data.payPoints
					_this.couponCount = res.data.data.couponCount
					_this.collectCount = res.data.data.collectCount
					// console.log(res.data.data)
				}
			})
			this.$https({url:'/api/user/my-platform-phone-list',success:function(res){
				_this.pingtaidianhua=res.data.data
			}})
		},
		methods: {
			xiugaigerenxinxi: function() {
				uni.navigateTo({
					url: 'alter'
				})
			},
			//
			dizhiguanli: function() {
				uni.navigateTo({
					url: 'leagu/siteList/siteList'
				})
			},
			//收藏
			shoucang: function() {
				uni.navigateTo({
					url: '../search/store'
				})
			},
			//优惠券
			youhuiquan: function() {
				uni.navigateTo({
					url: 'sale/sale'
				})
			},
			pers: function() {
				uni.navigateTo({
					url: 'task/task'
				})
			},
			fenX: function() {
				uni.navigateTo({
					url: 'distr/distr'
				})
			},
			tuiJi: function() {
				uni.navigateTo({
					// url:'distr/distrDetail'
				})
			},
			ques: function() {
				uni.navigateTo({
					url: './task/invite/invite'
				})
			},
			jifen: function() {
				uni.navigateTo({
					url: './jifenStore/jifenStore'
				})
			},
			about: function() {
				uni.navigateTo({
					url: 'AboutUs/AboutUs'
				})
			},
			ruzhu: function() {
				uni.navigateTo({
					url: './leagu/league'
				})
			},
			daiFu:function(index){
				uni.navigateTo({
					url: 'allState/allState?id='+index
				})
			},
			liulan:function(){
				uni.navigateTo({
					url:'task/liulan'
				})
			},
			shezhi:function(){
				uni.navigateTo({
					url:"./alter/alter"
				})
			},
			tuiKuan:function(){
				uni.navigateTo({
					url:'./allState/salelist'
				})
			},
			aiChe:function(){
				uni.navigateTo({
					url:'task/aiChe'
				})
			},
			//复制邀请码
			fuzhi:function(){
				uni.setClipboardData({
					data:this.myCode,
					success:function(){
						uni.showToast({
							title:'复制成功,快去邀请好友吧',
							icon:'none'
						})
					}
				})
			},
			tiaozhuan:function(){
				uni.navigateTo({
					url:'task/task'
				})
			},
			bodadianhua:function(ph){
				uni.makePhoneCall({
					phoneNumber:ph
				})
			},
			guanbi:function(){
				this.t=false
			}
		}
	}
</script>

<style lang="scss">
	.bg_img {
		image {
			width: 750upx;
			height: 286upx;
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
		position: absolute;
		top: 30upx;
		left: 25upx;
		overflow: hidden;
		width:700rpx;
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
		width: 660upx;
		height: 120upx;
		box-shadow: 0 0 5px #ccc;
		position: absolute;
		top: 200upx;
		left: 25upx;
		background-color: #fff;
		border-radius: 20upx;
		padding: 50upx 20upx 20upx 20upx;

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
		width: 660upx;
		height: 100upx;
		box-shadow: 0 0 5px #ccc;
		position: absolute;
		top: 420upx;
		left: 25upx;
		background-color: #fff;
		border-radius: 20upx;
		padding: 30upx 20upx 20upx 20upx;

		view {
			float: left;
			text-align: center;
			width: 130upx;

			text {
				font-size: 22upx;
			}

			image {
				width: 45upx;
				height: 45upx;
				display: block;
				position: relative;
				margin: 0 auto;
			}
		}
	}

	.lunb {
		position: absolute;
		top: 576upx;
		left: 25upx;

		image {
			width: 700upx;
			height: 230upx;
		}

	}

	.tool {
		width: 660upx;
		height: 420upx;
		box-shadow: 0 0 5px #ccc;
		position: absolute;
		top: 790upx;
		left: 25upx;
		background-color: #fff;
		border-radius: 20upx;
		padding: 30upx 20upx 20upx 20upx;
		margin-bottom: 120upx;

		.tit_a {
			text {
				font-size: 34upx;
				color: #333;
			}
		}

		.icons {
			view {
				float: left;
				text-align: center;
				width: 165upx;
				margin-top: 20upx;

				text {
					font-size: 26upx;
				}

				image {
					width: 60upx;
					height: 60upx;
				}
			}

			.textBox {
				margin-top: 0upx;
			}
		}
	}
</style>
