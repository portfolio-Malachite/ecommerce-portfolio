import http from "node:http";

const products = [
  ["Aura Knit Jacket", "Men", 188, "https://images.unsplash.com/photo-1543076447-215ad9ba6923?q=80&w=900&auto=format&fit=crop"],
  ["Nova Runner", "Sneakers", 164, "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=900&auto=format&fit=crop"],
  ["Monolith Watch", "Accessories", 296, "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=900&auto=format&fit=crop"],
  ["Atelier Tote", "Women", 220, "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=900&auto=format&fit=crop"],
  ["Studio Headphones", "Accessories", 340, "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=900&auto=format&fit=crop"],
  ["Zara Silk Shirt", "Women", 132, "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=900&auto=format&fit=crop"]
];

const nav = `<nav class="nav">
  <a class="brand" href="/">Velora</a>
  <div class="links"><a href="/">Home</a><a href="/shop">Shop</a><a href="/hot-items">Hot Items</a><a href="/deals">Deals</a></div>
  <div class="actions">
    <button class="icon" onclick="location.href='/shop'" aria-label="Search">⌕</button>
    <button class="icon" onclick="toast('Wishlist opened')" aria-label="Wishlist">♡</button>
    <button class="icon" onclick="openCart()" aria-label="Cart">Bag <span id="count">0</span></button>
    <button class="icon profile" onclick="toggleProfile()" aria-label="Profile">Profile ▾</button>
  </div>
  <div id="profileMenu" class="profileMenu"><a href="/saved-addresses">Saved Addresses</a><a href="/notifications">Notifications</a><a href="/track-order">Track Order</a><a href="/login">Logout</a></div>
</nav>`;

function productCards() {
  return products.map(([name, category, price, image], index) => `
    <article class="product" data-name="${name.toLowerCase()}" data-category="${category}">
      <button class="photo" onclick="quick('${name}', '${category}', ${price}, '${image}')"><img src="${image}" alt="${name}"><span>${index === 1 ? "Sneaker Drop" : index === 3 ? "Deal" : "Luxury"}</span></button>
      <div class="meta"><small>${category}</small><button onclick="wish('${name}')">♡</button></div>
      <h3>${name}</h3>
      <div class="row"><b>$${price}</b><em>★ 4.${9 - (index % 4)}</em></div>
      <button class="cart" onclick="add('${name}', ${price})">Add to cart</button>
    </article>`).join("");
}

function shell(pathname) {
  const body = pathname === "/shop" ? shop() :
    pathname === "/hot-items" ? hotItems() :
    pathname === "/deals" ? deals() :
    pathname === "/checkout" ? checkout() :
    pathname === "/cart" ? cartPage() :
    pathname === "/shipping-policy" ? policy("Shipping Policy", ["Standard Delivery", "Express Delivery", "Tracking updates"]) :
    pathname === "/return-policy" ? policy("Return Policy", ["30-day returns", "Quality check", "Easy refund"]) :
    pathname === "/privacy-policy" ? policy("Privacy Policy", ["Secure checkout data", "Recommendation preferences", "Opt out anytime"]) :
    pathname === "/terms-and-conditions" ? policy("Terms and Conditions", ["Order acceptance", "Pricing availability", "Account responsibility"]) :
    pathname === "/saved-addresses" ? savedAddresses() :
    pathname === "/notifications" ? notifications() :
    pathname === "/track-order" || pathname === "/order-tracking" ? trackOrder() :
    home();

  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Velora | Luxury Fashion & Streetwear</title><meta name="description" content="Velora luxury fashion and streetwear ecommerce preview">
  <style>${css()}</style></head><body>${nav}${body}${footer()}${drawer()}${quickView()}<button class="chat" onclick="toast('Velora Concierge is ready')">◌</button><div id="toast" class="toast"></div><script>${js()}</script></body></html>`;
}

function home() {
  return `<main>
    <div class="hero" id="hero"><div class="glow" id="glow"></div><div class="bgtype">Velora</div><div class="heroCopy"><div class="eyebrow">🔥 New drop 2026</div><h1>Own The Next Drop.</h1><p>Street luxury starts here: limited sneakers, sculpted outerwear, and accessories styled like a premium fashion campaign.</p><div class="cta"><a class="btn" href="/shop">Shop Drop →</a><a class="btn secondary" href="/hot-items">Explore Collection ✦</a></div><div class="badges"><span>Trending</span><span>Best Seller</span><span>New Drop</span></div></div><div class="heroStage"><div class="heroimg"><img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1400&auto=format&fit=crop" alt="Velora streetwear editorial"></div><div class="float f1"><b>🔥 40% OFF</b><span>Drop pricing</span></div><div class="float f2"><b>Free shipping</b><span>Over $150</span></div><div class="float f3"><b>4.9 rating</b><span>12K reviews</span></div><div class="float f4"><b>Trending now</b><span>Sneaker edit</span></div><div class="mini m1"><img src="${products[1][3]}" alt="${products[1][0]}"><b>${products[1][0]}</b><span>$164 · New Drop</span></div><div class="mini m2"><img src="${products[0][3]}" alt="${products[0][0]}"><b>${products[0][0]}</b><span>Best Seller</span></div></div></div>
    <div class="ticker"><div>${["Velora","New Drop","Street Luxury","40% OFF","Free Shipping","Trending Now","4.9 Rated","Velora","New Drop","Street Luxury","40% OFF","Free Shipping","Trending Now","4.9 Rated"].map(x=>`<span>${x}</span>`).join("")}</div></div>
    <section><div class="head"><div><div class="eyebrow">Featured</div><h2>Streetwear essentials</h2></div><a href="/shop"><b>View all →</b></a></div><div class="grid">${productCards()}</div></section>
    <div class="sale"><div><div class="eyebrow">Flash sale</div><h2>Up to 35% off sneakers, jackets, and accessories.</h2><p>Limited premium streetwear deals for the next drop window.</p></div><a class="btn" href="/deals">Unlock deals</a></div>
    <section><h2>Shop Hot Items</h2><div class="categories">${["Men","Women","Sneakers","Accessories","Outerwear","Bags"].map((x,i)=>`<a class="panel" href="/hot-items"><span class="muted">0${i+1}</span><br><br><b>${x}</b><p class="muted">Curated luxury streetwear edit.</p></a>`).join("")}</div></section>
    <section><div class="head"><div><div class="eyebrow">Recommended</div><h2>Recently viewed + AI picks</h2></div></div><div class="grid">${productCards()}</div></section>
  </main>`;
}

function shop() {
  return `<main><section><div class="eyebrow">Shop Velora</div><h1 class="pageTitle">Luxury streetwear collection</h1><div class="filters"><input id="q" oninput="filterProducts()" placeholder="Search products"><select id="cat" onchange="filterProducts()"><option>All</option><option>Men</option><option>Women</option><option>Sneakers</option><option>Accessories</option></select><select><option>Featured</option><option>Price low to high</option><option>Top rated</option></select></div><div class="grid">${productCards()}</div></section></main>`;
}

function hotItems() {
  return `<main><section><div class="eyebrow">Hot Items</div><h1 class="pageTitle">Shop Men, Women, Sneakers, Accessories.</h1><div class="categories">${["Men","Women","Sneakers","Accessories","Outerwear","Bags"].map((x)=>`<a class="panel" href="/shop"><b>${x}</b><p class="muted">Premium luxury fashion and streetwear edits.</p></a>`).join("")}</div></section></main>`;
}

function deals() {
  return `<main><section><div class="dealHero"><div class="eyebrow">Deals</div><h1>Limited streetwear deals.</h1><p>Flash sale pricing on sneakers, jackets, bags, and accessories.</p></div><div class="grid">${productCards()}</div></section></main>`;
}

function checkout() {
  return `<main><section><div class="checkout"><div><h1 class="pageTitle">Checkout</h1><div class="steps"><b>1 Address</b><b>2 Delivery</b><b>3 Payment</b></div>${addressForm("Shipping Address")}<div class="panel"><h2>Billing Address</h2><label><input type="checkbox" checked> Same as shipping address</label></div><div class="panel"><h2>Delivery Method</h2><div class="two"><button class="option">Standard Delivery<br><span>3-5 business days · Free over $150</span></button><button class="option">Express Delivery<br><span>1-2 business days · $18</span></button></div></div><div class="panel"><h2>Payment Section</h2><div class="four">${["UPI","Card","Cash on Delivery","PayPal"].map(x=>`<button class="option">${x}</button>`).join("")}</div></div></div><aside class="summary"><h2>Order Summary</h2><div id="summaryRows"></div><input placeholder="Coupon code"><p><span>Product total</span><b id="prodTotal">$0</b></p><p><span>Shipping fee</span><b>$12</b></p><p><span>GST / tax</span><b id="tax">$0</b></p><p class="final"><span>Final total</span><b id="final">$0</b></p><a class="btn wide" href="/order-success">Place order</a></aside></div></section><div class="mobilePay"><a href="/order-success">Place order</a></div></main>`;
}

function addressForm(title) {
  return `<div class="panel"><div class="split"><h2>${title}</h2><button class="chip">Address auto-fill</button></div><div class="form">${["Full Name","Phone Number","Email","Country","State","City","PIN Code","Landmark"].map(x=>`<input placeholder="${x}">`).join("")}<textarea placeholder="Full Address"></textarea></div></div>`;
}

function cartPage() {
  return `<main><section><h1 class="pageTitle">Cart</h1><div class="panel"><div id="cartList"></div><a class="btn" href="/checkout">Checkout</a><button class="btn secondary" onclick="clearCart()">Clear cart</button></div></section></main>`;
}

function policy(title, items) {
  return `<main><section><div class="eyebrow">Support</div><h1 class="pageTitle">${title}</h1><div class="categories">${items.map(x=>`<div class="panel"><b>${x}</b><p class="muted">Clear ecommerce policy information for Velora customers.</p></div>`).join("")}</div></section></main>`;
}

function savedAddresses() {
  return `<main><section><div class="eyebrow">Account</div><h1 class="pageTitle">Saved Addresses</h1><div class="categories"><div class="panel"><b>Home</b><p>18 Mercer Street, SoHo, New York, NY 10013</p></div><div class="panel"><b>Studio</b><p>Velora Studio, 5th Avenue, New York, NY 10011</p></div></div></section></main>`;
}

function notifications() {
  return `<main><section><div class="eyebrow">Account</div><h1 class="pageTitle">Notifications</h1>${["Order packed","Sneaker drop tonight","Wishlist item back in stock"].map(x=>`<div class="panel notice"><b>${x}</b><p class="muted">Just now</p></div>`).join("")}</section></main>`;
}

function trackOrder() {
  return `<main><section><div class="eyebrow">Support</div><h1 class="pageTitle">Track Order</h1><div class="panel"><input placeholder="Enter tracking number"><div class="timeline">${["Confirmed","Packed","Departed warehouse","Out for delivery","Delivered"].map((x,i)=>`<p><span class="${i<3?"active":""}"></span><b>${x}</b><br><em>Delivery stage update</em></p>`).join("")}</div></div></section></main>`;
}

function footer() {
  const col = (title, links) => `<div><h3>${title}</h3>${links.map(([label, href])=>`<a href="${href}">${label}</a>`).join("")}</div>`;
  return `<footer class="footer"><div class="footGrid"><div><b class="brand">Velora</b><p>Luxury fashion and streetwear ecommerce brand.</p><div class="social">Instagram Facebook X</div></div>${col("Shop",[["Men","/hot-items"],["Women","/hot-items"],["Sneakers","/hot-items"],["Accessories","/hot-items"]])}${col("Company",[["About Us","/about"],["Careers","/about"],["Blog","/blog"],["Contact","/contact"]])}${col("Support",[["FAQ","/faq"],["Shipping","/shipping-policy"],["Returns","/return-policy"],["Privacy Policy","/privacy-policy"]])}<div><h3>Address + Contact</h3><p>Velora Studio, 18 Mercer Street, SoHo, New York, NY 10013, USA</p><p>Phone: +1 800 555 0199</p><p>Email: support@velora.com</p><p>Working hours: Mon-Sat, 10:00 AM - 7:00 PM EST</p></div></div><div class="copy">© 2026 Velora. All rights reserved. <a href="/terms-and-conditions">Terms</a></div></footer>`;
}

function drawer() {
  return `<div id="drawer" class="drawer"><button class="shade" onclick="closeCart()"></button><aside><button class="close" onclick="closeCart()">×</button><h2>Cart Drawer</h2><div id="drawerItems"></div><a class="btn wide" href="/checkout">Checkout</a></aside></div>`;
}

function quickView() {
  return `<div id="quick" class="drawer"><button class="shade" onclick="closeQuick()"></button><aside><button class="close" onclick="closeQuick()">×</button><div id="quickBody"></div></aside></div>`;
}

function css() {
  return `*{box-sizing:border-box}body{margin:0;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background:radial-gradient(circle at top left,#ede9fe,transparent 40%),radial-gradient(circle at bottom right,#ddd6fe,transparent 30%),#f8fafc;color:#08080a}a{color:inherit;text-decoration:none}.nav{position:sticky;top:0;z-index:10;display:flex;align-items:center;justify-content:space-between;padding:18px min(6vw,64px);background:rgba(255,255,255,.82);backdrop-filter:blur(22px);border-bottom:1px solid rgba(0,0,0,.06)}.brand{font-size:28px;font-weight:950;letter-spacing:-.04em}.links{display:flex;gap:26px;font-size:14px;font-weight:900}.actions{display:flex;gap:10px;align-items:center}.icon{border:0;background:rgba(0,0,0,.06);border-radius:999px;min-height:42px;padding:0 14px;font-weight:900;cursor:pointer}.profileMenu{display:none;position:absolute;right:46px;top:70px;background:white;border:1px solid rgba(0,0,0,.1);box-shadow:0 28px 90px rgba(15,15,20,.18);border-radius:20px;padding:8px;width:220px}.profileMenu.open{display:grid}.profileMenu a{padding:10px;border-radius:12px;font-size:14px;font-weight:800}.profileMenu a:hover{background:#f2f2f3}.hero{position:relative;display:grid;grid-template-columns:.95fr 1.05fr;gap:54px;align-items:center;max-width:1240px;margin:auto;padding:82px 22px 62px;overflow:hidden}.glow{position:absolute;width:360px;height:360px;border-radius:999px;background:rgba(124,58,237,.2);filter:blur(70px);left:58%;top:42%;transform:translate(-50%,-50%);pointer-events:none;transition:.18s}.bgtype{position:absolute;inset:40px 0 auto;text-align:center;font-size:18vw;line-height:.8;font-weight:950;text-transform:uppercase;letter-spacing:-.08em;color:rgba(255,255,255,.66);pointer-events:none}.heroCopy{position:relative;z-index:2}.eyebrow{color:#7c3aed;text-transform:uppercase;letter-spacing:.24em;font-weight:950;font-size:13px}.hero h1,.pageTitle{font-size:clamp(56px,8.2vw,112px);line-height:.88;letter-spacing:-.075em;margin:18px 0}.hero p,.muted{color:#54545d;line-height:1.75}.cta{display:flex;gap:14px;flex-wrap:wrap;margin-top:30px}.btn{display:inline-flex;align-items:center;justify-content:center;border:0;border-radius:999px;padding:18px 28px;background:#7c3aed;color:white;font-weight:950;cursor:pointer;box-shadow:0 22px 60px rgba(124,58,237,.34);transition:.28s}.btn:hover{transform:translateY(-4px);box-shadow:0 30px 90px rgba(124,58,237,.52)}.btn.secondary{background:rgba(255,255,255,.84);color:#08080a;backdrop-filter:blur(18px)}.badges{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;max-width:520px;margin-top:34px}.badges span{border:1px solid rgba(255,255,255,.74);background:rgba(255,255,255,.62);backdrop-filter:blur(16px);border-radius:18px;padding:13px;text-align:center;font-size:12px;font-weight:950;text-transform:uppercase;letter-spacing:.14em;box-shadow:0 18px 45px rgba(124,58,237,.13);animation:floaty 3.6s infinite}.badges span:nth-child(2){animation-delay:.45s}.badges span:nth-child(3){animation-delay:.9s}.wide{width:100%}.heroStage{position:relative;min-height:640px}.heroimg{position:absolute;inset:0 76px auto;aspect-ratio:4/5;border-radius:36px;overflow:hidden;box-shadow:0 38px 120px rgba(15,15,20,.3);animation:parallax 7s infinite ease-in-out}.heroimg:after{content:"";position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.46),transparent 55%,rgba(255,255,255,.12));mix-blend-mode:multiply}.heroimg img,.photo img,.tile img{width:100%;height:100%;object-fit:cover;display:block}.heroimg img{transform:scale(1.14);filter:contrast(1.22) saturate(1.18)}.float{position:absolute;z-index:4;border:1px solid rgba(255,255,255,.58);background:rgba(255,255,255,.72);backdrop-filter:blur(20px);border-radius:24px;padding:16px 18px;box-shadow:0 24px 70px rgba(15,15,20,.16);animation:floaty 4s infinite ease-in-out}.float b{display:block;font-size:20px}.float span,.mini span{display:block;color:#62626a;font-size:13px;font-weight:800}.f1{left:0;top:50px}.f2{right:0;top:128px;animation-delay:.4s}.f3{left:12px;bottom:168px;animation-delay:.8s}.f4{right:0;bottom:102px;animation-delay:1.2s}.mini{position:absolute;z-index:5;width:176px;border-radius:26px;background:white;padding:12px;box-shadow:0 30px 90px rgba(15,15,20,.2);animation:mini 5.2s infinite ease-in-out}.mini img{width:100%;aspect-ratio:4/5;object-fit:cover;border-radius:18px}.mini b{display:block;margin-top:10px}.m1{left:0;bottom:0}.m2{right:18px;bottom:18px;background:#08080a;color:white;animation-delay:.7s}.m2 span{color:#c4b5fd}.ticker{position:relative;overflow:hidden;border-block:1px solid rgba(255,255,255,.7);background:rgba(255,255,255,.5);backdrop-filter:blur(18px);padding:15px 0}.ticker div{display:flex;width:max-content;gap:42px;animation:ticker 18s linear infinite}.ticker span{font-size:13px;font-weight:950;letter-spacing:.28em;text-transform:uppercase;color:#62626a}.glass{position:absolute;left:24px;right:24px;bottom:22px;border:1px solid rgba(255,255,255,.45);background:rgba(255,255,255,.76);backdrop-filter:blur(20px);border-radius:24px;padding:18px}@keyframes ticker{to{transform:translateX(-50%)}}@keyframes floaty{50%{transform:translateY(-13px) rotate(1deg)}}@keyframes mini{50%{transform:translate(8px,-10px)}}@keyframes parallax{50%{transform:translateY(-14px) scale(1.01)}}section{max-width:1240px;margin:auto;padding:58px 22px}.head{display:flex;justify-content:space-between;gap:20px;align-items:end;margin-bottom:28px}h2{font-size:clamp(28px,4vw,52px);letter-spacing:-.055em;margin:0}.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}.product{background:white;border:1px solid rgba(0,0,0,.06);border-radius:28px;overflow:hidden;box-shadow:0 6px 22px rgba(0,0,0,.04);transition:.25s}.product:hover{transform:translateY(-6px);box-shadow:0 24px 70px rgba(15,15,20,.14)}.photo{position:relative;aspect-ratio:4/5;overflow:hidden;background:#eee;border:0;width:100%;cursor:pointer}.photo span{position:absolute;left:14px;top:14px;background:rgba(255,255,255,.88);border-radius:999px;padding:7px 10px;font-size:12px;font-weight:950}.product h3{font-size:19px;margin:8px 16px}.meta,.row{display:flex;align-items:center;justify-content:space-between;padding:14px 16px 0}.meta small{text-transform:uppercase;letter-spacing:.16em;color:#8a8a91;font-weight:950}.meta button{border:0;background:transparent;font-size:24px;cursor:pointer}.row em{font-style:normal;color:#7c3aed;font-weight:900}.cart{margin:16px;width:calc(100% - 32px);border:0;border-radius:999px;background:#08080a;color:white;padding:13px;font-weight:950;cursor:pointer}.sale,.dealHero{max-width:1196px;margin:40px auto;border-radius:34px;background:#08080a;color:white;padding:46px;display:flex;align-items:center;justify-content:space-between;gap:30px;box-shadow:0 28px 90px rgba(15,15,20,.18)}.dealHero{display:block}.categories{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.panel{background:white;border:1px solid rgba(0,0,0,.06);border-radius:28px;padding:26px;margin-bottom:16px}.panel b{font-size:24px}.filters{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:24px}input,select,textarea{min-height:46px;border:1px solid rgba(0,0,0,.1);border-radius:18px;padding:0 16px;background:white;font:inherit}textarea{padding:16px;min-height:100px}.checkout{display:grid;grid-template-columns:1fr 390px;gap:28px}.steps,.two,.four{display:grid;gap:12px}.steps{grid-template-columns:repeat(3,1fr);margin:24px 0}.steps b,.option,.chip{border:1px solid rgba(0,0,0,.1);background:white;border-radius:18px;padding:16px;text-align:left;font-weight:900}.two{grid-template-columns:repeat(2,1fr)}.four{grid-template-columns:repeat(4,1fr)}.option span{color:#62626a;font-size:13px}.split{display:flex;justify-content:space-between;gap:14px;align-items:center}.form{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-top:18px}.form textarea{grid-column:1/-1}.summary{position:sticky;top:96px;height:max-content;background:white;border-radius:28px;padding:26px;box-shadow:0 28px 90px rgba(15,15,20,.12)}.summary p{display:flex;justify-content:space-between}.final{font-size:20px;font-weight:950;border-top:1px solid rgba(0,0,0,.1);padding-top:14px}.mobilePay{display:none}.timeline p{position:relative;padding-left:34px}.timeline span{position:absolute;left:0;top:4px;width:16px;height:16px;border-radius:99px;background:#cfcfd5}.timeline span.active{background:#7c3aed}.timeline em{font-style:normal;color:#62626a}.notice{margin-bottom:12px}.footer{background:white;border-top:1px solid rgba(0,0,0,.06);padding:46px 22px 0}.footGrid{max-width:1240px;margin:auto;display:grid;grid-template-columns:1.4fr .8fr .8fr .8fr 1.4fr;gap:30px}.footer h3{margin:0 0 14px}.footer a{display:block;color:#62626a;margin:10px 0}.copy{text-align:center;border-top:1px solid rgba(0,0,0,.06);margin-top:36px;padding:18px;color:#62626a}.toast{position:fixed;left:50%;bottom:24px;transform:translateX(-50%);background:#08080a;color:white;padding:13px 18px;border-radius:999px;font-weight:850;box-shadow:0 18px 60px rgba(0,0,0,.24);opacity:0;pointer-events:none;transition:.25s;z-index:50}.toast.show{opacity:1}.chat{position:fixed;right:20px;bottom:20px;height:58px;width:58px;border-radius:999px;border:0;background:#7c3aed;color:white;font-size:24px;box-shadow:0 18px 60px rgba(124,58,237,.35);cursor:pointer;z-index:20}.drawer{display:none;position:fixed;inset:0;z-index:40}.drawer.open{display:block}.shade{position:absolute;inset:0;background:rgba(0,0,0,.45);border:0}.drawer aside{position:absolute;right:0;top:0;height:100%;width:min(440px,100%);background:white;padding:24px;box-shadow:0 28px 90px rgba(15,15,20,.24);overflow:auto}.close{float:right;border:0;background:#f2f2f3;border-radius:99px;height:38px;width:38px;font-size:24px}@media(max-width:950px){.hero,.checkout{grid-template-columns:1fr}.heroStage{min-height:600px}.heroimg{inset:0 42px auto}.grid{grid-template-columns:repeat(2,1fr)}.categories,.footGrid{grid-template-columns:1fr}.links{display:none}.sale{margin:24px 16px;display:block}.summary{position:static}.four{grid-template-columns:repeat(2,1fr)}.mobilePay{display:block;position:fixed;left:0;right:0;bottom:0;background:white;border-top:1px solid rgba(0,0,0,.1);padding:14px;z-index:30}.mobilePay a{display:flex;min-height:50px;align-items:center;justify-content:center;border-radius:999px;background:#7c3aed;color:white;font-weight:950}}@media(max-width:560px){.grid,.two,.form,.steps,.badges{grid-template-columns:1fr}.hero h1,.pageTitle{font-size:54px}.heroStage{min-height:560px}.float{padding:12px}.f1,.f3{left:0}.f2,.f4{right:0}.mini{width:142px}.nav{padding:14px}.actions .profile{display:none}}`;
}

function js() {
  return `const cartKey='velora-preview-cart';let cartItems=JSON.parse(localStorage.getItem(cartKey)||'[]');renderAll();const hero=document.getElementById('hero');if(hero){hero.addEventListener('mousemove',e=>{const r=hero.getBoundingClientRect();const g=document.getElementById('glow');g.style.left=((e.clientX-r.left)/r.width*100)+'%';g.style.top=((e.clientY-r.top)/r.height*100)+'%'})}function add(name,price){cartItems.push({name,price});localStorage.setItem(cartKey,JSON.stringify(cartItems));renderAll();toast(name+' added to cart');openCart()}function wish(name){toast(name+' saved to wishlist')}function renderAll(){const c=document.getElementById('count');if(c)c.textContent=cartItems.length;renderCart();renderSummary()}function toast(msg){const el=document.getElementById('toast');el.textContent=msg;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),2200)}function toggleProfile(){document.getElementById('profileMenu').classList.toggle('open')}function openCart(){document.getElementById('drawer').classList.add('open');renderCart()}function closeCart(){document.getElementById('drawer').classList.remove('open')}function renderCart(){const html=cartItems.length?cartItems.map(i=>'<p><b>'+i.name+'</b><br><span class="muted">$'+i.price+'</span></p>').join(''):'<p class="muted">Your cart is empty.</p>';const d=document.getElementById('drawerItems');if(d)d.innerHTML=html;const l=document.getElementById('cartList');if(l)l.innerHTML=html}function clearCart(){cartItems=[];localStorage.setItem(cartKey,'[]');renderAll()}function quick(name,category,price,image){document.getElementById('quickBody').innerHTML='<img style="width:100%;border-radius:24px;aspect-ratio:4/5;object-fit:cover" src="'+image+'" alt="'+name+'"><p class="eyebrow" style="margin-top:18px">'+category+'</p><h2>'+name+'</h2><p class="muted">Product quick view modal with streetwear details, price, and one-tap cart action.</p><button class="btn wide" onclick="add(\\''+name+'\\','+price+')">Add to cart</button>';document.getElementById('quick').classList.add('open')}function closeQuick(){document.getElementById('quick').classList.remove('open')}function filterProducts(){const q=document.getElementById('q')?.value.toLowerCase()||'';const cat=document.getElementById('cat')?.value||'All';document.querySelectorAll('.product').forEach(p=>{const ok=p.dataset.name.includes(q)&&(cat==='All'||p.dataset.category===cat);p.style.display=ok?'block':'none'})}function renderSummary(){const sub=cartItems.reduce((s,i)=>s+i.price,0);const tax=Math.round(sub*.08);const rows=document.getElementById('summaryRows');if(rows)rows.innerHTML=cartItems.length?cartItems.map(i=>'<p><span>'+i.name+'</span><b>$'+i.price+'</b></p>').join(''):'<p class="muted">No items yet</p>';const prod=document.getElementById('prodTotal');if(prod)prod.textContent='$'+sub;const taxEl=document.getElementById('tax');if(taxEl)taxEl.textContent='$'+tax;const final=document.getElementById('final');if(final)final.textContent='$'+(sub+tax+12)}`;
}

const server = http.createServer((req, res) => {
  res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
  res.end(shell(new URL(req.url ?? "/", "http://localhost").pathname));
});

const port = Number(process.env.PORT ?? 3000);
server.listen(port, "127.0.0.1", () => {
  console.log(`Velora local preview: http://localhost:${port}`);
});
