// js/auth.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://vfwsixeupbqasjskbxrh.supabase.co'
const supabaseKey = 'sb_publishable_R370Wh5pGdZRvKZrx1Ta8g_2kQIThyS'
const supabase = createClient(supabaseUrl, supabaseKey)

// REGISTER
const registerForm = document.getElementById('register-form')
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault()
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        const { user, error } = await supabase.auth.signUp({ email, password })
        const msg = document.getElementById('register-message')
        if (error) {
            msg.textContent = error.message
        } else {
            msg.style.color = 'green'
            msg.textContent = 'Account created! Please check your email to confirm.'
        }
    })
}

// LOGIN
const loginForm = document.getElementById('login-form')
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault()
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        const { user, error } = await supabase.auth.signInWithPassword({ email, password })
        const msg = document.getElementById('login-message')
        if (error) {
            msg.textContent = error.message
        } else {
            window.location.href = 'dashboard.html'
        }
    })
}

// LOGOUT
const logoutBtn = document.getElementById('logout-btn')
if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
        await supabase.auth.signOut()
        window.location.href = 'login.html'
    })
}
