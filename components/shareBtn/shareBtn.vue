<template>
	<view>
		<button class="shareBtn" open-type="share"><image class="shareImg" :src="src" mode=""></image></button>
	</view>
</template>

<script>
export default {
	onShareAppMessage() {
		return this.share
	},
	props: {
		src: {
			type: [String],
			default: '/static/img/shareBtn.png'
		}
	},
	data() {
		return {};
	},
	methods: {}
};
</script>

<style lang="scss" scoped>
.shareBtn {
	background: none;
	margin: 0;
	padding: 0;
	line-height: inherit;
	border-radius: 0;
	border: none;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	.shareImg{
		width: 95%;
		height: 130upx;
	}
	&:after {
		border: none;
	}
}
</style>
