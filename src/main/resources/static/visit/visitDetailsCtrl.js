angular.module('app').controller('visitsCtrl', ['$scope', '$http', function($scope, $http){
   
    initFn();
    var editFlag=false;
    var showField=false;
    var patDet={};
    var tmpPatID="";
    $scope.showField=false;
    $scope.presList=[];
    $scope.prPresList=[];
    function initFn(){
        $http.get('http://localhost:1111/api/v1/visit/getPatientVisits').then(successCallback, errorCallback);
        function successCallback(response){
            $scope.formatData(response);
            $http.get('http://localhost:1111/api/v1/medicine/getMedicines').then(successCallback, errorCallback);
            function successCallback(response1){
                $scope.formatMedicineData(response1);
                $http.get('http://localhost:1111/api/v1/treatments/').then(successCallback, errorCallback);
                	function successCallback(response2){
                		$scope.formatTreatmentData(response2);
                	}
                	function errorCallback(error){
                		console.log(error);
                	}
            }
            function errorCallback(error){
                console.log(error);
            }
            
        }
        function errorCallback(error){
            console.log(error);
        }   
        
       
    }
    
    $scope.toggleValue=function(){
    	if($scope.showField==false) {
    		$scope.showField=true;
    	}
    	else{
    		$scope.showField=false;
    	}
}
   
    $scope.formatTreatmentData = function(response){
    	$scope.treatmentList = [];
    	$scope.treatmentList=response.data.data[0].treatmentList;
    	//angular.forEach(response.data.data,function(data){
        	//$scope.treatmentList.push(data.treatmentList);
        //})
        console.log($scope.treatmentList);
    }
   
    
    $scope.formatMedicineData = function(response){
    	$scope.drugNameList = [];
    	angular.forEach(response.data.data,function(data){
        	$scope.drugNameList.push(data.drugName);
        })
        console.log($scope.drugNameList);
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
    
    $('#tabName').select2({
        placeholder: 'Select a drug'
    });

    $('#tabName').on('change',function(){
    	var data=$("#tabName option:selected").text();
    	$scope.visCtrl.tabName=data;
    });
       

    $('#visitPurpose').select2({
        placeholder: 'Select a Treatment'
    });

    $('#visitPurpose').on('change',function(){
    	var data=$("#visitPurpose option:selected").text();
    	$scope.visCtrl.visitPurpose=data;
    });
       
    	
    $scope.Add = function () {
        //Add the new item to the Array.
        var presRec = {};
        presRec.tabName = $scope.visCtrl.tabName;
        //presRec.tabName = $("#tabName:selected").text();
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
    	$scope.editFlag=false;
    	$scope.showField=true;
    	$scope.tmpPatID=visitRecd.patID;
    	$scope.visCtrl.patID=visitRecd.patID;
        $scope.visCtrl.patFirstName = visitRecd.patFirstName;
        if(visitRecd.patLastName!="" || typeof visitRecd.patLastName != "undefined"){
        	$scope.visCtrl.patLastName = visitRecd.patLastName;
        }
        
        if(visitRecd.visitDate!="" || typeof visitRecd.visitDate != "undefined"){
    		$scope.visCtrl.visitDate=new Date(GetFormattedDate(visitRecd.visitDate));
        }
        if(visitRecd.visitPurpose!="" || typeof visitRecd.visitPurpose != "undefined"){
        	$scope.visCtrl.visitPurpose=visitRecd.visitPurpose;
        	//$("#select2-visitPurpose-container").text=visitRecd.visitPurpose;
        	$("#select2-visitPurpose-container option:selected").val(visitRecd.visitPurpose);
        	console.log(visitRecd.visitPurpose);
       	 }
        
        if(visitRecd.drugAllergy!="" || typeof visitRecd.drugAllergy != "undefined"){
        	$scope.visCtrl.drugAllergy=visitRecd.drugAllergy;
        	
        }
        
        if(visitRecd.treatmentNotes!="" || typeof visitRecd.treatmentNotes != "undefined"){
        	$scope.visCtrl.treatmentNotes=visitRecd.treatmentNotes;
        	
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
		$scope.visCtrl.patID = "";
		$scope.visCtrl.patFirstName = "";
        $scope.visCtrl.patLastName = "";
        $scope.visCtrl.visitDate = "";
        $scope.visCtrl.drugAllergy = "";
        $scope.visCtrl.treatmentNotes = "";
        //$("#select2-visitPurpose-container").text="";
		$scope.presList=[];
		$scope.editFlag=false;
		$scope.showField=false;
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
		            $scope.visCtrl.patID = "";
		            $scope.visCtrl.patFirstName = "";
		            $scope.visCtrl.patLastName = "";
		            $scope.visCtrl.visitDate = "";
		            $scope.visCtrl.drugAllergy = "";
		            $scope.visCtrl.treatmentNotes = "";
		            //$("#select2-visitPurpose-container").text="";
		            $scope.patDet={};
		            $scope.presList=[];
		    	}
    	 		function errorCallback(error){
    	 			console.log(error);
    	 		}
    	  	}
        function errorCallback(error){
        	console.log(error);
        }   
     }

    
    $scope.printRecord=function(visitRec){
    	
		    $scope.prPatID=visitRec.patID;
		    $scope.prPatFirstName=visitRec.patFirstName;
		    $scope.prPatLastName=visitRec.patLastName;
		    $scope.prPatVisitDate=visitRec.visitDate;
		    $scope.prPatVisitPurpose=visitRec.visitPurpose;
		    $scope.prPatdrugAllergy=visitRec.drugAllergy;
		    $scope.prPattreatmentNotes=visitRec.treatmentNotes;
		    $scope.prPresList=[];
		    angular.forEach(visitRec.presList,function(data){
		    	$scope.prPresList.push(data);
		    })
		    
		    //$scope.printElement(document.getElementById("printThis"));
		   
    }
    
    $scope.printElement=function(elem) {
	    var domClone = elem.cloneNode(true);
	    var $printSection = document.getElementById("printSection");
	    if (!$printSection) {
	        var $printSection = document.createElement("div");
	        $printSection.id = "printSection";
	        document.body.appendChild($printSection);
	    }
	    
	    $printSection.innerHTML = "";
	    $printSection.appendChild(domClone);
	    
	}
    $scope.printForm=function(){
    	$scope.printElement(document.getElementById("printThis"));
    	  window.print();  
    	}
   //Create and Edit Function Submission 
    $scope.createVisit = function(data){
        
    	var dataObj ={};
    	
    	if($scope.editFlag==true){
    		dataObj["patID"] =$scope.tmpPatID;
    		dataObj["patFirstName"] =$scope.visCtrl.patFirstName;
        	dataObj["patLastName"] =$scope.visCtrl.patLastName;
        	dataObj["visitDate"]= formatDate($scope.visCtrl.visitDate);
        	dataObj["visitPurpose"]= $scope.visCtrl.visitPurpose;
        	dataObj["drugAllergy"]= $scope.visCtrl.drugAllergy;
        	dataObj["treatmentNotes"]= $scope.visCtrl.treatmentNotes;
        	dataObj["presList"]=$scope.presList;
        	$http.post("http://localhost:1111/api/v1/visit/updateVisit", dataObj).then(successCallback, errorCallback);
        	function successCallback(response){
                console.log(response);
                $scope.visCtrl.patID = "";
                $scope.visCtrl.patFirstName = "";
                $scope.visCtrl.patLastName = "";
                $scope.visCtrl.visitDate = "";
                $scope.visCtrl.drugAllergy = "";
	            $scope.visCtrl.treatmentNotes = "";
                //$("#select2-visitPurpose-container").text="";
                $scope.patDet={};
                $scope.presList=[];
                }
            function errorCallback(error){
                console.log(error);
            }
    	}else{
    		dataObj["patID"] =$scope.visCtrl.patID;
    		dataObj["visitDate"]= formatDate($scope.visCtrl.visitDate);
    		dataObj["visitPurpose"]= $scope.visCtrl.visitPurpose;
    		dataObj["drugAllergy"]= $scope.visCtrl.drugAllergy;
        	dataObj["treatmentNotes"]= $scope.visCtrl.treatmentNotes;
    		console.log($scope.visCtrl.visitPurpose);
    		dataObj["presList"]=$scope.presList;
        	$scope.getPatientByID($scope.visCtrl.patID,dataObj);
    	}
   }

    
}]);