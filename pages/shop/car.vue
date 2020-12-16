<template>
	<view>
		<input style='width:545rpx;height:68rpx;background:#eee;line-height:68rpx;margin:0 auto;border-radius:50rpx;margin-top:20rpx;padding-left:93rpx;'
		 placeholder='请输入关键字搜索...'>
		<image src='../../static/sousuo.png' style='width:36rpx;height:36rpx;position:relative;margin-top:-50rpx;margin-left:91rpx;position:absolute;'></image>
		<scroll-view :scroll-into-view='xuan' scroll-with-animation='true' scroll-y='true' style='top:100rpx;position:fixed;height:90%;'>
			<view v-for='(item,index) in list' :id='item.name' v-if='item.list.length>0'>
				<view :style='index==0?"margin-top:30rpx;background:#eee;padding:0 44rpx;line-height:60rpx;":"background:#eee;padding:0 44rpx;line-height:60rpx;"'>{{item.name}}</view>
				<view v-for='(items,indexs) in item.list' :style='indexs==item.list.length-1?"overflow:hidden;line-height:90rpx;margin:0 20rpx;":"overflow:hidden;line-height:90rpx;margin:0 20rpx;border-bottom:1px dashed #efefef;"'
				 @tap='qiehuan(items.carId,items.carName)'>
					<image :src='items.logo' style='width:60rpx;height:60rpx;float:left;margin-top:15rpx;margin-left:20rpx;'></image>
					<view style='float:left;margin-left:20rpx;'>{{items.carName}}</view>
				</view>
			</view>
		</scroll-view>
		<scroll-view scroll-y='true' style='position:fixed;top:10%;right:20rpx;width:50rpx;height:79%;text-align:center;border:1px solid #bfbfbf;border-radius:50rpx;background:#fff;'>
			<view v-for='(item,index) in list' :style='xuanzhong==index?"color:#597cff;margin-top:10rpx;margin-bottom:10rpx;":"color:#555;margin-top:10rpx;margin-bottom:10rpx;font-size:24rpx;"'
			 @tap='gundong(item.name,index)'>{{item.name}}</view>
		</scroll-view>
		<view class='zhezhao' v-if='zhezhao'>
			<view>
				<view>{{pinpai}}</view>
				<view>
					<view v-for='(item,index) in car' @tap='quxiaozhe(item.carId)'>
						<image :src='item.logo'></image>
						<view>{{item.carName}}</view>
					</view>
				</view>
			</view>
		</view>
		<view style='width:100%;height:100%;position:fixed;top:0;left:0;background:rgba(0,0,0,0.5);' v-if='chepaiz'>
			<view style='width:500rpx;height:530rpx;position:absolute;margin:auto;top:0;left:0;right:0;bottom:0;background:#fff;text-align:center;border-radius: 15rpx;'>
				<view style='margin-top:20px;text-align:center;'>添加爱车</view>
				<view style='display:inline-block;margin-top:25rpx;'>
					<view style='float:left;line-height:52rpx;width:100rpx;background:#ededed;height: 52rpx;box-sizing: border-box;border-top-left-radius: 4rpx;border-bottom-left-radius: 4rpx;' @tap='xuanze'>{{chenghumingcheng}}<i
						 style='float:right;width:0;height:0;border:12rpx solid #ededed;border-top:12rpx solid #ddd;margin-top:20rpx;margin-right:10rpx;'></i></view>
					<input v-model='chepai' style='border:1px solid #eee;margin:0 auto;width:200rpx;line-height:52rpx;float:left;height:52rpx;box-sizing: border-box;border-top-right-radius: 4rpx;border-bottom-right-radius: 4rpx;'>
				</view>
				<view style='text-align:center;margin-top:20rpx;font-size:26rpx;'>车辆照片</view>
				<image :src='tupian' style='width:136rpx;height:136rpx;display:block;margin:0 auto;margin-top:30rpx;' @tap='tu'></image>
				<view style='overflow:hidden;margin:0 auto; position: absolute;left: 50rpx; right: 50rpx;z-index: 99;bottom: 50rpx; position: absolute;left: 50rpx;right: 50rpx;z-index: 99; bottom: 50rpx'>
					<view style='width:160rpx;float:left;border:1px solid #eee;border-radius:2rpx;line-height:50rpx;text-align:center;font-size:26rpx ;border-radius: 6rpx;'
					 @tap='quxiao'>取消</view>
					<view style='width:160rpx;float:right;border-radius:2rpx;line-height:50rpx;text-align:center;font-size:26rpx;background:#2b5cff;color:#fff;border-radius: 6rpx;'
					 @tap='tian'>确定</view>
				</view>
			</view>
		</view>
		<view style='position:fixed;bottom:0;width:100%;left:0;height:250rpx;background:#ddd;color:#666;' v-if='xianshi'>
			<view v-for='(item,z) in cheng' :style='index==z?"float:left;background:#2b64a4;width:50rpx;height:50rpx;text-align:center;line-height:50rpx;border-radius:5rpx;margin-left:10rpx;margin-top:20rpx;color:#fff;":"float:left;background:#fff;width:50rpx;height:50rpx;text-align:center;line-height:50rpx;margin-left:10rpx;margin-top:20rpx;"'
			 @tap='dianji(z)'>{{item}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				xuanzhong: 0,
				xuan: '',
				pinpai: '',
				car: [],
				zhezhao: false,
				aiChe: '',
				chepaiz: false,
				chepai: '',
				tupian: '../../static/img_10.jpg.png',
				id: '',
				chenghumingcheng: '鲁',
				cheng: ['京', '津', '沪', '渝', '蒙', '新', '藏', '宁', '桂', '黑', '吉', '辽', '晋', '冀', '青', '鲁', '豫', '苏', '皖', '浙', '闽',
					'赣', '湘', '鄂', '粤', '琼', '甘', '陕', '贵', '云', '川'
				],
				index: 0,
				xianshi: false
			}
		},
		onLoad(option) {
			this.aiChe = option.id
			// console.l
			var _this = this
			this.$https({
				url: '/api/oauth/shop/mall-car-brand-lists',
				data: {},
				success: function(res) {
					for (var i in res.data.data) {
						var obj = {}
						obj.name = i
						obj.list = res.data.data[i]
						_this.list.push(obj)
					}
				}
			})
		},
		methods: {
			gundong: function(l, index) {
				this.xuan = l
				this.xuanzhong = index
			},
			qiehuan: function(carId, carName) {
				var _this = this
				this.zhezhao = true
				this.pinpai = carName
				this.$https({
					url: '/api/oauth/shop/mall-car-type-lists',
					data: {
						carId: carId
					},
					success: function(res) {
						_this.car = res.data.data
					}
				})
			},
			quxiaozhe: function(id) {
				this.zhezhao = false
				if (this.aiChe == 1) {
					//添加爱车
					this.chepaiz = true
					this.id = id
				} else {
					uni.navigateTo(
						this.aiChe ? {
							url: '../user/task/aiChe'
						} : {
							url: './all?goodsBrandId=' + this.list[this.xuanzhong].list[0].carId + '&carId=' + id
						})
				}
			},
			tu: function() {
				uni.chooseImage({
					count: 1,
					success: res => {
						uni.uploadFile({
							url: this.webUrl + '/api/oauth/oss/upload',
							filePath: res.tempFilePaths[0],
							name: 'img',
							success: res => {
								this.tupian = JSON.parse(res.data).data.url
							}
						})
					}
				})
			},
			quxiao: function() {
				this.chepaiz = false
			},
			tian: function() {
				if (!
					/^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/
					.test(this.chenghumingcheng + this.chepai)) {
					uni.showToast({
						title: '请输入正确的车牌号',
						icon: 'none'
					})
					return false
				}
				this.$https({
					url: '/api/user/edit-my-favorite-car',
					data: JSON.stringify({
						carCateId: this.id,
						carNum: this.chenghumingcheng + this.chepai,
						myCarImg: this.tupian,
						id: 0
					}),
					haeder: true,
					method: 'post',
					success: function(res) {
						uni.navigateBack({
							delta:1
						})
					}
				})
			},
			xuanze: function() {
				this.xianshi = !this.xianshi
			},
			dianji: function(z) {
				this.index = z
				this.chenghumingcheng = this.cheng[z]
			}
		}
	}
</script>

<style>
	.zhezhao {
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.6);
		z-index: 999999;
		position: fixed;
	}

	.zhezhao>view {
		width: 90%;
		right: 0;
		top: 0;
		height: 100%;
		background: #fff;
		z-index: 999999;
		position: fixed;
	}

	.zhezhao>view>view:first-child {
		color: #333;
		line-height: 50rpx;
		text-align: center;
	}

	.zhezhao>view>view {
		overflow: hidden;
		margin-top: 20rpx;
	}

	.zhezhao>view>view>view {
		float: left;
		width: 50%;
		text-align: center;
	}

	.zhezhao>view>view image {
		width: 200rpx;
		height: 200rpx;
	}

	.zhezhao>view>view>view view {
		line-height: 50rpx;
	}
</style>
