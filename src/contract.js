import web3 from './web3';
import {abi} from './compile.js';

const address="'0x70737A8a04B96379341a65c72690d59502e257A6'"

export default new web3.eth.Contract(abi,address)