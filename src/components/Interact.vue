<template>
  <div class='container'>
    Interact
    <a href='https://rinkeby.etherscan.io/address/0x3eCa84aC704F61AfC50a3d2af3abE4CDa5FFe952'><div >Contract address :0x70737A8a04B96379341a65c72690d59502e257A6</div></a>
    
      <hr>
    
    <owner></owner>

    <div class='row mb-4'>
        <div class='col'>

          <avaliable></avaliable>

        </div>
        <div class="col">

          <buy></buy>

        </div>
    </div>

      <div>Song list:</div>
          <ul v-for="(item,index) in list" class="list-group" :key=index>
              <li class="list-group-item">{{item}}: {{priceList[index]}} wei</li>
          </ul>
      </div>
   
</template>

<script>

//components
import avaliable from './functions/avaliability'
import buy from './functions/buy'
import owner from './functions/claimOwnership'



export default {
  data:function(){
    return{
      
      list:[],
      priceList:[]
    }
  },
  components:{
    avaliable,
    buy,
    owner

  },
  
  

   mounted: function mounted(){
     
    this.$store.dispatch('listenerCount')
    

    this.list=this.$store.state.list
    this.priceList=this.$store.state.priceList
    }
    
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
