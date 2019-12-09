import web3 from './web3';
const {abi}=require('./contracts/Author.json');

const address="0x3eCa84aC704F61AfC50a3d2af3abE4CDa5FFe952";


   async function milan(){ 
       await web3.eth.getAccounts()
.then((res)=>{
     web3.eth.defaultAccount =res[0]
    console.log('entered jere')
})
}
milan()


export default new web3.eth.Contract(abi,address);