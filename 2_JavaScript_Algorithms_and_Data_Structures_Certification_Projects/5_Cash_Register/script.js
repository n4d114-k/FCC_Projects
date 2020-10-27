const TXT = "Click the \"Try it\" button to run Cash Register";

let denom = [
  { name: "ONE HUNDRED", val: 100.0 },
  { name: "TWENTY", val: 20.0 },
  { name: "TEN", val: 10.0 },
  { name: "FIVE", val: 5.0 },
  { name: "ONE", val: 1.0 },
  { name: "QUARTER", val: 0.25 },
  { name: "DIME", val: 0.1 },
  { name: "NICKEL", val: 0.05 },
  { name: "PENNY", val: 0.01 }
];

function checkCashRegister() {

  let price = parseInt(prompt("Please enter the price", 19.5));
  let cash = parseInt(prompt("Please enter cash amount", 20));

  let penny = parseInt(prompt('Enter available amount of pennies', 1.01));
  let nickel = parseInt(prompt('Enter available amount of nickels', 2.05));
  let dime = parseInt(prompt('Enter available amount of dimes', 3.1));
  let quarter = parseInt(prompt('Enter available amount of qurters', 4.25));
  let one = parseInt(prompt('Enter available amount of ones', 90));
  let five = parseInt(prompt('Enter available amount of fives', 55));
  let ten = parseInt(prompt('Enter available amount of tens', 20));
  let twenty = parseInt(prompt('Enter available amount of twenties', 60));
  let oneHundred = parseInt(prompt('Enter available amount of hundreds', 100));

  let cid = Array.from([
    ["PENNY", penny], ["NICKEL", nickel],
    ["DIME", dime], ["QUARTER",quarter],
    ["ONE", one], ["FIVE", five],
    ["TEN", ten], ["TWENTY", twenty],
    ["ONE HUNDRED", oneHundred]]);


  let output = { status: null, change: [] };
  let change = cash - price;


  let register = cid.reduce(
    function(acc, curr) {
      acc.total += curr[1];
      acc[curr[0]] = curr[1];
      return acc;
   },
    { total: 0 }
  );

  if (register.total === change) {
    output.status = "CLOSED";
    output.change = cid;
    document.getElementById("demo")
      .innerHTML = JSON.stringify(output);
  }

  if (register.total < change) {
    output.status = "INSUFFICIENT_FUNDS";
    document.getElementById("demo")
      .innerHTML = JSON.stringify(output);
  }

  const change_arr = denom.reduce(function(acc, curr) {
    let value = 0;

    while (register[curr.name] > 0 && change >= curr.val) {
      change -= curr.val;
      register[curr.name] -= curr.val;
      value += curr.val;

      change = Math.round(change * 100) / 100;
    }

    if (value > 0) {
      acc.push([curr.name, value]);
    }
    return acc;
  }, []);

  if (change_arr.length < 1 || change > 0) {
    output.status = "INSUFFICIENT_FUNDS";
    document.getElementById("demo")
      .innerHTML = JSON.stringify(output);
  }

  output.status = "OPEN";
  output.change = change_arr;
  document.getElementById("demo")
    .innerHTML = JSON.stringify(output);
}
