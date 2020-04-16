<template>
	<view>
		<view class="one_line">
		</view>

		<view class="Box">
			<!-- 消息可删除，右滑删除样式 -->
			<view class="listBox">
				<view class="imgBox">
					<image src="../../../static/img_12.jpg.png" mode=""></image>
				</view>
				<view class="textBox">
					<view class="h2">
						<view class="tit">
							<text>系统消息</text>
						</view>
						<view class="official ">
							<text>官方</text>
						</view>
						<view class="span">
							<text>07 : 24</text>
						</view>
					</view>
					
					<view class="p">
						<text>卖家已同意退货申请，请您尽快将商品...</text>
					</view>
				</view>
			</view>
			
			<view class="listBox" v-for="(i , n) in 4">
				<view class="imgBox">
					<image src="../../../static/img_12.jpg.png" mode=""></image>
				</view>
				<view class="textBox">
					<view class="h2">
						<view class="tit">
							<text>金撒旗舰店</text>
						</view>
						<view class="span">
							<text>2019/05/25</text>
						</view>
					</view>
					
					<view class="p">
						<view class="">
							<text>卖家已同意退货申请，请您尽快将商品...</text>
						</view>
						<!-- 新消息提示 -->
						<view class="new">
							<text>01</text>
						</view>
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
	page{
		background-color: #f7f7f7;
	}
	.Box {
		background-color: #fff;
		overflow: hidden;
		width: 710upx;
		padding: 20upx 20upx 0 20upx;

		.listBox {
			width: 100%;
			overflow: hidden;
			height: 140upx;
			.textBox {
				border-bottom: 1px solid #f0f0f0;
				padding-bottom: 30upx;
				float: left;
				width: 590upx;
				padding-left: 20upx;
				overflow: hidden;
				.h2{
				   margin-top: 10upx;
					overflow: hidden;
					.tit{
						text{
							line-height: 60upx;
							font-size:34upx;
							padding-right: 10upx;
							float: left;
						}
					}
					
					.official{
						float: left;
						height:30upx;
						margin-top:15upx;
						border: 1px solid #FF6600;
						border-radius: 5upx;
						text{
							float: left;
							text-align: center;
							padding-left: 5upx;
							padding-right: 5upx;
							font-size: 20upx;
							color: #ff6600;
						}
					}
				}
				.span{
					float: right;
					text{
						font-size: 24upx;
						color: #999;
					}
				}
				.p{
					overflow: hidden;
					text{
						float: left;
						font-size: 26upx;
						color: #666;
					}
					.new{
						float: right;
						margin-right: 10upx;
						text{
							font-size: 18upx;
							color: #fff;
							padding: 5upx 7upx;
							background-color: #ff0000;
							border-radius: 30upx;
							
						}
					}
				}
			}
			.imgBox {
				float: left;
			    padding-top:10upx;
				image {
					width: 100upx;
					height: 100upx;
					border-radius: 50upx;
				}
			}

		}

		
	}
</style>
