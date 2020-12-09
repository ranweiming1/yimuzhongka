<template>
	<view>
		<view class="uni-form-item uni-column uni-top">
			<text style="padding-left: 20rpx;color:#000;font-size:26rpx;">收货人</text>
			<input style='float:right;width:200rpx;text-align:right;margin-right:40rpx;font-size:26rpx;color:#000;' class="uni-input"
			 name="input" v-model='username' placeholder="收货人" />
		</view>

		<view class="basic">
			<view class="left_a">
				<text style='font-size:26rpx;color:#000;'>手机号</text>
			</view>
			<view class="right_a">
				<view class="img_a">
					<input type="number" v-model='phone' placeholder='+86' style='float:left;text-align:right;;margin-right:12rpx;font-size:26rpx;color:#000;'>
					<image src="../../../../static/icon_26.png" mode=""></image>
				</view>
			</view>
		</view>

		<view class="basic">
			<pick-regions :defaultRegion="defaultRegionCode" @getRegion="handleGetRegion">
				<view class="left_a" style="font-size: 26rpx;color: #000;height: 100rpx;line-height: 100rpx;">所在地区</view>
				<view class="right_a">
					<view class="img_a">
						<view style='float:left;font-size:26rpx;color:#999;'>{{isOk?(isAdd?'选择省市县':regionName):addressss}}</view>
						<image style='margin-left:20rpx;' src="../../../../static/icon_26.png" mode=""></image>
					</view>
				</view>
			</pick-regions>
		</view>
		<view class="uni-form-item uni-column beizs">
			<text style="font-size: 26rpx;padding-left:20rpx;color:#000;">详细地址：</text>
			<input class="uni-input" name="input" style='font-size:26rpx;color:#000;' placeholder="详细地址：如道路、门牌号、小区、楼栋号、单元室等"
			 v-model='address' />
		</view>
		<view class='uni-list' style="border-bottom: 1rpx solid #e5e5e5;">
			<view class="title">地址标签</view>
			<view class="item-bott">
				<view class="item-bott-item" :class="botIndex==1?'activeItem':''" @tap="checkedBot(1)">
					家
				</view>
				<view class="item-bott-item" :class="botIndex==2?'activeItem':''" @tap="checkedBot(2)">
					公司
				</view>
				<view class="item-bott-item" :class="botIndex==3?'activeItem':''" @tap="checkedBot(3)">
					学校
				</view>
			</view>
		</view>

		<view class="uni-list">
			<view class="uni-list-cell uni-list-cell-pd">
				<view class="uni-list-cell-db">
					<text style='color:#000;'>设为默认地址</text>
				</view>
				<switch :checked='checked==1' color="#2b5cff" @change='xuanzhong' />
			</view>
		</view>

		<view class="uni-padding-wrap uni-common-mt bott">
			<button size="mini" type="primary" @tap='baocun' :style="isOk?'background: #2b5cff;width:60%':'background: #2b5cff;'">保存</button>
			<button size="mini" type="primary" v-if="!isOk" @tap="xianshi(id)" style="background: #ff3334;">删除</button>
		</view>
		<view style='width:100%;position:fixed;top:0;left:0;background:rgba(0,0,0,0.6);z-index:1000000;height:100%;' v-if='shanchu'>
			<view style='width:600rpx;height:200rpx;background:#fff;position:absolute;top:0;left:0;right:0;bottom:0;margin:auto;'>
				<view style='text-align:center;margin-top:20rpx;'>您确定删除地址?</view>
				<view style='text-align:center;margin-top:20rpx;'>
					<view style='display:inline-block;background:#eee;width:230rpx;text-align:center;line-height:70rpx;height:70rpx;border-radius:10rpx;float:left;margin-left:20rpx;'
					 @tap='quxiao'>取消</view>
					<view style='display:inline-block;background:#2d5eff;color:#fff;width:230rpx;text-align:center;line-height:70rpx;height:70rpx;border-radius:10rpx;float:right;margin-right:20rpx;'
					 @tap='del'>确定</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import pickRegions from '@/components/pick-regions/pick-regions.vue'
	export default {
		data() {
			return {
				username: '',
				phone: '',
				addressss: '',
				address: '',
				isAdd: true,
				isOk: true,
				id: '',
				checked: 0,
				region: [],
				defaultRegion: ['山东省', '济南市', '槐荫区'],
				defaultRegionCode: '370104',
				goodsId: '',
				cartAttr: '',
				youhuiid: '',
				moneys: '',
				zhid: '',
				dingdan: '',
				shopId: '',
				y: '',
				shanchu: false,
				j: false,
				ids: 0,
				regionName: '',
				la: '',
				botIndex:''
			}
		},
		onLoad: function(option) {
			// option.address?this.isAdd=false:this.isAdd=true,
			// if(ob){
			if (option.address) {
				var ob = JSON.parse(option.address)
				this.username = ob.username
				this.phone = ob.phone
				this.addressss = ob.cityInfo
				this.address = ob.address
				this.id = ob.id
				this.isOk = false
				this.checked = ob.isDefault
				this.la = ob.label
				this.botIndex=ob.label=='家'?'1':ob.label=='公司'?'2':ob.label=='学校'?'3':'0'
			}
			if (option.goodsId) {
				this.goodsId = option.goodsId
				this.cartAttr = option.cartAttr
				this.zhid = option.zhid
				this.youhuiid = option.id
				this.moneys = option.money
				this.dingdan = option.dingdan
				this.shopId = option.shopId
				this.y = JSON.parse(option.y)
				this.la = option.label
				this.botIndex=option.label=='家'?'1':option.label=='公司'?'2':option.label=='学校'?'3':'0'
			}
			if (option.j) {
				this.j = true
				this.ids = option.id
			}
			// this.isAdd=false
			// console.log(this.regionName))
		},
		components: {
			pickRegions
		},
		computed: {
			regionName() {
				// 转为字符串
				return this.region.map(item => item.name).join(' ')
			}
		},
		methods: {
			// 获取选择的地区
			handleGetRegion(region) {
				var _this = this
				// console.log(this.region)
				if (this.region) {
					_this.isAdd = false
					_this.region = region
					_this.regionName = region[0].name + region[1].name + region[2].name
				}
			},
			switch1Change: function(e) {
				console.log('switch1 发生 change 事件，携带值为', e.target.value)
			},
			switch2Change: function(e) {
				console.log('switch2 发生 change 事件，携带值为', e.target.value)
			},
			checkedBot:function(index){
				this.botIndex=index
				this.la=index==1?'家':index==2?'公司':index==3?'学校':''
			},
			baocun: function() {
				var _this = this
				if (this.$jiaoyan(this.phone)) {
					this.$https({
						url: '/api/user/address-add-edit',
						data: JSON.stringify({
							address: this.address,
							phone: this.phone,
							cityInfo: this.regionName ? this.regionName : this.addressss,
							username: this.username,
							id: this.id,
							isDefault: this.checked ? 1 : 0,
							label: this.la
						}),
						haeder: true,
						dengl: false,
						method: 'post',
						success: function(res) {
							if (res.data.code == 0) {
								uni.showToast({
									title: '操作成功'
								})
								if (_this.j) {
									uni.navigateTo({
										url: '../../../cart/orderForm/jifen?id=' + _this.ids + '&dizhi=' + JSON.stringify(res.data.data)
									})
									return false
								}
								if (_this.goodsId) {
									uni.navigateTo({
										url: '../../../cart/orderForm/orderForm?goodsId=' + _this.goodsId + '&cartAttr=' + _this.cartAttr +
											'&zhid=' + _this.zhid + '&money=' + _this.moneys + '&id=' + _this.youhuiid + '&dingdan=' + _this.dingdan +
											'&shopId=' + _this.shopId + '&y=' + JSON.stringify(_this.y)
									})
								} else {
									uni.navigateTo({
										url: 'siteList'
									})
								}
							} else {
								uni.showToast({
									title: res.data.message
								})
							}
						}
					})
				} else {
					uni.showToast({
						title: '请输入正确的手机号',
						icon: 'none'
					})
				}
			},
			xuanzhong: function(e) {
				this.checked = e.detail.value
			},
			del() {
				var _this = this
				if (!this.isOk) {
					_this.$https({
						url: '/api/user/address-del',
						method: 'POST',
						data: {
							addressId: _this.id
						},

						dengl: false,
						success: function(res) {
							// alert('确定要删除')
							uni.navigateTo({
								url: 'siteList'
							})
							console.log(res.data)
						}
					})

				}

			},
			xianshi: function() {
				this.shanchu = true
			},
			quxiao: function() {
				this.shanchu = false
			}

		}

	}
