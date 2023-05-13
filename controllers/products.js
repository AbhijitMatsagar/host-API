const Product = require('../models/product');

const getAllProducts = async (req, res) => {

    const { company, name, featured, sort, select } = req.query
    const queryObject = {};

    if(company) {
        queryObject.company = company;
    }

    if(name){
        queryObject.name = { $regex : name, $options : "i" };
    }

    if(featured){
        queryObject.featured = featured;
    }

    let apiData = Product.find(queryObject);

    //sorting
    if(sort){
        let sortFix = sort.replace(",", " ");
        apiData = apiData.sort(sortFix);
    }

    //select document by sapacifuc ID
    if(select){
        // let selectFix = select.replace(",", " ");
        let selectFix = select.split(",").join( " " );
        apiData = apiData.select(selectFix);
    }

    //pagination
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 1;
    let skip = (page - 1) * limit;

    apiData = apiData.skip(skip).limit(limit);

    console.log(queryObject);

    const Products = await apiData;
    res.status(200).json({ Products });
}

const getAllProductsTesting = async (req, res) => {
    const myData = await Product.find( req.query );
    res.status(200).json({ myData });
}

module.exports = { getAllProducts, getAllProductsTesting }