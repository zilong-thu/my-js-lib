var timing = performance.timing;
console.log(timing);
var timeArr = [];
for (var key in timing) {
  if (Number(timing[key])) {
    timeArr.push({
      value: timing[key],
      name: key,
    });
  }
}

timeArr.sort((a, b) => {
  return a.value - b.value;
});

var range = [];
timeArr.forEach((item, index) => {
  if (index < timeArr.length -2) {
    range.push(timeArr[index+1].name + ' => ' + (timeArr[index+1].value - item.value));
  }
});
console.log(timeArr);
console.log(range);