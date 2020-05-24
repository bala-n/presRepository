angular.module('app').controller('visitsCtrl', ['$scope', '$http', function($scope, $http){
   
    initFn();
    var editFlag=false;
    var patDet={};
    var tmpPatID="";
    $scope.presList=[];
    function initFn(){
        $http.get('http://localhost:1111/api/v1/visit/getPatientVisits').then(successCallback, errorCallback);
        function successCallback(response){
            $scope.formatData(response);
        }
        function errorCallback(error){
            console.log(error);
        }   
    }

    $scope.getVisitsByID=function(){
    	if($scope.id==""){
    		initFn();
    	}
    	else{
    	var url='http://localhost:1111/api/v1/visit/getPatientVisit?id='+$scope.id;
    	$http.get(url).then(successCallback, errorCallback);
        function successCallback(response){
        	//$scope.visitData = [];
        	//$scope.visitData.push(response.data.data)
            $scope.formatData(response);
        }
        function errorCallback(error){
            console.log(error);
        }   
        }
    }
    
    
   
    	
    $scope.Add = function () {
        //Add the new item to the Array.
        var presRec = {};
        presRec.tabName = $scope.visCtrl.tabName;
        presRec.mQty = $scope.visCtrl.mQty;
        presRec.aQty = $scope.visCtrl.aQty;
        presRec.nQty = $scope.visCtrl.nQty;
        $scope.presList.push(presRec);

        //Clear the TextBoxes.
        $scope.tabName = "";
        $scope.mQty = "";
        $scope.aQty = "";
        $scope.nQty = "";
        
    };

    $scope.Remove = function (index) {
        //Find the record using Index from Array.
        var name = $scope.presList[index].tabName;
        if (window.confirm("Do you want to delete: " + name)) {
            //Remove the item from Array using Index.
            $scope.presList.splice(index, 1);
        }
    }
    
    $scope.formatData = function(response){
    	$scope.visitData = [];
    	angular.forEach(response.data.data,function(data){
        	$scope.visitData.push(data);
        	//$scope.patData['firstName']=data.patFirstName;
        	//$scope.patData['lastName']=data.patLastName;
        	//$scope.patID.push(data.patID);
        	//$scope.firstName.push(data.patFirstName);
            //$scope.lastName.push(data.patLastName);
        })
    }

            
    function formatDate(d){
    	var date= d.getDate();
    	var month=d.getMonth()+1;
    	var year=d.getFullYear();
    	if (date<10){
    		date="0"+date;
    	}
    	if (month<10){
    		month="0"+month;
    	}
    	
    	return date+"-"+month+"-"+year;
    }
    
    function GetFormattedDate(d) {
    	if(d!=""){
  		var res = d.split("-");
  			return res[1]+"/"+res[0]+"/"+res[2];
     	}
    	else{
    		return "";
    	}
     
    }
    
    
    //In case of edit Patient, populate form with Visit data
    $scope.editVisit = function(visitRecd){
    	console.log(visitRecd);
    	
    	$scope.tmpPatID=visitRecd.patID;
    	$scope.visCtrl.patID=visitRecd.patID;
        $scope.visCtrl.patFirstName = visitRecd.patFirstName;
        if(visitRecd.patLastName!="" || typeof visitRecd.patLastName != "undefined"){
        	$scope.visCtrl.patLastName = visitRecd.patLastName;
        }
        
        if(visitRecd.visitDate!="" || typeof visitRecd.visitDate != "undefined"){
    		$scope.visCtrl.visitDate=new Date(GetFormattedDate(visitRecd.visitDate));
        }
        //process presList from Json Array     
        $scope.presList=[];
        angular.forEach(visitRecd.presList,function(data){
        	$scope.presList.push(data);
        })
        $scope.editFlag=true;
     }
    
    $scope.formatMedData = function(response){
    	$scope.medData = [];
    	angular.forEach(response.data.data,function(data){
        	$scope.medData.push(data);
        })
    }

    $scope.resetform = function(){
		$scope.editFlag=false;
		$scope.presList=[];
    }
    
    //getPatientBy ID to get patient details.
    $scope.getPatientByID=function(id,dataObj){
    	var url='http://localhost:1111/api/v1/patient/getPatient?id='+id;
    	$http.get(url).then(successCallback, errorCallback);
        function successCallback(response){
        	console.log(response.data.data);
        	$scope.patDet=response.data.data;
        	console.log($scope.patDet);
        	dataObj["patFirstName"] =$scope.patDet.patFirstName;
    		dataObj["patLastName"] =$scope.patDet.patLastName;
    		$http.post("http://localhost:1111/api/v1/visit/addPatientVisit", dataObj).then(successCallback, errorCallback);
    		function successCallback(response){
		            console.log(response);
		            $scope.visCtrl.patFirstName = "";
		            $scope.visCtrl.patLastName = "";
		            $scope.visCtrl.visitDate = "";
		            $scope.patDet={};
		    	}
    	 		function errorCallback(error){
    	 			console.log(error);
    	 		}
    	  	}
        function errorCallback(error){
        	console.log("HelloWorld");
        	console.log(error);
        }   
     }

    
    
   //Create and Edit Function Submission 
    $scope.createVisit = function(data){
        
    	var dataObj ={};
    	
    	
    	if($scope.editFlag==true){
    		dataObj["patID"] =$scope.tmpPatID;
    		dataObj["patFirstName"] =$scope.visCtrl.patFirstName;
        	dataObj["patLastName"] =$scope.visCtrl.patLastName;
        	dataObj["visitDate"]= formatDate($scope.visCtrl.visitDate);
        	dataObj["presList"]=$scope.presList;
        	$http.post("http://localhost:1111/api/v1/visit/updateVisit", dataObj).then(successCallback, errorCallback);
    		$scope.editFlag=false;
    		function successCallback(response){
                console.log(response);
                $scope.visCtrl.patFirstName = "";
                $scope.visCtrl.patLastName = "";
                $scope.visCtrl.visitDate = "";
                $scope.patDet={};
             	}
            function errorCallback(error){
                console.log(error);
            }
    	}else{
    		dataObj["patID"] =$scope.visCtrl.patID;
    		dataObj["visitDate"]= formatDate($scope.visCtrl.visitDate);
        	dataObj["presList"]=$scope.presList;
    		$scope.getPatientByID($scope.visCtrl.patID,dataObj);
    		
    		//dataObj["patFirstName"] =$scope.patDet.patFirstName;
    		//dataObj["patLastName"] =$scope.patDet.patLastName;
    	}
    	
    	//dataObj["patFirstName"] =$scope.visCtrl.patFirstName;
    	//dataObj["patLastName"] =$scope.visCtrl.patLastName;
    	/*dataObj["visitDate"]= formatDate($scope.visCtrl.visitDate);
    	dataObj["presList"]=$scope.presList;
    	
    	
    	if($scope.editFlag==true){
    		$http.post("http://localhost:1111/api/v1/visit/updateVisit", dataObj).then(successCallback, errorCallback);
    		$scope.editFlag=false;
    	}else{
    	        $http.post("http://localhost:1111/api/v1/visit/addPatientVisit", dataObj).then(successCallback, errorCallback);
    	}
    	 function successCallback(response){
            console.log(response);
            $scope.visCtrl.patFirstName = "";
            $scope.visCtrl.patLastName = "";
            $scope.visCtrl.visitDate = "";
            $scope.patDet={};
            
        }
        function errorCallback(error){
            console.log(error);
        }*/
    }

    
}]);