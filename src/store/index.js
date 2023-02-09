import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ename:"",
    empno:"",
    reidate :""
  },
  getters: {
  },
  mutations: {
    //第一个参数是state，第二、三..个参数是数据
    setEname(state,ename) {
      if (ename != null) {
        state.ename = ename
      } else {
        state.ename = ""
      }
    },
    setEmpno(state,empno) {
      if (empno != null) {
        state.empno = empno
      } else {
        state.empno = ""
      }
    },
    setReiDate(state,reidate) {
      if (reidate != null) {
        state.reidate = reidate
      } else {
        state.reidate = ""
      }
    }
  },
  actions: {
    //context相当于 Vuex.Store实例
    setEname(context,ename) {
      context.commit("setEname", ename)
    },
    setEmpno(context,empno) {
      context.commit("setEmpno", empno)
    },
    setReiDate(context,reidate){
      context.commit("setReiDate", reidate)
    }
  },
  modules: {
  }
})
