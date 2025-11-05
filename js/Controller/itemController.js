$(document).ready(function () {
            // Fetch item details based on URL parameter
            const url = new URLSearchParams(window.location.search);
            const itemID = parseInt(url.get('id')); 
            const product = items[itemID];

            if (product) {
                $("#item-title").text(product.title);
                $("#item-price").text(product.price);
                $("#item-image").attr("src", product.imageArray.image1);
                $("#item-description").text(product.description);
                $("#img-2").attr("src", product.imageArray.image2);
                $("#img-3").attr("src", product.imageArray.image3);
                $("#img-4").attr("src", product.imageArray.image4);
                $("#img-5").attr("src", product.imageArray.image5);
            }
            
            // add to cart button functionality
            $('#add-to-cart-button').attr('onclick', `addToCart(${itemID})`);
            
            // Image carousel functionality
            let imageQueue = [
                product.imageArray.image1 || product.image,
                product.imageArray.image2,
                product.imageArray.image3,
                product.imageArray.image4,
                product.imageArray.image5
            ].filter(img => img); // Remove any undefined values

            $('#prev-image').click(function() {
                // Rotate backwards
                let lastImage = imageQueue.pop();
                imageQueue.unshift(lastImage);
                
                if (imageQueue[0]) $('#item-image').attr('src', imageQueue[0]);
                if (imageQueue[1]) $('#img-2').attr('src', imageQueue[1]);
                if (imageQueue[2]) $('#img-3').attr('src', imageQueue[2]);
                if (imageQueue[3]) $('#img-4').attr('src', imageQueue[3]);
                if (imageQueue[4]) $('#img-5').attr('src', imageQueue[4]);
            });

            $('#next-image').click(function() {
                let currentImage = imageQueue.shift();
                imageQueue.push(currentImage);
                if (imageQueue[0]) $('#item-image').attr('src', imageQueue[0]);
                if (imageQueue[1]) $('#img-2').attr('src', imageQueue[1]);
                if (imageQueue[2]) $('#img-3').attr('src', imageQueue[2]);
                if (imageQueue[3]) $('#img-4').attr('src', imageQueue[3]);
                if (imageQueue[4]) $('#img-5').attr('src', imageQueue[4]);
            });
            // update cart quantity on page load
            updateCartQuantity();
        });