const Category = require("../models/category");

async function index(req,res) {
    const categories = await Category.getAllCategories();
    res.render('categories/index', {title: 'Categories', categories})
}

async function show (req,res) {
    const category = await Category.getCategoryById(req.params.id);
    if (!category) return res.status(404).send('Not found');
    res.render('categories/show', { title: category.name, category });
}

async function newForm (req,res) {
    res.render('categories/new', {title: 'New category'});
}

async function editForm (req,res) {
     const category = await Category.getCategoryById(req.params.id);
    if (!category) return res.status(404).send('Not found');
    res.render('categories/edit', { title: 'Edit Category', category });
}

async function update (req,res) {
    const { name, description } = req.body;
    await Category.updateCategory(req.params.id, name, description || null);
    res.redirect('/categories/' + req.params.id);
}

async function destroy (req,res) {
    await Category.deleteCategory(req.params.id);
    res.redirect('/categories');
}

async function create(req, res) {
    const { name, description } = req.body;
    await Category.createCategory(name, description || null);
    res.redirect('/categories');
}


module.exports = {
    index,
    show,
    newForm,
    editForm,
    update,
    destroy,
    create
}