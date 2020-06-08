<template>
	<view>
		<view class="uni-form-item uni-column">
			<text style="padding-left: 20rpx;">收货人</text>
			<input style='float:right;width:200rpx;text-align:right;margin-right:40rpx;' class="uni-input" name="input" v-model='username'
			 placeholder="收货人" />
		</view>

		<view class="basic">
			<view class="left_a">
				<text>手机号</text>
			</view>
			<view class="right_a">
				<view class="img_a">
					<input type="number" v-model='phone' style='float:left;text-align:right;margin-top:-20rpx;'>
					<image src="../../../../static/icon_26.png" mode=""></image>
				</view>
			</view>
		</view>

		<view class="basic">
			<pick-regions :defaultRegion="defaultRegionCode" @getRegion="handleGetRegion">
				<view class="left_a" style="font-size: 28rpx;color: #666;line-height: 50rpx" v-model="regionName">{{isOk?(isAdd?'点击选择省市区':regionName):addressss}}</view>
				<view class="right_a">
					<view class="img_a">
						<input style='float:left;text-align:center;margin-top:-20rpx;'></input>
						<image src="../../../../static/icon_26.png" mode=""></image>
					</view>
				</view>
			</pick-regions>
		</view>
		<view class="uni-form-item uni-column beizs">
			<text style="font-size: 28rpx">详细地址:</text>
			<input class="uni-input" name="input" placeholder="详细地址：如道路、门牌号、小区、楼栋号、单元室等" v-model='address' />
		</view>
		<view class="uni-list">
			<view class="uni-list-cell uni-list-cell-pd">
				<view class="uni-list-cell-db">
					<text>设为默认地址</text>
				</view>
				<switch checked @change='xuanzhong' />
			</view>
		</view>

		<view class="uni-padding-wrap uni-common-mt bott">
			<button size="mini" type="primary" @tap='baocun' :style="isOk?'background: #2b5cff;width:60%':'background: #2b5cff'">保存</button>
			<button size="mini" type="primary" v-if="!isOk" @tap="del(id)" style="background: #ff3334;">删除</button>
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
				checked: true,
				region: [],
				defaultRegion: ['山东省', '济南市', '槐荫区'],
				defaultRegionCode: '370104'
			}
		},
		onLoad: function(option) {
			// console.log(option)
			var ob = JSON.parse(option.address)
			// option.address?this.isAdd=false:this.isAdd=true,
			// if(ob){
			if (ob) {
				this.username = ob.username
				this.phone = ob.phone
				this.addressss = ob.cityInfo
				this.address = ob.address
				this.id = ob.id
				this.isOk = false
				console.log(ob)
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
				}
			},
			switch1Change: function(e) {
				console.log('switch1 发生 change 事件，携带值为', e.target.value)
			},
			switch2Change: function(e) {
				console.log('switch2 发生 change 事件，携带值为', e.target.value)
			},
			baocun: function() {
				this.$https({
					url: '/api/user/address-add-edit',
					data: JSON.stringify({
						address: this.address,
						phone: this.phone,
						cityInfo: this.regionName,
						username: this.username,
						id: this.id,
						isDefault: this.checked ? 1 : ''
					}),
					haeder: true,
					dengl: false,
					method: 'post',
					success: function(res) {
						console.log(res)
						uni.navigateTo({
							url: 'siteList'
						})
					}
				})
			},
			xuanzhong: function(e) {
				this.checked = e.detail.value
			},
			del() {
				console.log(2222)
				var _this = this
				if (!this.isOk) {
					_this.$https({
						url: '/api/user/address-del',
						method:'POST',
						data: {
							addressId: _this.id
						},
						
						dengl: false,
						success: function(res) {
							// alert('确定要删除')
							uni.navigateTo({		
								url:'siteList'
							})
							console.log(res.data)
						}
					})

				}

			}

		}

	}
</script>

<style lang="scss">
	page {
		background-color: #f7f7f7;
	}

	.uni-column {
		width: 750upx;
		display: block;
		padding-top: 30upx;
		background-color: #fff;
		overflow: hidden;
		border-bottom: 1upx solid #f7f7f7;

		.uni-input {
			background-color: #fff;
			width: 700upx;
			float: left;
			font-size: 28upx;
			margin-left: 20upx;
			font-family: Microsoft YaHei;
			display: block;
			padding-bottom: 30upx;
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
		border-bottom: 20upx solid #f7f7f7;

		.uni-input {
			height: 100upx;
		}
	}

	.basic {
		width: 710upx;
		background-color: #fff;
		overflow: hidden;
		padding: 20upx;
		padding-bottom: 10upx;
		border-bottom: 1upx solid #f7f7f7;

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
				padding: 20upx 0upx 20upx 20upx;

				image {
					width: 12upx;
					height: 14upx;
					display: block;
				}

			}
		}
	}

	.uni-list {
		width: 710upx;
		height: 60upx;
		padding: 20upx;
		background: #fff;

		.uni-list-cell-db {
			float: left;
			background-color: #fff;

			text {
				font-size: 30upx;
				color: #999;
			}
		}

		switch {
			float: right;
			transform: scale(0.8)
		}
	}

	.bott {
		width: 670upx;
		position: fixed;
		bottom: 40upx;
		left: 40upx;
		display: flex;

		button {
			width: 35%;
			height: 65rpx;
			line-height: 65rpx;
			border-radius: 40upx;
			font-family: Microsoft YaHei;
		}

	}
</style>
