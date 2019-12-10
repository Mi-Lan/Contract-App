import Vue from 'vue'
import Vuex from 'vuex'

import web3 from "../web3.js";
import contract from "../contract.js";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list:[],
    priceList:[]

  },
  mutations: {
    price:({state,payload})=>{
      state.list.push(payload)
    },
    priceList:({state,payload})=>{
      state.priceList.push(payload)
    }
  },
  //asynchronous actions go here
  actions: {
    async listenerCount({commit}){

      
      await web3.eth.getAccounts()
    .then(()=>{
         contract.methods.counter().call()
        .then(async(res)=>{
          
          for (var item=0;item<res;item++){
            
            await contract.methods.songList(item).call()
            .then(async(value)=>{
              await contract.methods.getPrice(value).call()
              .then((price)=>{
              //  this.priceList.push(price)
              commit('priceList',price)
              })
              commit('priceList',value)
              //this.list.push(value)
            })
          }
          
        }).catch((err)=>{
          console.log(err)
        })
    })

    }
  },

})
