const { DashboardService } = require('./dashboard.service');
const sendResponse = require('../../utils/sendResponse');
const catchAsync = require('../../utils/catchAsync');

const getStatistics = catchAsync(async (req, res) => {
  const result = await DashboardService.getStatistics();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Dashboard statistics retrieved successfully',
    data: result,
  });
});

const DashboardController = {
  getStatistics,
};

module.exports = DashboardController;
