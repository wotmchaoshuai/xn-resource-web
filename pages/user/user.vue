<template>
	<view>
		<uni-card>
			<button @click="out">退出登录</button>
		</uni-card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			out(){
				uni.removeStorageSync('token');
				uni.reLaunch({
					url: '/pages/login/login'
				});
			}
		}
	}
</script>

<style lang="scss">

</style>
