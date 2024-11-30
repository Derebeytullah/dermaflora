let listPageHTML = document.querySelector('.page-wrapper');
let body = document.querySelector('body');
let listCartHTML = document.querySelector('.listCart');
let iconCartSpan = document.querySelector('.icon-cart span');
let productspage = [];
let cart = [];


function showcart(){
    body.classList.toggle('showcart');
}

function odemealert(){
    localStorage.setItem('cart','');
    cart = [];
    document.querySelector('.listCart').innerHTML=null;
    alert('Ödemeniz Yapıldı!');
}

const addPageToHTML = () => {
    listPageHTML.innerHTML = ''; // Önceki içerikleri temizle

    // Örneğin, sadece ID'si 2 olan ürünü ekleyelim
    const filteredProducts = productspage.filter(product => product.id === 7);
    
    if(filteredProducts.length > 0) { // Eğer veri varsa
        filteredProducts.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.dataset.id = product.id;
            newProduct.classList.add('item');
            newProduct.innerHTML = 
            `
            <h2>${product.category}</h2>
            <div class="image">
                <img src="${product.image}" alt="${product.name}">
                <div>   
                    <p>${product.description}</p>
                    <div class="category">${product.name}</div>
                    <div class="price">
                        <div>₺${product.price}</div>
                        <button class="addCart"><i class="fas fa-shopping-basket"></i>Sepete Ekle</button>
                    </div>
                </div>
            </div>
            <h2>Benzer Ürünler</h2>
            `;
            listPageHTML.appendChild(newProduct);
        });
    }

    const filteredlist = productspage.filter(product => product.category === 'Product-b')
    
    let newlist = document.createElement('section')
    newlist.classList.add('list');
    
    listPageHTML.appendChild(newlist)
    if (filteredlist.length > 0){
        filteredlist.forEach(product => {
            
            let listitem = document.createElement('div');
            listitem.classList.add('listİtem');
            listitem.innerHTML = 
            `
            <h2>${product.name}</h2>
            <img src="${product.image}" alt="${product.name}">
            <button><a href="${product.link}">İncele<i class="fa-solid fa-arrow-right"></i></a></button>
            `;
            
            newlist.appendChild(listitem);
        })
    }
}

listPageHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('addCart') || positionClick.closest('.addCart').querySelector('.addCart')) {
        let id_product = positionClick.closest('.item').dataset.id;
        addToCart(id_product);
    }
})
const addToCart = (product_id) => {
let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
if(cart.length <= 0){
    cart = [{
        product_id: product_id,
        quantity: 1
    }];
}else if(positionThisProductInCart < 0){
    cart.push({
        product_id: product_id,
        quantity: 1
    });
}else{
    cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
}
addCartToHTML();
addCartToMemory();
}
const addCartToMemory = () => {
localStorage.setItem('cart', JSON.stringify(cart));
}
const addCartToHTML = () => {
listCartHTML.innerHTML = '';
let totalQuantity = 0;
if(cart.length > 0){
    cart.forEach(item => {
        totalQuantity = totalQuantity +  item.quantity;
        let newItem = document.createElement('div');
        newItem.classList.add('item');
        newItem.dataset.id = item.product_id;

        let positionProduct = productspage.findIndex((value) => value.id == item.product_id);
        let info = productspage[positionProduct];
        listCartHTML.appendChild(newItem);
        newItem.innerHTML = `
        <div class="image">
                <img src="${info.image}">
            </div>
            <div class="name">
            ${info.name}
            </div>
            <div class="totalPrice">₺${info.price * item.quantity}</div>
            <div class="quantity">
                <span class="minus"><</span>
                <span>${item.quantity}</span>
                <span class="plus">></span>
            </div>`;
    })
}
}

listCartHTML.addEventListener('click', (event) => {
let positionClick = event.target;
if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
    let product_id = positionClick.parentElement.parentElement.dataset.id;
    let type = 'minus';
    if(positionClick.classList.contains('plus')){
        type = 'plus';
    }
    changeQuantityCart(product_id, type);
}
})
const changeQuantityCart = (product_id, type) => {
let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
if(positionItemInCart >= 0){
    let info = cart[positionItemInCart];
    switch (type) {
        case 'plus':
            cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
            break;
    
        default:
            let changeQuantity = cart[positionItemInCart].quantity - 1;
            if (changeQuantity > 0) {
                cart[positionItemInCart].quantity = changeQuantity;
            }else{
                cart.splice(positionItemInCart, 1);
            }
            break;
    }
}
addCartToHTML();
addCartToMemory();
}

const initApppage = () => {
    // get data product
    fetch('/product-pages/products.json')
    .then(response => response.json())
    .then(data => {
        productspage = data;
        addPageToHTML();
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        }
    })
    
}
initApppage();
