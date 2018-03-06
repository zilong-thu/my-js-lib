/**
 * 中国个税计算算法
 * 算法参考：http://www.gerensuodeshui.cn/
 */

function taxCalculator(options = {
  base: 3500,
  income: 10000,
  profit: 0,
  desc: '',
}) {
  const base = options.base || 3500;
  console.log(`---------${options.desc || ''}---------\n个税起征点: `, base);

  const income = options.income || 10000;
  console.log('税前收入: ', income);

  const profit = options.profit || Math.round(income * 0.202);
  console.log('五险一金缴纳额: ', profit);

  const income_after_profit = Math.round(income - profit);
  let income_for_tax = income_after_profit - base;
  if (income_for_tax < 0) {
    income_for_tax = 0;
  }
  console.log('应纳税所得额: ', income_for_tax);

  // 应纳税所得额(不含税)表
  const list = [1455, 4155, 7755, 27255, 41255, 57505, 1000000000000];
  // 税率表
  const rate = [0.03, 0.1, 0.20, 0.25, 0.3, 0.35, 0.45];
  // 速算扣除数表
  const minus = [0, 105, 555, 1005, 2775, 5505, 13505];

  let index = list.findIndex((item, i) => {
    return (item > income_for_tax) && (list[i - 1] < income_for_tax);
  });

  let tax = 0;
  if (income_for_tax) {
    tax = Math.round(income_for_tax * rate[index] - minus[index]);
  }
  console.log('纳税额: ', tax);

  const real_income = income_after_profit - tax;
  console.log('税后收入: ', real_income, '\n------------------\n');

  return {income, real_income};
}

const arr = [];
for (var i = 10000; i < 100000; i += 1000) {
  arr.push(i);
}

taxCalculator({base: 3500, income: 9000, desc: '现行税率'});
taxCalculator({base: 8000, income: 9000, desc: '全国工商联提案'});
taxCalculator({base: 10000, income: 9000, desc: '董明珠的提案'});
