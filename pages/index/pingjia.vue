<template>
	<view class="pList">
		<view class="content">
			<view class="pXing">
				<view class="xin">
					<text>综合评价 :</text>
					<image src="../../static/xing.png" v-for="(i,n) in 5" mode=""></image>
				</view>
				<text class="man"><text>98</text>%满意度</text>
			</view>
			<!-- 评价列表 -->
			<view class="pingList" v-for="(item,index) in pingJList">
				<view class="imgTop">
					<view class="imgL">
						<image :src="item.userDTO.headimg" mode=""></image>
						<view class="xin">
							<text>{{item.userDTO.nickname}}</text>
							<image src="../../static/xing_01.png" v-for="(i,n) in isXing" mode=""></image>
							<image src="../../static/xing.png" v-for="(i,n) in (5-isXing)" mode=""></image>
						</view>
					</view>
					<view class="time">
						<text>{{item.createTime}}</text>
					</view>
				</view>
				<view class="guige">
					<text>已购："<text>黄色</text>","<text>官方标配</text>"</text>
				</view>
				<view class="pCont" :style="item.storeGoodsReplyList.length>0?'':'border-bottom: none'">
					<text>{{item.content}}</text>
					<view class="img">
					<image v-if="item.img!='../../../static/img_10.jpg.png'" :src="item.img" mode=""></image>
					</view>
					<!-- <text>追加评论<text>（收货18天后）</text>：<text>用了一段时间挺好的</text></text> -->
				</view>
				<view class="reply" v-for="(ite,inde) in item.storeGoodsReplyList">
					<text>商家回复：<text>{{ite.replyContent}}</text></text>
				</view>
			</view>

		</view>

		<!-- 弹出框 -->
		<view class="mask" v-if="isAdd" @tap="add">
		</view>
		<view class="butt" v-if="isAdd">
				<view class="mTop">
					<image class="cover" :src="list.goodsLogo" mode=""></image>
					<view class="mRight">
						<view class="price">¥ {{list.shopPrice}}</view>
						<view class="mItem">已选：{{gui}}</view>
					</view>
		
				</view>
				<view class="mButton">
					<view class="detail">
		
						<view v-for='(item,index) in guige' :style='indexx==index?"margin-top:10rpx;color:#2b5cff;":"margin-top:10rpx;color:#666;"'
						 @tap='qiehuan(index)'>{{item.keyName}}</view>
					</view>
		
					<view class="mNumber">
						<view class="name">数量</view>
						<view class="n_right">
							<view class="reduce" @tap="reduce">-</view>
							<input class="cor" type="number" style='width:60rpx;' v-model="num"></input>
							<view class="add" @tap="jia">+</view>
		
						</view>
					</view>
					<view style='overflow:hidden;'>
						<button style='width:50%;float:left;' @tap='gouwuche'>加入购物车</button>
						<button class="btn" @tap='goumaia'>立即购买</button>
					</view>
				</view>
			</view>
		

		<!-- 底部 -->
		

	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsId: '',
				pingJList: {},
				isXing: '',
				isAdd: false,
				isCollect: '',
				canshu: {},
				pingjia: {},
				id: [],
				shuList: [],
				num: 1,
				list: {},
				guige: [],
				indexx: 0,
				gui: '',
				shopId:'',
				goodsId: '',
			}
		},
		onLoad(option) {
			var _this = this
			this.goodsId = option.id
			console.log(option)
			console.log(_this.isXing)
			this.$https({
				url: '/api/oauth/shop/goods-comm-list',
				data: {
					goodsId: option.id
				},
				dengl: false,
				success: function(res) {
					_this.pingJList = res.data.data
					_this.xingJ = res.data.data[0].score
					
					// 星级判断
					_this.isXing = _this.xingJ >= 80 ? 5 : _this.xingJ >= 60 ? 4 : _this.xingJ >= 40 ? 3 : _this.xingJ >= 20 ? 2 : 1
					// _this.storeH=res.data.data.storeGoodsReplyList
					console.log(res.data.data[0].score)
					console.log(res.data.data[0].goodsId)
					// console.log(_this.isXing)
				},
			}),
			this.$https({
				url: '/api/oauth/shop/mall-goods-detail',
				data: {
					goods_id: option.id
				},
				dengl:true,
				success: function(res) {
					_this.list = res.data.data.detail
					_this.canshu = res.data.data.specs
					_this.goodsId = res.data.data.detail.goodsId
					_this.pingjia = res.data.data.goodsComms[0]
					_this.isCollect = res.data.data.isCollect
					_this.goodsId = res.data.data.detail.goodsId
					_this.shopId=res.data.data.detail.shopId
					// 优惠券
					_this.youhui = res.data.data.couponDTOS
					for (var i in res.data.data.spec_price) {
						_this.guige.push(res.data.data.spec_price[i])
					}
					console.log(res.data.data.spec_price)
					var numa=0
					for (var i in res.data.data.spec_price) {
						if(numa==0){
						_this.gui = res.data.data.spec_price[i].keyName
						}
						numa++
					}
					console.log(res.data.data.detail)
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
			houtui() {
				console.log(11111)
				uni.navigateTo({
					url: 'productDetails?id=' + this.goodsId
				})
			},
			add() {
				this.isAdd = !this.isAdd
			},
			reduce() {
				this.num--
				if (this.num <= 0) {
					this.num = 0
				}
			},
			jia() {
				this.num++
			},
			togLi(index, itemId) {
				// this.id =itemId ;
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
				uni.navigateTo({
					url: '../shop/shop?id=' + shopId
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
						shopId:this.shopId
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
				this.gui=this.guige[ind].keyName
			},
			goumaia: function() {
				uni.navigateTo({
					url: '../cart/orderForm/orderForm?goodsId='+this.goodsId+'&cartAttr='+JSON.stringify({cartAttr:[{goodsNum:this.num,specKey:this.guige[this.indexx].keyName,goodsLogo:this.list.goodsLogo,integral:this.list.integral,goodsName:this.list.goodsName,kuaidi:this.list.kuaidi,shopPrice:this.list.shopPrice,goodsId:this.list.goodsId,key:this.guige[this.indexx].key,shopId:this.shopId}]})+'&dingdan=2'
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		padding-left: 25rpx;
		padding-right: 25rpx;

		.pXing {
			display: flex;
			height: 110rpx;
			width: 100%;
			line-height: 110rpx;

			justify-content: space-between;

			.xin {

				text {
					padding-right: 12rpx;
					font-size: 30rpx;
				}

				image {
					display: inline-block;
					width: 34rpx;
					height: 34rpx;
					padding-right: 8rpx;

				}
			}
		}

		.man {
			justify-content: space-between;
			font-size: 24rpx;
			color: #999999;


		}

		.pingList {

			background-color: #f5f5f5;
			box-sizing: border-box;
			width: 710upx;
			padding: 20upx;
			overflow: hidden;
			margin-bottom: 28rpx;

			.imgTop {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-bottom: 20upx;

				.imgL {
					display: flex;
					align-items: center;

					.xin {
						display: inline-block;
						padding-left: 15rpx;

						text {
							align-items: center;
							line-height: 80rpx;
							padding-right: 12rpx;
							font-size: 24rpx;
						}

						image {
							display: inline-block;
							width: 25rpx;
							height: 25rpx;
							padding-right: 6rpx;

						}
					}

					image {
						width: 80upx;
						height: 80upx;
						border-radius: 150upx;
					}
				}

				.time {
					font-size: 24rpx;
					color: #676767;
				}
			}

			.guige {
				font-size: 26rpx;
				color: #676767;
				// padding-bottom: 30rpx;
				line-height: 45rpx;
			}

			.pCont {
				font-size: 26rpx;
				line-height: 45rpx;
				border-bottom: 1rpx solid #bfbfbf;
				padding-bottom: 20rpx;

				image {
					display: block;
					width: 150rpx;
					height: 100rpx;
					padding-bottom: 12rpx;
					padding-top: 12rpx;
					padding-right: 12rpx;
				}

				text {
					line-height: 45rpx;
				}
			}

			.reply {
				padding-top: 10rpx;
				font-size: 26rpx;
				line-height: 45rpx;
				color: #666666;
			}
		}
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
		height: 70%;
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
.Box {
		float: left;

	}

	.detail {
		max-height: 200rpx;
		overflow-y: auto;
		text-align: center;
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
