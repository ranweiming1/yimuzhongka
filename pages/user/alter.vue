<template>
	<view class="bg">
		<view class="one_line">
		</view>

		<!-- 修改资料 -->
		<view class="alter">
			<view class="left">
				<view class="h2">
					<text>Hi,用户名</text>
					<!-- 点击图片可修改头像 -->
					<view class="imgBox">
						<image src="../../static/icon_25.png" mode=""></image>
					</view>
				</view>

				<view class="span">
					<text>点击修改昵称</text>
				</view>

			</view>
            <!-- 点击图标也可修改昵称 -->
			<view class="right">
				<image src="../../static/img_06.jpg" mode=""></image>
			</view>
		</view>

		<!-- 基础资料 -->
			<view class="basic">
				<view class="left_a">
					<text>绑定手机号</text>
				</view>
				<view class="right_a">
					<view class="img_a">
						<image src="../../static/icon_26.png" mode=""></image>
					</view>
					<text>15066132542</text>
				</view>
			</view>

			<view class="basic">
				<view class="left_a">
					<text>性别</text>
				</view>
				<view class="right_a">
					<view class="img_a">
						<image src="../../static/icon_26.png" mode=""></image>
					</view>
					<text>未选择</text>
				</view>
			</view>

			<view class="basic">
				<view class="left_a">
					<text>生日</text>
				</view>
				<view class="right_a">
					<view class="img_a">
						<image src="../../static/icon_26.png" mode=""></image>
					</view>
					<text>2020/02/20</text>
				</view>
			</view>
			<view class=" uni-padding-wrap uni-common-mt quit">
				<button type="primary">退出登录</button>
			</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	
	.alter {
		width: 750upx;
		background-color: #fff;
		overflow: hidden;
		padding-bottom: 20upx;
		border-bottom: 20upx solid #f2f4f7;

		.left {
			float: left;
			margin-top: 60upx;
			margin-left: 20upx;

			.h2 {
				float: left;
				font-size: 36upx;
				color: #333;
				width: 70%;
				line-height: 60upx;

				text {
					float: left;
				}

				.imgBox {
					float: left;
					padding-top: 15upx;
					padding-left: 15upx;

					image {
						display: block;
						float: left;
						width: 28upx;
						height: 27upx;

					}
				}

			}

			.span {
				float: inherit;
				font-size: 22upx;
				color: #999;
			}


		}

		.right {
			float: right;
			margin-top: 40upx;
			margin-right: 20upx;

			image {
				width: 120upx;
				height: 120upx;
				border-radius: 60upx;
			}
		}
	}

	page{
		background: #f7f7f7;
	}
	.basic {
		width: 710upx;
		background-color: #fff;
		overflow: hidden;
		padding: 20upx;
		padding-bottom: 20upx;
		border-bottom: 1px dotted #ccc;

		.left_a {
			float: left;
			padding-left: 20upx;

			text {
				font-size: 28upx;
				color: #999;
				line-height: 30upx;
				line-height: 70upx;
			}
		}
		page{
			background: #f7f7f7;
		}
		.right_a {
			float: right;
			padding-right: 10upx;

			text {
				font-size: 28upx;
				float: right;
				line-height: 70upx;
			}

			.img_a {
				float: right;
				padding: 30upx 0upx 20upx 20upx;

				image {
					width: 12upx;
					height: 14upx;
					display: block;
				}

			}
		}
        

	}
	.quit{
		overflow: hidden;
		padding-top:10%;
		width: 650upx;
		margin: 0 auto;
		color: #fff;
		position: fixed;
		bottom: 5%;
		left: 7%;
		
		font-family: Microsoft YaHei;
		
		button{
			
			border-radius:50upx 50upx;
			background-color: #dce0e6;
		}
	}
</style>
