<template>
	<view>
		<input style='width:545rpx;height:68rpx;background:#eee;line-height:68rpx;margin:0 auto;border-radius:50rpx;margin-top:20rpx;padding-left:93rpx;' placeholder='请输入关键字搜索...'>
		<image src='../../static/sousuo.png' style='width:36rpx;height:36rpx;position:relative;margin-top:-50rpx;margin-left:91rpx;position:absolute;'></image> 
		<scroll-view :scroll-into-view='xuan' scroll-with-animation='true' scroll-y='true' style='top:100rpx;position:fixed;height:90%;'>
		<view v-for='(item,index) in list' :id='item.name'>
			<view :style='index==0?"margin-top:30rpx;background:#eee;padding:0 44rpx;line-height:60rpx;":"background:#eee;padding:0 44rpx;line-height:60rpx;"'>{{item.name}}</view>
			<view v-for='(items,indexs) in item.list' :style='indexs==item.list.length-1?"overflow:hidden;line-height:90rpx;margin:0 20rpx;":"overflow:hidden;line-height:90rpx;margin:0 20rpx;border-bottom:1px dashed #efefef;"' @tap='qiehuan(item.id)'>
				<image :src='items.logo' style='width:60rpx;height:60rpx;float:left;margin-top:15rpx;margin-left:20rpx;'></image>
				<view style='float:left;margin-left:20rpx;'>{{items.carName}}</view>
			</view>
		</view>
		</scroll-view>
		<scroll-view scroll-y='true' style='position:fixed;top:5%;right:50rpx;width:50rpx;height:90%;text-align:center;border:1px solid #bfbfbf;border-radius:50rpx;background:#fff;'>
			<view v-for='(item,index) in list' :style='xuanzhong==index?"color:#597cff;margin-top:10rpx;margin-bottom:10rpx;":"color:#555;margin-top:10rpx;margin-bottom:10rpx;"' @tap='gundong(item.name,index)'>{{item.name}}</view>
		</scroll-view>
		<view class='zhezhao' v-if='zhezhao'>
			<view>
				<view>{{pinpai}}</view>
				<view>
					<view v-for='(item,index) in car'>
						<image :src='item.logo'></image>
						<view>{{item.carName}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default{
	data(){
		return{
			list:[],
			xuanzhong:0,
			xuan:'',
			pinpai:'',
			car:[],
			zhezhao:false
		}
	},
	onLoad(){
		var _this=this
		this.$https({url:'/api/shop/car-brand-lists',data:{},success:function(res){
			for(var i in res.data.data){
				var obj={}
				obj.name=i
				obj.list=res.data.data[i]
				_this.list.push(obj)
			}
		}})
	},
	methods:{
		gundong:function(l,index){
			this.xuan=l
			this.xuanzhong=index
		},
		qiehuan:function(id){
			var _this=this
			this.$https({url:'/api/shop/car-type-lists',data:{carId:id},success:function(res){
				_this.car=res.data.data
			}})
		}
	}
}
</script>

<style>
</style>
