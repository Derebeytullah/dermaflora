let header = document.getElementById('headercontent');
let footer = document.getElementById('footercontent');
let cartmenu = document.getElementById('cart-menu');

const headerfile = () => {
    fetch('/pages/header.html')
    .then(response => response.text())
    .then(html =>{
        header.innerHTML = html;
    })
}
headerfile();

const footerfile = () => {
    fetch('/pages/footer.html')
    .then(response => response.text())
    .then(html =>{
        footer.innerHTML = html;
    })
}
footerfile();