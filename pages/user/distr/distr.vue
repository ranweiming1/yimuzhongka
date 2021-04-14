<template>
	<view>
		<!-- 头部 -->
		<!-- #ifndef H5 -->
		<view class="top">
			<view class='back' @tap='bac'>
				<image src='../../../static/icon_26-2.png' ></image>
			</view>
			<view class="textBox">
				<text>我的佣金</text>
			</view>
			<!-- <view class="imgBox" @tap='wenti'>
				<image src="../../../static/icon_34.png" mode=""></image>
			</view> -->
		</view>
		<!-- #endif -->

		<!-- 分销卡片 -->
		<view class="distr">
			<view class="imgBox_a">
				<image src="../../../static/icon_35.png" mode=""></image>
			</view>
			<view class="leijis">
				<view class="one">
					<text>当前佣金(元)</text>
				</view>
				<view class="two">
					<text>{{cashCont.grandTotal}}</text>
				</view>
				<!-- 	<view class="three">
					<text>已含冻结金额：{{cashCont.freezeAmount}}元</text>
				</view> -->
			</view>
			<view class="shuzhi">
				<view class="jia" @tap="add">
					<view class="imgBox_b">
						<image src="../../../static/jia.png" mode=""></image>
					</view>
					<view class="texts">
						<view class="sou">
							<text>累计收益</text>
						</view>
						<view class="shu">
							<text>￥{{cashCont.aggregateAmount}}</text>
						</view>
					</view>
				</view>
				<view class="jian" @tap="reduce">
					<view class="imgBox_b">
						<image src="../../../static/jian.png" mode=""></image>
					</view>
					<view class="texts">
						<view class="sou">
							<text>提现金额</text>
						</view>
						<view class="shu">
							<text>￥{{cashCont.withdrawalAmount}}</text>
						</view>
					</view>
				</view>
			</view>

			<!-- 提现 -->
			<view class="cash" @tap="ruleToggle">
				提现
			</view>
		</view>
		<view class="rule-mask" v-if="ruleTyle">
			<view class="rule_cont">
				<view class="rule_title">
					提现规则
				</view>
				<view class="rule_cont_cont">
					<rich-text :nodes="content.content"></rich-text>
				</view>

				<view class="rule_bot">
					<view class="rule_agree" @tap='ruleToggle'>
						确认
					</view>

				</view>
			</view>

		</view>
		<!-- 历史明细 -->
		<view class="history">
			<view class="tit_b">
				<text>历史明细</text>
			</view>
			<view class="ul">
				<!-- 收入明细 -->
				<view class="li" v-if="isShow" v-for="(item,i) in cashCont.rebateLog">
					<view class="text_y">
						<view class="phone">
							<text>用户{{item.memberDTO.phone.replace(/(\d{3})\d{4}(\d{4})/,'$1****$2')}}</text>
						</view>
						<view class="neirs">
							<text style="font-size: 26rpx;">{{item.rebateName}} </text> <text
								style="font-size: 24rpx;margin-left: 20rpx;"> {{item.createTime}}</text>
						</view>
					</view>

					<!-- 增值状态 -->
					<view class="jine">
						<text>佣金+{{item.rebatePrice}}</text>
					</view>
				</view>
				<!-- 提现明细 -->
				<view class="li" v-if="!isShow" v-for="(item,i) in cashCont.withdrawalLog">
					<view class="text_y">
						<view class="phone">
							<text>{{item.title}}</text>
						</view>
						<view class="neirs">
							<text style="font-size: 24rpx;">{{item.createTime}}</text>
						</view>
					</view>

					<!-- 增值状态 -->
					<view class="jine">
						<text>-{{item.moneyNumber}}</text>
					</view>
				</view>

			</view>
			<view class="uni-padding-wrap uni-common-mt botts">
				<button @tap="cashOut" type="primary" style="background: #2b5cff;">我要提现</button>
			</view>
		</view>
		<!-- <view style='width:100%;height:100%;position:fixed;top:0;left:0;background:rgba(0,0,0,0.6);z-index:99999;'
			v-if='wenzi' @tap='went'>
			<view
				style='width:600rpx;height:200rpx;background:#fff;position:absolute;top:0;left:0;bottom:0;right:0;margin:auto;'>
				<view>问题</view>
			</view>
		</view> -->
		<view class="rule-mask" @tap='wenti' v-if="wenzi">
			<view class="rule_cont">
				<view class="rule_title">
					问题
				</view>
				<view class="rule_cont_cont">
					<rich-text :nodes="content.content"></rich-text>
				</view>

				<view class="rule_bot">
					<view class="rule_agree" @tap.stop='wentiClose'>
						确认
					</view>

				</view>
			</view>

		</view>



	</view>

