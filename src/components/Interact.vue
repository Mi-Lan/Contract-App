<template>
  <div>
    Interact
    <div>{{miker}}</div>
    <button @click="metoda()">Click here to make magic</button>
  </div>
   
</template>

<script>
import web3 from '../web3';
import contract from '../contract.js';


export default {
  data:function(){
    return{
      miker:null
    }
  },
  methods:{
    
  },
   mounted(){
  //console.log(contract)
  
 
    contract.methods.claimAuthorship("Love-Generation",true,25).send({gas: '200000',gasLimit:'20000000000'})
   .then((res)=>{
      console.log(res);
      }).catch(function(err) {
      console.log(err);
})
   
  }
 
}
</script>

<style scoped>

</style>
