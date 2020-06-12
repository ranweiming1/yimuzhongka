<template>
	<view class="content">
		<!-- <view class="one_line">
		</view>
 -->
		<view class="went" v-for="(item,index) in pingList" @tap="detail(item.id,item.content,item.title)">
			<text>{{item.title}}</text>
			<view class="imgBox">
				<image src="../../../static/icon_26.png" mode=""></image>
			</view>
		</view>


		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pingList: {}
			}
		},
		onLoad() {
			var _this = this
			this.$https({
				url: '/api/help/problem-list',
				data: {},
				dengl: false,
				success(res) {
					console.log(res.data)
					_this.pingList = res.data.data
				}
			})
		},
		methods: {
		detail(id,content,title){
			uni.navigateTo({
				url:'FAQdetails/FAQdetails?id='+id+'&content='+content+'&title='+title,
			})
		}
		}
	}
</script>

<style lang="scss">
	page {
		background: #f7f7f7;
	}

	.content {
		border-top: 1rpx solid #ccc;
	}

	.went {
		width: 710upx;
		background: #fff;
		padding: 20upx;
		overflow: hidden;
		border-bottom: 1px dotted #ccc;

		text {
			float: left;
			font-size: 30upx;
		}

		.imgBox {
			float: right;

			image {
				width: 12upx;
				height: 20upx;
			}

		}
	}

	.chat {
		width: 750upx;
		height: 100upx;
		text-align: center;
		position: fixed;
		bottom: 0upx;
		left: 0upx;
		background-color: #fff;

		.imgA {
			float: left;
			padding-left: 34%;
			padding-top: 4%;
			padding-right: 2%;

			image {
				width: 41upx;
				height: 38upx;
			}
		}

		.txtBox {
			float: left;

			text {
				font-size: 30upx;
				line-height: 90upx;
				color: #2b5cff;
			}

		}

	}
</style>
