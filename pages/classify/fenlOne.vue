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
						<view v-for="(item,index) in shaiList" :class="itemex==index?'active activeBef':'activeBef'"
							@tap="toggleList(index,item.id)"><text>{{item.brandTitle}}</text></view>
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
				<view class='back' @tap='back'>
					<image src='../../static/icon_26-2.png'></image>
				</view>
				<view class="textBox">
					<input class="uni-input" v-model="value" placeholder="请输入关键字" />
				</view>
				<view class="imgBox" @tap='search'>
					<image src="../../static/icon_10.png" mode=""></image>
				</view>
			</view>
			<!-- #endif -->
			<!-- 这里有一个筛选 -->
			<view class="nav dne">
				<view style='display:flex;'>
					<view class="con" @tap="chexing">
						<text>车型</text>
						<p class="activeBf"></p>
						<!-- <image src="../../static/icon_37.png" class="bot" mode=""></image> -->
					</view>
					<view class="con" @tap='zonghe'>
						<text :style="paixu?'color:#3462ff':''">综合排序</text>
						<p :class="paixu?'activeAf':'activeBf'"></p>
					</view>
					<view class="con">
						<view class="c_R" @tap="show">
							<text>筛选</text>
							<p class="activeBf"></p>
						</view>

					</view>
					<view class="con">
						<text @tap='shopClassify'>店铺</text>
						<image class="images" :src="tog_Ca?'../../static/n8.png':'../../static/n6.png'"
							@tap="togCass(tog_Ca)" mode=""></image>
					</view>
				</view>


			</view>

			<view class="zhMask" v-if='paixu' @tap="zonghe">
				<view class="mask-content">
					<view class="mask-cont-item" @tap.stop='p("COMPE",1)'>综合<view class="cont-item-icon"
							v-if='st=="COMPE"'>
							<image src="../../static/price_xuanze_icon.png" mode=""></image>
						</view>
					</view>
					<view class="mask-cont-item" @tap.stop='p(salePank,2)'>销量<view class="cont-item-icon"
							v-if='st=="SDESC"||st=="SASC"'>
							<image
								:src="st=='SDESC'?'../../static/priceD_icon.png':st=='SASC'?'../../static/priceG_icon.png':''"
								mode=""></image>
						</view>
					</view>
					<view class="mask-cont-item" @tap.stop='p(priceRank,3)'>价格高/低<view class="cont-item-icon"
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
			
			<view class="jishiqi" v-if="liulanState==2">
				{{times}}
			</view>
			<view class="hahah list uni-flex uni-column" style="padding-top: 250rpx;">
				<view class="content-item " v-for="(item , index) in allList" @tap="detail(item.goodsId)">
					<view class="imgBox">
						<!-- <image :src="item.goodsLogo" mode="widthFix"></image> -->
						<image :src="item.goodsLogo" mode=""></image>
					</view>
					<view class="content-item-text">
						<view class="title_top">
							<text class="span_a" v-if="item.selfStatus=='Y'">自营</text>
							<text class="titleText">{{item.goodsName}}</text>
						</view>
						<view class="item-coupon">
							<view class="coupon-item" v-for="(items,indexs) in item.couponDTOS" v-if="indexs==0">
								<text>满{{items.condition}}-{{items.money}}元</text>
							</view>
							<view class="coupon-item">
								<text>包邮</text>
							</view>
						</view>
						<view class="diZhi" v-if="tog_Ca">
							<text>{{item.sendAddr}}</text>
						</view>
						<view class="item-price">
							<text class="price-text">￥{{item.marketPrice?item.marketPrice.toFixed(2):'暂无价格'}}</text>
							<text class="shop-sales" v-if="!tog_Ca">销量：{{item.salesSum}}</text>
							<view class="but_Icon" v-if="tog_Ca">
								<view class="icons">
									<text class="icon1" @click.stop='dianpu(item.shopId)'>旺铺</text>
									<view class="icon2">
										<image src="../../static/qiyerenzheng.png" mode="">
									</view>
									<text class="icon2">购</text>
									<text class="icon2">品</text>
								</view>

							</view>

						</view>
					</view>
				</view>
				<view v-if='allList.length==0'>
					<image src='../../static/d.png' style='width:283rpx;height:184rpx;display:block;margin:50rpx auto;'>
					</image>
					<view style='text-align:center;'>暂无产品</view>
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
				itemex: 'x',
				id: '',
				min: '',
				max: '',
				goodsType: '',
				paixu: false,
				st: '',
				value: '',
				bar: '',
				liulanState: '',
				page: 1,
				loadingType: 0,
				carId: '',
				catId: '',
				isFilter: false,
				priceRank: 'PASC',
				salePank: 'SDESC',
				pankInd: '',
				liulanTime: null,
				dingshiqi: null,
				times: 30

			}
		},
		onLoad(option) {
			console.log(option)
			var _this = this
			if (option.state) {
				// 判断是否增加积分
				this.liulanState = option.state
				if (option.state == 2) {
					//增加积分
					var num = this.times
					var numHs = this.times * 1000
					this.liulanTime = setTimeout(function() {
						_this.$https({
							url: '/api/task/center-task-insert',
							data: {
								taskId: 2,
								taskType: 1
							},
							method: 'post',
							success: res => {}
						})
					}, numHs)

					this.dingshiqi = setInterval(function() {
						if (num > 0) {
							num--
							_this.times = num
						} else {
							_this.times = 0
							clearInterval(_this.dingshiqi)
						}
					}, 1000)
				}
			}
			if (option.keywords) {
				this.value = option.keywords
				var data = {
					keywords: this.value,
					page: this.page,
					limit: 10
				}
				this.getNews(data)
			} else if (option.barId) {
				this.bar = option.barId
				this.id = option.id
				var data = {
					page: this.page,
					limit: 10,
					goodsBrandId: option.barId
				}
				this.getNews(data)
			} else if (option.id) {
				this.catId = option.id
				var data = {
					page: this.page,
					limit: 10,
					cat_id: option.id ? option.id : ''
				}
				this.getNews(data)
			} else {
				var data = {
					page: this.page,
					limit: 10,
				}
				this.getNews(data)
			}
		},
		onShow: function() {
			var _this = this
			if (this.carId) {
				_this.shaiX()
			}
		},
		// onUnload() {


		// },
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
					sortType: this.pankInd == 1 ? '' : this.st,
					page: this.page + 1,
					catId: this.catId,
					limit: 10
				})
				this.getMoreNewsTwo(data)
			} else {
				if (this.value) {
					var data = {
						keywords: _this.value,
						page: _this.page + 1,
						limit: 10
					}
					this.getMoreNews(data)
				} else if (this.bar) {
					var data = {
						page: _this.page + 1,
						limit: 10,
						goodsBrandId: _this.bar
					}
					this.getMoreNews(data)
				} else if (this.catId) {
					var data = {
						page: _this.page + 1,
						limit: 10,
						cat_id: _this.catId
					}
					this.getMoreNews(data)
				} else {
					var data = {
						page: _this.page + 1,
						limit: 10,
					}
					this.getMoreNews(data)
				}
			}
		},
		components: {
			tabBar,
		},
		methods: {
			// 初始化
			getNews(data) {
				this.page = 1
				var _this = this
				//标题读取样式激活
				uni.showNavigationBarLoading()
				this.$https({
					url: '/api/oauth/shop/mall-goods-ptList',
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
			// 筛选
			shaiX() {
				this.page = 1
				var _this = this
				this.isFilter = true
				//标题读取样式激活
				uni.showNavigationBarLoading()
				this.$https({
					url: '/api/oauth/shop/mall-goods-serchList',
					data: JSON.stringify({
						goodsBrandId: this.id,
						maxPrice: this.max,
						minPrice: this.min,
						keyWords: this.value,
						goodsType: this.goodsType,
						carId: this.carId,
						sortType: this.pankInd == 1 ? '' : this.st,
						page: this.page,
						catId: this.catId,
						limit: 10
					}),
					haeder: true,
					dengl: true,
					method: 'post',
					success: function(res) {
						_this.isShow = false
						_this.allList = res.data.data
						//隐藏标题读取 
						uni.hideNavigationBarLoading()
						uni.stopPullDownRefresh()
					}
				})

			},
			// 初始化数据
			getMoreNewsTwo(data) {
				var _this = this
				this.page++
				if (_this.loadingType != 0) {
					// uni.showToast({
					// 	title: '已加载全部数据',
					// 	icon: 'none',
					// 	duration: 2000
					// })
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
			togCass() {
				this.tog_Ca = !this.tog_Ca
			},
			detail(id) {
				var llState = this.liulanState == 2 ? this.liulanState : ''
				uni.navigateTo({
					url: '../index/productDetails?id=' + id + '&liulanState=' + llState
				})
			},
			shopClassify() {
				uni.navigateTo({
					url: '../shop/shopClassify'
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
			shaiXs() {
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
						page: this.page,
						limit: 10
					}),
					success: function(res) {
						_this.isShow = false
						_this.allList = res.data.data
					}
				})
			},
			reset() {
				console.log(this.itemex)
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
			p: function(st, ind) {
				this.page = 1
				this.st = st
				this.pankInd = ind
				this.isFilter = true
				var _this = this
				if (ind == 2) {
					_this.salePank = st == 'SASC' ? 'SDESC' : 'SASC'
				} else if (ind == 3) {
					_this.priceRank = st == 'PASC' ? 'PDESC' : 'PASC'
				}
				//标题读取样式激活
				uni.showNavigationBarLoading()
				this.$https({
					url: '/api/oauth/shop/mall-goods-serchList',
					data: JSON.stringify({
						goodsBrandId: this.id,
						keyWords: this.value,
						maxPrice: this.max,
						minPrice: this.min,
						goodsType: this.goodsType,
						carId: this.carId,
						catId: this.catId,
						sortType: this.pankInd == 1 ? '' : this.st,
						page: this.page,
						limit: 10
					}),
					haeder: true,
					dengl: true,
					method: 'post',
					success: function(res) {
						_this.paixu = false
						_this.allList = res.data.data
						//隐藏标题读取 
						uni.hideNavigationBarLoading()
						uni.stopPullDownRefresh()
					}
				})
			},


			search() {
				var _this = this
				this.page = 1
				this.$https({
					url: '/api/oauth/shop/mall-goods-ptList',
					// dengl: false,
					data: {
						keywords: this.value,
						page: this.page,
						limit: 10
					},
					dengl: true,
					success: function(res) {
						uni.pageScrollTo({
							scrollTop: 0,
							duration: 100,
						});
						_this.allList = res.data.data
					}
				})
			},
			tiaozh: function() {
				uni.navigateTo({
					url: '../cart/cart'
				})
			},
			back: function() {
				if (this.liulanState == 2) {
					clearTimeout(this.liulanTime)
					clearInterval(this.dingshiqi)
					console.log('执行关闭页面的操作')
				}
				uni.navigateBack({
					delta: 1
				})
			},
			dianpu: function(id) {
				uni.navigateTo({
					url: '../shop/shop?id=' + id
				})
			}
		}
	}
</script>

<style lang="scss">
	.jishiqi {
		position: fixed;
		top: 20%;
		right: 20rpx;
		width: 70rpx;
		height: 70rpx;
		border-radius: 50%;
		z-index: 999;
		text-align: center;
		line-height: 70rpx;
		font-size: 26rpx;
		background: #fff;
		border: 2rpx solid #ccc;
	}

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
		box-sizing: border-box;

		.textBox {
			float: left;
			margin-left: 25upx;
			background-color: #f0f0f0;
			border-radius: 50upx;
			width: calc(100% - 215rpx);
			box-sizing: border-box;

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

		.back {
			float: left;
			padding: 15rpx 36rpx;
			width: 90rpx;
			box-sizing: border-box;

			image {
				width: 18rpx;
				height: 32rpx;
			}
		}

		.imgBox {
			padding-left: 27upx;
			padding-right: 27upx;
			padding-top: 10upx;
			width: 90rpx;
			box-sizing: border-box;
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

		.con {
			// width: 33.3%;
			flex-grow: 1;
			// margin-top: 30rpx;
			// line-height: 95rpx;
			border-right: 1rpx solid #eeeeee;

			text {
				line-height: 36rpx;
				font-size: 30rpx;
				padding-right: 18rpx;
				color: #333333;

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

		.con:nth-child(4) {
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-wrap: nowrap;
			padding-left: 30rpx;
			border-right: none;
		}

		.color text {
			font-size: 30upx;
			color: #333;
		}
	}


	.mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.1);
		z-index: 99999999;
	}

	.screen {

		width: 80%;
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
		// box-sizing: border-box;
		background-color: #FFFFFF;
		z-index: 99999999;
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
				.activeBef {
					font-size: 22rpx;
					width: calc((100% - 28rpx)/3);
					margin-bottom: 29rpx;
					border: 1rpx solid #1c2939;
					color: #333333;
					height: 48rpx;
					line-height: 48rpx;
					margin-right: 14rpx;
					display: inline-block;
					border-radius: 45rpx;
					text-align: center;
					box-sizing: border-box;

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

				.activeBef:nth-child(3n+3) {
					margin-right: 0;
				}

				button {
					font-size: 22rpx;
					margin-bottom: 29rpx;
					border: 1rpx solid #1c2939;
					color: #333333;
					height: 48rpx;
					width: calc((100% - 28rpx)/3);
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
			bottom: 0;
			position: fixed;
			width: 80%;
			left: 20%;

			:first-child {
				background-color: #dcdcdc;
				color: #333333;
				width: 45%;
				height: 77rpx;
				line-height: 77rpx;
			}

			:last-child {
				width: 45%;
				background-color: #2b5cff;
				color: #FFFFFF;
				height: 77rpx;
				line-height: 77rpx;
			}
		}
	}

	.togActive {
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
			box-sizing: border-box;

			.textBox {
				float: left;
				margin-left: 25upx;
				background-color: #f0f0f0;
				border-radius: 50upx;
				width: calc(100% - 215rpx);
				box-sizing: border-box;

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

			.back {
				float: left;
				padding: 15rpx 36rpx;
				width: 90rpx;
				box-sizing: border-box;

				image {
					width: 18rpx;
					height: 32rpx;
				}
			}

			.imgBox {
				padding-left: 27upx;
				padding-right: 27upx;
				padding-top: 10upx;
				width: 90rpx;
				box-sizing: border-box;
				float: right;

				image {
					width: 36upx;
					height: 36upx;
				}
			}
		}

		// .top {
		// 	width: 710upx;
		// 	// margin: 20upx;
		// 	overflow: hidden;

		// 	.textBox {
		// 		float: left;
		// 		margin-left: 25upx;
		// 		background-color: #f0f0f0;
		// 		border-radius: 50upx;

		// 		input {
		// 			height: 60upx;
		// 			width: 520upx;
		// 			line-height: 60upx;
		// 			padding-left: 20upx;
		// 			font-size: 26upx;
		// 		}

		// 		.uni-input-placeholder {
		// 			color: #999 !important;
		// 		}

		// 	}

		// 	.imgBox {
		// 		padding-left: 30upx;
		// 		padding-right: 20upx;
		// 		padding-top: 10upx;
		// 		float: right;

		// 		image {
		// 			width: 44upx;
		// 			height: 39upx;
		// 		}
		// 	}
		// }

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
			// 			overflow: hidden;
			// 			text-overflow: ellipsis;
			// 			display: -webkit-box;
			// 			-webkit-line-clamp: 2;
			// 			-webkit-box-orient: vertical;
			// 			font-size: 26rpx;
			// 			display: inline-block;
			// 			vertical-align: middle;
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



			// 		.item-price {
			// 			// padding-top: 10upx;
			// 			position: absolute;
			// 			width: calc(100% - 40rpx);
			// 			// line-height: 40rpx;
			// 			bottom: 10rpx;
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
					font-size: 26rpx;
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
