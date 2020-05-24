angular.module('app').controller('patientsCtrl', ['$scope', '$http', function($scope, $http){
   
    initFn();
    var editFlag=false;
    var tmpPatID="";
    function initFn(){
        $http.get('http://localhost:1111/api/v1/patient/getPatients').then(successCallback, errorCallback);
        function successCallback(response){
            $scope.formatData(response);
        }
        function errorCallback(error){
            console.log(error);
        }   
    }

    $scope.getPatientByID=function(){
    	if($scope.id==""){
    		initFn();
    	}
    	else{
    	var url='http://localhost:1111/api/v1/patient/getPatient?id='+$scope.id;
    	$http.get(url).then(successCallback, errorCallback);
        function successCallback(response){
        	$scope.patData = [];
        	$scope.patData.push(response.data.data);
            //$scope.formatData(response);
        }
        function errorCallback(error){
            console.log(error);
        }   
        }
    }
    	
    
    $scope.formatData = function(response){
    	$scope.patData = [];
    	angular.forEach(response.data.data,function(data){
        	$scope.patData.push(data);
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
    
    
    
    //In case of edit Patient, populate form with Patient data
    $scope.editPatient = function(patRecd){
    	console.log(patRecd);
    	$scope.tmpPatID=patRecd.patID;
        $scope.patCtrl.patFirstName = patRecd.patFirstName;
        if(patRecd.patLastName!="" || typeof patRecd.patLastName != "undefined"){
        	$scope.patCtrl.patLastName = patRecd.patLastName;
        }
        $scope.patCtrl.patMobile = patRecd.patMobile;
        $scope.patCtrl.patGender = patRecd.patGender;
    	if(patRecd.patDOB!="" || typeof patRecd.patDOB != "undefined"){
    		$scope.patCtrl.patDOB=new Date(GetFormattedDate(patRecd.patDOB));
        }
    	if(patRecd.patFirstVisit!="" || typeof patRecd.patFirstVisit != "undefined"){
        $scope.patCtrl.patFirstVisit=new Date(GetFormattedDate(patRecd.patFirstVisit));
    	}
    	if(typeof patRecd.patHealthStat != "undefined"){
    		if(patRecd.patHealthStat.diabeticFlag!="" ){	
    	    				$scope.patCtrl.diabeticFlag=patRecd.patHealthStat.diabeticFlag;
    		}
    	}
    	if(typeof patRecd.patHealthStat != "undefined"){
    		if(patRecd.patHealthStat.bloodPressure!=""){
    			$scope.patCtrl.bloodPressure=patRecd.patHealthStat.bloodPressure;	
    		}
    	}
        $scope.editFlag=true;
     }
    
    $scope.formatMedData = function(response){
    	$scope.medData = [];
    	angular.forEach(response.data.data,function(data){
        	$scope.medData.push(data);
        })
    }

    
   //Create and EditFunction Submission 
    $scope.createPatient = function(data){
        
    	var dataObj ={};
    	var patHealthStat={};
    	if($scope.editFlag=true){
    		dataObj["patID"] =$scope.tmpPatID;
    	}
    	
    	dataObj["patFirstName"] =$scope.patCtrl.patFirstName;
    	dataObj["patLastName"] =$scope.patCtrl.patLastName;
    	dataObj["patMobile"]=$scope.patCtrl.patMobile;
    	dataObj["patGender"]= $scope.patCtrl.patGender;
    	dataObj["patDOB"]= formatDate($scope.patCtrl.patDOB);
    	dataObj["patFirstVisit"]= formatDate($scope.patCtrl.patFirstVisit);
    	
    	if(typeof $scope.patCtrl != "undefined"){
    		if($scope.patCtrl.diabeticFlag !="" ){	
    			patHealthStat["diabeticFlag"]=$scope.patCtrl.diabeticFlag;
    			
    		}
    	}
    	if(typeof $scope.patCtrl != "undefined"){
    		if($scope.patCtrl.bloodPressure!=""){
    			patHealthStat["bloodPressure"]= $scope.patCtrl.bloodPressure;
    		}
    	}
    	
    	dataObj["patHealthStat"]=patHealthStat;
    	
    	if($scope.editFlag==true){
    		$http.post("http://localhost:1111/api/v1/patient/updatePatient", dataObj).then(successCallback, errorCallback);
    		$scope.editFlag=false;
    	}else{
    	        $http.post("http://localhost:1111/api/v1/patient/addPatient", dataObj).then(successCallback, errorCallback);
    	}
    	 function successCallback(response){
            console.log(response);
            $scope.patCtrl.patFirstName = "";
            $scope.patCtrl.patLastName = "";
            $scope.patCtrl.patMobile = "";
            $scope.patCtrl.patGender = "";
            $scope.patCtrl.patDOB = "";
            $scope.patCtrl.patFirstVisit = "";
            $scope.patCtrl.diabeticFlag = "";
            $scope.patCtrl.bloodPressure = "";
           
        }
        function errorCallback(error){
            console.log(error);
        }
    }

    
}]);