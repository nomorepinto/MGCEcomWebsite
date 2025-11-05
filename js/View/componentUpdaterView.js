const facebookLink = "https://www.facebook.com/MGConsensus";
const email = "mapuagameconsensus@gmail.com";

const combination = facebookLink + "<br>" + email;
const link = `<a href = "https://www.facebook.com/MGConsensus"> ${combination} </a>`;

function updateFooterText() {
    $("#footer-text").html(link);
}

function updateNavBar(){
    $("#navbar").load("navbar.html", () => {
        updateCartQuantity();
    });
}

$(document).ready(function() {
    updateFooterText();
    updateNavBar();
});

function updateCartQuantity() {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartQuantity = cart.length;
    $('#cart-quantity').text(cartQuantity);
}

function calculateTotal() {
    let total = 0;
    cart.forEach(item => {
        // Remove the '₱' symbol and convert to float
        total += parseFloat(item.price.replace('₱', '').replace(',', '')) * item.quantity;
    });
    $('#cart-total').text(`₱${total.toFixed(2)}`);

}

