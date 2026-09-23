const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const productsRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');
const ordersRoutes = require('./routes/orders');
const cateringRoutes = require('./routes/catering');
const adminRoutes = require('./routes/admin');
const { supabaseAdmin } = require('./lib_supabase');

const app = express();
const PORT = Number(process.env.PORT || 5000);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'burger-barn.html')));
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'admin.html')));

app.get('/api/health', async (req, res) => {
  if (!supabaseAdmin) return res.status(500).json({ success:false, message:'Supabase is not configured.' });
  const { error } = await supabaseAdmin.from('products').select('id').limit(1);
  if (error) return res.status(500).json({ success:false, message:error.message });
  res.json({ success:true, message:'Burger Barn backend and Supabase are connected.' });
});

app.use('/api/products', productsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/catering', cateringRoutes);
app.use('/api/admin', adminRoutes);

// Vercel runs this file as a serverless function per request and imports
// the exported app directly — it should not also open its own port.
if (!process.env.VERCEL) {
  app.listen(PORT, () => console.log(`Burger Barn backend running at http://localhost:${PORT}`));
}

module.exports = app;
