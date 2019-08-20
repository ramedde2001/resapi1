const sq = require('sqlite3')
const path = require('path');

const dirname=process.env.PATH
var db = new sq.Database("./test.db3",(err)=>{
	if(err)
	{
		console.log(err)
	}
	
});
db.run(" CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT,email TEXT,pasword TEXT,username Text,phone Text);")
db.run(" CREATE TABLE IF NOT EXISTS voitures (id INTEGER PRIMARY KEY AUTOINCREMENT,id_user INTEGER,kilimetrage TEXT,model TEXT,marque TEXT,anner INTEGER,pris INTEGER);")
function getusers()
{
	users=[]
	db.all("select * from users;",(err, rows ) => {
		if(err)
			console.log("err")
		else
			users=rows
	})
    return users// process rows here    
}
function getuser( id ,callback)
{
	
	db.all("select * from users WHERE id =?;",[id],(err, rows ) => {
		if(err)
			console.log(err)
		else
		{
			
			callback(rows)
		}
	})
      
}


function addvoiture(id_user,marque,anner,pris,callback)
{
db.run( 'INSERT INTO voitures (id_user,marque,anner,pris) VALUES (?,?,?,?);',[id_user,marque,anner,pris],function(err){callback(err,this.lastID)

});
	
}
function getvoiture(callback)
{
	db.all("select voitures.id ,voitures.marque,voitures.anner,voitures.pris ,users.email,users.username from voitures INNER JOIN users ON voitures.id_user=users.id;",(err,rows)=>
	{if(err)
		console.log(err)
	else
		callback(rows)
	console.log(rows)
		
	})
}

	
function isvalidepasword(username,pasword,isvalid)
{

	db.all("select * from users WHERE username=? AND pasword=?;",[username,pasword],(err, rows ) => {
		if(err)
		{	console.log(err)
		
		}
		else
		{
			if(rows.length>0)
		 isvalid(rows.length>0,rows[0].id)
	
		}
		
	})
	
	
}
	


  function adduser(usernam,pasword,email,phone,callback)
{

	db.run( 'INSERT INTO users (username,pasword,email,phone) VALUES (?,?,?,?);',[usernam,pasword,email,phone],(err)=>callback(err));
}
module.exports.getvoiture=getvoiture
module.exports.addvoiture=addvoiture
module.exports.adduser=adduser
module.exports.getusers=getusers
module.exports.getuser=getuser
module.exports.isvalidepasword=isvalidepasword