</script>

<style lang="scss">
	page {
		background-color: #f7f7f7;
	}

	.uni-top {
		line-height: 100rpx;
		height: 100rpx;
	}

	.uni-column:first-child {
		border-top: 1rpx solid #e5e5e5;
	}

	.uni-column {
		width: 750upx;
		display: block;
		// padding-top: 30upx;
		background-color: #fff;
		overflow: hidden;
		border-bottom: 1upx solid #ebebef;


		.uni-input {
			// background-color: #fff;
			width: 700upx;
			float: left;
			font-size: 28upx;
			margin-left: 20upx;
			font-family: Microsoft YaHei;
			display: block;
			height: 100rpx;
			line-height: 100rpx;
		}

		.imgBox {
			float: left;
			padding-top: 30upx;
			padding-left: 20upx;

			image {
				width: 175upx;
				height: 175upx;
			}
		}
	}

	.beizs {
		width: 750upx;
		border-bottom: 1rpx solid #ebebef;
		margin-bottom: 20rpx;

		text {
			display: block;
			height: 80rpx;
			line-height: 100rpx;
		}

		.uni-input {
			height: 100upx;
		}
	}

	.basic {
		width: 710upx;
		background-color: #fff;
		overflow: hidden;
		height: 100rpx;
		line-height: 100rpx;
		padding: 0 20rpx;
		border-bottom: 1upx solid #ebebef;
		font-size: 28rpx;
		color: #666;

		.left_a {
			float: left;

			text {
				font-size: 28upx;
				color: #666;
				line-height: 50upx;
			}
		}

		.right_a {
			float: right;
			padding-right: 10upx;

			text {
				font-size: 28upx;
				float: right;
				line-height: 50upx;

				text {
					color: #ff670c;
				}
			}

			.img_l {
				float: left;
				padding-right: 10upx;
				padding-top: 5upx;

				image {
					width: 45upx;
					height: 45upx;
				}

			}

			.img_a {
				float: right;
				// padding: 20upx 0upx 20upx 20upx;
				height: 100rpx;
				line-height: 100rpx;

				input {
					height: 100%;
					line-height: 100rpx;
				}

				image {
					width: 13upx;
					height: 19upx;
					// display: block;
				}

			}
		}
	}

	.uni-list {
		width: 710upx;
		height: 60upx;
		padding: 0 20upx;
		background: #fff;
		height: 125rpx;
		line-height: 125rpx;
		overflow: hidden;

		.uni-list-cell-db {
			float: left;
			background-color: #fff;

			text {
				font-size: 30rpx;
				color: #999;
			}

			.title {
				float: left;
			}
		}


		.title {
			float: left;
		}

		.item-bott {
			float: right;

			.item-bott-item {
				box-sizing: border-box;
				width: 120rpx;
				border: 1rpx solid #e5e5e5;
				color: #666666;
				height: 50rpx;
				display: inline-block;
				text-align: center;
				border-radius: 25rpx;
				line-height: 50rpx;
				margin-right: 15rpx;
				font-size: 22rpx;
			}
			.activeItem{
				border: 1rpx solid #2b5cff;
				color: #2b5cff;
			}
			.item-bott-item:last-child{
				margin-right: 0;
			}
		}

		switch {
			float: right;
			transform: scale(0.8)
		}
	}

	.bott {
		width: 750upx;
		display: flex;
		margin-top: 200rpx;

		button {
			width: 35%;
			height: 65rpx;
			line-height: 65rpx;
			border-radius: 40upx;
			font-family: Microsoft YaHei;
		}

	}
</style>
