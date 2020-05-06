<template>
	<view>
		<view class="one_line">
		</view>

		<view class="uni-form-item uni-column">
			<text>张书记</text>
		</view>

		<view class="basic">
			<view class="left_a">
				<text>15066235421</text>
			</view>
			<view class="right_a">
				<view class="img_a">
					<image src="../../../../static/icon_26.png" mode=""></image>
				</view>
			</view>
		</view>

		<view class="basic">
			<view class="left_a">
				<text>山东省</text>
				<text>济南市</text>
				<text>槐荫区</text>
				<text>幸福街道</text>
			</view>
			<view class="right_a">
				<view class="img_a">
					<image src="../../../../static/icon_26.png" mode=""></image>
				</view>
			</view>
		</view>

		<view class="uni-form-item uni-column beizs">
			<text>啦啦啦啦啦啦啦啦啦啦</text>
		</view>
		<view class="uni-list">
			<view class="uni-list-cell uni-list-cell-pd">
				<view class="uni-list-cell-db">
					<text>设为默认地址</text>
				</view>
				<switch checked />
			</view>
		</view>
		
		<view class="uni-padding-wrap uni-common-mt bott">
			<button type="primary">删除</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {
			switch1Change: function(e) {
				console.log('switch1 发生 change 事件，携带值为', e.target.value)
			},
			switch2Change: function(e) {
				console.log('switch2 发生 change 事件，携带值为', e.target.value)
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f7f7f7;
	}
	.uni-column {
		width: 750upx;
		display: block;
		padding-top: 30upx;
		background-color: #fff;
		overflow: hidden;
		border-bottom: 1upx solid #f7f7f7;
        text{
			background-color: #fff;
			width: 700upx;
			float: left;
			color: #333;
			font-size: 28upx;
			margin-left: 20upx;
			font-family: Microsoft YaHei;
			display: block;
			padding-bottom: 30upx;
		}
		.imgBox {
			float: left;
			padding-top: 30upx;
			padding-left: 20upx;

			image {
				width: 175upx;
				height: 175upx;
			}
		}
	}

	.beizs {
		width: 750upx;
		border-bottom: 20upx solid #f7f7f7;

		.uni-input {
			height: 100upx;
		}
	}

	.basic {
		width: 710upx;
		background-color: #fff;
		overflow: hidden;
		padding: 20upx;
		padding-bottom: 10upx;
		border-bottom: 1upx solid #f7f7f7;

		.left_a {
			float: left;

			text {
				width: 100%;
				float: left;
				font-size: 28upx;
				color: #333;
				line-height: 50upx;
			}
		}

		.right_a {
			float: right;
			padding-right: 10upx;
			text {
				font-size: 28upx;
				float: right;
				line-height: 50upx;

				text {
					color: #ff670c;
				}
			}

			.img_l {
				float: left;
				padding-right: 10upx;
				padding-top: 5upx;

				image {
					width: 45upx;
					height: 45upx;
				}

			}

			.img_a {
				float: right;
				padding: 20upx 0upx 20upx 20upx;
				image {
					width: 12upx;
					height: 14upx;
					display: block;
				}

			}
		}
	}
	.uni-list{
		width: 710upx;
		height: 60upx;
		padding: 20upx;
		background: #fff;
		.uni-list-cell-db{
			float: left;
			background-color: #fff;
			text{
				font-size: 30upx;
				color: #333;
			}
		}
		switch{
			float: right;
			transform:scale(0.8)
		}
	}
	.bott{
		width: 670upx;
		position: fixed;
		bottom: 40upx;
		left: 40upx;
		
		button{
			background-color: #ff0000;
			border-radius: 40upx;
			font-family:Microsoft YaHei;
		}
		
	}
</style>
