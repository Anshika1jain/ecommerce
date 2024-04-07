
document.addEventListener("DOMContentLoaded", function() {
    let iconCart = document.querySelector('.icon-cart');
    let closeCart = document.querySelector('.close');
    let body = document.querySelector('body'); // Corrected the selector for body
    let listProductHTML = document.querySelector('.listProduct');
    let listCartHTML = document.querySelector('.listCart');
    let iconCartSpan = document.querySelector('.icon-cart span');

    let listProducts=[];
    let carts = [];

    iconCart.addEventListener('click', ()=> {
        body.classList.toggle('showCart')
    })

    closeCart.addEventListener('click', ()=> {
        body.classList.toggle('showCart')
    })

    const addDataToHTML = ()=>{
        listProductHTML.innerHTML='';
        if(listProducts.length > 0){
            listProducts.forEach(product =>{
                let newProduct = document.createElement('div');
                newProduct.classList.add('item');
                newProduct.dataset.id = product.id;
                newProduct.innerHTML =`
                    <img src="${product.image}" alt="">
                    <h2>${product.name}</h2>
                    <div class="price">Rs. ${product.price}</div>
                    <button class="addCart">ADD TO CART </button>`;
                listProductHTML.appendChild(newProduct); // Ensure listProductHTML is correctly referencing the desired element
                
            })}
    }
    listProductHTML.addEventListener('click' , (event)=>{
        let positionClick = event.target;
        if(positionClick.classList.contains('addCart')){
            let product_id = positionClick.parentElement.dataset.id;
            addToCart(product_id);
        }

    })
    const addToCart = (product_id)=>{
        let positionThisProductInCart = carts.findIndex((value)=> value.product_id== product_id);
        
        
        if(carts.length <= 0){
            carts =[{
                product_id: product_id,
                quantity :1
            }]
        }else if(positionThisProductInCart < 0) {
            carts.push({
                product_id: product_id,
                quantity: 1
            });
        }else{
            carts[positionThisProductInCart].quantity =carts[positionThisProductInCart].quantity + 1 ;
        }

        addCartToHTML();

    }
    const addCartToHTML = ()=>{
        listCartHTML.innerHTML='';
        let totalQuality = 0;
        if(carts.length > 0){
            carts.forEach(cart =>{
                totalQuality = totalQuality + cart.quantity;
                let newCart = document.createElement('div');
                newCart.classList.add('item');
                let positionProduct = listProducts.findIndex((value)=> value.id == cart.product_id);
                let info = listProducts[positionProduct];
                newCart.innerHTML=`
                <div class="item">
                <div class="image">
                    <img src="${info.image}" alt="" class="src">
                </div>
                <div class="name">
                ${info.name}
                </div>
                <div class="${info.price * cart.quantity}">Rs.242</div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span ${cart.quantity}>1</span>
                    <span class="plus">></span>
                </div>
            </div>
                `;
                listCartHTML.appendChild(newCart);
            })
        }
        iconCartSpan.innerText = totalQuality;

    }

    const initApp =()=>{
        fetch('products.json')
        .then(response => response.json())
        .then(data => {
            listProducts = data;
            addDataToHTML(); // Call addDataToHTML after fetching the data
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }
    initApp();
});

