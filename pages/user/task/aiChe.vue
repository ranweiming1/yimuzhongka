<template>
	<view>
		<view class="top">
			<view class="textBox">
				<text>我的爱车</text>
			</view>
			<view class="imgBox" @tap='tianjia'>
				<text>添加</text>
			</view>
		</view>
		<radio-group @change='checkboxChange'>
			<view class="siteBox" v-for='item in listz'>
				<view class="radios">
					<radio :value='item.id' />
				</view>
				<view class="content">
					<view class="d">
						<text>{{}}</text>
					</view>
					<view class="nome">
						<text>奥迪A6</text>
					</view> 
				</view>
				<view class="edit">
					<text @tad='bianji(index)'>编辑</text>
				</view>
			</view>
		</radio-group>
		<view class="uni-padding-wrap uni-common-mt bott">
			<button type="primary" style="background: #2b5cff" @tap='fanhui'>添加爱车</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listz:[]
			}
		},
		onLoad: function() {
			var _this=this
			this.$https({url:'/api/user/my-favorite-car-list',data:{},success:function(res){
				_this.listz=res.data.data
			}})
		},
		methods: {
			fanhui:function(){
				uni.navigateTo({
					url:'../../shop/car?id=1'
				})
			}
		}
	}
</script>

<style lang="scss">
	checkbox {
		border-radius: 50%;
	}

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
			line-height: 40rpx;

			.nome {
				float: left;
				font-size: 30upx;
				color: #333;
				padding-right: 10upx;
			}

			// .call {
			// 	float: left;
			// 	font-size: 24upx;
			// 	color: #666;
			// 	line-height: 40upx;
			// 	padding-right: 10upx;
			// }

			// .label {
			// 	float: left;
			// 	font-size: 18upx;
			// 	color: #ff6633;
			// 	padding: 5upx;
			// 	margin-top: 5upx;
			// 	background-color: #fdf1ec;
			// }

			.p {
				float: left;
				font-size: 26upx;
				color: #333;
				line-height: 40upx;
			}
		}

		.edit {
			float: right;
			margin-top: 20upx;
			border-left: 1px solid #e5e5e5;

			text {
				font-size: 24upx;
				color: #999;
				line-height: 80upx;
				padding-left: 20upx;
			}
		}

	}

	.bott {
		width: 670upx;
		position: fixed;
		bottom: 40upx;
		left: 40upx;

		button {
			border-radius: 40upx;
			font-family: Microsoft YaHei;
		}

	}
</style>
