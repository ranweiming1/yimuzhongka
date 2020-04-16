<template>
	<view>
		<view class="one_line">
		</view>
		
		<view class="went"  v-for="(i , n) in 8">
			<text>申请退款后款项多久能够到账？</text>
			<view class="imgBox">
				<image src="../../../static/icon_26.png" mode=""></image>
			</view>
		</view>

		
		<!-- 跳转客服对话 -->
		<view class="chat ">
			<view class="imgA">
				<image src="../../../static/icon_30.png" mode=""></image>
			</view>
			<view class="txtBox">
				<text>联系在线客服</text>
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
	page{
		background: #f7f7f7;
	}
    .went{
		width: 710upx;
		background: #fff;
		padding: 20upx;
		overflow: hidden;
		border-bottom: 1px dotted #ccc;
		text{
			float: left;
			font-size: 30upx;
		}
		.imgBox{
			float: right;
			image{
				width: 12upx;
				height:20upx;
			}
			
		}
	}
	.chat {
		width: 750upx;
		height: 100upx;
		text-align: center;
		position: fixed;
		bottom:0upx;
		left:0upx;
		background-color: #fff;
		
		.imgA{
			float: left;
			padding-left: 34%;
			padding-top: 4%;
			padding-right: 2%;
			image{
				width: 41upx;
				height: 38upx;
			}
		}
		.txtBox{
			float: left;
			text{
				font-size: 30upx;
				line-height: 90upx;
				color: #2b5cff;
			}
			
		}
		
	}

</style>
