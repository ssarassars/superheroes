//Saranya R 100981198

//A simple server that listens on the provided port and responds with requested files
//Updated to create HEROES objects

// load necessary modules
var http = require('http');
var fs = require('fs');
var mime = require('mime-types');
var url = require('url');
const ROOT = "./public_html";
// create http server
var server = http.createServer(handleRequest); //already async
server.listen(2406);


console.log('Server Listening On Port 2406');

function handleRequest(req, res) {
	//process the request
	console.log(req.method+" request for: "+req.url);
	//parse the url
	var urlObj = url.parse(req.url,true);
	var filename = ROOT+urlObj.pathname;
	if(urlObj.pathname==="/heroes"){
		if(req.method==="GET"){
      var arrHeroesName = [];
      fs.readdir(filename,function(err, files){
   files.forEach(function(file){
          arrHeroesName.push(file);
        });
   var listHeroes ={
              AllFiles:arrHeroesName
            };
   filename = ".json";  
        respond(200,JSON.stringify(listHeroes));
      });
      
		}else{
			respond(501,"Method not implemented");
		}
		
	} else if(filename.endsWith(".json")){ 
      if(req.method==="GET"){
          
      var stats = fs.stat(filename,function(err, stats){
			if(err){  
				serve404();
			}else{
				fs.readFile(filename,"utf8",function(err, data){
					if(err) { 
            serve404();
					}else { 
     var heroInfo = JSON.parse(data);
           filename = ".json"; 
           respond(200,JSON.stringify(heroInfo));
          }
				});
			}
		});
      }else if(req.method==="POST"){ 
       var heroData="";
    req.setEncoding('utf8');
        req.on('data',function(data){			
          heroData+=data;     
        });
        req.on('end',function(){	
	var heroInformation = JSON.parse(heroData);
	respond(200);
        fs.writeFile(filename,JSON.stringify(heroInformation));
			});	   
      }else{ 
        respond(501,"Method not implemented");
      }
  }else{	
		//the callback sequence for static serving...	
    var stats = fs.stat(filename,function(err, stats){
			if(err){   //try and open the file and handle the error, handle the error
				serve404();
			}else{
        if(stats.isDirectory()){
          filename += "index.html";
          console.log(req.method+" request for: "+filename);
        }      
          fs.readFile(filename,"utf8",function(err, data){
            if(err)serve404();
            else respond(200,data);
          });
			}
		});			
	}
	//locally defined helper function
	//serves 404 files 
	function serve404(){
		fs.readFile(ROOT+"/404.html","utf8",function(err,data){
			if(err)respondErr(err);
			else respond(404,data);
		});
	}
	//locally defined helper function
	//responds in error, and outputs to the console
	function respondErr(err){
		respond(500,null);
		console.error(err.stack);
	}
		
	//locally defined helper function
	//sends off the response message
	function respond(code, data){
		// content header
		res.writeHead(code, {'content-type': mime.lookup(filename)|| 'text/html'});
		res.end(data);
	}	
	
};//end handle request




