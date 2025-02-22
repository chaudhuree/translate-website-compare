const { PrismaClient } = require('@prisma/client');
const calculatePagination = require('../../utils/calculatePagination');
const prisma = new PrismaClient();

const createContact = async (data) => {
  const result = await prisma.contact.create({
    data,
  });
  return result;
};

const getAllContacts = async (filters, options) => {
  const { page, limit, skip } = calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: ['name', 'email', 'subject', 'message'].map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: filterData[key],
        },
      })),
    });
  }

  const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.contact.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: options.sortBy && options.sortOrder
      ? { [options.sortBy]: options.sortOrder }
      : { createdAt: 'desc' },
  });

  const total = await prisma.contact.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getContactById = async (id) => {
  const result = await prisma.contact.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateContact = async (id, data) => {
  const result = await prisma.contact.update({
    where: {
      id,
    },
    data,
  });
  return result;
};

const deleteContact = async (id) => {
  const result = await prisma.contact.delete({
    where: {
      id,
    },
  });
  return result;
};

module.exports = {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
};
