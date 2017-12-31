//SARANYA R 100981198

window.addEventListener('load',function(){
 getHero();
});
//Purpose: Gets the json objects for the menu
//Parameter: json object files as input parameter, outputs option menu bar
function getHero(){ 
  var xhr=new XMLHttpRequest();
	xhr.open("GET","/heroes");
  xhr.addEventListener('load',function(){
		console.log("xhr.responseText: "+xhr.responseText);
		var heroListDic=JSON.parse(xhr.responseText);
    var heroSelector = document.getElementById("HeroSelect");
   //Looping through json objects to add 
    for (var i =0; i < heroListDic.AllFiles.length;i++) {
        var option = document.createElement("option");
        var outString = heroListDic.AllFiles[i]; 
        //Outstriing to remove ".json" and "_" and replace them with " "
        option.value = outString; 
        outString = outString.replace(".json"," ");
        outString = outString.replace(/_/g," ");
        option.text= outString;
       heroSelector.add(option);
    }
    
  });
  xhr.send(); 
  
}
//Purpose: Get data from each json object to be parsed and given an ID
//Parameter: json objects file associated as input and outputs json object's data in relevant fields
function fetchDataForm(){ 
   var xhr=new XMLHttpRequest();
   var heroSelect = document.getElementById("HeroSelect");
   var indexValue = document.getElementById("HeroSelect").options.selectedIndex;
   var jsonPath = document.getElementById("HeroSelect").options[indexValue].value;
   var pathValue = "/heroes/"+jsonPath;
   xhr.open("GET",pathValue);
   xhr.addEventListener('load',function(){
    heroValue =JSON.parse(xhr.responseText);
    //Gets the attributes of the json onject
    document.getElementById('Name').value = heroValue.name;
    document.getElementById('AlterEgo').value = heroValue.alterEgo;
    document.getElementById('Jurisdiction').value = heroValue.jurisdiction;
    document.getElementById('SuperPowers').value = heroValue.superpowers;
    //Sets the style dictionary
    document.getElementById('styleEditor').style.backgroundColor = heroValue.style.backgroundColor;
    document.getElementById('styleEditor').style.color = heroValue.style.color;
    document.getElementById('styleEditor').style.borderColor = heroValue.style.borderColor;
 
   });
   xhr.send();
}
//Purpose: Updates changes by using POST request
//Parameter: takes in field data entered and outputs update json files
function submitForm(){ 
  var post = new XMLHttpRequest();
	var heroSelect = document.getElementById("HeroSelect");
   var indexValue = document.getElementById("HeroSelect").options.selectedIndex;
   var jsonPath = document.getElementById("HeroSelect").options[indexValue].value;
   var pathValue = "/heroes/"+jsonPath;
   var newHeroInfomation = {
     "name": document.getElementById('Name').value,
     "alterEgo": document.getElementById('AlterEgo').value,
     "jurisdiction":document.getElementById('Jurisdiction').value,
     "superpowers":document.getElementById('SuperPowers').value,
     "style":document.getElementById('Style').value
   };
   
   post.open("POST",pathValue);
   post.send(JSON.stringify(newHeroInfomation));
}

