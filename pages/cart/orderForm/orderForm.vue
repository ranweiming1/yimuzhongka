<template>
	<view>

		<view class="siteBox">
			<!-- 无地址样式 -->
			<view class="noneBox">
				<text @tap='tiaozhuan'>+ 添加收货地址</text>
			</view>

			<!-- 已设置地址样式 -->
			<view class="content" @tap='qiehuandizhi'>
				<view style='overflow:hidden;'>
					<view class="nome">
						<text>{{dizhi.username}}</text>
					</view>
					<view class="call">
						<text>{{dizhi.phone}}</text>
					</view>
					<!-- 默认地址标签样式 -->
					<view class="label" v-if='dizhi.isDefault'>
						<text>默认</text>
					</view>
				</view>
				<view class="p">
					<text>{{dizhi.address}}</text>
				</view>
			</view>

			<view class="imgBox">
				<image src="../../../static/icon_26.png" mode="" style='width:20rpx;height:20rpx;margin-top:20rpx;float:right;'></image>
			</view>
		</view>

		<!-- 订单信息 -->
		<view class="xinxi">
			<view class="biaot">
				<text>订单信息</text>
			</view>
			<view v-for='(item,index) in cartAttr'>
				<view style='padding:10rpx;background:#ddd;margin-top:10rpx;'>{{item.name}}</view>
				<view v-for='(items,indexs) in item.cartAttr' style='margin-top:10rpx;border:1px solid #eee;overflow:hidden;'>
				<view class="imgBox_a">
					<image :src="items.goodsLogo" mode=""></image>
				</view>
				<view class="txt_c">
					<view class="title">
						<text>{{items.goodsName}}</text>
					</view>
					<view class="spec">
						<text>已选：{{items.specKeyName}}</text>
					</view>
					<!-- <view class="radColor">
						<text>{{items.integral}}积分</text>
					</view> -->

					<!-- 这是数量加减 -->
					<view class="jia">
						<text @tap='shangpinj(index,indexs)'>-</text>
						<input v-model='items.goodsNum' @blur='shuzi' style='width:50px;border:1px solid #eee;float:left;margin-left:10px;'>
						<text @tap='zengjia(index,indexs)'>+</text>
					</view>
				</view>

		        <view class="basic">
			        <view class="left_a">
				        <text>运费</text>
			        </view>
			        <view class="right_a">
				        <view class="img_a">
					        <image src="../../../static/icon_26.png" mode=""></image>
				        </view>
				        <text>￥{{items.kuaidi}}</text>
			        </view>
		        </view>
				</view>
		<view class="uni-form-item uni-column">
			<view class="title"><text>给卖家备注</text></view>
			<input class="uni-input" name="input" v-model='item.userNote' placeholder="添加备注" />
		</view>


		<view class="basic">
			<view class="left_a">
				<text>优惠券</text>
			</view>
			<view class="right_a" @tap='youhuiquan(item.shopId)'>
				<view class="img_a">
					<image src="../../../static/icon_26.png" mode=""></image>
				</view>
				<text>已抵扣<text>￥{{youhui[index].money?youhui[index].money:0}}</text></text>
			</view>
		</view>
		</view>
		</view>
		<!-- <view class="basic">
			<view class="left_a">
				<text>支付方式</text>
			</view>
			<view class="right_a">
				<view class="img_l">
					<image src="../../../static/wx.png" mode=""></image>
				</view>
				<view class="img_a">
					<image src="../../../static/icon_26.png" mode=""></image>
				</view>
				<text>微信安全支付</text>
			</view>
		</view> -->

		<view class="basic aa">
			<view class="left_a">
				<text>商品金额</text>
			</view>
			<view class="right_a">
				<view class="img_a">
					<image src="../../../static/icon_26.png" mode=""></image>
				</view>
				<text>￥{{shangpin}}</text>
			</view>
		</view>
		<view class="basic aa">
			<view class="left_a">
				<text>优惠券减免</text>
			</view>
			<view class="right_a">
				<view class="img_a">
					<image src="../../../static/icon_26.png" mode=""></image>
				</view>
				<text>-￥{{moneys}}</text>
			</view>
		</view>
		<view class="basic aa ssa">
			<view class="left_a">
				<text>运费</text>
			</view>
			<view class="right_a">
				<view class="img_a">
					<image src="../../../static/icon_26.png" mode=""></image>
				</view>
				<text>￥{{yunfei}}</text>
			</view>
		</view>

		<!-- 底部 -->
		<view class="bottom">
			<view class="leftA">
				<view class="ppp">
					<text>合计：<text>￥{{heji}}</text></text>
				</view>
				<view class="yunf">
					<text>(含运费)</text>
				</view>
			</view>
			<view class="rightA" @tap='tanchuang'>
				<text>结 算</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsId: '',
				cartAttr: [],
				dizhi: {},
				yunfei:0,
				shangpin:0,
				heji:0,
				moneys:0,
				id:'',
				dingdan:'',
				//保存优惠券
				youhui:[],
				shopId:0
			}
		},
		methods: {
			onLoad: function(options) {
				var _this = this
				if (options.goodsId) {
					this.goodsId = options.goodsId
					this.cartAttr = JSON.parse(options.cartAttr).cartAttr
					if(options.dingdan==1){
						this.cartAttr.map(function(n,index){
							n.cartAttr.map(function(z,indexs){
								if(!z.xuanzhong){
									_this.cartAttr[index].cartAttr.splice(indexs,1)
								}
							})
						})
					}
					if (options.zhid) {
						this.dizhi = JSON.parse(options.zhid)
					}
					this.moneys=options.money
					this.id=options.id
					this.dingdan=options.dingdan
					if(options.y){
						this.youhui=JSON.parse(options.y)
					}
					if(!options.y){
					this.cartAttr.map(function(n){
						_this.youhui.push({shopId:n.shopId})
					})
					}
					var arr=[]
					if(options.dingdan==2){
					this.cartAttr.map(function(n){
						n.cartAttr1={}
						var obj={}
						n.cartAttr1.goodsNum=n.goodsNum
						n.cartAttr1.specKeyName=n.specKeyName
						n.cartAttr1.goodsLogo=n.goodsLogo
						n.cartAttr1.integral=n.integral
						n.cartAttr1.goodsName=n.goodsName
						n.cartAttr1.kuaidi=n.kuaidi
						n.cartAttr1.specKey=n.specKey
						n.cartAttr1.shopPrice=n.shopPrice
						n.cartAttr1.goodsId=n.goodsId
						n.cartAttr=[n.cartAttr1]
					})
					}else{
						console.log(JSON.parse(options.cartAttr))
					}
					this.cartAttr.map(function(n){
						n.cartAttr.map(function(z){
							console.log(z.shopPrice,z.goodsNum)
							_this.shangpin+=z.shopPrice*z.goodsNum
						})
					})
					this.shopId=options.shopId
					//判断选的哪个店铺的优惠券
					this.cartAttr.map(function(n,index){
						if(options.shopId==n.shopId){
							_this.youhui[index].couponId=options.id
							_this.youhui[index].moneys=options.money
						}
					})
				}
				if (!options.zhid) {
					//获取地址列表
					this.$https({
						url: '/api/user/my-address',
						data: {},
						success: function(res) {
							res.data.data.map(function(n) {
								if (n.isDefault == 1) {
									//默认地址
									_this.dizhi = n
								}
							})
						}
					})
				}
				//计算运费
				this.cartAttr.map(function(n){
					n.cartAttr.map(function(z){
						_this.yunfei+=z.kuaidi
					})
				})
				this.heji=this.yunfei+this.shangpin
			},
			tanchuang: function() {
				var arr=[]
				var a=[]
				var _this=this
				this.cartAttr.map(function(n){
					n.cartAttr.map(function(z){
						a.push(z.goodsId)
					})
				})
				this.cartAttr.map(function(n){
					n.cartVO={}
					n.cartVO.cartAttr=[]
					n.cartAttr.map(function(z){
						var obj={}
						obj.goodsNum=z.goodsNum
						obj.specKey=z.specKey
						n.cartVO.cartAttr.push(obj)
					})
					n.cartVO.goodsId=n.goodsId
					n.cartVO.shopId=n.shopId
					n.cartVO.status='a'
					_this.youhui.map(function(s){
						if(s.shopId==n.shopId){
							n.couponId=s.couponId
						}
					})
					n.goodsIds=a.join(',')
				})
				this.cartAttr.map(function(n){
					arr.push(n.shopId)
				})
				var arr=arr.join(',')
				//提交订单
				this.$https({url:'/api/shop/order-order-submitOrder',data:JSON.stringify({addressId:''+this.dizhi.id,orderVoList:this.cartAttr,orderFrom:+this.dingdan,shopIds:arr}),method:'post',haeder:true,success:function(res){
					
				}})
				uni.showModal({
					title: '支付成功',
					content: '您已成功购买该商品\n感谢您的支持',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					},




				});
			},
			tiaozhuan: function() {
				uni.navigateTo({
					url: '../../user/leagu/siteList/address?goodsId='+this.godsId+'&cartAttr='+JSON.stringify({cartAttr:this.cartAttr})+'&zhid='+JSON.stringify(this.dizhi)+'&id='+this.id+'&money='+this.moneys+'&dingdan='+this.dingdan+'&shopId='+this.shopId+'&y='+JSON.stringify(this.youhui)
				})
			},
			qiehuandizhi: function() {
				//填充信息
				uni.navigateTo({
					url: '../../user/leagu/siteList/siteList?goodsId=' + this.goodsId + '&cartAttr=' + JSON.stringify({cartAttr:this.cartAttr})+'&zhid='+JSON.stringify(this.dizhi)+'&id='+this.id+'&money='+this.moneys+'&dingdan='+this.dingdan+'&shopId='+this.shopId+'&y='+JSON.stringify(this.youhui)
				})
			},
			youhuiquan:function(id){
				uni.navigateTo({
					url:'../../user/sale/sale?goodsId='+this.goodsId+'&cartAttr='+JSON.stringify({cartAttr:this.cartAttr})+'&zhid='+JSON.stringify(this.dizhi)+'&id='+this.id+'&money='+this.moneys+'&shopId='+id+'&dingdan='+this.dingdan+'&y='+JSON.stringify(this.youhui)
				})
			},
			shangpinj:function(index,indexs){
				if(this.cartAttr[index].cartAttr[indexs].goodsNum>1){
				    this.cartAttr[index].cartAttr[indexs].goodsNum--
					this.jisuanjine()
				}
			},
			zengjia:function(index,indexs){
				this.cartAttr[index].cartAttr[indexs].goodsNum++
				this.jisuanjine()
			},
			shuzi:function(){
				this.shangpin=0
				var _this=this
				this.cartAttr.map(function(z){
					z.cartAttr.map(function(x){
						_this.shangpin+=x.shopPrice*x.goodsNum
					})
				})
			},
			jisuanjine:function(){
				var _this=this
				_this.shangpin=0
				this.cartAttr.map(function(n){
					n.cartAttr.map(function(z){
					_this.shangpin+=z.shopPrice*z.goodsNum
					})
				})
				this.heji=this.yunfei+this.shangpin
			}
		}
	}
