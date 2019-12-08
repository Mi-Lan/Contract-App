import Web3 from 'web3';

/*if(window.ethereum){
    window.web3=new Web3(ethereum);
    try{
        await ethereum.enable();
    }
    catch(error){
        console.log(error)
    }
}else if(window.web3){
    window.web3=new Web3(web3.currentProvider)
}*/
const web3=new Web3(window.ethereum);
async ()=>{
   await window.ethereum.enable()
}




export default web3;