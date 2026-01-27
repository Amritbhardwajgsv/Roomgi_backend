const mongoose=require('mongoose');
require('dotenv').config();
async function main(){
    const dbstring=process.env.database_url;
    await mongoose.connect(dbstring);

}
module.exports=main;