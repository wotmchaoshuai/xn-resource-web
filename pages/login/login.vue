<template>
	<view>
		<uni-card title="登录系统">
			<uni-forms ref="form" :modelValue="formData" :rules="rules">
				<uni-forms-item label="姓名" name="username">
					<uni-easyinput type="text" v-model="formData.username" placeholder="请输入姓名" />
				</uni-forms-item>
				<uni-forms-item label="密码" name="password">
					<uni-easyinput type="password" v-model="formData.password" placeholder="请输入密码" />
				</uni-forms-item>

			</uni-forms>
			<button @click="submit">登录</button>
		</uni-card>
		
		<!-- 登录失败的弹窗 -->
		<uni-popup ref="popup" type="message">
			<uni-popup-message type="error" message="账号或密码错误!" :duration="2000"></uni-popup-message>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formData: {
					username: "",
					password: "",
				},
				rules: {
					username: {
						rules: [{
							required: true,
							errorMessage: "请输入用户名"
						}, {
							minLength: 3,
							maxLength: 9,
							errorMessage: "用户名长度在{minLength}到{maxLength}之间"
						}]
					},
					password: {
						rules: [{
							required: true,
							errorMessage: "请输入密码"
						}, {
							minLength: 6,
							maxLength: 15,
							errorMessage: "用户名长度在{minLength}到{maxLength}之间"
						}]
					}
				}
			};
		},
		methods: {
			submit() {
				
				//验证表单元素
				this.$refs.form.validate().then(res => {
					if (res.username === 'admin' && res.password === '123456') {
						console.log('welcome!');
						
						//存储token值，用来验证路由守卫
						uni.setStorageSync('token', 'right');
						uni.switchTab({
							url: '/pages/home/home'
						});
					} else {
						console.log('no!');
						this.$refs.popup.open('top');
						this.formData.password = '';
					}

				}).catch(err => {
					console.log('表单错误信息:', err);
				})

			}

		}
	}
</script>

<style lang="scss">

</style>
