<template>
	<view class="bodys">
	<!-- 	<view class="">
			<view class="radios">
				<text>店铺名</text>
				<view class="guanb">
					<text></text>
				</view>
			</view>
		</view> -->
		<view class="listBox" v-for="(item,index) in saleList">
			<view class="radios">
				<!-- 店铺名称待确认 -->
				<text>店铺名称</text>
				<view class="guanb">
					<text>{{item.approvalStatus==0?'审核已通过':item.approvalStatus==2?'待卖家同意':'卖家已拒绝'}}</text>
				</view>
			</view>
			<view class="xinxi">
				<view class="xinxi1" @tap="detail(item.orderId)">
					<view class="imgBox_a">
						<image :src="item.goodsImg" mode=""></image>
					</view>
					<view class="txt_c">
						<view class="title">
							<text>{{item.goodsName}}</text>
						</view>
						<view class="spec">
							<text>已选：＂{{item.specValue}}＂</text>
						</view>
						<view class="radColor">
							<text>{{item.goodsFee?'￥'+item.goodsFee+'.00':'0'}}</text>
						</view>

						<!-- 数量 -->
						<view class="jia">
							<text>X{{item.buyNum}}</text>
						</view>
					</view>

				</view>
				<view class="zongj">
					<text>{{item.refundDesc}}</text>
				</view>
			</view>
		</view>
		<view v-if='saleList.length==0' style='text-align:center;margin-top:100rpx;'>暂无订单</view>
	</view>

</template>

<script >
	export default{
		data(){
			return{
				saleList:[]
			}
		},
		onLoad() {
			console.log(1111)
			var _this=this
			this.$https({
				url:'/api/shop/order-refund-list',
				dengl:false,
				haeder:true,
				data:{},
				method:'post',
				success(res){
					_this.saleList=res.data.data
					console.log(res.data.data)
				}
			})
		}
	}
</script>

<style lang="scss">

	.listBox{
		border-top: 20upx solid #f7f7f7;
	}
	.xinxi {
		overflow: hidden;
		width: 710upx;
		padding: 20upx;
		border-bottom: 20upx solid #f7f7f7;
		
	
		.xinxi1 {
			overflow: hidden;
			width: 710upx;
			// padding: 20upx;
			// border-bottom: 20upx solid #f7f7f7;
		}
	
		.imgBox_a {
			float: left;
			padding-top: 20upx;
	
			image {
				width: 215upx;
				height: 160upx;
			}
		}
	
		.zongj {
			// float: right;
			background-color: #f7f7f7;
			border-radius: 25rpx;
			margin-top: 10upx;
			padding:8rpx 20rpx;
	
			text {
				font-size: 26upx;
				// padding-left: 20rpx;
				color: #333;
				line-height: 50rpx;
			}
		}
	
		.txt_c {
			float: left;
			width: 470upx;
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
					font-size: 20upx;
					color: #666;
				}
			}
		}
	}
	
	.radios {
		width: 710upx;
		padding: 20upx;
		overflow: hidden;
		padding-top: 10upx;
		overflow: hidden;
		border-bottom: 1px solid #f7f7f7;
	
		text {
			font-size: 28upx;
			color: #333;
			line-height: 40upx;
			padding-right: 10upx;
		}
	
		image {
			width: 12upx;
			height: 26upx;
		}
	}
	
	.guanb {
		float: right;
	
		text {
			font-size: 28upx;
			color: #ff0000;
		}
	}
	
</style>
