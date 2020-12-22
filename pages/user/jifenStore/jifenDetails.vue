<template>
	<view>
		<!-- <view class="one_line">
		</view> -->

		<view class="top">
			<!-- 轮播图 -->
			<view class="imgBox">
				<image :src="shangpin" mode=""></image>
			</view>
			<view class="texie-title">


				<view class="h2">
					<text>{{name}}</text>
				</view>
				<view class="p">
					<text>{{q?q:0}}元+{{jifen?jifen:0}}积分</text>
				</view>
				<view class="span">
					<text>{{num?num:0}}人已兑换</text>
				</view>
			</view>
		</view>

		<view class="xiangq">
			<view class="img_b">
				<image src="../../../static/icon_29.png" mode=""></image>
			</view>
			<view class="txt">
				<text>兑换须知</text>
			</view>
			<view class="jians">
				<rich-text :nodes='xiangqing'></rich-text>
			</view>
			<view class="uni-padding-wrap uni-common-mt bott" @tap='tiaozhuan'>
				<button type="primary">立即兑换</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shangpin: '',
				name: '',
				jifen: '',
				num: '',
				xiangqing: '',
				q: '',
				id: ''
			}
		},
		onLoad(option) {
			var _this = this
			this.id = option.id
			this.$https({
				url: '/api/oauth/shop/mall-integral-goods-detail',
				data: {
					goods_id: option.id
				},
				dengl: true,
				success: function(res) {
					_this.shangpin = res.data.data.detail.goodsLogo
					_this.name = res.data.data.detail.goodsName
					_this.jifen = res.data.data.detail.integral
					_this.num = res.data.data.detail.salesSum
					// console.log(res.data.data.detail.goodsContent,28934719824798274982,_this.$richText(res.data.data.detail.goodsContent))
					_this.xiangqing = res.data.data.detail.goodsContent
					_this.q = res.data.data.detail.shopPrice
				}
			})
		},
		methods: {
			tiaozhuan: function() {
				uni.navigateTo({
					url: '../../cart/orderForm/jifen?good=' + this.id
				})
				// uni.navigateTo({
				// 	url:'../../cart/orderForm/orderForm?goodsId='+this.id+'&cartAttr='+JSON.stringify({
				// 		cartAttr:[{
				// 			goodsNum:1,

				// 		}]
				// 	})
				// })
			}
		}
	}
</script>

<style lang="scss">
	.top {
		width: 100%;
		border-bottom: 20upx solid #f7f7f7;
		overflow: hidden;
		box-sizing: border-box;

		.imgBox {
			float: left;
			width: 100%;
			overflow: hidden;
			height: 750rpx;

			image {
				width: 100%;
				height: 100%;
				display: block;
			}
		}

		.texie-title {
			padding: 20rpx;
			overflow: hidden;
		}

		.h2 {
			font-size: 30upx;
			margin-bottom: 15rpx;
			color: #333;
		}

		.p {
			font-size: 26upx;
			color: #ff0000;
			line-height: 30upx;
			float: left;
		}

		.span {
			font-size: 26upx;
			color: #999999;
			line-height: 30upx;
			float: right;
		}
	}

	.xiangq {
		overflow: hidden;
		width: 710upx;
		margin: 20upx;

		.img_b {
			float: left;
			padding-right: 10upx;

			image {
				width: 6upx;
				height: 30upx;
			}
		}

		.txt {
			font-size: 30upx;
			color: #333;
		}

		.jians {
			padding-top: 20upx;
			font-size: 24upx;
			padding-bottom: 100upx;
			line-height: 40upx;
			color: #666;
		}

		.bott {
			width: 670upx;
			position: fixed;
			bottom: 40upx;
			left: 40upx;

			button {
				border-radius: 40upx;
				font-family: Microsoft YaHei;
				background-color: #3366ff;
			}

		}
	}
</style>
