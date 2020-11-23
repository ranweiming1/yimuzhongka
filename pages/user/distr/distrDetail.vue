<template>
	<view class="content">
		<!-- <view class="one_line">
		</view>
		 -->
		<view class="li" v-for="(item,index) in list">
			<view class="text_y">
				<view class="phone">
					<text>用户{{phone}}</text>
				</view>
				<view class="neirs" style='margin-top:10rpx;'>
					<text>{{item.integralName}}</text>
				</view>
			</view>

			<!-- 增值状态 -->
			<view class="jine">
				<text style='display:block;text-align:right;font-size:26rpx;'>+{{item.integral}}</text>
				<text style='color:#666;font-size:24rpx;'>{{item.createTime}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: {},
				phone:''
			}
		},
		onLoad(option) {
			// console.log(option)
			this.phone=option.id
			var _this = this
			this.$https({
				url: '/api/task/center-integralLog',
				data: {},
				dengl: false,
				method: 'POST',
				success: function(res) {
					_this.list = res.data.data
					console.log(res.data.data)
				}
			})
		},

	}
</script>

<style lang="scss">
	.content {
		border-top: 1px solid #ccc;
	}

	.li {
		width: 710upx;
		padding: 20upx;
		overflow: hidden;
		border-bottom: 1px dotted #ccc;

		.text_y {
			float: left;

			.phone {
				text {
					font-size: 30upx;
					color: #666;
					line-height: 35upx;
				}
			}

			.neirs {
				text {
					font-size: 30upx;
					color: #666;
					line-height: 35upx;
				}
			}

		}

		.jine {
			float: right;
			padding-top: 20upx;
			font-size: 30upx;
			color: #0062f6;
			line-height: 35upx;
		}

		.jineFu {
			float: right;
			padding-top: 20upx;
			font-size: 30upx;
			color: #3399ff;
			line-height: 35upx;
		}
	}
</style>
