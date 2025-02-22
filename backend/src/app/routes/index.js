const express = require('express');
const router = express.Router();
const userRoutes = require('../modules/user/user.routes');
const productRoutes = require('../modules/product/product.routes');
const categoryRoutes = require('../modules/category/category.routes');
const benchmarkRoutes = require('../modules/benchmark/benchmark.routes');
const blogRoutes = require('../modules/blog/blog.routes');
const brandRoutes = require('../modules/brand/brand.routes');
const ratingRoutes = require('../modules/rating/rating.routes');
const dashboardRoutes = require('../modules/dashboard/dashboard.routes');
const contactRoutes = require('../modules/contact/contact.routes');

const modulesRoutes = [
    {
        path: '/users',
        route: userRoutes
    },
    {
        path: '/products',
        route: productRoutes
    },
    {
        path: '/categories',
        route: categoryRoutes
    },
    {
        path: '/benchmarks',
        route: benchmarkRoutes
    },
    {
        path: '/blogs',
        route: blogRoutes
    },
    {
        path: '/brands',
        route: brandRoutes
    },
    {
        path: '/ratings',
        route: ratingRoutes
    },
    {
        path: '/dashboard',
        route: dashboardRoutes
    },
    {
        path: '/contacts',
        route: contactRoutes
    }
];

modulesRoutes.forEach(route => {
    router.use(route.path, route.route);
});

module.exports = router;
