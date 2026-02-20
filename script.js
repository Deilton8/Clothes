// Base de dados global de produtos (Feminino e Masculino)
const allProducts = [
    // 1. Feminino
    { id: 101, gender: 'feminino', category: 'vestidos', name: "Mattea One Shoulder Midi", price: 6999.00, img: "img/mulher/1b.webp", description: "Design feminino encontra estilo em alta. O Vestido Midi Um Ombro Mattea é a peça que seu guarda-roupa estava esperando.", sizes: [8, 10, 12] },
    // 1. Masculino
    { id: 201, gender: 'masculino', category: 'camisas', name: "Oxford Classic Fit White", price: 4500.00, img: "img/homem/m1.webp", description: "O essencial do guarda-roupa masculino. Camisa Oxford com corte clássico e tecido 100% algodão respirável.", sizes: ['S', 'M', 'L', 'XL'] },

    // 2. Feminino
    { id: 102, gender: 'feminino', category: 'vestidos', name: "Addie Pleated Skirt Midi", price: 6999.00, img: "img/mulher/2b.webp", description: "O Vestido Midi Addie com Saia Plissada é a peça que seu guarda-roupa estava esperando.", sizes: [10, 12] },
    // 2. Masculino
    { id: 202, gender: 'masculino', category: 'camisas', name: "Linen Resort Navy", price: 5200.00, img: "img/homem/m2.webp", description: "Perfeita para o clima tropical. Camisa de linho leve com gola resort, ideal para momentos casuais e sofisticados.", sizes: ['M', 'L', 'XL'] },

    // 3. Feminino
    { id: 103, gender: 'feminino', category: 'vestidos', name: "Elena Printed Midi", price: 6999.00, img: "img/mulher/3b.webp", description: "O Vestido Midi Estampado Elena em Florais Chelsea da Forever New.", sizes: [12] },
    // 3. Masculino
    { id: 203, gender: 'masculino', category: 'camisas', name: "Premium Poplin Black", price: 4900.00, img: "img/homem/m3.webp", description: "A camisa preta definitiva. Tecido popeline sedoso ao toque, resistente a rugas e com caimento impecável.", sizes: ['S', 'M', 'L'] },

    // 4. Feminino
    { id: 104, gender: 'feminino', category: 'vestidos', name: "Jemma Shirt Midi Dress", price: 6999.00, img: "img/mulher/4b.webp", description: "O Vestido Camisa Midi Jemma em Porcelana.", sizes: [8, 12] },
    // 4. Masculino
    { id: 204, gender: 'masculino', category: 'calcas', name: "Tailored Chino Khaki", price: 6500.00, img: "img/homem/m4.webp", description: "Calças chino de corte à medida. Conforto moderno com um toque de elastano para mobilidade diária.", sizes: [30, 32, 34, 36] },

    // 5. Feminino
    { id: 105, gender: 'feminino', category: 'blusas', name: "Abbey Printed Blouse", price: 6999.00, img: "img/mulher/5b.webp", description: "Blusa estampada Abbey em Olympia Holiday.", sizes: [8, 10] },
    // 5. Masculino
    { id: 205, gender: 'masculino', category: 'calcas', name: "Smart Trouser Charcoal", price: 7200.00, img: "img/homem/m5.webp", description: "Eleve o seu look de escritório. Calças de alfaiataria em tom carvão, ideais para combinar com camisas claras.", sizes: [32, 34, 36] },

    // 6. Feminino
    { id: 106, gender: 'feminino', category: 'blusas', name: "Arabella Silk Blouse", price: 6999.00, img: "img/mulher/6b.webp", description: "Blusa de seda Arabella, caimento perfeito.", sizes: [10, 12] },
    // 6. Masculino
    { id: 206, gender: 'masculino', category: 'calcas', name: "Everyday Denim Dark Wash", price: 5800.00, img: "img/homem/m6.webp", description: "O jeans perfeito para transitar do dia para a noite. Lavagem escura clássica sem desgastes artificiais.", sizes: [30, 32, 34, 36] },

    // Itens Femininos restantes (pois a lista masculina terminou)
    { id: 107, gender: 'feminino', category: 'blusas', name: "Bianca Printed Linen Midi Dress", price: 6999.00, img: "img/mulher/7b.webp", description: "Vestido midi de linho estampado Bianca.", sizes: [10, 12] },
    { id: 108, gender: 'feminino', category: 'blusas', name: "Pippi Petite V Neck Linen Midi Dress", price: 6999.00, img: "img/mulher/8b.webp", description: "Vestido midi de linho com decote V e corte pequeno.", sizes: [10, 12] },
    { id: 109, gender: 'feminino', category: 'blusas', name: "Fia Printed Shirt Midi Dress", price: 6999.00, img: "img/mulher/9.webp", description: "Vestido camisa midi estampado Fia.", sizes: [10, 12] },
    { id: 110, gender: 'feminino', category: 'blusas', name: "Briana Printed Shirt Dress", price: 6999.00, img: "img/mulher/10b.webp", description: "Vestido camisa estampado Briana.", sizes: [10, 12] },
    { id: 111, gender: 'feminino', category: 'blusas', name: "Esther Embroidered Midi Dress", price: 6999.00, img: "img/mulher/11b.webp", description: "Vestido midi bordado Esther.", sizes: [10, 12] }
];

