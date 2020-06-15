<template>
	<view>
		<!-- 背景图 -->
		<view class="bg_img">
		</view>

		<!-- 头部 -->
		<view class="top">
			<view class="textBox">
				<text>任务中心</text>
			</view>
			<view class="imgBox">
				<image src="../../../static/icon_31.png" mode=""></image>
			</view>
		</view>

		<!-- 用户名 -->
		<view class="userBox">
			<view class="img_a">
				<image :src="userList.heading" mode=""></image>
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
					<button type="primary" :style="isQian?'':'background:#bfbfbf;color:#666666'">{{isQian?'点击签到':'已签到'}}</button>
				</view>
			</view>

			<view class="jil">
				<view class="leiji">
					<text>累计签到{{date?date:'0'}}天</text>
				</view>
				<view class="rig">
					<text>{{userList.payPoints}} <text>积分数</text> </text>
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
					<view class="date" :style="state[0]?'color:#999999':''">
						<text>+5分</text>
					</view>
					<view class="ima_p">
						<image :src="state[0]?'../../../static/icon_32.png':'../../../static/icon_33.png'" mode=""></image>
					</view>
					<view class="date">
						<text>周一</text>
					</view>
				</view>

				<view class="formerly_a">
					<view class="date" :style="state[1]?'color:#999999':''">
						<text>+5分</text>
					</view>
					<view class="ima_p">
						<image :src="state[1]?'../../../static/icon_32.png':'../../../static/icon_33.png'" mode=""></image>
					</view>
					<view class="date">
						<text>周二</text>
					</view>
				</view>

				<view class="formerly_b">
					<view class="date" :style="state[2]?'color:#999999':''">
						<text>+5分</text>
					</view>
					<view class="ima_p">
						<image :src="state[2]?'../../../static/icon_32.png':'../../../static/icon_33.png'" mode=""></image>
					</view>
					<view class="date">
						<text>周三</text>
					</view>
				</view>
				<view class="formerly_c">
					<view class="date" :style="state[3]?'color:#999999':''">
						<text>+5分</text>
					</view>
					<view class="ima_p">
						<image :src="state[3]?'../../../static/icon_32.png':'../../../static/icon_33.png'" mode=""></image>
					</view>
					<view class="date">
						<text>周四</text>
					</view>
				</view>
				<view class="formerly_d">
					<view class="date" :style="state[4]?'color:#999999':''">
						<text>+5分</text>
					</view>
					<view class="ima_p">
						<image :src="state[4]?'../../../static/icon_32.png':'../../../static/icon_33.png'" mode=""></image>
					</view>
					<view class="date">
						<text>周五</text>
					</view>
				</view>
				<view class="formerly_e">
					<view class="date" :style="state[5]?'color:#999999':''">
						<text>+5分</text>
					</view>
					<view class="ima_p">
						<image :src="state[5]?'../../../static/icon_32.png':'../../../static/icon_33.png'" mode=""></image>
					</view>
					<view class="date">
						<text>周六</text>
					</view>
				</view>
				<view class="formerly_f">
					<view class="date" :style="state[6]?'color:#999999':''">
						<text>+5分</text>
					</view>
					<view class="ima_p">
						<image :src="state[6]?'../../../static/icon_32.png':'../../../static/icon_33.png'" mode=""></image>
					</view>
					<view class="date">
						<text>周日</text>
					</view>
				</view>
			</view>
		</view>

		<view class="gain">
			<view class="tit">
				<text>做任务赚积分</text>
			</view>
			<view class="frame">
				<view class="ul" v-for="(item,index) in taskList">
					<view class="title_u">
						<text>{{item.taskName}}</text>
					</view>
					<view class="span">
						<text>奖励{{item.integral}}积分</text>
					</view>
					<view class="uni-padding-wrap uni-common-mt bottg" @tap="renWu(item,4)">
						<button type="primary" :style="item.taskStatus?'background:#bfbfbf;color:#666666':''">{{item.taskStatus?'已完成':'去完成'}}</button>
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
				isRen: ''
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
						_this.taskList = res.data.data.taskCenters
						_this.userList = res.data.data.userInfo
						_this.date = res.data.data.signInDays
						_this.qianDate = res.data.data.storeIntegralLogList
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
						for (var i = 0; i < _this.qianDate.length; i++) {
							if (_this.qianDate[i].taskId == 0 && _this.systemDate == _this.qianDate[i].createTime) {
								_this.isQian = false
							}
						}
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
				// },
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
				console.log(taskId)
				this.$https({
					url: '/api/task/center-task-insert',
					data: {
						taskId: taskId,
						taskType: taskType
					},
					method: 'POST',
					success: function(res) {
						isRen = true
						console.log(isRen)

					}
				})
			},

			renWu: function(item, id) {
				// console.log(id)
				var _this = this
				console.log(item)
				var state = item.postUrl
				var isRen = item.taskStatus
				var taskType = item.taskType
				var taskId = item.taskId
				if (!isRen) {
					if (state == 2 || state == 3) {
						uni.navigateTo({
							url: '../../classify/fenlOne'
						})
						// 跳转首页
						setTimeout(function() {
							state == 2 ? _this.lingJifen(taskId, isRen, taskType) : _this.lingJifen(taskId, isRen, taskType)
							console.log('任务完成')
						}, 5000)
						
					}
					if (state == 4 || state == 5) {
						uni.navigateTo({
							url: '../allState/allState?id=' + id
						})
						state == 4 ? _this.lingJifen(taskId, isRen, taskType) : _this.lingJifen(taskId, isRen, taskType)
					
					}
					if (state == 6) {
						uni.navigateTo({
							url: './invite/invite'
						})
						_this.lingJifen(taskId, isRen, taskType)
						
						
					}
					_this.xuanR()
				}

			}
		}
	}
