Promise.complete = function(pList) {
  let res = pList.map(p => p.catch(err => err));
  return Promise.all(res);
}

let p1 = Promise.reject('p1 error');

let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p2 success');
  }, 1000);
});

let p3 = Promise.reject('p3 error');


let promiseList = [p1, p2, p3];

Promise.complete(promiseList)
  .then(list => {
    let [r1, r2, r3] = list;
    console.log(list);
  })
  .catch(err => {
    console.log(err);
  });


Promise.all([p1, p2, p3])
  .then(list => {
    console.log(list);
  })
  .catch(err => {
    console.log(err);
  });