// Identifica a página actual com base no atributo do body
const pageGender = document.body.getAttribute('data-gender') || 'feminino';

// Alteração: Se estiver na index, permite ver todos os produtos da base global
const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/';
const pageProducts = isHomePage ? allProducts : allProducts.filter(p => p.gender === pageGender);

let cart = JSON.parse(localStorage.getItem('luxe_cart')) || [];
let currentCategory = 'todos';
let currentSort = 'default';
let itemsPerPage = 3;
let visibleItemsCount = 3;
let filteredList = [];
let currentSelectedSize = null;

function filterProducts(category) {
    currentCategory = category;
    visibleItemsCount = itemsPerPage;

    // Seleciona todos os botões de filtro
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(btn => {
        // Remove o estado ativo de todos os botões
        btn.classList.remove('active', 'bg-black', 'text-white');
        btn.classList.add('border-zinc-200'); // Adiciona a borda padrão de volta

        // Verifica se o texto do botão corresponde à categoria (convertendo para minúsculo para comparar)
        // Ou se o botão clicado é o "Todos"
        const btnText = btn.innerText.toLowerCase();

        if (
            (category === 'todos' && btnText === 'todos') ||
            (category === 'feminino' && btnText === 'mulher') ||
            (category === 'masculino' && btnText === 'homem') ||
            (category === btnText)
        ) {
            btn.classList.add('active', 'bg-black', 'text-white');
            btn.classList.remove('border-zinc-200');
        }
    });

    renderSkeletons();
    setTimeout(() => applyFiltersAndSort(), 600);
}

function loadMore() {
    const btn = document.getElementById('btn-load-more');
    btn.innerText = "Carregando...";
    setTimeout(() => {
        visibleItemsCount += itemsPerPage;
        renderProducts();
        btn.innerText = "Carregar Mais";
    }, 800);
}

function sortProducts(type) {
    currentSort = type;
    applyFiltersAndSort();
}

function applyFiltersAndSort() {
    filteredList = [...pageProducts];

    if (currentCategory !== 'todos') {
        filteredList = pageProducts.filter(p =>
            p.category === currentCategory || p.gender === currentCategory
        );
    }

    if (currentSort === 'price-asc') {
        filteredList.sort((a, b) => a.price - b.price);
    } else if (currentSort === 'price-desc') {
        filteredList.sort((a, b) => b.price - a.price);
    }

    renderProducts();
}

