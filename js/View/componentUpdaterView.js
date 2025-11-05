const facebookLink = '<a href = "https://www.facebook.com/MGConsensus">https://www.facebook.com/MGConsensus</a>';
const email = '<a href = "mailto:mapuagameconsensus@gmail.com">mapuagameconsensus@gmail.com</a>';

const combination = facebookLink + "<br>" + email;

function updateFooterText() {
    $("#footer-text").html(combination);
    $("#footer-text a").css("color", "white");
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

