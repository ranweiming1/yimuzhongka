<template>
	<view>
		<!-- 头部 -->
		<view class="top">
			<view class="textBox">
				<input class="uni-input" focus placeholder="请输入关键字" />
			</view>
			<view class="imgBox">
				<image src="../../static/icon_43.png" mode=""></image>
			</view>
		</view>

		<!-- 这里有一个筛选 -->
		<view class="nav">
			<view class="con" @tap="chexing">
				<text>车型</text>
				<image src="../../static/icon_37.png" class="bot" mode=""></image>
			</view>
			<view class="con">
				<text>综合排序</text>
				<image src="../../static/icon_37.png" class="bot" mode=""></image>
			</view>
			<view class="con"  style="border: 0">
				<text>筛选</text>
				<image src="../../static/icon_37.png" class="bot" mode=""></image>
			</view>
		</view>

		<!-- 热门推荐 -->
		<view class="hahah list uni-flex uni-column" v-for="(item , index) in allList" @tap="detail(item.goodsId)">
			<view class="content ">
				<view class="imgBox">
					<image :src="item.goodsLogo" mode="widthFix"></image>
				</view>
				<view class="txt_a">
					<text class="span_a" v-if="item.selfStatus=='Y'">自营</text>
					<text>{{item.goodsName}}</text>
					<view class="txt_aa" v-for="(items,indexs) in item.couponDTOS">
						<text>满{{items.condition}}-{{items.money}}元</text>
					</view>
					<view class="txt_aas">
						<text>税后价：<text>￥{{item.marketPrice?item.marketPrice:'暂无价格'}}</text></text>
						<text>销量：{{item.salesSum}}</text>
					</view>

				</view>
			</view>
		</view>
		<buttom bottom="2" :can="shopsId" v-if="isOK"></buttom>
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
				isOK: true
			}
		},
		onLoad(option) {
			this.shopsId = option.id
			// this.isOK=opt
			console.log(option)
			if (option.isOK) {
				this.isOK = false
			}
			var _this = this

			this.$https({
				url: '/api/shop/mall-goods-ptList',
				data: {
					shop_id: option.id
				},
				dengl: false,
				success(res) {
					// console.log(res.data.data)
					_this.allList = res.data.data
				}
			})
		},
		components: {
			buttom
		},
		methods: {
			detail(id) {
				uni.navigateTo({
					url: '../index/productDetails?id=' + id
				})
			},
			chexing(){
				
			}
		}

	}
</script>

<style lang="scss">
	.top {
		width: 710upx;
		margin: 20upx;
		overflow: hidden;

		.textBox {
			float: left;
			margin-left: 70upx;
			background-color: #f0f0f0;
			border-radius: 50upx;

			input {
				height: 60upx;
				width: 520upx;
				line-height: 60upx;
				padding-left: 20upx;
				font-size: 26upx;
			}

			.uni-input-placeholder {
				color: #999 !important;
			}

		}

		.imgBox {
			padding-left: 30upx;
			padding-right: 20upx;
			padding-top: 10upx;
			float: right;

			image {
				width: 44upx;
				height: 39upx;
			}
		}
	}

	.nav {
		display: flex;
		width: 710upx;
		padding: 20upx;
		border-bottom: 1px solid #ccc;
		text-align: center;

		.con {
			width: 33.3%;
			// margin-top: 30rpx;
			// line-height: 95rpx;
			border-right:1rpx solid #eeeeee ;
			text{
				line-height: 36rpx;
				font-size: 28rpx;
				padding-right: 18rpx;
		
			}
			image{
				// line-height: 36rpx;
				width:13rpx;
				height: 8rpx;
			}
		}

		.color text {
			font-size: 30upx;
			color: #333;
		}
	}

	.content {
		display: black;
		width: 710upx;
		padding: 20upx;
		border-bottom: 1px dotted #ccc;
		padding-bottom: 20upx;
		overflow: hidden;

		.imgBox {
			image {
				width: 30%;
				height: inherit;
				float: left;
			}
		}

		.txt_a {
			padding-top: 10upx;
			width: 67%;
			margin-left: 20upx;
			float: left;

			text {
				font-size: 30upx;
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

				text {
					color: #333;
					font-size: 32upx;

					text {
						color: #ff3333;
						font-size: 32upx;
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
</style>
