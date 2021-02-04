<template>
	<view>
		<!-- <view class="line" style="height: 50rpx;"></view> -->
		<!-- #ifndef H5 -->
		<view class="top">
			<view class='back' @tap='back' style='float:left;'>
				<image v-if='yincang' src='../../static/icon_26-2.png' mode=''></image>
			</view>
			<view class="textBox">
				<text>全部分类</text>
			</view>
			<view class="imgBox" @tap="search">
				<image src="../../static/icon_10.png" mode=""></image>
			</view>
		</view>
		<!-- #endif -->

		<!-- 切换分类 -->
		<view class="Box dne">
			<!-- 一级 -->
			<scroll-view class="left" scroll-y :style="'height:'+height+'rpx'">
				<!-- 选中样式 -->
				<!-- 未选中样式 -->
				<view :class="id=='x'?'on addOn':'none'" @tap="togLi('x',9)">
					<text v-if='id=="x"' class="image"></text>
					<text style="font-size: 30rpx;font-weight: bold;">品牌/车型</text>
				</view>
				<view :class="id==index?'on':'none'" @tap="togLi(index,item.id)" v-for="(item ,index) in AllList" :key=item.id>
					<!-- <image v-if='id==index' src='../../static/icon_29.png'></image> -->
					<text v-if='id==index' class="image"></text>
					<text>{{item.cateTitle}}</text>
				</view>
			</scroll-view>
			<!-- 二级 -->
			<scroll-view class="right" scroll-y :scroll-top="scrollTop" :style="'height:'+height+'rpx'" scroll-with-animation>
				<view class="scroll-img" v-if='!(id=="x")'>
					<swiper class="swiper" autoplay="true" style="height: 230rpx;" interval="5000" duration="1500">
						<swiper-item v-for="(item , index) in imgSlide" :key="index">
							<image :src="item.img" mode=""></image>
						</swiper-item>
					</swiper>
				</view>
				<!-- 总分类显示  品牌/车车型 -->
				<view class="li-content zongh" v-if="id=='x'">
					<view class="li" @tap="bander(item.id)" v-for="(item , i) in rList">
						<view class="imgpp">
							<image :src="item.brandLogo" mode=""></image>
						</view>
						<view class="zhiya">
							<text>{{item.brandTitle}}</text>
						</view>
					</view>
				</view>

				<!-- 其他分类 -->
				<view :class="item.isHide?'li-content isHidden':'li-content'" v-if="!(id=='x')" v-for="(item , index) in rList">
					<view class="li-title">
						{{item.cateTitle}}
					</view>
					<view class="li" @tap="list(ite.id)" v-for="(ite , inde) in item.childsList">
						<view class="imgpp">
							<image :src="ite.imgUrl" mode=""></image>
						</view>
						<view class="zhiya">
							<text>{{ite.cateTitle}}</text>
						</view>
					</view>
					<view class="li-load" v-if="item.isHide" @tap='toggelHide(index)'>
						加载更多
					</view>
				</view>
			</scroll-view>
		</view>
		<view style='position:fixed;left:0;width:calc(100% - 50rpx);bottom:100rpx;height:100rpx;background:rgba(0,0,0,0.6);line-height:100rpx;color:#fff;padding-left:50rpx;font-size:24rpx;'
		 v-if='xianshidenglu'>
			<image src='../../static/6ef74f70be674fdc834aa269ed7f8078.png' style='width:20rpx;height:20rpx;margin-right:20rpx;'
			 @tap='g'></image>
			登录后体验更多精彩
			<view style='float:right;padding:0 40rpx;background:#2d5eff;border-radius:50rpx;line-height:60rpx;margin-top:20rpx;margin-right:20rpx;font-size:24rpx;'
			 @tap='deng'>立即登录/注册</view>
		</view>
		<tabBar id='tabbar' :currentPage='currentPage'></tabBar>
	</view>
</template>

