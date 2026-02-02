// js/dashboard.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://vfwstxeupbqasjskbxrh.supabase.co'
const supabaseKey = 'sb_publishable_R37OWh6pGdZRVkZRxMTa3g_2k0ITHy5' // Use your real key
const supabase = createClient(supabaseUrl, supabaseKey)

async function checkUser() {
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error || !session) {
        // If no session, send them back to login
        console.log("No active session found.");
        window.location.href = 'login.html';
    } else {
        // User is logged in, now load the data
        console.log("User logged in:", session.user.id);
        loadSummary(session.user.id);
        setupEventListeners(session.user.id);
    }
}

// Separate function for listeners so they only activate AFTER login check
function setupEventListeners(userId) {
    const saleForm = document.getElementById('sale-form');
    if (saleForm) {
        saleForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const item = document.getElementById('item').value;
            const quantity = document.getElementById('quantity').value;
            const amount = parseFloat(document.getElementById('amount').value);

            const { error } = await supabase
                .from('sales')
                .insert([{ user_id: userId, item_name: item, quantity, amount, date: new Date() }]);

            if (error) alert('Error: ' + error.message);
            else {
                saleForm.reset();
                loadSummary(userId);
            }
        });
    }
}

async function loadSummary(userId) {
    // Your existing logic to fetch and display totals
    // Ensure you use .eq('user_id', userId) in your queries!
}

// Start the check
checkUser();
