// <!-- <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta http-equiv="X-UA-Compatible" content="IE=edge">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Document</title>
// </head>
// <body>
//     <h1>MEDIUM</h1>

//     <script src="./app.js"></script>
// </body>
// </html> -->

// <!-- views/home.ejs -->
// <!DOCTYPE html>
// <html>
//   <head>
//     <title>Medium Clone</title>
//     <link rel="stylesheet" href="/stylesheets/style.css" />
//   </head>
//   <body>
//     <header>
//       <h1>Medium Clone</h1>
//     </header>
//     <main>
//       <!-- <h2>Recent Articles</h2> -->
//       <h2>Recent Articles</h2>
//       <ul>
//         <% articles.forEach(function(article) { %>
//         <li>
//           <h3><a href="/articles/<%= article._id %>"><%= article.title %></a></h3>
//           <p><%= article.content.substring(0, 100) %>...</p>
//           <p><em>By <%= article.author %> on <%= article.createdAt.toDateString() %></em></p>
//         </li>
//         <% }); %>
//       </ul>
//       <a href="/articles/new">Create New Article</a>
//     </main>
//     <footer>
//       <!-- <p>&copy; 2023 Medium Clone</p> -->
//       <p>&copy; 2023 Medium Clone</p>
      

//     </footer>
//   </body>
// </html>
const express=require('express');

const app=express();

const path=require('path');

const methodOverride=require('method-override');

const articles=require('./models/main_article');

const mongoose=require('mongoose');

mongoose.connect('mongodb://127.0.0.1:5000/Articles').then(()=>console.log("DB connected"));



const port=5000;

app.use(express.urlencoded({extended:true}));

app.use(methodOverride('_method'));

app.set('view engine','ejs');

app.set('views',path.join(__dirname,'views'));


app.listen(port,()=>console.log('The server is running on port',port));

app.get('/',async(req,res)=>{
  
    const blogging= await articles.find();

    res.render('index',{blogging});
})

app.get('/articles/new',(req,res)=>{

    res.render('add');

});


// app.post('/articles',async(req,res)=>{
//     const {title,description,content}=req.body;
//     const d=new Date().toLocaleString();
//     await articles.create({title, d, description,  content});
//     res.redirect('./');
// })

app.get('/articles/edit/:id',async(req,res)=>{

    const {id}=req.params;

    const arti=await articles.findById(id);

    res.render('edit',{arti});
})

app.post('/articles',async(req,res)=>{

  const {title,description,content}=req.body;

  const dt=new Date().toLocaleString();
  await articles.create({title, dt, description,  content});

  res.redirect('./');
})

app.get('/articles/show/:id',async(req,res)=>{

    const {id}=req.params;

    const blogging=await articles.findById(id);

    res.render('show',{blogging});
})




app.put('/articles/:id',async(req,res)=>{

    const {id}=req.params;

    const da=new Date().toLocaleString();
    const {title,description,content}=req.body;
    await articles.findByIdAndUpdate(id,{title,da,description,content});
    res.redirect('/article/');
})

// app.get('/articles/show/:id',async(req,res)=>{
//     const {id}=req.params;
//     const blog=await articles.findById(id);
//     res.render('show',{blog});
// })

app.delete('/articles/:id',async(req,res)=>{

    const {id}=req.params;

    await articles.findByIdAndDelete(id);

    res.redirect('/');

})