function renderProducts() {
    const grid = document.getElementById('product-grid');
    if (!grid) return; // Protecção caso a página não tenha a grelha de produtos

    const itemsToDisplay = filteredList.slice(0, visibleItemsCount);

    grid.innerHTML = itemsToDisplay.map((p, index) => `
        <div class="product-card group reveal" style="transition-delay: ${index * 100}ms">
            <div class="relative overflow-hidden aspect-[4/5] rounded-lg cursor-pointer" onclick="openProductModal(${p.id})">
                <img src="${p.img}" class="w-full h-full object-cover transition duration-700 group-hover:scale-110">
            </div>
            <div class="mt-6 flex justify-between items-start">
                <div>
                    <h4 class="font-bold text-lg uppercase cursor-pointer" onclick="openProductModal(${p.id})">${p.name}</h4>
                    <p class="text-zinc-500 text-sm uppercase tracking-tighter">${p.category}</p>
                </div>
                <span class="font-bold text-lg">MZN ${p.price.toFixed(2)}</span>
            </div>
            <button onclick="openProductModal(${p.id})" class="w-full mt-4 border border-zinc-200 py-3 rounded-lg font-bold uppercase text-xs tracking-widest hover:bg-black hover:text-white transition">Escolher Tamanho</button>
        </div>
    `).join('');

    const btnLoadMore = document.getElementById('pagination-container');
    if (btnLoadMore) {
        if (visibleItemsCount >= filteredList.length) btnLoadMore.style.display = 'none';
        else btnLoadMore.style.display = 'flex';
    }

    lucide.createIcons();
    observeScroll();
}

