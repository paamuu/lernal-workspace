import * as vm from 'vm';

console.log('abc');
const script = new vm.Script(`function add(a,b){console.log(a);return a+b;}`);
script.runInThisContext();
//core 执行代码
