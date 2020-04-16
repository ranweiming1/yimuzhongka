<template>
	<view>
		<view class="top">
			<view class="textBox">
				<text>全部分类</text>
			</view>
			<view class="imgBox">
				<image src="../../static/icon_10.png" mode=""></image>
			</view>
		</view>

		<!-- 切换分类 -->
		<view class="Box">
			<view class="left">
				<!-- 选中样式 -->
				<view class="on">
					<image src="../../static/icon_29.png" mode=""></image>
					<text>汽车配件</text>
				</view>
				<!-- 未选中样式 -->
				<view class="none" v-for="(i , n) in 8">
					<text>汽车内饰</text>
				</view>
			</view>
			<view class="right">
				<view class="li" v-for="(i , n) in 12">
					<view class="imgpp">
						<image src="../../static/img_14.jpg" mode=""></image>
					</view>
					<view class="zhiya">
						<text>汽车坐垫</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>

</script>

<style lang="scss">
	.top {
		width: 750upx;
		margin: 0 auto;
		overflow: hidden;
		border-bottom: 1px solid #e5e5e5;

		.textBox {
			padding-left: 40%;

			text {
				font-size: 38upx;
				color: #333;
				float: left;
				line-height: 100upx;
			}
		}

		.imgBox {
			float: right;
			padding: 30upx;

			image {
				width: 36upx;
				height: 36upx;
			}
		}
	}

	.Box {
		width: 750upx;
		overflow: hidden;

		.left {
			text-align: center;
			width: 240upx;
			height: 1135upx;
			float: left;
			background-color: #f6f6f6;

			.on {
				height: 100upx;
				background-color: #fff;

				image {
					float: left;
					padding-top: 35upx;
					width: 6upx;
					height: 30upx;
				}

				text {
					color: #007AFF;
					line-height: 100upx;
					font-size: 30upx;
				}
			}

			.none {
				height: 100upx;
				background-color: #f6f6f6;

				text {
					color: #333;
					line-height: 100upx;
					font-size: 30upx;
				}
			}
		}

		.right {
			width: 510upx;
			text-align: center;
			overflow: hidden;
			background-color: #fff;

			.li {
				margin-top: 20upx;
				width: 170upx;
				float: left;
				.imgpp {
					image {
						width: 120upx;
						height: 120upx;
					}
				}
				.zhiya{
					text{
						font-size: 28upx;
						color: #333;
						line-height: 50upx;
					}
				}
			}

		}

	}
</style>
