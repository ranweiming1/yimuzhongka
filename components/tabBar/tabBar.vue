<template name="tabBar">
	<!-- :class="isFullSucreen?'tabBar FullSucreen':'tabBar'" -->
	<!-- class="tabBar FullSucreen" -->
	<div>
		<div style='height:90upx;'></div>
		<view :class="isFullSucreen ? 'tabBar FullSucreen' : 'tabBar'">
			<!-- 中间的功能按钮 ；  样式用计算属性style覆盖掉 -->
			<view v-for="(item, index) in tabBar" :key="index" :style="item.type == 'scanning' ? style : ''" :class="item.type == 'jump' && item.url == currentPage ? 'tabbar_item  active' : 'tabbar_item'"
			 @click="navTo(item)">
				<image :class="item.type == 'scanning' ? 'IMGstyle' : ''" :style="item.type == 'scanning' ? IMGstyle : ''" v-if="item.url == currentPage"
				 :src="item.imgClick" mode=""></image>
				<image :class="item.type == 'scanning' ? 'IMGstyle' : ''" :style="item.type == 'scanning' ? IMGstyle : ''" v-else
				 :src="item.imgNormal" mode=""></image>
				<view class="text">{{ item.text }}</view>
			</view>
		</view>
		<!-- 这个盒子在全面屏时会展示 用于填充底部操作条 -->
		<div v-if="isFullSucreen" style="height: 33rpx ; width: 100%; background: #FFFFFF; position: fixed;bottom: 0rpx;z-index: 999;"></div>
	</div>
</template>

<script>
	export default {
		props: {
			currentPage: {
				type: String,
				default: 'index'
			}
		},
		//行内重置掉中间功能按钮的样式
		computed: {
			style() {
				let style = `width:${30}%; 
						background:radial-gradient( at top,transparent 50%,#fff 0%); 
						`;
				// if (this.bgImage) {
				// 	style = `${style}background-image:url(${bgImage});`;
				// }
				return style;
			},
			//扫码大图标的样式
			IMGstyle() {
				let IMGstyle =
					`width:${140}rpx;
							height:${140}rpx;
							position: absolute;
							left: 0; 
							right: 0; 
							margin-left: auto; 
							margin-right: auto;
							bottom : ${30}rpx;
							max-width: 50%;
							text-align: center;
							`;
				// if (this.bgImage) {
				// 	style = `${style}background-image:url(${bgImage});`;
				// }
				return IMGstyle;
			}
		},
		data() {
			return {
				isFullSucreen: this.isFullSucreen,
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				tabBar: [{
						type: 'jump',
						url: 'index',
						text: '首页',
						imgNormal: '/static/n1.png',
						imgClick: '/static/s1.png'
					},
					{
						type: 'jump',
						url: 'classify',
						text: '分类',
						imgNormal: '/static/n2.png',
						imgClick: '/static/s2.png'
					},
					{
						type: 'jump',
						url: 'news',
						text: '资讯',
						imgNormal: '/static/n3.png',
						imgClick: '/static/s3.png'
					},
					{
						type: 'jump',
						url: 'cart',
						text: '购物车',
						imgNormal: '/static/n4.png',
						imgClick: '/static/s4.png'
					},{
						type: 'jump',
						url: 'user',
						text: '我的',
						imgNormal: '/static/n5.png',
						imgClick: '/static/s5.png'
					}
				]
			};
		},
		created() {
			uni.hideTabBar({}); 
		},
		methods: {
			navTo(item) {
				let _this = this;
				switch (item.type) {
					//在未登录的时候 点击我的 引导到登录页
					case 'jump':
						if (item.url !== this.currentPage) {
							var isUrl = `/pages/${item.url}/${item.url}`;
							uni.switchTab({
								url: isUrl
							});
						} else {
							// this.$api.toTop();
						}
						break;
					case 'scanning':
						// 只允许通过相机扫码
						uni.scanCode({
							onlyFromCamera: true,
							success: function(res) {
								console.log(res);

								if (res.scanType == 'WX_CODE') {
									// let centerData = unescape(res.path).split(',')[1];
									// let machineId = centerData.split(':')[1]
									// console.log(machineId);
									//2020 02 18 ==== 二维码改格式了  直接用path跳转传参
									let path = `/` + res.path + '&isBack=true';
									console.log('path');
									console.log(path);
									//携参跳转
									if (path !== 0) {
										//判断是否登录 是直接开始业务 不是的话走登录
										if (_this.loginStatus == null) {
											uni.navigateTo({
												url: '/pages/NotLogIn/NotLogIn?url=' + escape(path) //=== >>> URL编码 解码方法 unescape()
											});
										} else {
											uni.navigateTo({
												url: path
											});
										}
									} else {
										_this.$api.msg({
											title: '八成是这个二维码有问题.'
										});
									}
								} else {
									_this.$api.msg({
										title: '您扫的是啥码啊?'
									});
								}
							}
						});

						// 这里因为暂时没有示例二维码 ； 所以直接跳转到业务开始页面 ；  正常应该是扫码成功后跳转
						// uni.navigateTo({
						// 	//假定为1001
						// 	url: '/pages/carWash/ConfirmParking?machineId=1001'
						// });
						break;
					default:
						console.log('没有可执行命令');
						break;
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	//导航栏设置
	$isRadius: 20upx; //左上右上圆角
	$isWidth: 100vw; //导航栏宽度
	$isBorder: 0px solid white; //边框 不需要则设为0px
	$isBg: transparent; //背景

	// 选中设置
	$chooseTextColor: #2d5eff; //选中时字体颜色
	$chooseBgColor: #ffffff; //选中时背景颜色 transparent为透明

	//未选中设置
	$normalTextColor: #999; //未选中颜色
	//item 背景色
	$tabbar_itemBG: #ffffff;

	//功能按钮样式
	.IMGstyle {
		width: 140rpx;
		height: 140rpx;
		position: absolute;
		left: 0;
		right: 0;
		margin-left: auto;
		margin-right: auto;
		bottom: 30rpx;
		max-width: 50%;
		text-align: center;
	}

	.FullSucreen {
		// border-bottom: 38upx solid #FFFFFF;
		bottom: 30upx !important;
	}

	.tabBar {
		width: $isWidth;
		height: 100upx;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		margin: 0 auto;
		z-index: 998;
		background-color: $isBg;
		color: $normalTextColor;
		border-left: $isBorder;
		border-top: $isBorder;
		border-right: $isBorder;
		display: flex;
		justify-content: space-around;
		border-top-right-radius: $isRadius;
		border-top-left-radius: $isRadius;
		box-sizing: border-box;
		// overflow: auto;

		.tabbar_item {
			width: 40%;
			font-size: 12px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			background: $tabbar_itemBG;
			box-shadow: 6px 0px 6px 0px rgba(0, 0, 0, 0.2);

			image {
				width: 48upx;
				height: 48upx;
				// margin-left: 5upx;
			}

			&.active {
				border-left: $isBorder;
				border-top: $isBorder;
				background: $chooseBgColor;
				color: $chooseTextColor;
			}
		}
	}
</style>
