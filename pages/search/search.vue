<template>
	<view>
		<!-- 头部 -->
		<view class="top">
			<view class="textBox">
				<input class="uni-input" focus placeholder="请输入关键字" />
			</view>
			<view class="wenbenBox">
				<view class="imgBox">
					<image src="../../static/icon_45.png" mode=""></image>
				</view>
				<view class="txeta">
					<text>搜索</text>
				</view>
			</view>

		</view>
		
		<!-- 历史记录 -->
		<view class="history">
			<view class="titBox">
				<text>最近搜过</text>
			</view>
			<view class="imBox">
				<image src="../../static/icon_46.png" mode=""></image>
			</view>
			<view class="ul">
				<view class="li" v-for="(i , n) in 7">
					<text>机油</text>
				</view>
			</view>
		</view>
		
		<view class="history">
			<view class="titBox">
				<text>热门搜索</text>
			</view>
			<view class="ul">
				<view class="li" v-for="(i , n) in 6">
					<text>雨刷器</text>
				</view>
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
	.top {
		width: 710upx;
		margin: 20upx;
		overflow: hidden;

		.textBox {
			float: left;
			margin-left: 70upx;
			background-color: #f0f0f0;
			border-radius: 50upx;

			input {
				height: 60upx;
				width:450upx;
				line-height: 60upx;
				padding-left: 20upx;
				font-size: 26upx;
			}

			.uni-input-placeholder {
				color: #999 !important;
			}

		}

		.wenbenBox{
			width: 150upx;
			height:60upx;
            float: right;
			border-radius: 40upx;
			background-color: #007AFF;
			.imgBox {
				padding-left:30upx;
				padding-right:10upx;
				padding-top: 10upx;
				float:left;

				image {
					width: 30upx;
					height: 30upx;
				}
			}

			.txeta {
				float: left;
				text {
					font-size: 28upx;
					line-height:60upx;
					color: #fff;
				}
			}

		}

	}
	.history{
		width: 710upx;
		padding: 20upx;
		overflow: hidden;
		.titBox{
			float: left;
			text{
				font-size: 32upx;
			}
		}
		.imBox{
			float: right;
			image{
				width: 32upx;
				height: 32upx;
			}
		}
		.ul{
			overflow: hidden;
			width: 710upx;
			padding-top: 20upx;
			
			.li{
				float: left;
				margin-right: 20upx;
				background-color: #eeeeee;
				border-radius: 40upx;
				padding: 5upx 20upx;
				margin-bottom: 20upx;
				text{
					float: left;
					line-height: 40upx;
					font-size: 26upx;
					color: #666;
				}
			}
		}
	}
</style>
