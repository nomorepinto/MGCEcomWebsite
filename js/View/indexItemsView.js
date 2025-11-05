function renderProductList() {
  const $container = $('#product-list');
  const $template = $('.product-template').first();

  // Clear any previously generated products
  $container.children().not('.product-template').remove();

  // Loop through the items object
  Object.entries(items).forEach(([id, product]) => {
    // Clone the hidden template
    let $card = $template.clone();
    $card.removeClass('product-template').attr('id', `product-${id}`).show();

    // Fill in the details
    $card.find('.product-image').attr('src', product.image);
    $card.find('.product-image').attr('alt', product.title);
    $card.find('.product-title').text(product.title);
    $card.find('.product-price').text(product.price);
    $card.find('.product-link').attr('href', `item.html?id=${id}`);
    $card.find('.product-view').attr('href', `item.html?id=${id}`);
    $card.find('.product-add')
         .attr('id', `add-to-cart-${id}`)
         .off('click') // prevent duplicate bindings
         .on('click', () => addToCart(parseInt(id)));

    // Append the new card to the grid
    $container.append($card);
  });
}

// Call the function when the page loads
$(document).ready(() => {
  renderProductList();
});
