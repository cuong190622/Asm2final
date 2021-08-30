
const  EXPRESS = require('express')
const APP = EXPRESS()
const {} = require('mongodb');

const { insertfuntion,Deletefuntion,Showall,getToyById,update} = require('./databaseHandler');

APP.use(EXPRESS.urlencoded({extended:true}))
APP.set('view engine','hbs')
APP.use(EXPRESS.static('public'))
APP.post('/insert' , async (req,res)=>{
    const nameInput = req.body.txtName;   
    //laytubenindexhbs
    const priceInput = req.body.txtPrice;
   
    const imgInput = req.body.Imageurl;

        const newToy = {name:nameInput,price:priceInput,image:imgInput };
        await insertfuntion(newToy);
        res.redirect('/');
    
    
    
      

})

    


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


APP.get('/delete',async (req,res)=>{
    const idInput = req.query.id;
    await Deletefuntion(idInput);
    res.redirect('/');
})

 

APP.get('/',async (req,res)=>{

    const allToys = await Showall();
    res.render('index',{data:allToys})
})

const PORT = process.env.PORT || 5000;
APP.listen(PORT);




