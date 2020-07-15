import Vue from 'vue'
import App from './App'
//引入公共样式
// import './style/gg.css'
Vue.config.productionTip = false
// var webUrl = 'https://yimuzk.com'
var webUrl = 'http://192.168.101.68:8089'
Vue.prototype.webUr = webUrl
var $http = function(obj) {
	console.log(obj)
	if (obj.dengl) {
		uni.request({
			url: webUrl + obj.url.substring(4),
			data: obj.data,
			method: obj.method ? obj.method : 'GET',
			header: {
				'content-type': obj.haeder ? "application/json" : 'application/x-www-form-urlencoded;application/json;charset=UTF-8',
				'maijiToken': 'abc494548414c8d8abc14541abc84cc1'
			},
			success: function(res) {
				obj.success(res)
			}
		})
	} else {
		if (uni.getStorageSync('Authorization')) {
			uni.request({
				url: webUrl + obj.url.substring(4),
				data: obj.data,
				method: obj.method ? obj.method : 'GET',
				header: {
					'content-type': obj.haeder ? 'application/json' : 'application/x-www-form-urlencoded;application/json;charset=UTF-8',
					'maijiToken': 'abc494548414c8d8abc14541abc84cc1',
					'Authorization': uni.getStorageSync('Authorization')
				},
				success: function(res) {
					if (res.data.code == 401) {
						uni.showToast({
							title: '您未登录请登录后重试',
							icon: 'none'
						})
						setTimeout(function() {
							uni.navigateTo({
								url: '/pages/enter/enter'
							})
						}, 1600)
					}
					obj.success(res)
				}
			})
		} else {
			uni.showToast({
				title: '您未登录请登录后重试',
				icon: 'none'
			})
			setTimeout(function() {
				uni.navigateTo({
					url: '/pages/enter/enter'
				})
			}, 1600)
		}
	}
}
var jiaoyanPhone = function checkPhone(phone) {
	if (!(/^1[3456789]\d{9}$/.test(phone))) {
		return false;
	} else {
		return true
	}
}
var jiaoyanshenfenzheng = function checkCard(card) {
	if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(card))) {
		return false
	} else {
		return true
	}
}
var jiaoyanyouxiang = function checkEmail(email) {
	if (!(/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/.test(email))) {
		return false
	} else {
		return true
	}

}
Vue.prototype.$jiaoyan = jiaoyanPhone
Vue.prototype.$jiaoyanCard = jiaoyanshenfenzheng
Vue.prototype.$jiaoyanEmail = jiaoyanyouxiang
Vue.prototype.$https = $http
Vue.prototype.webUrl = webUrl
//全局公共底部
import TAB from './components/tabBar/tabBar.vue';
Vue.use('TAB', TAB);

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
