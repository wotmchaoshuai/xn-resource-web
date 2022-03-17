<template>
	<view>
		
		<!-- 搜索框组件 -->
		<view class="search" @click="search">
			<uni-icons type="search" size="20" color="#c0c4cc"></uni-icons>
		</view>

		<!-- 商品列表组件 -->

		<!-- disabled属性:是否可用，当商品的数量为0时不可用-->
		<uni-list-item direction="row" v-for="item in list" :key="item.id" :disabled="!item.num">

			<!-- 头部 -->
			<view slot="header" class="slot-box">

				<!-- title:商品名字,note:商品描述,thumb:商品图片 -->
				<uni-list-item :title=item.name :note=item.text
					thumb="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
					thumb-size="lg">
				</uni-list-item>
			</view>

			<!-- 尾部 -->
			<view slot="footer" class="thefooter">

				<!-- v-if:如果商品的数量不为0并且需求量不等于0时显示组件, -->
				<uni-icons v-if="item.num&&item.need!==0" @click="onmin(item.id)" type="minus" size="30"></uni-icons>

				<!-- v-if:如果商品的数量不为0并且需求量不等于0时显示组件, -->
				<text v-if="item.num&&item.need!==0">{{item.need}}</text>

				<!-- v-if:如果商品的数量不为0时显示组件, -->
				<uni-icons v-if="item.num" @click="onplus(item.id)" type="plus" size="30"></uni-icons>

				<!-- v-else:否则显示器械不足 -->
				<text v-else>器械不足</text>
			</view>
		</uni-list-item>

		<!-- 分隔符组件:用来防止预约按钮遮挡商品列表 -->
		<view class="flag"></view>

		<!-- 预约按钮组件 -->
		<view class="mygoodsnav">
			<button class="submit" @click="submit">

				<!-- amount:计算属性,获得item.need的数量 -->
				<text>立即预约({{amount}})</text>
			</button>
		</view>

		<!-- 弹出框组件 -->
		<uni-popup ref="popup" type="dialog">

			<!-- goods:选中的商品列表 -->
			<uni-popup-dialog type="info" mode="base" title="预约成功" :content=strgoods></uni-popup-dialog>
		</uni-popup>

	</view>
</template>

<script>
	export default {
		data() {
			return {

				//选中的商品列表
				goods: null,

				//显示选中商品的数据给弹出框
				strgoods: '',

				//后端传来的商品列表
				list: [{
					"id": "1",
					"name": "篮球",
					"num": 0,
					"text": "这是篮球",
					"need": 0,
				}, {
					"id": "2",
					"name": "足球",
					"num": 19,
					"text": "这是足球",
					"need": 0,
				}, {
					"id": "3",
					"name": "乒乓球",
					"num": 16,
					"text": "这是乒乓球",
					"need": 0,
				}, {
					"id": "4",
					"name": "羽毛球",
					"num": 0,
					"text": "这是羽毛球",
					"need": 0,
				}, {
					"id": "5",
					"name": "排球",
					"num": 21,
					"text": "这是排球",
					"need": 0,
				}],
			};
		},
		
		
		methods: {

			//点击增加按钮的事件,item.need++
			onplus(e) {
				this.list.
				filter((x) => x.id === e)[0].need++
			},

			//点击减少按钮的事件,item.need--
			onmin(e) {
				this.list.
				filter((x) => x.id === e)[0].need--
			},

			//点击立即预约按钮的事件,
			submit() {
				var str = ''
				var needlist = []

				//找出need不为0的商品赋值给this.goods,goods返回给后端
				this.list
					.filter((x) => x.need !== 0)
					.forEach((x) => {
						var data = {}
						data["id"] = x.id
						data["name"] = x.name
						data["need"] = x.need
						needlist.push(data)
					})
				console.log(needlist)
				this.goods = needlist

				//给弹出框的内容strgoods赋值
				needlist.forEach((x) => {
					str = str + x.name + ":" + x.need + "\n"
				})
				this.strgoods = str

				//如果没有预约则点击无效
				if (needlist[0])
					this.$refs.popup.open()
			},
			search() {

				//将this.list的值传送给触发updata函数的页面
				setInterval(() => {
					uni.$emit('update', this.list)
				}, 500)

				//跳转至search页面
				uni.navigateTo({
					url: '/pages/search/search'
				})

			},
		},
		
		
		computed: {
			
			//计算list.need的数量
			amount() {
				let a = 0;
				this.list.forEach((x) => {
					a += x.need
				});
				return a;
			},
		},

	}
</script>

<style lang="scss">
	.mygoodsnav {
		width: 100%;
		position: fixed;
		bottom: 25rpx;
	}

	.flag {
		padding-bottom: 150rpx;
	}

	.thefooter {
		display: flex;
		align-items: center;
	}

	.submit {
		height: 100rpx;
		margin: 0 150rpx;
		line-height: 100rpx;
	}

	.search {
		background-color: #f8f8f8;
		margin: 30rpx 50rpx;
		border-radius: 70rpx;
		height: 70rpx;
		text-align: center;
		line-height: 70rpx;
	}
</style>
