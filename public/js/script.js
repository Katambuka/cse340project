
//lazy loading images
function lazyLoadImages() {
  const images = document.querySelectorAll("img[data-src]");
  images.forEach((img) => {
    img.setAttribute("src", img.getAttribute("data-src"));
    img.onload = () => {
      img.removeAttribute("data-src");
    };
  });
}

function validateForm() {
  var password = document.getElementById("password").value;
  var passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
  if (!passwordPattern.test(password)) {
    alert("Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.");
    return false;
  }
  return true;
}


