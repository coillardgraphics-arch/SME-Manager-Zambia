// js/dashboard.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://vfwsixeupbqasjskbxrh.supabase.co'
const supabaseKey = 'sb_publishable_R370Wh5pGdZRvKZrx1Ta8g_2kQIThyS'
const supabase = createClient(supabaseUrl, supabaseKey)

let userId = null

// Check if user is logged in
async function checkUser() {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
        window.location.href = 'login.html'
    } else {
        userId = session.user.id
        loadSummary()
    }
}

checkUser()

// ADD SALE
const saleForm = document.getElementById('sale-form')
if (saleForm) {
    saleForm.addEventListener('submit', async (e) => {
        e.preventDefault()
        const item = document.getElementById('item').value
        const quantity = parseFloat(document.getElementById('quantity').value)
        const amount = parseFloat(document.getElementById('amount').value)

        const { error } = await supabase
            .from('sales')
            .insert([{ user_id: userId, item_name: item, quantity, amount, date: new Date() }])

        if (error) {
            alert('Error adding sale: ' + error.message)
        } else {
            saleForm.reset()
            loadSummary()
        }
    })
}

// ADD EXPENSE
const expenseForm = document.getElementById('expense-form')
if (expenseForm) {
    expenseForm.addEventListener('submit', async (e) => {
        e.preventDefault()
        const category = document.getElementById('category').value
        const amount = parseFloat(document.getElementById('expense-amount').value)

        const { error } = await supabase
            .from('expenses')
            .insert([{ user_id: userId, category, amount, date: new Date() }])

        if (error) {
            alert('Error adding expense: ' + error.message)
        } else {
            expenseForm.reset()
            loadSummary()
        }
    })
}

// LOAD SUMMARY
async function loadSummary() {
    const { data: sales, error: salesError } = await supabase
        .from('sales')
        .select('*')
        .eq('user_id', userId)

    const { data: expenses, error: expenseError } = await supabase
        .from('expenses')
        .select('*')
        .eq('user_id', userId)

    if (salesError || expenseError) {
        console.log('Error loading summary', salesError, expenseError)
        return
    }

    const totalSales = sales.reduce((sum, s) => sum + parseFloat(s.amount), 0)
    const totalExpenses = expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0)
    const profit = totalSales - totalExpenses

    document.getElementById('total-sales').textContent = totalSales.toFixed(2)
    document.getElementById('total-expenses').textContent = totalExpenses.toFixed(2)
    document.getElementById('profit').textContent = profit.toFixed(2)
}
