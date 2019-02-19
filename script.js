var checkboxesChecked = []; // можно в массиве их хранить, если нужно использовать
// регистрация события загрузки документа.
if (window.addEventListener) window.addEventListener('load', init, false);

// установка обработчиков для форм и элементов форм.
function init() {
    validateTheme();
    for (var i = 0; i < document.forms.length; i++) {
        var form = document.forms[i];

        var formValidation = false;

        for (var j = 0; j < form.elements.length; j++) {
            var e = form.elements[j];
            if (e.type == 'select-one') {
                e.onchange = validateTheme;
            }
            if (e.type == 'radio') {
                e.onchange = validateSize;
                // e.onchange = validatePrice;
            }
            if(e.type == 'checkbox'){
              e.onchange = validateIngredients;
              // e.onchange = validatePrice;
            }

            // проверка имеются ли атрибуты требующие проверки.
            var pattern = e.getAttribute('data-val');

            if (pattern) {
                e.onchange = validateInput; // обработчик на изменение.
                formValidation = true; // форма требует проверку.
            }
        }
        if (formValidation) {
            form.onsubmit = validateForm; // установка обработчика для формы на submit
        }
    }
}

function validateSize(){
  var size = this.value;
  var images = document.getElementsByTagName('img');
  if(size == 'big'){
    for (var i = 0;i <images.length; i++){
      images[i].width = 500;
      images[i].height = 500;
    }
  }
  if(size == 'middle'){
    for (var i = 0;i <images.length; i++){
      images[i].width = 400;
      images[i].height = 400;
    }
  }
  if(size == 'small'){
    for (var i = 0;i <images.length; i++){
      images[i].width = 300;
      images[i].height = 300;
    }
  }
}

function validateIngredients(){
  var checkboxes = document.getElementsByClassName('checkbox');
  for (var index = 0; index < checkboxes.length; index++) {
    if (checkboxes[index].checked) {
       checkboxesChecked.push(checkboxes[index].value); // положим в массив выбранный
       var img = document.getElementById(checkboxes[index].value); // делайте что нужно - это для наглядности
       img.style.visibility = 'visible';
    }
    else{
      var img = document.getElementById(checkboxes[index].value); // делайте что нужно - это для наглядности
      img.style.visibility = 'hidden';
    }
 }
 return checkboxesChecked; // для использования в нужном месте
}

// обработчик на изменение содержимого полей ввода.
function validateInput() {
    var pattern = this.dataset.val,
        msg = this.dataset.valMsg,
        msgId = this.dataset.valMsgId,
        value = this.value;

    var res = value.search(pattern);
    if (res == -1) {
        document.getElementById(msgId).innerHTML = msg;
        this.className = 'error';
    }
    else {
        document.getElementById(msgId).innerHTML = '';
        this.className = 'valid';
    }
}

// function for form submitting
function validateForm() {

    var invalid = false;

    for (var i = 0; i < this.elements.length; ++i) {
        var e = this.elements[i];
        if (e.type =='text' && e.onchange != null) {
            e.onchange();
            if (e.className == 'error') invalid = true;
        }
    }

    if (invalid) {
        alert('There were errors in form. Please, do it again.');
        return false;
    }
}
//function for validating price
// function validatePrice(){
//   var price = 0.00;
//   for (var index = 0; index < checkboxesChecked.length; index++) {
//       price += parseInt(document.getElementById(checkboxes[index].value).dataset.valPrice);
//   }
//   document.getElementById('price').innerHTML = '$' + price;
// }

//function for choosing theme
function validateTheme(){
  if (window.localStorage.pageColor) {
      document.body.style.backgroundColor = window.localStorage.pageColor;
  }

  document.getElementById('saveButton').addEventListener("click", function () {
      var selectedTheme = getCheckedSelect('theme');
      console.log(selectedTheme);
      window.localStorage.theme = selectedTheme;
      document.body.className = selectedTheme;
  });

  function getCheckedSelect(name) {
      var elements = document.getElementsByName(name);

      for (var i = 0, len = elements.length; i < len; ++i)
          if (elements[i].selected) return elements[i].value;
        }
}
