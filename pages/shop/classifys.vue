<template>
	<view>
		<view class="top toubu">
			<view class="textBox">
				<text>全部分类</text>
			</view>
			<view class="imgBox" @tap="search">
				<image src="../../static/icon_10.png" mode=""></image>
			</view>
		</view>

		<!-- 切换分类 -->
		<view class="Box">
			<scroll-view class="left" scroll-y :style="'height:'+height+'rpx'">
				<!-- 选中样式 -->
				<!-- 未选中样式 -->
				<view :class="id==index?'on':'none'" @tap="togLi(index)" v-for="(item ,index) in allList" :key=item.id>
					<text v-if='id==index' class="image"></text>
					<text>{{item.cateTitle}}</text>
				</view>
			</scroll-view>

			<scroll-view class="right" scroll-y :scroll-top="scrollTop" @scroll="scroll" :style="'height:'+height+'rpx'"
			 scroll-with-animation>

				<view :class="item.isHide?'li-content isHidden':'li-content'" v-for="(item , index) in rList" >
					<view class="li-title">
						{{item.cateTitle}}
					</view>
					<view class="li" v-for="(ite , inde) in item.childsList" @tap="tiaozhuan(shopsId,isOK,ite.id)">
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
		<buttom bottom="3" :can="shopsId"></buttom>
	</view>
</template>

<script>
	import buttom from '../cart/dbottom.vue'
	export default {
		data() {
			return {
				buttom: '',
				shopsId: '',
				allList: [],
				rList: {},
				height: 0,
				scrollTop: 0,
				id: 0,
				isOK: '',
				imgSlide: []
			}
		},
		onLoad(option) {
			// this.height = uni.getSystemInfoSync().windowHeight -150;
			var _this=this
			uni.getSystemInfo({
			  success:function (res) {
			   _this.height = (res.windowHeight * (750 / res.windowWidth))-260; 
			  }
			})
			
			this.shopsId = option.id

			// console.log(option)
			var _this = this
			this.$https({
				url: '/api/oauth/shop/mall-lists',
				data: {},
				dengl: true,
				success(res) {
					_this.allList = res.data.data.goodsCates
					_this.rList = res.data.data.goodsCates[0].childsList
					_this.rList.map(function(val, i) {
						_this.$set(val,'isHide',true)
						if (val.childsList.length < 6) {
							val.isHide = false
						}
					})
				}
			})
		},
		methods: {
			togLi(index) {
				var that=this
				this.id = index;
				this.rList = this.allList[index].childsList
				this.rList.map(function(val, i) {
					that.$set(val,'isHide',true)
					if (val.childsList.length < 6) {
						val.isHide = false
					}
				})
			},
			toggelHide: function(i) {
				this.rList[i].isHide = false
			},
			tiaozhuan(shop, isok, cateId) {
				// console.log(this.shopsId)
				console.log(cateId)
				this.isOK = false
				uni.navigateTo({
					url: 'all?id=' + shop + '&isOK=' + isok + '&cateId=' + cateId
				})

			},
			search: function() {
				// console.log(this.shopsId)
				uni.navigateTo({
					url: '../search/search?shopsId=' + this.shopsId
				})
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
						that.imgSlide = res.data.data
					}
				})

			},
		},
		components: {
			buttom
		},

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
		// margin-top: 150rpx;

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
