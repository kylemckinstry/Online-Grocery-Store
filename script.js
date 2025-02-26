// Navigation bar

document.addEventListener("mouseover", e => {
    const isDropdownButton = e.target.matches("[data-dropdown-button]")
    if (!isDropdownButton && e.target.closest('[data-dropdown]') != null) return

    //Hide or show depending on open or not
    let currentDropdown
    if (isDropdownButton) {
        currentDropdown = e.target.closest('[data-dropdown]')
        currentDropdown.classList.toggle('active')
    }

    //Remove all dropdown that aren't open
    document.querySelectorAll("[data-dropdown].active").forEach(dropdown => {
        if (dropdown === currentDropdown) return
        dropdown.classList.remove('active')
    })

})

// Search button dropdown

function searchDrop() {
    let wrapper = document.getElementById("search-wrapper");
    let grid = document.querySelector('.grid-container');

    if (wrapper.style.visibility === "visible") {
        wrapper.style.visibility = "hidden";
        wrapper.style.opacity = "0";
        wrapper.style.transform = "translateY(-10px)";
        wrapper.style.transition = "opacity 300ms ease-in-out, transform 150ms ease-in-out";
        grid.style.paddingTop = "0rem";
    } else {
        wrapper.style.opacity = "1";
        wrapper.style.transform = "translateY(0)";
        wrapper.style.transition = "opacity 300ms ease-in-out, transform 150ms ease-in-out";
        wrapper.style.visibility = "visible";
        grid.style.paddingTop = "3rem";
    }
}

//button search

function showAll() {

    let item = document.querySelectorAll('.product-item');
    let l = document.getElementsByClassName('category');

    for (let i = 0; i <= l.length; i++) {
        item[i].style.display = "";
    }
}

function topSearch(button) {

    let x = button.id;
    let item = document.querySelectorAll('.product-item');
    let l = document.getElementsByClassName('category');

    for (let i = 0; i <= l.length; i++) {
        let a = item[i].getElementsByClassName('category')[0];
        let value = a.innerHTML || a.innerText || a.textContent;

        if (value == x) {
            item[i].style.display = "";
        } else {
            item[i].style.display = "none";
        }
    }
}

function subSearch(button) {

    let x = button.id;
    let item = document.querySelectorAll('.product-item');
    let l = document.getElementsByClassName('sub-category');

    for (let i = 0; i <= l.length; i++) {
        let a = item[i].getElementsByClassName('sub-category')[0];
        let value = a.innerHTML || a.innerText || a.textContent;

        if (value == x) {
            item[i].style.display = "";
        } else {
            item[i].style.display = "none";
        }
    }
}

// Text search

function search() {

    let filter = document.getElementById('search-bar').value.toUpperCase();
    let item = document.querySelectorAll('.product-item');
    let l = document.getElementsByClassName('product-name');

    for (let i = 0; i <= l.length; i++) {
        let a = item[i].getElementsByClassName('product-name')[0];
        let value = a.innerHTML || a.innerText || a.textContent;

        if (value.toUpperCase().indexOf(filter) > -1) {
            item[i].style.display = "";
        } else {
            item[i].style.display = "none";
        }
    }
}

// Price range slider

let minSlider = document.getElementById("min-slider");
let minOutput = document.getElementById("min-value");
minOutput.innerHTML = minSlider.value;

minSlider.oninput = function () {
    minOutput.innerHTML = this.value;
}

let maxSlider = document.getElementById("max-slider");
let maxOutput = document.getElementById("max-value");
maxOutput.innerHTML = maxSlider.value;

maxSlider.oninput = function () {
    maxOutput.innerHTML = this.value;
}

// Takes the min and max values on the slider and filters the iformation area

function priceSearch() {

    let min = document.getElementById("min-slider").value;
    let max = document.getElementById("max-slider").value;
    let item = document.querySelectorAll('.product-item');
    let l = document.getElementsByClassName('product-price');

    for (let i = 0; i <= l.length; i++) {
        let a = item[i].getElementsByClassName('product-price')[0];
        let value = (parseFloat(a.innerHTML.slice(1)));

        if (value >= min && value <= max) {
            item[i].style.display = "";
        } else {
            item[i].style.display = "none";
        }
    }
}

// Shopping cart - menu

