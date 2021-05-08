<template>
	<!-- <scroll-view scroll-y="true" :style="'height:'+height+'rpx;position:fixed;overflow-y:auto;z-index:999;'"
	 :scroll-into-view="toJump"> -->
	<view class="boxbox" :style="isAdd?'height:100vh;overflow:hidden':''">

		<view class="bg_img">
			<swiper style='height:750rpx;' indicator-dots indicator-active-color='#007AFF'>
				<swiper-item v-for='item in list.goodsImgss'>
					<image :src='item?item:""'></image>
				</swiper-item>
			</swiper>
		</view>

		<!-- 头部 -->
		<!-- #ifndef H5 -->
		<view class="top" style="background-color: #FFFFFF;z-index:999999999;">
			<view class="back" @tap="back">
				<image src="../../static/icon_26-2.png" mode=""></image>
			</view>
			<!-- <view class="top_title">
					 <view class="title" @tap="jump(1)">
						<text>商品</text>
						<image v-if="ind==1" src="../../static/icon_09.png" mode=""></image>
					</view>
					<view class="title" @tap="jump(2)">
						<text>评价</text>
						<image v-if="ind==2" src="../../static/icon_09.png" mode=""></image>
					</view>
					<view class="title" @tap="jump(3)">
						<text>详情</text>
						<image v-if="ind==3" src="../../static/icon_09.png" mode=""></image>
					</view>
						
				</view> -->
			<view class="title-top">
				<text>产品详情</text>
			</view>
			<view class="imgs">
				<view class="imgBoxs" @tap="tiaoCart">
					<image src="../../static/icon_43.png" mode=""></image>
				</view>
				<view class="imgBox">
					<image src="../../static/27249851bcd24e32864752afb9f29fb8.png" mode="" @tap='shangpinxin'></image>
				</view>
			</view>
		</view>
		<!-- #endif -->

		<view class="top" v-if="!isShow">
			<view class="back" @tap="back">
				<image src="../../static/icon_26-2.png" mode=""></image>
			</view>
			<view class="imgs">
				<view class="imgBoxs" style="background: rgba(0, 0, 0, 0.5) !important;" @tap="tiaoCart">
					<image src='../../static/icon_48.png'></image>
				</view>
				<view class="imgBox" style="background: rgba(0, 0, 0, 0.5) !important;">
					<image src="../../static/icon_47.png" mode="" @tap='shangpinxin'></image>
				</view>
			</view>
		</view>

		<!-- 标题 -->
		<view class="titleBox">
			<view class="Box">
				<view class="ThePrice">
					<view class="h2Box">
						<text>￥<text>{{list.shopPrice?list.shopPrice:'暂无价格'}}</text></text>
					</view>
					<view class="spanBox">
						<text>原价：￥{{list.marketPrice?list.marketPrice:""}}</text>
					</view>
				</view>
				<view class="preferential" v-for="(i,n) in list.couponDTOS" @tap="huodongxian">
					<text>满{{i.condition?i.condition:''}}-{{i.money?i.money:''}}元</text>
				</view>

			</view>

			<view class="share" @tap='shangpinxin' v-if="pdType">
				<image src="../../static/icon_49.png" mode=""></image>
				<text @tap='shangpinxin'>分享赚</text>
			</view>
			<view class="h2aBox">
				<text class="span_a" v-if="list.selfStatus=='Y'">自营</text>
				<text class="titleText">{{list.goodsName?list.goodsName:''}}</text>
			</view>
			<!-- 		<view class="h2aBox">
				<text class="span_a">自营</text>
				<text>{{list.goodsName?list.goodsName:''}}</text>
			</view> -->
		</view>

		<!-- 发货/活动细则 -->
		<view class="introduce">
			<view class="in_left">
				<view class="mingca">
					<text>发货</text>
				</view>
				<view class="diz">
					<text>{{list.sendAddr?list.sendAddr:''}} |</text>
				</view>
				<view class="kuaid">
					<text>快递：{{list.kuaidi?list.kuaidi:0}}</text>
				</view>
			</view>
			<view class="yuex">
				<text>月销量：{{list.salesSum?list.salesSum:0}}</text>
			</view>
		</view>
		<view class="xize">
			<view class="huid">
				<text>优惠</text>
			</view>
			<view class="xiangqBox" @tap='huodongxian' v-if='youhuiqu.length>0'>
				<view class="oneBox" v-for="(i,n) in youhuiqu">
					<view class="preferential">
						<text>满{{i.condition?i.condition:''}}-{{i.money?i.money:''}}元</text>
					</view>
					<view class="jies">
						<text>满{{i.condition?i.condition:''}}元，立减{{i.money?i.money:''}}元；不累积。</text>
					</view>
				</view>
			</view>
			<view class='xiangqBox' v-if='!youhuiqu.length>0'>暂无优惠</view>
			<view class="imBox" @tap='huodongxian'>
				<image src="../../static/icon_26.png" mode=""></image>
			</view>
		</view>

		<!-- 参数 -->
		<view class="parameter">
			<view class="basic" @tap="add">
				<view class="left_a">
					<text>选择</text>
				</view>
				<view class="left_b">
					<text>已选：{{gui?gui:'暂未选择商品'}}</text>
				</view>
				<!-- <view class="right_a">
							<view class="img_a">
								<image src="../../static/icon_26.png" mode=""></image>
							</view>
						</view> -->
			</view>
			<view class="basic" @tap="add">
				<view class="left_a">
					<text>参数</text>
				</view>
				<view class="left_b">
					<text>品牌 型号 成分...</text>
				</view>
				<view class="right_a">
					<view class="img_a">
						<image src="../../static/icon_26.png" mode=""></image>
					</view>
				</view>
			</view>
			<!-- <view class="basic" @tap="add">
						<view class="left_a">
							<text>适配</text>
						</view>
						<view class="left_b">
							<text>车型...</text>
						</view>
						<view class="right_a">
							<view class="img_a">
								<image src="../../static/icon_26.png" mode=""></image>
							</view>
						</view>
		
					</view> -->
			<view class="mask" v-if="isAdd" @tap="add">
			</view>
			<view class="butt" v-if="isAdd">
				<view style='position:absolute;top:30rpx;right:50rpx;' @tap='add'>
					<image src='../../static/close_901px_1199932_easyicon.net.png' style='width:50rpx;height:50rpx;'>
					</image>
				</view>
				<view class="mTop">
					<image class="cover" :src="list.goodsLogo?list.goodsLogo:''" mode=""></image>
					<view class="mRight">
						<view class="price">¥ {{Price?Price:''}}</view>
						<view class="mItem">已选：{{gui?gui:'暂未选择商品'}}</view>
					</view>

				</view>
				<view class="mButton">
					<view style='margin-top:20rpx;border-bottom:1px solid #eee;padding-bottom:20rpx;'
						v-for='(item,index) in canshu'>
						<view style='color:#999;font-size:24rpx;'>{{item.n?item.n:''}}</view>
						<view style='margin-top:20rpx;'>
							<view v-for='(items,indexs) in item.sa'
								:style='shuzu[index][indexs]?"display:inline-block;padding:10rpx;border:1px solid #3160fe;background:#fff;color:#3160fe;margin-right:10rpx;font-size:26rpx;":"display:inline-block;padding:10rpx;border:1px solid #f5f5f5;background:#f5f5f5;margin-right:10rpx;font-size:26rpx;color:#000;"'
								@tap='xuanzhong(index,indexs)'>{{items.item?items.item:''}}</view>
						</view>
					</view>
					<!-- <view class="detail">
								<view v-for='(item,index) in guige' :style='indexx==index?"margin-top:10rpx;color:#2b5cff;":"margin-top:10rpx;color:#666;"'
								 @tap='qiehuan(index)'>{{item.keyName}}</view>
							</view> -->

					<view class="mNumber">
						<view class="name">数量</view>
						<view class="n_right">
							<view class="reduce" @tap="reduce">-</view>
							<input class="cor" type="number" style='width:100rpx;text-align:center;'
								v-model="num"></input>
							<view class="add" @tap="jia">+</view>
						</view>
					</view>

				</view>
				<view style='overflow:hidden;position:absolute;bottom:50rpx;left:5;width:90%;z-index:99999;'>
					<button style='width:40%;float:left;' @tap='gouwuche'>加入购物车</button>
					<button class="btn" @tap='goumaia'>立即购买</button>
				</view>
			</view>
		</view>
		<view class="pingjBox">
			<view class="basic">
				<view class="left_a">
					<text>用户评价</text>
				</view>

				<view class="right_a">
					<view class="img_a">
						<image src="../../static/icon_26.png" mode=""></image>
					</view>
				</view>
				<view class="left_b" @tap="togPing(list.goodsId)">
					<text>{{starNum}}%满意</text>
				</view>

			</view>


			<!-- 用户评价 ,划动效果-->
			<view class="toux" v-if="pingjia">
				<view class="imgBox_a">
					<image
						:src="pingjia.img?pingjia.img=='../../../static/img_10.jpg.png'?'../../static/img_05.jpg':pingjia.img:'../../static/img_05.jpg'"
						mode=""></image>
				</view>
				<view class="mingc">
					<text>{{pingjia.commId}}</text>
					<view class="time">
						<text>{{pingjia.createTime}}</text>
					</view>
					<view class="huay">
						<text>{{pingjia.content?pingjia.content:''}}</text>
					</view>
				</view>
			</view>
			<view class="toux" v-if="!pingjia" style="font-size: 28rpx;padding-left: 20rpx;box-sizing: border-box;">暂无评价
			</view>
		</view>

		<!-- 店铺：需产品确认 -->
		<view class="listBox">
			<view class="liBox">
				<view class="imgBox">
					<image
						:src="list.shopDTO.storeLogo?list.shopDTO.storeLogo:'../../static/230abf8eb0244a128649f337a7d4aae3.png'"
						mode=""></image>
				</view>
				<view class="texBox">
					<view class="h2Box">
						<text>{{list.shopDTO.shopName}}</text>
					</view>
					<view class="spanBox">
						<text>销量：{{list.shopDTO.sales}}</text>
					</view>
				</view>
				<view class="bottBox">
					<text @tap="jindian(list.shopId)">进店逛逛</text>
				</view>
			</view>
		</view>
		<view class="shangx">
			<view class="titaa">
				<text>商品详情</text>
			</view>
			<rich-text :nodes='list.goodsContent'></rich-text>
			<!-- <view class="imgg"> -->
			<!-- <jyf-parser :html="list.goodsContent" ref="article" style="margin-bottom:100rpx"></jyf-parser> -->
			<!-- <rich-text>{{list.goodsContent}}</rich-text> -->
			<!-- </view> -->
			<!-- <view :style="margin-bottom:100rpx">所涉及的大家</view> -->
		</view>
		<!--活动列表-->
		<view v-if='huodong'
			style='position:fixed;left:0;top:0;width:100%;height:100%;background:rgba(0,0,0,0.6);z-index:99999;'>
			<view
				style='width:100%;bottom:0;height:60%;position:fixed;left:0;background:#fff;border-radius:10rpx 10rpx 0 0;overflow-y:auto;box-sizing: border-box;'>
				<view style='text-align:center;margin-top:30rpx;'>优惠<view
						style='position:absolute;right:20rpx;top:30rpx;'>
						<image @tap='yincang' src='../../static/close_901px_1199932_easyicon.net.png'
							style='width:36rpx;height:36rpx;'></image>
					</view>
				</view>
				<view v-for='(item,index ) in list.couponDTOS' class="coupon-box">
					<view class="coupon-item">
						<view class="box-left-yh">￥{{item.money}}</view>
						<view class="boxLeft">
							<view class="boxLeft-top">
								满{{item.condition}},立减{{item.money}}元;不累积</view>
							<view class="boxLeft-bot">
								{{item.useStartTime.split(' ')[0]+'-'+item.useEndTime.split(' ')[0]}}
							</view>
						</view>
					</view>
					<view class="lingqu" @tap="lingquYHQ(item.id,index,item.type)">
						{{item.type?'已领取':'领取'}}
					</view>
				</view>

			</view>
		</view>
		<!-- 底部 -->
		<!-- <view style='height:150rpx;'></view> -->
		<view class="bottom">

			<view class="leftA">
				<view class="kefua" @tap="jindian(list.shopId)">
					<image src="../../static/icon_50.png" mode=""></image>
					<text class="keyboard">店铺</text>
					<!-- <view class="keyboard">
					</view> -->
				</view>
				<view class="kefua centets">
					<image @tap="isActive" v-if="!isCollect" src="../../static/icon_51.png" mode=""></image>
					<image @tap="isActive" v-if="isCollect" src="../../static/icon_52.png" mode=""></image>
					<text class="keyboard">{{isCollect?'已收藏':'收藏'}}</text>
					<!-- <view class="keyboard">
					</view> -->
				</view>
				<view class='kefua' @tap='tiaozhuan' v-if="pdType">
					<image src='../../static/icon_36.png'></image>
					<text class="keyboard">客服</text>
					<!-- <view class="keyboard"></view> -->
				</view>


			</view>
			<view class="rightA">
				<view class="bottBoxss">
					<view class="uni-padding-wrap uni-common-mt bott onna" style='width:45%;float:left;'>
						<button type="primary" @tap='add'>加入购物车</button>
					</view>
					<view class="uni-padding-wrap uni-common-mt bott" @tap="add" style='width:40%;float:right;'>
						<button type="primary">立即购买</button>
					</view>
				</view>
			</view>
		</view>

	</view>
	<!-- </scroll-view> -->
