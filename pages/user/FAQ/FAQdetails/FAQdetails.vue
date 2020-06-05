<template>
	<view>
		<view class="one_line">
		</view>

		<view class="went">
			<text>{{list.title}}</text>
		</view>
		<view class="neir">
			<jyf-parser :html="list.content" ref="article"></jyf-parser>
			<!-- <text v-html="list.content"></text> -->
		</view>


		<view class="span">
			<text>若您的问题还未解决，您可以</text>
		</view>
		<view class="txtBox">
			<text>联系在线客服</text>
		</view>
	</view>
</template>

<script>
	import jyfParser from "@/components/jyf-parser/jyf-parser";
	export default {
		data() {
			return {
				id: '',
				list:{}
			}
		},
		onLoad(option) {
			var _this = this
			this.list=option
			this.id = option.id
			console.log(option)
		},
		components:{
		    jyfParser
		},
		methods: {

		}
	}
</script>

<style lang="scss">
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
	}

	.neir {
		width: 710upx;
		padding: 20upx;

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
