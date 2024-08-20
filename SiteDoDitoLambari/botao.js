// Array para armazenar os itens do carrinho
let cart = [];

// Função para adicionar itens ao carrinho
function addToCart(name, price) {
    // Verifica se o item já está no carrinho
    let existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    updateCartDisplay();
}

// Função para atualizar a exibição do carrinho
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    // Limpa os itens anteriores
    cartItemsContainer.innerHTML = '';

    // Variável para armazenar o preço total
    let totalPrice = 0;

    // Adiciona cada item do carrinho ao elemento de exibição
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} x${item.quantity} - R$ ${(item.price * item.quantity).toFixed(2)}`;
        cartItemsContainer.appendChild(listItem);

        // Calcula o preço total
        totalPrice += item.price * item.quantity;
    });

    // Atualiza o preço total
    totalPriceElement.textContent = `Total: R$ ${totalPrice.toFixed(2)}`;

    // Armazena o valor total no localStorage
    localStorage.setItem('totalPrice', totalPrice.toFixed(2));
}

// Adiciona um evento de clique ao botão de "Finalizar Pedido"
document.getElementById('checkout').addEventListener('click', () => {
    if (cart.length > 0) {
        window.location.href = 'pedido.html';
    } else {
        alert('O carrinho está vazio!');
    }
});


// Adiciona um evento de clique a todos os botões de "Adicionar ao Carrinho"
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        const name = this.getAttribute('data-name');
        const price = parseFloat(this.getAttribute('data-price'));
        addToCart(name, price); // Adiciona o item ao carrinho
    });
});

// Função para limpar o carrinho
document.getElementById("clear-cart").addEventListener("click", function() {
    // Limpa o array do carrinho
    cart = [];

    // Limpa a exibição dos itens no carrinho
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    // Zera o valor total
    document.getElementById("total-price").textContent = `Total: R$ 0.00`;

    // Remove o valor total do localStorage (opcional)
    localStorage.removeItem('totalPrice');
});



// Navegação com seta
document.querySelector('.left-nav').addEventListener('click', function() {
    document.querySelector('.pratos').scrollBy({
        left: -250,
        behavior: 'smooth'
    });
});

document.querySelector('.right-nav').addEventListener('click', function() {
    document.querySelector('.pratos').scrollBy({
        left: 250,
        behavior: 'smooth'
    });
});