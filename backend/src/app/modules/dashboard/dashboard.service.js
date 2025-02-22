const prisma = require('../../utils/prisma');

const getStatistics = async () => {
  const [
    totalProducts,
    totalBrands,
    totalBenchmarks,
  ] = await Promise.all([
    prisma.product.count(),
    prisma.brand.count(),
    prisma.benchmark.count(),
  ]);

  return {
    totalProducts,
    totalBrands,
    totalBenchmarks,
  };
};

const DashboardService = {
  getStatistics,
};

module.exports = { DashboardService };
