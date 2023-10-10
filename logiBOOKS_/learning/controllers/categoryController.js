const {Category} = require('../models')

exports.getAllCategory = async (req, res) => {
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
}

exports. getAllCategoryById = async (req, res) => {
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
}

exports.storeCategory = async (req, res) => { 
    try {
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
   } catch (error) {
        return res.status(400).json({
            status: 'Failed',
            error: error.errors
        })
   }
}

exports.updateCategory = async (req, res) => {
    try {
        const id = req.params.id
        await Category.update(req.body, {
            where: {
            id: id
            }
        });

        const newCategory = await Category.findByPk(id);

        if(!newCategory) {
            return res.status(404).json(
                {
                    status:'Failed',
                    message: 'Category not found'
                })
        }

        return res.status(200).json({
            status:'Success',
            data: newCategory
        })

    } catch (error) {
        return res.status(500).json({
            status: 'Failed',
            error: "server down"
        })
    }
}

exports.deleteCategory = async (req, res) => {
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
