<template>
	<view>
		<view class="top">
			<view class="textBox">
				<text>全部分类</text>
			</view>
			<view class="imgBox">
				<image src="../../static/icon_10.png" mode=""></image>
			</view>
		</view>

		<!-- 切换分类 -->
		<view class="Box">
			<!-- 一级 -->
			<scroll-view class="left" scroll-y :style="'height:'+height+'px'">
				<!-- 选中样式 -->
				<!-- 未选中样式 -->
				<view :class="id==index?'on':'none'" @tap="togLi(index)" v-for="(item ,index) in AllList" :key=item.id>
					<image v-if='id==index' src='../../static/icon_29.png'></image>
					<text>{{item.cateTitle}}</text>
				</view>
			</scroll-view>
			<!-- 二级 -->
			<scroll-view class="right" scroll-y :scroll-top="scrollTop" @scroll="scroll" :style="'height:'+height+'px'"
			 scroll-with-animation>
				<view class="li" v-for="(item , index) in rList">
					<view class="imgpp">
						<image :src="item.imgUrl" mode=""></image>
					</view>
					<view class="zhiya">
						<text>{{item.cateTitle}}</text>
					</view>
				</view>
			</scroll-view>
		</view>
		<tabBar :currentPage='currentPage'></tabBar>
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
				id: 0
			}
		},
		components: {
			tabBar,
		},
		onLoad() {
			// this.id=index
			this.height = uni.getSystemInfoSync().windowHeight;
			var _this = this
			this.$https({
				url: '/api/shop/mall-lists',
				data: {},
				dengl: false,
				success: function(res) {
					// console.log(res.data.data.goodsCates.childsList)
					_this.AllList = res.data.data.goodsCates
					_this.rList = res.data.data.goodsCates[0].childsList
				},
			})
		},
		methods: {
			togLi(index) {
				this.id = index;
				this.rList = this.AllList[index].childsList
			}
		}
	}
</script>

<style lang="scss">
	.top {
		width: 750upx;
		margin: 0 auto;
		overflow: hidden;
		border-bottom: 1px solid #e5e5e5;

		.textBox {
			padding-left: 40%;

			text {
				font-size: 38upx;
				color: #333;
				float: left;
				line-height: 100upx;
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

		.left {
			text-align: center;
			width: 240upx;
			height: 1135upx;
			float: left;
			background-color: #f6f6f6;

			.on {
				height: 100upx;
				background-color: #fff;

				image {
					float: left;
					padding-top: 35upx;
					width: 6upx;
					height: 30upx;
				}

				text {
					color: #007AFF;
					line-height: 100upx;
					font-size: 30upx;
				}
			}

			.none {
				height: 100upx;
				background-color: #f6f6f6;

				text {
					color: #333;
					line-height: 100upx;
					font-size: 30upx;
				}
			}
		}

		.right {
			width: 510upx;
			text-align: center;
			overflow: hidden;
			background-color: #fff;

			.li {
				margin-top: 20upx;
				width: 170upx;
				float: left;

				.imgpp {
					image {
						width: 120upx;
						height: 120upx;
					}
				}

				.zhiya {
					text {
						font-size: 28upx;
						color: #333;
						line-height: 50upx;
					}
				}
			}

		}

	}
</style>
