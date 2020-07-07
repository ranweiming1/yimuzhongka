<template>
	<view>
		<!-- 筛选内容 -->
		<view class="mask" v-if="isShow" @tap="hidd"></view>
		<view class="screen" v-if="isShow">
			<view class="s_Top">

				<view class="fenL">
					<view class="Ftop">
						<view class="top_L">
							<image src="../../static/icon_29.png" mode=""></image>
							<text>品牌</text>
						</view>
						<view class="top_R">
							<text>查看更多</text>
							<image src="../../static/icon_37.png" mode=""></image>
						</view>
					</view>
					<view class="Fbott">
						<button type="default" size="mini" v-for="(item,index) in shaiList" :class="itemex==index?'active':''" @tap="toggleList(index,item.id)">{{item.brandTitle}}</button>
					</view>
				</view>

				<view class="fenL">
					<view class="Ftop">
						<view class="top_L">

							<image src="../../static/icon_29.png" mode=""></image>
							<text>价格</text>
						</view>
						<view class="top_R">
							<text>查看更多</text>
							<image src="../../static/icon_37.png" mode=""></image>
						</view>
					</view>
					<view class="Fbott add">
						<input type="number" @blur="rValue($event)" placeholder="最低价" />
						<view class="line">——</view>
						<input type="number" @blur="rValue1($event)" placeholder="最高价" />
					</view>
				</view>


			</view>
			<view class="s_Bott">
				<button @tap="reset(itemex)" type="default" size="mini">重置</button>
				<button @tap="shaiX(id)" type="default" size="mini">立即筛选</button>
			</view>
		</view>

		<view :class="tog_Ca?'':'togActive'">
			<!-- 头部 -->
			<view class="top">
				<view class="textBox">
					<input class="uni-input" focus @blur="search" v-model="value" placeholder="请输入关键字" />
				</view>
				<view class="imgBox">
					<image src="../../static/icon_43.png" mode=""></image>
				</view>
			</view>

			<!-- 这里有一个筛选 -->
			<view class="nav">
				<view style='display:flex;'>
					<view class="con" @tap="chexing">
						<text>车型</text>
						<image src="../../static/icon_37.png" class="bot" mode=""></image>
					</view>
					<view class="con" @tap='zonghe'>
						<text>综合排序</text>
						<image src="../../static/icon_37.png" class="bot" mode=""></image>
					</view>
					<view class="con" style="border: 0">
						<view class="c_R" @tap="show">
							<text>筛选</text>
							<image src="../../static/icon_37.png" class="bot" mode=""></image>
						</view>
						<image class="images" :src="tog_Ca?'../../static/n8.png':'../../static/n6.png'" @tap="togCass(tog_Ca)" mode=""></image>

					</view>
				</view>
				<view style='position:absolute;left:25%;top:70rpx;text-align:center;width:33%;background:#fff;border:1px solid #ddd;font-size:22rpx;'
				 v-if='paixu'>
					<view style='margin-top:20rpx;' @tap='p("PASC")'>价格从高到低</view>
					<view style='margin-top:20rpx;' @tap='p("PDESC")'>价格从低到高</view>
					<view style='margin-top:20rpx;' @tap='p("SASC")'>销量从高到低</view>
					<view style='margin-top:20rpx;margin-bottom:20rpx;' @tap='p("SDESC")'>销量从低到高</view>
				</view>
			</view>



			<!-- 热门推荐 -->
			<view class="hahah list uni-flex uni-column" v-for="(item , index) in allList" @tap="detail(item.goodsId)">
				<view class="content ">
					<view class="imgBox">
						<image :src="item.goodsLogo" mode="widthFix"></image>
					</view>
					<view class="txt_a">
						<view class="title_top">
							<text class="span_a" v-if="item.selfStatus=='Y'">自营</text>
							<text>{{item.goodsName}}</text>
						</view>
						<view class="youhui_bo">
							<view class="txt_aa" v-for="(items,indexs) in item.couponDTOS">
								<text>满{{items.condition}}-{{items.money}}元</text>
							</view>

						</view>
						<view class="txt_aas">
							<text>税后价：<text>￥{{item.marketPrice?item.marketPrice:'暂无价格'}}</text></text>
							<text>销量：{{item.salesSum}}</text>
						</view>

					</view>
				</view>
			</view>
			<tabBar :currentPage='currentPage'></tabBar>
		</view>
	</view>
