<template>
  <div>
    Interact
    <div @click='lister()'>Ovde klikni za listu</div>
    <div>{{list}}</div>
  </div>
   
</template>

<script>
import web3 from "../web3.js";
import contract from "../contract.js";

export default {
  data:function(){
    return{
      list:''
    }
  },
  methods:{
    async lister(){

      await web3.eth.getAccounts()
.then((res)=>{
     contract.methods.songLister().call({from:res[0],gas:'200000',gasLimit:'200000000'})
    .then((res)=>{
      this.list=res
      
    }).catch((err)=>{
      console.log(err)
    })
})

    }
  },
  

  async mounted(){
    /*
    await web3.eth.getAccounts()
.then((res)=>{
     contract.methods.claimAuthorship('Boards-Of-Canada',true,69).send({from:res[0],gas:'200000',gasLimit:'200000000'})
    .then((res)=>{
      console.log(res)
    }).catch((err)=>{
      console.log(err)
    })
})*/

    
   
    
   
    }
    
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