</template>

<script>
	import jyfParser from "@/components/jyf-parser/jyf-parser";
	import Ctpic from '@/components/custom-picture.js'
	import appShare, {
		closeShare
	} from '@/components/share.js'
	var ctpic = new Ctpic
	export default {
		data() {
			return {
				list: {},
				canshu: [],
				pingjia: false,
				isAdd: false,
				num: 1,
				shuList: [],
				id: [],
				isCollect: '',
				content: '',
				youhui: [],
				dizhi: {},
				goodsId: '',
				guige: [],
				indexx: 0,
				gui: '',
				shopId: '',
				Price: 0,
				shuzu: [],
				huodong: false,
				ind: 1,
				isShow: false,
				toJump: '',
				yao: '',
				xuanzh: false,
				youhuiqu: [],
				j: 0,
				cishu: 3,
				yihuodecishu: 0,
				height: '',
				pdType: '',
				starNum: 0,
				code: '',
				liulanTime: '',
				keLink: ''
			}
		},
		components: {
			jyfParser
		},
		onLoad(option) {
			this.deId = option.id
			this.pdType = uni.getStorageSync('pdType')
			console.log(option)
			var _this = this
			uni.getSystemInfo({
				success: function(res) {
					_this.height = (res.windowHeight * (750 / res.windowWidth));
				}
			})

			this.$https({
				url: '/api/oauth/shop/mall-goods-detail',
				data: {
					goods_id: option.id
				},
				dengl: !uni.getStorageSync('Authorization'),
				success: function(res) {
					if (res.data.data.detail.couponDTOS) {
						res.data.data.detail.couponDTOS.map(function(val, i) {
							val.type = false
						})
					}
					_this.list = res.data.data.detail
					_this.list.goodsImgss = res.data.data.detail.goodsImgs.split(',')
					if (_this.list.shopPrice) {
						_this.list.shopPrice = _this.list.shopPrice.toFixed(2)
					}
					if (_this.list.marketPrice) {
						_this.list.marketPrice = _this.list.marketPrice.toFixed(2)
					}

					//修改返回的数据中的参数
					Object.keys(res.data.data.specs).forEach(function(key) {
						var obj = {}
						obj.n = key
						obj.sa = res.data.data.specs[key]
						_this.canshu.push(obj)
					})
					_this.canshu.map(function(n, index) {
						_this.$set(_this.shuzu, index, [])
						n.sa.map(function(z, indexs) {
							_this.$set(_this.shuzu[index], indexs, false)
						})
					})
					_this.pingjia = res.data.data.goodsComms[0]
					_this.isCollect = res.data.data.isCollect
					_this.goodsId = res.data.data.detail.goodsId
					_this.shopId = res.data.data.detail.shopId
					for (var i in res.data.data.spec_price) {
						_this.guige.push(res.data.data.spec_price[i])
					}
					var numa = 0
					for (var i in res.data.data.spec_price) {
						if (numa == 0) {
							// _this.gui = res.data.data.spec_price[i].keyName
						}
						numa++
					}
					// 优惠券
					_this.youhui = res.data.data.detail.couponDTOS
					if (res.data.data.detail.couponDTOS) {
						if (res.data.data.detail.couponDTOS.length > 0) {
							_this.youhuiqu = [res.data.data.detail.couponDTOS[0]]
						}
					}
					var arr = []
					for (var k in _this.canshu) {
						arr.push({
							name: k,
							itemId: _this.canshu[k]
						})
					}
					_this.shuList = arr
					_this.$https({
						url: '/api/oauth/shop/store-shop-detail',
						data: {
							shopId: res.data.data.detail.shopId
						},
						success: function(res) {
							_this.starNum = res.data.data.starId
							_this.keLink = res.data.data.kfLink
						}
					})
					//添加商品浏览记录
					//判断是否登录
					if (uni.getStorageSync('Authorization')) {
						_this.$https({
							url: '/api/shop/goods-brows-history-add',
							data: {
								goodsId: option.id
							},
							method: 'post',
							success: function(res) {}
						})
						// 判断是否增加积分
						if (option.liulanState) {
							//增加积分
							this.liulanTime = setTimeout(function() {
								if (_this.cishu > _this.yihuodecishu) {
									_this.$https({
										url: '/api/task/center-task-insert',
										data: {
											taskId: 2,
											taskType: 1
										},
										method: 'post',
										success: res => {
											_this.cishu++
											// console.log('执行定时器')
										}
									})
								}
							}, 60000)
						}

					}

				}
			})
			if (uni.getStorageSync('Authorization')) {
				this.$https({
					url: '/api/user/my-info',
					success: res => {
						this.code = res.data.data.myCode
					}
				})
			}
		},
		onPageScroll(e) {
			this.isShow = true
			if (e.scrollTop == 0) {
				this.isShow = false
			}
		},
		onUnload() {
			clearTimeout(this.liulanTime)
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			lingquYHQ(id, index, type) {
				console.log(index)
				var _this = this
				if (this.denglufangfatiaozhuan()) {
					if (type) {
						uni.showToast({
							title: '已领取，不可重复领取',
							icon: 'none'
						})
						return

					} else {
						this.$https({
							url: '/api/shop/coupon-couple-add',
							data: {
								ids: id
							},
							method: 'POST',
							dengl: false,
							success(res) {
								if (res.data.code == 0) {
									_this.list.couponDTOS[index].type = true
									uni.showToast({
										title: '恭喜，抢到了',
										icon: 'none'
									})
								} else {
									_this.list.couponDTOS[index].type = res.data.message == '优惠券已领取' ? true : false
									uni.showToast({
										title: res.data.message,
										icon: 'none'
									})
								}
							}
						})
					}
				}
			},
			jump(ind) {
				var _this = this
				this.ind = ind
				if (ind == 1) {
					this.toJump = 's'
				}
				if (ind == 2) {
					_this.toJump = 'pingjia'
				}
				if (ind == 3) {
					_this.toJump = 'xiangqi'
				}

			},
			add() {
				this.isAdd = !this.isAdd
				// this.Price = this.guige[0].price
				console.log(this.Price)
				this.Price = this.Price == 0 ? this.list.shopPrice : this.Price
				// con
			},
			reduce() {
				this.num--
				if (this.num <= 1) {
					this.num = 1
				}
				//计算价格
				this.Price = this.$numMul(this.guige[this.indexx].price, this.num)
			},
			jia() {
				this.num++
				//计算价格
				this.Price = this.$numMul(this.guige[this.indexx].price, this.num)
			},
			xuanzhong: function(index, indexs) {
				this.shuzu[index].map((n, indexsz) => {
					this.$set(this.shuzu[index], indexsz, false)
				})
				this.$set(this.shuzu[index], indexs, true)
				//如果所有规格都选中，才能计算价格
				var n = 0
				this.shuzu.map(function(c) {
					c.map(function(z) {
						if (z) {
							n++
						}
					})
				})
				if (n == this.shuzu.length) {
					this.guige.map((n, index) => {
						var str = []
						this.shuzu.map((z, indexa) => {
							z.map((x, indexs) => {
								if (x) {
									str.push(this.canshu[indexa].sa[indexs].item)
								}
							})
						})
						var as = 0
						str.map(function(x) {
							if (n.keyName.indexOf(x) >= 0) {
								as++
							}
						})
						if (as == this.shuzu.length) {
							this.Price = this.$numMul(n.price, this.num)
							this.indexx = index
							this.gui = n.keyName
							this.xuanzh = true
							this.j = n.price
						}
					})
				}
			},
			huodongxian: function() {
				this.huodong = true
			},
			//隐藏活动弹窗
			yincang: function() {
				this.huodong = false
			},
			togLi(index, itemId) {
				// this.id =itemId ;
				// this.id[index] = itemId
				this.$set(this.id, index, itemId)
			},
			isActive() {
				if (this.denglufangfatiaozhuan()) {
					var _this = this
					if (!this.isCollect) {
						this.$https({
							url: '/api/shop/mall-add-collect',
							data: JSON.stringify({
								goodsId: this.goodsId
							}),
							method: 'POST',
							haeder: true,
							success: function(res) {
								_this.isCollect = !_this.isCollect
							}
						})
					} else {
						this.$https({
							url: '/api/shop/mall-cancel-collect',
							data: JSON.stringify({
								goodsId: this.goodsId
							}),
							method: 'POST',
							haeder: true,
							success: function(res) {
								_this.isCollect = !_this.isCollect
							}
						})
					}
				}

			},
			jindian(shopId) {
				uni.navigateTo({
					url: '../shop/shop?id=' + shopId + '&s=' + this.deId
				})
			},
			togPing() {
				uni.navigateTo({
					url: 'pingjia?id=' + this.goodsId + '&ids=' + this.shopId
				})
			},
			gouwuche: function() {
				if (this.denglufangfatiaozhuan()) {
					var _this = this
					if (this.xuanzh) {
						this.$https({
							url: '/api/shop/order-add-cart',
							data: JSON.stringify({
								cartAttr: [{
									goodsNum: this.num,
									specKey: this.guige[this.indexx].key
								}],
								goodsId: this.goodsId,
								shopId: this.shopId
							}),
							method: 'post',
							haeder: true,
							success: function(res) {
								if (res.data.code == 0) {
									uni.showToast({
										title: '加入购物车成功'
									})
									setTimeout(function() {
										_this.isAdd = false
									}, 2000)
								} else {
									uni.showToast({
										title: res.data.message
									})
								}
							}
						})
					} else {
						uni.showToast({
							title: '请选择规格型号',
							icon: 'none'
						})
					}
				}
			},
			qiehuan: function(ind) {
				this.indexx = ind
				this.gui = this.guige[ind].keyName
				this.Price = this.guige[ind].price
			},
			goumaia: function() {
				if (this.denglufangfatiaozhuan()) {
					if (this.xuanzh) {
						uni.navigateTo({
							url: '../cart/orderForm/orderForm?goodsId=' + this.goodsId + '&cartAttr=' + JSON
								.stringify({
									cartAttr: [{
										goodsNum: this.num,
										specKeyName: this.guige[this.indexx].keyName,
										goodsLogo: this.list.goodsLogo,
										integral: this.list.integral,
										goodsName: this.list.goodsName,
										kuaidi: this.list.kuaidi,
										goodsPrice: this.j,
										goodsId: this.list.goodsId,
										shopName: this.list.shopDTO.shopName,
										specKey: this.guige[this.indexx].key,
										shopId: this.shopId,
										xuanzhong: true,
										name: this.list.length > 0 ? this.list.couponDTOS[0].name :
											'',
										couponUse: this.list.couponStatus,
										couponDJ: this.list.isUseCommCoupon
									}]
								}) + '&dingdan=2&goumai=1'
						})
					} else {
						uni.showToast({
							title: '请选择规格型号',
							icon: 'none'
						})
					}
				}
			},
			tiaoCart() {
				if (this.denglufangfatiaozhuan()) {
					uni.navigateTo({
						url: '../cart/cart'
					})
				}
			},
			shangpinxin: function() {
				if (this.denglufangfatiaozhuan()) {
					var _this = this
					this.$https({
						url: '/api/task/get-share-page',
						data: {},
						method: 'post',
						success: function(res) {
							uni.share({
								provider: 'weixin',
								scene: 'WXSceneSession',
								type: 0,
								href: 'http://www.yimuzk.com:8087/?xiangqing=' + _this.deId +
									'&codz=' + _this.code,
								imageUrl: _this.list.goodsImgss[0] +
									'?x-oss-process=image/resize,p_50/quality,q_80',
								title: '我在毅木重卡发现了一个好东西,分享给你看看',
								summary: '商品描述',
								success: res => {
									console.log(res)

								}
							})
						}
					})
				}
			},
			tiaozhuan: function() {
				if (this.denglufangfatiaozhuan()) {
					if (!this.keLink) {
						uni.showToast({
							title: '该店铺暂无客服',
							icon: 'none'
						})
					} else {
						uni.navigateTo({
							url: 'ke?id=' + this.deId + '&shopLink=' + this.keLink
						})

					}
				}
			}
		}

	}
