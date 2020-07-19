<template>
	<view>
		<!-- 产品图，这是轮播 -->
		<view class="bg_img">
			<image :src="list.goodsLogo" mode=""></image>
		</view>

		<!-- 头部 -->
		<view class="top">
			<view class="imgBoxs" @tap="tiaoCart">
				<image src="../../static/icon_48.png" mode=""></image>
			</view>
			<view class="imgBox">
				<image src="../../static/icon_47.png" mode=""></image>
			</view>
		</view>
		<!-- 标题 -->
		<view class="titleBox">
			<view class="Box">
				<view class="ThePrice">
					<view class="h2Box">
						<text>￥<text>{{list.shopPrice?list.shopPrice:'暂无价格'}}</text>.00</text>
					</view>
					<view class="spanBox">
						<text>原价：￥{{list.marketPrice}}</text>
					</view>
				</view>
				<view class="preferential" v-for="(i,n) in list.couponDTOS">
					<text>满{{i.condition}}-{{i.money}}元</text>
				</view>

			</view>

			<view class="share">
				<image src="../../static/icon_49.png" mode=""></image>
				<text @tap='shangpinxin'>分享</text>
			</view>
			<view class="h2aBox">
				<text>{{list.goodsName}}</text>
			</view>
		</view>

		<!-- 发货/活动细则 -->
		<view class="introduce">
			<view class="in_left">
				<view class="mingca">
					<text>发货</text>
				</view>
				<view class="diz">
					<text>{{list.sendAddr}} |</text>
				</view>
				<view class="kuaid">
					<text>快递：{{list.kuaidi}}</text>
				</view>
			</view>
			<view class="yuex">
				<text>月销量:{{list.salesSum}}</text>
			</view>
		</view>
		<view class="xize">
			<view class="huid">
				<text>优惠</text>
			</view>
			<view class="xiangqBox" @tap='huodongxian'>
				<view class="oneBox" v-for="(i,n) in list.couponDTOS">
					<view class="preferential">
						<text>满{{i.condition}}-{{i.money}}元</text>
					</view>
					<view class="jies">
						<text>满{{i.condition}}元，立减{{i.money}}元；不累积。</text>
					</view>
				</view>
			</view>
			<view class="imBox">
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
					<text>已选：{{gui}}</text>
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
				<view style='position:absolute;top:30rpx;right:20rpx;' @tap='add'>X</view>
				<view class="mTop">
					<image class="cover" :src="list.goodsLogo" mode=""></image>
					<view class="mRight">
						<view class="price">¥ {{Price}}</view>
						<view class="mItem">已选：{{gui}}</view>
					</view>

				</view>
				<view class="mButton">
					<view style='margin-top:20rpx;' v-for='(item,index) in canshu'>
						<view style='color:#999;'>{{item.n}}</view>
						<view style='margin-top:20rpx;'>
							<view v-for='(items,indexs) in item.sa' :style='shuzu[index][indexs]?"display:inline-block;padding:10rpx;border:1px solid #3160fe;background:#fff;color:#3160fe;margin-right:10rpx;font-size:26rpx;":"display:inline-block;padding:10rpx;border:1px solid #f5f5f5;background:#f5f5f5;margin-right:10rpx;font-size:26rpx;color:#000;"' @tap='xuanzhong(index,indexs)'>{{items.item}}</view>
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
							<input class="cor" type="number" style='width:60rpx;' v-model="num"></input>
							<view class="add" @tap="jia">+</view>
						</view>
					</view>
					<view style='overflow:hidden;position:fixed;bottom:20rpx;left:5;width:90%;'>
						<button style='width:50%;float:left;' @tap='gouwuche'>加入购物车</button>
						<button class="btn" @tap='goumaia'>立即购买</button>
					</view>
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
					<text>98%满意</text>
				</view>

			</view>


			<!-- 用户评价 ,划动效果-->
			<view class="toux" v-if="pingjia">
				<view class="imgBox_a">
					<image :src="pingjia.img" mode=""></image>
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
			<view class="toux" v-if="!pingjia" style="font-size: 28rpx;padding-left: 20rpx;box-sizing: border-box;">暂无评价</view>
		</view>

		<!-- 店铺：需产品确认 -->
		<view class="listBox">
			<view class="liBox">
				<view class="imgBox">
					<image :src="list.shopDTO.storeLogo" mode=""></image>
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

			<!-- <view class="imgg"> -->
			<jyf-parser :html="list.goodsContent" ref="article" style="margin-bottom:100rpx"></jyf-parser>
			<!-- <rich-text>{{list.goodsContent}}</rich-text> -->
			<!-- </view> -->
			<!-- <view :style="margin-bottom:100rpx">所涉及的大家</view> -->
		</view>
		<!--活动列表-->
		<view v-if='huodong' style='position:fixed;left:0;top:0;width:100%;height:100%;background:rgba(0,0,0,0.6);z-index:99999;' @tap='yincang'>
			<view style='width:100%;bottom:0;height:60%;position:fixed;left:0;background:#fff;border-radius:5% 5% 0 0;overflow-y:auto;'>
				<view style='text-align:center;margin-top:30rpx;'>优惠<view style='position:absolute;right:20rpx;top:30rpx;'>X</view></view>
				<view v-for='item in list.couponDTOS' style='margin-top:20rpx;border-bottom:1px solid #f5f5f5;overflow:hidden;padding-bottom:20rpx;'>
					<view style='background:#fde9e9;color:#ff3333;font-size:17rpx;padding:5rpx 10rpx;float:left;margin-left:20rpx;line-height:30rpx;'>满{{item.condition}}-{{item.money}}元</view>
					<view style='float:left;margin-left:20rpx;font-size:30rpx;color:#000;'>满{{item.condition}},立减{{item.money}}元;不累积</view>
				</view>
			</view>
		</view>
		<!-- 底部 -->
		<view class="bottom">

			<view class="leftA">
				<view class="kefua" @tap="jindian(list.shopId)">
					<image src="../../static/icon_50.png" mode=""></image>
					<view class="keyboard">
						<text>店铺</text>
					</view>
				</view>
				<view class="kefua">
					<image @tap="isActive" v-if="!isCollect" src="../../static/icon_51.png" mode=""></image>
					<image @tap="isActive" v-if="isCollect" src="../../static/icon_52.png" mode=""></image>
					<view class="keyboard">
						<text>{{isCollect?'已收藏':'收藏'}}</text>
					</view>
				</view>


			</view>
			<view class="rightA">
				<view class="bottBoxss">
					<view class="uni-padding-wrap uni-common-mt bott onna">
						<button type="primary" @tap='add'>加入购物车</button>
					</view>
					<view class="uni-padding-wrap uni-common-mt bott" @tap="add">
						<button type="primary">立即购买</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import jyfParser from "@/components/jyf-parser/jyf-parser";
	import appShare,{closeShare} from '@/components/share.js'
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
				shuzu:[],
				huodong:false
			}
		},
		components: {
			jyfParser
		},
		onLoad(option) {
			this.deId = option.id
			var _this = this
			this.$https({
				url: '/api/oauth/shop/mall-goods-detail',
				data: {
					goods_id: option.id
				},
				dengl: true,
				success: function(res) {
					_this.list = res.data.data.detail
					//修改返回的数据中的参数
					Object.keys(res.data.data.specs).forEach(function(key){
						var obj={}
						obj.n=key
						obj.sa=res.data.data.specs[key]
						_this.canshu.push(obj)
					})
					_this.canshu.map(function(n,index){
						_this.$set(_this.shuzu,index,[])
						n.sa.map(function(z,indexs){
							_this.$set(_this.shuzu[index],indexs,false)
						})
					})
					_this.pingjia = res.data.data.goodsComms[0]
					_this.isCollect = res.data.data.isCollect
					_this.goodsId = res.data.data.detail.goodsId
					_this.shopId = res.data.data.detail.shopId
					// console.log(res.data.data.goodsComms[0])
					for (var i in res.data.data.spec_price) {
						_this.guige.push(res.data.data.spec_price[i])
					}
					var numa = 0
					for (var i in res.data.data.spec_price) {
						if (numa == 0) {
							_this.gui = res.data.data.spec_price[i].keyName
						}
						numa++
					}
					// 优惠券
					_this.youhui = res.data.data.couponDTOS
					var arr = []
					for (var k in _this.canshu) {
						arr.push({
							name: k,
							itemId: _this.canshu[k]
						})
					}
					_this.shuList = arr
				}
			})

		},
		methods: {
			add() {
				this.isAdd = !this.isAdd
				this.Price = this.guige[0].price
			},
			reduce() {
				this.num--
				if (this.num <= 1) {
					this.num = 1
				}
				//计算价格
				this.Price=this.guige[this.indexx].price*this.num
			},
			jia() {
				this.num++
				//计算价格
				this.Price=this.guige[this.indexx].price*this.num
			},
			xuanzhong:function(index,indexs){
				this.shuzu[index].map((n,indexsz)=>{
					this.$set(this.shuzu[index],indexsz,false)
				})
				this.$set(this.shuzu[index],indexs,true)
				//如果所有规格都选中，才能计算价格
				var n=0
				this.shuzu.map(function(c){
					c.map(function(z){
						if(z){
							n++
						}
					})
				})
				if(n==this.shuzu.length){
				this.guige.map((n,index)=>{
					var str=[]
					this.shuzu.map((z,indexa)=>{
						z.map((x,indexs)=>{
							if(x){
								str.push(this.canshu[indexa].sa[indexs].item)
							}
						})
					})
					var as=0
					str.map(function(x){
						if(n.keyName.indexOf(x)>0){
							as++
						}
					})
					if(as==this.shuzu.length){
						this.Price=n.price*this.num
						this.indexx=index
						this.gui=n.keyName
					}
				})
				}
			},
			huodongxian:function(){
				this.huodong=true
			},
			//隐藏活动弹窗
			yincang:function(){
				this.huodong=false
			},
			togLi(index, itemId) {
				// this.id =itemId ;
				// this.id[index] = itemId
				this.$set(this.id, index, itemId)
			},
			isActive() {
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

			},
			jindian(shopId) {
				// console.log(shopId)
				uni.navigateTo({
					url: '../shop/shop?id=' + shopId
				})
			},
			togPing() {
				uni.navigateTo({
					url: 'pingjia?id=' + this.goodsId
				})
			},
			gouwuche: function() {
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
						uni.showToast({
							title: res.data.message
						})
					}
				})
			},
			qiehuan: function(ind) {
				this.indexx = ind
				this.gui = this.guige[ind].keyName
				this.Price = this.guige[ind].price
			},
			goumaia: function() {
				uni.navigateTo({
					url: '../cart/orderForm/orderForm?goodsId=' + this.goodsId + '&cartAttr=' + JSON.stringify({
						cartAttr: [{
							goodsNum: this.num,
							specKeyName: this.guige[this.indexx].keyName,
							goodsLogo: this.list.goodsLogo,
							integral: this.list.integral,
							goodsName: this.list.goodsName,
							kuaidi: this.list.kuaidi,
							shopPrice: this.Price,
							goodsId: this.list.goodsId,
							specKey: this.guige[this.indexx].key,
							shopId: this.shopId,
							name: this.list.couponDTOS[0].name,
						}]
					}) + '&dingdan=2&goumai=1'
				})
			},
			tiaoCart() {
				uni.switchTab({
					url: '../cart/cart'
				})
			},
			shangpinxin:function(){
				let shareData={
					shareUrl:'https://kemean.com',
					shaerTitle:'分享的标题',
					shaerContent:'分享的描述',
					shaerImg:'https://qn.kemean.cn//upload/202004/18/1587189024467w6xj18b1.jpg',
					appId:'wxcfd9c1418eeb2e3',
					appPath:'pages/static/fh.png',
					appWebUrl:'htttps://kemean.com'
				}
				let shareObj=appShare(shareData,res=>{})
				setTimeout(function(){
					shareObj.close()
				})
			}
		}

	}
