<template name="Coupon">
	<view>
		<!-- 两种状态 ； 三种样式 -->
		<!-- 已获得 / 未获得 -->
		<!-- 接收状态参数 === >>>> 已使用 / 未使用 === >>> 基数还是偶数 -->
		<!-- 需要判空 -->
		<div class="haveNot" v-if="CouponList.length == 0 || CouponList == null">暂无~</div>
		<div
			v-else
			@click="ChoiceCoupon(item)"
			:class="indexActive == index ? 'CouponItem fullHeight' : 'CouponItem IncompleteHeight'"
			v-for="(item, index) in CouponList"
			:key="index"
		>
			<image v-show="!item.hasUsed" class="IMG" :src="index % 2 == 0 ? bgImage_red : bgImage_violet" mode=""></image>
			<image v-show="item.hasUsed" class="IMG" :src="bgImage_gray" mode=""></image>
			<div class="addPadding">
				<!-- 洗车券的抬头 -->
				<div class="title">
					<div class="titleLeft">
						<p>{{ item.name }}</p>
						<span>有效期至2019-10-23</span>
					</div>
					<div class="titleRight">
						<text>{{ item.price }}</text>
						元
					</div>
				</div>
				<!-- 使用规则 、 立即使用 -->
				<div class="userRule">
					<div class="rule" @click.stop="open(index)">
						<span>使用规则</span>
						<text class="cuIcon-triangledownfill"></text>
					</div>
					<!-- 条件编译按钮 -->
					<div class="use" v-if="UseBtn">立即使用</div>
				</div>
				<!--使用规则 详情-->
				<scroll-view v-show="indexActive == index" scroll-y="true" style="height: 180rpx; margin-top:10rpx ;color: #FFFFFF;">
					<rich-text :nodes="YouHuiQuanShiYongGuiZe"></rich-text>
				</scroll-view>
			</div>
			<!-- 侧方向的Bar -->
			<!-- 条件编译 === >>> 是已经使用的话 -->
			<div class="sideBar" v-show="item.hasUsed">已使用</div>
		</div>
	</view>
</template>

<script>
export default {
	data() {
		return {
			//使用规则
			YouHuiQuanShiYongGuiZe : '' ,
			//红的券
			bgImage_red: '/static/img/Coupon_red.png',
			//灰色的
			bgImage_gray: '/static/img/Coupon_gray.png',
			//紫色的
			bgImage_violet: '/static/img/Coupon_violet.png',
			indexActive: null
		};
	},
	onReady() {
		//获取使用规则
		this.GetYouHuiQuanShiYongGuiZe()
	},
	props: {
		UseBtn: {
			//该值决定是否显示使用按钮
			state: {
				type: [Boolean, String],
				default: true
			}
		},
		state: {
			type: [Boolean, String],
			default: false
		},
		//实际接收的数据
		CouponList: {
			type: [Array]
		}
	},
	watch: {
		CouponList: function(n, o) {
			this.CouponList = n;
			console.log(this.CouponList);
		},
		UseBtn: function(n, o) {
			this.UseBtn = n;
		}
	},
	methods: {
		//获取使用规则
		GetYouHuiQuanShiYongGuiZe() {
			this.$api.loading({
				title: '加载中...'
			});
			this.$http
				.get('/api/Article/GetYouHuiQuanShiYongGuiZe', {
					params: {}
				})
				.then(res => {
					console.log(res.data.data);
					this.YouHuiQuanShiYongGuiZe = res.data.data.pageContents;
					this.$api.hld();
				})
				.catch(err => {
					console.log(res);
				});
		},
		//选择某一个优惠券的方法 传入父组件 ； 父组件调起上级页面的方法 then 回退
		ChoiceCoupon(item) {
			//如果是已经使用的话 就 给提示并且不调起父事件
			if(item.hasUsed == true) {
				this.$api.msg({
					title:'此卡券已被使用.'
				})
			}else{
				this.$emit('ChoiceCoupon', item); //在此用emit链调起父组件事件
			}
		},
		open(index) {
			if (this.indexActive == null) {
				this.indexActive = index;
			} else {
				if (this.indexActive !== index) {
					this.indexActive = index;
				} else {
					this.indexActive = null;
				}
			}
		}
	}
};
</script>

<style lang="scss">
.haveNot {
	width: 100%;
	padding: 40upx;
	color: #000;
	font-size: 30upx;
	text-align: center;
}
.sideBar {
	background: #e42739;
	color: #ffffff;
	position: absolute;
	right: -67upx;
	top: -24upx;
	transform: rotate(45deg);
	padding: 50rpx 55rpx 15rpx 55rpx;
}
.userRule {
	margin-top: 35upx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	.use {
		// color: rgba(255, 255, 255, 0.6);
		color: #000000;
		background: #ffffff;
		font-size: 24upx;
		height: 56upx;
		line-height: 56upx;
		border-radius: 28upx;
		padding: 0 30upx;
	}
	.rule {
		color: #ffffff;
		padding: 10upx 0upx;
		text {
			margin-left: 10upx;
			color: #ffffff;
		}
	}
}
.IncompleteHeight {
	height: 260upx;
}
.fullHeight {
	height: 450upx;
}
.CouponItem {
	transition: all 0.3s;
	position: relative;
	width: 703upx;
	margin: 10upx auto 20upx;
	background-size: 100% auto;
	background-repeat: no-repeat;
	border-radius: 20upx;
	overflow: hidden;
	.addPadding {
		padding: 55upx 30upx 0upx 30upx;
	}
	.IMG {
		position: absolute;
		width: 100%;
		z-index: -1;
	}
	.title {
		display: flex;
		align-items: center;
		justify-content: space-between;
		.titleLeft {
			p {
				font-size: 30upx;
				font-weight: 700;
				color: #ffffff;
			}
			span {
				display: block;
				color: #ffffff;
				font-size: 24upx;
				margin-top: 28upx;
			}
		}
		.titleRight {
			color: #ffffff;
			font-size: 24upx;
			text {
				font-size: 60upx;
				margin-right: 14upx;
			}
		}
	}
}
</style>
