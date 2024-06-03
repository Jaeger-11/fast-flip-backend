const FlipImages = require('../models/flipImages');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors/custom-error');

const getImages = async (req, res) => {
    const images = await FlipImages.find().select('name imageUrl');
    const getRandomImages = (list, count) => {
        let listCopy = list.slice();
        
        for(let i = listCopy.length - 1; i > 0; i-- ){
            const j = Math.floor(Math.random() * (i + 1));
            [listCopy[i], listCopy[j]] = [listCopy[j], listCopy[i]];
        }

        return listCopy.slice(0, count)
    }
    const shuffled = getRandomImages(images, 8);
    const copy = shuffled.slice()
    const data = [...shuffled, ...copy]
    res.status(200).json({count:data.length,data})
}

const uploadImage = async (req,res) => {
    const { name, imageUrl, category } = req.body;
    if(!name || !imageUrl || !category ){
        throw new CustomError('Required Field Missing', StatusCodes.BAD_REQUEST)
    }
    const image = await FlipImages.create({name, imageUrl, category});
    res.status(200).json({msg: "post successful", image})
}

module.exports = { getImages, uploadImage };