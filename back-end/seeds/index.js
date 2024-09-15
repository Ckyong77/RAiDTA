if (process.env.NODE_ENV !== "production") {
    require('dotenv').config({ path: "../.env" })
}


const mongoose = require('mongoose')
const Product = require('../models/product')
const User = require('../models/user')

const dbURL = process.env.DB_URL;

async function main() {
    await mongoose.connect(dbURL)
}

main()
    .then(() => {
        console.log('database connected!', dbURL)
    })
    .catch((err) => {
        console.log('failed to connected to database', err)
    })

const fruits = [
    {name:"Apple", url:"https://images.pexels.com/photos/206959/pexels-photo-206959.jpeg?auto=compress&cs=tinysrgb&w=600"},
    {name:"Banana",url:"https://images.pexels.com/photos/61127/pexels-photo-61127.jpeg?auto=compress&cs=tinysrgb&w=600"},
    { name:"Orange",url: 'https://images.pexels.com/photos/161559/background-bitter-breakfast-bright-161559.jpeg?auto=compress&cs=tinysrgb&w=600' },
    {name:"Mango",url:'https://images.pexels.com/photos/4955253/pexels-photo-4955253.jpeg?auto=compress&cs=tinysrgb&w=600'},
    {name:"Pineapple",url:'https://images.pexels.com/photos/947878/pexels-photo-947878.jpeg?auto=compress&cs=tinysrgb&w=600'},
    {name:"Grapes",url:'https://images.pexels.com/photos/23042/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600'},
    {name:"Strawberry", url:"https://images.pexels.com/photos/1258264/pexels-photo-1258264.jpeg?auto=compress&cs=tinysrgb&w=600"},
    {name:"Watermelon",url:"https://images.pexels.com/photos/1178652/pexels-photo-1178652.jpeg?auto=compress&cs=tinysrgb&w=600"},
    {name:"Peach",url:"https://images.pexels.com/photos/209416/pexels-photo-209416.jpeg?auto=compress&cs=tinysrgb&w=600"},
    {name:"Cherry",url:"https://images.pexels.com/photos/162689/cherry-pair-fruits-sweet-162689.jpeg?auto=compress&cs=tinysrgb&w=600"}];

const seedDB = async () => {
    await Product.deleteMany()
    for (let i = 0; i < fruits.length; i++) {
        console.log(i)
        let price = (1 + Math.random() * 5).toFixed(2);
        let stock = Math.floor(1 + Math.random() * 50);
        let name = fruits[i].name;
        let image = fruits[i].url;
        const newProd = new Product({
            name: name,
            price: price,
            stock: stock,
            image: image
        })
        await newProd.save()
        console.log(newProd, 'saved!')
    }
    const password = "admin"
    const newUser = await new User({username: 'admin', firstName:'Admin', lastName:'A', isAdmin:true})
    await User.register(newUser, password)
}

seedDB()
    .then(() => {
        mongoose.connection.close()
        console.log('seed data all updated and saved. Goodbye!')
    })