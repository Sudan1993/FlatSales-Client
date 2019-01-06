'use strict';

angular.module('starter.controllers', [])

.controller('AgentCtrl', function($scope, $timeout, $stateParams,$ionicPopup, ionicMaterialInk, $http,httpService,$state) {
   
   $scope.models = {
        selected: null,
        lists: {"Created": [], "Won": [], "Lost" : []}
    };

    $scope.agentClicked = function(item){
        var customers = item.customers;
        $scope.models.lists.Lost = [];    
        $scope.models.lists.Created = [];
        $scope.models.lists.Won = [];
        httpService.getAgentById(item.id).then(function(response){
            var customers = response.data.customers;
            for(var i in customers){
            if(customers[i].status == "Lost") {
                $scope.models.lists.Lost.push(
                    {
                        label: customers[i].customername,
                        _id: customers[i]._id,
                        status: customers[i].status,
                        mobile: customers[i].customercontactno
                    })
            }
            else if(customers[i].status == "Created"){
                $scope.models.lists.Created.push(
                    {
                        label: customers[i].customername,
                        _id: customers[i]._id,
                        status: customers[i].status,
                        mobile: customers[i].customercontactno
                    });
            }
            else if(customers[i].status == "Won"){
                $scope.models.lists.Won.push(
                    {
                        label: customers[i].customername,
                        _id: customers[i]._id,
                        status: customers[i].status,
                        mobile: customers[i].customercontactno
                    });
            }
        }
        })
        
    }

    $scope.agentsList = [];
    $timeout(function() {
        httpService.getAllAgents().then(function(response){
                var agents = response.data; 
                for(var i in agents){
                    $scope.agentsList.push(
                        {
                            label: agents[i].agentname,
                            id: agents[i]._id,
                            customers: agents[i].customers
                        });
                }
            });
    }, 30);

    $scope.$watch('models', function(newValue,oldValue) {
        var won = $scope.models.lists.Won;
        var created = $scope.models.lists.Created;
        var lost = $scope.models.lists.Lost;
        var id = null;
        var status = null;
        for(var i in won){
            if(won[i].status != 'Won'){
                id = won[i]._id;
                status = "Won";
            }
        }
        for(var i in created){
            if(created[i].status != 'Created'){
                id = created[i]._id;
                status = "Created";
            }
        }
        for(var i in lost){
            if(lost[i].status != 'Lost'){
                id = lost[i]._id;
                status = "Lost";
            }
        }
        var jsonToSend = {
            "status" : status
        }
        httpService.updateCustomer(id,jsonToSend).then(function(response){
            var response = response.data;
            console.log(response);
        });
    }, true);
    
});

