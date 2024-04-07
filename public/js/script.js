
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
