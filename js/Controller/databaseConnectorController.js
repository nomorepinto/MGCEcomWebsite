const { createClient } = supabase;
    let supabaseClient;
    let supabaseReady = false; // Add flag

    async function initSupabase() {
        try {
            const response = await fetch('/api/supabase-config');
            const config = await response.json();
            supabaseClient = createClient(config.url, config.anonKey);
            supabaseReady = true; // Mark as ready
            console.log('Supabase ready!');
        } catch (error) {
            console.error('Failed to init Supabase:', error);
            alert('Failed to connect to database. Please refresh the page.');
        }
    }

    // Initialize on page load
    initSupabase();

    async function createOrderInSupabase(cart, customerInfo, orderInfo) {
        try {
            // Wait if not ready yet
            if (!supabaseReady) {
                console.log('Waiting for Supabase...');
                // Wait up to 5 seconds
                for (let i = 0; i < 50; i++) {
                    await new Promise(resolve => setTimeout(resolve, 100));
                    if (supabaseReady) break;
                }
            }

            if (!supabaseClient) {
                throw new Error('Could not connect to database. Please refresh the page.');
            }

            const formatter = new CartFormatter(cart, customerInfo, orderInfo);
            const payload = formatter.buildRPCPayload();

            console.log('Sending to Supabase:', payload);

            const { data, error } = await supabaseClient.rpc('create_complete_order', payload);

            if (error) {
                console.error('Supabase error:', error);
                throw error;
            }

            return {
                success: true,
                orderID: data
            };
        } catch (error) {
            console.error('Error:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }