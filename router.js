import {
	RouterMount,
	createRouter
} from 'uni-simple-router';

const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,
	routes: [{
			path: '/pages/login/login',
			name: 'login'
		},
		{
			path: '/pages/home/home',
			name: 'home'
		},
		{
			path: '/pages/goods/goods',
			name: 'goods'
		},
		{
			path: '/pages/record/record',
			name: 'record'
		},
		{
			path: '/pages/user/user',
			name: 'user'
		},
		{
			path: '/pages/search/search',
			name: 'search'
		},
		{
			path: '*',
			redirect: (to) => {
				return {
					name: "login"
				}
			}
		},
	]
});
//全局路由前置守卫
router.beforeEach((to, from, next) => {
	
	if (to.name === "login")
		return next()
	const token = uni.getStorageSync('token');
	if (!token) {
		return next({
			name: "login"
		})
	}
	
	
	/* if (to.name === "login")
		return next({
			name: "goods"
		}) */
		
		
	next()
});
// 全局路由后置守卫
router.afterEach((to, from) => {})

export {
	router,
	RouterMount
}
