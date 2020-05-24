var app = angular.module('app', ['ui.router']);

app.config(function($stateProvider,$urlRouterProvider){
    

    $stateProvider
    .state('/',{
        url: '/',
            templateUrl:'patient/patientDetails.html',
            controller: 'patientsCtrl'
    })
    .state('medicine',{
        url: '/medicine',
        templateUrl:'medicine/medicineDetails.html',
        controller: 'medicineCtrl'
    })
    .state('visit',{
        url: '/visit',
        templateUrl:'visit/visitDetails.html',
        controller: 'visitsCtrl'
    });
    
    $urlRouterProvider.otherwise('/');
})