<script>
	import tabBar from '@/components/tabBar/tabBar.vue';
	export default {
		data() {
			return {
				currentPage: 'classify',
				AllList: [],
				rList: {},
				toggle: 0,
				height: 0,
				scrollTop: 0,
				id: 'x',
				imgSlide: [],
				toTop: '',
				xianshidenglu: false,
				yincang:true
			}
		},
		components: {
			tabBar,
		},
		onLoad(options) {
			// this.id=index
			if(options.tiaozhuan==0){
				this.yincang=false
			}
			var _this = this
			if (!uni.getStorageSync('Authorization')) {
				this.xianshidenglu = true
			} else {
				this.xianshidenglu = false
			}
			// this.height = uni.getSystemInfoSync().windowHeight-100;
			uni.getSystemInfo({
				success: function(res) {
					_this.height = (res.windowHeight * (750 / res.windowWidth)) - 250;
				}
			})

			this.$https({
				url: '/api/oauth/get-goods-brand-list',
				data: {},
				dengl: true,
				method: 'POST',
				success(res) {
					_this.rList = res.data.data
				},
			})
			this.$https({
				url: '/api/oauth/get-one-list',
				data: {},
				dengl: true,
				success: function(res) {
					// console.log(res.data.data)
					_this.AllList = res.data.data
					if (options.id) {
						_this.AllList.map(function(n, index) {
							if (n.id == options.id) {
								// _this.rList = res.data.data.goodsCates[index].childsList
								_this.id = index
								_this.scrollPic(options.id)
								_this.rList.map(function(val, i) {
									_this.$set(val, 'isHide', true)
									if (val.childsList.length < 6) {
										val.isHide = false
									}
								})
							}
						})
						return false
					}

					// 	_this.rList.map(function(val, i) {
					// 		_this.$set(val, 'isHide', true)
					// 		if (val.childsList.length < 6) {
					// 			val.isHide = false
					// 		}
					// 	})
					// 	_this.scrollPic(res.data.data.goodsCates[0].id)
				},
			})
			console.log(_this.rList)

		},
		onShow() {
			if (!uni.getStorageSync('Authorization')) {
				this.xianshidenglu = true
			} else {
				this.xianshidenglu = false
			}
		},
		methods: {
			togLi(index, id) {
				var that = this
				if (index == 'x') {
					this.id = index
					that.$https({
						url: '/api/oauth/get-goods-brand-list',
						data: {},
						dengl: true,
						method: 'POST',
						success(res) {
							that.rList = res.data.data
						},
					})
				} else {
					this.id = index;
					this.rList = this.AllList[index].childsList
					this.rList.map(function(val, i) {
						that.$set(val, 'isHide', true)
						if (val.childsList.length < 6) {
							val.isHide = false
						}
					})
					this.scrollPic(id)
				}
				this.scrollTop = Math.random()
			},
			toggelHide: function(i) {
				this.rList[i].isHide = false
				if (i == 0) {
					// this.toTop='toBanner'
					this.scrollTop = Math.random()
				}

			},
			g: function() {
				this.xianshidenglu = false
			},
			deng: function() {
				uni.navigateTo({
					url: '../enter/enter'
				})
			},
			scrollPic: function(id) {
				var that = this
				this.$https({
					url: '/api/oauth/shop/get-cate-type-banner-list',
					data: {
						cateId: id
					},
					dengl: true,
					method: 'POST',
					success(res) {
						that.imgSlide = res.data.data
					}
				})
				//请求二级分类
				this.$https({
					url: '/api/oauth/get-one-child-list',
					data: {
						cateId: id
					},
					dengl: true,
					success: res => {

						this.rList = res.data.data
						this.rList.map(function(val, i) {
							that.$set(val, 'isHide', true)
							if (val.childsList.length < 6) {
								val.isHide = false
							}
						})
					}
				})

			},
			list(id) {
				// console.log(id)
				uni.navigateTo({
					url: './fenlOne?id=' + id
				})
			},
			bander(id) {
				console.log(this.rList)
				uni.navigateTo({
					url: './fenlOne?barId=' + id
				})
			},
			search: function() {
				uni.navigateTo({
					url: '../search/search'
				})
			},
			back: function() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss">
	.li-content:last-child .li-load{
		padding-bottom:20rpx;
	}
	.isHidden {
		height: 530rpx;
		position: relative;

		.li-load {
			font-size: 26rpx;
			color: #3c60e4;
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
		}


	}

	.zongh {
		padding: 0 25rpx;
		box-sizing: border-box;
	}

	.isHidden .li:nth-child(n+8) {
		margin-top: 50rpx;
	}

	.top {
		overflow: hidden;
		border-bottom: 1px solid #e5e5e5;
		height: 90rpx;
		text-align: center;
		position: fixed;
		width: 100%;
		left: 0;
		top: 0;
		z-index: 99999;
		background: #fff;
		padding-top: 70rpx;

		.back {
			width: 90rpx;
			height: 90rpx;
			line-height: 90rpx;

			image {
				width: 18rpx;
				height: 32rpx;
				display: block;
				padding: 29rpx 36rpx;
			}
		}

		.textBox {
			display: inline-block;

			text {
				font-size: 32rpx;
				color: #333;
				float: left;
				line-height: 90upx;
			}
		}


		.imgBox {
			float: right;
			width: 90rpx;
			height: 90rpx;
			line-height: 90rpx;

			image {
				width: 36upx;
				height: 36upx;
				display: block;
				margin: 27rpx;
			}
		}
	}



	.Box {
		width: 750upx;
		overflow: hidden;
		margin-top: 150rpx;

		.scroll-img {
			margin: 25rpx;
			border-radius: 15rpx;
			overflow: hidden;

			image {
				width: 100%;
				height: 230rpx;
				display: block;
			}
		}

		.li-content {
			font-size: 26rpx;
			color: #333;
			overflow: hidden;

			.li-title {
				margin-top: 10rpx;
				text-align: left;
				padding-left: 25rpx;
				padding-bottom: 25rpx;
				font-weight: bold;
				font-size: 28rpx;
			}
		}

		.li-content:nth-child(n+1) {
			margin-top: 35rpx;
		}

		.li-load {
			font-size: 26rpx;
			color: #3c60e4;
			clear: both;

		}

		.left {
			text-align: left;
			width: 180upx;
			height: 1135upx;
			float: left;
			background-color: #f6f6f6;

			.on {
				width: 100%;
				box-sizing: border-box;
				// height: 90upx;
				background-color: #fff;
				padding: 25rpx 25rpx;
				margin-top: 25rpx;
				position: relative;

				.image {
					position: absolute;
					background: #2b5cff;
					width: 8rpx;
					height: 80%;
					display: block;
					left: 0;
					top: 0;
					bottom: 0;
					right: 0;
					margin: auto;
					margin-left: 0;
					border-radius: 5rpx;

				}

				text {
					color: #007AFF;
					font-size: 28upx;
				}
			}

			.addOn {
				background-color: #007AFF;

				text {
					color: #fff;
				}
			}

			.none {
				margin-top: 25rpx;
				width: 100%;
				box-sizing: border-box;
				padding: 25rpx 25rpx;
				background-color: #f6f6f6;

				text {
					color: #333;
					font-size: 28upx;
					// margin-left: 15rpx;
				}
			}
		}

		.right {
			width: calc(100% - 180rpx);
			text-align: center;
			overflow: hidden;
			background-color: #fff;

			.li {
				margin-bottom: 40upx;
				width: 33.33%;
				float: left;

				.imgpp {
					image {
						width: 120upx;
						height: 120upx;
					}
				}

				.zhiya {
					text {
						font-size: 26upx;
						color: #333;
						height: 50rpx;
						line-height: 50upx;
						overflow: hidden;
						text-overflow: clip;
						display: block;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
						padding: 0 10rpx;
						text-align: center;
					}
				}
			}

		}

	}
</style>
