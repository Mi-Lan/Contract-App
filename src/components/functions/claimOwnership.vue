<template>
  <div class="card mb-4 mt-4">
  <h5 class="card-header">Claim Ownership:</h5>
  <div class="card-body">
    <div class="form-row">
     
    <div class="col">
       <label for="exampleFormControlSelect1">SongName</label>
      <input v-model="ownership.song" type="text" class="form-control" placeholder="Song">
    </div>
    <div class="col">
     <div class="custom-control custom-radio custom-control-inline">
  <input type="radio" id="customRadioInline1" v-model="ownership.bool" value='true' name="customRadioInline1" class="custom-control-input">
  <label class="custom-control-label" for="customRadioInline1">For Sale</label>
</div>
<div class="custom-control custom-radio custom-control-inline">
  <input type="radio" id="customRadioInline2" v-model="ownership.bool" value='false' name="customRadioInline1" class="custom-control-input">
  <label class="custom-control-label" for="customRadioInline2">Not For Sale</label>
</div>
    

    </div>
    <div class="col">
       <label for="exampleFormControlSelect1">Price</label>
      <input type="number" v-model="ownership.number" class="form-control" placeholder="Number">
    </div>
  </div>
    <a @click='owner()' href="#" class="btn btn-primary">Submit</a>
  </div>
</div>
</template>

<script>
import web3 from "../../web3.js";
import contract from "../../contract.js";

export default {
    

    data:function(){
        return {
        ownership:{
        song:null,
        bool:null,
        number:null
      },
        }
    },
    methods:{
         async owner(){
      if(this.ownership.song!=null&&this.ownership.bool!=null&&this.ownership.number!=null){

              await web3.eth.getAccounts()
              .then(async (res)=>{
               await contract.methods.claimAuthorship(this.ownership.song,this.ownership.bool,this.ownership.number).send({from:res[0],gas:'200000',gasLimit:'200000000'})
                    
                  .then(async (res)=>{
                    await this.lister();
                    
                    console.log(res)
                  }).catch((err)=>{
                    console.log(err)
        })
      })
      }else{
             alert('Provide input')
      }
                    this.ownership.song=null
                    this.ownership.bool=null
                    this.ownership.number=null
    },
    }

}
</script>

<style>

</style>