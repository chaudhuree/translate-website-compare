const ContactService = require('./contact.service');
const sendResponse = require('../../utils/sendResponse');
const catchAsync = require('../../utils/catchAsync');
const pick = require('../../utils/pick');

const createContact = catchAsync(async (req, res) => {
  const result = await ContactService.createContact(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Contact message sent successfully',
    data: result,
  });
});

const getAllContacts = catchAsync(async (req, res) => {
  const filters = pick(req.query, ['searchTerm', 'status']);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await ContactService.getAllContacts(filters, options);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Contacts retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getContactById = catchAsync(async (req, res) => {
  const result = await ContactService.getContactById(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Contact retrieved successfully',
    data: result,
  });
});

const updateContact = catchAsync(async (req, res) => {
  const result = await ContactService.updateContact(req.params.id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Contact updated successfully',
    data: result,
  });
});

const deleteContact = catchAsync(async (req, res) => {
  const result = await ContactService.deleteContact(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Contact deleted successfully',
    data: result,
  });
});

module.exports.ContactController = {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
};
