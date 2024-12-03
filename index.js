let header = document.getElementById('headercontent');
let footer = document.getElementById('footercontent');





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

document.addEventListener('DOMContentLoaded', function() {
    let loginarea = document.querySelector('.login-area');
    console.log(loginarea);
    let logininfo = false;
    if (loginarea) {
        console.log(logininfo);
        loginarea.innerHTML = 
        `
        <li><a class="login-btn" href="">Kayıt Ol <i class="fa-solid fa-user-plus"></i></a></li>
        <li><a class="login-btn" href="/pages/log-in.html">Giriş Yap <i class="fa-solid fa-arrow-right-to-bracket"></i></a></li>
        `;
    }
});
