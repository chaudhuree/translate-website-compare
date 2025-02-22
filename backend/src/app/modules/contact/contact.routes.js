const express = require('express');
const { ContactController } = require('./contact.controller');
const auth = require('../../middlewares/auth');
const { RoleEnum } = require('@prisma/client');

const router = express.Router();

// Public route - anyone can submit a contact form
router.post('/create-contact', ContactController.createContact);

// Protected routes (Admin only)
router.get('/', auth(RoleEnum.ADMIN), ContactController.getAllContacts);
router.get('/:id', auth(RoleEnum.ADMIN), ContactController.getContactById);
router.patch('/:id', auth(RoleEnum.ADMIN), ContactController.updateContact);
router.delete('/:id', auth(RoleEnum.ADMIN), ContactController.deleteContact);

module.exports = router;
