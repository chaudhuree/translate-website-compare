const catchAsync = require('../../utils/catchAsync');
const sendResponse = require('../../utils/sendResponse');
const { BlogService } = require('./blog.service');
const pick = require('../../utils/pick');

const createBlog = catchAsync(async (req, res) => {
  const { title, image, description, content } = req.body;
  
  const blogData = {
    title,
    image,
    description,
    content,
    authorId: req.user.id, // Add the current user as author
  };

  const result = await BlogService.createBlog(blogData);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Blog created successfully',
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req, res) => {
  const filters = pick(req.query, ['searchTerm', 'title', 'authorId']);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await BlogService.getAllBlogs(filters, options);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Blogs retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getBlogById = catchAsync(async (req, res) => {
  const result = await BlogService.getBlogById(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Blog retrieved successfully',
    data: result,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const { title, image, description, content } = req.body;
  const updateData = {
    title,
    image,
    description,
    content,
  };

  const result = await BlogService.updateBlog(req.params.id, updateData);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Blog updated successfully',
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const result = await BlogService.deleteBlog(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Blog deleted successfully',
    data: result,
  });
});

const BlogController = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};

module.exports = {
  BlogController,
};
