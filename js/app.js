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
    $rootScope.serveropt = 'http://localhost:1337';
    $scope.searchOptions = [{"option":"Event name"},{"option":"Category"},{"option":"Company"},{"option":"City"},{"option":"Venue"}];
    $scope.searchInput = "Search By City";
    $scope.searchInputChanger = function(option)
    {
       $scope.searchInput = "Search By "+ option;
       $scope.typeAheadIndex = option;
    };
    $scope.searchTypeAhead = function ()
    {
        //send ajax and get the list inside the array and show it to the user in the typeahead
        $scope.TypeAheadList = [];
    };
    $scope.Search= function ()
    {
        alert("oke");
    };
    
    //date
   
    
    $scope.addEvent = function()
    {
        var modalInstance = $modal.open({
             templateUrl: 'addEvent.html',
            controller: function($scope, $state,$modalInstance)
            {
                $scope.ok = function () {$state.go('NewEvent');$modalInstance.dismiss('cancel');};
                $scope.cancel = function () {$modalInstance.dismiss('cancel');};
            } 
        });
    };
    
    $scope.Signup = function()
    {
        var modalInstance = $modal.open({
             templateUrl: 'Signup.html',
             controller: function($scope,$modalInstance)
            {   $scope.x=0;
                $scope.y=0;
                $scope.AuthArray = [{'Pass':'0','Email':'0','Company':'0','Phone':'0'}];
                $scope.CompanyAuthArray = [{'Pass':'0','Email':'0','User':'0','Phone':'0'}];
                $scope.setX = function (c){$scope.x=c;};
                $scope.ok = function () {
                    if ($scope.x == 1)
                    {
                        $scope.Cname =document.getElementById("CName").value;
                        $scope.CUname =document.getElementById("CUName").value;
                        $scope.Cemail =document.getElementById("CEmail").value;
                        $scope.Cpassword =document.getElementById("CPassword").value;
                        $scope.Crpassword =document.getElementById("CRPassword").value;
                        $scope.Cwebsite =document.getElementById("CWebsite").value;
                        $scope.Cphone =document.getElementById("CPhone").value;
                        if ($scope.Cname != '' & $scope.Cname != null & $scope.Cemail != '' & $scope.Cemail != null & $scope.Cpassword != '' & $scope.Cpassword != null & $scope.Cwebsite != '' & $scope.Cwebsite != null & $scope.Cphone != '' & $scope.Cphone != null & $scope.CompanyAuthArray[0].Pass == '1' & $scope.CompanyAuthArray[0].Email == '1' & $scope.CompanyAuthArray[0].Phone == '1' & $scope.CompanyAuthArray[0].Company == '1')
                        {
                            $http.post('http://localhost:1337/user/cregister', {msg:$scope.UserArray}).
                            success(function(data, status, headers, config) {
                            console.log(data);
                            console.log(status);
                            
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
                        $scope.UserArray[0].Uemail = document.getElementById("UEmail").value;
                        $scope.UserArray[0].Upassword = document.getElementById("UPassword").value;
                        $scope.Urpassword = document.getElementById("URPassword").value;
                        $scope.UserArray[0].Uphone = document.getElementById("UPhone").value;
                        if ($scope.UserArray[0].Fname != '' & $scope.UserArray[0].Fname != null & $scope.UserArray[0].Lname != '' & $scope.UserArray[0].Lname != null & $scope.UserArray[0].Nname != '' & $scope.UserArray[0].Nname != null & $scope.UserArray[0].Uemail != '' & $scope.UserArray[0].Uemail != null & $scope.UserArray[0].Upassword != '' & $scope.UserArray[0].Upassword != null & $scope.UserArray[0].Uphone != '' & $scope.UserArray[0].Uphone != null & $scope.AuthArray[0].Pass == '1' & $scope.AuthArray[0].Email == '1' & $scope.AuthArray[0].Phone == '1' & $scope.AuthArray[0].User == '1')
                        {
                            $http.post('http://localhost:1337/user/register', {msg:$scope.UserArray}).
                            success(function(data, status, headers, config) {
                            console.log(data);
                            console.log(status);
                            
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
                    $scope.usern = document.getElementById("NName").value;
                    if ($scope.usern != '' & $scope.usern != null)
                    {
                        if(pat.test($scope.usern) || pattern.test($scope.usern) | patt.test($scope.usern))
                        {
                            alert("You can only use Alphabet, Numbers, and Underscore. You can't start with a Number and you can't use Capital Latter");
                        }
                        else
                        {
                            $http.post('http://localhost:1337/user/checkuser', {usern:$scope.usern}).
                            success(function(data, status, headers, config) {
                                if (data.result.status == 'AVAILABLE') {
                                    $scope.checking = 'Available';
                                    $scope.AuthArray[0].User = '1';
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
                            $http.post('http://localhost:1337/user/checkcompany', {usern:$scope.usern}).
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
            } 
        });
    };
    
    
    $scope.Signin = function()
    {
        var modalInstance = $modal.open({
            templateUrl: 'Signin.html',
            controller: function($scope,$modalInstance)
            {
                $scope.ok = function ()
                {
                    $scope.Lemail =document.getElementById("LoginEmail").value;
                    $scope.Lpassword =document.getElementById("LoginPassword").value;
                    if ($scope.Lemail != '' & $scope.Lemail != null & $scope.Lpassword != '' & $scope.Lpassword != null)
                    {
                        $http.post($rootScope.serveropt + '/user/login', {email: $scope.Lemail , password: $scope.Lpassword}).
                        success(function(data, status, headers, config) {
                        console.log(data);
                        localStorage["email"] = data.data[0].email;
                        localStorage["password"] = data.data[0].password;
                        localStorage["phone"] = data.data[0].phone;
                        localStorage["fname"] = data.data[0].fname;
                        localStorage["lname"] = data.data[0].lname;
                        localStorage["uname"] = data.data[0].uname;
                        localStorage["user_id"] = data.data[0].user_id;
                        }). 
                        error(function(data, status, headers, config) {
                        });
                    }           
                };
                $scope.cancel = function () {$modalInstance.dismiss('cancel');};
                
            } 
        });
    };
    
    $scope.AdvancedSearch = function()
    {
        var modalInstance = $modal.open({
             templateUrl: 'Advaced.html',
             controller: function($scope,$modalInstance)
            {
                $scope.x = 0;
                $scope.AsearchInput = "Search By City";
                $scope.setSearch = function (option){$scope.AsearchInput = "Search By "+ option;};
                $scope.setX = function (c){$scope.x=c;};
                $scope.ok = function () {
                
                        $scope.Adsearch =document.getElementById("AdSearch").value;
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
                        {$location.path('/'+$rootScope.city);
                        $scope.$apply();
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

Nevent.controller('CreateCtrl',function($scope , $rootScope,  $http, $modal)
{
    $scope.x=0;
    $scope.TicketID=0;
    $scope.Categories = [{"option":"Sport","id":"1"},{"option":"Educational","id":"2"},{"option":"Business","id":"3"}];
    $scope.SubCategories = [{"option":"Football","id":"1"},{"option":"Basketball","id":"1"},{"option":"Ecosystem","id":"3"}];
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
        $scope.Tickets.push({"id":$scope.TicketID,"Type":"","TicketName":"","TicketNumber":"","TicketPrice":""});
        $scope.TicketID = $scope.TicketID + 1;
    };
    $scope.NewTicket();
    $scope.GetTicketType = function (c){$scope.Tickets[c].Type = document.getElementById("TicketType"+c).options[document.getElementById("TicketType"+c).selectedIndex].value;};
    $scope.GetTicketName = function (c){$scope.Tickets[c].TicketName = document.getElementById("TicketName"+c).value};
    $scope.GetTicketNumbers = function(c){$scope.Tickets[c].TicketNumber = document.getElementById("TicketNumber"+c).value};
    $scope.GetTicketPrice = function (c) {$scope.Tickets[c].TicketPrice = document.getElementById("TicketPrice"+c).value};
    $scope.SearchByCC = function ()
    {
        $scope.CompCountry =document.getElementById("CompCountry").value;
        $scope.CompCity =document.getElementById("CompCity").value;   
    };
    $scope.SearchByCompany = function ()
    {
        $scope.CompanyName =document.getElementById("CompanyName").value;  
    };
    $scope.CreateEvent = function ()
    {
        $scope.EventName =document.getElementById("EventName").value;
        $scope.EventDesc =document.getElementById("EventDesc").value;
        $scope.EventCountry =document.getElementById("EventCountry").value;
        $scope.EventCity =document.getElementById("EventCity").value;  
    };
});


Nevent.controller('CityCtrl',function($scope , $rootScope,  $http, $modal)
{
    
});

Nevent.controller('CompanyCtrl',function($scope , $rootScope,  $http, $modal)
{
    
});

Nevent.controller('CategoryCtrl',function($scope , $rootScope,  $http, $modal)
{
    
});

Nevent.controller('VenueCtrl',function($scope , $rootScope,  $http, $modal)
{
    
});

Nevent.controller('ProfileCtrl',function($scope , $rootScope,  $http, $modal)
{
    
});

Nevent.controller('EventCtrl',function($scope , $rootScope,  $http, $modal)
{
    Socialite.load();
    Socialite.setup({
       
       facebook: {
        lang     : 'en_GB',
        appId    : 123456789,
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
    $scope.EventData = [];
    $scope.rate = 0;
    $scope.max = 10;
    $scope.isReadonly = false;
    $scope.hoveringOver = function(value)
    {
        $scope.overStar = value;
        $scope.percent = 100 * (value / $scope.max);
    };
    
    $scope.YGoing = function ()
    {
            
    };
    $scope.NGoing = function ()
    {
            
    };
    
    $scope.Invite = function ()
    {
            
    };
    
    $scope.AddtoCalender = function ()
    {
            
    };
    
    $scope.CFollow = function ()
    {
            
    };
    
});