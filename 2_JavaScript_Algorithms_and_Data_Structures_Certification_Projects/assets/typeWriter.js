window.onload=()=>{typeWriter()};

let i = 0;

function typeWriter() {
  if (i < TXT.length) {
    document.getElementById("text").innerHTML += TXT.charAt(i);
    i++;
    setTimeout(typeWriter, 100);
  }
    if( i == TXT.length ) {
    }
}

setInterval(function(){
  let a = document.getElementById('blink').style.opacity || 1;
  document.getElementById('blink').style.opacity = ((parseInt(a))?0:1);
},1000);
