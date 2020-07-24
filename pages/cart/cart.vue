<template>
	<view class="bcg">
		<view class="top" style='position:fixed;left:0;top:60rpx;width:100%;'>
			<view class="textBox">
				<text>购物车({{numa}})</text>
			</view>
			<!-- 无消息通知状态 -->
			<view class="imgBox">
				<!-- <image src="../../static/icon_36.png" mode=""></image> -->
			</view>
			<view class="spanBox" @tap='shanchu'>
				<text>编辑</text>
			</view>
		</view>

		<view class="listBox" style='margin-top:160rpx;'>

			<!-- 购物车 -->

			<view class="listBoxs" v-for="(item,index) in  cartList">
				<checkbox-group @change='gouwuche'>
					<view class="radios">
						<!-- 店铺名称待确认 -->
						<label class="radio">
							<!--加个d以区分某个店铺-->
							<!-- <checkbox :value="'d'+item.goodsId" :checked='shuju[index].dian'></checkbox> -->
						</label>
						<text>{{item.storeShopDTO.shopName}}</text>
						<image src="../../static/icon_26.png" mode=""></image>
					</view>
					<view class="xinxi">
						<!-- 订单信息 -->
						<view class="xinxi1" v-for="(i,n) in item.specList" v-if='i.cartGoodsStatus==0'>
							<view class="radi">
								<checkbox :value='i.id' :checked='shuju[index].s[n]'></checkbox>
							</view>

							<view class="imgBox_a" @tap='openPopup(index,n)'>
								<image :src="item.goodsLogo" mode=""></image>
							</view>
							<view class="txt_c">
								<view class="title" @tap='openPopup(index,n)'>
									<text>{{item.goodsName}}</text>
								</view>
								<view class="spec" @tap='openPopup(index,n)'>
									<text>已选：＂{{i.specKeyName}}＂</text>
								</view>
								<!-- <view class=""> -->


								<view class="radColor">
									<text>{{i.goodsPrice?'￥'+i.goodsPrice+'.00':'0'}}</text>
								</view>

								<!-- 数量 -->
								<!-- <view class="jia">
								<text>X{{i.goodsNum}}</text>
							</view> -->
								<view class="num">
									<view @tap='jian(index,n)'>-</view>
									<view class="numm" @tap="valRe1(index,n,i.goodsNum)">
										{{i.goodsNum}}
									</view>
									<view @tap='jia(index,n)'>+</view>
								</view>
							</view>
							<!-- </view> -->

						</view>
					</view>
				</checkbox-group>
			</view>
			<!-- 购物车弹框 -->
			<view class="mask" v-if="mask_show"></view>
			<view class="mask_content" v-if="mask_show">
				<view class="title">
					<text>请输入您的内容</text>
				</view>
				<input type="number" v-model="value" />
				<view class="bot">
					<button size="mini" @tap="valRe">取消</button>
					<button size="mini" @tap="change">确定</button>
				</view>
			</view>
			<!-- 失效宝贝 -->
			<view class="Boxs">
				<view class="biaot">
					<text>失效宝贝</text>
					<view class="dele" @tap='qingkong'>
						<text>清空</text>
					</view>
				</view>
				<view class="lose" v-for="(item,index) in  cartList" v-if='s'>
					<view class="xinxi" v-for='items in item.specList' v-if='items.cartGoodsStatus==1||items.cartGoodsStatus==2'>
						<view class="imgBox_a">
							<image :src="item.goodsLogo" mode=""></image>
						</view>
						<view class="txt_c">
							<view class="title">
								<text>{{items.goodsName}}</text>
							</view>
							<view class="spec">
								<text>已选：{{items.specKeyName}}</text>
							</view>
							<view class="radColor">
								<text>{{items.cartGoodsStatus==1?'已下架':items.cartGoodsStatus==2?'已下架':''}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class='lose' v-for='item in tuijian'>
				
			</view>
		</view>

		<!-- 底部 -->
		<view class="bottom">
			<view class="radis">
				<view :style='xuan?"width:30rpx;height:30rpx;border:1px solid #ddd;border-radius:50%;float:left;margin-left:20rpx;margin-top:10rpx;line-height:30rpx;font-size:20rpx;text-align:center;color:#fff;background:#2b5cff;border:none;":"width:30rpx;height:30rpx;border:1px solid #ddd;border-radius:50%;float:left;margin-left:20rpx;margin-top:10rpx;line-height:30rpx;font-size:20rpx;text-align:center;color:#fff;"'
				 @tap='quanxuan'>√</view>
				<text style='margin-left:20rpx;'>全选</text>
			</view>
			<view class="leftA" v-if='shanchua'>
				<text>合计：<text>￥{{jiage}}</text></text>
			</view>
			<view class="rightA" @tap='tiaozhuan'>
				<text>{{shanchua?'结算':'删除'}}</text>
			</view>
		</view>

		<!-- 弹出框内容 -->
		<uni-popup ref="popup" type="bottom" class="tanchu">
			<button @click="closePopup">×</button>
			<view class="neira">
				<view class="imgs">
					<image :src="goodsLogo" mode=""></image>
				</view>

				<view class="text_e">
					<view class="price">
						<text>￥{{goodsPrice}}</text>
					</view>
					<view class="speci">
						<text>{{keyName}}</text>
					</view>
				</view>

				<view class="set">
					<view v-for='(item,index) in guige'>
					<view class="tit_k">
						<text>{{item.name}}</text>
					</view>
					<!-- 默认样式 -->
					<view class="detail">
						<view class="xiang" v-for='(items,a) in item.g' @tap='xuanzeguige(index,a)'>
							<text :class='items.xuan?"x":""'>{{items.item}}</text>
						</view>
					</view>
					</view>
				</view>

				<view class="quantity">
					<view class="tit_k">
						<text>数量</text>
					</view>
					<!-- 这是数量加减 -->
					<view class="jia">
						<view @tap='jiaa'>-</view>
						<input v-model='num'>
						<view @tap='jiaaz'>+</view>
					</view>
				</view>
				<view class="uni-padding-wrap uni-common-mt bott">
					<button type="primary" @tap='queding'>确定</button>
				</view>
			</view>

		</uni-popup>
		<tabBar :currentPage='currentPage'></tabBar>
	</view>

</template>

<script>
	import tabBar from '@/components/tabBar/tabBar.vue';
	// 弹出层
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import SideSlip from '@/components/side-slip/index'
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	export default {
		data() {
			return {
				value: '',
				currentPage: 'cart',
				cartList: {},
				keyName: '',
				goodsPrice: '',
				goodsLogo: '',
				guige: [],
				num: 0,
				goodsId: 0,
				key: '',
				xuanzho: [],
				xuanzhoz: [],
				shuzu: [],
				jiage: 0,
				xuan: false,
				xuanzhong: [],
				mask_show: false,
				index: 0,
				n: 0,
				shuju: [],
				shanchua:true,
				numa:0,
				s:false
			}
		},
		onShow() {
			var _this = this
			this.$https({
				url: '/api/shop/order-cart-list',
				data: {},
				dengl: false,
				success: function(res) {
					_this.jiage = 0
					//修改数据结构，以使数据更好用
					_this.cartList = res.data.data.cartList
					res.data.data.cartList.map(function(n, index) {
						_this.$set(_this.shuju, index, {
							dian: false,
							s: []
						})
						n.specList.map(function(z, indexx) {
							if(z.cartGoodsStatus==1||z.cartGoodsStatus==2){
								_this.s=true
							}
							_this.$set(_this.shuju[index].s, indexx, false)
							_this.numa++
						})
					})
					// _this.xuanzho.map(function(n, index) {
					// 	n.map(function(z, indexs) {
					// 		_this.jiage += _this.cartList[index].specList[indexs].goodsNum * _this.cartList[indexs].specList[indexs].goodsPrice
					// 	})
					// })
				}
			})
			this.$https({url:'/api/oauth/shop/mall-index',data:{mobileCode:13706412504},success:function(res){
				_this.tuijian=res.data.data.recommedGoods
			}})
		},
		components: {
			tabBar,
			uniPopup,
			'side-slip': SideSlip,
			uniNumberBox
		},
		methods: {
			change(e) {
				this.valRe()
				this.val = this.value
				this.cartList[this.index].specList[this.n].goodsNum = this.value
				this.jiage = 0
				this.shuju.map((n, index) => {
					n.s.map((c, indexz) => {
						if (c) {
							this.jiage += this.cartList[index].specList[indexz].goodsNum * this.cartList[index].specList[indexz].goodsPrice +
								this.cartList[index].specList[indexz].kuaidi
						}
					})
				})
			},
			valRe() {
				this.mask_show = !this.mask_show
			},
			valRe1(index, n, mun) {
				this.mask_show = !this.mask_show
				this.value = mun
				this.index = index
				this.n = n
			},
			select: function() {
				console.log(1)
			},
			openPopup(index, indexs) {
				this.$refs.popup.open()
				//获得商品id
				var _this = this
				var goodsId = this.cartList[index].goodsId
				//商品规格
				
				//商品的信息
				this.$https({
					url: '/api/oauth/shop/mall-goods-detail',
					data: {
						goods_id: goodsId
					},
					dengl: true,
					success: function(res) {
						_this.goodsLogo = _this.cartList[index].goodsLogo
						_this.goodsPrice = _this.cartList[index].specList[indexs].goodsPrice
						_this.num = _this.cartList[index].specList[indexs].goodsNum
						_this.keyName = _this.cartList[index].specList[indexs].specKeyName
						_this.key = _this.cartList[index].specList[indexs].id
						_this.guige = []
						for(var i in res.data.data.specs){
							var obj={}
							obj.name=i
							obj.g=res.data.data.specs[i]
							_this.guige.push(obj)
						}
						var asa=_this.keyName.split(',')
						//判断当前选中的商品
						_this.guige.map(function(z){
							z.g.map(function(c){
								asa.map(function(x){
									if(x.split(':')[1]==c.item){
										_this.$set(c,'xuan',true)
									}
								})
							})
						})
						_this.goodsId = res.data.data.detail.goodsId
					}
				})
			},
			closePopup() {
				this.$refs.popup.close()
			},
			onRemove(index, indexs) {
				var _this = this
				this.$https({
					url: '/api/shop/order-del-spec-goods',
					data: {
						goodsId: this.cartList[index].goodsId,
						specKey: this.cartList[index].specList[indexs].specKey
					},
					method: 'post',
					success: function(res) {
						_this.$https({
							url: '/api/shop/order-cart-list',
							data: {},
							success: function(res) {
								_this.cartList = res.data.data.cartList
								_this.shuju[index].splice(indexs, 1)
								_this.jiage = 0
								_this.shuju.map(function(x, index) {
									x.map(function(z, indexs) {
										if (z) {
											_this.jiage += _this.cartList[index].specList[indexs].goodsNum * _this.cartList[index].specList[
												indexs].goodsPrice
										}
									})
								})
							}
						})
					}
				})
			},
			onQuxiao(index) {},
			jian: function(index, indexs) {
				var _this = this
				if (this.cartList[index].specList[indexs].goodsNum > 1) {
					this.cartList[index].specList[indexs].goodsNum--
					this.$https({
						url: '/api/shop/order-update-cart',
						data: JSON.stringify({
							cartAttr: [{
								goodsNum: this.cartList[index].specList[indexs].goodsNum,
								specKey: this.cartList[index].specList[indexs].specKey
							}],
							goodsId: this.cartList[index].goodsId,
							status: 'u'
						}),
						haeder: true,
						method: 'post',
						success: function(res) {
							//计算价格
							_this.jiage = 0
							_this.shuju.map(function(n, index) {
								n.s.map(function(z, indexs) {
									if (z) {
										_this.jiage += _this.cartList[index].specList[indexs].goodsNum * _this.cartList[index].specList[
											indexs].goodsPrice
									}
								})
							})
						}
					})
				}
			},
			shuru: function(index, indexs) {
				var _this = this
				this.$https({
					url: '/api/shop/order-update-cart',
					data: JSON.stringify({
						cartAttr: [{
							goodsNum: this.cartList[index].specList[indexs].goodsNum,
							specKey: this.cartList[index].specList[indexs].specKey
						}],
						goodsId: this.cartList[index].goodsId,
						status: 'u'
					}),
					haeder: true,
					method: 'post',
					success: function(res) {
						_this.jiage = 0
						_this.xuanzho.map(function(n, index) {
							n.map(function(z, indexs) {
								if (z) {
									_this.jiage += _this.cartList[index].specList[indexs].goodsNum * _this.cartList[index].specList[indexs]
										.goodsPrice
								}
							})
						})
					}
				})
			},
			jia: function(index, indexs) {
				var _this = this
				this.cartList[index].specList[indexs].goodsNum++
				this.$https({
					url: '/api/shop/order-update-cart',
					data: JSON.stringify({
						cartAttr: [{
							goodsNum: this.cartList[index].specList[indexs].goodsNum,
							specKey: this.cartList[index].specList[indexs].specKey
						}],
						goodsId: this.cartList[index].goodsId,
						status: 'u'
					}),
					method: 'post',
					haeder: true,
					success: function() {
						_this.jiage = 0
						_this.shuju.map(function(n, index) {
							n.s.map(function(z, indexs) {
								if (z) {
									_this.jiage += _this.cartList[index].specList[indexs].goodsNum * _this.cartList[index].specList[indexs]
										.goodsPrice
								}
							})
						})
					}
				})
			},
			xuanzeguige: function(index,inde) {
				var _this = this
				//更改型号
				//获得当前第几个
				this.guige.map(function(n,indexz) {
					if(index==indexz){
					n.g.map(function(x){
						_this.$set(x,'xuan',false)
					})
					}
				})
				this.$set(this.guige[index].g[inde],'xuan',true)
				this.keyName=''
				for(var i=0;i<this.guige.length;i++){
					//数组排序
					this.guige[i].g.map(function(c){
						if(c.xuan){
							if(i==_this.guige.length-1){
								_this.keyName+=_this.guige[i].name+':'+c.item
							}else{
						_this.keyName+=_this.guige[i].name+':'+c.item+','
						}
						}
					})
				}
			},
			ji: function() {
				if (this.num > 1) {
					this.num--
				}
			},
			j: function() {
				this.num++
			},
			queding: function() {
				var key = ''
				var _this = this
				this.$https({url:'/api/oauth/shop/mall-goods-detail',data:{goods_id:this.goodsId},dengl:true,success:function(res){
					var arr=[]
					for(var i in res.data.data.spec_price){
						arr.push(res.data.data.spec_price[i])
					}
				arr.map(function(n, index) {
					if (_this.keyName == n.keyName) {
						key = n.key
					}
				})
				_this.$https({
					url: '/api/shop/order-update-spec-info',
					data: {
						goodsId: _this.goodsId,
						newPrice: _this.goodsPrice,
						newSpecKey: key,
						newSpecValue: _this.keyName,
						cartId: _this.key,
						goodsNum: _this.num
					},
					method: 'post',
					success: function(res) {
						if(res.data.code==0){
						_this.$refs.popup.close()
						_this.$https({
							url: '/api/shop/order-cart-list',
							data: {},
							success: function(res) {
								_this.cartList = res.data.data.cartList
							}
						})
						}else{
							uni.showToast({
								title:'更新规格失败，请重新选择',
								icon:'none'
							})
						}
					}
				})
				}})
			},
			xuanze: function(e) {
				var arr = []
				var _this = this
				var a = []
				e.detail.value.map(function(n) {
					if (n > -1) {
						arr.push(n)
					} else {
						a.push(n)
					}
				})
				var ax = []
				this.cartList.map(function(n, index) {
					_this.$set(_this.xuanzho, index, [])
					n.specList.map(function(z, indexs) {
						_this.$set(_this.xuanzho[index], indexs, false)
					})
				})
				arr.map(function(n) {
					_this.xuanzho[n].map(function(z, index) {
						_this.xuanzho[n][index] = true
					})
				})
				a.map(function(n) {
					_this.xuanzho[n.split('-')[0]][n.split('-')[1]] = true
				})
				if (e.detail.value[e.detail.value.length - 1] > -1) {
					this.xuanzho[e.detail.value[e.detail.value.length - 1]].map(function(n, index) {
						_this.xuanzho[e.detail.value[e.detail.value.length - 1]][index] = false
					})
					e.detail.value.map(function(n) {
						if (!(n > -1)) {
							_this.xuanzho[e.detail.value[e.detail.value.length - 1]][n.split('-')[1]] = true
						}
					})
				}
				this.shuzu = a
			},
			x: function(index) {
				var _this = this
				if (this.xuanzhoz[index]) {
					this.$set(this.xuanzhoz, index, false)
					this.xuanzho[index].map(function(n, indexs) {
						_this.xuanzho[index][indexs] = false
					})
					this.jiage = 0
					this.xuanzho.map(function(n, index) {
						n.map(function(x, indexs) {
							if (x) {
								_this.jiage += _this.cartList[index].specList[indexs].goodsNum * _this.cartList[index].specList[indexs].goodsPrice
							}
						})
					})
					this.xuan = false
				} else {
					this.$set(this.xuanzhoz, index, true)
					this.xuanzho[index].map(function(n, indexs) {
						_this.$set(_this.xuanzho[index], indexs, true)
					})
					this.xuanzhong.push(index)
					this.xuanzhong.map(function(n, indexx) {
						_this.xuanzho[indexx].map(function(z, indexxx) {
							_this.xuanzho[indexx][indexxx] = true
						})
					})
					this.jiage = 0
					//计算商品规格
					this.xuanzho.map(function(n, index) {
						n.map(function(m, indexs) {
							if (m) {
								_this.jiage += _this.cartList[index].specList[indexs].goodsNum * _this.cartList[index].specList[indexs].goodsPrice
							}
						})
					})
					var nu = 0
					//判断是否全选
					this.xuanzho.map(function(n, index) {
						n.map(function(c, indexs) {
							if (c) {
								nu++
							}
						})
					})
					var num = 0
					this.xuanzho.map(function(x, index) {
						num += x.length
					})
					if (num == nu) {
						this.xuan = true
					}
				}
			},
			q: function(index, indexs) {
				var num = 0
				var _this = this
				this.shuzu.map(function(n) {
					if (index == n.split('-')[0]) {
						num++
					}
				})
				if (num < this.cartList[index].specList.length) {
					this.$set(this.xuanzhoz, index, false)
					this.xuan = false
					this.jiage = 0
					this.xuanzho[index][indexs] = false
					this.xuanzho.map(function(n, index) {
						n.map(function(z, indexs) {
							if (z) {
								_this.jiage += _this.cartList[index].specList[indexs].goodsNum * _this.cartList[index].specList[indexs].goodsPrice
							}
						})
					})
					console.log(this.xuanzho)
					// this.xuanzho[index].map(function(n,indexx){
					// 	if(indexs==indexx){
					// 		_this.xuanzho[index][indexs]=false
					// 	}
					// })
				}
				if (num == this.cartList[index].specList.length) {
					this.$set(this.xuanzhoz, index, true)
					var nu = 0
					this.xuanzho.map(function(n) {
						n.map(function(z) {
							if (z) {
								nu++
							}
						})
					})
					var nua = 0
					this.xuanzho.map(function(n) {
						nua += n.length
					})
					if (nu == nua) {
						this.xuan = true
					}
					this.jiage = 0
					this.xuanzho.map(function(x, index) {
						x.map(function(c, indexs) {
							_this.jiage += _this.cartList[index].specList[indexs].goodsPrice * _this.cartList[index].specList[indexs].goodsNum
						})
					})
				}
			},
			gouwuche: function(e) {
				var num = 0
				//判断当前选的是哪个
				e.detail.value.map((n) => {
					this.cartList.map((x, index) => {
						x.specList.map(function(v) {
							if (v.id == n) {
								num = index
							}
						})
					})
				})
				//将当前选中的下边的所有状态置为未选
				this.shuju[num].s.map((b, index) => {
					this.$set(this.shuju[num].s, index, false)
				})
				this.cartList.map((v, indexx) => {
					v.specList.map((a, indexxx) => {
						e.detail.value.map((z, index) => {
							if (z == a.id) {
								this.$set(this.shuju[indexx].s, indexxx, true)
							}
						})
					})
				})
				this.jiage = 0
				//计算选中的金额
				this.shuju.map((n, index) => {
					n.s.map((x, indexa) => {
						if (x) {
							this.jiage += this.cartList[index].specList[indexa].goodsNum * this.cartList[index].specList[indexa].goodsPrice
						}
					})
				})
				var quanxuan=true
				this.shuju.map((n,index)=>{
					n.s.map(function(x){
						if(!x){
							quanxuan=false
						}
					})
				})
				if(quanxuan){
					this.xuan=true
				}else{
					this.xuan=false
				}
			},
			quanxuan: function() {
				var _this = this
				//没有用开始
				if (this.xuan) {
					this.xuanzho.map(function(n, index) {
						_this.xuanzhoz[index] = false
						n.map(function(x, indexs) {
							_this.xuanzho[index][indexs] = false
						})
					})
					this.jiage = 0
				}
				if (this.xuan == false) {
					this.cartList.map(function(n, index) {
						_this.xuanzhoz[index] = true
						_this.$set(_this.xuanzho, index, [])
						n.specList.map(function(x, indexs) {
							_this.$set(_this.xuanzho[index], indexs, true)
						})
					})
					this.jiage = 0
					this.xuanzho.map(function(n, index) {
						n.map(function(x, indexs) {
							_this.jiage += _this.cartList[index].specList[indexs].goodsNum * _this.cartList[index].specList[indexs].goodsPrice
						})
					})
				}
				//没有用结束
				if (this.xuan) {
					this.xuan = false
					this.shuju.map(function(n, index) {
						n.s.map(function(v, indexx) {
							_this.$set(_this.shuju[index].s, indexx, false)
						})
					})
					this.jiage = 0
					return false
				} else {
					this.xuan = true
					this.shuju.map(function(n, index) {
						n.s.map(function(v, indexx) {
							_this.$set(_this.shuju[index].s, indexx, true)
						})
					})
					//计算金额
					this.jiage = 0
					this.cartList.map(function(n) {
						n.specList.map(function(z) {
							_this.jiage += z.goodsNum * z.goodsPrice
						})
					})
				}
			},
			tiaozhuan: function() {
				if(this.shanchua){
				var ap = []
				var _this = this
				if (this.shuju.length == 0) {
					uni.showToast({
						title: '请选择商品'
					})
				} else {
					this.shuju.map(function(n, index) {
						_this.cartList[index].name = _this.cartList[index].storeShopDTO.shopName
						n.s.map(function(x, indexx) {
							if (x) {
								_this.cartList[index].specList[indexx].xuanzhong = true
								_this.cartList[index].cartAttr = _this.cartList[index].specList
								_this.cartList[index].specList[indexx].goodsLogo = _this.cartList[index].goodsLogo
								_this.cartList[index].specList[indexx].goodsId = _this.cartList[index].goodsId
								_this.cartList[index].specList[indexx].shopPrice = _this.cartList[index].specList[indexx].goodsPrice
							}
						})
					})
					uni.navigateTo({
						url: 'orderForm/orderForm?goodsId=1' + '&cartAttr=' + JSON.stringify({
							cartAttr: this.cartList
						}) + '&dingdan=1'
					})
				}
				}else{
					var _this=this
					this.shuju.map(function(m,index){
						m.s.map(function(z,indez){
							if(z){
					            _this.$https({url:'/api/shop/order-del-spec-goods',data:{goodsId:_this.cartList[index].goodsId,specKey:_this.cartList[index].specList[indez].specKey},method:'post',success:function(res){
									_this.$https({url:'/api/shop/order-cart-list',data:{},dengl:false,success:function(res){
										_this.numa=0
										_this.s=false
										_this.cartList.map(function(c){
											c.specList.map(function(z){
												if(z.cartGoodsStatus==1||z.cartGoodsStatus==2){
													_this.s=true
												}
												_this.numa++
											})
										})
										_this.cartList=res.data.data.cartList
										_this.shuju[index].s[indez].splice(0,1)
										_this.shuju.map(function(z,indexx){
											if(z.s.length==0){
												_this.shuju[indexx].splice(0,1)
											}
										})
									}})
								}})
					        }
					})
					})
				}
			},
			qingkong:function(){
				var _this=this
				//获得失效宝贝id
				var arr=[]
				this.cartList.map(function(z){
					z.specList.map(function(x){
						if(x.cartGoodsStatus==1||x.cartGoodsStatus==2){
				_this.$https({url:'/api/shop/order-del-spec-goods',data:{goodsId:z.goodsId,specKey:x.specKey},method:'post',success:function(res){
					_this.$https({url:'/api/shop/order-cart-list',data:{},dengl:false,success:function(res){
						_this.cartList=res.data.data.cartList
						_this.numa=0
						_this.s=false
						res.data.data.cartList.map(function(c){
							c.specList.map(function(z){
								if(z.cartGoodsStatus==1||z.cartGoodsStatus==2){
									_this.s=true
								}
								_this.numa++
							})
						})
					}})
				}})
				}
				})
				})
			},
			jiaa:function(){
				if(this.num>1){
					this.num--
				}
			},
			jiaaz:function(){
				this.num++
			},
			shanchu:function(){
				this.shanchua=!this.shanchua
			}
		}
	}
</script>

<style lang="scss">
	.bcg {
		background-color: #eeeeee;
		min-height:100%;
		position:fixed;
	}

	.mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.2);
	}

	.mask_content {
		background-color: #FFFFFF;
		position: fixed;
		top: 38%;
		left: 60rpx;
		right: 60rpx;
		border-radius: 15rpx;
		padding: 30rpx;

		.title {
			text {
				line-height: 30px;
				font-size: 28rpx;
			}
		}

		input {
			min-height: 40rpx;
			line-height: 40rpx;
			padding-left: 10rpx;
			border-bottom: 1rpx solid #007AFF;
		}

		.bot {
			float: right;
			margin-top: 30rpx;

			button {
				margin-right: 20rpx;
				color: #007AFF;
			}

		}
	}

	.top {
		width: 100%;
		// margin: 0 auto;
		overflow: hidden;
		background-color: #FFFFFF;
		// border-bottom: 1px solid #e5e5e5;

		.textBox {
			padding-left: 40%;

			text {
				font-size: 38upx;
				color: #333;
				float: left;
				line-height: 90upx;
			}
		}

		.imgBox {
			float: right;
			padding: 30upx;

			image {
				width: 36upx;
				height: 36upx;
			}
		}

		.spanBox {
			float: right;
			padding-right: 20upx;

			text {
				line-height: 90upx;
				font-size: 28upx;
				color: #666;
			}
		}
	}

	.radios {
		width: 100%;
		padding: 20upx;
		overflow: hidden;
		padding-top: 20upx;
		overflow: hidden;
		border-bottom: 1px solid #e5e5e5;
		border-top: 1px solid #e5e5e5;


		text {
			font-size: 28upx;
			color: #333;
			line-height: 40upx;
			padding-right: 10upx;
		}

		image {
			width: 12upx;
			height: 20upx;
			margin-left: 20rpx;
		}
	}

	.radio {
		padding-right: 20rpx;

		checkbox .uni-checkbox-input {
			border-radius: 50% !important;

		}

	}

	.box {
		background-color: #FFFFFF;
		overflow: hidden;
	}



	.xinxi {
		overflow: hidden;
		width: 100%;
		padding: 25upx 20upx 0 20upx;
		box-sizing: border-box;


		.xinxi1 {
			overflow: hidden;
			border-bottom: 1px dotted #eee;
			padding-bottom: 20rpx;
		}

		.xinxi1:last-child {
			border-bottom: none;
		}


		.radi {
			float: left;
			margin-right: 20upx;
			margin-top: 10%;
			// margin-left: 20rpx;

			checkbox .uni-checkbox-input {
				border-radius: 50% !important;
			}

		}

		.imgBox_a {
			float: left;
			padding-top: 20upx;


			image {
				width: 212upx;
				height: 160upx;
			}
		}

		.txt_c {
			float: right;
			width: 56%;
			padding-right: 10upx;
			box-sizing: border-box;

			.title {
				padding-top: 10upx;
				margin-bottom: 15rpx;

				text {
					font-size: 29upx;
					line-height: 30upx;
					color: #0c0c0c;
				}
			}

			.spec {
				line-height: 40upx;
				color: #666;

				margin-bottom: 18rpx;

				text {
					font-size: 24upx;


				}
			}

			.radColor {
				float: left;
				// display: flex;

				color: #ff0000;

				text {

					font-size: 28upx;
				}
			}

			.num {
				float: right;
				border: 1rpx solid #f0f0f0;
				border-radius: 10rpx;
				display: flex;
				width: 35%;
				line-height: 45rpx;

				view {
					padding-right: 10rpx;
					padding-left: 10rpx;
					flex-grow: 1;
					text-align: center;
				}

				.numm {
					flex-grow: 2;
					width: 60rpx;
					text-align: center;
					border-left: 1px solid #f0f0f0;
					border-right: 1px solid #f0f0f0;
					text-align: center;
					font-size: 23rpx;
					display: inline-block;
					// min-height: 45rpx;
					line-height: 45rpx;

				}

			}

		}
	}


	.listBox {
		.listBoxs {
			background-color: #FFFFFF;

		}

		.listBoxs:last-child {
			margin-bottom: 20rpx;
		}
		.wx-checkbox-input{
			border-radius:50%;
			width:30rpx;
			height:30rpx;
		}
		.wx-checkbox-input.wx-checkbox-input-checked::before{
			border-radius:50%;
			width:30px;
			height:30rpx;
			line-height:30rpx;
			text-align:center;
			font-size:20rpx;
			color:#fff;
			background:transparent;
			transform:translate(-50%,-50%) sale(1);
			
		}
	}

	.biaot {
		border-bottom: 1px solid #ccc;
		font-size: 30upx;
		line-height: 80upx;
		padding-left: 20upx;

		.dele {
			float: right;
			padding-right: 20upx;

			text {
				font-size: 26upx;
				color: #666;
				line-height: 50upx;
			}
		}
	}


	.lose {
		border-bottom:1px dashed #eee;
		.xinxi {
			width: 750upx;
			padding: 0upx;
			padding-bottom: 20upx;
		}

		.radColor {
			text {
				font-size: 30upx;
				color: #999;
			}
		}

		.imgBox_a {
			padding-left: 20upx;
		}

		.txt_c {
			float: left;
			width: 470upx;
			padding-left: 20upx;
		}
	}

	.spec {
		overflow: hidden;

		text {
			float: left;
			line-height: 40upx;
		}
	}

	.tu {
		float: left;

		image {
			width: 20upx;
			height: 12upx;
		}
	}

	.Boxs {
		background-color: #FFFFFF;
		width: 750upx;
		padding-bottom: 100upx;
		margin-top: 20rpx;
	}

	.bottom {
		width: 750upx;
		height: 90upx;
		border-top: 1px solid #ccc;
		position: fixed;
		background-color: #fff;
		bottom: 100upx;
		left: 0upx;

		.radis {
			float: left;
			padding-top: 24upx;

			text {
				font-size: 28upx;
				color: #666;
			}
		}

		.leftA {
			float: left;
			padding-left: 20upx;

			text {
				font-size: 28upx;
				color: #333;
				line-height: 90upx;

				text {
					font-size: 28upx;
					color: #ff0000;
				}
			}
		}

		.rightA {
			float: right;
			width: 260upx;
			height: 100%;
			text-align: center;
			background-color: #2b5cff;

			text {
				font-size: 30upx;
				color: #fff;
				line-height: 90upx;

			}
		}
	}

	uni-popup {
		width: 30upx;
		height: 30upx;
		border: 1px solid #fff;
		background-color: #fff;
	}

	.tanchu {
		button {
			position: absolute;
			top: 10upx;
			right: 10upx;
			z-index: 9999;
			background: none !important;
			border: none !important;
		}

		button:after {
			border: none !important;
		}
	}

	.neira {
		width: 695upx;
		height: 800upx;
		background-color: #fff;
		border-radius: 20upx 20upx 0 0;
		position: relative;
		padding: 30upx;
		overflow: hidden;

		.imgs {
			float: left;

			image {
				width: 168upx;
				height: 168upx;
			}
		}

		.text_e {
			float: left;
			padding: 20upx;

			.price {
				padding-top: 10upx;

				text {
					font-size: 40upx;
					font-weight: bold;
					line-height: 80upx;
					color: #ec2334;
					line-height: 5upx;
				}
			}

			.speci {
				padding-top: 10upx;

				text {
					font-size: 28upx;
					color: #999;
				}
			}
		}

		.color {
			width: 100%;
			overflow: hidden;
			padding-top: 30upx;

			.tit_k {
				text {
					color: #999;
					font-size: 28upx;
					line-height: 30upx;
				}
			}

			.xiang {
				float: left;
				margin-top: 20upx;
				margin-right: 20upx;

				text {
					padding: 10upx 30upx;
					float: left;
					background-color: #f0f0f0;
					font-size: 28upx;
					color: #333;
					border: 1px solid #f0f0f0;
					border-radius: 5upx;
				}
			}

			.xiang_on {
				float: left;
				margin-top: 20upx;
				margin-right: 20upx;

				text {
					padding: 10upx 30upx;
					float: left;
					border: 1px solid #2b5cff;
					background-color: #fff;
					font-size: 28upx;
					color: #2b5cff;
					border-radius: 5upx;
				}
			}
		}

		.set {
			width: 100%;
			overflow: hidden;
			padding-top: 30upx;
			overflow-y:auto;
			height:300rpx;
			padding-bottom:100rpx;
			.tit_k {
				text {
					color: #999;
					font-size: 28upx;
					line-height: 30upx;
				}
			}

			.detail {

				max-height: 200rpx;
				overflow-y: auto;
				text-align: center;
			}

			.xiang {
				float: left;
				margin-top: 20upx;
				margin-right: 20upx;

				text {
					padding: 10upx 30upx;
					float: left;
					background-color: #f0f0f0;
					font-size: 28upx;
					color: #333;
					border: 1px solid #f0f0f0;
					border-radius: 5upx;
				}
			}

			.xiang_on {
				float: left;
				margin-top: 20upx;
				margin-right: 20upx;

				text {
					padding: 10upx 30upx;
					float: left;
					border: 1px solid #2b5cff;
					background-color: #fff;
					font-size: 28upx;
					color: #2b5cff;
					border-radius: 5upx;
				}
			}
		}

		.quantity {
			width: 100%;
			overflow: hidden;
			padding-top: 30upx;

			text {
				float: left;
				color: #999;
				font-size: 28upx;
			}

			.jia {
				float: right;
				// margin-right: 20rpx;
				// border: 1rpx solid #f0f0f0;
				border-radius: 10rpx;

				view {
					float: left;
					margin-left: 15rpx;
					margin-right: 15rpx;
					color: #000;
				}

				input {
					sborder: 1px solid #eee;
					float: left;
					width: 70rpx;
					border: 1px solid #f0f0f0;
					background-color: #f0f0f0;
					text-align: center;
					font-size: 23rpx;
					border-radius: 8rpx;
				}

				input::-webkit-placeholder {
					// color: #979797;
					color: red;
				}

				text {
					font-size: 20upx;
					color: #666;
				}
			}

		}
	}

	.neira .set .xiang .x {
		background: #007aff;
		color: #fff;
	}

	.bott {
		width: 670upx;
		height: 80upx;
		background-color: #007AEE;
		text-align: center;
		position: fixed;
		bottom: 40upx;
		border-radius: 40upx !important;
		left: 40upx;
		z-index:99999;
		button {
			position: initial;
			border-radius: 40upx !important;
			font-family: Microsoft YaHei;
		}

	}
</style>
