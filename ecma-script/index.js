console.log('----------------------------');

Promise.resolve().then(()=> console.log(0))


new Promise(resolve => {
    console.log(1);
    resolve(3);
    Promise.resolve(4).then((val)=> console.log(val));
}).then(num => {
    console.log('num: ', num)
});
console.log(2);
