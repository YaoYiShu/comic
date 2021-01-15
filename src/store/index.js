import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    slideList: [],
    books: [],
    book: [],
    fansLists: [],
    currentIndex: 1,
    chapter: []
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
    },
    getfansLists(state, result) {
      if (result.length) {
        result.map(item => {
          return {
            formatUid: item.id,
            uname: item.uname,
            amount: item.amount
          };
        });
        // state.fansLists.push(...result)
        state.fansLists = result;
        // localStorage.fans = JSON.stringify(state.fansLists)
        // console.log(state.fansLists);
      }
    },
    getChapter(state, result) {
      state.chapter = result
    }
  },
  // http://api.kele8.cn/agent/http://47.96.158.147/json/suggest/comic_json_v8_68_1
  // http://localhost:8080/data.json
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
    getFansList(context, value) {
      // id, num, currentIndex
      // console.log(value);
      axios
        .get(
          'https://api.zymk.cn/app_api/v5/gift_effectslist/?comic_id=' +
          value.id +
          '&rows=' + value.num + '&page=' +
          value.currentIndex
        )
        .then(res => {
          context.commit('getfansLists', res.data.data)
        });
    },
    getChapter_addr(context, id) {
      axios.get('https://getcomicinfo-globalapi.zymk.cn/app_api/v5/getcomicinfo/?comic_id=' + id).then(res => {
        // console.log(res.data.data.chapter_list);
        context.commit('getChapter', res.data.data.chapter_list)
      })
    }

  },
})