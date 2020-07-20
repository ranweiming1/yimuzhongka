<template>
	<view>
		<view class="top toubu">
			<view class="textBox">
				<text>购物车(02)</text>
			</view>
			<!-- 无消息通知状态 -->
			<view class="imgBox">
				<image src="../../static/icon_36.png" mode=""></image>
			</view>
			<view class="spanBox">
				<text>编辑</text>
			</view>
		</view>

		<!-- 空购物车 -->
		<view class="empty">
			<view class="img_h">
				<image src="../../static/icon_38.png" mode=""></image>
			</view>
			<view class="text_h">
				<text>这里还是空的</text>
			</view>
		</view>
		
		<!-- 热门推荐 -->
		<view class="biaot">
			<text>热门推荐</text>
			<view class="dele">
				<text>更多</text>
			</view>
		</view>
		
        <view class="hahah list uni-flex uni-column" v-for="(i , n) in 4">
        	<view class="content ">
        		<view class="imgBox">
        			<image src="../../static/img_02.jpg" mode="widthFix"></image>
        		</view>
        		<view class="txt_a">
        			<text class="span_a">自营</text>
        			<text>化学小子 玻璃清洁剂 汽车前档风玻璃清洗剂</text>
        			<view class="txt_aa">
        				<text>买一送三</text>
        				<text>满199-100元</text>
        			</view>
        			<view class="txt_aas">
        				<text>税后价：<text>￥980.00</text></text>
        				<text>销量：1256</text>
        			</view>
        	
        		</view>
        	</view>
        	
        </view>
		<tabBar :currentPage='currentPage'></tabBar>
	</view>
</template>

<script>
	import tabBar from '@/components/tabBar/tabBar.vue';
	export default {
		data() {
			return {
				currentPage: 'cart'
			}
		},
		components: {
			tabBar,
		}
	}
</script>

<style lang="scss">
	.top {
		width: 750upx;
		margin: 0 auto;
		overflow: hidden;
		border-bottom: 1px solid #e5e5e5;
		height: 90rpx;
		line-height: 90rpx;
	
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
			// padding: 30upx;
			padding: 0 30rpx;
			line-height:90rpx;
			margin-top:15rpx;
	
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
	.biaot{
		border-bottom: 1px solid #ccc;
		font-size: 30upx;
		line-height: 80upx;
		padding-left: 20upx;
		.dele{
			float: right;
			padding-right: 20upx;
			text{
				font-size: 26upx;
				color: #666;
				line-height: 50upx;
			}
		}
	}
	.empty{
		width: 750upx;
		padding-top: 60upx;
		padding-bottom: 50upx;
		height: 200upx;
		background-color: #f7f7f7;
		margin: 0 auto;
		text-align: center;
		
		.img_h{
			image{
				width: 130upx;
				height: 115upx;
			}
		}
		text{
			font-size: 28upx;
			color: #ccc;
			line-height: 50upx;
		}
	}
	.list {
		width: 710upx;
		margin: 20upx;
		overflow: hidden;
		padding-top: 10upx;
		.content {
			display: black;
			width: 100%;
			// height: 250upx;
			border-bottom: 1px dotted #ccc;
	        padding-bottom: 20upx;
			overflow: hidden;
			.imgBox{
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
	            text{
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
					padding-top:10upx;
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
	
	}
</style>
