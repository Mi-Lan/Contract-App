<template>
  <div class='container'>
    Interact
    <a href='https://rinkeby.etherscan.io/address/0x3eCa84aC704F61AfC50a3d2af3abE4CDa5FFe952'><div >Contract address :0x70737A8a04B96379341a65c72690d59502e257A6</div></a>
    
      <hr>
  

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
<div class='row mb-4'>
  <div class='col'>
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
</div>
<div class="col">
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
</div>
</div>


    <div>Song list:</div>
    <ul v-for="(item,index) in list" class="list-group" :key=index>
  <li class="list-group-item">{{item}}: {{priceList[index]}} wei</li>
  </ul>
  </div>
   
</template>

<script>
import web3 from "../web3.js";
import contract from "../contract.js";

export default {
  data:function(){
    return{
      ownership:{
        song:null,
        bool:null,
        number:null
      },
      avaliability:{
        song:null,
        bool:null
      },
      songOwner:null,

      list:[],
      priceList:[]
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
                    this.ownership.song=null
                    this.ownership.bool=null
                    this.ownership.number=null
                    console.log(res)
                  }).catch((err)=>{
                    console.log(err)
        })
      })
      }else{
             alert('Provide input')
      }
    },
    async avaliabilitye(){
        if(this.avaliability.song!=null&&this.avaliability.bool!=null){
       await web3.eth.getAccounts()

              .then((res)=>{
                console.log(res)
                contract.methods.setAvaliablity(this.avaliability.song,this.avaliability.bool).send({from:res[0],gas:'200000',gasLimit:'200000000'})
                  .then((res)=>{
                    this.avaliability.song=null
                    this.avaliability.bool=null
                    
                    console.log(res)
                  })
              })
    

  }else{
    alert('Provide input!')
  }
},async buy(){
  console.log(this.list)
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
        })
  })

    }
  }
  /**/

  
  }
},async lister(){
  this.list=[]
  this.priceList=[]
  await web3.eth.getAccounts()
.then(()=>{
     contract.methods.counter().call()
    .then(async(res)=>{
      
      for (var item=0;item<res;item++){
        
        await contract.methods.songList(item).call()
        .then(async(value)=>{
          await contract.methods.getPrice(value).call()
          .then((price)=>{
            this.priceList.push(price)
          })
          this.list.push(value)
        })
      }
      
    }).catch((err)=>{
      console.log(err)
    })
})
}
  },
  

  async mounted(){
    await web3.eth.getAccounts()
.then(()=>{
     contract.methods.counter().call()
    .then(async(res)=>{
      
      for (var item=0;item<res;item++){
        
        await contract.methods.songList(item).call()
        .then(async(value)=>{
          await contract.methods.getPrice(value).call()
          .then((price)=>{
            this.priceList.push(price)
          })
          this.list.push(value)
        })
      }
      
    }).catch((err)=>{
      console.log(err)
    })
})
   

    
   
    
   
    }
    
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
