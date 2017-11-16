<template>
	<div class="outerWrap">
		<h2>{{title}}</h2>
		<p>{{ turn }}</p>
		<ul id="wrap">
			<li class="btn" @click="playChess(i-1)" v-for="i in list"></li>
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
			list : 9,
			playerX : 'X',
			playerO : 'O',
			flag : false,//是否已经有棋子
			arrPlayx : [],//a棋的数组
			arrPlayo : [],//b棋的数组
			isAdd: false, //判断是否已经有赢家，是，则不再添加新棋子
			arrNum : []
		}
	},
	methods: {
        playChess(i){
        	if(!this.isAdd){
        		//var html = event.target.innerHTML;
	        	var oLi = document.getElementsByClassName('btn');
	        	if(oLi[i].innerHTML==''){//如果所点击的li内容为空
	        		if(this.flag){//如果flag为true
	        			oLi[i].innerHTML = this.playerO;//填入“O”
	        			this.turn = '该playerX了';
	        			this.arrPlayo.push(i);
	        			this.arrNum.push(i);
	        		}else{
	        			oLi[i].innerHTML = this.playerX;//否则填入"X"
	        			this.turn = '该playerO了';
	        			this.arrPlayx.push(i);
	        			this.arrNum.push(i);
	        		}

		        	var sortX = this.arrPlayx.sort(this.sortNumber);//把存棋子的数组按照大小排序
		        	var sortO = this.arrPlayo.sort(this.sortNumber);//把存棋子的数组按照大小排序
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
			var r = 1;//行数
			var s = 1;
			var l = 1;
        	for(var j = 0,len = arr.length; j < len; j++){
        		//横向
        		//0,1,2 = 3 / 3 = 1  2 % 3 = 2
        		//3,4,5 = 12 / 3 = 4  5 % 3 = 2
        		//6,7,8 = 21 / 3 = 7  8 % 3 = 2
        		if ((arr[j + 2] - arr[j] == 2) && ((arr[j] + arr[j + 1] + arr[j + 2]) / 3 == arr[j + 1]) && arr[j+2] % 3 == 2) {
                    alert("1"+info); //胜利
                    this.turn = info; //改变显示信息
                    this.isAdd = true;
                }
        		for(var m = j+1,len = arr.length; m < len;m++){
        			//纵向
	        		//0,3,6   3 - 0 = 3 * 1  6 - 0 = 3 * 2  6 - 3 = 3 * 1
	        		//1,4,7   4 - 1 = 3 * 1  7 - 1 = 3 * 2  7 - 4 = 3 * 1
	        		//2,5,8   5 - 2 = 3 * 1  8 - 2 = 3 * 2  8 - 5 = 3 * 1
        			if(arr[m]-arr[j] == 3 * r){
        				if(r == 2){
        					alert("2"+info); //胜利
        					this.turn = info;
        					this.isAdd = true;
	        				r = 1;
	        				break;
        				}else{
	        				r++;
	        			}
        			}
        			//斜向
        			//0,4,8   4 - 0 = 1 * 4   8 - 0 = 2 * 4
        			if (arr[m] - arr[j] == s * 4) { //从左上角斜下来
                        if (s == 2) {
                        	alert("3"+info);//胜利
                            this.turn = info;
                            this.isAdd = true;
                            s = 1;
                            break;
                        } else {
                            s++;
                        }
                    }
        			//2,4,6   4 - 2 = 1 * 2   6 - 2 = 2 * 2
        			if (arr[m] - arr[j] == l * 2 && arr[m] % 2 == 0 && arr[j] != 0 && arr[m] !=8) { //右上角斜下来
                        if (l == 2) {
                        	alert("4"+info);//胜利
                            this.turn = info;
                            this.isAdd = true;
                            l = 1;
                            break;
                        } else {
                            l++;
                        }
                    }
        		}
        	}
		},
		reStart(){//重新开始
			var liDomList = document.getElementsByTagName('li');
			//console.log(Lis[this.arrNum.length-1].innerHTML)
			if(liDomList[this.arrNum.length-1].innerHTML == 'X'){
				this.turn = '该playerO了';
			}else{
				this.turn = '该playerX了';
			}
			for(var i = 0,len = this.arrNum.length;i<len;i++){//把对应的li的内容清空
				liDomList[this.arrNum[i]].innerHTML = null;
				liDomList[this.arrNum[i]].style.color = '#000';
			}
			this.arrNum.length = 0;//数组清空
			this.arrPlayx.length = 0;//数组清空
			this.arrPlayo.length = 0;//数组清空
			this.isAdd = false;

		},
		cancel(){//撤销操作
			var len = this.arrNum.length;
			if(this.isAdd == false){
				if(len > 0 ){
					var index  = this.arrNum[len-1];
					var aLi = document.getElementsByTagName('li');
					if(aLi[index].innerHTML == 'O'){
						this.removeByValue(this.arrPlayo,index);//把对应的元素从双方数组中删除
					}else{
						this.removeByValue(this.arrPlayx,index);//把对应的元素从双方数组中删除
					}
					aLi[index].innerHTML = null;
					this.arrNum.pop();//把最后一个棋子的位置从数组里移除
				}
			}else{
				alert('对局已结束，不可悔棋！！');
			}
		},
		removeByValue(arr, val) {//删除数组中指定值
		  for(var i=0; i<arr.length; i++) {
		    if(arr[i] == val) {
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
		turn : function(news,olds){//监听turn的变化，高亮显示赢家
			var aLi = document.getElementsByTagName('li');
			if(news == 'playerO胜'){
				let len = this.arrPlayo.length;
				for(let i = 0;i<len;i++){
					aLi[this.arrPlayo[i]].style.color = 'red';
				}
			}
			if(news == 'playerX胜'){
				let len = this.arrPlayx.length;
				for(let i = 0;i<len;i++){
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
		caption-side: #000;
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
