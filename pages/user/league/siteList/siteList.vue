<template>
	<view>
		<view class="top">
			<view class="textBox">
				<text>收货地址</text>
			</view>
			<view class="imgBox">
				<text>添加</text>
			</view>
		</view>

		<view class="siteBox">
			<view class="radios">
				<radio value="r2" />
			</view>
			<view class="content">
				<view class="nome">
					<text>张继科</text>
				</view>
				<view class="call">
					<text>15066458795</text>
				</view>
				<!-- 默认地址标签样式 -->
				<view class="label">
					<text>默认</text>
				</view>
				<view class="p">
					<text>山东省济南市槐荫区张庄路街道路街道明南区16号楼明南区16号楼(菜鸟驿站代收)</text>
				</view>
			</view>
			<view class="edit">
				<text>编辑</text>
			</view>
		</view>
		
		<view class="siteBox">
			<view class="radios">
				<radio value="r2" />
			</view>
			<view class="content">
				<view class="nome">
					<text>张继科</text>
				</view>
				<view class="call">
					<text>15066458795</text>
				</view>
				<view class="p">
					<text>山东省济南市槐荫区张庄路街道路街道明南区16号楼明南区16号楼(菜鸟驿站代收)</text>
				</view>
			</view>
			<view class="edit">
				<text>编辑</text>
			</view>
		</view>
		
		<view class="uni-padding-wrap uni-common-mt bott">
			<button type="primary">确定并返回</button>
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
				line-height: 90upx;
			}
		}

		.imgBox {
			float: right;
			padding: 20upx;

			text {
				font-size: 26upx;
				color: #333;
			}
		}
	}

	.siteBox {
		width: 710upx;
		margin: 20upx;
		overflow: hidden;
		padding-top: 20upx;
		padding-bottom: 40upx;
        border-bottom: 1px solid #e5e5e5;
		.radios {
			float: left;
			padding-top: 30upx;
			padding-right: 10upx;
		}

		.content {
			float: left;
			width: 80%;

			.nome {
				float: left;
				font-size: 30upx;
				color: #333;
				padding-right: 10upx;
			}

			.call {
				float: left;
				font-size: 24upx;
				color: #666;
				line-height: 40upx;
				padding-right: 10upx;
			}

			.label {
				float: left;
				font-size: 18upx;
				color: #ff6633;
				padding: 5upx;
				margin-top: 5upx;
				background-color: #fdf1ec;
			}

			.p {
				float: left;
				font-size: 26upx;
				color: #333;
				line-height: 40upx;
			}
		}
        .edit{
			float: right;
			margin-top: 20upx;
			border-left: 1px solid #e5e5e5;
			
			text{
				font-size: 24upx;
				color: #999;
				line-height: 80upx;
				padding-left: 20upx;
			}
		}

	}
	.bott{
		width: 670upx;
		position: fixed;
		bottom: 40upx;
		left: 40upx;
		
		button{
			border-radius: 40upx;
			font-family:Microsoft YaHei;
		}
		
	}
</style>
