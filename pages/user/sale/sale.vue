<template>
	<view>
		<view class="one_line">
		</view>
		
		<!-- tab切换样式  start-->
		<view class="yes">
			<text>可使用</text>
			<!-- 下图为选中状态下划线 -->
			<view class="imgBox">
				<image src="../../../static/icon_09.png" mode=""></image>
			</view>
		</view>
		
		<view class="none">
			<text>已失效</text>
		</view>
		<!-- tab切换样式  end-->
		
		
		<!-- 可使用状态优惠券 -->
		<view class="valid ">
			<view class="imgBox">
				<image src="../../../static/icon_27.png" mode=""></image>
				<view class="sum">
					<text>50<text>元</text></text>
					<view class="tianjan">
						<text>满400可用</text>
					</view>
				</view>
			</view>
			<view class="float">
				<view class="h2">
					<text>满400-50立减券</text>
				</view>
				<view class="p">
					<text>限自营类内饰分类下使用</text>
				</view>
				<view class="span">
					<text>使用时间：2019.6.1-2019.6.30</text>
				</view>
			</view>
			
			<view class="bott">
				<text>使用</text>
			</view>
		</view>
		
		<!-- 不可使用状态 -->
		
		<view class="cannot">
			<view class="imgBox">
				<image src="../../../static/icon_28.png" mode=""></image>
				<view class="sum">
					<text>50<text>元</text></text>
					<view class="tianjan">
						<text>满400可用</text>
					</view>
				</view>
			</view>
			<view class="float">
				<view class="h2">
					<text>满400-50立减券</text>
				</view>
				<view class="p">
					<text>限自营类内饰分类下使用</text>
				</view>
				<view class="span">
					<text>使用时间：2019.6.1-2019.6.30</text>
				</view>
			</view>
			
			<view class="bott">
				<text>已使用</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
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
		height: 205upx;
		margin: 20upx;
		border-radius: 10upx;
		background-color: #fff;
		box-shadow: 0 0 5px #ccc;
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
		box-shadow: 0 0 5px #ccc;
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
