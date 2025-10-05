const facebookLink = "https://www.facebook.com/MGConsensus";
const email = "mapuagameconsensus@gmail.com";

const combination = facebookLink + "<br>" + email;

function updateFooterText() {
    $("#footer-text").html(combination);
}

function updateNavBar(){
    $("#navbar").load("navbar.html", function() {
        updateCartQuantity();
    });
}

$(document).ready(function() {
    updateFooterText();
    updateNavBar();
});