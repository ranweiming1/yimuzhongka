<template>
	<view class="view-style" style="width: 100%; overflow-x: hidden;-webkit-overflow-scrolling: touch;">
		<!-- 背景图 -->
		<view class="bg_img">
			<image src="../../../static/jfBnner.png" mode=""></image>
		</view>

		<!-- 头部 -->
		<view class="top">
			<view class="topImg" @tap="toUser">
				<image src="../../../static/icon_26-2.png" mode=""></image>
			</view>
			<view class="textBox">
				<text>任务中心</text>
			</view>
			<view class="imgBox" @tap='jifenEx'>
				<image src="../../../static/icon_31.png" mode=""></image>
			</view>
		</view>

		<!-- 用户名 -->
		<view class="userBox">
			<view class="img_a">
				<image :src="userList.headimg" mode=""></image>
			</view>
			<view class="text_a">
				<view class="yonghum">
					<text>{{userList.nickname}}</text>
				</view>
				<view class="phone">
					<text>{{userList.phone}}</text>
				</view>
			</view>
			<view class="imgRight">
				<view class="uni-padding-wrap uni-common-mt bott" @tap="qianD">
					<button type="primary" :style="isQian?'background:#f9b52e;color:#fff;':'color:#666'">{{isQian?'点击签到':'已签到'}}</button>
				</view>
			</view>

			<view class="jil">
				<view class="leiji">
					<text>累计签到{{date?date:'0'}}天</text>
				</view>
				<view class="rig" @tap='tiaozhuan'>
					<text style='float:left;'>{{userList.payPoints}} <text>积分数</text> </text>
					<view class="img_o">
						<image src="../../../static/icon_23.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>



		<!-- 进度条 -->
		<view class="bgWhite">
			<view class="Box">
				<view class="formerly">
					<view class="date" :style="state[0]?'color:#fff':'color:rgba(0,0,0,0)'">
						<text>+{{n}}分</text>
					</view>
					<!-- <view class="data" v-if="state[0]">
						
					</view> -->
					<view class="ima_p">
						<image :src="state[0]?'../../../static/icon_33.png':'../../../static/icon_32.png'" mode="">
							<view class="hFrame_t" :style="state[0]||state[1]||state[2]||state[3]||state[4]||state[5]||state[6]?'':'border-bottom: 2px solid #fff'"></view>
						</image>
					</view>
					<view class="date">
						<text>一</text>
					</view>

				</view>

				<view class="formerly_a">
					<view class="date" :style="state[1]?'color:#fff':'color:rgba(0,0,0,0)'">
						<text>+{{n1}}分</text>
					</view>
					<view class="ima_p">
						<view class="hFrame_o" :style="state[1]||state[2]||state[3]||state[4]||state[5]||state[6]?'':'border-bottom: 2px solid #fff'"></view>
						<image :src="state[1]?'../../../static/icon_33.png':'../../../static/icon_32.png'" mode=""></image>
						<view class="hFrame_t" :style="state[1]||state[2]||state[3]||state[4]||state[5]||state[6]?'':'border-bottom: 2px solid #fff'"></view>
					</view>
					<view class="date">
						<text>二</text>
					</view>

				</view>

				<view class="formerly_b">
					<view class="date" :style="state[2]?'color:#fff':'color:rgba(0,0,0,0)'">
						<text>+{{n2}}分</text>
					</view>
					<view class="ima_p">
						<view class="hFrame_o" :style="state[2]||state[3]||state[4]||state[5]||state[6]?'':'border-bottom: 2px solid #fff'"></view>
						<image :src="state[2]?'../../../static/icon_33.png':'../../../static/icon_32.png'" mode=""></image>
						<view class="hFrame_t" :style="state[2]||state[3]||state[4]||state[5]||state[6]?'':'border-bottom: 2px solid #fff'"></view>
					</view>
					<view class="date">
						<text>三</text>
					</view>
				</view>
				<view class="formerly_c">
					<view class="date" :style="state[3]?'color:#fff':'color:rgba(0,0,0,0)'">
						<text>+{{n3}}分</text>
					</view>
					<view class="ima_p">
						<view class="hFrame_o" :style="state[3]||state[4]||state[5]||state[6]?'':'border-bottom: 2px solid #fff'"></view>
						<image :src="state[3]?'../../../static/icon_33.png':'../../../static/icon_32.png'" mode=""></image>
						<view class="hFrame_t" :style="state[3]||state[4]||state[5]||state[6]?'':'border-bottom: 2px solid #fff'"></view>
					</view>
					<view class="date">
						<text>四</text>
					</view>
				</view>
				<view class="formerly_d">
					<view class="date" :style="state[4]?'color:#fff':'color:rgba(0,0,0,0)'">
						<text>+{{n4}}分</text>
					</view>
					<view class="ima_p">
						<view class="hFrame_o" :style="state[4]||state[5]||state[6]?'':'border-bottom: 2px solid #fff'"></view>
						<image :src="state[4]?'../../../static/icon_33.png':'../../../static/icon_32.png'" mode=""></image>
						<view class="hFrame_t" :style="state[4]||state[5]||state[6]?'':'border-bottom: 2px solid #fff'"></view>
					</view>
					<view class="date">
						<text>五</text>
					</view>
				</view>
				<view class="formerly_e">
					<view class="date" :style="state[5]?'color:#fff':'color:rgba(0,0,0,0)'">
						<text>+{{n5}}分</text>
					</view>
					<view class="ima_p">
						<view class="hFrame_o" :style="state[5]||state[6]?'':'border-bottom: 2px solid #fff'"></view>
						<image :src="state[5]?'../../../static/icon_33.png':'../../../static/icon_32.png'" mode=""></image>
						<view class="hFrame_t" :style="state[5]||state[6]?'':'border-bottom: 2px solid #fff'"></view>
					</view>
					<view class="date">
						<text>六</text>
					</view>
				</view>
				<view class="formerly_f">
					<view class="date" :style="state[6]?'color:#fff':'color:rgba(0,0,0,0)'">
						<text>+{{n6}}分</text>
					</view>
					<view class="ima_p">
						<view class="hFrame_o" :style="state[6]?'':'border-bottom: 2px solid #fff'"></view>
						<image :src="state[6]?'../../../static/icon_33.png':'../../../static/icon_32.png'" mode=""></image>
					</view>
					<view class="date">
						<text>日</text>
					</view>
				</view>
			</view>
		</view>

		<view class="gain">
			<!-- <view class="tit">
				<text>做任务赚积分</text>
			</view> -->
			<view class="frame">
				<view class="frameTop">
					<view class="top_Left">
						<text>任务列表</text>
					</view>
					<view class="top_right">
						<text>当天未领取的奖励将于24点过期</text>
					</view>
				</view>
				<view class="clear">

				</view>
				<view class="ul" v-for="(item,index) in taskList" v-if='!(item.taskName=="商品追评")'>
					<view class="icon_img">
						<image src="../../../static/rw_icon6.png" mode=""></image>
					</view>
					<view class="ruCenter">
						<view class="title_u">
							<text>{{item.taskName}}</text>
						</view>
						<view class="span">
							<text>奖励{{item.integral}}积分</text>
						</view>
					</view>

					<view class="uni-padding-wrap uni-common-mt bottg" @tap="renWu(item,4)">
						<view class="rwButt">{{item.taskStatus?'已完成':item.postUrl==6?'去邀请':'去完成'}}

						</view>
						<!-- <button type="primary" :style="item.taskStatus?'':'background:#bfbfbf;color:#666;'">{{item.taskStatus?'已完成':'去完成'}}</button> -->
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
				taskList: [],
				userList: {},
				date: '',
				taskId: '',
				qianDate: [],
				isQian: true,
				systemDate: '',
				// isList: false,
				state: [],
				isRen: '',
				n: '',
				n1: '',
				n2: '',
				n3: '',
				n4: '',
				n5: '',
				n6: '',
				id:''
			}
		},
		onLoad() {
			this.xuanR()
		},
		methods: {
			xuanR() {
				var _this = this
				this.$https({
					url: '/api/task/center-index',
					dengl: false,
					data: {},
					success: function(res) {
						_this.userList = res.data.data.userInfo
						_this.date = res.data.data.signInDays
						_this.qianDate = res.data.data.storeIntegralLogList
						console.log(res.data.data)
						res.data.data.storeIntegralLogList.map(z => {
							if (z.integralType == 0) {
								_this.n = z.integral
								_this.n1 = z.integral
								_this.n2 = z.integral
								_this.n3 = z.integral
								_this.n4 = z.integral
								_this.n5 = z.integral
								_this.n6 = z.integral
							}
						})

						// 获取当前时间
						function dateRiqi(i) {
							var nowDate = new Date(i);
							let date = {
								year: nowDate.getFullYear(),
								month: nowDate.getMonth() + 1,
								date: nowDate.getDate(),
							}

							function pan(i) {
								if (i < 10) {
									i = '0' + i;
								}
								return i;
							}
							var systemDate = date.year + '-' + pan(date.month) + '-' + pan(date.date);
							return systemDate
						}
						_this.systemDate = dateRiqi(new Date)
						// console.log(_this.qianDate)
						// 获取返回数据的时间
						_this.isQian = !res.data.data.signInStatus
						// console.log(_this.systemDate)
						// 周几
						var week = new Date(_this.systemDate).getDay()
						// 时间戳
						var dateTime = Date.parse(_this.systemDate)
						// console.log(dateTime)
						// 当天之前
						var arr = []
						var state = []

						for (var i = week - 1; i > 0; i--) {
							arr.push(dateRiqi(dateTime - (i) * 86400000))
						}
						arr.push(_this.systemDate)
						for (var i = 0; i < 7 - week; i++) {
							arr.push(dateRiqi(dateTime + (i + 1) * 86400000))
						}
						for (var i = 0; i < arr.length; i++) {
							var nu = 0
							for (var j = 0; j < _this.qianDate.length; j++) {
								if (arr[i] == _this.qianDate[j].createTime) {
									nu++
								}
							}
							nu > 0 ? state.push(true) : state.push(false)
						}
						_this.state = state
					}
				})
				this.$https({
					url: '/api/task/center-get-task-list',
					data: {},
					method: 'post',
					success: res => {
						this.taskList = res.data.data
						console.log(res.data.data)

						// 获取当前时间
						function dateRiqi(i) {
							var nowDate = new Date(i);
							let date = {
								year: nowDate.getFullYear(),
								month: nowDate.getMonth() + 1,
								date: nowDate.getDate(),
							}

							function pan(i) {
								if (i < 10) {
									i = '0' + i;
								}
								return i;
							}
							var systemDate = date.year + '-' + pan(date.month) + '-' + pan(date.date);
							return systemDate
						}
						_this.systemDate = dateRiqi(new Date)
						// console.log(_this.qianDate)
						// 获取返回数据的时间
						_this.isQian = !res.data.data.signInStatus
						// console.log(_this.systemDate)
						// 周几
						var week = new Date(_this.systemDate).getDay()
						// 时间戳
						var dateTime = Date.parse(_this.systemDate)
						// console.log(dateTime)
						// 当天之前
						var arr = []
						var state = []

						for (var i = week - 1; i > 0; i--) {
							arr.push(dateRiqi(dateTime - (i) * 86400000))
						}
						arr.push(_this.systemDate)
						for (var i = 0; i < 7 - week; i++) {
							arr.push(dateRiqi(dateTime + (i + 1) * 86400000))
						}
						for (var i = 0; i < arr.length; i++) {
							var nu = 0
							for (var j = 0; j < _this.qianDate.length; j++) {
								if (arr[i] == _this.qianDate[j].createTime) {
									nu++
								}
							}
							nu > 0 ? state.push(true) : state.push(false)
						}
						_this.state = state
					}
				})
				this.$https({
					url:'/api/user/my-info',
					data:{},
					success:res=>{
						this.id=res.data.data.myCode
					}
				})
				// },
			},
			jifenEx: function() {
				uni.navigateTo({
					url: '../jifenStore/jifenExplain'
				})
			},
			qianD() {
				var _this = this
				if (this.isQian) {
					this.$https({
						url: '/api/task/center-signIn',
						data: JSON.stringify({
							integral: 5,
							taskId: 0
						}),
						method: 'POST',
						haeder: true,
						success: function(res) {
							_this.isQian = false
							_this.xuanR()
						}
					})

				}

			},
			lingJifen(taskId, isRen, taskType) {
				this.$https({
					url: '/api/task/center-task-insert',
					data: {
						taskId: taskId,
						taskType: taskType
					},
					method: 'POST',
					success: function(res) {
						isRen = true
					}
				})
			},
			toUser: function() {
				uni.reLaunch({
					url: '../user'
				})
			},
			renWu: function(item, id) {
				// console.log(id)
				var _this = this
				var state = item.postUrl
				var isRen = item.taskStatus
				var taskType = item.taskType
				var taskId = item.taskId
				// console.log(taskId)
				if (!isRen) {
					if (state == 1) {
						this.$https({
							url: '/api/task/center-signIn',
							data: JSON.stringify({
								integral: 5,
								taskId: 0
							}),
							method: 'post',
							haeder: true,
							success: res => {
								this.isQian = false
								this.xuanR()
							}
						})
					}
					if (state == 2 || state == 3) {
						uni.navigateTo({
							url: '../../classify/fenlOne'
						})

					}
					if (state == 4 || state == 5) {
						uni.navigateTo({
							url: '../allState/allState?id=' + id
						})
						state == 4 ? _this.lingJifen(taskId, isRen, taskType) : _this.lingJifen(taskId, isRen, taskType)
						// _this.xuanR()
					}
					// if (state == 6) {
					// 	uni.navigateTo({
					// 		url: './invite/invite'
					// 	})
					// 	_this.lingJifen(taskId, isRen, taskType)
					// 	// _this.xuanR()

					// }
					// _this.xuanR()
				}
				if(state==6){
					uni.navigateTo({
						url:'invite/invite?val='+this.id
					})
				}

			},
			tiaozhuan: function() {
				uni.navigateTo({
					url: '../jifenStore/jifenStore'
				})
			}
		}
	}
