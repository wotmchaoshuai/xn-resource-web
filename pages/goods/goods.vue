<template>
	<view>
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog type="info" message="成功消息" :duration="2000">{{demo}}</uni-popup-dialog>
		</uni-popup>

		<uni-search-bar :radius="100" @confirm="search"></uni-search-bar>

		<uni-list-item direction="row" v-for="item in list" :key="item.id" :id="item.id" :disabled="!item.num">
			<view slot="header" class="slot-box">
				<uni-list-item :title=item.name :note=item.text
					thumb="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
					thumb-size="lg">
				</uni-list-item>
			</view>

			<view slot="footer" class="thefooter">
				<uni-icons v-if="item.num&&item.need!==0" @click="onmin(item.id)" type="minus" size="30"></uni-icons>
				<text v-if="item.num&&item.need!==0">{{item.need}}</text>
				<uni-icons v-if="item.num" @click="onplus(item.id)" type="plus" size="30"></uni-icons>
				<text v-else>器械不足</text>
			</view>
		</uni-list-item>

		<view class="flag"></view>

		<view class="mygoodsnav">
			<button class="submit" type="default" @click="submit">立即预约({{amount}})</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				demo: '11',
				goods: [],
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

			onplus(e) {
				this.list.
				filter((x) => x.id === e)[0].need++
			},
			onmin(e) {
				this.list.
				filter((x) => x.id === e)[0].need--
			},
			submit() {
				var str = '';
				var data = {}
				this.list
					.filter((x) => x.need !== 0)
					.forEach((x) => {
						data[x.id] = x.name + ":" + x.need
					})
				console.log(data)
				for (let i in data) {
					str = str + '{' + data[i] + '}' + "\n";
				}
				console.log(str)
				this.demo = str
				if (str)
					this.$refs.popup.open()
			},

		},
		computed: {
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
</style>
