// create request object
var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:3000/links');
xhr.send();
xhr.onreadystatechange = function(){
  if (xhr.readyState === 4){
    console.log(xhr.responseText);
  }
};
console.log('hey');
