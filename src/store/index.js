import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
// import {
//   VueJsonp
// } from 'vue-jsonp'

Vue.use(Vuex)
// Vue.use(VueJsonp)

export default new Vuex.Store({
  state: {
    slideList: [],
    books: [],
    book: []
  },
  mutations: {
    getSlideList(state, result) {
      state.slideList = result;
      localStorage.slideList = JSON.stringify(state.slideList)
    },
    getBooks(state, booksList) {
      state.books = booksList;
    },
    toMovePage(state, book) {
      state.book = book;
      localStorage.book = JSON.stringify(state.book)
    }
  },
  actions: {
    slideListAsync(context) {
      axios
        .get(
          'http://api.kele8.cn/agent/http://47.96.158.147/json/suggest/comic_json_v8_68_1'
        )
        .then(res => {
          // this.slideList = res.data.data.slide_list;
          let result = res.data.data.slide_list
          let booksList = res.data.data.book
          context.commit('getSlideList', result)
          context.commit('getBooks', booksList)
        }).catch(err => err);
    },
  },
  modules: {}
})