<template>
	<view class="bcg">

		<view class="top">
			<view class="textBox">
				<text>购物车(02)</text>
			</view>
			<!-- 无消息通知状态 -->
			<view class="imgBox">
				<!-- <image src="../../static/icon_36.png" mode=""></image> -->
			</view>
			<view class="spanBox">
				<text>编辑</text>
			</view>
		</view>

		<view class="listBox">
			<view class="box" v-for="(item , index) in cartList">
				<checkbox-group @change='xuanze'>
				<view class="radios">
					<checkbox :value='index' :checked='xuanzhoz[index]' @tap='x(index)'></checkbox>
					<text>{{item.storeShopDTO.shopName}}</text>
					<image src="../../static/icon_26.png" mode=""></image>
				</view>
				<!-- 订单信息 -->
				<view class="xinxi" @remove="onRemove(index,indexs)" @quxiao="onQuxiao(index,indexs)" v-for='(items,indexs) in item.specList'>
					<view class="radi">
						<checkbox :value='(index+"-"+indexs)' :checked='xuanzho[index][indexs]' @tap='q(index,indexs)'></checkbox>
					</view>
					<view class="imgBox_a">
						<image :src="item.goodsLogo" mode=""></image>
					</view>
					<view class="txt_c">
						<view class="title">
							<text>{{item.goodsName}}</text>
						</view>
						<view class="spec" @click="openPopup(index,indexs)">
							<text>{{items.specKeyName}}</text>
						</view>
						<view class="radColor">
							<text>￥{{items.goodsPrice?items.goodsPrice:'暂无价格'}}</text>
						</view>

						<!-- 这是数量加减 -->
						<view class="jia">
							<view @tap='jian(index,indexs)'>-</view>
							<input v-model='items.goodsNum' @blur='shuru(index,indexs)'>
							<view @tap='jia(index,indexs)'>+</view>
						</view>
					</view>
				</view>
				</checkbox-group>
			</view>

			<!-- 失效宝贝 -->

			
			<view class="Boxs">
				<view class="lose">
					<view class="xinxi">
						<view class="biaot">
							<text>失效宝贝</text>
							<view class="dele">
								<text>清空</text>
							</view>
						</view>
						<view class="imgBox_a">
							<image src="../../static/img_09.jpg" mode=""></image>
						</view>
						<view class="txt_c">
							<view class="title">
								<text>车载商品监控稍等稍等程等程序做序做着的限制性</text>
							</view>
							<view class="spec">
								<text>已选：＂黄色＂</text>
							</view>
							<view class="radColor">
								<text>已售罄</text>
							</view>
						</view>
					</view>
				</view>

				<view class="lose">
					<view class="xinxi">
						<view class="imgBox_a">
							<image src="../../static/img_09.jpg" mode=""></image>
						</view>
						<view class="txt_c">
							<view class="title">
								<text>车载商品监控稍等稍等程等程序做序做着的限制性</text>
							</view>
							<view class="spec">
								<text>已选：＂黄色＂</text>
							</view>
							<view class="radColor">
								<text>已售罄</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 底部 -->
		<view class="bottom">
			<view class="radis">
				<view :style='xuan?"width:30rpx;height:30rpx;border:1px solid #ddd;border-radius:50%;float:left;margin-left:20rpx;margin-top:10rpx;line-height:30rpx;font-size:20rpx;text-align:center;color:#fff;background:#2b5cff;border:none;":"width:30rpx;height:30rpx;border:1px solid #ddd;border-radius:50%;float:left;margin-left:20rpx;margin-top:10rpx;line-height:30rpx;font-size:20rpx;text-align:center;color:#fff;"' @tap='quanxuan'>√</view>
				<text style='margin-left:20rpx;'>全选</text>
			</view>
			<view class="leftA">
				<text>合计：<text>￥{{jiage}}</text></text>
			</view>
			<view class="rightA" @tap='tiaozhuan'>
				<text>结 算</text>
			</view>
		</view>

		<!-- 弹出框内容 -->
		<uni-popup ref="popup" type="bottom" class="tanchu">
			<button @click="closePopup">×</button>
			<view class="neira">
				<view class="imgs">
					<image :src="goodsLogo" mode=""></image>
				</view>

				<view class="text_e">
					<view class="price">
						<text>￥{{goodsPrice}}</text>
					</view>
					<view class="speci">
						<text>{{keyName}}</text>
					</view>
				</view>

				<view class="set">
					<view class="tit_k">
						<text>规格</text>
					</view>
					<!-- 默认样式 -->
					<view class="xiang" v-for='item in guige' @tap='xuanzeguige(item.keyName)'>
						<text :class='keyName==item.keyName?"x":""'>{{item.keyName}}</text>
					</view>
				</view>

				<view class="quantity">
					<view class="tit_k">
						<text>数量</text>
					</view>
					<!-- 这是数量加减 -->
					<view class="jia">
						<view style='float:left;' @tap='ji'>-</view>
						<input v-model='num' style='border:1px solid #eee;width:60rpx;float:left;margin-left:20rpx;'>
						<view style='float:left;margin-left:20rpx;' @tap='j'>+</view>
					</view>
				</view>
				<view class="uni-padding-wrap uni-common-mt bott">
					<button type="primary" @tap='queding'>确定</button>
				</view>
			</view>

		</uni-popup>
		<tabBar :currentPage='currentPage'></tabBar>
	</view>

