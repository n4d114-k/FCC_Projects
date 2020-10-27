const TXT = "Click the \"Validate\" button to check number";

const telephoneCheck = () => {

  let str = prompt("Please enter the phone number", "555-555-5555");

  let re = /^([+]?1[\s]?)?((?:[(](?:[2-9]1[02-9]|[2-9][02-8][0-9])[)][\s]?)|(?:(?:[2-9]1[02-9]|[2-9][02-8][0-9])[\s.-]?)){1}([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2}[\s.-]?){1}([0-9]{4}){1}$/;

  document.getElementById("demo")
    .innerHTML = re.test(str);

}