</script>

<style lang="scss">
	.bg_img {
		background-color: #2b5cff;
		width: 750upx;
		height: 440upx;
	}

	.top {
		position: fixed;
		top: 0upx;
		left: 0upx;
		width: 750upx;
		margin: 0 auto;
		overflow: hidden;

		.textBox {
			padding-left: 40%;

			text {
				font-size: 38upx;
				color: #fff;
				float: left;
				line-height: 90upx;
			}
		}

		.imgBox {
			float: right;

			image {
				width: 42upx;
				height: 42upx;
				padding: 30upx;
			}
		}
	}

	.userBox {
		width: 700upx;
		position: absolute;
		top: 120upx;
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
				padding-right: 50upx;
				text-align: center;

				text {
					width: 100upx;
					font-size: 58upx;
					float: left;
					color: #fff;

					text {
						font-size: 20upx;
						float: left;
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
		width: 660upx;
		height: 120upx;
		box-shadow: 0 0 5px #ccc;
		position: absolute;
		top: 380upx;
		left: 25upx;
		background-color: #fff;
		border-radius: 20upx;
		padding: 50upx 20upx 20upx 20upx;
	}

	.bott {
		width: 195upx;
		float: right;

		button {
			background-color: #fff;
			color: #2b5cff;
			border-radius: 40upx;
			font-size: 24upx;
			font-family: Microsoft YaHei;
		}

	}

	.Box {
		position: relative;
		padding-top: 30upx;
		width: 620upx;
		height: 2upx;
		margin-left: 20upx;
		border-bottom: 1px solid #007AFF;

		.formerly {
			position: absolute;
			top: -30upx;
			left: -15upx;
			text-align: center;

			.date {
				text {
					font-size: 24upx;
				}
			}

			.ima_p {
				image {
					width: 32upx;
					height: 32upx;
				}
			}
		}

		.formerly_a {
			position: absolute;
			top: -30upx;
			left: 12%;
			text-align: center;

			.date {
				text {
					font-size: 24upx;
				}
			}

			.ima_p {
				image {
					width: 32upx;
					height: 32upx;
				}
			}
		}

		.formerly_b {
			position: absolute;
			top: -30upx;
			left: 28%;
			text-align: center;

			.date {
				text {
					font-size: 24upx;
				}
			}

			.ima_p {
				image {
					width: 32upx;
					height: 32upx;
				}
			}
		}

		.formerly_c {
			position: absolute;
			top: -30upx;
			left: 43%;
			text-align: center;

			.date {
				text {
					font-size: 24upx;
				}
			}

			.ima_p {
				image {
					width: 32upx;
					height: 32upx;
				}
			}
		}

		.formerly_d {
			position: absolute;
			top: -30upx;
			left: 60%;
			text-align: center;

			.date {
				text {
					font-size: 24upx;
				}
			}

			.ima_p {
				image {
					width: 32upx;
					height: 32upx;
				}
			}
		}

		.formerly_e {
			position: absolute;
			top: -30upx;
			right: 13%;
			text-align: center;

			.date {
				text {
					font-size: 24upx;
				}
			}

			.ima_p {
				image {
					width: 32upx;
					height: 32upx;
				}
			}
		}

		.formerly_f {
			position: absolute;
			top: -30upx;
			right: -20upx;
			text-align: center;

			.date {
				text {
					font-size: 24upx;
				}
			}

			.ima_p {
				image {
					width: 32upx;
					height: 32upx;
				}
			}
		}
	}

	.gain {
		position: absolute;
		top: 590upx;
		left: 20upx;

		.tit {
			text {}
		}

		.frame {
			width: 660upx;
			// height: 460upx;
			margin-left: 8upx;
			margin-top: 20upx;
			box-shadow: 0 0 5px #ccc;
			background-color: #fff;
			border-radius: 20upx;
			padding: 20upx 20upx 20rpx 20upx;
			overflow: hidden;
			margin-bottom: 130rpx;

			.ul {
				border-bottom: 1px dotted #ccc;
				overflow: hidden;
				// margin-bottom: 20upx;
				margin-top: 20upx;
				padding-bottom: 20upx;

				.title_u {
					font-size: 30upx;
					line-height: 50upx;
					color: #333;
					float: left;
					padding-right: 20upx;
				}

				.span {
					float: left;
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


		}

	}
</style>
