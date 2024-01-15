let nameError = document.getElementById("error-name");
let emailError = document.getElementById("error-email");
let passwordError = document.getElementById("error-password");

function validateName() {
  var name = document.getElementById("name").value;
  if (name.trim().length === 0) {
    nameError.innerHTML = '<span style="color: red;">Name is required</span>';
    console.log('Name reqy')
    return false;
  } else {
    nameError.innerHTML = '<span style="color: green;">Valid</span>';
    return true;
  }
}

function validateEmail() {
  let email = document.getElementById("email").value;
  let mailFormat = /\S+@\S+\.\S+/;
  if (email.match(mailFormat)) {
    emailError.innerHTML = '<span style="color: green;">Valid</span>';
    return true;
  } else {
    emailError.innerHTML = '<span style="color: red;">Invalid Email</span>';
    return false;
  }
}

function validatePassword() {
  let password = document.getElementById("password").value;
  if (password.length <= 5) {
    passwordError.innerHTML =
      '<span style="color: red;">Enter more than 5 charecter</span>';
    return false;
  } else {
    passwordError.innerHTML = '<span style="color: green;">Valid</span>';
    return true;
  }
}
