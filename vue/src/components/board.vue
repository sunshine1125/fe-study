<template>
	<div class="outerWrap">
		<h2>{{title}}</h2>
		<p>{{ turn }}</p>
		<ul id="wrap">
			<li class="btn" @click="playChess(index,item.info)" v-for="(item,index) in lists">{{item.info}}</li>
		</ul>
		<button class="start" @click="reStart">重新开始</button>
		<button class="cancel" @click="cancel">上一步</button>
	</div>
</template>
<script>
export default{
	name: 'board',
	data(){
		return {
			title : '井字棋',
			turn: '该playerX了',
			lists : [{info: ''},{info: ''},{info: ''},{info: ''},{info: ''},{info: ''},{info: ''},{info: ''},{info: ''}],
			playerX : 'X',
			playerO : 'O',
			info: '',
			flag : false,//是否已经有棋子
			arrPlayx : [],//a棋的数组
			arrPlayo : [],//b棋的数组
			isAdd: false, //判断是否已经有赢家，是，则不再添加新棋子
			arrNum : []
		}
	},
	methods: {
        playChess(i,info){
        	
        	if(!this.isAdd){
        		
	        	if(info === ''){//如果所点击的li内容为空
	        		if(this.flag){//如果flag为true
	        			this.lists[i].info = this.playerO;//填入“O”
	        			this.turn = '该playerX了';
	        			this.arrPlayo.push(i);
	        			this.arrNum.push(i);
	        		}else{
	        			this.lists[i].info = this.playerX;//否则填入"X"
	        			this.turn = '该playerO了';
	        			this.arrPlayx.push(i);
	        			this.arrNum.push(i);
	        		}

		        	let sortX = this.arrPlayx.sort(this.sortNumber);//把存棋子的数组按照大小排序
		        	let sortO = this.arrPlayo.sort(this.sortNumber);//把存棋子的数组按照大小排序
		        	if(this.flag){
		        		this.hasWin(sortO,'playerO胜');
		        	}else{
		        		this.hasWin(sortX,'playerX胜');
		        	}

		        	this.flag = !this.flag;//转换棋子
	        	}
        	}
        },
        hasWin(arr,info){
			const lines = [
				[0, 1, 2],
				[3, 4, 5],
				[6, 7, 8],
				[0, 3, 6],
				[1, 4, 7],
				[2, 5, 8],
				[0, 4, 8],
				[2, 4, 6]
			];
			for (let i = 0, len = lines.length; i < len; i++) {
				if(arr.length >= lines[i].length){
					let arrStr = arr.toString();
					if(arrStr.indexOf(lines[i][0]) !== -1 && arrStr.indexOf(lines[i][1]) !== -1 &&arrStr.indexOf(lines[i][2]) !== -1){
						this.turn = info;
						this.isAdd = true;
					}
				}
			}
		},
		reStart(){//重新开始
			let liDomList = document.getElementsByTagName('li');
			if(this.lists[this.arrNum[this.arrNum.length-1]].info === 'X'){
				this.turn = '该playerO了';
			}else{
				this.turn = '该playerX了';
			}
			for(let i = 0,len = this.arrNum.length; i < len; i++){//把对应的li的内容清空
				this.lists[this.arrNum[i]].info = '';
				liDomList[this.arrNum[i]].style.color = '#000';
			}
			this.arrNum.length = 0;//数组清空
			this.arrPlayx.length = 0;//数组清空
			this.arrPlayo.length = 0;//数组清空
			this.isAdd = false;

		},
		cancel(){//撤销操作
			let len = this.arrNum.length;
			if(this.isAdd === false){
				if(len > 0 ){
					let index  = this.arrNum[len-1];
					//let aLi = document.getElementsByTagName('li');
					if(this.lists[index].info === 'O'){
						this.removeByValue(this.arrPlayo,index);//把对应的元素从双方数组中删除
					}else{
						this.removeByValue(this.arrPlayx,index);//把对应的元素从双方数组中删除
					}
					this.lists[index].info = '';
					this.arrNum.pop();//把最后一个棋子的位置从数组里移除
				}
			}else{
				alert('对局已结束，不可悔棋！！');
			}
		},
		removeByValue(arr, val) {//删除数组中指定值
		  for(let i = 0; i < arr.length; i++) {
		    if(arr[i] === val) {
		      arr.splice(i, 1);
		      break;
		    }
		  }
		}
	},
	computed: {
		sortNumber(a,b){//比较大小
			return a-b;
		}
	},
	watch: {
		turn : function(news){//监听turn的变化，高亮显示赢家
			let aLi = document.getElementsByTagName('li');
			if(news === 'playerO胜'){
				let len = this.arrPlayo.length;
				for(let i = 0;i < len; i++){
					aLi[this.arrPlayo[i]].style.color = 'red';
				}
			}
			if(news === 'playerX胜'){
				let len = this.arrPlayx.length;
				for(let i = 0;i < len; i++){
					aLi[this.arrPlayx[i]].style.color = 'red';
				}
			}
		}
	}
}
</script>
<style lang="css" scoped>
	*{
		margin: 0;
		padding: 0;
	}
	div{
		width: 100%;
		height: 100%;
		position: relative;
		text-align: center;
	}
	h2,p{
		width: 100%;
		text-align: center;
	}
	p{
		margin-top: 10px;
		font-size: 20px;
		color: red;
	}
	#wrap{
		width: 180px;
		height: 180px;
		display: flex;
		flex-wrap: wrap;
		margin: 30px auto;
	}
	.btn{
		flex: auto;
		width: 60px;
		height: 60px;
		border: 1px solid #999;
		background: #Fff;
		box-sizing: border-box;
		line-height: 60px;
		font-weight: 700;
		font-size: 30px;
		list-style: none;
		text-align: center;
		/*caption-side: #000;*/
	}
	button{
		outline: none;
		margin: 10px auto;
		height: 40px;
		background: #eee;
		color: dodgerblue;
		border: 1px solid #666;
		width: 100px;
		margin-right: 20px;
	}
</style>
