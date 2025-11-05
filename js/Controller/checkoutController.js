async function checkout() {
    try {
        // Get values when function is called (not at page load!)
        const fullname = $('#full-name').val().trim();
        const pickupLocation = $('#pickup-location').val().trim();
        const gcashReference = $('#gcash-ref').val().trim();
        const facebookLink = $('#facebook-link').val().trim();

        // Validate inputs
        if (!fullname || !pickupLocation || !gcashReference || !facebookLink) {
            alert('Please fill out all fields');
            return;
        }

        // Get cart from localStorage
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        // Prepare customer and order info
        const customerInfo = {
            fullName: fullname,
            facebookLink: facebookLink
        };

        const orderInfo = {
            logisticMethod: pickupLocation,
            paymentReference: gcashReference
        };

        console.log('Submitting order...', { cart, customerInfo, orderInfo });

        // Disable submit button to prevent double submission
        const submitButton = $('.checkout-button');
        submitButton.prop('disabled', true).text('Submitting...');

        // Create order in Supabase
        const result = await createOrderInSupabase(cart, customerInfo, orderInfo);

        if (result.success) {
            alert(`Order submitted successfully! Order ID: ${result.orderID}`);
            
            // Clear cart
            localStorage.removeItem('cart');
            
            // Redirect to success page or home
            window.location.href = 'index.html';
        } else {
            alert(`Error submitting order: ${result.error}`);
            submitButton.prop('disabled', false).text('Submit');
        }

    } catch (error) {
        console.error('Checkout error:', error);
        alert(`An error occurred: ${error.message}`);
        $('.checkout-button').prop('disabled', false).text('Submit');
    }
}