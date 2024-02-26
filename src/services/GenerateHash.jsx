import CryptoJS from 'crypto-js';

const PASSWORD = import.meta.env.VITE_API_KEY;
const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
const inputValue = `${PASSWORD}_${timestamp}`;

function GenerateHash() {
  // console.log(`generateHash`);
  return CryptoJS.MD5(inputValue).toString();
}

export default GenerateHash;
