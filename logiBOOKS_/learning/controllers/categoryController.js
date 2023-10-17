const {Category} = require('../models')
const asyncHandle = require('../middleware/asyncHandle')
const { errorHandler } = require('../middleware/errorMiddleware')

module.exports = {
    getAllCategory : async (req, res) => {
        try {
        const data = await Category.findAll()

            const result = {
                status: 'success',
                data: data
            }
            res.json(result)

        } catch (error) {
            return res.status(400).json({
                status: 'Failed',
                error
            })
        }
    },

    getAllCategoryById : async (req, res) => {
        try{
            const{id} = req.params

            const data = await Category.findByPk(id)
            if (data === null) {
                return res.status(400).json({
                    status: 'Failed',
                    message: `data category with id ${id} not found`
                })
            }
            res.json({
                status: 'SUCCESS',
                data: data
            })
        }catch(err){
            console.log(err, '<<< error find category by id')
        }
    },

    storeCategory : asyncHandle ( async (req, res) => { 
        let {name, description} = req.body;

        const newCategory = await Category.create(
            { 
                name, 
                description
            }
        );
        res.status(201).json({
            status: "success",
            data:newCategory
        })
    }),

    updateCategory : asyncHandle ( async (req, res) => {

            const id = req.params.id;
            await Category.update(req.body, {
                where: {
                id: id
                }
            });

            const newCategory = await Category.findByPk(id);
            if (!newCategory){
                res.status(404);
                throw new Error("category not found")
            }

            return res.status(200).json({
                status:'Success',
                data: newCategory
            })
    }),

    deleteCategory : async (req, res) => {
        try {
            const id = req.params.id
            const CategoryId = await Category.findByPk(id);

            if (!CategoryId){
                return res.status(404).json({
                    status: 'Failed',
                    message:`Delete category id ${id} not found`
                })
            }
            await Category.destroy({
                where: {
                    id
                }
            });

            return res.status(200).json({
                status:'Success',
                data: CategoryId
            })
        } catch (error) {
            return res.status(400).json({
                status: 'Failed',
                error: error.errors
            })
        }
    }
}