function openCart() {
    document.getElementById("cart-side").style.width = "60%";
    document.querySelector(".content-section").style.opacity = 1;
    document.querySelector(".content-section").style.transition = "opacity 1s ease-in-out";
}

function closeCart() {
    document.getElementById("cart-side").style.width = "0";
    document.querySelector(".content-section").style.opacity = 0;
    document.querySelector(".content-section").style.transition = "opacity .3s ease-in-out";
}

// Shopping cart - cart items

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    let removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (let i = 0; i < removeCartItemButtons.length; i++) {
        let button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    let quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    let addToCartButtons = document.getElementsByClassName('btn-small')
    for (let i = 0; i < addToCartButtons.length; i++) {
        let button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
        button.addEventListener('click', cartFlourish)
    }

    // Purchase button
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)

    // Empty cart button
    document.getElementsByClassName('btn-empty')[0].addEventListener('click', emptyCart)

    // Stock check disable

    function stockCheck() {

        let products = document.querySelectorAll('.product-item');

        for (let i = 0; i < products.length; i++) {

            let stock = document.getElementsByClassName('product-stock')[i].innerText;
            let button = document.getElementsByClassName('btn-small')[i];
            if (stock == "In Stock!") {
                button.classList.remove('disabled');
            } else {
                button.classList.add('disabled');
                button.innerHTML = "Unavailable";
                // Stock colour
                document.getElementsByClassName('product-stock')[i].style.color = "#F47174";
            }
        }
    }

    stockCheck()
}

