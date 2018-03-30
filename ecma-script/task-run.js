function run(taskGenerator) {
  let task = taskGenerator();

  let res = task.next();

  (function step() {
    if (!res.done) {
      console.log('using step...');
      let promise = Promise.resolve(res.value);
      promise.then(val => {
        res = task.next(val);
        step();
      }).catch(err => {
        res = task.throw(err);
        step();
      });
    }
  })();
}


function timer() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1);
    }, 1000);
  });
}

run(function *() {
  let a = yield timer();
  console.log(a);
});
