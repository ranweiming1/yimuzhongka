<template>
	<view class="">
		<view class="hahah list uni-flex uni-column" v-for="(item , index) in 3" @tap="detail(item.goodsId)">
			<view class="content ">
				<view class="imgBox">
					<image src="../../../static/img_03.jpg" mode="widthFix"></image>
				</view>
				<view class="txt_a">
					<text class="span_a" v-if="item.selfStatus=='Y'">自营</text>
					<text>{{item.goodsName}}</text>
					<view class="txt_aa" v-for="(items,indexs) in 2">
						<text>满100-20元</text>
					</view>
					<view class="txt_aas">
						<text>税后价：<text>￥{{item.marketPrice?item.marketPrice:'暂无价格'}}</text></text>
						<text>销量：222</text>
					</view>

				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				lList:{}
			}
		},
		onLoad() {
			var _this=this
			this.$https({
				url:'/api/user/goods-browsing-history',
				data:{},
				dengl:false,
				success:function(res){
					_this.lList=res.data
					console.log(res.data.data)
				}
			})
		}
	}
</script>

<style lang="scss">
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
</style>
