<template>
	<view>

		<!-- 搜索框组件 -->
		<uni-search-bar v-model=searchname :radius="100" focus="true" @confirm="search"></uni-search-bar>

		<!-- 商品列表组件 -->
		<uni-list-item direction="row" v-for="item in list" :key="item.id"" :disabled=" !item.num">

			<!-- 头部 -->
			<view slot="header" class="slot-box">
				<uni-list-item :title=item.name :note=item.text
					thumb="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
					thumb-size="lg">
				</uni-list-item>
			</view>

			<!-- 尾部 -->
			<view slot="footer" class="thefooter">
				<uni-icons v-if="item.num&&item.need!==0" @click="onmin(item.id)" type="minus" size="30"></uni-icons>
				<text v-if="item.num&&item.need!==0">{{item.need}}</text>
				<uni-icons v-if="item.num" @click="onplus(item.id)" type="plus" size="30"></uni-icons>
				<text v-else>器械不足</text>
			</view>
		</uni-list-item>

		<!-- 预约按钮组件 -->
		<view class="mygoodsnav" v-if=ifnav>
			<button class="submit" @click="submit">
				<text>立即预约({{amount}})</text>
			</button>
		</view>

		<!-- 弹出框组件 -->
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog mode="base" type="info" title="预约成功" :content=strgoods></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {

				//bool 预约按钮是否显示
				ifnav: false,

				//string 预约成功的消息
				strgoods: '',

				//string 搜索的商品名
				searchname: null,

				//从goods页面传来的列表
				mainlist: null,

				//符合要求的商品列表
				list: null,
				
				//选中的商品列表
				goods:null
			};
		},


		onLoad() {

			//触发update函数,调用this.add函数
			uni.$once('update', this.add)
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

			//将goods页面传过来的值赋值给this.mainlist
			add(e) {
				this.mainlist = e
			},
			
			//点击搜索按钮的事件
			search() {
				let demolist = this.mainlist.filter((x) => x.name === this.searchname)
				if (demolist.length !== 0) {
					this.list = demolist
					this.ifnav = true
				} else {
					this.list = null
					this.ifnav = false
				}
			},

			//点击立即预约按钮的事件,
			submit() {
				var str = '';
				var needlist = []

				this.mainlist
					.filter((x) => x.need !== 0)
					.forEach((x) => {
						var data = {}
						data["id"] = x.id
						data["name"] = x.name
						data["need"] = x.need
						needlist.push(data)
					})
				console.log(needlist)
				this.goods=needlist
				
				//给弹出框的内容strgoods赋值
				needlist.forEach((x) => {
					str = str + x.name + ":" + x.need + "\n"
				})
				this.strgoods = str
				
				//如果没有预约则点击无效
				if (needlist[0])
					this.$refs.popup.open()
			},
		},
		computed: {
			
			//计算list.need的数量
			amount() {
				let a = 0;
				if (this.list !== null)
					this.mainlist.forEach((x) => {
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
		bottom: 200rpx;
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
</style>
