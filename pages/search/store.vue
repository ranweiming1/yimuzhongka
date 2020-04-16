<template>
	<view>
		<!-- 状态栏 -->
		<view class="topBox">
			<!-- 默认样式 -->
			<view class="none">
				<view class="ontext">
					<text>商品</text>
				</view>
				
			</view>
			
			<!-- 选中样式 -->
			<view class="none on">
				<view class="ontext">
					<text>店铺</text>
				</view>
				<view class="onimg">
					<image src="../../static/icon_09.png" mode=""></image>
				</view>
			</view>
		</view>
		
		<view class="listBox">
			<view class="liBox" v-for="(i , n) in 5" >
				<view class="imgBox">
					<image src="../../static/img_17.jpg" mode=""></image>
				</view>
				<view class="texBox">
					<view class="h2Box">
						<text>凯迪拉克官方企业店</text>
					</view>
					<view class="spanBox">
						<text>销量：2562</text>
					</view>
				</view>
				<view class="bottBox">
					<text>进店逛逛</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.topBox {
		overflow: hidden;
		border-bottom: 1px solid #f0f0f0;
	    width: 710upx;
		padding: 20upx 20upx 0 20upx;
		.on{
			.ontext{
				text{
					color: #333 !important;
				}
			}
		}
		.none {
			text-align: center;
			float: left;
			width:50%;
	
			.ontext {
				text {
					font-size: 30upx;
					color: #999;
				}
			}
	
			.onimg {
				margin-left: 45%;
				margin-top: 20upx;
				image {
					display: block;
					width: 34upx;
					height: 6upx;
				}
			}
		}
	}
	.listBox{
		width: 690upx;
		overflow: hidden;
		padding: 20upx;
		.liBox{
			padding: 10upx;
			float: left;
			width: 100%;
			border-radius: 10upx;
			margin-bottom: 20upx;
			box-shadow: 0 0 10upx #ccc;
			.imgBox{
				float: left;
				image{
					width: 100upx;
					height: 100upx;
					border-radius: 100upx;
				}
			}
			.texBox{
				float: left;
				padding-left: 20upx;
				.h2Box{
					padding-top: 5upx;
					text{
						line-height: 50upx;
						font-size: 32upx;
						color: #333;
					}
				}
				.spanBox{
					text{
						font-size: 24upx;
						color: #333;
					}
				}
			}
			
			.bottBox{
				float: right;
				margin-top: 25upx;
				margin-right: 10upx;
				text{
					font-size: 20upx;
					color: #999;
					float: left;
					padding: 5upx 20upx;
					line-height: 40upx;
					background-color: #fff;
					border: 1px solid #ccc;
					border-radius: 50upx;
				}
			}
		}
	}
</style>
