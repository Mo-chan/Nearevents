var Nevent = angular.module('Nevent',['ui.utils','ui.bootstrap','ui.router','ui.map','ngTagsInput']);

Nevent.config(function($stateProvider,$urlRouterProvider)
{
    $urlRouterProvider.otherwise("/");
    $stateProvider
    .state('Main', {
      url: "/",
      templateUrl: "pages/main.html",
      controller: 'MainCtrl'
    })
    
    .state('Event', {
      url: "/event",
      templateUrl: "pages/event.html",
      controller: 'EventCtrl'
    })
    
    .state('City', {
      url: "/city",
      templateUrl: "pages/city.html",
      controller: 'CityCtrl'
    })
    .state('Sign', {
      url: "/sign",
      templateUrl: "pages/sign.html",
      controller: 'SignCtrl'
    })
    .state('Company', {
      url: "/company",
      templateUrl: "pages/company.html",
      controller: 'CompanyCtrl'
    })
    
    .state('Category', {
      url: "/category",
      templateUrl: "pages/category.html",
      controller: 'CategoryCtrl'
    })
    
    .state('Venue', {
      url: "/venue",
      templateUrl: "pages/venue.html",
      controller: 'VenueCtrl'
    })
    
    .state('NewEvent', {
      url:'/create',
      templateUrl: "pages/new.html",
      controller: 'CreateCtrl'
    })
    
    .state('Profile', {
      url:'/profile',
      templateUrl: "pages/profile.html",
      controller: 'ProfileCtrl'
    })

    .state('Profile.about', {
      url: "/me",
      templateUrl: "pages/profile/about.html",
      controller: function($scope){
        
      }
    })

    .state('Profile.upcoming', {
      url: "/upcoming",
      templateUrl: "pages/profile/upcoming.html",
      controller: function($scope){
        
      }
    })

    .state('Profile.myevents', {
      url: "/myevents",
      templateUrl: "pages/profile/myevents.html",
      controller: function($scope){
        
      }
    })


    .state('OneCompany', {
      url: "/companyr",
      templateUrl: "pages/onecompany.html",
      controller: 'OnecCtrl'
    })

    .state('Companies', {
      url: "/companies",
      templateUrl: "pages/event.hmulticompanytml",
      controller: 'McCtrl'
    })
    
    .state('Results', {
      url:'/{id:[A-Za-z]{1,8}}',
      templateUrl: "pages/results.html",
      controller: 'ResutlsCtrl'
    });
    
    


});


Nevent.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.on("keydown", function (event) {
            if(event.which === 13) {
                console.log(event.which);
                
                    scope.$eval(attrs.ngEnter);
                    scope.$apply();
                
 
                event.preventDefault();
            }
        });
    };
});


