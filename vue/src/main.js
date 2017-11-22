//es6语法
import Vue from 'vue';
import VueRouter from 'vue-router';
import board from './components/board';

Vue.config.debug = true;//开启错误提示

Vue.use(VueRouter);

const routes = [
	{
		path: '/', component: board
	}
];
const router = new VueRouter({
	routes
});
const vm = new Vue({
	router
}).$mount('#app');
