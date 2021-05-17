<template>
	<view class="content">
		<!-- <view class="one_line">
		</view>
		 -->
		<view class="li" v-for="(item,index) in list">
			<view class="text_y">
				<view class="phone">
					<text>用户{{phone.replace(/(\d{3})\d{4}(\d{4})/,'$1****$2')}}</text>
				</view>
				<view class="neirs" style='margin-top:10rpx;'>
					<text>{{item.integralName}}</text>
				</view>
			</view>

			<!-- 增值状态 -->
			<view class="jine">
				<text
					style='display:block;text-align:right;font-size:26rpx;'>{{item. xfType==2?'-'+item.integral:'+' +item.integral}}</text>
				<text style='color:#666;font-size:24rpx;'>{{item.createTime}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: {},
				phone: '',
				page: 1,
				loadingType: 0,
			}
		},
		onLoad(option) {
			// console.log(option)
			this.phone = option.id
			var _this = this
			// this.$https({
			// 	url: '/api/task/center-integralLog',
			// 	data: {},
			// 	dengl: false,
			// 	method: 'POST',
			// 	success: function(res) {
			// 		_this.list = res.data.data
			// 		console.log(res.data.data)
			// 	}
			// })
			var data = {
				page: this.page,
				limit: 10
			}
			this.getNews(data)
		},
		onPullDownRefresh() {
			//下拉的生命周期
			var data = {
				page: this.page,
				limit: 10
			}
			this.getNews(data)
		},
		onReachBottom() {
			var data = {
				page: this.page + 1,
				limit: 10
			}
			this.getMoreNews(data)
		},
		methods: {
			getNews(data) {
				this.page = 1
				var _this = this
				//标题读取样式激活
				uni.showNavigationBarLoading()
				this.$https({
					url: '/api/task/center-integralLog',
					data: data,
					dengl: false,
					method: 'POST',
					success: function(res) {
						_this.list = res.data.data
						//隐藏标题读取 
						uni.hideNavigationBarLoading()
						uni.stopPullDownRefresh()
					}
				})

			},
			getMoreNews(data) {
				var _this = this
				this.page++
				if (_this.loadingType != 0) {
					uni.showToast({
						title: '已加载全部数据',
						icon: 'none',
						duration: 2000
					})
					return false; //loadingType!=0;直接返回
				}
				_this.loadingType = 1;
				uni.showNavigationBarLoading();
				this.$https({
					url: '/api/task/center-integralLog',
					dengl: false,
					data: data,
					method: 'POST',
					success(res) {
						if (res.data.data.length < 10 || res.data.data ==
							'null') { //当之前的数据长度等于count时跳出函数，不继续执行下面语句
							_this.loadingType = 2;
							uni.showToast({
								title: '已加载全部数据',
								icon: 'none',
								duration: 2000
							})
							uni.hideNavigationBarLoading(); //关闭加载动画
							return false;
						}
						_this.list = _this.list.concat(res.data.data)
						_this.loadingType = 0; //将loadingType归0重置
						uni.hideNavigationBarLoading(); //关闭加载动画
					}
				})
			},
		}

	}
</script>

<style lang="scss">
	.content {
		border-top: 1px solid #ccc;
	}

	.li {
		width: 710upx;
		padding: 20upx;
		overflow: hidden;
		border-bottom: 1px dotted #ccc;

		.text_y {
			float: left;

			.phone {
				text {
					font-size: 30upx;
					color: #666;
					line-height: 35upx;
				}
			}

			.neirs {
				text {
					font-size: 30upx;
					color: #666;
					line-height: 35upx;
				}
			}

		}

		.jine {
			float: right;
			padding-top: 20upx;
			font-size: 30upx;
			color: #0062f6;
			line-height: 35upx;
		}

		.jineFu {
			float: right;
			padding-top: 20upx;
			font-size: 30upx;
			color: #3399ff;
			line-height: 35upx;
		}
	}
</style>
