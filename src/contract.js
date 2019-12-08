import web3 from './web3';
import {abi} from './compile.js'

const address='0xB948ea8DDb6f3B1Ae59d522cca0330B6755d754e'



export default new web3.eth.Contract(abi,address)