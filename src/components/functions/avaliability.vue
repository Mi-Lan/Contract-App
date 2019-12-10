<template>
  <div class="card ">
  <h5 class="card-header">
   Set Avaliability:
  </h5>
  <div class="card-body">
    <label for="exampleFormControlSelect1">SongName</label>
      <input type="text" class="form-control" v-model="avaliability.song" placeholder="Song">
    <div class="custom-control custom-radio custom-control-inline">
  <input type="radio" id="customRadioInline12" name="customRadioInline12" value='true' v-model="avaliability.bool" class="custom-control-input">
  <label class="custom-control-label" for="customRadioInline12">For Sale</label>
</div>
<div class="custom-control custom-radio custom-control-inline">
  <input type="radio" id="customRadioInline22" name="customRadioInline12" value='false' v-model="avaliability.bool" class="custom-control-input">
  <label class="custom-control-label" for="customRadioInline22">Not For Sale</label>
</div>
   
    <a href="#" @click='avaliabilitye()' class="btn btn-primary">Submit</a>
  </div>
</div>
</template>

<script>
import web3 from "../../web3.js";
import contract from "../../contract.js";

export default {

    data:function(){
        return{
            avaliability:{
        song:null,
        bool:null
      },
            
        
    }},
    

    methods:{
    async avaliabilitye(){
        if(this.avaliability.song!=null&&this.avaliability.bool!=null){
            await web3.eth.getAccounts()

              .then((res)=>{
                console.log(res)
                contract.methods.setAvaliablity(this.avaliability.song,this.avaliability.bool).send({from:res[0],gas:'200000',gasLimit:'200000000'})
                  .then((res)=>{
                    console.log(res)
                  })
              })
         }else{
            alert('Provide input!')
            }
            this.avaliability.song=null
            this.avaliability.bool=null
        }                   
    }
}
</script>

<style>

</style>