function getFriendlyNumbers(start, end) {

    if (!Number.isInteger(start) || start < 0 ||
        !Number.isInteger(end) || end < 0 || start > end) return false;

    let amicableNumbers = [];

    let sumOfDevisors = n => {
        let sum = 0, max = Math.sqrt(n);

        for (let i = 1; i <= max; i++) {
            if (n % i == 0) {
                let d = n / i;
                (d != i) ? sum += i + d : sum += i;
            }
        }

        sum -= n;

        return sum;
    };
 
    for (let i = start; i <= end; i++) {
        let sum1 = sumOfDevisors(i),
            sum2 = sumOfDevisors(sum1);

        if (sum2 == i && sum1 > i && sum1 <= end) amicableNumbers.push([i, sum1]);
    }

    return amicableNumbers;
}

// node ../natalia.kovalyova/exam1/index.js

let start = new Date().getTime();
console.log(getFriendlyNumbers(1000, 100000));
let time = new Date().getTime() - start;
console.log('time : ' + time / 1000 + 's');


module.exports = {
    firstName: 'Natalia',
    secondName: 'Kovalyova',
    task: getFriendlyNumbers
}