</template>

<script>
	import tabBar from '@/components/tabBar/tabBar.vue';
	export default {
		data() {
			return {
				currentPage: 'classify',
				tog_Ca: true,
				shopsId: '',
				allList: [],
				isOK: true,
				isShow: false,
				shaiList: {},
				itemex: 0,
				id: '',
				min: '',
				max: '',
				goodsType: '',
				paixu: false,
				st: '',
				value: ''
			}
		},
		onLoad(option) {
			var _this = this
			if (option.keywords) {
				this.value = option.keywords
				this.search()
			} else{
				console.log(option)
			this.$https({
				url: '/api/oauth/shop/mall-goods-ptList',
				data: {
					cat_id: option.id ? option.id : ''
				},
				dengl:true,
				success(res) {
					_this.allList = res.data.data
					_this.goodsType = res.data.data.selfStatus
					console.log(res.data.data)
				}
			})
			this.$https({
				url: '/api/oauth/oauth/shop/goods-recom',
				data: {
					// cat_id:option.id?option.id:''
				},
				dengl:true,
				success(res) {
					// _this.allList = res.data.data
					// _this.goodsType = res.data.data.selfStatus
					console.log(res.data.data)
				}
			})
		}
	},
	components: {
			tabBar,
		},
		methods: {
			togCass() {
				this.tog_Ca = !this.tog_Ca
			},
			detail(id) {
				uni.navigateTo({
					url: '../index/productDetails?id=' + id
				})
				this.$https({
					url: '/api/oauth/shop/goods-brows-history-add',
					data: {
						goodsId: id
					},
					method: 'POST',
					dengl:true,
					success(res) {
						// console.log('添加成功')
						// console.log(res.data)
					}
				})
			},
			chexing() {
				//跳转车型号列表
				uni.navigateTo({
					url: '../shop/car'
				})
			},
			show() {
				var _this = this
				this.isShow = true
				this.$https({
					url: '/api/oauth/shop/mall-goods-serch',
					data: {},
					dengl:true,
					success: function(res) {
						_this.shaiList = res.data.data.brandDTOS
						_this.id = res.data.data.brandDTOS[0].id
					}
				})
			},
			hidd() {
				this.isShow = false
			},
			toggleList(i, ind) {
				this.itemex = i
				this.id = ind
			},
			shaiX() {
				var _this = this
				this.$https({
					url: '/api/oauth/shop/mall-goods-serchList',
					dengl:true,
					method: 'post',
					data: JSON.stringify({
						goodsBrandId: this.id,
						maxPrice: this.max,
						minPrice: this.min,
						goodsType: this.goodsType,
						carId: this.carId,
						sortType: this.st
					}),
					haeder: true,
					success: function(res) {
						_this.isShow = false
						_this.allList = res.data.data
					}
				})
			},
			reset() {
				this.itemex = false
			},
			rValue(e) {
				this.min = e.target.value
			},
			rValue1(e) {
				this.max = e.target.value
			},
			togCass() {
				this.tog_Ca = !this.tog_Ca
			},
			gouwuche: function() {
				uni.navigateTo({
					url: '../cart/cart'
				})
			},
			zonghe: function() {
				this.paixu = !this.paixu
			},
			p: function(st) {
				this.st = st
				var _this = this
				this.$https({
					url: '/api/oauth/shop/mall-goods-serchList',
					dengl:true,
					method: 'post',
					data: JSON.stringify({
						goodsBrandId: this.id,
						maxPrice: this.max,
						minPrice: this.min,
						goodsType: this.goodsType,
						carId: this.carId,
						sortType: this.st
					}),
					haeder: true,
					success: function(res) {
						_this.paixu = false
						_this.allList = res.data.data
					}
				})
			},
			search() {
				var _this = this
				console.log(this.value)
				this.$https({
					url: '/api/oauth/shop/mall-goods-ptList',
					// dengl: false,
					data: {
						keywords: this.value
					},
					dengl:true,
					success: function(res) {
						_this.allList = res.data.data
						console.log(res.data.data)
					}
				})
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
		width: 710upx;
		padding: 20upx;
		border-bottom: 1px solid #ccc;
		text-align: center;
		position: relative;
		height: 50rpx;

		.con {
			// width: 33.3%;
			flex-grow: 1;
			// margin-top: 30rpx;
			// line-height: 95rpx;
			border-right: 1rpx solid #eeeeee;

			text {
				line-height: 36rpx;
				font-size: 28rpx;
				padding-right: 18rpx;

			}

			image {
				// line-height: 36rpx;
				width: 13rpx;
				height: 8rpx;
			}

			.images {
				display: inline-block;
				line-height: 34rpx;

				width: 36rpx;
				height: 34rpx;
			}
		}

		.con:nth-child(2),
			{
			flex-grow: 2;
		}

		.con:nth-child(3) {
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-wrap: nowrap;
			padding-left: 55rpx;
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
				display: inline-block;

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

	.mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.1);
		z-index: 999;
	}

	.screen {

		width: 80%;
		height: 100%;
		position: absolute;
		float: right;
		right: 0;
		padding-top: 36rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		// box-sizing: border-box;
		background-color: #FFFFFF;
		z-index: 999;
		// transform:translate(100rpx,100rpx);
		//             transition: 2s;

		.fenL {
			margin-left: 18rpx;
			padding: 0 17rpx;
			padding-top: 32rpx;
			margin-right: 18rpx;
			border-bottom: 1rpx dotted #c0c0c0;

			.Ftop {

				display: flex;
				justify-content: space-between;
				align-items: center;
				// margin-top: 68rpx;
				margin-bottom: 38rpx;

			}

			.top_L {

				image {

					width: 6rpx;
					height: 30rpx;
					padding-right: 15rpx;
				}

				text {
					font-size: 30rpx;
				}
			}

			.top_R {
				font-size: 22rpx;
				color: #999999;

				image {
					width: 15rpx;
					height: 9rpx;
					padding-left: 20rpx;
				}
			}

			.Fbott {

				// display: flex;
				// flex-wrap: wrap;
				// justify-content: flex-start;
				// align-items: center;
				button {
					font-size: 22rpx;
					width: 30%;
					margin-bottom: 29rpx;
					border: 1rpx solid #1c2939;
					color: #333333;
					height: 48rpx;
					line-height: 48rpx;
					margin-right: 14rpx;
				}

				.active {
					color: #2b5cff;
					border: 1rpx solid #2b5cff;
				}

				input {
					font-size: 22rpx;
					display: inline-block;
					border-radius: 30rpx;
					// color: #bfbfbf;
					width: 40%;
					height: 57rpx;
					line-height: 57rpx;
					border: 1rpx solid #bfbfbf;
					text-align: center;
				}

				.line {
					margin: 0 18rpx;
					font-size: 27rpx;
					display: inline-block;
					height: 57rpx;
					line-height: 57rpx;
					color: #bfbfbf;
				}
			}
		}



		.add {
			display: flex;
			align-items: center;
		}

		.fenL:last-child {
			border: 0;
		}

		.s_Bott {
			display: flex;
			justify-content: space-between;
			padding: 0, 10rpx;
			padding-bottom: 45rpx;

			:first-child {
				background-color: #dcdcdc;
				color: #333333;
				width: 35%;
				height: 77rpx;
				line-height: 77rpx;
			}

			:last-child {
				width: 35%;
				background-color: #2b5cff;
				color: #FFFFFF;
				height: 77rpx;
				line-height: 77rpx;
			}
		}
	}

	.togActive {
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

		.content {
			margin-top: 20upx;
			// margin-bottom: 10upx;
			display: black;
			width: 308upx;
			margin-left: 20upx;
			float: left;
			box-shadow: 0 0 5px #ccc;
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
						margin-right: 6upx;
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

		.Boxaaa {
			overflow: hidden;
			margin-bottom: 20upx;
		}
	}
</style>
