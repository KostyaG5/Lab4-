import Vue from 'vue'
import VueRouter from 'vue-router';
import NotesComponent from './components/NotesComponent.vue';

Vue.use(VueRouter);

const routes = [
    {path: '/', name: 'NotesComponent', component: NotesComponent},
];

const router = new VueRouter({ routes });

const app = new Vue({ router }).$mount('#app');
