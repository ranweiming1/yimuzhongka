<template>
	<view>
		<!-- 状态栏 -->
		<view class="topBox">
			<!-- 默认样式 -->
			<view class="none" @tap='shangpin'>
				<view class="ontext">
					<text>商品</text>
				</view>
				<view v-if='xiana==1' class='onimg'>
					<image src='../../static/icon_09.png'></image>
				</view>
			</view>

			<!-- 选中样式 -->
			<view class="none on" @tap='dianpuyangshi'>
				<view class="ontext">
					<text>店铺</text>
				</view>
				<view v-if='xiana==2' class="onimg">
					<image src="../../static/icon_09.png" mode=""></image>
				</view>
			</view>
		</view>

		<view class="listBox" v-if='xiana==2'>
			<view class="liBox" v-for="(item , index) in storeList">
				<view class="imgBox">
					<image :src="item.storeShopDTO.storeLogo" mode=""></image>
				</view>
				<view class="texBox">
					<view class="h2Box">
						<text>{{item.storeShopDTO.shopName}}</text>
					</view>
					<view class="spanBox">
						<text>销量：2562</text>
					</view>
				</view>
				<view class="bottBox">
					<text @tap="jindian(item.storeShopDTO.id)">进店逛逛</text>
				</view>
			</view>
		</view>
		<view class='hahah list uni-flex uni-column' v-if='xiana==1'>
			<view class='content' v-for="(item,index) in shopList" @tap="detail(item.goodsId)">
				<view class='imgBox'>
					<image :src="item.goodsLogo" mode='widthFix'></image>
				</view>
				<view class='txt_a'>
					<text class='span_a' v-if="item.selfStatus=='Y'">自营</text>
					<text>{{item.goodsName}}</text>
					<view class='txt_aa'>
						<text v-for="(ite,inde) in item.couponDTOS">满{{ite.condition}}-{{ite.money}}元</text>
					</view>
					<view class='txt_aas'>
						<text>税后价：<text>{{item.shopPrice?'￥'+item.shopPrice:'暂无价格'}}</text></text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				xiana: 1,
				shopList: [],
				storeList: {}

			}
		},
		onLoad: function() {
			var _this = this
			this.$https({
				url: '/api/user/my-collects',
				data: {},
				dengl: false,
				success: function(res) {
					_this.shopList = res.data.data
					console.log(res.data.data)

				}
			})
		},

		methods: {
			shangpin: function() {
				this.xiana = 1
			},
			dianpuyangshi: function() {
				var _this = this
				this.xiana = 2
				this.$https({
					url: '/api/shop/shop-collect-list',
					data: {},
					dengl: false,
					success: function(res) {
						_this.storeList = res.data.data
						console.log(res.data.data[0].storeShopDTO)
						console.log(res.data.data)
					}
				})
			},
			detail(id) {
				uni.navigateTo({
					url: '../index/productDetails?id=' + id
				})
				this.$https({
					url: '/api/shop/goods-brows-history-add',
					data: {
						goodsId: id
					},
					method: 'POST',
					dengl:true,
					success(res) {
					}
				})
			},
			jindian(id){
				uni.navigateTo({
					url:'../shop/shop?id='+id
				})
			}

		},
	}
</script>

<style lang="scss">
	.topBox {
		overflow: hidden;
		border-bottom: 1px solid #f0f0f0;
		width: 710upx;
		padding: 20upx 20upx 0 20upx;

		.on {
			.ontext {
				text {
					color: #333 !important;
				}
			}
		}

		.none {
			text-align: center;
			float: left;
			width: 50%;

			.ontext {
				text {
					font-size: 30upx;
					color: #999;
				}
			}

			.onimg {
				margin-left: 45%;
				margin-top: 20upx;

				image {
					display: block;
					width: 34upx;
					height: 6upx;
				}
			}
		}
	}

	.listBox {
		width: 690upx;
		overflow: hidden;
		padding: 20upx;

		.liBox {
			padding: 10upx;
			float: left;
			width: 100%;
			border-radius: 10upx;
			margin-bottom: 20upx;
			box-shadow: 0 0 10upx #ccc;

			.imgBox {
				float: left;

				image {
					width: 100upx;
					height: 100upx;
					border-radius: 100upx;
				}
			}

			.texBox {
				float: left;
				padding-left: 20upx;

				.h2Box {
					padding-top: 5upx;

					text {
						line-height: 50upx;
						font-size: 32upx;
						color: #333;
					}
				}

				.spanBox {
					text {
						font-size: 24upx;
						color: #333;
					}
				}
			}

			.bottBox {
				float: right;
				margin-top: 25upx;
				margin-right: 10upx;

				text {
					font-size: 20upx;
					color: #999;
					float: left;
					padding: 5upx 20upx;
					line-height: 40upx;
					background-color: #fff;
					border: 1px solid #ccc;
					border-radius: 50upx;
				}
			}
		}
	}

	.content {
		margin-top: 30upx;
		margin-bottom: 10upx;
		display: block;
		width: 340upx;
		margin-left: 25upx;
		float: left;
		box-shadow: 0 0 5upx #ccc;
		border-radius: 20upx;
		padding-bottom: 20upx;
		overflow: hidden;

		.imgBox {
			image {
				width: 100%;
				height: inherit;
				float: left;
			}
		}

		.txt_a {
			padding-top: 10upx;
			width: 90%;
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
