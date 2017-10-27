var app = angular.module('demo',[])
var headers = {
  "app_id"          : "3cae3353",
  "app_key"         : "480b020be1a2671c15645f05dc432d76"
};

var imgurl = "https://www.cdc.gov/family/images/MainBanner.jpg"

app.controller('Hello', function($scope, $http){
  fetch();
  $scope.check1 = function(){
    imgurl = document.getElementById("link").value;
    console.log(imgurl);
    fetch();

  }



  function fetch(){
    var payload  = { "image" : imgurl };
  	var url = "http://api.kairos.com/detect";

  	$http({
      method:'POST',
      url: url,
      headers: headers,
      data: payload,
    }).then(function(response){
      $scope.greeting = response.data;
  		m = response.data;
  		facemap(m);
    })


  }

})

function facemap(m){
	var coordx = [];
	var coordy = [];
	var len = [];
	var gender = [];
	var leng = 0;
	leng = m.images[0].faces.length;
	for (i=0;i<leng;i++){
			coordx.push(m.images[0].faces[i].topLeftX);
			coordy.push(m.images[0].faces[i].topLeftY);
			len.push(m.images[0].faces[i].height);
			gender.push(m.images[0].faces[i].attributes.gender.type);
	}

	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");

	canvas.width = m.images[0].width;
	canvas.height = m.images[0].height;
	canvas.style.background = 'url('+imgurl+')';


	for (i=0;i<gender.length;i++){
		if (gender[i]=="M"){
			gender[i] = "#003cad";
		}else{
			gender[i] = "#c60087"
		}
	}


	for (a=0;a<leng;a++){
		ctx.lineWidth = 4;
		ctx.strokeStyle = gender[a];
		ctx.strokeRect(coordx[a],coordy[a],len[a],len[a]);



	}
}
