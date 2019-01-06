angular.module('starter.services.httpService', [])

.factory('httpService',function($q,$http,$ionicLoading,$ionicPopup,$state) {

	return {
		getAllAgents:function() {
		var deferred=$q.defer();
        var self=this;
		$http.defaults.headers.post["Content-Type"]="application/json";
	      var res = $http.get('http://localhost:1234/agent/getAllAgents');  
	      var showAlert = function()
		    {
		      var alertPopup = $ionicPopup.alert
		      ({
		         title: "<center>Service Unavailable.</center>",
		         template: "<center>Please check your internet connection</center>"
		      });
		    };

	      res.success(function(data, status, headers, config) {
	        deferred.resolve({"data":data,"status":status,"headers":headers});
	      });

	      res.error(function(data, status, headers, config) {	        
	        if(status===0 || data===null ) {
	          showAlert();
	      }
	        else
	          deferred.resolve({"data":data,"status":status,"headers":headers});

	      });

		return deferred.promise;
	},
		updateCustomer:function(customerId,data) {
		if(customerId!=null && data!=null) {
			var deferred=$q.defer();
	        var self=this;
	        $http.defaults.headers.post["Content-Type"]="application/json";
	        var config = {
	                headers : {
	                    'Content-Type': 'application/json'
	                }
	            }
	          var url = 'http://localhost:1234/customer/'+customerId+'/update';
		      var res = $http.post(url,data,config);  
		      var showAlert = function()
			    {
			      var alertPopup = $ionicPopup.alert
			      ({
			         title: "<center>Service Unavailable.</center>",
			         template: "<center>Please check your internet connection</center>"
			      });
			    };

		      res.success(function(data, status, headers, config) {
		        deferred.resolve({"data":data,"status":status,"headers":headers});
		      });

		      res.error(function(data, status, headers, config) {	        
		        if(status===0 || data===null )
		          showAlert();
		        else
		          deferred.resolve({"data":data,"status":status,"headers":headers});

		      });

			return deferred.promise;
		}
		else return;
	},getAgentById:function(id) {
		var deferred=$q.defer();
        var self=this;
		$http.defaults.headers.post["Content-Type"]="application/json";
	      var res = $http.get('http://localhost:1234/agent/' + id);  
	      var showAlert = function()
		    {
		      var alertPopup = $ionicPopup.alert
		      ({
		         title: "<center>Service Unavailable.</center>",
		         template: "<center>Please check your internet connection</center>"
		      });
		    };

	      res.success(function(data, status, headers, config) {
	        deferred.resolve({"data":data,"status":status,"headers":headers});
	      });

	      res.error(function(data, status, headers, config) {	        
	        if(status===0 || data===null ) {
	        	alert(data);
	          //showAlert();
	      }
	        else
	          deferred.resolve({"data":data,"status":status,"headers":headers});

	      });

		return deferred.promise;
	}
	};
});