function openProductModal(id) {
    // Procura em TODOS os produtos, assim garantimos que encontra sempre a referência certa
    const p = allProducts.find(p => p.id === id);
    if (!p) return;

    currentSelectedSize = null;

    document.getElementById('modal-img').src = p.img;
    document.getElementById('modal-title').innerText = p.name;
    document.getElementById('modal-cat').innerText = p.category;
    document.getElementById('modal-desc').innerText = p.description;
    document.getElementById('modal-price').innerText = `MZN ${p.price.toFixed(2)}`;
    document.getElementById('size-error').classList.add('hidden');

    const sizesContainer = document.getElementById('modal-sizes-container');
    sizesContainer.innerHTML = p.sizes.map(size => `
        <button onclick="selectSize(this, '${size}')" class="size-btn">${size}</button>
    `).join('');

    document.getElementById('modal-add-btn').onclick = (e) => { addToCartFromModal(p.id, e); };
    document.getElementById('product-modal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function selectSize(btnElement, size) {
    document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
    btnElement.classList.add('selected');
    currentSelectedSize = size;
}

function closeProductModal() {
    document.getElementById('product-modal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function toggleCart() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    const isOpening = drawer.classList.contains('translate-x-full');

    if (isOpening) {
        overlay.classList.remove('hidden');
        renderCart();
        setTimeout(() => {
            overlay.classList.add('opacity-100');
            drawer.classList.remove('translate-x-full');
        }, 10);
        document.body.style.overflow = 'hidden';
    } else {
        drawer.classList.add('translate-x-full');
        overlay.classList.remove('opacity-100');
        setTimeout(() => overlay.classList.add('hidden'), 400);
        document.body.style.overflow = 'auto';
    }
}

function addToCartFromModal(id, event) {
    if (!currentSelectedSize) {
        const errorMsg = document.getElementById('size-error');
        errorMsg.classList.remove('hidden');
        errorMsg.classList.add('shake');
        setTimeout(() => errorMsg.classList.remove('shake'), 500);
        return;
    }

    // Usamos allProducts para garantir que ele acha a imagem, preço, etc.
    const product = allProducts.find(p => p.id === id);
    const uniqueId = `${product.id}-${currentSelectedSize}`;

    const item = cart.find(i => i.uniqueId === uniqueId);

    if (item) {
        item.quantity++;
    } else {
        cart.push({
            ...product,
            uniqueId: uniqueId,
            size: currentSelectedSize,
            quantity: 1
        });
    }

    saveCart();
    updateUI();
    showToast(`${product.name} (Tam. ${currentSelectedSize})`);
    closeProductModal();
}

function updateQuantity(uniqueId, delta) {
    const item = cart.find(i => i.uniqueId === uniqueId);
    if (item) {
        item.quantity += delta;
        if (item.quantity < 1) cart = cart.filter(i => i.uniqueId !== uniqueId);
        saveCart(); renderCart(); updateUI();
    }
}

function removeFromCart(uniqueId) {
    cart = cart.filter(i => i.uniqueId !== uniqueId);
    saveCart(); renderCart(); updateUI();
}

function saveCart() { localStorage.setItem('luxe_cart', JSON.stringify(cart)); }

function updateUI() {
    document.getElementById('cart-count').innerText = cart.reduce((acc, i) => acc + i.quantity, 0);
}

function renderCart() {
    const container = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="h-full flex flex-col items-center justify-center text-zinc-400">
                <i data-lucide="shopping-cart" class="w-12 h-12 mb-4"></i>
                <p class="uppercase text-xs font-bold tracking-widest">Seu carrinho está vazio</p>
            </div>
        `;
        totalEl.innerText = `MZN 0,00`;
    } else {
        container.innerHTML = cart.map((item, index) => `
            <div class="flex gap-4 items-center cart-item-anim" style="animation-delay: ${index * 0.1}s">
                <img src="${item.img}" class="w-20 h-24 object-cover rounded-md">
                <div class="flex-grow">
                    <h5 class="font-bold uppercase text-sm">${item.name}</h5>
                    <div class="flex items-center gap-2 mb-2">
                        <p class="text-zinc-500 text-xs">MZN ${item.price.toFixed(2)}</p>
                        <span class="text-[10px] font-bold bg-black text-white px-2 py-0.5 rounded-full">TAM ${item.size}</span>
                        <span class="text-[9px] font-bold uppercase tracking-widest text-zinc-400 border border-zinc-200 px-1 rounded">${item.gender === 'masculino' ? 'Homem' : 'Mulher'}</span>
                    </div>
                    <div class="flex items-center gap-4">
                        <div class="flex items-center border border-zinc-200 rounded-full px-3 py-1 gap-4">
                            <button onclick="updateQuantity('${item.uniqueId}', -1)">-</button>
                            <span class="text-xs font-bold">${item.quantity}</span>
                            <button onclick="updateQuantity('${item.uniqueId}', 1)">+</button>
                        </div>
                        <button onclick="removeFromCart('${item.uniqueId}')" class="text-xs underline text-zinc-400 uppercase">Remover</button>
                    </div>
                </div>
            </div>
        `).join('');

        const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        totalEl.innerText = `MZN ${total.toFixed(2)}`;
    }
    lucide.createIcons();
}

function checkoutWhatsApp() {
    if (cart.length === 0) {
        showToast("Seu carrinho está vazio!");
        return;
    }

    const phoneNumber = "258876423131";
    const storeName = "LUXE STUDIO";

    let message = `*Novo Pedido - ${storeName}*\n`;
    message += `--------------------------\n\n`;

    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        const generoTxt = item.gender === 'masculino' ? '[Homem]' : '[Mulher]';
        message += `*${item.quantity}x* ${item.name} ${generoTxt}\n`;
        message += `> Tamanho: ${item.size}\n`;
        message += `> Preço: MZN ${subtotal.toFixed(2)}\n\n`;
    });

    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    message += `--------------------------\n`;
    message += `*Total: MZN ${total.toFixed(2)}*\n\n`;
    message += `_Por favor, confirme a disponibilidade e os detalhes de pagamento._`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
}

function sendContactWhatsApp(event) {
    event.preventDefault();
    const name = document.getElementById('contact-name').value;
    const messageBody = document.getElementById('contact-message').value;
    const phoneNumber = "258876423131";

    let fullMessage = `*Novo Contacto via Site - LUXE*\n`;
    fullMessage += `--------------------------\n`;
    fullMessage += `*Nome:* ${name}\n`;
    fullMessage += `*Mensagem:* ${messageBody}\n`;
    fullMessage += `--------------------------`;

    const encodedMessage = encodeURIComponent(fullMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}

function observeScroll() {
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) e.target.classList.add('active');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal:not(.active)').forEach(el => obs.observe(el));
}

function handleTilt(e, container) {
    const img = container.querySelector('.tilt-image');
    if (!img) return;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = (rect.height / 2 - y) / 15;
    const rotateY = (x - rect.width / 2) / 15;
    img.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
}

function resetTilt(container) {
    const img = container.querySelector('.tilt-image');
    if (img) img.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
}

function initCarousel() {
    const items = document.querySelectorAll('.carousel-item');
    if (items.length === 0) return;
    let currentIndex = 0;
    setInterval(() => {
        items[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % items.length;
        items[currentIndex].classList.add('active');
    }, 4000);
}

window.onload = () => {
    // Limpeza por segurança caso haja lixo de versões antigas no LocalStorage
    if (cart.length > 0 && !cart[0].uniqueId) {
        cart = [];
        localStorage.removeItem('luxe_cart');
    }

    // Inicia a grelha de produtos caso estejamos na secção de produtos
    if (document.getElementById('product-grid')) {
        filterProducts('todos');
    }

    updateUI();
    initCarousel();
};

document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !document.getElementById('product-modal').classList.contains('hidden')) closeProductModal(); });

function renderSkeletons() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    const skeletonCard = `
        <div class="product-card group">
            <div class="aspect-[4/5] rounded-lg skeleton mb-6"></div>
            <div class="space-y-3">
                <div class="h-4 w-3/4 skeleton rounded"></div>
                <div class="h-4 w-1/4 skeleton rounded"></div>
            </div>
            <div class="h-12 w-full mt-4 skeleton rounded-lg"></div>
        </div>
    `;
    grid.innerHTML = skeletonCard.repeat(3);
}

function showToast(text) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast-card';
    toast.innerHTML = `<i data-lucide="check-circle" class="w-4 h-4"></i><span>${text} adicionado</span>`;
    container.appendChild(toast);
    lucide.createIcons();
    setTimeout(() => {
        toast.classList.add('toast-exit');
        toast.addEventListener('animationend', () => toast.remove());
    }, 3000);
}

const legalText = {
    privacy: {
        title: "Política de Privacidade",
        content: `
            <p><strong>1. Recolha de Dados:</strong> Recolhemos apenas informações necessárias para processar os seus pedidos, como nome, contacto e endereço.</p>
            <p><strong>2. Uso de Informações:</strong> Os seus dados são utilizados exclusivamente para a logística de entrega e comunicações sobre o seu pedido via WhatsApp.</p>
            <p><strong>3. Segurança:</strong> Implementamos medidas de segurança para proteger as suas informações contra acesso não autorizado.</p>
            <p><strong>4. Partilha:</strong> Não vendemos ou partilhamos os seus dados pessoais com terceiros para fins de marketing.</p>
        `
    },
    terms: {
        title: "Termos de Uso",
        content: `
            <p><strong>1. Pedidos:</strong> Ao finalizar um pedido via WhatsApp, a disponibilidade do stock será confirmada pela nossa equipa.</p>
            <p><strong>2. Pagamentos:</strong> Aceitamos pagamentos via M-Pesa, eMola ou transferência bancária conforme acordado no acto da compra.</p>
            <p><strong>3. Devoluções:</strong> Trocas são aceites num prazo de 48h após a recepção, desde que a peça mantenha a etiqueta original e não apresente sinais de uso.</p>
            <p><strong>4. Envio:</strong> O prazo de entrega varia conforme a localização, sendo processado após a confirmação do pagamento.</p>
        `
    }
};

function openModal(type) {
    const modal = document.getElementById('legal-modal');
    const title = document.getElementById('legal-title');
    const content = document.getElementById('legal-content');

    title.innerText = legalText[type].title;
    content.innerHTML = legalText[type].content;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeLegalModal() {
    document.getElementById('legal-modal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const icon = document.getElementById('menu-icon');
    const isClosed = menu.classList.contains('-translate-y-full');

    if (isClosed) {
        menu.classList.remove('-translate-y-full', 'opacity-0');
        document.body.style.overflow = 'hidden';
        icon.style.transform = 'rotate(90deg)';
    } else {
        menu.classList.add('-translate-y-full', 'opacity-0');
        document.body.style.overflow = 'auto';
        icon.style.transform = 'rotate(0deg)';
    }
}