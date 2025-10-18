let cart = [];

function renderCartItems() {
    // Clear the cart display except for the template
    $('#cart-items').children().not('.cart-item-template').remove();
    
    if (cart.length === 0) {
        $('#no-itemh1').show();  // Show the no items header when cart is empty
        $('#noitems-placeholder').show();
        $('#cart-items').hide();
        $('#checkout-section').hide();
    } else {
        $('#no-itemh1').hide(); 
        $('#noitems-placeholder').hide();
        $('#cart-items').show();
        $('#checkout-section').show();

        // Loop over cart items
        cart.forEach((item, index) => {
            let $template = $('.cart-item-template').first().clone();
            $template.removeClass('cart-item-template').show();
            
            // Add unique identifiers
            $template.attr('id', `cart-item-${index}`);
            $template.find('.quantity').attr('id', `quantity-${index}`);
            $template.find('.addquantity').attr('id', `add-${index}`);
            $template.find('.removequantity').attr('id', `remove-${index}`);
            
            // Fill in item details
            $template.find('.item-title').text(item.title);
            $template.find('.item-description').text(item.description);
            $template.find('.item-price').text(`${item.price}`);
            $template.find('.item-image').attr('src', item.image);
            $template.find('.quantity').text(item.quantity);
            
            // Add remove button handler
            $template.find('.remove-item-button').click(function() {
                const itemIndex = $(this).closest('[id^="cart-item-"]').attr('id').split('-')[2];
                removeItem(parseInt(itemIndex));
            });
            
            // Append to cart
            $('#cart-items').append($template);
        });
    }

    cart.forEach(item => {
    console.log(item);
    });
    
}

function downloadCart(cart) {
  // Convert cart array to JSON string
  const jsonData = JSON.stringify(cart, null, 2);

  // Create a Blob with JSON data
  const blob = new Blob([jsonData], { type: "application/json" });

  // Create a temporary link element
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");

  // Set the filename and trigger download
  a.href = url;
  a.download = "cart.json";
  a.click();

  // Clean up
  URL.revokeObjectURL(url);
}


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

$(document).ready(function () {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    $('#no-itemh1').hide();
    renderCartItems();
    updateCartQuantity();
    calculateTotal();
});

function updateQtt(btn) {
    let parent = $(btn).closest("div");         // get parent container
    let qttEl = parent.find(".quantity");       // find the quantity span
    let qtt = parseInt(qttEl.text());
    let itemIndex = parseInt(parent.closest('[id^="cart-item-"]').attr('id').split('-')[2]);

    if ($(btn).text() === "+") {
        qtt += 1;
    } else {
        if (qtt > 1) {
            qtt -= 1;
        } else {
            removeItem(itemIndex);
            return;
        }
    }
    
    // Update the display
    qttEl.text(qtt);
    
    // Update the cart array
    cart[itemIndex].quantity = qtt;
    localStorage.setItem('cart', JSON.stringify(cart));

    console.log(`Item at index ${itemIndex} updated to quantity ${qtt}`); // For debugging

    calculateTotal();
}

function addToCart(itemId) {
    // Create item with its index as its ID if it doesn't have one
    const itemToAdd = {
        ...items[itemId],
        id: items[itemId].id || itemId,
        quantity: 1
    };
    
    // Check if item already exists in cart by comparing titles (or another unique property)
    const itemExists = cart.some(item => item.title === itemToAdd.title);
    
    if(!itemExists) {
        cart.push(itemToAdd);
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log(`Item ${itemId} added to cart.`); // For debugging
        updateCartQuantity();
    } else {
        alert("Item is already in the cart.");
    }
}

function removeItem(index) {
    // Remove item from cart array
    cart.splice(index, 1);
    
    // Update localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Render updated cart
    renderCartItems();
    updateCartQuantity();
    calculateTotal();
}


