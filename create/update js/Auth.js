// js/auth.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://vfwstxeupbqasjskbxrh.supabase.co'
// FIX: Make sure this uses the Number 0 after R37, not the Letter O
const supabaseKey = 'sb_publishable_R370Wh5pGdZRVkZRxMTa3g_2k0ITHy5' 
const supabase = createClient(supabaseUrl, supabaseKey)

const loginForm = document.getElementById('login-form');

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Attempt to sign in
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            // This will tell you if the user doesn't exist or password is wrong
            alert("Login Failed: " + error.message);
        } else {
            alert("Success! Going to Dashboard...");
            window.location.href = 'dashboard.html';
        }
    });
}

