<template>
	<view :style="isShow||paixu?'height: 100vh;overflow: hidden;':''">
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
						<button type="default" size="mini" v-for="(item,index) in shaiList"
							:class="itemex==index?'active':''"
							@tap="toggleList(index,item.id)"><text>{{item.brandTitle}}</text></button>
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
						<input type="number" v-model="min" @blur="rValue($event)" placeholder="最低价" />
						<view class="line">——</view>
						<input type="number" v-model="max" @blur="rValue1($event)" placeholder="最高价" />
					</view>
				</view>


			</view>
			<view class="s_Bott">
				<button @tap="reset(itemex)" type="default" size="mini">重置</button>
				<button @tap="shaiX(id)" type="default" size="mini">立即筛选</button>
			</view>
		</view>

		<view :class="tog_Ca?'clearCss':'togActive'">
			<!-- 头部 -->
			<!-- #ifndef H5 -->
			<view class="top">
				<view class="textBox">
					<input class="uni-input" @blur="search" :focus="isFocus" v-model="value" placeholder="请输入关键字" />
				</view>
				<view class="imgBox">
					<image src="../../static/icon_10.png" mode="" @tap='search'></image>
				</view>
			</view>
			<!-- #endif -->

			<!-- 这里有一个筛选 -->
			<view class="nav">
				<view style='display:flex;'>
					<view class="con" @tap="chexing">
						<text>车型</text>
						<p class="activeBf"></p>
					</view>
					<view class="con" @tap='zonghe'>
						<text :style="paixu?'color:#3462ff':''">综合排序</text>
						<p :class="paixu?'activeAf':'activeBf'"></p>
					</view>
					<view class="con" style="border: 0">
						<view class="c_R" @tap="show">
							<text>筛选</text>
							<p class="activeBf"></p>
						</view>
						<image class="images" :src="tog_Ca?'../../static/n8.png':'../../static/n6.png'"
							@tap="togCass(tog_Ca)" mode=""></image>
					</view>
				</view>

				<!-- <view style='position:absolute;left:25%;top:70rpx;text-align:center;width:33%;background:#fff;border:1px solid #ddd;font-size:22rpx;'
				 v-if='paixu'>
					<view style='margin-top:20rpx;' @tap='x("PASC")'>价格从高到低</view>
					<view style='margin-top:20rpx;' @tap='x("PDESC")'>价格从低到高</view>
					<view style='margin-top:20rpx;' @tap='x("SASC")'>销量从高到低</view>
					<view style='margin-top:20rpx;margin-bottom:20rpx;' @tap='x("SDESC")'>销量从低到高</view>
				</view> -->
			</view>
			<view class="zhMask" v-if='paixu' @tap='guanbi'>
				<view class="mask-content">
					<view class="mask-cont-item" @tap.stop='x("COMPE",1)'>综合<view class="cont-item-icon"
							v-if='st=="COMPE"'>
							<image src="../../static/price_xuanze_icon.png" mode=""></image>
						</view>
					</view>
					<view class="mask-cont-item" @tap.stop='x(salePank,2)'>销量<view class="cont-item-icon"
							v-if='st=="SDESC"||st=="SASC"'>
							<image
								:src="st=='SDESC'?'../../static/priceD_icon.png':st=='SASC'?'../../static/priceG_icon.png':''"
								mode=""></image>
						</view>
					</view>
					<view class="mask-cont-item" @tap.stop='x(priceRank,3)'>价格高/低<view class="cont-item-icon"
							v-if='st=="PDESC"||st=="PASC"'>
							<image
								:src="st=='PDESC'?'../../static/priceD_icon.png':st=='PASC'?'../../static/priceG_icon.png':''"
								mode=""></image>
						</view>
					</view>
					<!-- <view class="mask-cont-item" @tap='p("SDESC")'>销量从低到高<view style='display:inline-block;margin-left:10rpx;' v-if='st=="SDESC"'>√</view>
						</view> -->
				</view>
			</view>

			<!-- 热门推荐 -->
			<view class="hahah list uni-flex uni-column " style="padding-top: 250rpx;">
				<view class="content-item " v-for="(item , index) in allList" @tap="detail(item.goodsId)">
					<view class="imgBox">
						<image :src="item.goodsLogo" mode="widthFix"></image>
					</view>
					<view class="content-item-text">
						<view class="title_top">	
							<text class="span_a" v-if="item.selfStatus=='Y'">自营</text>
							<text class="titleText">{{item.goodsName}}</text>
						</view>
						<view class="item-coupon">
							<view class="coupon-item" v-for="(items,indexs) in item.couponDTOS">
								<text>满{{items.condition}}-{{items.money}}元</text>
							</view>
							<view class="coupon-item">
								<text>包邮</text>
							</view>
						</view>

						<view class="item-price">
							<text class="price-text">￥{{item.marketPrice?item.marketPrice.toFixed(2):'暂无价格'}}</text>
							<text class="shop-sales">销量：{{item.salesSum}}</text>
						</view>

					</view>
				</view>

				<view v-if='allList.length==0'>
					<image src='../../static/d.png' style='width:283rpx;height:184rpx;display:block;margin:50rpx auto;'>
					</image>
					<view style='text-align:center;'>暂无产品列表,去首页看看</view>
				</view>
			</view>
			<buttom bottom="2" :can="shopsId" v-if="isOK"></buttom>
		</view>
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
				isOK: true,
				isShow: false,
				shaiList: {},
				itemex: 'x',
				id: '',
				min: '',
				max: '',
				tog_Ca: true,
				goodsType: '',
				paixu: false,
				st: '',
				value: '',
				isFocus: false,
				page: 1,
				loadingType: 0,
				carId: '',
				catId: '',
				isFilter: false,
				priceRank: 'PASC',
				salePank: 'SDESC',
				pankInd: ''

			}
		},
		onLoad(option) {
			var _this = this
			console.log(option)
			if (option.keywords && option.shopsId) {
				this.value = option.keywords
				this.shopsId = option.shopsId
				this.isOK = false
				var data = {
					keywords: this.value,
					shop_id: this.shopsId,
					page: this.page,
					limit: 10

				}
				var url = '/api/oauth/shop/mall-goods-ptList'
				this.getNews(url, data)
			} else {
				console.log(22222)
				if (option.id)
					_this.shopsId = option.id
				if (option.cateId) {

				} else {
					option.cateId = ''
				}
				// this.isOK=opts
				if (option.isOK) {
					_this.isOK = false
				}
				// var _this = this
				if (!option.goodsBrandId) {

					console.log(333333)
					if (option.cateId) {
						_this.catId = option.cateId
					}
					var data = {
						shop_id: _this.shopsId,
						cat_id: option.cateId,
						page: this.page,
						limit: 10
					}
					var url = '/api/oauth/shop/mall-goods-ptList'
					this.getNews(url, data)
				}
				if (option.goodsBrandId) {
					console.log(88888)
					_this.id = option.goodsBrandId
					_this.carId = option.carId
					_this.shaiX()
				}
			}
		},
		onReachBottom() {
			// var data = {
			// 	page: this.page + 1,
			// 	limit: 10
			// }
			// this.getMoreNews(data)
			var _this = this
			if (this.isFilter) {
				var data = JSON.stringify({
					goodsBrandId: this.id,
					maxPrice: this.max,
					minPrice: this.min,
					keyWords: this.value,
					goodsType: this.goodsType,
					carId: this.carId,
					shop_id: _this.shopsId,
					sortType: this.pankInd == 1 ? '' : this.st,
					catId: this.catId,
					page: this.page + 1,
					limit: 10
				})
				this.getMoreNewsTwo(data)
			} else {
				if (this.shopsId && this.catId) {
					var data = {
						page: this.page + 1,
						limit: 10,
						shop_id: _this.shopsId,
						cat_id: option.cateId,
					}
					this.getMoreNews(data)
				} else if (this.value && this.shopsId) {
					var data = {
						keywords: this.value,
						shop_id: this.shopsId,
						page: this.page + 1,
						limit: 10
					}
					this.getMoreNews(data)
				} else {
					var data = {
						page: this.page + 1,
						limit: 10,
						shop_id: _this.shopsId,
					}
					this.getMoreNews(data)
				}
			}
		},

		onShow: function() {
			var _this = this
			if (this.carId) {
				_this.shaiX()
			}
		},
		components: {
			buttom
		},
		methods: {
			// 初始化
			getNews(url, data) {
				this.page = 1
				var _this = this
				//标题读取样式激活
				uni.showNavigationBarLoading()
				this.$https({
					url: url,
					data: data,
					dengl: true,
					method: 'post',
					success: function(res) {
						_this.allList = res.data.data
						//隐藏标题读取 
						uni.hideNavigationBarLoading()
						uni.stopPullDownRefresh()
					}
				})

			},
			// 初始化数据
			getMoreNews(data) {
				var _this = this
				this.page++

				if (_this.loadingType != 0) {
					return false; //loadingType!=0;直接返回
				}
				_this.loadingType = 1;
				uni.showNavigationBarLoading();
				this.$https({
					url: '/api/oauth/shop/mall-goods-ptList',
					dengl: true,
					method: 'post',
					data: data,
					success(res) {
						if (res.data.data.length < 10 || res.data.data ==
							'null') { //当之前的数据长度等于count时跳出函数，不继续执行下面语句
							_this.loadingType = 2;
							uni.showToast({
								title: '已加载全部数据',
								icon: 'none',
								duration: 2000
							})
							uni.hideNavigationBarLoading(); //关闭加载动画
							return false;
						}
						_this.allList = _this.allList.concat(res.data.data)
						_this.loadingType = 0; //将loadingType归0重置
						uni.hideNavigationBarLoading(); //关闭加载动画
					}
				})
			},
			getMoreNewsTwo(data) {
				var _this = this
				this.page++
				if (_this.loadingType != 0) {
					return false; //loadingType!=0;直接返回
				}
				_this.loadingType = 1;
				uni.showNavigationBarLoading();
				this.$https({
					url: '/api/oauth/shop/mall-goods-serchList',
					dengl: true,
					method: 'post',
					haeder: true,
					data: data,
					success(res) {
						if (res.data.data.length < 10 || res.data.data ==
							'null') { //当之前的数据长度等于count时跳出函数，不继续执行下面语句
							_this.loadingType = 2;
							uni.showToast({
								title: '已加载全部数据',
								icon: 'none',
								duration: 2000
							})
							uni.hideNavigationBarLoading(); //关闭加载动画
							return false;
						}
						_this.allList = _this.allList.concat(res.data.data)
						_this.loadingType = 0; //将loadingType归0重置
						uni.hideNavigationBarLoading(); //关闭加载动画
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
					dengl: true,
					success(res) {
						// console.log('添加成功')
						// console.log(res.data)
					}
				})
			},
			chexing() {
				//跳转车型号列表
				uni.navigateTo({
					url: 'car'
				})
			},
			show() {
				var _this = this
				this.paixu = false
				this.isShow = true
				this.$https({
					url: '/api/oauth/shop/mall-goods-serch',
					data: {},
					dengl: true,
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
				this.page = 1
				this.isFilter = true
				this.$https({
					url: '/api/oauth/shop/mall-goods-serchList',
					dengl: true,
					method: 'POST',
					data: JSON.stringify({
						goodsBrandId: this.id,
						maxPrice: this.max,
						minPrice: this.min,
						goodsType: this.goodsType,
						carId: this.carId,
						sortType: this.pankInd == 1 ? '' : this.st,
						page: this.page,
						keyWords: this.value,
						shop_id: _this.shopsId,
						catId: this.catId,
						limit: 10

					}),
					haeder: true,
					success: function(res) {
						// console.log(res.data.data)
						_this.isShow = false
						_this.allList = res.data.data
					}
				})
			},
			reset() {
				this.itemex = 'x'
				this.min = ''
				this.max = ''
				this.page = 1
				this.id = ''
				var _this = this
				this.$https({
					url: '/api/oauth/shop/mall-goods-serchList',
					dengl: true,
					method: 'post',
					haeder: true,
					data: JSON.stringify({
						goodsBrandId: this.id,
						maxPrice: this.max,
						minPrice: this.min,
						keyWords: this.value,
						goodsType: this.goodsType,
						carId: this.carId,
						sortType: this.pankInd == 1 ? '' : this.st,
						catId: this.catId,
						page: this.page,
						shop_id: _this.shopsId,
						limit: 10
					}),
					success: function(res) {
						uni.pageScrollTo({
							scrollTop: 0,
							duration: 100,
						});
						_this.allList = res.data.data
					}
				})
			},
			rValue(event) {
				this.min = event.target.value
			},
			rValue1(event) {
				this.max = event.target.value
			},
			togCass() {
				this.tog_Ca = !this.tog_Ca
			},
			gouwuche: function() {
				this.isFocus = true
			},
			zonghe: function() {
				this.paixu = !this.paixu
			},
			guanbi: function() {
				this.paixu = false
			},
			x: function(st, ind) {
				this.st = st
				this.page = 1
				this.pankInd = ind
				this.isFilter = true
				var _this = this
				if (ind == 2) {
					_this.salePank = st == 'SASC' ? 'SDESC' : 'SASC'
				} else if (ind == 3) {
					_this.priceRank = st == 'PASC' ? 'PDESC' : 'PASC'
				}
				// console.log(st,ind,this.st)
				this.$https({
					url: '/api/oauth/shop/mall-goods-serchList',
					dengl: true,
					method: 'post',
					data: JSON.stringify({
						goodsBrandId: this.id,
						shop_id: _this.shopsId,
						maxPrice: this.max,
						minPrice: this.min,
						goodsType: this.goodsType,
						carId: this.carId,
						sortType: ind == 1 ? '' : st,
						catId: this.catId,
						keyWords: this.value,
						page: this.page,
						limit: 10
					}),
					haeder: true,
					success: function(res) {
						_this.allList = res.data.data
						_this.paixu = false
					}
				})
			},
			search() {
				var _this = this
				console.log(this.value)
				this.page = 1
				this.$https({
					url: '/api/oauth/shop/mall-goods-ptList',
					dengl: true,
					data: {
						keywords: this.value,
						shop_id: this.shopsId,
						page: this.page,
						limit: 10
					},
					success: function(res) {
						uni.pageScrollTo({
							scrollTop: 0,
							duration: 100,
						});
						_this.allList = res.data.data
						console.log(res.data.data)
					}
				})
			},
			tiaozhuan: function() {
				uni.reLaunch({
					url: '../index/index'
				})
			}


		}

	}
</script>

<style lang="scss">
	.zhMask {
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.3);
		overflow: hidden;
		position: fixed;
		left: 0;
		right: 0;
		top: 250rpx;
		bottom: 0;
		z-index: 999;

		.mask-content {
			position: absolute;
			left: 0;
			top: 0;
			box-sizing: border-box;
			padding: 0 20rpx;
			text-align: center;
			width: 100%;
			background: #fff;
			// border: 1px solid #ddd;
			font-size: 14px;
			z-index: 99999;

			.mask-cont-item {
				height: 88rpx;
				line-height: 88rpx;
				border-bottom: 1rpx solid #eeeeee;
				text-align: left;
				padding-left: 10rpx;
				overflow: hidden;

				.cont-item-icon {
					display: inline-block;
					margin-right: 5px;
					float: right;

					image {
						width: 28rpx;
						height: 20rpx;
					}
				}

			}

			.mask-cont-item:last-child {
				border: 0;

				image {
					height: 28rpx;
					width: 29rpx;
				}
			}
		}
	}

	.clearCss {
		.shop-sales {
			color: #999999;
			font-size: 22upx;
			float: right;

		}

		.item-price {
			button: rpx;
		}
	}

	.top {
		overflow: hidden;
		position: fixed;
		left: 0;
		top: 0rpx;
		background: #fff;
		width: 100%;
		z-index: 99999;
		padding-top: 80rpx;
		padding-bottom: 20rpx;

		.textBox {
			float: left;
			margin-left: 50upx;
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
			padding-top: 12upx;
			float: right;

			image {
				width: 36upx;
				height: 36upx;
			}
		}
	}

	.nav {
		width: 710upx;
		padding: 20upx;
		border-bottom: 1px solid #eeeeee;
		text-align: center;
		position: fixed;
		height: 50rpx;
		background-color: #fff;
		z-index: 99;
		overflow: hidden;
		padding-top: 180rpx;

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

			.activeBf {
				width: 0;
				height: 0;
				border: 12.5rpx solid #cccccc;
				border-bottom: 0;
				border-color: #cccccc transparent transparent transparent;
				display: inline-block;
				vertical-align: middle;

			}

			.activeAf {
				width: 0;
				height: 0;
				border: 13rpx solid #cccccc;
				border-top: 0;
				border-color: transparent transparent #cccccc transparent;
				display: inline-block;
				vertical-align: middle;
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
			overflow: hidden;
			float: left;

			image {
				width: 200rpx;
				height: 200rpx;
				float: left;
			}
		}

		.txt_a {
			padding-top: 10upx;
			width: calc(100% - 220rpx);
			margin-left: 20upx;
			float: left;
			box-sizing: border-box;

			.title_top {
				// margin-bottom: 10rpx;
			}

			.titleText {
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}

			text {
				font-size: 26upx;
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
					font-size: 26upx;

					text {
						color: #ff3333;
						font-size: 26upx;
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
		background: rgba(0, 0, 0, 0.5);
		z-index: 999;
	}

	.screen {
		width: 89%;
		height: 100%;
		position: fixed;
		float: right;
		right: 0;
		padding-top: 60rpx;
		top: 0;
		bottom: 0;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		box-sizing: border-box;
		background-color: #FFFFFF;
		z-index: 99999999;


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
					font-size: 19rpx;
					width: calc((100% - 28rpx)/3);
					margin-bottom: 29rpx;
					border: 1rpx solid #1c2939;
					color: #333333;
					height: 48rpx;
					line-height: 48rpx;
					margin-right: 14rpx;
					padding: 0 10rpx;
					display: inline-block;
					text-align: center;

					text {
						display: inline-block;
						width: calc(100% - 30rpx);
						white-space: nowrap;
						overflow: hidden;
						text-overflow: clip;
						box-sizing: border-box;
						text-align: center;
					}
				}

				button:nth-child(3n+3) {
					margin-right: 0;
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
			width: 100%;
			// margin: 20upx;
			overflow: hidden;

			.textBox {
				float: left;
				margin-left: 50upx;
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
				padding-top: 12upx;
				float: right;

				image {
					width: 36upx;
					height: 36upx;
				}
			}
		}

		.list {
			overflow: hidden;
			padding-left: 30rpx;
			padding-right: 30rpx;
			padding-bottom: 80rpx;
		}

		.content-item {
			box-sizing: border-box;
			height: 515rpx;
			margin-top: 20upx;
			display: black;
			// width: 330upx;
			width: calc(50% - 15rpx);
			// margin-left: 20upx;
			box-shadow: 0 0 5px #ccc;
			border-radius: 20upx;
			overflow: hidden;
			border: none;
			padding: 0;


			.imgBox {
				height: 320rpx;
				width: 100%;

				image {
					width: 100%;
					height: inherit;
					float: left;
				}
			}

		// 	.content-item-text {
		// 		padding: 10rpx 20rpx;
		// 		width: 100%;
		// 		float: left;
		// 		height: calc(100% - 320rpx);
		// 		box-sizing: border-box;
		// 		position: relative;

		// 		.item-coupon {
		// 			margin-top: 10rpx;
		// 			// height: 30rpx;
		// 			line-height: 30rpx;

		// 			.coupon-item {
		// 				margin-right: 15rpx;
		// 				display: inline-block;

		// 				text {
		// 					border: 1px dotted #ff6600;
		// 					background-color: #fff;
		// 					font-size: 18upx;
		// 					line-height: 30upx;
		// 					padding: 0 8rpx;
		// 					color: #ff6600;
		// 					display: block;
		// 				}
		// 			}

		// 			.coupon-item:last-child {
		// 				margin-right: 0;
		// 			}
		// 		}


		// 		.titleText {
		// 			font-size: 26rpx;
		// 		}

		// 		.span_a {
		// 			background-color: #ff6600;
		// 			color: #fff;
		// 			border-radius: 5upx;
		// 			padding: 5rpx 10rpx;
		// 			font-size: 18upx;
		// 			margin-right: 10upx;
		// 			box-sizing: border-box;
		// 			line-height: 25rpx;
		// 			box-sizing: border-box;
		// 			display: inline-block;
		// 			vertical-align: middle;
		// 		}

		// 		.title_top {
		// 			overflow: hidden;
		// 			text-overflow: ellipsis;
		// 			display: -webkit-box;
		// 			-webkit-line-clamp: 2;
		// 			-webkit-box-orient: vertical;
		// 			// display: inline-block;
		// 			vertical-align: middle;
		// 		}



		// 		.item-price {
		// 			// padding-top: 10upx;
		// 			position: absolute;
		// 			width: calc(100% - 40rpx);
		// 			// line-height: 40rpx;
		// 			bottom: 15rpx;
		// 			left: 20rpx;
		// 			right: 20rpx;
		// 			line-height: 50rpx;

		// 			.price-text {
		// 				color: #ff6600;
		// 				font-size: 26upx;
		// 				font-weight: bold;
		// 			}

		// 			.shop-sales {
		// 				color: #999999;
		// 				font-size: 22upx;
		// 				float: right;

		// 			}
		// 		}

		// 	}
		
		
		
		
		
		.content-item-text {
			padding: 10rpx 20rpx;
			width: 100%;
			float: left;
			height: calc(100% - 320rpx);
			box-sizing: border-box;
			position: relative;
		
			.item-coupon {
				margin-top: 10rpx;
				// height: 30rpx;
				line-height: 30rpx;
		
				.coupon-item {
					margin-right: 10rpx;
					display: inline-block;
		
					text {
						border: 1px dotted #ff6600;
						background-color: #fff;
						font-size: 18upx;
						line-height: 30upx;
						padding: 0 8rpx;
						color: #ff6600;
						display: block;
					}
				}
		
				.coupon-item:last-child {
					margin-right: 0;
				}
			}
		
		
			.titleText {
				// overflow: hidden;
				// text-overflow: ellipsis;
				// display: -webkit-box;
				// -webkit-line-clamp: 2;
				// -webkit-box-orient: vertical;
				font-size: 26rpx;
				// display: inline-block;
				// vertical-align: middle;
			}
		
			.title_top {
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				font-size: 26rpx;
			}
		
			.span_a {
				background-color: #ff6600;
				color: #fff;
				border-radius: 5upx;
				padding: 5rpx 10rpx;
				font-size: 18upx;
				margin-right: 10upx;
				box-sizing: border-box;
				line-height: 25rpx;
				box-sizing: border-box;
				display: inline-block;
				vertical-align: middle;
			}
		
		
		
			.item-price {
				// padding-top: 10upx;
				position: absolute;
				width: calc(100% - 40rpx);
				// line-height: 40rpx;
				bottom: 10rpx;
				left: 20rpx;
				right: 20rpx;
				line-height: 50rpx;
		
				.price-text {
					color: #ff6600;
					font-size: 26upx;
					font-weight: bold;
				}
		
				.shop-sales {
					color: #999999;
					font-size: 22upx;
					float: right;
		
				}
			}
		
		}
		
		}

		
		.content-item:nth-child(even) {
			float: right;
		}

		.content-item:nth-child(odd) {
			float: left;
		}

		.Boxaaa {
			overflow: hidden;
			margin-bottom: 20upx;
		}
	}
</style>
