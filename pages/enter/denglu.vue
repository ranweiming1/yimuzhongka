<template>
	<web-view :src='u'></web-view>
</template>

<script>
	export default{
		data(){
			return {
				u:''
			}
		},
		onLoad:function(option){
			let alipayUrl ='https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=' + option.daz +
							'&scope=auth_user&redirect_uri=https://www.yimuzk.com'
			let openURL = 'alipays://platformapi/startapp?appId=20000067&url=' + encodeURIComponent(alipayUrl);
			this.u=openURL
		}
	}
</script>

<style>
</style>