</script>

<style lang="scss">
	.noneBox {
		width: 250upx;
		text-align: center;
		margin: 0 auto;
		padding-top: 20upx;
		padding-bottom: 40upx;
		padding-bottom: 20upx;

		text {
			display: block;
			border: 1px solid #007AFF;
			color: #007AFF;
			background-color: #fff;
			padding: 15upx 20upx;
			font-size: 26upx;
			border-radius: 10upx;
			margin-bottom: 20upx;
		}
	}

	.siteBox {
		width: 710upx;
		height: initial;
		padding: 20upx;
		background-color: #fff;
		overflow: hidden;
		border-bottom: 1px solid #ccc;

		.content {
			float: left;
			width: 80%;

			.nome {
				float: left;
				font-size: 30upx;
				color: #333;
				padding-right: 10upx;
			}

			.call {
				float: left;
				font-size: 24upx;
				color: #666;
				line-height: 40upx;
				padding-right: 10upx;
			}

			.label {
				float: left;
				font-size: 18upx;
				color: #ff6633;
				padding: 5upx;
				margin-top: 5upx;
				background-color: #fdf1ec;
			}

			.p {
				font-size: 26upx;
				color: #333;
				line-height: 40upx;
			}
		}
	}

	.xinxi {
		overflow: hidden;
		width: 710upx;
		padding: 20upx;
		border-bottom: 1px dotted #ccc;

		.biaoyi {
			text {
				font-size: 28upx;
			}
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
			float: left;
			width: 460upx;
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

				text {
					font-size: 26upx;
					color: #666;
					float:left;
					margin-left:10px;
				}
			}
		}
	}

	.basic {
		width: 710upx;
		background-color: #fff;
		overflow: hidden;
		padding: 20upx;
		padding-bottom: 10upx;

		.left_a {
			float: left;

			text {
				font-size: 28upx;
				color: #333;
				line-height: 50upx;
			}
		}

		.right_a {
			float: right;
			padding-right: 10upx;

			text {
				font-size: 28upx;
				float: right;
				line-height: 50upx;

				text {
					color: #ff670c;
				}
			}

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

	.uni-column {
		background-color: #fff;
		overflow: hidden;
		border-bottom: 20upx solid #f7f7f7;

		.title {
			float: left;
			padding-left: 20upx;

			text {
				line-height: 90upx;
				font-size: 28upx;
			}
		}

		.uni-input {
			float: left;
			padding-top: 27upx;
			font-size: 28upx;
			padding-left: 20upx;
			font-family: Microsoft YaHei;
		}

		.imgBox {
			float: left;
			padding-top: 30upx;
			padding-left: 20upx;

			image {
				width: 175upx;
				height: 175upx;
			}
		}
	}

	.aa {
		border-bottom: 1px dotted #ccc;
	}

	.ssa {
		margin-bottom: 100upx;
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

			.ppp {
				float: left;

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

			.yunf {
				float: left;
				padding-left: 10upx;

				text {
					line-height: 90upx;
					font-size: 24upx;
					color: #999;
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
</style>
