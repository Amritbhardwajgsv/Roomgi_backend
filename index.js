const express=require('express');
const app=express();
const main=require('./src/config/database');
app.use(express.json());



main()
.then(async()=>{
    console.log("connected to database")
    app.listen(3000,()=>{
    console.log("listening at port 3000");
    })  

}
)
.catch((err)=>{
    console.log("err")
})