</script>

<style lang="scss">
	page {
		background-color: #f7f7f7;
	}

	.coupon-box {
		margin-top: 20rpx;
		border-bottom: 1px solid #f5f5f5;
		// overflow: hidden;
		// padding-bottom: 20rpx;
		padding: 20rpx 30rpx;
		width: 100%;
		box-sizing: border-box;
	}

	.coupon-item {
		width: calc(100% - 100rpx);
		display: inline-block;
		box-sizing: border-box;
		vertical-align: middle;
	}

	.boxLeft {
		width: calc(100% - 200rpx);
		// float: left;
		display: inline-block;
		vertical-align: middle;

		.boxLeft-top {
			// margin-left: 20rpx;
			font-size: 30rpx;
			color: #000;
		}

		.boxLeft-bot {
			font-size: 25rpx;
			// margin-left: 150rpx;
			color: #2b5cff;
		}
	}

	.box-left-yh {
		color: #ff3333;
		font-size: 44rpx;
		vertical-align: middle;
		// padding: 5rpx 10rpx;
		// float: left;
		// margin-left: 20rpx;
		// line-height: 30rpx;
		margin-right: 25rpx;
		font-weight: bold;
		display: inline-block;
	}

	.lingqu {
		// float: right;
		vertical-align: middle;
		width: 100rpx;
		text-align: center;
		background: #fde9e9;
		// margin-right: 20rpx;
		height: 50rpx;
		line-height: 50rpx;
		border-radius: 10rpx;
		color: #ff3333;
		font-size: 26rpx;
		display: inline-block;
	}

	* {
		-webkit-touch-callout: none;
	}

	.boxbox {
		-webkit-touch-callout: none;
		overflow: hidden;
	}

	.mask {
		width: 100%;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.6);
		position: fixed;
		z-index: 9999999;
		top: 0;
		left: 0;
	}

	.butt {
		width: 100%;
		height: 60%;
		// overflow-y: scroll;
		position: fixed;
		bottom: 0;
		left: 0;
		padding: 30upx;
		box-sizing: border-box;
		background-color: white;
		z-index: 20;
		border-top-left-radius: 5%;
		border-top-right-radius: 5%;
		z-index: 99999999;

		.mTop {
			display: flex;
			align-items: center;
			height: 30%;
			justify-content: space-between;
			width: 100%;
			height: auto;
			// border-bottom: 1rpx solid #dddddd;
			padding-bottom: 30upx;
			box-sizing: border-box;

			.cover {
				width: 200upx;
				height: 200upx;
				margin-right: 20upx;
			}

			.mRight {
				flex: 1 auto;
				height: 200upx;
				display: flex;
				justify-content: space-between;
				flex-direction: column;

				.price {
					color: #ed2138;
					font-size: 30rpx;
					margin-top: 40rpx;
				}

				.mItem {
					color: #666666;
					font-size: 26rpx;
				}
			}

		}

		.mButton {
			width: 100%;
			height: 50%;
			overflow-y: auto;

			.color,
			.mNumber {
				height: 30%;

				.bod {
					border: 1rpx solid #285cfe;
					color: #285cfe;
				}
			}

			.name {
				display: block;
				font-size: 28rpx;
				color: #aaaaaa;
				margin: 50rpx 0 30rpx 0;
			}

			.cor {
				font-size: 24rpx;
				display: inline-block;
				background-color: #f4f4f2;
				border-radius: 8%;
				margin-right: 30rpx;
				line-height: 50rpx;
				height: 50rpx;
			}

		}

		.mNumber {
			display: flex;
			justify-content: space-between;
			flex-direction: row;
			align-items: center;

			.name {}

			.n_right {
				display: flex;
				flex-direction: row;

				.cor {
					margin-left: 30rpx;
				}
			}
		}

		.btn {
			background-color: #2b5cff;
			color: #fefefe;
			width: 40%;
			float: right;
		}
	}


	.bg_img {
		position: relative;
		top: 0upx;
		margin-top: 150rpx;

		image {
			width: 750upx;
			height: 750rpx;
		}
	}

	.top {
		overflow: hidden;
		border-bottom: 1px solid #e5e5e5;
		height: 90rpx;
		text-align: center;
		position: fixed;
		width: 100%;
		left: 0;
		top: 0;
		z-index: 99999;
		background: #fff;
		padding-top: 70rpx;
		line-height: 90rpx;

		.back {
			width: 90rpx;
			height: 90rpx;
			line-height: 90rpx;
			float: left;

			image {
				width: 18rpx;
				height: 32rpx;
				display: block;
				padding: 29rpx 36rpx;
			}
		}

		.textBox {
			display: inline-block;

			text {
				font-size: 32rpx;
				color: #333;
				float: left;
				line-height: 90upx;
			}
		}


		// .imgBox {
		// 	float: right;
		// 	width: 90rpx;
		// 	height: 90rpx;
		// 	line-height: 90rpx;

		// 	image {
		// 		width: 36upx;
		// 		height: 36upx;
		// 		display: block;
		// 		margin: 27rpx;
		// 	}
		// }

		.title-top {
			display: inline-block;
			margin-left: 90rpx;

			text {

				font-size: 32rpx;
				color: #333;
				float: left;
				line-height: 90upx;
			}
		}

		.imgs {
			overflow: hidden;
			float: right;
			height: 90rpx;
			line-height: 90rpx;

		}

		.imgBox {
			text-align: center;
			width: 80upx;
			float: right;

			image {
				width: 34upx;
				display: block;
				height: 32upx;
				padding: 29rpx 30rpx 29rpx 16rpx;
			}
		}

		.imgBoxs {
			text-align: center;
			float: right;
			width: 80upx;
			margin-left: 20rpx;

			image {
				width: 34upx;
				display: block;
				height: 32upx;
				padding: 29rpx 30rpx 29rpx 16rpx;
			}
		}


	}




	.top {

		.top_title {
			display: flex;

			.title {
				padding-right: 35rpx;
				padding-left: 35rpx;
				line-height: 20rpx;

				// display:
				text {
					display: block;
					line-height: 35rpx;
				}

				image {
					width: 34rpx;
					height: 6rpx;
					margin-left: 15rpx;
				}
			}
		}
	}

	.Box {
		float: left;

	}

	.detail {
		max-height: 200rpx;
		overflow-y: auto;
		text-align: center;
	}

	.titleBox {
		background-color: #fff;
		width: 712upx;
		padding: 20upx;
		position: relative;
		// top: 600upx;
		overflow: hidden;

		.ThePrice {
			overflow: hidden;

			.h2Box {
				float: left;

				text {
					font-size: 30upx;
					color: #ff6600;

					text {
						font-size: 48upx;
						color: #ff6600;
					}
				}
			}

			.spanBox {
				float: left;
				padding: 15upx;

				text {
					text-decoration: line-through;
					font-size: 26upx;
					color: #999;
				}
			}

		}

		.preferential {
			float: left;
			margin-right: 20upx;
			background-color: #fde9e9;
			padding: 0 20upx;
			border-radius: 10upx;

			text {
				float: left;
				line-height: 40upx;
				color: #ff3333;
				font-size: 24upx;
			}
		}

		.share {
			float: right;
			width: 84upx;
			height: 84upx;
			margin-top: 30upx;
			border-radius: 40upx;
			text-align: center;
			background: #F1F1F1;
			position: relative;

			image {
				display: block;
				width: 30upx;
				height: 26upx;
				margin: 0 auto;
				padding-top: 12upx;
			}

			text {
				font-size: 18upx;
				color: #999;
				position: absolute;
				left: 15rpx;
				bottom: 19rpx;
			}
		}

		.h2aBox {
			float: left;
			display: block;
			padding-top: 10upx;
			width: 100%;

			.title_top {
				overflow: hidden;
			}

			.titleText {
				font-size: 30rpx;
				display: inline-block;
				vertical-align: middle;
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

			// text {
			// 	display: block;
			// 	font-size: 24upx;
			// 	color: #333;
			// 	line-height: 40upx;
			// }
		}
	}

	.introduce {
		background-color: #fff;
		margin-top: 20upx;
		width: 710upx;
		padding: 20upx;
		display: flex;
		justify-content: space-between;
		line-height: 60rpx;

		// position: absolute;
		// top: 850upx;
		.in_left {
			// width: 50%;
			display: flex;
			justify-content: flex-start;

			.mingca {
				float: left;
				padding-right: 20upx;

				text {
					// color: #666;
					font-size: 26upx;
				}
			}

			.diz {
				// float: left;
				padding-right: 10upx;

				text {
					color: #333;
					font-size: 26upx;
				}
			}

			.kuaid {
				// float: left;

				text {
					color: #333;
					font-size: 26upx;
				}
			}

		}

		.yuex {
			// float: right;

			text {
				color: #666;
				font-size: 26upx;
			}
		}

	}

	.xize {
		background-color: #fff;
		margin-top: 20upx;
		width: 100%;
		box-sizing: border-box;
		padding: 20upx;
		overflow: hidden;

		.huid {
			float: left;
			padding-right: 20upx;
			margin-top: 5rpx;

			text {
				color: #666;
				font-size: 26upx;
			}
		}

		.xiangqBox {
			float: left;
			width: 80%;

			.oneBox {
				float: left;
				width: 100%;

				.preferential {
					float: left;
					margin-top: 10upx;
					margin-right: 20upx;
					background-color: #fde9e9;
					padding: 0 10upx;
					border-radius: 10upx;

					text {
						float: left;
						line-height: 35upx;
						color: #ff3333;
						font-size: 17upx;
					}
				}

				.jies {
					text {
						font-size: 26upx;
						color: #333;
					}
				}
			}


		}

		.imBox {
			float: right;
			padding-left: 30rpx;

			image {
				width: 12upx;
				height: 20upx;
			}
		}

	}

	.parameter {
		background-color: #fff;
		margin-top: 20upx;
		width: 710upx;
		padding: 20upx;
		// position: absolute;
		// top: 1070upx;
		overflow: hidden;
	}

	.basic {
		width: 100%;
		float: left;
		// margin-bottom: 20upx;

		.left_a {
			float: left;
			padding-right: 20upx;

			text {
				font-size: 28upx;
				color: #999;
				line-height: 50upx;
			}
		}

		.left_b {
			float: left;
			padding-right: 20upx;

			text {
				font-size: 28upx;
				color: #333;
				line-height: 50upx;
			}
		}

		.right_a {
			float: right;
			padding-right: 10upx;

			.img_l {
				float: left;
				padding-right: 10upx;
				padding-top: 5upx;

				image {
					width: 45upx;
					height: 45upx;
				}

			}

			.img_a {
				float: right;
				padding: 20upx 0upx 20upx 20upx;

				image {
					width: 12upx;
					height: 14upx;
					display: block;
				}

			}
		}
	}

	.pingjBox {
		background-color: #fff;
		margin-top: 20upx;
		width: 710upx;
		padding: 20upx;
		margin-bottom: 20upx;
		// position: absolute;
		// top: 1345upx;
		overflow: hidden;

		.basic {
			.left_b {
				float: right;
			}
		}
	}

	.toux {
		background-color: #f7f7f7;
		padding-top: 20upx;
		width: 680upx;
		overflow: hidden;
		border-radius: 10upx;
		padding-bottom: 20upx;

		image {
			width: 80upx;
			height: 80upx;
			border-radius: 150upx;
		}
	}

	.evaluate {
		width: 680upx;
		margin-bottom: 100upx;
	}

	.mingc {
		float: left;
		width: 570upx;

		text {
			font-size: 26upx;
			padding-left: 20upx;
		}

		.time {
			float: right;
			color: #333;
			font-size: 26upx;
			line-height: 50upx;
		}
	}

	.imgBox_a {
		float: left;
		margin-left: 20upx;
		margin-top: 10upx;
		margin-top: 20upx;
	}

	.huay {
		width: 570upx;
		float: left;
		color: #999;
		line-height: 40upx;
	}

	.listBox {
		width: 710upx;
		padding: 20upx;
		// position: absolute;
		// top: 1660upx;
		background-color: #fff;
		margin-top: 20upx;
		overflow: hidden;

		.liBox {
			padding: 10upx;
			float: left;
			width: 690upx;
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
					color: #2b5cff;
					float: left;
					padding: 5upx 20upx;
					line-height: 40upx;
					background-color: #fff;
					border: 1px solid #2b5cff;
					border-radius: 50upx;
				}
			}
		}
	}

	.shangx {
		width: 710upx;
		padding: 20upx;
		background-color: #fff;
		margin-top: 20upx;
		padding-bottom: 200rpx;

		text {
			font-size: 30upx;
		}

		.imgg {
			padding-top: 20upx;

			image {
				width: 705upx;
				height: 700upx;
			}
		}
	}

	.bottom {
		width: 750upx;
		height: 100upx;
		background-color: #fff;
		border-top: 1px solid #ccc;
		position: fixed;
		bottom: 0upx;
		left: 0upx;

		.leftA {
			float: left;
			padding-left: 20upx;
			width: 350upx;

			.centets {
				text-align: center;

				image {
					display: inline-block;
				}
			}

			.kefua {
				float: left;
				padding: 15rpx 20rpx;
				box-sizing: border-box;
				text-align: center;
				height: 100rpx;

				image {
					padding-left: 5upx;
					width: 41upx;
					height: 38upx;
					display: block;
					margin-left: 50%;
					transform: translateX(-20.5rpx);
					// float: left;
				}

				.keyboard {
					// position: relative;
					// top: -10rpx;
					display: block;
					color: #333;
					font-size: 26upx;
					margin-top: 5rpx;

					// text {
					// 	// float: left;
					// 	color: #333;
					// 	font-size: 26upx;
					// }
				}

			}



		}

	}

	.rightA {
		width: 300upx;
		float: right;

	}

	.bottBoxss {

		float: right;
		width: 337rpx;
		padding: 20upx;
		height: 50upx;

		.onna {
			button {
				background-color: #007AFF !important;
				border: 1px solid #007AFF !important;
				color: #fff !important;
			}
		}

		.onnb {
			button {
				background-color: #fff !important;
				border: 1px solid #007AFF !important;
				color: #007AFF !important;
			}
		}

		.bott {
			display: block;
			width: calc(50% - 20rpx);
			margin-right: 20upx;
			float: right;

			button {
				padding: 0;
				background-color: #fff;
				border: 1px solid #999;
				border-radius: 40upx;
				font-size: 24upx;
				color: #999;
				font-family: Microsoft YaHei;
			}

		}
	}
</style>
