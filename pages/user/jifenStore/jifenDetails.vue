<template>
	<view>
		<!-- <view class="one_line">
		</view> -->
		<!-- #ifndef H5 -->
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
					<text>{{jifen?jifen+'积分':0}}{{q?'+￥'+q.toFixed(2):''}}</text>
				</view>
				<view class="span">
					<text>{{num?num:0}}人已兑换</text>
				</view>
			</view>
		</view>
		<!-- #endif -->

		<view class="xiangq">
			<view class="img_b">
				<image src="../../../static/icon_29.png" mode=""></image>
			</view>
			<view class="txt">
				<text>兑换须知</text>
			</view>
			<view class='jians'>
				<rich-text :nodes='shangpinxuzhi'></rich-text>
			</view>
			<view class='txt'>
				<text>商品介绍</text>
			</view>
			<view class="jians">
				<rich-text :nodes='xiangqing'></rich-text>
			</view>
			<view style="height: 180rpx;"></view>
			<!-- <view class="uni-padding-wrap uni-common-mt bott" @tap='tiaozhuan'>
				<button type="primary">立即兑换</button>
			</view> -->
			<view class="uni-padding-wrap uni-common-mt bott" @tap='tiaozhuan'>
				<view class="anniu">
					立即兑换
				</view>
				<!-- <button type="primary">立即兑换</button> -->
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
				id: '',
				wodejifen: 0,
				shangpinxuzhi: ''
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
			//获取积分
			this.$https({
				url: '/api/user/my-info',
				data: {},
				success: res => {
					this.wodejifen = res.data.data.payPoints
				}
			})
			this.$https({
				url: '/api/oauth/help/exchange-notes',
				data: {},
				dengl: true,
				success: res => {
					this.shangpinxuzhi = res.data.data.content
				}
			})
		},
		onShow() {
			this.$https({
				url: '/api/user/my-info',
				data: {},
				success: res => {
					this.wodejifen = res.data.data.payPoints
				}
			})
		},
		methods: {
			tiaozhuan: function() {
				if (this.wodejifen < this.jifen) {
					uni.showToast({
						title: '你的积分不足',
						image: '../../../static/c.png'
					})
					return false
				}
				uni.navigateTo({
					url: '../../cart/orderForm/jifen?good=' + this.id + '&wodejifen='+this.wodejifen
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
			// padding-bottom: 100upx;
			line-height: 40upx;
			color: #666;
		}

		.bott {
			width: 100%;
			    position: fixed;
			    bottom: 0;
			    left: 0;
			    background: #FFFFFF;
			    height: 150rpx;

			button {
				border-radius: 40upx;
				font-family: Microsoft YaHei;
				background-color: #3366ff;
			}
		.anniu{
			margin: 0 auto;
			    width: 670rpx;
			    background: #3366ff;
			    color: #fff;
			    font-size: 30rpx;
			    height: 80rpx;
			    line-height: 80rpx;
			    text-align: center;
			    border-radius: 40rpx;
			    position: fixed;
			    left: 0;
			    right: 0;
			    bottom: 40rpx;
		}

		}
	}
</style>
