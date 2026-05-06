const dashboardService = require('../services/dashboard.service');

exports.getStats = async (req, res) => {
  try {
    const data = await dashboardService.getDashboardStats();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan saat memuat statistik dashboard', error: error.message });
  }
};
