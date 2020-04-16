<template>
	<view>
		<view class="one_line">
		</view>
		
		<!-- 广告浮窗 链接到效果图/个人中心/6-3分销页面 -->
		<view class="float">
			<image src="../../static/icon_20.png" mode=""></image>
		</view>
		
		<!-- 超出一屏翻页 -->
		<view class="list">
			<view class="tit">
				<text>仓储式及市场批发销售的清洁是如何形成的呢…</text>
				<view class="span">
					<text>发布时间:2019/08/25</text>
				</view>
			</view>
			
			<view class="img">
				<image src="../../static/img_03.jpg" mode=""></image>
			</view>
		</view>
		
		<view class="list">
			<view class="tit">
				<text>仓储式及市场批发销售的清洁是如何形成的呢…</text>
				<view class="span">
					<text>发布时间:2019/08/25</text>
				</view>
			</view>
			
			<view class="img">
				<image src="../../static/img_03.jpg" mode=""></image>
			</view>
		</view>
		<view class="list">
			<view class="tit">
				<text>仓储式及市场批发销售的清洁是如何形成的呢…</text>
				<view class="span">
					<text>发布时间:2019/08/25</text>
				</view>
			</view>
			
			<view class="img">
				<image src="../../static/img_03.jpg" mode=""></image>
			</view>
		</view>
		<view class="list">
			<view class="tit">
				<text>仓储式及市场批发销售的清洁是如何形成的呢…</text>
				<view class="span">
					<text>发布时间:2019/08/25</text>
				</view>
			</view>
			
			<view class="img">
				<image src="../../static/img_03.jpg" mode=""></image>
			</view>
		</view>
		<view class="list">
			<view class="tit">
				<text>仓储式及市场批发销售的清洁是如何形成的呢…</text>
				<view class="span">
					<text>发布时间:2019/08/25</text>
				</view>
			</view>
			
			<view class="img">
				<image src="../../static/img_03.jpg" mode=""></image>
			</view>
		</view>
		<view class="list">
			<view class="tit">
				<text>仓储式及市场批发销售的清洁是如何形成的呢…</text>
				<view class="span">
					<text>发布时间:2019/08/25</text>
				</view>
			</view>
			
			<view class="img">
				<image src="../../static/img_03.jpg" mode=""></image>
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
				currentPage : 'news'
			}
		},
		components:{
			tabBar ,
		}
	}
	
</script>

<style lang="scss">
	
	.float{
			 position: fixed;
			 bottom: 30%;
			 right: 10upx;
			 z-index: 99999;
			 image{
				 width: 185upx;
				 height: 150upx;
			 }
	}
	
	.one_line{
		position: fixed;
		top:80upx;
		left:0upx;
		z-index: 2;
		width: 750upx;
		height: 1upx;
		border-top: 1px solid #e5e5e5;
	}
	.list{
		font-size: 30upx;
		color: #333333;
		position: relative;
		height: 210upx;
		margin-top:30upx;
		border-bottom: 1px dotted #ccc;
		.span{
			font-size: 24upx;
			color: #999;
		}
		.tit{
			width:450upx;
			padding-right:10upx;
			float: left;
			padding-left: 20upx;
		}
		.tit text{
			line-height: 50upx;
		}
		.span text{
			position:absolute;
			bottom:30upx;
			left:20upx;
		}
        .img {
			float: left;
		}
		.img image{
			width: 255upx;
			height:180upx;
		}
	}
	
	
</style>