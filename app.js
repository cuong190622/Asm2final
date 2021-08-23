
const  EXPRESS = require('express')
const APP = EXPRESS()
const {Int32} = require('mongodb');

const { insertfuntion,Deletefuntion,Search,Showall,getToyById,update} = require('./databaseHandler');

APP.use(EXPRESS.urlencoded({extended:true}))

APP.set('view engine','hbs')

APP.get('/edit',async(req,res)=>{
    const idInput = req.query.id;
    const Search_Toy = await getToyById(idInput);
    res.render('edit',{Toy: Search_Toy })
})

APP.post('/update',async (req,res)=>{
    const id = req.body.id;
    const nameInput = req.body.txtName;
    const priceInput = req.body.txtPrice;
    const imageInput = req.body.Imageurl;
    await update(id,nameInput,priceInput,imageInput);
    res.redirect('/');
})

APP.post('/insert' , async (req,res)=>{
    const nameInput = req.body.txtName;
    //laytubenindexhbs
    const priceInput = req.body.txtPrice;
    const imgInput = req.body.Imageurl;
    var err = {}
    var isError = false;
    if(nameInput == null || nameInput.length <5){
        err.name = "Do dai ten >=5 ky tu!"
        isError = true;
    }
    
    if(isError){
        res.render('index',{error: err})
    }
    if(!isError){
        const newToy = {name:nameInput,price:Int32(priceInput),image:imgInput };
    await insertfuntion(newToy);
    
    //chuyen huong toi file index
    res.redirect('/');
    }
    
    //goitoi app,get o duoi 
    
})


APP.get('/delete',async (req,res)=>{
    const idInput = req.query.id;
    await Deletefuntion(idInput);
    res.redirect('/');
})


APP.post('/Search',async (req,res)=>{

    const SearchInput = req.body.txtSearch ;
    
    const allToys = await Search(SearchInput);
    res.render('index',{data:allToys})
})

APP.get('/',async (req,res)=>{

    const allToys = await Showall();
    res.render('index',{data:allToys})
})

const PORT = process.env.PORT || 5000;
APP.listen(PORT);