</template>

<script>
	import tabBar from '@/components/tabBar/tabBar.vue';
	// 弹出层
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import SideSlip from '@/components/side-slip/index'
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	export default {
		data() {
			return {
				currentPage: 'cart',
				cartList: {},
				keyName:'',
				goodsPrice:'',
				goodsLogo:'',
				guige:[],
				num:0,
				goodsId:0,
				key:'',
				xuanzho:[],
				xuanzhoz:[],
				shuzu:[],
				jiage:0,
				xuan:false,
				xuanzhong:[]
			}
		},
		onShow() {
			var _this = this
			this.$https({
				url: '/api/shop/order-cart-list',
				data: {},
				dengl: false,
				success: function(res) {
					_this.jiage=0
					//修改数据结构，以使数据更好用
					_this.cartList = res.data.data.cartList
					_this.xuanzho.map(function(n,index){
						n.map(function(z,indexs){
							_this.jiage+=_this.cartList[index].specList[indexs].goodsNum*_this.cartList[indexs].specList[indexs].goodsPrice
						})
					})
				}
			})
		},
		components: {
			tabBar,
			uniPopup,
			'side-slip': SideSlip,
			uniNumberBox
		},
		methods: {
			select: function() {
				console.log(1)
			},
			openPopup(index,indexs) {
				this.$refs.popup.open()
				//获得商品id
				var _this=this
				var goodsId=this.cartList[index].goodsId
				//商品的信息
				this.$https({url:'/api/oauth/shop/mall-goods-detail',data:{goods_id:goodsId},dengl:true,success:function(res){
					_this.goodsLogo=_this.cartList[index].goodsLogo
					_this.goodsPrice=_this.cartList[index].specList[indexs].goodsPrice
					_this.num=_this.cartList[index].specList[indexs].goodsNum
					_this.keyName=_this.cartList[index].specList[indexs].specKeyName
					_this.key=_this.cartList[index].specList[indexs].id
					_this.guige=[]
					for(var iz in res.data.data.spec_price){
						_this.guige.push(res.data.data.spec_price[iz])
					}
					_this.goodsId=res.data.data.detail.goodsId
				}})
			},
			closePopup() {
				this.$refs.popup.close()
			},
			onRemove(index,indexs){
				var _this=this
				this.$https({url:'/api/shop/order-del-spec-goods',data:{goodsId:this.cartList[index].goodsId,specKey:this.cartList[index].specList[indexs].specKey},method:'post',success:function(res){
					_this.$https({url:'/api/shop/order-cart-list',data:{},success:function(res){
						_this.cartList=res.data.data.cartList
						_this.xuanzho[index].splice(indexs,1)
						_this.jiage=0
						_this.xuanzho.map(function(x,index){
							x.map(function(z,indexs){
								if(z){
									_this.jiage+=_this.cartList[index].specList[indexs].goodsNum*_this.cartList[index].specList[indexs].goodsPrice
								}
							})
						})
					}})
				}})
			},
			onQuxiao(index){
				console.log(2222)
			},
			jian:function(index,indexs){
				var _this=this
				if(this.cartList[index].specList[indexs].goodsNum>1){
					this.cartList[index].specList[indexs].goodsNum--
					this.$https({url:'/api/shop/order-update-cart',data:JSON.stringify({cartAttr:[{goodsNum:this.cartList[index].specList[indexs].goodsNum,specKey:this.cartList[index].specList[indexs].specKey}],goodsId:this.cartList[index].goodsId,status:'u'}),haeder:true,method:'post',success:function(res){
						//计算价格
						_this.jiage=0
						_this.xuanzho.map(function(n,index){
						n.map(function(z,indexs){
							if(z){
								_this.jiage+=_this.cartList[index].specList[indexs].goodsNum*_this.cartList[index].specList[indexs].goodsPrice
							}
						})
						})
					}})
				}
			},
			shuru:function(index,indexs){
				var _this=this
				this.$https({url:'/api/shop/order-update-cart',data:JSON.stringify({cartAttr:[{goodsNum:this.cartList[index].specList[indexs].goodsNum,specKey:this.cartList[index].specList[indexs].specKey}],goodsId:this.cartList[index].goodsId,status:'u'}),haeder:true,method:'post',success:function(res){
					_this.jiage=0
					_this.xuanzho.map(function(n,index){
						n.map(function(z,indexs){
							if(z){
								_this.jiage+=_this.cartList[index].specList[indexs].goodsNum*_this.cartList[index].specList[indexs].goodsPrice
							}
						})
					})
				}})
			},
			jia:function(index,indexs){
				var _this=this
				this.cartList[index].specList[indexs].goodsNum++
				this.$https({url:'/api/shop/order-update-cart',data:JSON.stringify({cartAttr:[{goodsNum:this.cartList[index].specList[indexs].goodsNum,specKey:this.cartList[index].specList[indexs].specKey}],goodsId:this.cartList[index].goodsId,status:'u'}),method:'post',haeder:true,success:function(){
					_this.jiage=0
					_this.xuanzho.map(function(n,index){
						n.map(function(z,indexs){
							if(z){
								_this.jiage+=_this.cartList[index].specList[indexs].goodsNum*_this.cartList[index].specList[indexs].goodsPrice
							}
						})
					})
				}})
			},
			xuanzeguige:function(text){
				this.keyName=text
				var _this=this
				//更改型号
				//获得当前第几个
				this.guige.map(function(n,index){
					if(text==n.keyName){
						_this.goodsPrice=n.price
					}
				})
			},
			ji:function(){
				if(this.num>1){
					this.num--
				}
			},
			j:function(){
				this.num++
			},
			queding:function(){
				var key=''
				var _this=this
				this.guige.map(function(n,index){
					if(_this.keyName==n.keyName){
						key=n.key
					}
				})
				this.$https({url:'/api/shop/order-update-spec-info',data:{goodsId:this.goodsId,newPrice:this.goodsPrice,newSpecKey:key,newSpecValue:this.keyName,cartId:this.key,goodsNum:this.num},method:'post',success:function(res){
					_this.$refs.popup.close()
					_this.$https({url:'/api/shop/order-cart-list',data:{},success:function(res){
						_this.cartList=res.data.data.cartList
					}})
				}})
			},
			xuanze:function(e){
				var arr=[]
				var _this=this
				var a=[]
				e.detail.value.map(function(n){
					if(n>-1){
						arr.push(n)
					}else{
						a.push(n)
					}
				})
				var ax=[]
				this.cartList.map(function(n,index){
					_this.$set(_this.xuanzho,index,[])
					n.specList.map(function(z,indexs){
						_this.$set(_this.xuanzho[index],indexs,false)
					})
				})
				arr.map(function(n){
					_this.xuanzho[n].map(function(z,index){
						_this.xuanzho[n][index]=true
					})
				})
				a.map(function(n){
					_this.xuanzho[n.split('-')[0]][n.split('-')[1]]=true
				})
				if(e.detail.value[e.detail.value.length-1]>-1){
					this.xuanzho[e.detail.value[e.detail.value.length-1]].map(function(n,index){
						_this.xuanzho[e.detail.value[e.detail.value.length-1]][index]=false
					})
					e.detail.value.map(function(n){
						if(!(n>-1)){
							_this.xuanzho[e.detail.value[e.detail.value.length-1]][n.split('-')[1]]=true
						}
					})
				}
				this.shuzu=a
			},
			x:function(index){
				var _this=this
				if(this.xuanzhoz[index]){
				    this.$set(this.xuanzhoz,index,false)
					this.xuanzho[index].map(function(n,indexs){
						_this.xuanzho[index][indexs]=false
					})
					this.jiage=0
					this.xuanzho.map(function(n,index){
						n.map(function(x,indexs){
							if(x){
							_this.jiage+=_this.cartList[index].specList[indexs].goodsNum*_this.cartList[index].specList[indexs].goodsPrice
							}
						})
					})
					this.xuan=false
				}else{
					this.$set(this.xuanzhoz,index,true)
					this.xuanzho[index].map(function(n,indexs){
						_this.$set(_this.xuanzho[index],indexs,true)
					})
					this.xuanzhong.push(index)
					this.xuanzhong.map(function(n,indexx){
						_this.xuanzho[indexx].map(function(z,indexxx){
							_this.xuanzho[indexx][indexxx]=true
						})
					})
					this.jiage=0
					//计算商品规格
					this.xuanzho.map(function(n,index){
						n.map(function(m,indexs){
							if(m){
								_this.jiage+=_this.cartList[index].specList[indexs].goodsNum*_this.cartList[index].specList[indexs].goodsPrice
							}
						})
					})
					var nu=0
					//判断是否全选
					this.xuanzho.map(function(n,index){
						n.map(function(c,indexs){
							if(c){
								nu++
							}
						})
					})
					var num=0
					this.xuanzho.map(function(x,index){
						num+=x.length
					})
					if(num==nu){
						this.xuan=true
					}
				}
			},
			q:function(index,indexs){
				var num=0
				var _this=this
				this.shuzu.map(function(n){
					if(index==n.split('-')[0]){
						num++
					}
				})
				if(num<this.cartList[index].specList.length){
				    this.$set(this.xuanzhoz,index,false)
					this.xuan=false
					this.jiage=0
					this.xuanzho[index][indexs]=false
					this.xuanzho.map(function(n,index){
						n.map(function(z,indexs){
							if(z){
								_this.jiage+=_this.cartList[index].specList[indexs].goodsNum*_this.cartList[index].specList[indexs].goodsPrice
							}
						})
					})
					console.log(this.xuanzho)
					// this.xuanzho[index].map(function(n,indexx){
					// 	if(indexs==indexx){
					// 		_this.xuanzho[index][indexs]=false
					// 	}
					// })
				}
				if(num==this.cartList[index].specList.length){
					this.$set(this.xuanzhoz,index,true)
					var nu=0
					this.xuanzho.map(function(n){
						n.map(function(z){
							if(z){
								nu++
							}
						})
					})
					var nua=0
					this.xuanzho.map(function(n){
						nua+=n.length
					})
					if(nu==nua){
						this.xuan=true
					}
					this.jiage=0
					this.xuanzho.map(function(x,index){
						x.map(function(c,indexs){
							_this.jiage+=_this.cartList[index].specList[indexs].goodsPrice*_this.cartList[index].specList[indexs].goodsNum
						})
					})
				}
			},
			quanxuan:function(){
				var _this=this
				if(this.xuan){
					this.xuan=false
					this.xuanzho.map(function(n,index){
						_this.xuanzhoz[index]=false
						n.map(function(x,indexs){
							_this.xuanzho[index][indexs]=false
						})
					})
					this.jiage=0
					return false
				}
				if(this.xuan==false){
					this.xuan=true
					this.cartList.map(function(n,index){
						_this.xuanzhoz[index]=true
						_this.$set(_this.xuanzho,index,[])
						n.specList.map(function(x,indexs){
							_this.$set(_this.xuanzho[index],indexs,true)
						})
					})
					this.jiage=0
					this.xuanzho.map(function(n,index){
						n.map(function(x,indexs){
							_this.jiage+=_this.cartList[index].specList[indexs].goodsNum*_this.cartList[index].specList[indexs].goodsPrice
						})
					})
				}
			},
			tiaozhuan:function(){
				var ap=[]
				var _this=this
				if(this.xuanzho.length==0){
					uni.showToast({
						title:'请选择商品'
					})
				}else{
				this.xuanzho.map(function(n,index){
					_this.cartList[index].name=_this.cartList[index].storeShopDTO.shopName
					n.map(function(x,indexx){
						if(x){
							_this.cartList[index].specList[indexx].xuanzhong=true
							_this.cartList[index].cartAttr=_this.cartList[index].specList
							_this.cartList[index].specList[indexx].goodsLogo=_this.cartList[index].goodsLogo
							_this.cartList[index].specList[indexx].goodsId=_this.cartList[index].goodsId
							_this.cartList[index].specList[indexx].shopPrice=_this.cartList[index].specList[indexx].goodsPrice
						}
					})
				})
				uni.navigateTo({
					url:'orderForm/orderForm?goodsId=1'+'&cartAttr='+JSON.stringify({cartAttr:this.cartList})+'&dingdan=1'
				})
				}
			}
		}
	}
