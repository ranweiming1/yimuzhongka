<template>
	<view>
		<view class="uni-form-item uni-column">
			<text>收货人</text>
			<input style='float:right;width:200rpx;text-align:right;margin-right:40rpx;' class="uni-input" name="input" v-model='username' placeholder="收货人" />
		</view>

		<view class="basic">
			<view class="left_a">
				<text>手机号</text>
			</view>
			<view class="right_a">
				<view class="img_a">
					<input v-model='phone' style='float:left;text-align:right;margin-top:-20rpx;'>
					<image src="../../../../static/icon_26.png" mode=""></image>
				</view>
			</view>
		</view>

		<view class="basic">
			<view class="left_a">
				<text>所在地区</text>
			</view>
			<view class="right_a">
				<view class="img_a">
					<input style='float:left;text-align:center;margin-top:-20rpx;' v-model='addressss'></input>
					<image src="../../../../static/icon_26.png" mode=""></image>
				</view>
			</view>
		</view>

		<view class="uni-form-item uni-column beizs">
			<text>详细地址:</text>
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
			<button type="primary" @tap='baocun'>保存</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username:'',
				phone:'',
				addressss:'',
				address:'',
				id:'',
				checked:true
			}
		},
		onLoad:function(option){
			var ob=JSON.parse(option.address)
			this.username=ob.username
			this.phone=ob.phone
			this.addressss=ob.cityInfo
			this.address=ob.address
			this.id=ob.id
		},
		methods: {
			switch1Change: function(e) {
				console.log('switch1 发生 change 事件，携带值为', e.target.value)
			},
			switch2Change: function(e) {
				console.log('switch2 发生 change 事件，携带值为', e.target.value)
			},
			baocun:function(){
				this.$https({url:'/api/user/address-add-edit',data:JSON.stringify({address:this.address,phone:this.phone,cityInfo:this.addressss,username:this.username,id:this.id,isDefault:this.checked?1:''}),haeder:true,dengl:false,method:'post',success:function(res){
					uni.navigateTo({
						url:'siteList'
					})
					}
				})
			},
			xuanzhong:function(e){
				this.checked=e.detail.value
			}
		}
	}
</script>

<style lang="scss">
	page{
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
	.uni-list{
		width: 710upx;
		height: 60upx;
		padding: 20upx;
		background: #fff;
		.uni-list-cell-db{
			float: left;
			background-color: #fff;
			text{
				font-size: 30upx;
				color: #999;
			}
		}
		switch{
			float: right;
			transform:scale(0.8)
		}
	}
	.bott{
		width: 670upx;
		position: fixed;
		bottom: 40upx;
		left: 40upx;
		
		button{
			border-radius: 40upx;
			font-family:Microsoft YaHei;
		}
		
	}
</style>
