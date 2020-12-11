<template>
	<view>
		<!-- <view class="line" style="height: 50rpx;"></view> -->
		<view class="top" style='position:fixed;width:100%;left:0;top:0;z-index:99999;background:#fff;padding-top:60rpx;'>
			<view class='back' @tap='back' style='float:left;margin-top:30rpx;margin-left:20rpx;'>
				<image src='../../static/icon_26-2.png' style='width:18rpx;height:32rpx;' mode=''></image>
			</view>
			<view class="textBox">
				<text>全部分类</text>
			</view>
			<view class="imgBox" @tap="search">
				<image src="../../static/icon_10.png" mode=""></image>
			</view>
		</view>

		<!-- 切换分类 -->
		<view class="Box dne">
			<!-- 一级 -->
			<scroll-view class="left" scroll-y :style="'height:'+height+'px'">
				<!-- 选中样式 -->
				<!-- 未选中样式 -->
				<view :class="id==index?'on':'none'" @tap="togLi(index,item.id)" v-for="(item ,index) in AllList" :key=item.id>
					<!-- <image v-if='id==index' src='../../static/icon_29.png'></image> -->
					<text v-if='id==index' class="image"></text>
					<text>{{item.cateTitle}}</text>
				</view>
			</scroll-view>
			<!-- 二级 -->
			<scroll-view class="right" scroll-y :scroll-top="scrollTop" :style="'height:'+height+'px'"
			 scroll-with-animation>
				<view class="scroll-img">
					<swiper class="swiper" autoplay="true" style="height: 230rpx;" interval="5000" duration="1500">
						<swiper-item v-for="(item , index) in imgSlide" :key="index">
							<image :src="item.img" mode=""></image>
						</swiper-item>
					</swiper>
				</view>
				<view :class="item.isHide?'li-content isHidden':'li-content'" v-for="(item , index) in rList">
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
				id: 0,
				imgSlide: []
			}
		},
		components: {
			tabBar,
		},
		onLoad(options) {
			// this.id=index
			var _this = this
			this.height = uni.getSystemInfoSync().windowHeight-100;
			this.$https({
				url: '/api/oauth/shop/mall-lists',
				data: {},
				dengl: true,
				success: function(res) {
					// console.log(res.data.data)
					_this.AllList = res.data.data.goodsCates
					if (options.id) {
						_this.AllList.map(function(n, index) {
							if (n.id == options.id) {
								_this.rList = res.data.data.goodsCates[index].childsList
								_this.id = index
								_this.scrollPic(options.id)
							}
						})
						return false
					}

					_this.rList = res.data.data.goodsCates[0].childsList
					_this.rList.map(function(val, i) {
						_this.$set(val,'isHide',true)
						if (val.childsList.length < 6) {
							val.isHide = false
						}
					})
					_this.scrollPic(res.data.data.goodsCates[0].id)
					console.log(_this.rList)

				},
			})
		},
		methods: {
			togLi(index, id) {
				this.id = index;
				this.rList = this.AllList[index].childsList
				this.rList.map(function(val, i) {
					val.isHide = true
					if (val.childsList.length < 6) {
						val.isHide = false
					}
				})
				this.scrollPic(id)
			},
			toggelHide: function(i) {
				console.log(i)
				this.rList[i].isHide = false
			},
			scrollPic: function(id) {
				var that = this
				this.$https({
					url: '/api/shop/get-cate-type-banner-list',
					data: {
						cateId: id
					},
					dengl: false,
					method: 'POST',
					success(res) {
						console.log(res.data.data, 99)
						that.imgSlide = res.data.data
					}
				})

			},
			list(id) {
				// console.log(id)
				uni.navigateTo({
					url: './fenlOne?id=' + id
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
	.isHidden {
		height: 530rpx;
		position: relative;

		.li-load {
			font-size: 26rpx;
			color: #3c60e4;
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0
		}


	}

	.isHidden .li:nth-child(n+8) {
		margin-top: 50rpx;
	}

	.top {
		width: 750upx;
		// margin: 0 auto;
		overflow: hidden;
		border-bottom: 1px solid #e5e5e5;
		height: 90rpx;

		.textBox {
			padding-left: 40%;

			text {
				font-size: 28upx;
				color: #333;
				float: left;
				line-height: 90upx;
			}
		}


		.imgBox {
			float: right;
			padding: 30upx;

			image {
				width: 36upx;
				height: 36upx;
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
			}
		}

		.li-content:nth-child(n+1) {
			margin-top: 35rpx;
		}

		.li-load {
			font-size: 26rpx;
			color: #3c60e4;
			clear:both;

		}

		.left {
			text-align: center;
			width: 170upx;
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
					font-size: 26upx;
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
					font-size: 26upx;
					margin-left: 15rpx;
				}
			}
		}

		.right {
			width: 580upx;
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
						line-height: 50upx;
					}
				}
			}

		}

	}
</style>
