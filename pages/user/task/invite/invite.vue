<template>
	<view>
		<view class="Box">
			<view class="imgBox">
				<image :src="s" mode=""></image>
				<view>
					<image :src='s1'></image>
					<view>
						<tki-qrcode @ss='ss' :val='val' size='250' style='width:250rpx;height:250rpx;position:absolute;top:0;left:0;right:0;bottom:0;margin:auto;'></tki-qrcode>
					</view>
				</view>
				<!-- #ifndef H5 -->
				<image :src='s2' style='width:284rpx;height:77rpx;position:absolute;left:calc(50% - 143rpx);bottom:100rpx;' @tap='creat_img'></image>
				<!-- #endif-->
				<!-- #ifdef H5 || MP-WEIXIN -->
				<image :src='s2' style='width:284rpx;height:77rpx;position:absolute;left:calc(50% - 143rpx);bottom:100rpx;' @tap='creat_img'></image>
				<!-- #endif -->
			</view>
			<view class="canvas_show" v-show="isShare" style='position:fixed;height:100%;width:100%;'>
				<canvas canvas-id="shareCanvas" :style="'width:'+imgWidth+'px;height:'+imgHeight+'px'"></canvas>
			</view>
			<!-- <image :src='shareImg' style='position:fixed;left:0;top:0;height:100%;width:100%;' v-show='isShare'></image> -->
			<!-- 文字较多时，内部进度条 -->
			<!-- <view class="brief"> -->
			<!-- <rich-text :nodes='w'></rich-text> -->
			<!-- </view> -->
		</view>
	</view>
</template>
<script>
	import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue'
	export default {
		data() {
			return {
				s: '../../../../static/ff.jpg',
				s1: '../../../../static/f.jpg',
				s2: '../../../../static/fff.png',
				w: '',
				val: '',
				isShare:false,
				imgHeight:100,
				imgWidth:100,
				shareImg:'',
				ss:''
			}
		},
		components: {
			tkiQrcode
		},
		onLoad(option) {
			this.val = 'http://www.yimuzk.com:8087/?code=' + option.code
			setTimeout(res=>{
				console.log(this.ss)
			},3000)
			uni.getSystemInfo({
				    success:  (res) =>{
				        this.imgHeight=res.windowHeight
						this.imgWidth=res.windowWidth
				    }
				});
			var _this = this
			this.$https({
				url: '/api/task/get-share-page',
				success: function(res) {
					// _this.s=res.data.data.backgroundImg
					_this.w = res.data.data.content
				}
			})
		},
		methods: {
			capture() {
				var pages = getCurrentPages();
				var page = pages[pages.length - 1];
				console.log("当前页" + pages.length - 1);
				var _this = this
				this.s = '../../../../static/ff1.png'
				this.s1 = '../../../../static/f1.png'
				this.s2 = '../../../../static/fff1.png'
				var bitmap = null;
				var currentWebview = page.$getAppWebview();
				bitmap = new plus.nativeObj.Bitmap('amway_img');
				// 将webview内容绘制到Bitmap对象中  
				setTimeout(function() {
					currentWebview.draw(bitmap, function() {
						console.log('截屏绘制图片成功');
						bitmap.save("_doc/a.jpg", {}, function(i) {
							console.log('保存图片成功：' + JSON.stringify(i));
							_this.s = '../../../../static/ff.jpg'
							_this.s1 = '../../../../static/f.jpg'
							_this.s2 = '../../../../static/fff.png'
							uni.saveImageToPhotosAlbum({
								filePath: i.target,
								success: function() {
									bitmap.clear(); //销毁Bitmap图片  
									uni.share({
										provider: "weixin",
										scene: "WXSceneSession",
										type: 2,
										imageUrl: i.target,
										success: function(res) {
											console.log("success:" + JSON.stringify(res));
										},
										fail: function(err) {
											console.log("fail:" + JSON.stringify(err));
										}
									});
									uni.showToast({
										title: '保存图片成功',
										mask: false,
										duration: 1500
									});
								}
							});
						}, function(e) {
							console.log('保存图片失败：' + JSON.stringify(e));
						});
					}, function(e) {
						console.log('截屏绘制图片失败：' + JSON.stringify(e));
					});
				}, 200)

				//currentWebview.append(amway_bit);    
			},
			creat_img() {
							uni.showLoading({
								title: '生成海报中',
								mask:true
							});
							let that = this;
							that.isShare = true; //生成海报的时候要显示才可以
							var ctx = uni.createCanvasContext("shareCanvas");
							ctx.drawImage('../../../../static/ff1.png', 0, 0, 75, 133.4); //绘制黑色背景图
							ctx.drawImage('../../../../static/f1.png', 10, 70, 59, 59); //绘制黑色背景图
							ctx.drawImage('../../../../static/f1.png', 10, 70, 59, 59); //绘制黑色背景图
							setTimeout(function(){
								ctx.draw(true, that.canvasToTempFilePath());
							},200)
						},
						canvasToTempFilePath(type) {
							let that = this;
							setTimeout(function() {
								uni.canvasToTempFilePath({
									x: 0,
									y: 0, 
									width: that.imgWidth,
									height: that.imgHeight,
									fileType: "jpg",
									quality: 1,
									canvasId: "shareCanvas", 
									success: function(res) {
										uni.hideLoading();
										that.shareImg = res.tempFilePath;
										console.log(that.shareImg);
										uni.downloadFile({
										                url: that.shareImg, //仅为示例，并非真实的资源
										                success: (resFilePath) => {
										                    if (resFile.statusCode === 200) {
										                        resolve(resFilePath);
										                    }
										                }
										             });
									},
									fail(res) {
										console.log(res);
									}
								}, that);
							}, 1000);
						},
		}
	}
</script>

<style lang="scss">
	.imgBox {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;

		>view {
			width: 700rpx;
			height: 600rpx;
			position: absolute;
			bottom: 60rpx;
			left: 25rpx;

			>view {
				position: absolute;
				height: 100%;
				width: 100%;
				left: 0;
				top: 0;
			}

			>image {
				border-radius: 20rpx;
			}
		}

		image {
			width: 100%;
			height: 100%;
		}
	}

	.brief {
		position: fixed;
		top: 40%;
		left: 20upx;
		background-color: #fff;
		box-shadow: 0 0 5px #ccc;
		width: 670upx;
		height: 40%;
		border-radius: 20upx;
		padding: 20upx;
		overflow-y: auto;

		text {
			color: #333;
			line-height: 40upx;
			font-size: 28upx;
		}
	}
</style>
