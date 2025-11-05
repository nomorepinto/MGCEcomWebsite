$(document).ready(function () {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    $('#no-itemh1').hide();
    renderCartItems();
    updateCartQuantity();
    calculateTotal();
});

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
