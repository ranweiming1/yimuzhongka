<template>
	<view>
		
		<!-- tab切换样式  start-->
		<view :class="shixiao==0?'yes':'none'" @tap='keshiyong'>
			<text>可使用</text>
			<!-- 下图为选中状态下划线 -->
			<view class="imgBox" v-if='shixiao==0'>
				<image src="../../../static/icon_09.png" mode=""></image>
			</view>
		</view>
		
		<view :class="shixiao==1?'yes':'none'" @tap='yishixiao'>
			<text>已失效</text>
			<view class='imgBox' v-if='shixiao==1'>
				<image src='../../../static/icon_09.png'></image>
			</view>
		</view>
		<!-- tab切换样式  end-->
		
		
		<!-- 可使用状态优惠券 -->
		<view class="valid " v-if='shixiao==0'>
			<view v-if='youhuiquan.length==0' style='box-shadow:none;'>
				<image src='../../../static/y.png' style='width:300rpx;height:150rpx;display:block;margin:20rpx auto;'></image>
				<view style='text-align:center;'>暂无可用优惠券</view>
			</view>
			<view v-for='item in youhuiquan'>
			<view class="imgBox" style='position:relative;'>
				<image src="../../../static/icon_27.png" mode=""></image>
				<view class="sum" style='width:200rpx;position:absolute;height:210rpx;top:0;left:0;'>
					<text>{{item.couponDTO.money?item.couponDTO.money:''}}<text>元</text></text>
					<view class="tianjan">
						<text>满{{item.couponDTO.condition?item.couponDTO.condition:''}}可用</text>
					</view>
				</view>
			</view>
			<view class="float">
				<view class="h2">
					<text>满{{item.couponDTO.condition?item.couponDTO.condition:''}}-{{item.couponDTO.money?item.couponDTO.money:''}}立减券</text>
				</view>
				<view class="p">
					<text>{{item.couponDTO.name?item.couponDTO.name:''}}</text>
				</view>
				<view class="span">
					<text>使用时间：{{item.couponDTO.useStartTime.split(' ')[0]}}-{{item.couponDTO.useEndTime.split(' ')[0]}}</text>
				</view>
			</view>
			
			<view class="bott">
				<text @tap='shiyong(item.couponDTO.id,item.couponDTO.money)'>使用</text>
			</view>
			</view>
		</view>
		
		<!-- 不可使用状态 -->
		
		<view class="cannot" v-if='shixiao==1' style='height:auto;'>
			<view v-if='youhuiquan.length==0' style='box-shadow:none;'>
				<image src='../../../static/y.png' style='width:300rpx;height:150rpx;display:block;margin:20rpx auto;'></image>
				<view style='text-align:center;'>暂无可用优惠券</view>
			</view>
			<view v-for='item in youhuiquan'>
			<view class="imgBox" style='position:relative;'>
				<image src="../../../static/icon_28.png" mode=""></image>
				<view class="sum" style='position:absolute;left:0;top:0;width:200rpx;height:210rpx;'>
					<text>{{item.couponDTO.money?item.couponDTO.money:''}}<text>元</text></text>
					<view class="tianjan">
						<text>满{{item.couponDTO.condtion?item.couponDTO.condtion:''}}可用</text>
					</view>
				</view>
			</view>
			<view class="float">
				<view class="h2">
					<text>满{{item.couponDTO.condition?item.couponDTO.condition:''}}-{{item.couponDTO.money?item.couponDTO.money:''}}立减券</text>
				</view>
				<view class="p">
					<text>{{item.couponDTO.name?item.couponDTO.name:''}}</text>
				</view>
				<view class="span">
					<text>使用时间：{{item.couponDTO.useStartTime}}-{{item.couponDTO.useEndTime}}</text>
				</view>
			</view>
			
			<view class="bott">
				<text>已使用</text>
			</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shixiao:0,
				goodsId:'',
				cartAttr:'',
				zhid:'',
				youhuiquan:[],
				dingdan:'',
				shopId:0,
				y:'',
				id:'',
				money:'',
				jine:''
			}
		},
		methods: {
			keshiyong:function(){
				this.shixiao=0
				this.youhui()
			},
			yishixiao:function(){
				this.shixiao=1
				this.youhui()
			},
			//获取优惠券
			youhui:function(){
				var _this=this
				this.youhuiquan=[]
				this.$https({url:'/api/shop/myCoupon-list',data:{type:this.shixiao},success:function(res){
					_this.youhuiquan=res.data.data?res.data.data:[]
				}})
			},
			shiyong:function(id,money){
				var aum=0
				var _this=this
				if(this.y){
				this.y.map(function(n){
					if(_this.shopId==n.shopId){
						n.money=money
						n.couponId=id
					}
				})
				uni.navigateTo({
					url:'../../cart/orderForm/orderForm?goodsId='+this.goodsId+'&cartAttr='+this.cartAttr+'&zhid='+this.zhid+'&id='+id+'&money='+money+'&dingdan='+this.dingdan+'&shopId='+this.shopId+'&coupid='+this.id+'&y='+JSON.stringify(this.y)
				})
				}else{
					uni.reLaunch({
						url:'../../index/index'
					})
				}
			}
		},
		onLoad:function(options){
			var _this=this
			//获取优惠券
			this.$https({url:'/api/shop/myCoupon-list',data:{type:this.shixiao},success:function(res){
				res.data.data=res.data.data?res.data.data:[]
				var arr=[]
				res.data.data.map(function(n){
					if(n.condition<=options.jine){
						arr.push(n)
					}
				})
				_this.youhuiquan=options.jine?arr:res.data.data
				if(options.shopId){
					_this.$https({url:'/api/oauth/shop/store-coupon-list',data:{shopId:options.shopId},dengl:true,success:function(res){
						res.data.data.map(function(n){
							var obj={}
							obj.couponDTO=n
							if(options.jine){
							if(n<=options.jine){
							_this.youhuiquan.push(obj)
							}
							}else{
								_this.youhuiquan.push(obj)
							}
						})
					}})
				}
			}})
			if(options.goodsId){
				this.goodsId=options.goodsId
				this.cartAttr=options.cartAttr
				this.zhid=options.zhid
				this.dingdan=options.dingdan
				this.shopId=options.shopId
				this.id=options.id
				this.money=options.money
				this.y=JSON.parse(options.y)
			}
			
		}
	}
