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
	
	
	radio {
		transform:scale(0.7)
	}
</style>