</script>

<style lang="scss">
	.bcg{
		background-color: #eeeeee;
	}
	.top {
		width: 750upx;
		margin: 0 auto;
		overflow: hidden;
		background-color: #FFFFFF;
		// border-bottom: 1px solid #e5e5e5;

		.textBox {
			padding-left: 40%;

			text {
				font-size: 38upx;
				color: #333;
				float: left;
				line-height: 90upx;
			}
		}

		.imgBox {
			float: right;
			padding: 30upx;

			image {
				width: 36upx;
				height: 36upx;
			}
		}

		.spanBox {
			float: right;
			padding-right: 20upx;

			text {
				line-height: 90upx;
				font-size: 28upx;
				color: #666;
			}
		}
	}

	.radios {
		width: 710upx;
		padding: 20upx;
		overflow: hidden;
		padding-top: 20upx;
		overflow: hidden;
		border-bottom: 1px solid #e5e5e5;
		border-top: 1px solid #e5e5e5;

		text {
			font-size: 28upx;
			color: #333;
			line-height: 40upx;
			padding-right: 10upx;
		}

		image {
			width: 12upx;
			height: 20upx;
		}
	}
	.box{
				background-color: #FFFFFF;
				overflow:hidden;
	}

	.xinxi {
		overflow: hidden;
		width: 710upx;
		// padding: 20upx;
		border-bottom: 1px dotted #eee;

		.radi {
			float: left;
			margin-right: 20upx;
			margin-top: 10%;
			margin-left: 20rpx;
		}

		.imgBox_a {
			float: left;
			padding-top: 20upx;

			image {
				width: 215upx;
				height: 160upx;
			}
		}

		.txt_c {
			float: right;
			width: 54%;
			padding-left: 20upx;

			.title {
				padding-top: 10upx;

				text {
					font-size: 30upx;
					line-height: 30upx;
					color: #333;
				}
			}

			.spec {
				font-size: 26upx;
				line-height: 40upx;
				color: #666;
			}

			.radColor {
				float: left;
				color: #ff0000;
				font-size: 32upx;
			}

			.jia {
				float: right;
				margin-right: 36rpx;
				view{
					float:left;
					margin-left:20rpx;
				}
				input{
					width:60rpx;
					border:1px solid #ddd;
					float:left;
					margin-left:20rpx;
				}
				text {
					font-size: 20upx;
					color: #666;
				}
			}
		}
	}

	.lose {
		.xinxi {
			width: 750upx;
			padding: 0upx;
			padding-bottom: 20upx;
		}

		.biaot {
			border-bottom: 1px solid #ccc;
			font-size: 30upx;
			line-height: 80upx;
			padding-left: 20upx;

			.dele {
				float: right;
				padding-right: 20upx;

				text {
					font-size: 26upx;
					color: #666;
					line-height: 50upx;
				}
			}
		}

		.radColor {
			text {
				font-size: 30upx;
				color: #999;
			}
		}

		.imgBox_a {
			padding-left: 20upx;
		}

		.txt_c {
			float: left;
			width: 470upx;
			padding-left: 20upx;
		}
	}

	.spec {
		overflow: hidden;

		text {
			float: left;
			line-height: 40upx;
		}
	}

	.tu {
		float: left;

		image {
			width: 20upx;
			height: 12upx;
		}
	}

	.Boxs {
		background-color: #FFFFFF;
		width: 750upx;
		padding-bottom: 100upx;
		margin-top: 20rpx;
	}

	.bottom {
		width: 750upx;
		height: 90upx;
		border-top: 1px solid #ccc;
		position: fixed;
		background-color: #fff;
		bottom: 100upx;
		left: 0upx;

		.radis {
			float: left;
			padding-top: 20upx;

			text {
				font-size: 28upx;
				color: #666;
			}
		}

		.leftA {
			float: left;
			padding-left: 20upx;

			text {
				font-size: 28upx;
				color: #333;
				line-height: 90upx;

				text {
					font-size: 28upx;
					color: #ff0000;
				}
			}
		}

		.rightA {
			float: right;
			width: 260upx;
			height: 100%;
			text-align: center;
			background-color: #2b5cff;

			text {
				font-size: 30upx;
				color: #fff;
				line-height: 90upx;

			}
		}
	}

	uni-popup {
		width: 30upx;
		height: 30upx;
		border: 1px solid #fff;
		background-color: #fff;
	}

	.tanchu {
		button {
			position: absolute;
			top: 10upx;
			right: 10upx;
			z-index: 9999;
			background: none !important;
			border: none !important;
		}

		button:after {
			border: none !important;
		}
	}

	.neira {
		width: 695upx;
		height: 800upx;
		background-color: #fff;
		border-radius: 20upx 20upx 0 0;
		position: relative;
		padding: 30upx;
		overflow: hidden;

		.imgs {
			float: left;

			image {
				width: 168upx;
				height: 168upx;
			}
		}

		.text_e {
			float: left;
			padding: 20upx;

			.price {
				padding-top: 10upx;

				text {
					font-size: 40upx;
					font-weight: bold;
					line-height: 80upx;
					color: #ec2334;
					line-height: 5upx;
				}
			}

			.speci {
				padding-top: 10upx;

				text {
					font-size: 28upx;
					color: #999;
				}
			}
		}

		.color {
			width: 100%;
			overflow: hidden;
			padding-top: 30upx;

			.tit_k {
				text {
					color: #999;
					font-size: 28upx;
					line-height: 30upx;
				}
			}

			.xiang {
				float: left;
				margin-top: 20upx;
				margin-right: 20upx;

				text {
					padding: 10upx 30upx;
					float: left;
					background-color: #f0f0f0;
					font-size: 28upx;
					color: #333;
					border: 1px solid #f0f0f0;
					border-radius: 5upx;
				}
			}

			.xiang_on {
				float: left;
				margin-top: 20upx;
				margin-right: 20upx;

				text {
					padding: 10upx 30upx;
					float: left;
					border: 1px solid #2b5cff;
					background-color: #fff;
					font-size: 28upx;
					color: #2b5cff;
					border-radius: 5upx;
				}
			}
		}

		.set {
			width: 100%;
			overflow: hidden;
			padding-top: 30upx;

			.tit_k {
				text {
					color: #999;
					font-size: 28upx;
					line-height: 30upx;
				}
			}

			.xiang {
				float: left;
				margin-top: 20upx;
				margin-right: 20upx;

				text {
					padding: 10upx 30upx;
					float: left;
					background-color: #f0f0f0;
					font-size: 28upx;
					color: #333;
					border: 1px solid #f0f0f0;
					border-radius: 5upx;
				}
			}

			.xiang_on {
				float: left;
				margin-top: 20upx;
				margin-right: 20upx;

				text {
					padding: 10upx 30upx;
					float: left;
					border: 1px solid #2b5cff;
					background-color: #fff;
					font-size: 28upx;
					color: #2b5cff;
					border-radius: 5upx;
				}
			}
		}

		.quantity {
			width: 100%;
			overflow: hidden;
			padding-top: 30upx;

			text {
				float: left;
				color: #999;
				font-size: 28upx;
			}

			.jia {
				float: right;
			}
		}
	}
	.neira .set .xiang .x{
		background:#007aff;
		color:#fff;
	}

	.bott {
		width: 670upx;
		height: 80upx;
		background-color: #007AEE;
		text-align: center;
		position: fixed;
		bottom: 40upx;
		border-radius: 40upx !important;
		left: 40upx;

		button {
			position: initial;
			border-radius: 40upx !important;
			font-family: Microsoft YaHei;
		}

	}
</style>
