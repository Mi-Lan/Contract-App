import web3 from './web3';
const {abi}=require('./contracts/author.json');

const address="0x70737A8a04B96379341a65c72690d59502e257A6";


   async function milan(){ 
       await web3.eth.getAccounts()
.then((res)=>{
     web3.eth.defaultAccount =res[0]
    console.log('entered jere')
})
}
milan()


export default new web3.eth.Contract(abi,address);