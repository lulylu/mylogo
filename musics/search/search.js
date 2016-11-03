(function(){
    var serachModel=angular.module('musicApp.searchModule',['musicApp.service']);
    serachModel.config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/search/:query',{
            templateUrl: 'search/search.html',
            controller: 'SearchController'
        })
    }])
    serachModel.controller('SearchController',['$scope','$rootScope','JsonService','$routeParams','$http','$route',function($scope,$rootScope,JsonService,$routeParams,http,$route){
        var size=12;
        var currentPage=1;
        JsonService.jsonp("http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.search.catalogSug&query="+$routeParams.query,null,function(res){
            //$scope.billboard=res.;

            $scope.music=res.song;
            $scope.totalPage=Math.ceil($scope.music.length/size);
            $scope.pageConfig={total:$scope.music.length,current:currentPage,show:$scope.totalPage,click:function(index){
                $route.updateParams({page:index});
            }}
            //$rootScope.img=$scope.img;
            $scope.$apply()
        })


    }])
})()