Nevent.controller('MainCtrl',function($scope , $rootScope,  $http,$modal,$state, $location)
{
    navigator.geolocation.getCurrentPosition(function (position)
            {
                geocoder = new google.maps.Geocoder();
                $scope.Lat = position.coords.latitude;
                console.log($scope.Lat);
                $scope.Lon = position.coords.longitude;
                console.log($scope.Lon);
                $scope.lll = new google.maps.LatLng($scope.Lat,$scope.Lon);
                geocoder.geocode({'latLng': $scope.lll}, function(results, status) 
                {
                    if (status == google.maps.GeocoderStatus.OK) 
                    {
                        if (results[1])
                        {
                            $rootScope.Country = results[1].address_components[1].long_name;
                        }
                    }
                });       
            }); 
    $rootScope.serveropt = 'http://localhost:1337';
    $scope.searchOptions = [{"option":"Event name"},{"option":"Category"},{"option":"Company"},{"option":"City"},{"option":"Venue"}];
    $scope.searchInput = "Search By City";
    $scope.typeAheadIndex = "City";
    $scope.TypeAheadList =[{"option":"Amman"},{"option":"Zarqa"},{"option":"Irbid"},{"option":"Jarash"},{"option":"Tafilah"},{"option":"Ajloun"},{"option":"Aqaba"},{"option":"Karak"},{"option":"Madaba"},{"option":"Mafraq"},{"option":"Ma'an"},{"option":"Balqa"}]
    
    $scope.searchInputChanger = function(option)
    {
	$scope.searchInput = "Search By "+ option;
	$scope.typeAheadIndex = option;
	if (option == "Category") {
	    $scope.TypeAheadList = [{"option":"Music"},{"option":"Conventions"},{"option":"Conference"},{"option":"Parties"},{"option":"Sport"},{"option":"Seminars"},{"option":"Outdoor"}];
	}
	else if (option == "City") {
	    $scope.TypeAheadList =[{"option":"Amman"},{"option":"Zarqa"},{"option":"Irbid"},{"option":"Jarash"},{"option":"Tafilah"},{"option":"Ajloun"},{"option":"Aqaba"},{"option":"Karak"},{"option":"Madaba"},{"option":"Mafraq"},{"option":"Ma'an"},{"option":"Balqa"}]
	}
	else if (option == "Company") {
	    $scope.TypeAheadList = []
	}
	else if (option == "Venue") {
	    $scope.TypeAheadList = []
	}
	else if (option == "Event name") {
	    $scope.TypeAheadList = []
	}
	
    };
    $scope.Search= function ()
    {
        //alert("oke");
        $scope.Value =document.getElementById("mainSearch").value;
        if ($scope.typeAheadIndex == "City") {
            $http.post($rootScope.serveropt + '/event/CitySearch', {msg:$scope.Value}).
            success(function(data, status, headers, config) {
                console.log(data);
                $rootScope.CityResults = data.data;
                localStorage.setItem("CityResults", JSON.stringify($rootScope.CityResults));
                $state.go('City');
            }). 
            error(function(data, status, headers, config) {
            });                
        }
        else if ($scope.typeAheadIndex == "Category") {
            $http.post($rootScope.serveropt + '/event/CategorySearch', {msg:$scope.Value}).
            success(function(data, status, headers, config) {
                console.log(data);
                $rootScope.CategoryResults = data.data;
                localStorage.setItem("CategoryResults", JSON.stringify($rootScope.CategoryResults));
                $state.go('Category');    
            }). 
            error(function(data, status, headers, config) {
            });
        }
        else if ($scope.typeAheadIndex == "Company") {
            //code
        }
        else if ($scope.typeAheadIndex == "Venue") {
            $http.post($rootScope.serveropt + '/event/VenueSearch', {msg:$scope.Value}).
            success(function(data, status, headers, config) {
                console.log(data);
                $rootScope.VenueResults = data.data;
                localStorage.setItem("VenueResults", JSON.stringify($rootScope.VenueResults));
                $state.go('Venue');    
            }). 
            error(function(data, status, headers, config) {
            }); 
        }
        else if ($scope.typeAheadIndex == "Event name") {
            $http.post($rootScope.serveropt + '/event/EventSearch', {msg:$scope.Value}).
            success(function(data, status, headers, config) {
                console.log(data);
                console.log(status);    
            }). 
            error(function(data, status, headers, config) {
            });
        }
    };
    
    //date

    $scope.GotoEvents = function() 
    {
        $http.post($rootScope.serveropt + '/event/CountrySearch', {msg:$rootScope.Country}).
        success(function(data, status, headers, config) {
            console.log(data);
            $rootScope.CityResults = data.data;
            localStorage.setItem("CityResults", JSON.stringify($rootScope.CityResults));
            $state.go('City');
        }). 
        error(function(data, status, headers, config) {
        });                   

    }
    
    $scope.addEvent = function()
    {
        var modalInstance = $modal.open({
             templateUrl: 'addEvent.html',
            controller: function($scope, $state,$modalInstance)
            {
                $scope.ok = function () {$state.go('NewEvent');$modalInstance.dismiss('cancel');};
                $scope.cancel = function () {$modalInstance.dismiss('cancel');};
                $scope.importEvent = function ()
                {
                    OAuth.initialize('Jxw4nhMD7lmM0SwUbG23cwIy3AQ')
                        OAuth.popup('facebook').done(function(result) {
                        console.log(result);
                        result.get('/me').done(function (response)
                        {
                            console.log(response);
                            result.get("/"+response.id+'/events').done(function (response)
                            {
                                console.log(response);
				    result.get("/"+response.data[1].id).done(function (response)
				    {		
					console.log(response);
					console.log(response.cover);

				    })
				    .fail(function (error) {console.log(error);});
			    })
                            .fail(function (error) {console.log(error);});
                            })
                        .fail(function (error) {console.log(error);});
                        }).fail(function(err) {
                          console.log(err);
                        });
                    }
                    
                
            } 
        });
    };
    
    $scope.Signup = function()
    {
        var modalInstance = $modal.open({
             templateUrl: 'Signup.html',
             controller: function($scope,$modalInstance, $state)
            {   $scope.x=0;
                $scope.y=0;
                $scope.AuthArray = [{'Pass':'0','Email':'0','User':'0','Phone':'0'}];
                $scope.CompanyAuthArray = [{'Pass':'0','Email':'0','User':'0','Phone':'0'}];
                $scope.setX = function (c){$scope.x=c;};
                $scope.ok = function () {
                    if ($scope.x == 1)
                    {
                        $scope.CUserArray = [{'Cname':'','CUname':'','Cwebsite':'','Cemail':'','Cpassword':'','Cphone':''}];
                        $scope.CUserArray[0].Cname =document.getElementById("CName").value;
                        $scope.CUserArray[0].CUname =document.getElementById("CUName").value;
                        $scope.CUserArray[0].Cemail =document.getElementById("CEmail").value;  $rootScope.CEm =document.getElementById("UEmail").value;
                        $scope.CUserArray[0].Cpassword =document.getElementById("CPassword").value;
                        $scope.Crpassword =document.getElementById("CRPassword").value;
                        $scope.CUserArray[0].Cwebsite =document.getElementById("CWebsite").value;
                        $scope.CUserArray[0].Cphone =document.getElementById("CPhone").value;
                        if ($scope.CUserArray[0].Cname != '' & $scope.CUserArray[0].Cname != null & $scope.CUserArray[0].CUname != '' & $scope.CUserArray[0].CUname != null & $scope.CUserArray[0].Cemail != '' & $scope.CUserArray[0].Cemail != null & $scope.CUserArray[0].Cpassword != '' & $scope.CUserArray[0].Cpassword != null & $scope.CUserArray[0].Cwebsite != '' & $scope.CUserArray[0].Cwebsite != null & $scope.CUserArray[0].Cphone != '' & $scope.CUserArray[0].Cphone != null & $scope.CompanyAuthArray[0].Pass == '1' & $scope.CompanyAuthArray[0].Email == '1' & $scope.CompanyAuthArray[0].Phone == '1' & $scope.CompanyAuthArray[0].User == '1')
                        {
                            $http.post($rootScope.serveropt + '/user/cregister', {msg:$scope.CUserArray}).
                            success(function(data, status, headers, config) {
                            console.log(data);
                            $modalInstance.dismiss('cancel');
                            var modalInstance = $modal.open({
                                templateUrl: 'verify.html',
                                controller: function($scope,$modalInstance,$rootScope)
                                {
                                    $scope.ok = function ()
                                    {
                                        $scope.veri = document.getElementById("Verify").value;
                                        $http.post($rootScope.serveropt + '/user/cverify', {msg:$scope.veri, email: $rootScope.CEm}).
                                        success(function(data, status, headers, config) {
                                            console.log(data);
					                       $modalInstance.dismiss('cancel');
                    					   $http.post($rootScope.serveropt + '/event/CountrySearch', {msg:$rootScope.Country}).
                        					success(function(data, status, headers, config) {
                        					    console.log(data);
                        					    $rootScope.CityResults = data.data;
                        					    localStorage.setItem("CityResults", JSON.stringify($rootScope.CityResults));
                        					    $state.go('City');
                        					}). 
                        					error(function(data, status, headers, config) {
                        					});                   
                                        }). 
                                        error(function(data, status, headers, config) {
                                        });
                                    }    
                                }
                            });
                            
                            }). 
                            error(function(data, status, headers, config) {
                            });
                        }
                        else
                        {
                            $scope.y=0;
                            alert('Please fill all fields');
                        }
                    }
                    else if ($scope.x == 0) 
                    {
                        $scope.y=1;
                        $scope.UserArray = [{'Fname':'','Lname':'','Nname':'','Uemail':'','Upassword':'','Uphone':''}];
                        $scope.UserArray[0].Fname = document.getElementById("FName").value;
                        $scope.UserArray[0].Lname = document.getElementById("LName").value;
                        $scope.UserArray[0].Nname = document.getElementById("NName").value;
                        $scope.UserArray[0].Uemail = document.getElementById("UEmail").value; $rootScope.Em =document.getElementById("UEmail").value;
                        $scope.UserArray[0].Upassword = document.getElementById("UPassword").value;
                        $scope.Urpassword = document.getElementById("URPassword").value;
                        $scope.UserArray[0].Uphone = document.getElementById("UPhone").value;
                        if ($scope.UserArray[0].Fname != '' & $scope.UserArray[0].Fname != null & $scope.UserArray[0].Lname != '' & $scope.UserArray[0].Lname != null & $scope.UserArray[0].Nname != '' & $scope.UserArray[0].Nname != null & $scope.UserArray[0].Uemail != '' & $scope.UserArray[0].Uemail != null & $scope.UserArray[0].Upassword != '' & $scope.UserArray[0].Upassword != null & $scope.UserArray[0].Uphone != '' & $scope.UserArray[0].Uphone != null & $scope.AuthArray[0].Pass == '1' & $scope.AuthArray[0].Email == '1' & $scope.AuthArray[0].Phone == '1' & $scope.AuthArray[0].User == '1')
                        {
                            $http.post($rootScope.serveropt + '/user/register', {msg:$scope.UserArray}).
                            success(function(data, status, headers, config) {
                            console.log(data);
                            $modalInstance.dismiss('cancel');
                            var modalInstance = $modal.open({
                                templateUrl: 'verify.html',
                                controller: function($scope,$modalInstance,$rootScope)
                                {
                                    $scope.ok = function ()
                                    {   console.log(data);
                                        $scope.veri = document.getElementById("Verify").value;
                                        $http.post($rootScope.serveropt + '/user/verify', {msg:$scope.veri, email: $rootScope.Em}).
                                        success(function(data, status, headers, config) {
                                            console.log(data);
                                            if (data.result.status == "Valid") {
                        						$http.post($rootScope.serveropt + '/event/CountrySearch', {msg:$rootScope.Country}).
                        						success(function(data, status, headers, config) {
                        						    console.log(data);
                        						    $rootScope.CityResults = data.data;
                        						    localStorage.setItem("CityResults", JSON.stringify($rootScope.CityResults));
                        						    $state.go('City');
                        						}). 
                        						error(function(data, status, headers, config) {
                        						});
                                            $modalInstance.dismiss('cancel');
                                        }
                                        }). 
                                        error(function(data, status, headers, config) {
                                        });
                                    }    
                                }
                            });
                            
                            }). 
                            error(function(data, status, headers, config) {
                            });
                        }
                        else
                        {
                            $scope.y=0;
                            alert('Please fill all fields');
                        }
                        
                    }
                };
                $scope.cancel = function () {$modalInstance.dismiss('cancel');};
                $scope.CheckPassword = function ()
                {
                    $scope.matched = '';
                    if (document.getElementById("UPassword").value != '' & document.getElementById("UPassword").value != null & $scope.x == 0)
                    {
                
                        if (document.getElementById("UPassword").value != document.getElementById("URPassword").value)
                        {
                            $scope.matched = 'Not Matched';
                        }
                        else
                        {
                            $scope.matched = 'Matched';
                            $scope.AuthArray[0].Pass = '1';
                        }
                    }
                    else if (document.getElementById("CPassword").value != '' & document.getElementById("CRPassword").value != null & $scope.x == 1)
                    {
                        if (document.getElementById("CPassword").value != document.getElementById("CRPassword").value)
                        {
                            $scope.matched = 'Not Matched';
                        }
                        else
                        {
                            $scope.matched = 'Matched';
                            $scope.CompanyAuthArray[0].Pass = '1';
                        }
                    }
                };
                $scope.CheckUser = function ()
                {
                    $scope.checking = '';
                    var pattern = new RegExp(/[~`!#$@()A-Z\u0600-\u060f\u061f\u066d\u06dd\u06de\u06e9\ufd3e\ufd3f\ufdf0-\ufdfd.%\^&*+=\-\[\]\\';,/{}|\\"":<>\?]/);
                    var pat = new RegExp(/^\d+$/);
                    var patt = new RegExp(/^[0-9]/);
                    if ($scope.x == 0) {
                        $scope.usern = document.getElementById("NName").value;
                    }
                    else if ($scope.x == 1) {
                        $scope.usern = document.getElementById("CUName").value;
                    }
                    
                    if ($scope.usern != '' & $scope.usern != null)
                    {
                        if(pat.test($scope.usern) || pattern.test($scope.usern) | patt.test($scope.usern))
                        {
                            alert("You can only use Alphabet, Numbers, and Underscore. You can't start with a Number and you can't use Capital Latter");
                        }
                        else
                        {
                            $http.post($rootScope.serveropt + '/user/checkuser', {usern:$scope.usern}).
                            success(function(data, status, headers, config) {
                                console.log(data);
                                if (data.result.status == 'AVAILABLE') {
                                    $scope.checking = 'Available';
                                    if ($scope.x == 0 ){$scope.AuthArray[0].User = '1';}
                                    if ($scope.x == 1 ){$scope.CompanyAuthArray[0].User = '1';}
                                }
                                else if (data.result.status == 'ACTIVE') {
                                    $scope.checking = 'Taken';
                                }
                            }). 
                            error(function(data, status, headers, config) {
                            });
                        }
                    }
                };
                $scope.CheckCompany = function ()
                {
                    $scope.checking = '';
                    var pattern = new RegExp(/[~`!#$@()A-Z\u0600-\u060f\u061f\u066d\u06dd\u06de\u06e9\ufd3e\ufd3f\ufdf0-\ufdfd.%\^&*+=\-\[\]\\';,/{}|\\"":<>\?]/);
                    var pat = new RegExp(/^\d+$/);
                    var patt = new RegExp(/^[0-9]/);
                    $scope.usern = document.getElementById("CUName").value;
                    if ($scope.usern != '' & $scope.usern != null)
                    {
                        if(pat.test($scope.usern) || pattern.test($scope.usern) | patt.test($scope.usern))
                        {
                            alert("You can only use Alphabet, Numbers, and Underscore. You can't start with a Number and you can't use Capital Latter");
                        }
                        else
                        {
                            $http.post($rootScope.serveropt + '/user/checkcompany', {usern:$scope.usern}).
                            success(function(data, status, headers, config) {
                                if (data.result.status == 'AVAILABLE') {
                                    $scope.checking = 'Available';
                                    $scope.CompanyAuthArray[0].Company = '1';
                                }
                                else if (data.result.status == 'ACTIVE') {
                                    $scope.checking = 'Taken';
                                }
                            }). 
                            error(function(data, status, headers, config) {
                            });
                        }
                    }
                };
                $scope.CheckPhone = function ()
                {
                    var patter = new RegExp(/^[0-9]+$/);
                    if ($scope.x == 0) {
                        if(patter.test(document.getElementById("UPhone").value)){$scope.AuthArray[0].Phone = '1';}
                        else {alert("You can only use Numbers");}
                    }
                    else if ($scope.x == 1) {
                        if(patter.test(document.getElementById("CPhone").value)){$scope.CompanyAuthArray[0].Phone = '1';}
                        else {alert("You can only use Numbers");}
                    }
                    
                };
                $scope.CheckEmail = function ()
                {
                    $scope.cemail = '';
                    var re = new RegExp (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);    
                    if (document.getElementById("UEmail").value != '' & document.getElementById("UEmail").value != null & $scope.x == 0)
                    {
                        if (re.test(document.getElementById("UEmail").value))
                        {
                            $scope.cemail = 'Valid';
                            $scope.AuthArray[0].Email = '1';
                        }
                        else {$scope.cemail = 'Not Valid';}
                    }
                    else if (document.getElementById("CEmail").value != '' & document.getElementById("CEmail").value != null & $scope.x == 1)
                    {
                        if (re.test(document.getElementById("CEmail").value))
                        {
                            $scope.cemail = 'Valid';
                            $scope.CompanyAuthArray[0].Email = '1';
                        }
                        else {$scope.cemail = 'Not Valid';}
                    }
                    
                };
		$scope.SocialLogin = function (c)
                {
                    OAuth.initialize('Jxw4nhMD7lmM0SwUbG23cwIy3AQ')
                    if (c == 'facebook') {
                        OAuth.popup('facebook').done(function(result) {
                        console.log(result);
                        result.get('/me').done(function (response)
                        {
                            console.log(response);
                            $http.post($rootScope.serveropt + '/user/clogin', {email: response.email , password: result.access_token}).
                            success(function(data, status, headers, config) {
                            console.log(data);
                            if (data.length != 0) {
                                localStorage["email"] = data.data[0].email;
                                localStorage["password"] = data.data[0].password;
                                localStorage["phone"] = data.data[0].phone;
                                localStorage["fname"] = data.data[0].fname;
                                localStorage["lname"] = data.data[0].lname;
                                localStorage["uname"] = data.data[0].uname;
                                localStorage["user_id"] = data.data[0].user_id;
                                $modalInstance.dismiss('cancel');
				$http.post($rootScope.serveropt + '/event/CountrySearch', {msg:$rootScope.Country}).
				success(function(data, status, headers, config) {
				    console.log(data);
				    $rootScope.CityResults = data.data;
				    localStorage.setItem("CityResults", JSON.stringify($rootScope.CityResults));
				    $state.go('City');
				}). 
				error(function(data, status, headers, config) {
				});
                            }
                            else
                            {
                                $scope.UserArray = [{'Fname':'','Lname':'','Nname':'','Uemail':'','Upassword':'','Uphone':''}];
                                $scope.UserArray[0].Fname = response.first_name;
                                $scope.UserArray[0].Lname = response.last_name;
                                $scope.UserArray[0].Nname = "u"+response.first_name+response.last_name;
                                $scope.UserArray[0].Uemail = response.email;
                                $scope.UserArray[0].Upassword = result.access_token;
                                $scope.UserArray[0].Uphone = "0";
                                $http.post($rootScope.serveropt + '/user/register', {msg:$scope.UserArray}).
                                success(function(data, status, headers, config) {
                                console.log(data);
                                $modalInstance.dismiss('cancel');
                                $http.post($rootScope.serveropt + '/event/CountrySearch', {msg:$rootScope.Country}).
				success(function(data, status, headers, config) {
				    console.log(data);
				    $rootScope.CityResults = data.data;
				    localStorage.setItem("CityResults", JSON.stringify($rootScope.CityResults));
				    $state.go('City');
				}). 
				error(function(data, status, headers, config) {
				});
                                }). 
                                error(function(data, status, headers, config) {
                                });
                            }
                            }). 
                            error(function(data, status, headers, config) {
                            });
                        })
                        .fail(function (error) {console.log(error);});
                        }).fail(function(err) {
                          console.log(err);
                        });
                    }
                
                };
            } 
        });
    };
    
    
    $scope.Signin = function()
    {
        var modalInstance = $modal.open({
            templateUrl: 'Signin.html',
            controller: function($scope,$modalInstance,$state)
            {
                $scope.x = 0;
                $scope.setX = function (c){$scope.x=c;};
                $scope.ok = function ()
                {
                    if ($scope.x == 0) {
                        $scope.Lemail =document.getElementById("LoginEmail").value;
                        $scope.Lpassword =document.getElementById("LoginPassword").value;
                        if ($scope.Lemail != '' & $scope.Lemail != null & $scope.Lpassword != '' & $scope.Lpassword != null)
                        {
                            $http.post($rootScope.serveropt + '/user/login', {email: $scope.Lemail , password: $scope.Lpassword}).
                            success(function(data, status, headers, config) {
                            console.log(data);
                            if (data.length != 0) {
                                localStorage["email"] = data.data[0].email;
                                localStorage["password"] = data.data[0].password;
                                localStorage["phone"] = data.data[0].phone;
                                localStorage["fname"] = data.data[0].fname;
                                localStorage["lname"] = data.data[0].lname;
                                localStorage["uname"] = data.data[0].uname;
                                localStorage["user_id"] = data.data[0].user_id;
                                $modalInstance.dismiss('cancel');
				$http.post($rootScope.serveropt + '/event/CountrySearch', {msg:$rootScope.Country}).
				success(function(data, status, headers, config) {
				    console.log(data);
				    $rootScope.CityResults = data.data;
				    localStorage.setItem("CityResults", JSON.stringify($rootScope.CityResults));
				    $state.go('City');
				}). 
				error(function(data, status, headers, config) {
				});
                            }
                            else{alert("Wrong email or password");}
                            }). 
                            error(function(data, status, headers, config) {
                            });
                        } 
                    }
                    else if ($scope.x == 1) {
                        $scope.Lemail =document.getElementById("CLoginEmail").value;
                        $scope.Lpassword =document.getElementById("CLoginPassword").value;
                        if ($scope.Lemail != '' & $scope.Lemail != null & $scope.Lpassword != '' & $scope.Lpassword != null)
                        {
                            $http.post($rootScope.serveropt + '/user/clogin', {email: $scope.Lemail , password: $scope.Lpassword}).
                            success(function(data, status, headers, config) {
                            console.log(data);
                            if (data.length != 0) {
                                localStorage["email"] = data.data[0].email;
                                localStorage["password"] = data.data[0].password;
                                localStorage["phone"] = data.data[0].phone;
                                localStorage["cname"] = data.data[0].cname;
                                localStorage["website"] = data.data[0].website;
                                localStorage["uname"] = data.data[0].uname;
                                localStorage["user_id"] = data.data[0].user_id;
                                $modalInstance.dismiss('cancel');
				$http.post($rootScope.serveropt + '/event/CountrySearch', {msg:$rootScope.Country}).
				success(function(data, status, headers, config) {
				    console.log(data);
				    $rootScope.CityResults = data.data;
				    localStorage.setItem("CityResults", JSON.stringify($rootScope.CityResults));
				    $state.go('City');
				}). 
				error(function(data, status, headers, config) {
				});
                            }
                            }). 
                            error(function(data, status, headers, config) {
                            });
                        }
                    }
                              
                };
                $scope.cancel = function () {$modalInstance.dismiss('cancel');};
                $scope.SocialLogin = function (c)
                {
                    OAuth.initialize('Jxw4nhMD7lmM0SwUbG23cwIy3AQ')
                    if (c == 'facebook') {
                        OAuth.popup('facebook').done(function(result) {
                        console.log(result);
                        result.get('/me').done(function (response)
                        {
                            console.log(response);
                            $http.post($rootScope.serveropt + '/user/clogin', {email: response.email , password: result.access_token}).
                            success(function(data, status, headers, config) {
                            console.log(data);
                            if (data.length != 0) {
                                localStorage["email"] = data.data[0].email;
                                localStorage["password"] = data.data[0].password;
                                localStorage["phone"] = data.data[0].phone;
                                localStorage["fname"] = data.data[0].fname;
                                localStorage["lname"] = data.data[0].lname;
                                localStorage["uname"] = data.data[0].uname;
                                localStorage["user_id"] = data.data[0].user_id;
                                $modalInstance.dismiss('cancel');
				$http.post($rootScope.serveropt + '/event/CountrySearch', {msg:$rootScope.Country}).
				success(function(data, status, headers, config) {
				    console.log(data);
				    $rootScope.CityResults = data.data;
				    localStorage.setItem("CityResults", JSON.stringify($rootScope.CityResults));
				    $state.go('City');
				}). 
				error(function(data, status, headers, config) {
				});
                            }
                            else
                            {
                                $scope.UserArray = [{'Fname':'','Lname':'','Nname':'','Uemail':'','Upassword':'','Uphone':''}];
                                $scope.UserArray[0].Fname = response.first_name;
                                $scope.UserArray[0].Lname = response.last_name;
                                $scope.UserArray[0].Nname = "u"+response.first_name+response.last_name;
                                $scope.UserArray[0].Uemail = response.email;
                                $scope.UserArray[0].Upassword = result.access_token;
                                $scope.UserArray[0].Uphone = "0";
                                $http.post($rootScope.serveropt + '/user/register', {msg:$scope.UserArray}).
                                success(function(data, status, headers, config) {
                                console.log(data);
                                $modalInstance.dismiss('cancel');
                                $http.post($rootScope.serveropt + '/event/CountrySearch', {msg:$rootScope.Country}).
				success(function(data, status, headers, config) {
				    console.log(data);
				    $rootScope.CityResults = data.data;
				    localStorage.setItem("CityResults", JSON.stringify($rootScope.CityResults));
				    $state.go('City');
				}). 
				error(function(data, status, headers, config) {
				});
                                }). 
                                error(function(data, status, headers, config) {
                                });
                            }
                            }). 
                            error(function(data, status, headers, config) {
                            });
                        })
                        .fail(function (error) {console.log(error);});
                        }).fail(function(err) {
                          console.log(err);
                        });
                    }
                
                };
            } 
        });
    };
    
    $scope.AdvancedSearch = function()
    {
        var modalInstance = $modal.open({
             templateUrl: 'Advaced.html',
             controller: function($scope,$modalInstance)
            {
                $scope.Price = 0;
                $scope.x = 0;
                $scope.AsearchInput = "Search By City";
                $scope.AsearchInputIndex= 'City';
                $scope.setSearch = function (option){$scope.AsearchInput = "Search By "+ option; $scope.AsearchInputIndex = option;};
                $scope.setX = function (c)
                {
                    $scope.x=c;
                    if(c == 0){$scope.Price = 0}
                };
                $scope.SearchByVal = function ()
                {
                    if ($scope.AsearchInputIndex == 'City') {
                        //code
                    }
                    else if ($scope.AsearchInputIndex == 'Category') {
                        //code
                    }
                    else if ($scope.AsearchInputIndex == 'Company') {
                        //code
                    }
                    else if ($scope.AsearchInputIndex == 'Venue') {
                        //code
                    }
                    else if ($scope.AsearchInputIndex == 'Event Name') {
                        //code
                    }
                    
                };
                $scope.ok = function () {
                
                        $scope.Adsearch = document.getElementById("AdSearch").value;
                        $scope.Price = document.getElementById("Price").value;
                        //$scope.Distance = document.getElementById("Distance").value;
                        $scope.StartDate = document.getElementById("StartDate").value;
                        $scope.EndDate = document.getElementById("EndDate").value;
                        if ($scope.Adsearch != '' & $scope.Adsearch != null & $scope.StartDate != '' & $scope.StartDate != null & $scope.EndDate != '' & $scope.EndDate != null)
                        {
                            $http.post($rootScope.serveropt + '/event/AdvancedSearch', {value: $scope.Adsearch , distance: $scope.Distance, startdate:$scope.StartDate, enddate:$scope.EndDate,price:$scope.Price,option: ($scope.AsearchInputIndex).toLowerCase() }).
                            success(function(data, status, headers, config) {
                            console.log(data);
                            
                            if ($scope.AsearchInputIndex == "City") {
                                    $rootScope.CityResults = data.data;
                                    localStorage.setItem("CityResults", JSON.stringify($rootScope.CityResults));
                                    $state.go('City');
                                    $modalInstance.dismiss('cancel');
                            }
                            else if ($scope.AsearchInputIndex == "Category") {
                                //$http.post($rootScope.serveropt + '/event/CategorySearch', {msg:$scope.Value}).
                                    $rootScope.CategoryResults = data.data;
                                    localStorage.setItem("CategoryResults", JSON.stringify($rootScope.CategoryResults));
                                    $state.go('Category');
                                    $modalInstance.dismiss('cancel');
                            }
                            else if ($scope.AsearchInputIndex == "Company") {
                                //code
                            }
                            else if ($scope.AsearchInputIndex == "Venue") {
                                    $rootScope.VenueResults = data.data;
                                    localStorage.setItem("VenueResults", JSON.stringify($rootScope.VenueResults));
                                    $state.go('Venue');
                                    $modalInstance.dismiss('cancel');
                            }
                            else if ($scope.AsearchInputIndex == "Event name") {
                                
                            }
                            }). 
                            error(function(data, status, headers, config) {
                            });
                        }
                        
                    };
                $scope.cancel = function () {$modalInstance.dismiss('cancel');};
                $scope.open = function($event,c) {
                     $event.preventDefault();
                        $event.stopPropagation();
                    if(c == 1){$scope.opened = true;}
                    else{$scope.opened1=true;}
                };

                $scope.dateOptions = {
                    formatYear: 'yy',
                    startingDay: 1
                };
            } 
        });
    };
    
    $scope.getLoc = function()
    {
        if (navigator.geolocation)
        {
            navigator.geolocation.getCurrentPosition(function (position)
            {
                geocoder = new google.maps.Geocoder();
                $scope.Lat = position.coords.latitude;
                console.log($scope.Lat);
                $scope.Lon = position.coords.longitude;
                console.log($scope.Lon);
                $scope.lll = new google.maps.LatLng($scope.Lat,$scope.Lon);
                 geocoder.geocode({'latLng': $scope.lll}, function(results, status) {
                    
                     if (status == google.maps.GeocoderStatus.OK) {if (results[1])
                     {
                        console.log(results[1]);
                        $rootScope.city = results[1].address_components[0].long_name;
                        setTimeout(function()
                        {
				$http.post($rootScope.serveropt + '/event/CitySearch', {msg:$rootScope.city}).
            			success(function(data, status, headers, config) {
                		console.log(data);
               			$rootScope.CityResults = data.data;
                		localStorage.setItem("CityResults", JSON.stringify($rootScope.CityResults));
				$location.path('/'+$rootScope.city);
                            	$scope.$apply();
                		//$state.go('City');
            			}). 
            			error(function(data, status, headers, config) {
            			});
                            
                        }, 1500);
                        
                     }}
                    
                    });       
            });       
        }
        else
        {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    };
    
    $scope.getLocation = function(val)
    {
        return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
            params: {
           address: val,
           sensor: false
            }
        }).then(function(response){
            return response.data.results.map(function(item){
           return item.formatted_address;
            });
        });
    };
    navigator.geolocation.getCurrentPosition(function (position)
            {
                geocoder = new google.maps.Geocoder();
                $scope.Lat = position.coords.latitude;
                console.log($scope.Lat);
                $scope.Lon = position.coords.longitude;
                console.log($scope.Lon);
                $scope.lll = new google.maps.LatLng($scope.Lat,$scope.Lon);
                });
                

    $scope.ll= new google.maps.LatLng(31.958868400000004 , 35.9418809);
    $scope.mapOptions = {
        center: $scope.ll,
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true
    };
    //Markers should be added after map is loaded
    $scope.onMapIdle = function() {
        if ($scope.myMarkers === undefined){
	    $http.post($rootScope.serveropt + '/event/GetMarkers', {msg:$rootScope.city}).
            success(function(data, status, headers, config) {
                console.log(data);
               			
            }). 
            error(function(data, status, headers, config) {
            });
            var marker = new google.maps.Marker({
                map: $scope.myMap,
                position: $scope.ll
            });
            $scope.myMarkers = [marker, ];
        }
    };
    $scope.markerClicked = function(m) {
        window.alert("clicked");
    };
    
    
    
});

Nevent.controller('ResutlsCtrl',function($scope , $rootScope,  $http, $modal)
{
    
});

Nevent.controller('CreateCtrl',function($scope , $rootScope,  $http, $modal,$state)
{
    $scope.x = 0;
    $scope.y = 1; //1
    $scope.Volunteer = false;
    $scope.user= '';
    if (localStorage["email"] != null) {
        $scope.y = 0;
        if (localStorage["fname"] != null)
        {
            $scope.user = localStorage["fname"] + ' ' + localStorage["lname"];
        }
        else
        {
            $scope.user = localStorage["cname"];    
        }
    }
    $scope.eventType = 0;
    $scope.TicketID = 0;
    $scope.Category= '';
    $scope.SubCategory= '';
    $scope.startTime = new Date();
    $scope.endTime = new Date();
    $scope.Categories = [{"option":"Music","id":"1"},{"option":"Conventions","id":"2"},{"option":"Conference","id":"3"},{"option":"Parties","id":"4"},{"option":"Sport","id":"5"},{"option":"Seminars","id":"6"},{"option":"Outdoor","id":"7"}];
    $scope.SubCategories = [{"option":"Arabic","id":"1"},{"option":"English","id":"1"},{"option":"Alternative","id":"1"},{"option":"Pop","id":"1"},{"option":"Scientific","id":"2"},{"option":"Literature","id":"2"},{"option":"Product","id":"2"},{"option":"Educational","id":"3"},{"option":"Entrepreneurial ","id":"3"},{"option":"Birthdays ","id":"4"},{"option":"Wedding ","id":"4"},{"option":"Themed Parties ","id":"4"},{"option":"Racing/Drift","id":"5"},{"option":"Biking","id":"5"},{"option":"Football","id":"5"},{"option":"Basketball","id":"5"},{"option":"Marathons","id":"5"},{"option":"others ","id":"5"},{"option":"Scientific","id":"6"},{"option":"Self development","id":"6"},{"option":"Entrepreneurial","id":"6"},{"option":"Hiking","id":"7"},{"option":"Walking","id":"7"},{"option":"Running","id":"7"},{"option":"Outdoor photography","id":"7"}];
    $scope.Tickets = [];
    $scope.setX = function (c){$scope.x=c;};
    $scope.open = function($event,c)
    {
        $event.preventDefault();
        $event.stopPropagation();
        if(c == 1){$scope.opened = true;}
        else{$scope.opened1=true;}
    };
    $scope.dateOptions = {formatYear: 'yy',startingDay: 1};
    $scope.GetCategory = function (c,i)
    {
        $scope.Category = c;
        $scope.CategoryID = i;
    };
    $scope.GetSubCategory = function (c)
    {
        $scope.SubCategory = c;
    };
    $scope.NewTicket = function ()
    {
        $scope.Tickets.push({"id":$scope.TicketID,"Type":"Free","TicketName":"","TicketNumber":"","TicketPrice":""});
        $scope.TicketID = $scope.TicketID + 1;
    };
    $scope.NewTicket();
    $scope.RemTicket = function ()
    {
        $scope.Tickets.pop();    
    };
    $scope.GetTicketType = function (c){$scope.Tickets[c].Type = document.getElementById("TicketType"+c).options[document.getElementById("TicketType"+c).selectedIndex].value;};
    $scope.GetTicketName = function (c){$scope.Tickets[c].TicketName = document.getElementById("TicketName"+c).value};
    $scope.GetTicketNumbers = function(c){$scope.Tickets[c].TicketNumber = document.getElementById("TicketNumber"+c).value};
    $scope.GetTicketPrice = function (c) {$scope.Tickets[c].TicketPrice = document.getElementById("TicketPrice"+c).value};
    $scope.SearchByCC = function ()
    {
        $scope.CompCountry =document.getElementById("CompCountry").value;
        $scope.CompCity =document.getElementById("CompCity").value;
        $http.post($rootScope.serveropt + '/event/LookCompany', {city: $scope.CompCity, country:$scope.CompCountry }).
            success(function(data, status, headers, config) {
            console.log(data);
            localStorage.setItem("CompanyResults", JSON.stringify(data));
            $state.go('Companies');
            }).
            error(function(data, status, headers, config) {
            });
    };
    $scope.SearchByCompany = function ()
    {
        $scope.CompanyName =document.getElementById("CompanyName").value;
        $http.post($rootScope.serveropt + '/event/OneCompany', {company: $scope.CompanyName}).
            success(function(data, status, headers, config) {
            console.log(data);
            localStorage.setItem("CompanyResult", JSON.stringify(data));
            $state.go('OneCompany');
            }).
            error(function(data, status, headers, config) {
            });
    };
    $scope.SearchByCategory = function ()
    {
        $http.post($rootScope.serveropt + '/event/LookCategory', {category: $scope.Category}).
            success(function(data, status, headers, config) {
            console.log(data);
            localStorage.setItem("CompanyResults", JSON.stringify(data));
            $state.go('Companies');
            }).
            error(function(data, status, headers, config) {
            });
    };
    $scope.EventType= function (c)
    {
        $scope.eventType = c;
    }
    $scope.CreateEvent = function ()
    {
        $scope.EventName = document.getElementById("EventName").value;
        $scope.EventDesc = document.getElementById("EventDesc").value;
        $scope.EventCountry = document.getElementById("EventCountry").value;
        $scope.EventCity = document.getElementById("EventCity").value;
        $scope.EventPhone = document.getElementById("EventPhone").value;
        $scope.EventEmail = document.getElementById("EventEmail").value;
        $scope.EventSDate = document.getElementById("EventSDate").value;
        $scope.EventEDate = document.getElementById("EventEDate").value;
        $scope.EventImage = document.getElementById("EventImage").value;
        if ($scope.EventImage == null | $scope.EventImage == '') {
            $scope.EventImage = "css/test.jpg";
        }
        $scope.tags;
        if ($scope.EventName != null & $scope.EventName != '' & $scope.EventDesc != null & $scope.EventDesc != '' & $scope.EventCountry != null & $scope.EventCountry != '' & $scope.EventCity != null & $scope.EventCity != '' & $scope.EventPhone != null & $scope.EventPhone != '' & $scope.EventEmail != null & $scope.EventEmail != '' & $scope.EventSDate != null & $scope.EventSDate != '' & $scope.EventEDate != null & $scope.EventEDate != '')
        {
            if($scope.Volunteer == true){$scope.vol = 1;}else{$scope.vol = 0;}
            $http.post($rootScope.serveropt + '/event/CreateEvent', {event: $scope.EventName, desc:$scope.EventDesc, country: $scope.EventCountry, city:$scope.EventCity,phone: $scope.EventPhone, email: $scope.EventEmail, startdate: $scope.EventSDate,enddate: $scope.EventEDate, img: $scope.EventImage, tags: $scope.tags, starttime: ($scope.startTime).toString().substring(17,21), endtime: ($scope.endTime).toString().substring(17,21), tickets: $scope.Tickets, type:$scope.eventType, category: $scope.Category, subcategory: $scope.SubCategory, userid: localStorage["user_id"], username: $scope.user,volunteer:$scope.vol }).
            success(function(data, status, headers, config) {
                console.log(data);
                localStorage.setItem("EventResults", JSON.stringify(data));
                $state.go('Event');
            }).
            error(function(data, status, headers, config) {
            });
        }
    };
    $scope.Sign = function ()
    {
        
        $state.go('Sign');
        
    }
});


Nevent.controller('CityCtrl',function($scope , $rootScope,  $http, $modal,$state)
{
    $scope.CResults = JSON.parse(localStorage.getItem("CityResults"));
    console.log(JSON.parse(localStorage.getItem("CityResults")));
    console.log($scope.CResults);
    $scope.gotoEvent = function(event)
    {
        localStorage.setItem("EventResults", JSON.stringify(event));
        console.log(event);
        $state.go('Event');
        
    }
});

Nevent.controller('CompanyCtrl',function($scope , $rootScope,  $http, $modal,$state)
{
    $scope.ComResults = JSON.parse(localStorage.getItem("CompanyResults"));
    console.log($scope.ComResults);
    $scope.gotoEvent = function(event)
    {
        localStorage.setItem("EventResults", JSON.stringify(event));
        console.log(event);
        $state.go('Event');
        
    }
});

Nevent.controller('CategoryCtrl',function($scope , $rootScope,  $http, $modal,$state)
{
    $scope.CatResults = JSON.parse(localStorage.getItem("CategoryResults"));
    console.log($scope.CatResults);
    $scope.gotoEvent = function(event)
    {
        localStorage.setItem("EventResults", JSON.stringify(event));
        console.log(event);
        $state.go('Event');
        
    }
});

Nevent.controller('VenueCtrl',function($scope , $rootScope,  $http, $modal,$state)
{
    $scope.VenResults = JSON.parse(localStorage.getItem("VenueResults"));
    console.log($scope.VenResults);
    $scope.gotoEvent = function(event)
    {
        localStorage.setItem("EventResults", JSON.stringify(event));
        console.log(event);
        $state.go('Event');
        
    }
});

Nevent.controller('ProfileCtrl',function($scope , $rootScope,  $http, $modal,$state)
{
    
});

Nevent.controller('SignCtrl',function($scope , $rootScope,  $http, $modal,$state)
{
    $scope.x=0;
$scope.y=0;
$scope.v=0;
$scope.setV = function (c){$scope.v=c;};
$scope.setX = function (c){$scope.x=c;};
$scope.AuthArray = [{'Pass':'0','Email':'0','User':'0','Phone':'0'}];
$scope.CompanyAuthArray = [{'Pass':'0','Email':'0','User':'0','Phone':'0'}];
                $scope.ok = function () {
                    if ($scope.x == 1)
                    {
                        $scope.CUserArray = [{'Cname':'','CUname':'','Cwebsite':'','Cemail':'','Cpassword':'','Cphone':''}];
                        $scope.CUserArray[0].Cname =document.getElementById("CName").value;
                        $scope.CUserArray[0].CUname =document.getElementById("CUName").value;
                        $scope.CUserArray[0].Cemail =document.getElementById("CEmail").value;  $rootScope.CEm =document.getElementById("UEmail").value;
                        $scope.CUserArray[0].Cpassword =document.getElementById("CPassword").value;
                        $scope.Crpassword =document.getElementById("CRPassword").value;
                        $scope.CUserArray[0].Cwebsite =document.getElementById("CWebsite").value;
                        $scope.CUserArray[0].Cphone =document.getElementById("CPhone").value;
                        if ($scope.CUserArray[0].Cname != '' & $scope.CUserArray[0].Cname != null & $scope.CUserArray[0].CUname != '' & $scope.CUserArray[0].CUname != null & $scope.CUserArray[0].Cemail != '' & $scope.CUserArray[0].Cemail != null & $scope.CUserArray[0].Cpassword != '' & $scope.CUserArray[0].Cpassword != null & $scope.CUserArray[0].Cwebsite != '' & $scope.CUserArray[0].Cwebsite != null & $scope.CUserArray[0].Cphone != '' & $scope.CUserArray[0].Cphone != null & $scope.CompanyAuthArray[0].Pass == '1' & $scope.CompanyAuthArray[0].Email == '1' & $scope.CompanyAuthArray[0].Phone == '1' & $scope.CompanyAuthArray[0].User == '1')
                        {
                            $http.post($rootScope.serveropt + '/user/cregister', {msg:$scope.CUserArray}).
                            success(function(data, status, headers, config) {
                            console.log(data);
                            $modalInstance.dismiss('cancel');
                            var modalInstance = $modal.open({
                                templateUrl: 'verify.html',
                                controller: function($scope,$modalInstance,$rootScope)
                                {
                                    $scope.ok = function ()
                                    {
                                        $scope.veri = document.getElementById("Verify").value;
                                        $http.post($rootScope.serveropt + '/user/cverify', {msg:$scope.veri, email: $rootScope.CEm}).
                                        success(function(data, status, headers, config) {
                                            console.log(data);
                                           $modalInstance.dismiss('cancel');
                                           $http.post($rootScope.serveropt + '/event/CountrySearch', {msg:$rootScope.Country}).
                                            success(function(data, status, headers, config) {
                                                console.log(data);
                                                $rootScope.CityResults = data.data;
                                                localStorage.setItem("CityResults", JSON.stringify($rootScope.CityResults));
                                                $state.go('City');
                                            }). 
                                            error(function(data, status, headers, config) {
                                            });                   
                                        }). 
                                        error(function(data, status, headers, config) {
                                        });
                                    }    
                                }
                            });
                            
                            }). 
                            error(function(data, status, headers, config) {
                            });
                        }
                        else
                        {
                            $scope.y=0;
                            alert('Please fill all fields');
                        }
                    }
                    else if ($scope.x == 0) 
                    {
                        $scope.y=1;
                        $scope.UserArray = [{'Fname':'','Lname':'','Nname':'','Uemail':'','Upassword':'','Uphone':''}];
                        $scope.UserArray[0].Fname = document.getElementById("FName").value;
                        $scope.UserArray[0].Lname = document.getElementById("LName").value;
                        $scope.UserArray[0].Nname = document.getElementById("NName").value;
                        $scope.UserArray[0].Uemail = document.getElementById("UEmail").value; $rootScope.Em =document.getElementById("UEmail").value;
                        $scope.UserArray[0].Upassword = document.getElementById("UPassword").value;
                        $scope.Urpassword = document.getElementById("URPassword").value;
                        $scope.UserArray[0].Uphone = document.getElementById("UPhone").value;
                        if ($scope.UserArray[0].Fname != '' & $scope.UserArray[0].Fname != null & $scope.UserArray[0].Lname != '' & $scope.UserArray[0].Lname != null & $scope.UserArray[0].Nname != '' & $scope.UserArray[0].Nname != null & $scope.UserArray[0].Uemail != '' & $scope.UserArray[0].Uemail != null & $scope.UserArray[0].Upassword != '' & $scope.UserArray[0].Upassword != null & $scope.UserArray[0].Uphone != '' & $scope.UserArray[0].Uphone != null & $scope.AuthArray[0].Pass == '1' & $scope.AuthArray[0].Email == '1' & $scope.AuthArray[0].Phone == '1' & $scope.AuthArray[0].User == '1')
                        {
                            $http.post($rootScope.serveropt + '/user/register', {msg:$scope.UserArray}).
                            success(function(data, status, headers, config) {
                            console.log(data);
                            $modalInstance.dismiss('cancel');
                            var modalInstance = $modal.open({
                                templateUrl: 'verify.html',
                                controller: function($scope,$modalInstance,$rootScope)
                                {
                                    $scope.ok = function ()
                                    {   console.log(data);
                                        $scope.veri = document.getElementById("Verify").value;
                                        $http.post($rootScope.serveropt + '/user/verify', {msg:$scope.veri, email: $rootScope.Em}).
                                        success(function(data, status, headers, config) {
                                            console.log(data);
                                            if (data.result.status == "Valid") {
                                                $http.post($rootScope.serveropt + '/event/CountrySearch', {msg:$rootScope.Country}).
                                                success(function(data, status, headers, config) {
                                                    console.log(data);
                                                    $rootScope.CityResults = data.data;
                                                    localStorage.setItem("CityResults", JSON.stringify($rootScope.CityResults));
                                                    $state.go('City');
                                                }). 
                                                error(function(data, status, headers, config) {
                                                });
                                            $modalInstance.dismiss('cancel');
                                        }
                                        }). 
                                        error(function(data, status, headers, config) {
                                        });
                                    }    
                                }
                            });
                            
                            }). 
                            error(function(data, status, headers, config) {
                            });
                        }
                        else
                        {
                            $scope.y=0;
                            alert('Please fill all fields');
                        }
                        
                    }
                };
                $scope.CheckPassword = function ()
                {
                    $scope.matched = '';
                    if (document.getElementById("UPassword").value != '' & document.getElementById("UPassword").value != null & $scope.x == 0)
                    {
                
                        if (document.getElementById("UPassword").value != document.getElementById("URPassword").value)
                        {
                            $scope.matched = 'Not Matched';
                        }
                        else
                        {
                            $scope.matched = 'Matched';
                            $scope.AuthArray[0].Pass = '1';
                        }
                    }
                    else if (document.getElementById("CPassword").value != '' & document.getElementById("CRPassword").value != null & $scope.x == 1)
                    {
                        if (document.getElementById("CPassword").value != document.getElementById("CRPassword").value)
                        {
                            $scope.matched = 'Not Matched';
                        }
                        else
                        {
                            $scope.matched = 'Matched';
                            $scope.CompanyAuthArray[0].Pass = '1';
                        }
                    }
                };
                $scope.CheckUser = function ()
                {
                    $scope.checking = '';
                    var pattern = new RegExp(/[~`!#$@()A-Z\u0600-\u060f\u061f\u066d\u06dd\u06de\u06e9\ufd3e\ufd3f\ufdf0-\ufdfd.%\^&*+=\-\[\]\\';,/{}|\\"":<>\?]/);
                    var pat = new RegExp(/^\d+$/);
                    var patt = new RegExp(/^[0-9]/);
                    if ($scope.x == 0) {
                        $scope.usern = document.getElementById("NName").value;
                    }
                    else if ($scope.x == 1) {
                        $scope.usern = document.getElementById("CUName").value;
                    }
                    
                    if ($scope.usern != '' & $scope.usern != null)
                    {
                        if(pat.test($scope.usern) || pattern.test($scope.usern) | patt.test($scope.usern))
                        {
                            alert("You can only use Alphabet, Numbers, and Underscore. You can't start with a Number and you can't use Capital Latter");
                        }
                        else
                        {
                            $http.post($rootScope.serveropt + '/user/checkuser', {usern:$scope.usern}).
                            success(function(data, status, headers, config) {
                                console.log(data);
                                if (data.result.status == 'AVAILABLE') {
                                    $scope.checking = 'Available';
                                    if ($scope.x == 0 ){$scope.AuthArray[0].User = '1';}
                                    if ($scope.x == 1 ){$scope.CompanyAuthArray[0].User = '1';}
                                }
                                else if (data.result.status == 'ACTIVE') {
                                    $scope.checking = 'Taken';
                                }
                            }). 
                            error(function(data, status, headers, config) {
                            });
                        }
                    }
                };
                $scope.CheckCompany = function ()
                {
                    $scope.checking = '';
                    var pattern = new RegExp(/[~`!#$@()A-Z\u0600-\u060f\u061f\u066d\u06dd\u06de\u06e9\ufd3e\ufd3f\ufdf0-\ufdfd.%\^&*+=\-\[\]\\';,/{}|\\"":<>\?]/);
                    var pat = new RegExp(/^\d+$/);
                    var patt = new RegExp(/^[0-9]/);
                    $scope.usern = document.getElementById("CUName").value;
                    if ($scope.usern != '' & $scope.usern != null)
                    {
                        if(pat.test($scope.usern) || pattern.test($scope.usern) | patt.test($scope.usern))
                        {
                            alert("You can only use Alphabet, Numbers, and Underscore. You can't start with a Number and you can't use Capital Latter");
                        }
                        else
                        {
                            $http.post($rootScope.serveropt + '/user/checkcompany', {usern:$scope.usern}).
                            success(function(data, status, headers, config) {
                                if (data.result.status == 'AVAILABLE') {
                                    $scope.checking = 'Available';
                                    $scope.CompanyAuthArray[0].Company = '1';
                                }
                                else if (data.result.status == 'ACTIVE') {
                                    $scope.checking = 'Taken';
                                }
                            }). 
                            error(function(data, status, headers, config) {
                            });
                        }
                    }
                };
                $scope.CheckPhone = function ()
                {
                    var patter = new RegExp(/^[0-9]+$/);
                    if ($scope.x == 0) {
                        if(patter.test(document.getElementById("UPhone").value)){$scope.AuthArray[0].Phone = '1';}
                        else {alert("You can only use Numbers");}
                    }
                    else if ($scope.x == 1) {
                        if(patter.test(document.getElementById("CPhone").value)){$scope.CompanyAuthArray[0].Phone = '1';}
                        else {alert("You can only use Numbers");}
                    }
                    
                };
                $scope.CheckEmail = function ()
                {
                    $scope.cemail = '';
                    var re = new RegExp (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);    
                    if (document.getElementById("UEmail").value != '' & document.getElementById("UEmail").value != null & $scope.x == 0)
                    {
                        if (re.test(document.getElementById("UEmail").value))
                        {
                            $scope.cemail = 'Valid';
                            $scope.AuthArray[0].Email = '1';
                        }
                        else {$scope.cemail = 'Not Valid';}
                    }
                    else if (document.getElementById("CEmail").value != '' & document.getElementById("CEmail").value != null & $scope.x == 1)
                    {
                        if (re.test(document.getElementById("CEmail").value))
                        {
                            $scope.cemail = 'Valid';
                            $scope.CompanyAuthArray[0].Email = '1';
                        }
                        else {$scope.cemail = 'Not Valid';}
                    }
                    
                };
        $scope.SocialLogin = function (c)
                {
                    OAuth.initialize('Jxw4nhMD7lmM0SwUbG23cwIy3AQ')
                    if (c == 'facebook') {
                        OAuth.popup('facebook').done(function(result) {
                        console.log(result);
                        result.get('/me').done(function (response)
                        {
                            console.log(response);
                            $http.post($rootScope.serveropt + '/user/clogin', {email: response.email , password: result.access_token}).
                            success(function(data, status, headers, config) {
                            console.log(data);
                            if (data.length != 0) {
                                localStorage["email"] = data.data[0].email;
                                localStorage["password"] = data.data[0].password;
                                localStorage["phone"] = data.data[0].phone;
                                localStorage["fname"] = data.data[0].fname;
                                localStorage["lname"] = data.data[0].lname;
                                localStorage["uname"] = data.data[0].uname;
                                localStorage["user_id"] = data.data[0].user_id;
                                $modalInstance.dismiss('cancel');
                $http.post($rootScope.serveropt + '/event/CountrySearch', {msg:$rootScope.Country}).
                success(function(data, status, headers, config) {
                    console.log(data);
                    $rootScope.CityResults = data.data;
                    localStorage.setItem("CityResults", JSON.stringify($rootScope.CityResults));
                    $state.go('City');
                }). 
                error(function(data, status, headers, config) {
                });
                            }
                            else
                            {
                                $scope.UserArray = [{'Fname':'','Lname':'','Nname':'','Uemail':'','Upassword':'','Uphone':''}];
                                $scope.UserArray[0].Fname = response.first_name;
                                $scope.UserArray[0].Lname = response.last_name;
                                $scope.UserArray[0].Nname = "u"+response.first_name+response.last_name;
                                $scope.UserArray[0].Uemail = response.email;
                                $scope.UserArray[0].Upassword = result.access_token;
                                $scope.UserArray[0].Uphone = "0";
                                $http.post($rootScope.serveropt + '/user/register', {msg:$scope.UserArray}).
                                success(function(data, status, headers, config) {
                                console.log(data);
                                $modalInstance.dismiss('cancel');
                                $http.post($rootScope.serveropt + '/event/CountrySearch', {msg:$rootScope.Country}).
                success(function(data, status, headers, config) {
                    console.log(data);
                    $rootScope.CityResults = data.data;
                    localStorage.setItem("CityResults", JSON.stringify($rootScope.CityResults));
                    $state.go('City');
                }). 
                error(function(data, status, headers, config) {
                });
                                }). 
                                error(function(data, status, headers, config) {
                                });
                            }
                            }). 
                            error(function(data, status, headers, config) {
                            });
                        })
                        .fail(function (error) {console.log(error);});
                        }).fail(function(err) {
                          console.log(err);
                        });
                    }
                
                };


$scope.m = 0;
                $scope.setM = function (c){$scope.m=c;};
                $scope.ok = function ()
                {
                    if ($scope.m == 0) {
                        $scope.Lemail =document.getElementById("LoginEmail").value;
                        $scope.Lpassword =document.getElementById("LoginPassword").value;
                        if ($scope.Lemail != '' & $scope.Lemail != null & $scope.Lpassword != '' & $scope.Lpassword != null)
                        {
                            $http.post($rootScope.serveropt + '/user/login', {email: $scope.Lemail , password: $scope.Lpassword}).
                            success(function(data, status, headers, config) {
                            console.log(data);
                            if (data.length != 0) {
                                localStorage["email"] = data.data[0].email;
                                localStorage["password"] = data.data[0].password;
                                localStorage["phone"] = data.data[0].phone;
                                localStorage["fname"] = data.data[0].fname;
                                localStorage["lname"] = data.data[0].lname;
                                localStorage["uname"] = data.data[0].uname;
                                localStorage["user_id"] = data.data[0].user_id;
                                $modalInstance.dismiss('cancel');
                $http.post($rootScope.serveropt + '/event/CountrySearch', {msg:$rootScope.Country}).
                success(function(data, status, headers, config) {
                    console.log(data);
                    $rootScope.CityResults = data.data;
                    localStorage.setItem("CityResults", JSON.stringify($rootScope.CityResults));
                    $state.go('City');
                }). 
                error(function(data, status, headers, config) {
                });
                            }
                            else{alert("Wrong email or password");}
                            }). 
                            error(function(data, status, headers, config) {
                            });
                        } 
                    }
                    else if ($scope.m == 1) {
                        $scope.Lemail =document.getElementById("CLoginEmail").value;
                        $scope.Lpassword =document.getElementById("CLoginPassword").value;
                        if ($scope.Lemail != '' & $scope.Lemail != null & $scope.Lpassword != '' & $scope.Lpassword != null)
                        {
                            $http.post($rootScope.serveropt + '/user/clogin', {email: $scope.Lemail , password: $scope.Lpassword}).
                            success(function(data, status, headers, config) {
                            console.log(data);
                            if (data.length != 0) {
                                localStorage["email"] = data.data[0].email;
                                localStorage["password"] = data.data[0].password;
                                localStorage["phone"] = data.data[0].phone;
                                localStorage["cname"] = data.data[0].cname;
                                localStorage["website"] = data.data[0].website;
                                localStorage["uname"] = data.data[0].uname;
                                localStorage["user_id"] = data.data[0].user_id;
                                $modalInstance.dismiss('cancel');
                $http.post($rootScope.serveropt + '/event/CountrySearch', {msg:$rootScope.Country}).
                success(function(data, status, headers, config) {
                    console.log(data);
                    $rootScope.CityResults = data.data;
                    localStorage.setItem("CityResults", JSON.stringify($rootScope.CityResults));
                    $state.go('City');
                }). 
                error(function(data, status, headers, config) {
                });
                            }
                            }). 
                            error(function(data, status, headers, config) {
                            });
                        }
                    }
                              
                };
});

Nevent.controller('OnecCtrl',function($scope , $rootScope,  $http, $modal,$state)
{
    
});

Nevent.controller('McCtrl',function($scope , $rootScope,  $http, $modal,$state)
{
    
});


Nevent.controller('EventCtrl',function($scope , $rootScope,  $http, $modal,$state)
{
    $scope.y = 1;
    if (localStorage["email"] != null) {
        $scope.y = 0;
    }

    $rootScope.EventResults = JSON.parse(localStorage.getItem("EventResults"));
    Socialite.load();
    Socialite.setup({
       
       facebook: {
        lang     : 'en_GB',
        appId    : 366929200151104,
        onlike   : function(url) { /* ... */ },
        onunlike : function(url) { /* ... */ },
        onsend   : function(url) { /* ... */ }
        },
        twitter: {
        lang       : 'en',
        onclick    : function(e) { /* ... */ },
        ontweet    : function(e) { /* ... */ },
        onretweet  : function(e) { /* ... */ },
        onfavorite : function(e) { /* ... */ },
        onfollow   : function(e) { /* ... */ }
        },
        googleplus: {
        lang               : 'en-GB',
        onstartinteraction : function(el, e) { /* ... */ },
        onendinteraction   : function(el, e) { /* ... */ },
        callback           : function(el, e) { /* ... */ }
        },
       
    });
    $scope.rate = $rootScope.EventResults.rate;
    $scope.max = 10;
    $scope.isReadonly = false;
    $scope.hoveringOver = function(value)
    {
        if($scope.y == 0)
        {
            $http.post($rootScope.serveropt + '/event/Rate', {event_id:$rootScope.EventResults.event_id, user_id:localStorage["uname"],rate:value }).
            success(function(data, status, headers, config) {
                    console.log(data);
            }). 
            error(function(data, status, headers, config) {});
            $scope.overStar = value;
            $scope.percent = 100 * (value / $scope.max);
        }
        else
        {$state.go('Sign');}
    };
    
    $scope.YGoing = function ()
    {
        if($scope.y == 0)
        {
            $http.post($rootScope.serveropt + '/event/YGoing', {event_id:$rootScope.EventResults.event_id, user_id:localStorage["uname"] }).
            success(function(data, status, headers, config) {
                console.log(data);
            }). 
            error(function(data, status, headers, config) {
            });
        }
        else
        {$state.go('Sign');}
    };
    $scope.MGoing = function ()
    {
        if($scope.y == 0)
        {
            $http.post($rootScope.serveropt + '/event/MGoing', {event_id:$rootScope.EventResults.event_id, user_id:localStorage["uname"] }).
            success(function(data, status, headers, config) {
                console.log(data);
            }). 
            error(function(data, status, headers, config) {
            });
        }
        else
        {$state.go('Sign');}    
    };
    $scope.NGoing = function ()
    {
        if($scope.y == 0)
        {
            $http.post($rootScope.serveropt + '/event/NGoing', {event_id:$rootScope.EventResults.event_id, user_id:localStorage["uname"] }).
            success(function(data, status, headers, config) {
                console.log(data);
            }). 
            error(function(data, status, headers, config) {
            });
        }
        else
        {$state.go('Sign');}
    };
    
    $scope.Invite = function ()
    {
            
    };
    
});