</script>

<style lang="scss">
    .yes{
		width: 375upx;
		text-align: center;
		float: left;
		padding-bottom: 20upx;
		text{
			width: 32upx;
			color: #333;
			line-height: 80upx;
		}
		.imgBox{
			image{
				width: 34upx;
				height: 6upx;
				display: block;
				margin: 0 auto;
			}
		}
	}
	.none{
		width: 375upx;
		text-align: center;
		float: left;
		
		text{
			width: 32upx;
			color: #999;
			line-height: 80upx;
		}
	}
    .valid{
		overflow: hidden;
		position: relative;
		width: 710upx;
		margin: 20upx;
		border-radius: 10upx;
		background-color: #fff;
		padding-bottom:20rpx;
		padding-right:20rpx;
		>view{
			overflow:hidden;
			box-shadow:0 0 5px #ccc;
			margin-top:50rpx;
		}
		.imgBox{
			float: left;
			padding-right: 20upx;
			image{
				width:200upx ;
				height: 210upx;
				display: block;
			}
			.sum{
				text-align: center;
				overflow:hidden;
				>text{
					font-size: 60upx;
					color: #fff;
					margin-top:20rpx;
					display:block;
					text{
						font-size: 30upx;
						color: #fff;
					}
				}
				.tianjan{
					text{
						color: #fff;
						font-size: 20upx;
						line-height: 50upx;
					}
					
				}
			}
		}
		.float{
			float: left;
			width: 50%;
			.h2{
				font-size: 32upx;
				color: #333;
				line-height: 50upx;
				padding-top: 30upx;
			}
			.p{
				font-size: 24upx;
				color: #666;
				line-height: 50upx;
			}
			.span{
				font-size: 20upx;;
				color: #999;
				line-height: 30upx;
			}
		}
		
		.bott{
			float: right;
			color: #fff;
			margin: 80upx 20upx;
			padding:10upx 20upx;
			border-radius: 30upx;
			font-size: 22upx;
			background: linear-gradient(to right, #ff9429 , #ff6759);
		}
	}
	
	// 不可使用样式
	.cannot{
		overflow: hidden;
		position: relative;
		width: 710upx;
		height: 205upx;
		margin: 20upx;
		border-radius: 10upx;
		background-color: #fff;
		>view{
			overflow:hidden;
			box-shadow:0 0 5px #ccc;
			margin-top:50rpx;
		}
		.imgBox{
			float: left;
			padding-right: 20upx;
			image{
				width:200upx ;
				height: 205upx;
				display: block;
			}
			.sum{
				position: absolute;
				top: 15%;
				left:6%;
				text-align: center;
				text{
					font-size: 60upx;
					color: #fff;
					text{
						font-size: 30upx;
						color: #fff;
					}
				}
				.tianjan{
					text{
						color: #fff;
						font-size: 20upx;
						line-height: 50upx;
					}
					
				}
			}
		}
		.float{
			float: left;
			width: 48%;
			.h2{
				font-size: 32upx;
				color: #333;
				line-height: 50upx;
				padding-top: 30upx;
			}
			.p{
				font-size: 24upx;
				color: #666;
				line-height: 50upx;
			}
			.span{
				font-size: 20upx;;
				color: #999;
				line-height: 30upx;
			}
		}
		
		.bott{
			float: right;
			color: #fff;
			margin: 80upx 20upx;
			padding:10upx 20upx;
			border-radius: 30upx;
			font-size: 22upx;
			background:#cccccc;
		}
	}
</style>
