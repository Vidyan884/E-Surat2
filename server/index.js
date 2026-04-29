require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./src/routes/auth.routes');
const suratRoutes = require('./src/routes/surat.routes');
const produkRoutes = require('./src/routes/produk.routes');

const app = express();

app.use(cors());
app.use(express.json());

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/surat-masuk', suratRoutes);
app.use('/api/produk-hukum', produkRoutes);

// Optional: Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!', error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`E-Surat API Server running on port ${PORT}`);
});
