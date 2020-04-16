<template>
	<view>

		<view class="top">
			<view class="textBox">
				<text>购物车(02)</text>
			</view>
			<!-- 无消息通知状态 -->
			<view class="imgBox">
				<image src="../../static/icon_36.png" mode=""></image>
			</view>
			<view class="spanBox">
				<text>编辑</text>
			</view>
		</view>

		<view class="listBox">
			<view class="radios">
				<radio value="r2" />
				<text>米其林官方旗舰店</text>

				<image src="../../static/icon_26.png" mode=""></image>
			</view>

		</view>

		<!-- 订单信息 -->
		<view class="xinxi" v-for="(i , n) in 3">
			<view class="radi">
				<radio value="r2" />
			</view>
			<view class="imgBox_a">
				<image src="../../static/img_09.jpg" mode=""></image>
			</view>
			<view class="txt_c">
				<view class="title">
					<text>车载商品监控稍等稍等程等程序做序做着的限制性</text>
				</view>
				<view class="spec" @click="openPopup">
					<text>已选：＂黄色＂∨</text>
				</view>
				<view class="radColor">
					<text>￥222.00</text>
				</view>

				<!-- 这是数量加减 -->
				<view class="jia">
					<text>加减占位</text>
				</view>
			</view>
		</view>

		<!-- 失效宝贝 -->
		<view class="Boxs">
			<view class="lose">
				<view class="xinxi">
					<view class="biaot">
						<text>失效宝贝</text>
						<view class="dele">
							<text>删除</text>
						</view>
					</view>
					<view class="imgBox_a">
						<image src="../../static/img_09.jpg" mode=""></image>
					</view>
					<view class="txt_c">
						<view class="title">
							<text>车载商品监控稍等稍等程等程序做序做着的限制性</text>
						</view>
						<view class="spec">
							<text>已选：＂黄色＂</text>
						</view>
						<view class="radColor">
							<text>已售罄</text>
						</view>
					</view>
				</view>
			</view>

			<view class="lose" v-for="(i , n) in 4">
				<view class="xinxi">
					<view class="imgBox_a">
						<image src="../../static/img_09.jpg" mode=""></image>
					</view>
					<view class="txt_c">
						<view class="title">
							<text>车载商品监控稍等稍等程等程序做序做着的限制性</text>
						</view>
						<view class="spec">
							<text>已选：＂黄色＂</text>
						</view>
						<view class="radColor">
							<text>已售罄</text>
						</view>
					</view>
				</view>
			</view>
		</view>


		<!-- 底部 -->
		<view class="bottom">
			<view class="radis">
				<radio value="r2" />
				<text>全选</text>
			</view>
			<view class="leftA">
				<text>合计：<text>￥885.00</text></text>
			</view>
			<view class="rightA">
				<text>结 算</text>
			</view>
		</view>

		<!-- 弹出框内容 -->
		<uni-popup ref="popup" type="bottom" class="tanchu">
			<button @click="closePopup">×</button>
			<view class="neira">
				<view class="imgs">
					<image src="../../static/img_12.jpg" mode=""></image>
				</view>

				<view class="text_e">
					<view class="price">
						<text>￥857.00</text>
					</view>
					<view class="speci">
						<text>已选：＂红色＂,＂官方标配＂</text>
					</view>
				</view>

				<view class="color">
					<view class="tit_k">
						<text>颜色</text>
					</view>
					<!-- 默认样式 -->
					<view class="xiang">
						<text>黑色</text>
					</view>
					<view class="xiang">
						<text>黑白色</text>
					</view>
					<!-- 选中样式 -->
					<view class="xiang_on">
						<text>黑色</text>
					</view>
				</view>

				<view class="set">
					<view class="tit_k">
						<text>套餐</text>
					</view>
					<!-- 默认样式 -->
					<view class="xiang">
						<text>官方标配</text>
					</view>
					<view class="xiang">
						<text>套餐一</text>
					</view>
					<view class="xiang">
						<text>套餐一</text>
					</view>
					<!-- 选中样式 -->
					<view class="xiang_on">
						<text>套餐二</text>
					</view>
				</view>

				<view class="quantity">
					<view class="tit_k">
						<text>数量</text>
					</view>
					<!-- 这是数量加减 -->
					<view class="jia">
						<text>加减占位</text>
					</view>
				</view>
				<view class="uni-padding-wrap uni-common-mt bott">
					<button type="primary">确定</button>
				</view>
			</view>

		</uni-popup>
		<tabBar :currentPage='currentPage'></tabBar>
	</view>

</template>