</script>

<style lang="scss">
	page {
		background-color: #f7f7f7;
	}

	.mask {
		width: 100%;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.6);
		position: fixed;
		z-index: 10;
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
		z-index: 99999;

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
			overflow-y:auto;

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
				font-size: 26rpx;
				padding: 10rpx 30rpx;
				display: inline-block;
				background-color: #f4f4f2;
				border-radius: 8%;
				margin-right: 30rpx;

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
		}
	}


	.bg_img {
		position: relative;
		top: 0upx;

		image {
			width: 750upx;
			height: 610upx;
		}
	}

	.top {
		width: 710upx;
		padding: 20upx;
		overflow: hidden;
		position: absolute;
		top: 0;

		.imgBox {
			text-align: center;
			float: right;
			border-radius: 30upx;
			margin: 10upx;
			width: 60upx;
			height: 60upx;
			background: rgba(0, 0, 0, 0.5) !important;

			image {
				width: 34upx;
				padding-top: 15upx;
				height: 32upx;
			}
		}

		.imgBoxs {
			text-align: center;
			float: right;
			border-radius: 30upx;
			margin: 10upx;
			width: 60upx;
			height: 60upx;
			background: rgba(0, 0, 0, 0.5) !important;

			image {
				width: 34upx;
				padding-top: 12upx;
				height: 32upx;
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
			// overflow: hidden;

			.h2Box {
				float: left;

				text {
					font-size: 30upx;
					color: #ff0000;

					text {
						font-size: 48upx;
						color: #FF0000;
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
			padding: 5upx 20upx;
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
			}
		}

		.h2aBox {
			float: left;
			display: block;
			padding-top: 10upx;
			width: 100%;

			text {
				display: block;
				font-size: 34upx;
				color: #333;
				line-height: 40upx;
			}
		}
	}

	.introduce {
		background-color: #fff;
		margin-top: 20upx;
		width: 710upx;
		padding: 20upx;
		display: flex;
		justify-content: space-between;

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
		width: 710upx;
		padding: 20upx;
		overflow: hidden;

		.huid {
			float: left;
			padding-right: 20upx;

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
					padding: 3upx 10upx;
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

			.kefua {
				float: left;
				padding: 20upx;

				image {
					padding-left: 5upx;
					width: 41upx;
					height: 38upx;
					float: left;
				}

				.keyboard {
					text {
						float: left;
						color: #333;
						font-size: 26upx;
					}
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
