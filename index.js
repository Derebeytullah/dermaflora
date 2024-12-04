let header = document.getElementById('headercontent');
let footer = document.getElementById('footercontent');

// Header'ı yüklemek için asenkron fonksiyon
const headerfile = () => {
    return fetch('/pages/header.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Header dosyası bulunamadı');
            }
            return response.text();
        })
        .then(html => {
            header.innerHTML = html;
            console.log("Header yüklendi");
        });
};

// Footer'ı yüklemek için asenkron fonksiyon
const footerfile = () => {
    return fetch('/pages/footer.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Footer dosyası bulunamadı');
            }
            return response.text();
        })
        .then(html => {
            footer.innerHTML = html;
            console.log("Footer yüklendi");
        });
};

// Her ikisini de yükleyip, login-area'yı eklemek için tüm işlemi bekleyin
Promise.all([headerfile(), footerfile()])
    .then(() => {
        let loginarea = document.querySelector('.login-area');
        let logininfo = false;
        console.log("Login-area öğesi:", loginarea);

        if (logininfo == false) {
            console.log("Login-area bulundu.");
            loginarea.innerHTML = `
                <li><a class="login-btn" href="">Kayıt Ol <i class="fa-solid fa-user-plus"></i></a></li>
                <li><a class="login-btn" href="/pages/log-in.html">Giriş Yap <i class="fa-solid fa-arrow-right-to-bracket"></i></a></li>
            `;
        }
    })
    .catch(err => {
        console.error('Header veya Footer yüklenirken hata oluştu:', err);
    });