// Purchase function
function purchaseClicked() {

    // alert('Thank you for your purchase')
    let cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

// Empty cart function
function emptyCart() {
    let cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

// Remove individual item function
function removeCartItem(event) {
    let buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    let input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    let button = event.target
    let shopItem = button.parentElement.parentElement
    let title = shopItem.getElementsByClassName('product-name')[0].innerText
    let price = shopItem.getElementsByClassName('product-price')[0].innerText
    let imageSrc = shopItem.getElementsByClassName('product-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    let cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    let cartItems = document.getElementsByClassName('cart-items')[0]
    let cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    let cartItemPrices = cartItems.getElementsByClassName('cart-price')

    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title && cartItemPrices[i].innerText == price) {

            // Adds another item to row - amalgamated
            if (document.getElementsByClassName('cart-quantity-input')[i].value < 20) {
                document.getElementsByClassName('cart-quantity-input')[i].value++;
            } else {
                alert('20 individual item limit per customer. Ribbit!');
            }
            return
        }
    }
    let cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1" max="20">
            <button class="btn-danger" type="button">&times;</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

//Flourish/Wiggle animation trigger

function cartFlourish() {
    let cart = document.getElementById('cart-img');
    setTimeout(function () {
        cart.classList.remove("flourish");
        cart.classList.remove("flourish-colour");
    }, 1000);
    cart.classList.add("flourish");
    cart.classList.add("flourish-colour");
}

// Update cart total

function updateCartTotal() {
    let cartItemContainer = document.getElementsByClassName('cart-items')[0]
    let cartRows = cartItemContainer.getElementsByClassName('cart-row')
    let total = 0
    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i]
        let priceElement = cartRow.getElementsByClassName('cart-price')[0]
        let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        let price = parseFloat(priceElement.innerText.replace('$', ''))
        let quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total.toFixed(2);

    //toggles purchase button if total is at 0
    let purchaseBtn = document.querySelector('.btn-purchase');
    let totalToggle = document.getElementsByClassName('cart-total-price')[0].innerText;

    if (totalToggle == '$0.00') {
        purchaseBtn.classList.add('disabled');
    } else {
        purchaseBtn.classList.remove('disabled');
    }
}

// Item detail popup

const openPopupButtons = document.querySelectorAll('[data-popup-target]')
const closePopupButtons = document.querySelectorAll('[data-popup-close]')
const overlay = document.getElementById('overlay')

openPopupButtons.forEach(button => {
    button.addEventListener('click', () => {
        const popup = document.querySelector(button.dataset.popupTarget)
        const popupContent = document.getElementById("popup-content");

        let tileInfo = document.getElementById(button.id).querySelector('.tile-info');
        let info = document.getElementById(button.id).querySelector('.more-info');

        let imageSrc = tileInfo.querySelector('.product-image').src;
        let title = tileInfo.querySelector('.product-name').innerHTML;
        let price = tileInfo.querySelector('.product-price').innerHTML;
        let quantity = info.querySelector('.product-quantity').innerHTML;
        let inStock = info.querySelector('.product-stock').innerHTML;
        let stockQty = info.querySelector('.stock-quantity').innerHTML;
        let category = info.querySelector('.category').innerHTML;
        let subCategory = info.querySelector('.sub-category').innerHTML;
        let addBtn = info.querySelector('.sub-category').innerHTML;

        let itemDetails = `

        <div class="detail-image"><img class="product-image" src='${imageSrc}'></div>
        <table>
            <tr>
                <th class="details details-title">Name: </th>
                <td class="details">${title}</td>
            </tr>
            <tr>
                <th class="details details-title">Price: </th>
                <td class="details">${price}</td>
            </tr>
            <tr>
                <th class="details details-title">Quantity: </th>
                <td class="details">${quantity}</td>
            </tr>
            <tr>
                <th class="details details-title">Status: </th>
                <td class="details">${inStock}</td>
            </tr>
            <tr>
            <th class="details details-title">Stock Left: </th>
            <td class="details">${stockQty}</td>
            </tr>
            <tr>
            <th class="details details-title">Category: </th>
            <td class="details">${category}</td>
            </tr>
            <tr>
            <th class="details details-title">Sub-category: </th>
            <td class="details">${subCategory}</td>
            </tr>
        </table>
        
        `
        popupContent.innerHTML = itemDetails

        popupContent.style.display = "block";

        openPopup(popup)
    })
})

closePopupButtons.forEach(button => {
    button.addEventListener('click', () => {
        const popup = button.closest('.popup')
        closePopup(popup)
    })
})

function openPopup(popup) {
    if (popup == null) return
    popup.classList.add('active')
    overlay.classList.add('active')
}

function closePopup(popup) {
    if (popup == null) return
    popup.classList.remove('active')
    overlay.classList.remove('active')
}

overlay.addEventListener('click', () => {
    const popups = document.querySelectorAll('.popup.active')
    popups.forEach(popup => {
        closePopup(popup)
    })
})

// Confirmation page

const confirm = document.getElementById('confirm');

function openConfirm(confirm) {

    closeCart()

    confirm.classList.add('active')
    overlay.classList.add('active')

    let popupContent = document.getElementById("item-content");
    let confirmContent = document.createElement("div");
    confirmContent.innerHTML = popupContent.innerHTML;

    document.getElementById("order-details-content").appendChild(confirmContent);

    let button = confirmContent.querySelectorAll(".btn-danger");
    let cartQuantity = document.querySelectorAll(".cart-quantity-input");
    let confirmQuantity = confirmContent.querySelectorAll(".cart-quantity-input");

    let cartColumn = document.getElementsByClassName("cart-quantity cart-column").innerHTML;
    console.log(cartColumn);

    for (let i = 0; i < button.length; i++) {

        cartQuantity[i].innerHTML = cartQuantity[i].value;
        button[i].style.display = "none";
        console.log(confirmQuantity[i].value);
        console.log(cartQuantity[i].value);
        cartQuantity[i].innerHTML = cartQuantity[i].value;

        confirmQuantity[i].value = cartQuantity[i].value;
        confirmQuantity[i].disabled = true;
        confirmQuantity[i].style.color = "white";
        confirmQuantity[i].style.webkitAppearance = "none";
        confirmQuantity[i].style.mozAppearance = "textfield";

    }

}

function closeConfirm(confirm) {
    confirm.classList.remove('active')
    overlay.classList.remove('active')
    document.getElementById("order-details-content").innerHTML = "";
}

// Date and time in Form

let now = new Date();

let year = now.getFullYear();
let month = now.getMonth() + 1;
let day = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let seconds = now.getSeconds();
let formattedDate = year + '-' + month + '-' + day;
let formattedTime = hours + ':' + minutes + ':' + seconds;
let dateTime = formattedDate + ' ' + formattedTime;

document.getElementById('date').value = dateTime;

// Counting categories

const categoryElements = document.querySelectorAll(".category");

let freshFoodCount = 0, frozenFoodCount = 0, beverageCount = 0, homeHealthCount = 0, petFoodCount = 0;

for (let i = 0; i < categoryElements.length; i++) {

    let categoryCount = document.querySelectorAll(".category")[i].innerText;

    switch (categoryCount) {
        case 'fresh-food':
            freshFoodCount++;
            break;
        case 'frozen-food':
            frozenFoodCount++;
            break;
        case 'beverages':
            beverageCount++
            break;
        case 'home-health':
            homeHealthCount++
            break;
        case 'pet-food':
            petFoodCount++
            break;
        default:
            console.log("Nope");
            break;
    }
}

document.getElementById('fresh-food').innerText = "Fresh Food (" + freshFoodCount + ")";
document.getElementById('frozen-food').innerText = "Frozen Food (" + frozenFoodCount + ")";
document.getElementById('beverages').innerText = "Beverages (" + beverageCount + ")";
document.getElementById('home-health').innerText = "Home & Health (" + homeHealthCount + ")";
document.getElementById('pet-food').innerText = "Pet Food (" + petFoodCount + ")";

// Counting subcategories

const subCategoryElements = document.querySelectorAll(".sub-category");

let meatFishCount = 0, dairyCount = 0, fruitCount = 0, snacksCount = 0;
let frozenMeatFishCount = 0, frozenDairyCount = 0, frozenFruitCount = 0;
let teaCount = 0, coffeeCount = 0, softDrinksCount = 0;
let medicineCount = 0, cleaningCount = 0, vitaminsCount = 0;
let dogFoodCount = 0, catFoodCount = 0, birdFoodCount = 0, fishFoodCount = 0;

for (let i = 0; i < categoryElements.length; i++) {
    let subCategoryCount = document.querySelectorAll(".sub-category")[i].innerText;
    console.log(subCategoryCount);

    switch (subCategoryCount) {
        case 'meat-fish':
            meatFishCount++;
            break;
        case 'dairy':
            dairyCount++;
            break;
        case 'fruit':
            fruitCount++
            break;
        case 'snacks':
            snacksCount++
            break;
        case 'frozen-meat-fish':
            frozenMeatFishCount++
            break;
        case 'frozen-dairy':
            frozenDairyCount++
            break;
        case 'frozen-fruit':
            frozenFruitCount++
            break;
        case 'tea':
            teaCount++
            break;
        case 'coffee':
            coffeeCount++
            break;
        case 'soft-drinks':
            softDrinksCount++
            break;
        case 'medicine':
            medicineCount++
            break;
        case 'cleaning':
            cleaningCount++
            break;
        case 'vitamins':
            vitaminsCount++
            break;
        case 'dog-food':
            dogFoodCount++
            break;
        case 'cat-food':
            catFoodCount++
            break;
        case 'bird-food':
            birdFoodCount++
            break;
        case 'fish-food':
            fishFoodCount++
            break;
        default:
            console.log("");
            break;
    }
}

document.getElementById('meat-fish').innerText = "Meat & Fish (" + meatFishCount + ")";
document.getElementById('dairy').innerText = "Dairy (" + dairyCount + ")";
document.getElementById('fruit').innerText = "Fruit (" + fruitCount + ")";
document.getElementById('snacks').innerText = "Snacks (" + snacksCount + ")";

document.getElementById('frozen-meat-fish').innerText = "Meat & Fish (" + frozenMeatFishCount + ")";
document.getElementById('frozen-dairy').innerText = "Dairy (" + frozenDairyCount + ")";
document.getElementById('frozen-fruit').innerText = "Fruit (" + frozenFruitCount + ")";

document.getElementById('tea').innerText = "Tea (" + teaCount + ")";
document.getElementById('coffee').innerText = "Coffee (" + coffeeCount + ")";
document.getElementById('soft-drinks').innerText = "Soft Drinks (" + softDrinksCount + ")";

document.getElementById('medicine').innerText = "Medicine (" + medicineCount + ")";
document.getElementById('cleaning').innerText = "Cleaning (" + cleaningCount + ")";
document.getElementById('vitamins').innerText = "Vitamins (" + vitaminsCount + ")";

document.getElementById('dog-food').innerText = "Dog Food (" + dogFoodCount + ")";
document.getElementById('cat-food').innerText = "Cat Food (" + catFoodCount + ")";
document.getElementById('bird-food').innerText = "Bird Food (" + birdFoodCount + ")";
document.getElementById('fish-food').innerText = "Fish Food (" + fishFoodCount + ")";
