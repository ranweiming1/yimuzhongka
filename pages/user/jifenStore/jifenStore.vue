<template>
	<view>
		<!-- <view class="one_line">
		</view> -->

		<view class="userBox">
			<view class="img_a">
				<image :src="user.headimg?user.headimg:'../../static/img_06.jpg'" mode=""></image>
			</view>
			<view class="text_a">
				<view class="yonghum">
					<text>{{user.nickname}}</text>
				</view>
				<view class="phone">
					<text>积分：<text>{{user.payPoints}}</text></text>
				</view>
			</view>
			<view class="imgRight" @tap="jDetail(phone)">
				<text>积分明细</text>
			</view>
		</view>

		<!-- tab切换排序 -->
		<view class="tabs">
			<!-- 选中样式 -->
			<view :class="i==1?'on':'jif'" @tap="taggle(1)">
				<text>兑换量</text>
			</view>

			<view :class="i==2?'on':'jif'" @tap="taggle(2)">
				<text>积分排序</text>
			</view>

			<view :class="i==3?'on':'jif'" @tap="taggle(3)">
				<text>价格排序</text>
			</view>
		</view>

		<!-- 商品列表 -->
		<view class="listBox">
			<view class="block" v-for="(item , index) in jifList" @tap="shopDetail(item.goodsId)">
				<view class="imgBox">
					<image :src="item.goodsLogo" mode=""></image>
				</view>
				<view class="tit">
					<text>{{item.goodsName}}</text>
				</view>
				<view class="span">
					<text>{{item.integral}}积分{{item.shopPrice?'+￥'+item.shopPrice:''}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				jifList: {},
				user: {},
				id: '',
				i: '1',
				isXu: true,
				phone:''
			}
		},
		props: ['num'],
		onLoad() {
			var _this = this
			this.$https({
					url: '/api/oauth/shop/mall-goods-jfList',
					method: 'POST',
					dengl:true,
					data: JSON.stringify({
						jfAsc: '',
						jfDesc: '',
						priceAsc: '',
						priceDesc: '',
					}),
					haeder: true,
					success: function(res) {
						_this.jifList = res.data.data.list
						_this.id = res.data.data.list[0].cateId
					}
				}),
				this.$https({
					url: '/api/user/my-info',
					dengl: false,
					data: {},
					success: function(res) {
						_this.user = res.data.data
						_this.phone=res.data.data.phone
					}
				})
		},
		methods: {
			jDetail() {
				uni.navigateTo({
					url: '../distr/distrDetail?id='+this.phone
				})
			},
			taggle(i) {
				var _this = this
				this.i = i
				_this.isXu = !_this.isXu
				if (i == 1) {
					this.$https({
						url: '/api/oauth/shop/mall-goods-jfList',
						method: 'POST',
						dengl:true,
						data: JSON.stringify({
							jfAsc: '',
							jfDesc: '',
							priceAsc: '',
							priceDesc: '',
						}),
						haeder: true,
						success: function(res) {
							_this.jifList = res.data.data.list
							_this.id = res.data.data.list[0].cateId
							// console.log(res.data.data.list)
						}
					})

				}
				if (i == 2) {
					this.$https({
						url: '/api/oauth/shop/mall-goods-jfList',
						method: 'POST',
						dengl:true,
						data: JSON.stringify(

							_this.isXu ? {
								jfAsc: '1',
								jfDesc: '',
								priceAsc: '',
								priceDesc: '',
							} : {
								jfAsc: '',
								jfDesc: '1',
								priceAsc: '',
								priceDesc: '',
							}
						),
						haeder: true,
						success: function(res) {
							_this.jifList = res.data.data.list
							_this.id = res.data.data.list[0].cateId
							// console.log(res.data.data.list)
						}
					})
				}
				if (i == 3) {
					this.$https({
						url: '/api/oauth/shop/mall-goods-jfList',
						method: 'POST',
						dengl:true,
						data: JSON.stringify(
							_this.isXu ? {
								jfAsc: '',
								jfDesc: '',
								priceAsc: '1',
								priceDesc: '',
							} : {
								jfAsc: '',
								jfDesc: '',
								priceAsc: '',
								priceDesc: '1',
							}
						),
						haeder: true,
						success: function(res) {
							_this.jifList = res.data.data.list
							_this.id = res.data.data.list[0].cateId
							// console.log(res.data.data.list)
						}
					})
				}

			},
			shopDetail(id){
				uni.navigateTo({
					url:'./jifenDetails?id='+id
				})
			}
		
		}
	}
</script>

<style lang="scss">
	.userBox {
		width: 710upx;
		overflow: hidden;
		padding: 20upx;
		padding-top: 20upx;
		background-color: #f7f7f7;

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
				color: #333;
				line-height: 60upx;
			}

			.phone {
				font-size: 30upx;
				color: #666;

				text {
					text {
						color: #3366ff;
					}
				}
			}
		}

		.imgRight {
			float: right;
			padding: 25upx 0upx 25upx 25upx;

			text {
				width: 12upx;
				height: 20upx;
				color: #fff;
				font-size: 22upx;
				border-radius: 40upx;
				padding: 10upx 20upx;
				background-color: #3366ff;
			}
		}
	}

	.tabs {
		text-align: center;
		width: 710upx;
		margin: 20upx;

		.on {
			float: left;
			width: 190upx;
			border-radius: 50upx;
			border: 1px solid #2b5cff;
			margin: 20upx;

			text {
				font-size: 26upx;
				color: #2b5cff;
				line-height: 60upx;
			}
		}

		.jif {
			float: left;
			width: 190upx;
			border-radius: 50upx;
			background-color: #f7f7f7;
			border: 1px solid #f7f7f7;
			margin: 20upx;

			text {
				font-size: 26upx;
				line-height: 60upx;
			}
		}

		.jiag {
			float: left;
			width: 190upx;
			border-radius: 50upx;
			background-color: #f7f7f7;
			border: 1px solid #f7f7f7;
			margin: 20upx;

			text {
				font-size: 26upx;
				line-height: 60upx;
			}
		}
	}

	.listBox {
		width: 750upx;
		overflow: hidden;
		margin-left: 25upx;
		padding-top: 20upx;

		.block {
			width: 330upx;
			float: left;
			margin: 5upx;
			margin-bottom: 20upx;
			margin-right: 30upx;
			border-radius: 10upx;
			box-shadow: 0 0 5px #ccc;
			;

			.imgBox {
				image {
					width: 330upx;
					height: 200upx;
					border-radius: 10upx;
				}

			}

			.tit {
				font-size: 28upx;
				padding: 10upx;
				color: #333;
			}

			.span {
				font-size: 28upx;
				color: #ff0000;
				padding-left: 10upx;
				padding-bottom: 10upx;
			}
		}
	}
</style>
