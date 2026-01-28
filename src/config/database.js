require('dotenv').config();
const mongoose=require('mongoose');
async function main(){
    const dbstring=process.env.database_url;
    await mongoose.connect(dbstring);
}
module.exports=main;