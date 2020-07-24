<script>
	export default {
		onLaunch: function() {
			console.log('App Launch');
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					}
					// #endif
					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					//在微信中  ；  测试是否是全面屏
					if (e.screenHeight - e.windowHeight - e.statusBarHeight - 32 + e.statusBarHeight + custom.bottom + custom.top - e.statusBarHeight > 100) {
						Vue.prototype.isFullSucreen = true;
					}
					Vue.prototype.screenHeight = e.screenHeight;
					//============== >>> ==============
					// #endif
					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
					
					Vue.prototype.screenHeight = e.screenHeight;
					// Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					//statusBarHeight
					Vue.prototype.statusBarHeight = e.statusBarHeight ;
					console.log(e)
				}
			});
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	.uni-tabbar{
		border-top: none !important;
		box-shadow: 0 0 5px #cccccc!important;
	}
	uni-image{
		width: 100%;
		height: auto;
	}
	text{
		font-family:Microsoft YaHei;
	}
	.one_line{
		position: fixed;
		top:80upx;
		left:0upx;
		z-index: 2;
		width: 750upx;
		height: 1upx;
		border-top: 1px solid #e5e5e5;
	}
	button{
		border-radius: 40upx;
		font-family:Microsoft YaHei;
		font-size: 30upx;
	}
	/*底部*/
	.index-d {
		overflow: hidden;
		background: #fff;
		padding-top: 18rpx;
		padding-bottom: 18rpx;
		position: fixed;
		bottom: 0;
		width: 100%;
		z-index: 99;
		height: 75rpx;
		border-top:2rpx solid #eee;
	}
	
	.index-d view {
		float: left;
		width: 33%;
	}
	
	.index-im {
		width: 56rpx;
		margin: 0 auto;
		display: block;
		height: 69rpx;
	}
	
	.index-d p {
		text-align: center;
		font-size: 20rpx;
		color: #999;
		width: 100%;
		display: block;
		margin-top: 12rpx;
	}
	
	.index-d .active-index p {
		color: #8a7353;
	}
	
	/* 重写 checkbox 样式 */
	/* 未选中的 背景样式 */
	.checkboxs .wx-checkbox-input {
		border-radius: 50% ;
		/* 圆角 */
		width: 21rpx;
		/* 背景的宽 */
		height: 21rpx;
		/* 背景的高 */
	}
	
	/* 选中后的 背景样式 （红色背景 无边框 可根据UI需求自己修改） */
	 .wx-checkbox-input.wx-checkbox-input-checked {
		border: 1rpx solid #2b5cff;
		background: #2b5cff;
	}
	
	/* 选中后的 对勾样式 （白色对勾 可根据UI需求自己修改） */
	.checkboxs .wx-checkbox-input.wx-checkbox-input-checked::before {
		border-radius: 50%;
		/* 圆角 */
		width: 21rpx;
		/* 选中后对勾大小，不要超过背景的尺寸 */
		height: 21rpx;
		/* 选中后对勾大小，不要超过背景的尺寸 */
		line-height: 21rpx;
		text-align: center;
		font-size: 20rpx;
		/* 对勾大小 30rpx */
		color: #fff;
		/* 对勾颜色 白色 */
		background: transparent;
		transform: translate(-50%, -50%) scale(1);
		-webkit-transform: translate(-50%, -50%) scale(1);
	}
	.toubu{
		margin-top:70rpx!important;
	}
	.toubu1{
		margin-top:90rpx!important;
	}
	.dne{
		margin-top:160rpx;
	}
	button::after {
		display: none;
	}
	
	radio {
		transform:scale(0.7)
	}
</style>
