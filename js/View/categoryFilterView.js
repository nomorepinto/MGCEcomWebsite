$(document).ready(function() {
    // Define product categories (by ID)
    const productCategories = {
        'all': [1, 2, 3, 4, 5, 6, 7],
        '3d-printed': [1, 2, 3, 4, 5, 6],
        'lanyards': [7],
        'stickers': [8]
    };

    // ✅ Render all products first
    renderProductList();

    // ✅ Category filter buttons
    $('.category-filter').click(function(e) {
        e.preventDefault();

        const category = $(this).data('category');
        const categoryText = $(this).text();

        filterProducts(category, categoryText);
    });

    // ✅ Filter logic that works with dynamically generated products
    function filterProducts(category, categoryText) {
        // Update the dropdown or header text
        $('#current-category').text(categoryText);

        // Hide all visible product cards (excluding the template)
        $('#product-list')
            .children()
            .not('.product-template')
            .hide();

        // Show the relevant ones based on the selected category
        const productsToShow = productCategories[category] || [];

        if (category === 'all') {
            // Show everything (skip the hidden template)
            $('#product-list')
                .children()
                .not('.product-template')
                .show();
        } else {
            // Show only selected products
            productsToShow.forEach(productId => {
                $(`#product-${productId}`).show();
            });
        }
    }
});
