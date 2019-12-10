<template>
  <div class="card ">
  <h5 class="card-header">
    Buy Song:
  </h5>
  <div class="card-body">
    <label for="exampleFormControlSelect1">SongName</label>
      <input type="text" class="form-control" v-model='songOwner' placeholder="Song">
    
    <a href="#" @click='buy()' class="btn btn-primary">Submit</a>
  </div>
</div>
</template>

<script>
import web3 from "../../web3.js";
import contract from "../../contract.js";

export default {

            data:function(){
                return {
                    songOwner:null
                }
            },
            methods:{
                 async buy(){
                     
                if(this.songOwner!=null){
                    for(var item in this.list){
                    if(this.list[item]==this.songOwner){
                            await web3.eth.getAccounts()
                            .then(async (res)=>{
                            await contract.methods.buyRights(this.songOwner).send({from:res[0],gas:'200000',gasLimit:'200000000',value:this.priceList[item]})
                            
                            .then(res=>{
                            console.log(res)
                    }).catch((err)=>{
                    console.log(err)
                })})
                this.song.owner==null
                }}}
                    },
                     }

}
</script>

<style>

</style>