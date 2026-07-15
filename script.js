// Navigation Logic with Animation Support
function showSection(id) {
    const sections = ['home', 'menu', 'items-display', 'order', 'delivery', 'contact'];
    sections.forEach(s => {
        const el = document.getElementById(s);
        if(el) {
            el.style.display = (s === id) ? 'block' : 'none';
            if (s === id) {
                el.classList.add('section-visible');
            } else {
                el.classList.remove('section-visible');
            }
        }
    });
    window.scrollTo(0, 0);
}

// Menu Data (Aapka Original Data)
const menuData = {
    "Chocolate ": [
        { name: "Chocolate Fudge Cake ", price: 1800, img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400" },
        { name: "Chocolate Lava Cake ", price: 1500, img: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400" },
        { name: "Chocolate Truffle Cake ", price: 2000, img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400" }
    ],
    "Strawberry ": [
        { name: "Strawberry Cream Cake ", price: 1700, img: "https://images.unsplash.com/photo-1464347744102-11db6282f854?w=400" },
        { name: "Strawberry Cheesecake ", price: 2200, img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400" },
        { name: "Strawberry Delight Cake ", price: 1800, img: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400" }
    ],
    "Birthday ": [
        { name: "Classic Birthday Cake ", price: 1600, img: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=400" },
        { name: "Customized Name Cake ", price: 2000, img: "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=400" },
        { name: "Photo Cake ", price: 2500, img: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400" }
    ],
    "Cupcake ": [
        { name: "Chocolate Cupcake (Soft & Rich) ", price: 250, img: "https://images.unsplash.com/photo-1519869325930-281384150729?w=400" },
        { name: "Vanilla Bean Cupcake ", price: 220, img: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=400" },
        { name: "Red Velvet Cupcake ", price: 280, img: "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?w=400" }
    ]
};

let cart = [];
let tempOrderPayload = null;
document.addEventListener('DOMContentLoaded', updateCartUI);

// ✅ Render Varieties with Luxury Design
function renderVarieties(cat) {
    showSection('items-display');
    const grid = document.getElementById('product-list-grid');
    document.getElementById('cat-title').innerText = cat.trim() + " Collections";
    grid.innerHTML = '';
    
    if (menuData[cat]) {
        menuData[cat].forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'cat-card reveal-anim';
            card.style.animationDelay = (index * 0.1) + 's'; 
            
            card.innerHTML = `
                <img src="${item.img}" alt="${item.name}">
                <div class="card-overlay">
                    <h3>${item.name}</h3>
                    <p class="item-price">Rs. ${item.price}</p>
                    <button class="order-btn-sm" onclick="handleAddToCartClick(event, '${item.name}', ${item.price})">Add to Cart</button>
                </div>`;
            grid.appendChild(card);
        });
    }
}

// ✅ Button Flash Logic with New Theme Colors
function handleAddToCartClick(event, name, price) {
    const btn = event.currentTarget;
    // Button Flash effect with burgundy
    btn.style.background = 'linear-gradient(135deg, #4a1428, #6b1e3f)';
    setTimeout(() => { 
        btn.style.background = 'linear-gradient(135deg, #6b1e3f, #4a1428)';
    }, 200);
    // Call your original flying animation
    addToCartAnimation(event, name, price);
}

// ✅ YOUR ORIGINAL FLYING ANIMATION (UNCHANGED)
function addToCartAnimation(event, name, price) {
    const basket = document.querySelector('.cart-basket');
    const btn = event.currentTarget;
    const flyer = document.createElement('div');
     flyer.className = 'flying-item';
    
    const rect = btn.getBoundingClientRect();
    flyer.style.left = rect.left + 'px';
    flyer.style.top = rect.top + 'px';
    document.body.appendChild(flyer);
    
    const basketRect = basket.getBoundingClientRect();
    setTimeout(() => {
        flyer.style.left = (basketRect.left + 15) + 'px';
        flyer.style.top = (basketRect.top + 15) + 'px';
        flyer.style.transform = 'scale(0.2)';
        flyer.style.opacity = '0.3';
    }, 50);
    
    setTimeout(() => {
        addToCart(name, price);
        flyer.remove();
        basket.style.transform = 'scale(1.3)';
        setTimeout(() => basket.style.transform = 'scale(1)', 200);
    }, 850);
}

function addToCart(name, price) {
    cart.push({name, price});
    updateCartUI();
}

function updateCartUI() {
    // Check if cart-count element exists before writing to it
    const cartCountEl = document.getElementById('cart-count');
    if (cartCountEl) {
        cartCountEl.innerText = cart.length;
    }

    const select = document.getElementById('cake-select');
    const totalBill = cart.reduce((sum, item) => sum + item.price, 0);
    
    if (cart.length === 0) {
        if(select) {
            select.innerHTML = `<option value="">⚠️ First add to cart from menu</option>`;
            select.disabled = true;
        }
        return;
    }
    
    if(select) {
        select.disabled = false;
        select.innerHTML = `<option value="${totalBill}">Selected Items: ${cart.length} | Total Bill: Rs. ${totalBill}</option>`;
        cart.forEach((item, index) => {
            let opt = document.createElement('option');
            opt.disabled = true;
            opt.text = (index + 1) + ". " + item.name + " (Rs. " + item.price + ")";
            select.appendChild(opt);
        });
    }
}

// SUBMIT ORDER (Aapka Original Logic - Handles Form Data & Modal Popup)
async function submitOrder() {
    const name = document.getElementById('cust-name').value;
    const email = document.getElementById('cust-email').value;
    const phone = document.getElementById('cust-phone').value;
    const address = document.getElementById('cust-address').value;
    const date = document.getElementById('cust-date').value;
    
    if(!name || !phone || cart.length === 0 || !address) {
        alert("Please fill all details (including Phone) and add items to cart!");
        return;
    }
    
    const totalBill = cart.reduce((sum, item) => sum + item.price, 0);
    const itemsList = cart.map(i => i.name).join(", ");
    
    // Save order data into global variable for finalConfirmation()
    tempOrderPayload = { 
        name, 
        email, 
        phone, 
        item: itemsList, 
        qty: cart.length, 
        bill: totalBill, 
        address, 
        date, 
        timestamp: new Date().toLocaleString() 
    };
    
    // Populating Invoice Modal with order data
    document.getElementById('invoice-content').innerHTML = `
        <p><strong>Customer:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Gmail:</strong> ${email}</p>
        <p><strong>Cakes:</strong> ${itemsList}</p>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>Total Bill:</strong> Rs. ${totalBill}</p>
    `;
    document.getElementById('invoice-modal').style.display = 'flex';
}

// ✅ FINAL CONFIRMATION (Merged with Direct n8n Webhook Endpoint)
async function finalConfirmation() {
    try {
        // Direct Post Request to live n8n webhook (No Python local backend needed!)
        // Pehle wale URL se aakhri ka "/place-order" hata kar yeh likhein:
const response = await fetch('https://tom321.app.n8n.cloud/webhook/e8db3c47-3c7e-4525-a84a-43c9a2a760c3', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tempOrderPayload)
        });
        
        if (response.ok) {
            // Close Invoice Modal
            document.getElementById('invoice-modal').style.display = 'none';
            
            // Trigger Luxury Toast Success Animation
            const toast = document.getElementById('order-success-toast');
            if (toast) {
                toast.classList.add('active');
                setTimeout(() => {
                    toast.classList.remove('active');
                    // Reset cart and UI
                    cart = []; 
                    updateCartUI();
                    showSection('home');
                }, 3000);
            } else {
                // Fallback if toast element isn't found in HTML
                alert("Order Success! Processed directly to n8n.");
                cart = [];
                updateCartUI();
                showSection('home');
            }
        } else {
            alert("n8n received the request but returned an error. Please try again.");
        }
    } catch(e) {
        console.error("Connection Error: ", e);
        alert("Could not connect to n8n Webhook! Check your internet connection.");
    }
}