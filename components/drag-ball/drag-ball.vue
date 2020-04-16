<template>
	<view class="holdon">
		<image
			class="ball"
			:style="'left:' + ((moveX == 0) & (x > 0) ? x : moveX) + 'px;top:' + ((moveY == 0) & (y > 0) ? y : moveY) + 'px;width:' + width + 'rpx;height:' + height + 'rpx;'"
			@touchstart="drag_start"
			@touchmove.prevent="drag_hmove"
			:src="image"
			mode="aspectFill"
		></image>
	</view>
</template>

<script>
export default {
	props: {
		height: {
			type: Number,
			default: 120
		},
		width : {
			type: Number,
			default: 120
		},
		x: {
			type: Number,
			default: 0
		},
		y: {
			type: Number,
			default: 0
		},
		image: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			start: [0, 0],
			moveY: 0,
			moveX: 0
		};
	},
	methods: {
		drag_start(event) {
			this.start[0] = event.touches[0].clientX - event.target.offsetLeft;
			this.start[1] = event.touches[0].clientY - event.target.offsetTop;
			console.log('点击')
		},
		drag_hmove(event) {
			let tag = event.touches;
			this.moveX = tag[0].clientX - this.start[0];
			this.moveY = tag[0].clientY - this.start[1];
			console.log('松开')
		}
	}
};
</script>

<style>
.holdon {
	width: 100%;
	height: 100%;
}
.ball {
	/* width: 70upx;
	height: 70upx; */
	/* background: linear-gradient(to bottom, #f8f8ff, #87cefa); */
	border-radius: 50%;
	box-shadow: 0 0 10upx #87cefa;
	color: #fff;
	font-size: 30upx;
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed !important;
	z-index: 1000000;
	transition: all 0.1s;
}
</style>
