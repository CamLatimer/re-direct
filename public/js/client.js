// create request object
var xhr = new XMLHttpRequest();

function getLink(){
    xhr.open('GET', '/links');
    xhr.send();
    xhr.onreadystatechange = function(){
      if (xhr.readyState === 4){
        console.log(xhr.responseText);
      }
    };
}
