<template>
	<view>
		<!-- 产品图，这是轮播 -->
		<view class="bg_img">
			<image src="../../static/img_18.jpg" mode=""></image>
		</view>

		<!-- 头部 -->
		<view class="top">
			<view class="imgBoxs">
				<image src="../../static/icon_48.png" mode=""></image>
			</view>
			<view class="imgBox">
				<image src="../../static/icon_47.png" mode=""></image>
			</view>
		</view>
		<!-- 标题 -->
		<view class="titleBox">
			<view class="Box">
				<view class="ThePrice">
					<view class="h2Box">
						<text>￥<text>980</text>.00</text>
					</view>
					<view class="spanBox">
						<text>原价：￥1265.00</text>
					</view>
				</view>
				<view class="preferential">
					<text>买三送一</text>
				</view>
				<view class="preferential">
					<text>满99-50元</text>
				</view>
			</view>

			<view class="share">
				<image src="../../static/icon_49.png" mode=""></image>
				<text>分享</text>
			</view>
			<view class="h2aBox">
				<text>防泼水轻盈背负YKKA拉链尊享级防泼水轻盈背负YKK拉链颈枕</text>
			</view>
		</view>
		
		<!-- 发货/活动细则 -->
		<view class="introduce">
			<view class="mingca">
				<text>发货</text>
			</view>
			<view class="diz">
				<text>山东济南 |</text>
			</view>
			<view class="kuaid">
				<text>快递：包邮</text>
			</view>
			<view class="yuex">
				<text>月销量1.3万+</text>
			</view>
		</view>
		<view class="xize">
			<view class="huid">
				<text>活动</text>
			</view>
			<view class="xiangqBox">
				<view class="oneBox">
					<view class="preferential">
						<text>买三送一</text>
					</view>
					<view class="jies">
						<text>满99元，立减20元；不累积。</text>
					</view>
				</view>
				<view class="oneBox">
					<view class="preferential">
						<text>买三送一</text>
					</view>
					<view class="jies">
						<text>满99元，立减20元；不累积。</text>
					</view>
				</view>
			</view>
			<view class="imBox">
				<image src="../../static/icon_26.png" mode=""></image>
			</view>
		</view>
		
		<!-- 参数 -->
		<view class="parameter">
			<view class="basic">
				<view class="left_a">
					<text>选择</text>
				</view>
				<view class="left_b">
					<text>已选：＂黑色真皮款＂</text>
				</view>
				<view class="right_a">
					<view class="img_a">
						<image src="../../static/icon_26.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="basic">
				<view class="left_a">
					<text>参数</text>
				</view>
				<view class="left_b">
					<text>品牌  型号  成分...</text>
				</view>
				<view class="right_a">
					<view class="img_a">
						<image src="../../static/icon_26.png" mode=""></image>
					</view>
				</view>
			</view>
			<view class="basic">
				<view class="left_a">
					<text>适配</text>
				</view>
				<view class="left_b">
					<text>车型...</text>
				</view>
				<view class="right_a">
					<view class="img_a">
						<image src="../../static/icon_26.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<view class="pingjBox">
			<view class="basic">
				<view class="left_a">
					<text>用户评价</text>
				</view>
				
				<view class="right_a">
					<view class="img_a">
						<image src="../../static/icon_26.png" mode=""></image>
					</view>
				</view>
				<view class="left_b">
					<text>98%满意</text>
				</view>
				
			</view>
			<!-- 用户评价 ,划动效果-->
			<view class="toux">
				<view class="imgBox_a">
					<image src="../../static/img_05.jpg" mode=""></image>
				</view>
				<view class="mingc">
					<text>秋天的风</text>
					<view class="time">
						<text>2019/05/05</text>
					</view>
					<view class="huay">
						<text>性价比高，做工精致，质量很好，性价比高，做工精致材质纯正质量很好，性价比高，做工精致</text>
					</view>
				</view>
			</view>
		</view>
		<view class="listBox">
			<view class="liBox">
				<view class="imgBox">
					<image src="../../static/img_17.jpg" mode=""></image>
				</view>
				<view class="texBox">
					<view class="h2Box">
						<text>凯迪拉克官方企业店</text>
					</view>
					<view class="spanBox">
						<text>销量：2562</text>
					</view>
				</view>
				<view class="bottBox">
					<text>进店逛逛</text>
				</view>
			</view>
		</view>
		<view class="shangx">
			<view class="titaa">
				<text>商品详情</text>
			</view>
			<view class="imgg">
				<image src="../../static/img_19.jpg" mode=""></image>
			</view>
		</view>
		
		<!-- 底部 -->
		<view class="bottom">
			<view class="leftA">
				<view class="kefua">
					<image src="../../static/icon_50.png" mode=""></image>
					<view class="keyboard">
						<text>店铺</text>
					</view>
				</view>
				<view class="kefua">
					<image src="../../static/icon_51.png" mode=""></image>
					<view class="keyboard">
						<text>收藏</text>
					</view>
				</view>
				<view class="kefua">
					<image src="../../static/icon_36.png" mode=""></image>
					<view class="keyboard">
						<text>客服</text>
					</view>
				</view>
		        
			</view>
			<view class="rightA">
				<view class="bottBoxss">
					<view class="uni-padding-wrap uni-common-mt bott onna">
						<button type="primary">加入购物车</button>
					</view>
					<view class="uni-padding-wrap uni-common-mt bott" @click="openPopup">
						<button type="primary">立即购买</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	page{
		background-color: #f7f7f7;
	}
	.bg_img {
		position: absolute;
		top: 0upx;

		image {
			width: 750upx;
			height: 610upx;
		}
	}

	.top {
		width: 710upx;
		padding: 20upx;
		overflow: hidden;
		position: relative;

		.imgBox {
			text-align: center;
			float: right;
			border-radius: 30upx;
			margin: 10upx;
			width: 60upx;
			height: 60upx;
			background: rgba(0, 0, 0, 0.5) !important;

			image {
				width: 34upx;
				padding-top: 15upx;
				height: 32upx;
			}
		}

		.imgBoxs {
			text-align: center;
			float: right;
			border-radius: 30upx;
			margin: 10upx;
			width: 60upx;
			height: 60upx;
			background: rgba(0, 0, 0, 0.5) !important;

			image {
				width: 34upx;
				padding-top: 12upx;
				height: 32upx;
			}
		}
	}

	.Box {
		float: left;
		
	}

	.titleBox {
		background-color: #fff;
		width: 712upx;
		padding: 20upx;
		position: absolute;
		top: 600upx;
		overflow: hidden;

		.ThePrice {
			overflow: hidden;

			.h2Box {
				float: left;

				text {
					font-size: 30upx;
					color: #ff0000;

					text {
						font-size: 48upx;
						color: #FF0000;
					}
				}
			}

			.spanBox {
				float: left;
				padding: 15upx;

				text {
					text-decoration: line-through;
					font-size: 26upx;
					color: #999;
				}
			}

		}

		.preferential {
			float: left;
			margin-right: 20upx;
			background-color: #fde9e9;
			padding: 5upx 20upx;
			border-radius: 10upx;

			text {
				float: left;
				line-height: 40upx;
				color: #ff3333;
				font-size: 24upx;
			}
		}

		.share {
			float: right;
			width: 80upx;
			height: 80upx;
			margin-top: 30upx;
			border-radius: 40upx;
			text-align: center;
			background: #F1F1F1;

			image {
				display: block;
				width: 30upx;
				height: 26upx;
				margin: 0 auto;
				padding-top: 12upx;
			}

			text {
				font-size: 18upx;
				color: #999;
			}
		}
	.h2aBox{
		float: left;
		padding-top:10upx;
		text{
			font-size: 34upx;
			color: #333;
			line-height: 40upx;
		}
	}
	}
	.introduce{
		background-color: #fff;
		margin-top: 20upx;
		width: 710upx;
		padding: 20upx;
		position: absolute;
		top:850upx;
		.mingca{
			float: left;
			padding-right: 20upx;
			text{
				color: #666;
				font-size: 26upx;
			}
		}
		.diz{
			float: left;
			padding-right:10upx;
			text{
				color: #333;
				font-size: 26upx;
			}
		}
		.kuaid{
			float: left;
			text{
				color: #333;
				font-size: 26upx;
			}
		}
		.yuex{
			float: right;
			text{
				color: #666;
				font-size: 26upx;
			}
		}
		
	}
	.xize{
		background-color: #fff;
		margin-top: 20upx;
		width: 710upx;
		padding: 20upx;
		position: absolute;
		top:920upx;
		overflow: hidden;
		.huid{
			float: left;
			padding-right: 20upx;
			text{
				color: #666;
				font-size: 26upx;
			}
		}
		.xiangqBox{
			float: left;
			width: 80%;
			.oneBox{
				float: left;
				width: 100%;
				.preferential {
					float: left;
					margin-top: 10upx;
					margin-right: 20upx;
					background-color: #fde9e9;
					padding: 3upx 10upx;
					border-radius: 10upx;
				    
					text {
						float: left;
						line-height: 35upx;
						color: #ff3333;
						font-size:17upx;
					}
				}
				.jies{
					text{
						font-size: 26upx;
						color: #333;
					}
				}
			}
			
			
		}
		.imBox{
			float: right;
			margin-top: 20upx;
			image{
				width: 12upx;
				height: 20upx;
			}
		}
		
	}
	.parameter{
		background-color: #fff;
		margin-top: 20upx;
		width: 710upx;
		padding: 20upx;
		position: absolute;
		top:1070upx;
		overflow: hidden;
	}
	.basic {
		width: 100%;
		float: left;
		margin-bottom: 20upx;
		.left_a {
			float: left;
			padding-right: 20upx;
			text {
				font-size: 28upx;
				color: #999;
				line-height: 50upx;
			}
		}
	    .left_b {
	    	float: left;
	    	padding-right: 20upx;
	    	text {
	    		font-size: 28upx;
	    		color: #333;
	    		line-height: 50upx;
	    	}
	    }
		.right_a {
			float: right;
			padding-right: 10upx;
	        .img_l{
				float:left;
				padding-right: 10upx;
				padding-top: 5upx;
				image{
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
	.pingjBox{
		background-color: #fff;
		margin-top: 20upx;
		width: 710upx;
		padding: 20upx;
		margin-bottom: 20upx;
		position: absolute;
		top:1345upx;
		overflow: hidden;
		.basic{
			.left_b {
				float:right;
			}
		}
	}
	.toux {
		background-color: #f7f7f7;
		padding-top: 20upx;
		width: 680upx;
		overflow: hidden;
		border-radius: 10upx;
		padding-bottom: 20upx;
		image {
			width: 80upx;
			height: 80upx;
			border-radius: 150upx;
		}
	}
	.evaluate {
		width:680upx;
		margin-bottom: 100upx;
	}
	.mingc{
		float: left;
		width:570upx;
		text{
			font-size: 26upx;
			padding-left: 20upx;
		}
		.time{
			float: right;
			color: #333;
			font-size: 26upx;
			line-height: 50upx;
		}
	}
	.imgBox_a{
		float: left;
		margin-left: 20upx;
		margin-top: 10upx;
		margin-top: 20upx;
	}
	.huay{
		width: 570upx;
		float: left;
		color: #999;
		line-height: 40upx;
	}
	.listBox{
		width: 710upx;
		padding: 20upx;
		position: absolute;
		top:1660upx;
		background-color: #fff;
		margin-top: 20upx;
		overflow: hidden;
		.liBox{
			padding: 10upx;
			float: left;
			width:690upx;
			border-radius: 10upx;
			margin-bottom: 20upx;
			box-shadow: 0 0 10upx #ccc;
			.imgBox{
				float: left;
				image{
					width: 100upx;
					height: 100upx;
					border-radius: 100upx;
				}
			}
			.texBox{
				float: left;
				padding-left: 20upx;
				.h2Box{
					padding-top: 5upx;
					text{
						line-height: 50upx;
						font-size: 32upx;
						color: #333;
					}
				}
				.spanBox{
					text{
						font-size: 24upx;
						color: #333;
					}
				}
			}
			
			.bottBox{
				float: right;
				margin-top: 25upx;
				margin-right: 10upx;
				text{
					font-size: 20upx;
					color: #2b5cff;
					float: left;
					padding: 5upx 20upx;
					line-height: 40upx;
					background-color: #fff;
					border: 1px solid #2b5cff;
					border-radius: 50upx;
				}
			}
		}
	}
	.shangx{
		width: 710upx;
		padding: 20upx;
		position: absolute;
		background-color: #fff;
		top:1885upx;
		text{
			font-size: 30upx;
		}
		.imgg{
			padding-top: 20upx;
			image{
				width: 705upx;
				height: 700upx;
			}
		}
	}
	
	.bottom{
		width: 750upx;
		height: 100upx;
		background-color: #fff;
		border-top:1px solid #ccc ;
		position: fixed;
		bottom: 0upx;
		left: 0upx;
		.leftA{
			float: left;
			padding-left: 20upx;
			width:350upx;
			.kefua{
				float: left;
				padding:20upx;
				image{
					padding-left: 5upx;
					width:41upx;
					height:38upx;
					float: left;
				}
				.keyboard{
					text{
						float: left;
						color: #333;
						font-size: 26upx;
					}
				}
				
			}
			
	
	
		}
		
	}
	
	.rightA{
		width:300upx;
		float:right;
		
	}
	.bottBoxss {
		
		float: right;
		width: 710upx;
		padding: 20upx;
		height: 50upx;
	    .onna{
			button{
				background-color: #007AFF !important;
				border: 1px solid #007AFF !important;
				color: #fff !important;
			}
		}
		.onnb{
			button{
				background-color: #fff !important;
				border: 1px solid #007AFF !important;
				color: #007AFF !important;
			}
		}
		.bott {
			display: block;
			width: 180upx;
			margin-right: 20upx;
			float: right;
	
			button {
				background-color: #fff;
				border: 1px solid #999;
				border-radius: 40upx;
				font-size: 24upx;
				color: #999;
				font-family: Microsoft YaHei;
			}
	
		}
	}
</style>
