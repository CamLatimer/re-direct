var inputUrl  = document.querySelector("[name='input_url']");
var customizr = document.querySelector("[name='customizr']");
var submitBtn = document.getElementById('link-submit');

submitBtn.addEventListener('click', function(e){
  e.preventDefault();
  getLink();
});

function getLink(){
  var request = $.ajax({
    url: '/links',
    type: 'POST',
    data: {
      customizr: customizr.value,
      input_url: inputUrl.value
    },
    dataType: 'json'
  })
  .done(function(data){
    console.log(data);
    inputUrl = '';
    customizr = '';
  })
  .fail(function(reqObj, textStatus) {
    console.log(reqObj.status)
    console.log( "Request failed: " + textStatus );
    inputUrl.value = '';
    customizr.value = '';
  });
}
