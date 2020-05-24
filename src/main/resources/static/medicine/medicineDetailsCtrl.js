angular.module('app').controller('medicineCtrl', ['$scope', '$http', function($scope, $http){
	initFn();
	$scope.editFlag=false;
	var medRecd={};
    function initFn(){
        //$http.get('https://reqres.in/api/users?page=2').then(successCallback, errorCallback);
    	$http.get('http://localhost:1111/api/v1/medicine/getMedicines').then(successCallback, errorCallback);
        function successCallback(response){
            $scope.formatMedData(response);
        }
        function errorCallback(error){
            console.log(error);
        }   
    }

    $scope.getMedicineByID=function(){
    	if($scope.drugid=="" || typeof $scope.drugid == "undefined"){
    		initFn();
    	}
    	else{
    	var url='http://localhost:1111/api/v1/medicine/getMedicine?id='+$scope.drugid;
    	$http.get(url).then(successCallback, errorCallback);
        function successCallback(response){
        	$scope.medData = [];
        	$scope.medData.push(response.data.data)
            //$scope.formatData(response);
        }
        function errorCallback(error){
            console.log(error);
        }   
        }
    }
    
    //In case of edit Medicine, populate form with medicine data
    $scope.editMedicine = function(medRecd){
    	console.log(medRecd);
        $scope.medCtrl.drugName = medRecd.drugName;
        $scope.medCtrl.drugDescription = medRecd.drugDescription;
        $scope.medCtrl.drugManufacturer = medRecd.drugManufacturer;
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
    }
    
    $scope.createMedicine = function(data){
        
    	var dataObj ={};
    	
    	dataObj["drugName"] =$scope.medCtrl.drugName;
    	dataObj["drugDescription"] =$scope.medCtrl.drugDescription;
    	dataObj["drugManufacturer"] =$scope.medCtrl.drugManufacturer;
    	
    	//var dataObj = angular.toJson($scope.medCtrl);
    	if($scope.editFlag==true){
    		$http.post("http://localhost:1111/api/v1/medicine/updateMedicine", dataObj).then(successCallback, errorCallback);
    		editFlag=false;
    		
    	}else{
    		$http.post("http://localhost:1111/api/v1/medicine/addMedicine", dataObj).then(successCallback, errorCallback);	
    	}
        
        function successCallback(response){
        	$scope.medCtrl.drugName="";
    		$scope.medCtrl.drugDescription="";
    		$scope.medCtrl.drugManufacturer="";
        	console.log(response);
        }
        function errorCallback(error){
            console.log(error);
        }
    }

    

}]);