<script>
	import tabBar from '@/components/tabBar/tabBar.vue';
	// 弹出层
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default {
		data() {
			return {
				currentPage: 'cart'
			}
		},
		components: {
			tabBar,
			uniPopup
		},
		methods: {
			select: function() {
				console.log(1)
			},
			openPopup() {
				this.$refs.popup.open()
			},
			closePopup() {
				this.$refs.popup.close()
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

		.spanBox {
			float: right;
			padding-right: 20upx;

			text {
				line-height: 90upx;
				font-size: 28upx;
				color: #666;
			}
		}
	}

	.radios {
		width: 710upx;
		padding: 20upx;
		overflow: hidden;
		padding-top: 10upx;
		overflow: hidden;
		border-bottom: 1px solid #f7f7f7;

		text {
			font-size: 28upx;
			color: #333;
			line-height: 40upx;
			padding-right: 10upx;
		}

		image {
			width: 12upx;
			height: 26upx;
		}
	}

	.xinxi {
		overflow: hidden;
		width: 710upx;
		padding: 20upx;
		border-bottom: 1px dotted #ccc;

		.radi {
			float: left;
			margin-right: 20upx;
			margin-top: 10%;
		}

		.imgBox_a {
			float: left;
			padding-top: 20upx;

			image {
				width: 215upx;
				height: 160upx;
			}
		}

		.txt_c {
			float: left;
			width: 400upx;
			padding-left: 20upx;

			.title {
				padding-top: 10upx;

				text {
					font-size: 30upx;
					line-height: 30upx;
					color: #333;
				}
			}

			.spec {
				font-size: 26upx;
				line-height: 40upx;
				color: #666;
			}

			.radColor {
				float: left;
				color: #ff0000;
				font-size: 32upx;
			}

			.jia {
				float: right;

				text {
					font-size: 20upx;
					color: #666;
				}
			}
		}
	}

	.lose {
		.xinxi {
			width: 750upx;
			padding: 0upx;
			padding-bottom: 20upx;
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

		.radColor {
			text {
				font-size: 30upx;
				color: #999;
			}
		}

		.imgBox_a {
			padding-left: 20upx;
		}

		.txt_c {
			float: left;
			width: 470upx;
			padding-left: 20upx;
		}
	}

	.spec {
		overflow: hidden;

		text {
			float: left;
			line-height: 40upx;
		}
	}

	.tu {
		float: left;

		image {
			width: 20upx;
			height: 12upx;
		}
	}

	.Boxs {
		width: 750upx;
		padding-bottom: 100upx;
	}

	.bottom {
		width: 750upx;
		height: 90upx;
		border-top: 1px solid #ccc;
		position: fixed;
		background-color: #fff;
		bottom: 100upx;
		left: 0upx;

		.radis {
			float: left;
			padding-top: 20upx;

			text {
				font-size: 28upx;
				color: #666;
			}
		}

		.leftA {
			float: left;
			padding-left: 20upx;

			text {
				font-size: 28upx;
				color: #333;
				line-height: 90upx;

				text {
					font-size: 28upx;
					color: #ff0000;
				}
			}
		}

		.rightA {
			float: right;
			width: 260upx;
			height: 100%;
			text-align: center;
			background-color: #2b5cff;

			text {
				font-size: 30upx;
				color: #fff;
				line-height: 90upx;

			}
		}
	}

	uni-popup {
		width: 30upx;
		height: 30upx;
		border: 1px solid #fff;
		background-color: #fff;
	}

	.tanchu {
		button {
			position: absolute;
			top: 10upx;
			right: 10upx;
			z-index: 9999;
			background: none !important;
			border: none !important;
		}

		button:after {
			border: none !important;
		}
	}

	.neira {
		width: 695upx;
		height: 800upx;
		background-color: #fff;
		border-radius: 20upx 20upx 0 0;
		position: relative;
		padding: 30upx;
		overflow: hidden;

		.imgs {
			float: left;

			image {
				width: 168upx;
				height: 168upx;
			}
		}

		.text_e {
			float: left;
			padding: 20upx;

			.price {
				padding-top: 10upx;

				text {
					font-size: 40upx;
					font-weight: bold;
					line-height: 80upx;
					color: #ec2334;
					line-height: 5upx;
				}
			}

			.speci {
				padding-top: 10upx;

				text {
					font-size: 28upx;
					color: #999;
				}
			}
		}

		.color {
			width: 100%;
			overflow: hidden;
			padding-top: 30upx;

			.tit_k {
				text {
					color: #999;
					font-size: 28upx;
					line-height: 30upx;
				}
			}

			.xiang {
				float: left;
				margin-top: 20upx;
				margin-right: 20upx;

				text {
					padding: 10upx 30upx;
					float: left;
					background-color: #f0f0f0;
					font-size: 28upx;
					color: #333;
					border: 1px solid #f0f0f0;
					border-radius: 5upx;
				}
			}

			.xiang_on {
				float: left;
				margin-top: 20upx;
				margin-right: 20upx;

				text {
					padding: 10upx 30upx;
					float: left;
					border: 1px solid #2b5cff;
					background-color: #fff;
					font-size: 28upx;
					color: #2b5cff;
					border-radius: 5upx;
				}
			}
		}

		.set {
			width: 100%;
			overflow: hidden;
			padding-top: 30upx;

			.tit_k {
				text {
					color: #999;
					font-size: 28upx;
					line-height: 30upx;
				}
			}

			.xiang {
				float: left;
				margin-top: 20upx;
				margin-right: 20upx;

				text {
					padding: 10upx 30upx;
					float: left;
					background-color: #f0f0f0;
					font-size: 28upx;
					color: #333;
					border: 1px solid #f0f0f0;
					border-radius: 5upx;
				}
			}

			.xiang_on {
				float: left;
				margin-top: 20upx;
				margin-right: 20upx;

				text {
					padding: 10upx 30upx;
					float: left;
					border: 1px solid #2b5cff;
					background-color: #fff;
					font-size: 28upx;
					color: #2b5cff;
					border-radius: 5upx;
				}
			}
		}

		.quantity {
			width: 100%;
			overflow: hidden;
			padding-top: 30upx;

			text {
				float: left;
				color: #999;
				font-size: 28upx;
			}

			.jia {
				float: right;
			}
		}
	}

	.bott {
		width: 670upx;
		height: 80upx;
		background-color: #007AEE;
		text-align: center;
		position: fixed;
		bottom: 40upx;
		border-radius: 40upx !important;
		left: 40upx;

		button {
			position: initial;
			border-radius: 40upx !important;
			font-family: Microsoft YaHei;
		}

	}
</style>
