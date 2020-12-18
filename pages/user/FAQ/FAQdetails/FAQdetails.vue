<template>
	<view class="line-top">
		<view class="went">
			<text>{{list.title}}</text>
		</view>
		<view class="neir">
			<rich-text :nodes='list.content'></rich-text>
			<!-- <jyf-parser :html="list.content"></jyf-parser> -->
		</view>


		<!-- <view class="span">
			<text>若您的问题还未解决，您可以</text>
		</view>
		<view class="txtBox">
			<text>联系在线客服</text>
		</view> -->
	</view>
</template>

<script>
	import parser from "@/components/jyf-parser/jyf-parser.vue"	
	export default {
		data() {
			return {
				id: '',
				list: {},
			}
		},
		components: {
			"jyf-parser": parser
		},
		onLoad(option) {
			var that = this
			this.$https({
				url: '/api/help/problem-detail',
				dengl: false,
				method:'POST',
				data: {id:option.id},
				success: function(res) {
					console.log(res.data.data)
					res.data.data.content=that.$richText(res.data.data.content)
					that.list = res.data.data
			
				}
			})
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.line-top {
		border-top: 1rpx solid #e5e5e5;
		padding: 0 20rpx;
		width: 100%;
		box-sizing: border-box;
		font-size: 30rpx;
		color: #333;
	}

	.went {
		width: 710upx;
		background: #fff;
		overflow: hidden;
		border-bottom: 1px dashed #ccc;
		height: 100rpx;
		line-height: 100rpx;

		text {
			float: left;
			font-size: 30upx;
		}
	}

	.neir {
		// width: 710upx;
		// padding: 20upx;
		width: 100%;
		box-sizing: border-box;
		padding: 20rpx 0;

		text {
			font-size: 28upx;
			color: #666;
			line-height: 40upx;
		}
	}

	.span {
		position: fixed;
		left: 30%;
		bottom: 9%;
		text-align: center;

		text {
			color: #999;
			font-size: 26upx;
		}
	}

	.txtBox {
		width: 600upx;
		background-color: #2b5cff;
		position: fixed;
		left: 10%;
		bottom: 2%;
		text-align: center;
		border-radius: 50upx;

		text {
			color: #fff;
			line-height: 80upx;
			font-size: 26upx;
		}
	}
</style>
