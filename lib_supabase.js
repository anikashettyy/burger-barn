require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const url = process.env.SUPABASE_URL;
const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY;
const secretKey = process.env.SUPABASE_SECRET_KEY;

if (!url || !publishableKey || !secretKey) {
  console.warn('Supabase environment variables are not fully configured.');
}

const supabase = url && publishableKey ? createClient(url, publishableKey, {
  auth: { persistSession: false, autoRefreshToken: false }
}) : null;

const supabaseAdmin = url && secretKey ? createClient(url, secretKey, {
  auth: { persistSession: false, autoRefreshToken: false }
}) : null;

module.exports = { supabase, supabaseAdmin };
