<template>
	<view >
		<!-- 背景图 -->
		<view class="bg_img">
			<image src="../../static/icon_21.png" mode=""></image>
		</view>
		<tabBar :currentPage='currentPage'></tabBar>

		<!-- 头部 -->
		<view class="top">
			<view class="textBox">
				<text>个人中心</text>
			</view>
			<view class="imgBox">
				<image src="../../static/icon_22.png" mode=""></image>
			</view>
		</view>

		<!-- 用户名 -->
		<view class="userBox" @tap='xiugaigerenxinxi'>
			<view class="img_a">
				<image src="../../static/img_06.jpg" mode=""></image>
			</view>
			<view class="text_a">
				<view class="yonghum">
					<text>{{nickname?nickname:'暂无用户名'}}</text>
				</view>
				<view class="phone">
					<text>{{phone}}</text>
				</view>
			</view>
			<view class="imgRight">
				<image src="../../static/icon_23.png" mode=""></image>
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
			<view class="fu">
				<view class="imgBox_a">
					<image src="../../static/fk.png" mode=""></image>
				</view>
				<view class="kuan">
					<text>待付款</text>
				</view>
			</view>

			<view class="dai">
				<view class="imgBox_a">
					<image src="../../static/fh.png" mode=""></image>
				</view>

				<view class="fahuo">
					<text>待发货</text>
				</view>
			</view>

			<view class="ping">
				<view class="imgBox_a">
					<image src="../../static/pj.png" mode=""></image>
				</view>

				<view class="jia">
					<text>待评价</text>
				</view>
			</view>

			<view class="tui">
				<view class="imgBox_a">
					<image src="../../static/tk.png" mode=""></image>
				</view>

				<view class="kuan">
					<text>退款/售后</text>
				</view>
			</view>

			<view class="ding">
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
						<text>常见问题</text>
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

				<view  @tap="about">
					<view class="imgBox">
						<image src="../../static/kf.png" mode=""></image>
					</view>
					<view class="textBox">
						<text>关于我们</text>
					</view>
				</view>

				<view @tap="tuiJi">
					<view class="imgBox">
						<image src="../../static/hb.png" mode=""></image>
					</view>
					<view class="textBox">
						<text>推荐好友</text>
					</view>
				</view>

				<view @tap="fenX">
					<view class="imgBox">
						<image src="../../static/sm.png" mode=""></image>
					</view>
					<view class="textBox">
						<text>分销员</text>
					</view>
				</view>

				<view>
					<view class="imgBox">
						<image src="../../static/zj.png" mode=""></image>
					</view>
					<view class="textBox">
						<text>浏览记录</text>
					</view>
				</view>

				<view>
					<view class="imgBox">
						<image src="../../static/sc.png" mode=""></image>
					</view>
					<view class="textBox">
						<text>我的爱车</text>
					</view>
				</view>

				<view>
					<view class="imgBox">
						<image src="../../static/sz.png" mode=""></image>
					</view>
					<view class="textBox">
						<text>设置</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tabBar from '@/components/tabBar/tabBar.vue';
	export default {
		data() {
			return {
				currentPage: 'user',
				nickname: '',
				phone: '',
				//佣金
				userMoney: 0,
				//积分
				payPoints: 0,
				//优惠券
				couponCount: 0,
				//收藏
				collectCount: 0
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
					_this.nickname = res.data.data.nackname
					_this.phone = res.data.data.phone
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
				}
			})
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
					url: 'FAQ/FAQ'
				})
			},
			jifen: function() {
				uni.navigateTo({
					url: './jifenStore/jifenStore'
				})
			},
			about: function() {
				console.log(2222)
				uni.navigateTo({
					url: 'AboutUs/AboutUs'
				})
			}
		}
	}
</script>

<style lang="scss">
	.bg_img {
		image {
			width: 750upx;
			height: 386upx;
		}
	}

	.top {
		position: fixed;
		top: 0upx;
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
		top: 130upx;
		left: 25upx;
		overflow: hidden;

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
		top: 300upx;
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
		top: 520upx;
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
		top: 676upx;
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
		top: 890upx;
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
