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


