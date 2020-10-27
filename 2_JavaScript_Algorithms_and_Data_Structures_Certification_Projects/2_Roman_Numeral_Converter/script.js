const TXT = "Click the \"Run\" button to convert";

const convertToRoman = ()  => {

  let num = parseInt(prompt("Please enter the number", "25"));

  let digits = String(+num).split(""),
    key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
    "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
    "","I","II","III","IV","V","VI","VII","VIII","IX"],
    roman_num = "",
    i = 3;
    while (i--)
    roman_num = (key[+digits.pop() + (i * 10)] || "") + roman_num;
    document.getElementById("demo")
        .innerHTML = Array(+digits.join("") + 1).join("M") + roman_num;

  }