</template>

<script>
	export default {
		data() {
			return {
				wenzi: false,
				ruleTyle: false,
				content: '',
				cashCont: [],
				isShow: true,
				page: 1,
				loadingType: 0,
			}
		},
		onPullDownRefresh() {
			//下拉的生命周期
			this.getNews()
		},
		onReachBottom() {
			console.log(8768678)
			var data = {
				page: this.page + 1,
				limit: 10
			}
			this.getMoreNews(data)
		},
		
		onLoad: function() {
			var that = this
			//佣金
			this.$https({
				url: '/api/user/my-bound-index',
				data: {
					limit:2,
					page:this.page
				},
				success: function(res) {
					// if (res.data.data.rebateLog) {
					// 	res.data.data.rebateLog.map(function(val, i) {
					// 		val.phone = val.memberDTO.phone.replace(/(\d{3})\d{4}(\d{4})/,'$1****$2')

					// 	})
					// 	console.log(res.data.data)
					// }
					that.cashCont = res.data.data

				}
			})
			this.$https({
				url: '/api/oauth/help/protocol-withdrawal',
				data: {},
				dengl: false,
				method: 'POST',
				success: function(res) {
					that.content = res.data.data
					console.log(res.data.data)
				}
			})
		},
		methods: {
			getNews() {
				this.page = 1
				var _this = this
				//标题读取样式激活
				uni.showNavigationBarLoading()
				this.$https({
					url: '/api/user/my-bound-index',
					data: {
						page: _this.page,
						limit: 2
					},
					dengl: true,
					success: function(res) {
						_this.newz = res.data.data
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
					return false; //loadingType!=0;直接返回
				}
				_this.loadingType = 1;
				uni.showNavigationBarLoading();
				this.$https({
					url: '/api/user/my-bound-index',
					data: data,
					success(res) {
						if(_this.isShow){
							if (res.data.data.rebateLog.length < 10 || res.data.data.rebateLog ==
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
						}else{
						if (res.data.data.withdrawalLog.length < 10 || res.data.data.withdrawalLog ==
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
						}
						_this.newz = _this.newz.concat(res.data.data)
						_this.loadingType = 0; //将loadingType归0重置
						uni.hideNavigationBarLoading(); //关闭加载动画
					}
				})
			},
			
			add() {
				this.isShow = true
			},
			reduce() {
				this.isShow = false
			},
			cashOut() {
				uni.navigateTo({
					url: 'applyFor?money=' + this.cashCont.grandTotal
				})
			},
			wenti: function() {
				this.wenzi = !this.wenzi
			},
			wentiClose() {
				this.wenzi = false
			},
			ruleToggle() {
				this.ruleTyle = !this.ruleTyle
			},
			bac: function() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss">
	.clear {
		height: 160rpx;
	}

	.rule-mask {
		position: fixed;
		z-index: 998;
		height: 100%;
		width: 100%;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(0, 0, 0, 0.4);
		font-size: 26rpx;

		.rule_title {
			text-align: center;
			font-size: 30rpx;
			margin-bottom: 30rpx;
		}

		.rule_cont {
			position: absolute;
			z-index: 999;
			background: #fff;
			top: 50%;
			transform: translateY(-50%);
			left: 90rpx;
			right: 90rpx;
			border-radius: 20rpx;
			box-sizing: border-box;
			padding: 30rpx 50rpx;

			.rule_cont_cont {
				display: block;
				color: #333;
				line-height: 45rpx;
				max-height: 180rpx;
				overflow: auto;
				// text{
				// 	display: inline-block;
				// }

			}

			.rule_bot {
				overflow: hidden;
				margin-top: 30rpx;

				view {
					text-align: center;
					width: 40%;
					height: 65rpx;
					border-radius: 45rpx;
					line-height: 65rpx;
					height: 65rpx;
					font-size: 26rpx;
					background-color: #1a5fe3;
					color: #fff;
					margin-left: 50%;
					transform: translateX(-50%);
				}
			}
		}
	}

	.top {
		overflow: hidden;
		border-bottom: 1px solid #e5e5e5;
		height: 90rpx;
		text-align: center;
		position: fixed;
		width: 100%;
		left: 0;
		top: 0;
		z-index: 99999;
		background: #fff;
		padding-top: 70rpx;
	
		.back {
			width: 90rpx;
			height: 90rpx;
			line-height: 90rpx;
			float: left;
	
			image {
				width: 18rpx;
				height: 32rpx;
				display: block;
				padding: 29rpx 36rpx;
			}
		}
	
		.textBox {
			margin-right: 90rpx;
			display: inline-block;
	
			text {
				font-size: 32rpx;
				color: #333;
				float: left;
				line-height: 90upx;
			}
		}
	
	
		.imgBox {
			float: right;
			width: 90rpx;
			height: 90rpx;
			line-height: 90rpx;
	
			image {
				width: 36upx;
				height: 36upx;
				display: block;
				margin: 27rpx;
			}
		}
	}
	
	.distr {
		position: relative;
		top: 190rpx;
		width: 690rpx;
		left: 30rpx;
		right: 30rpx;
		overflow: hidden;
		height: 328rpx;

		.imgBox_a {
			position: absolute;
			left: 0;
			right: 0;

			image {
				width: 100%;
				height: 330upx;
				box-shadow: 0 0 8px #ccc;
			}
		}
	}

	.leijis {
		position: relative;
		// left: 30%;
		margin-top: 35upx;
		text-align: center;

		.one {
			color: #fff;
			font-size: 28upx;
		}

		.two {
			font-size: 60upx;
			font-weight: bold;
			color: #fff;
			margin-top: 10rpx;
			margin-bottom: 5rpx;
			text-shadow: 2px 2px 5px #0994da;
		}

		.three {
			color: #fff;
			font-size: 28upx;
		}
	}

	.shuzhi {
		width: 690rpx;
		position: relative;
		// left: 90rpx;
		overflow: hidden;
		margin-bottom: 45rpx;
		margin-top: 50rpx;


		.jia {
			width: 50%;
			float: left;
			box-sizing: border-box;
			padding-left: 85rpx;

			.imgBox_b {
				float: left;
				padding-top: 20upx;

				image {
					width: 40upx;
					height: 40upx;
				}
			}

			.texts {
				float: left;
				padding-left: 10upx;
				font-size: 28upx;
				color: #fff;
			}
		}

		.jian {
			width: 50%;
			float: left;
			box-sizing: border-box;
			padding-left: 85rpx;

			.imgBox_b {
				float: left;
				padding-top: 20upx;

				image {
					width: 40upx;
					height: 40upx;
				}
			}

			.texts {
				float: left;
				padding-left: 10upx;
				font-size: 28upx;
				color: #fff;
			}
		}
	}

	.cash {

		position: absolute;
		right: 80upx;
		top: 30upx;
		text-align: center;
		width: 94upx;
		height: 48upx;
		border: 1px solid #fff;
		color: #fff;
		font-size: 24upx;
		line-height: 48upx;
	}

	.history {
		// margin-bottom: 200upx;
		width: 750upx;
		position: absolute;
		top: 540upx;
		left: 0;

		.ul {
			margin-bottom: 180rpx;

		}

		.tit_b {
			width: 100%;
			box-sizing: border-box;
			border-bottom: 20upx solid #f7f7f7;
			padding: 20upx;
			padding-left: 30upx;

			text {
				font-size: 34upx;
				color: #010101;
			}
		}

		.li {
			// width: 710upx;
			margin: 0 25rpx 0 30upx;
			overflow: hidden;
			border-bottom: 1px dashed #ccc;
			padding: 25rpx 0 25rpx 10rpx;
			box-sizing: border-box;

			.text_y {
				float: left;

				.phone {
					margin-bottom: 10upx;

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
				color: #ff0000;
				line-height: 45upx;
			}

			.jineFu {
				float: right;
				padding-top: 20upx;
				font-size: 30upx;
				color: #3399ff;
				line-height: 35upx;
			}
		}
	}

	.botts {

		// margin: 80rpx 67rpx;
		margin: 0 60rpx;
		position: fixed;
		bottom: 40rpx;
		left: 0;
		right: 0;

		button {
			border-radius: 45upx;
			font-family: Microsoft YaHei;
			height: 80rpx;
			line-height: 80rpx;
		}

	}
</style>
