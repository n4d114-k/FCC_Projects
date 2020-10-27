const TXT = "Click the \"Run\" button to encode";

const rot13 = () => {

    let str = prompt("Please enter the string in uppercase", "HELLO");

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    document.getElementById("demo")
      .innerHTML = str
      .split('')
      .map(char => {
        const pos = alphabet.indexOf(char);
        return pos >= 0 ? alphabet[(pos + 13) % 26] : char;
      })
      .join('');
}
