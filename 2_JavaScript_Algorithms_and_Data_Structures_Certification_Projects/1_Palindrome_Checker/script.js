const TXT = "Click the \"Try it\" button to run Palindrome Checker";

const isPalindrome = () => {

  let str = prompt("Please enter the string", "eye");

  document.getElementById("demo")
    .innerHTML = str.replace(/[\W_]/g, '').toLowerCase() === str
      .replace(/[\W_]/g, '')
      .toLowerCase()
      .toString()
      .split('')
      .reverse()
      .join('');

  };
