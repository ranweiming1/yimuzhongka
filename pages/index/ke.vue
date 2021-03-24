<template>
	<web-view :src='u'></web-view>
</template>

<script>
	export default{
		data(){
			return{
				u:'https://w16.53kf.com/webCompany.php?arg=10249776&style=1&kf_sign=zU3MDMTYwNUyOTExMjkwODQ3OTQyMDA2NzIyNDk3NzY%253D'
			}
		},
		onLoad:function(option){
			this.u=this.u+'&'+option.id
		}
	}
</script>

<style>
</style>