</script>

<style lang="scss">
	.view-style {
		width: 100%;
		overflow: hidden;
	}

	.bg_img {
		// background-color: #2b5cff;
		width: 750upx;
		height: 600upx;

		// background: url('../../../static/jfBnner.png');
		image {
			width: 750rpx;
			height: 100%;
		}
	}



	.top {
		position: absolute;
		top: 10upx;
		left: 0upx;
		width: 750upx;
		margin: 0 auto;
		overflow: hidden;
		padding-top: 50rpx;
		text-align: center;

		.topImg {
			float: left;
			/* padding: 30rpx 35rpx; */
			width: 90rpx;
			height: 90rpx;

			image {
				width: 18rpx;
				height: 32rpx;
				display: block;
				padding: 29rpx 36rpx;

			}
		}

		.textBox {
			display: inline-block;
			overflow: hidden;

			text {
				font-size: 32upx;
				color: #fff;
				float: left;
				line-height: 90upx;
			}
		}

		.imgBox {
			float: right;
			width: 90rpx;
			height: 90rpx;

			image {
				width: 42upx;
				height: 42upx;
				padding: 25upx;
				display: block;
			}
		}
	}

	.userBox {
		width: 700upx;
		position: absolute;
		top: 170upx;
		left: 25upx;
		overflow: hidden;

		.img_a {
			float: left;

			image {
				width: 120upx;
				height: 120upx;
				border-radius: 120upx;
			}
		}

		.text_a {
			float: left;
			padding-left: 20upx;
			width: 350upx;

			.yonghum {
				font-size: 34upx;
				color: #fff;
				line-height: 70upx;
			}

			.phone {
				font-size: 24upx;
				color: #fff;
			}
		}

		.imgRight {
			float: right;
			padding-top: 35upx;

			image {
				width: 12upx;
				height: 20upx;
			}

		}


		.jil {
			width: 710upx;
			float: left;
			padding-left: 20upx;
			padding-right: 20upx;
			display: block;

			.leiji {
				text {
					padding-top: 30upx;
					float: left;
					font-size: 36upx;
					color: #fff;
					text-align: center;
				}
			}

			.rig {
				float: right;
				padding-right: 30upx;
				text-align: center;

				text {
					width: 200upx;
					font-size: 40upx;
					color: #fff;
					display: block;

					text {
						font-size: 20upx;
						display: block;
					}
				}

				.img_o {
					float: left;
					padding-top: 40upx;

					image {
						width: 16upx;
						height: 28upx;
					}
				}
			}

		}
	}

	.bgWhite {
		width: 100%;
		height: 120upx;
		// box-shadow: 0 0 5px #ccc;
		position: absolute;
		top: 400upx;
		// left: 25upx;
		// background-color: #fff;
		border-radius: 20upx;
		padding: 0 20upx 20upx 20upx;
		color: #FFFFFF;
		box-sizing: border-box;
	}

	.bott {
		width: 165upx;
		float: right;

		button {
			background-color: #fff;
			color: #f9b52e;
			color: #fff;
			border-radius: 40upx;
			font-size: 24upx;
			font-family: Microsoft YaHei;
		}

	}

	.Box {
		// position: relative;
		padding-top: 22upx;
		width: 100%;
		// height: 2upx;
		// margin-left: 20upx;
		display: flex;
		justify-content: space-around;
		flex-direction: row;
		overflow: hidden;

		.hFrame_t {
			width: 35rpx;
			border-bottom: 2px solid #ffd711;
			top: 50%;
			position: absolute;
			/* margin-top: -3px;wxcs_style_margin-top; */
			right: -35rpx;
			margin-top: -4.5rpx;
		}

		.hFrame_o {
			width: 35rpx;
			border-bottom: 2px solid #ffd711;
			top: 50%;
			position: absolute;
			/* margin-top: -3px;wxcs_style_margin-top; */
			left: -35rpx;
			margin-top: -4.5rpx;
		}

		.formerly {
			// position: absolute;
			// top: -30upx;
			// left: -15upx;
			// text-align: center;

			.date {
				text {
					font-size: 24upx;
				}
			}

			.ima_p {
				position: relative;
				width: 33upx;

				image {
					width: 32upx;
					height: 32upx;
				}
			}
		}

		.formerly_a {
			// position: absolute;
			// top: -30upx;
			// left: 12%;
			// text-align: center;

			.date {
				text {
					font-size: 24upx;
				}
			}

			.ima_p {
				position: relative;
				width: 33upx;

				image {
					width: 32upx;
					height: 32upx;
				}
			}
		}

		.formerly_b {
			// position: absolute;
			// top: -30upx;
			// left: 28%;
			// text-align: center;

			.date {
				text {
					font-size: 24upx;
				}
			}

			.ima_p {
				width: 32upx;
				position: relative;

				image {
					width: 32upx;
					height: 32upx;
				}
			}
		}

		.formerly_c {
			// position: absolute;
			// top: -30upx;
			// left: 43%;
			// text-align: center;

			.date {
				text {
					font-size: 24upx;
				}
			}

			.ima_p {
				width: 32upx;
				position: relative;

				image {
					width: 32upx;
					height: 32upx;
				}
			}
		}

		.formerly_d {
			// position: absolute;
			// top: -30upx;
			// left: 60%;
			// text-align: center;

			.date {
				text {
					font-size: 24upx;
				}
			}

			.ima_p {
				width: 32upx;
				position: relative;

				image {
					width: 32upx;
					height: 32upx;
				}
			}
		}

		.formerly_e {
			// position: absolute;
			// top: -30upx;
			// right: 13%;
			// text-align: center;

			.date {
				text {
					font-size: 24upx;
				}
			}

			.ima_p {
				width: 32upx;
				position: relative;

				image {
					width: 32upx;
					height: 32upx;
				}
			}
		}

		.formerly_f {
			// position: absolute;
			// top: -30upx;
			// right: -20upx;
			// text-align: center;

			.date {
				text {
					font-size: 24upx;
				}
			}

			.ima_p {
				width: 32upx;
				position: relative;

				image {
					width: 32upx;
					height: 32upx;
				}
			}
		}
	}

	.gain {
		position: relative;
		top: -20rpx;
		left: 20upx;

		.tit {
			text {}
		}

		.frame {
			width: 660upx;
			// height: 460upx;
			margin-left: 8upx;
			box-shadow: 0 0 5px #b6b9e5;
			background-color: #fff;
			border-radius: 20upx;
			padding: 20upx 20upx 20rpx 20upx;
			overflow: hidden;
			margin-bottom: 50rpx;

			.frameTop {
				overflow: hidden;
				margin-bottom: 45rpx;

				.top_Left {
					float: left;
					background-color: #0083f7;
					color: #fff;
					font-size: 26rpx;
					width: 153rpx;
					height: 57rpx;
					position: absolute;
					// top: 8rpx;
					left: 8rpx;
					border-top-right-radius: 30rpx;
					border-bottom-right-radius: 30rpx;
					text-align: center;
					line-height: 57rpx;
				}

				.top_right {
					float: right;
					color: #999;
					font-size: 26rpx;
					line-height: 57rpx;
					// position: absolute;
					// right: 30rpx;
					// top: 8rpx;
				}
			}

			.clear {
				// height: 100rpx;
			}

			.ul {
				// border-bottom: 1px dotted #ccc;
				overflow: hidden;
				// margin-bottom: 20upx;
				margin-top: 20upx;
				padding-bottom: 20upx;

				.title_u {
					font-size: 30upx;
					line-height: 50upx;
					color: #333;
					// float: left;
					padding-right: 20upx;
				}

				.ruCenter {
					float: left;
				}

				.icon_img {
					width: 96rpx;
					height: 96rpx;
					float: left;
					margin-right: 30rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.span {
					// float: left;
					font-size: 24upx;
					line-height: 50upx;
					color: #999;
				}

				.bottg {
					// width: 140upx;
					float: right;

					button {
						background-color: #2b5cff;
						color: #fff;
						border-radius: 10upx;
						font-size: 22upx;
						font-family: Microsoft YaHei;
					}
				}
			}

			.ul:last-child {
				border-bottom: 0
			}

			.rwButt {
				width: 140rpx;
				height: 60rpx;
				border: 1rpx solid #ef7e1e;
				line-height: 60rpx;
				text-align: center;
				border-radius: 35rpx;
				color: #ef7e1e;
				margin-top: 18rpx;
			}

		}

	}
</style>
