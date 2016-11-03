/**
 * Created by Administrator on 2016/10/16.
 */
(function(){
    var listModule=angular.module('musicApp.listModule',['musicApp.service'])
    listModule.config(['$routeProvider',function($routeProvider) {
        $routeProvider.when('/:type/:page?', {
            templateUrl: 'content/content.html',
            controller: 'ListController'
        })
    }])
    listModule.controller('ListController',['$scope','JsonService','$http','$routeParams','$rootScope','$route',function($scope,JsonService,http,$routeParams,$rootScope,$route){
          //console.log($routeParams.type);
        $rootScope.type=$routeParams.type;
        var typeid;
        var size=12;
        //var query='';
        $scope.size=size;
        var currentPage=$routeParams.page||1;
        var offset=(currentPage-1)*size;
        switch($routeParams.type){
              case 'new':
                  typeid=1;
                  break;
              case 'hot':
                  typeid=2;
                  break;
              case 'popular':
                  typeid=16;
                  break;
              case 'rock':
                  typeid=11;
                  break;
              case 'qingge':
                  typeid=23;
                  break;
              case 'tvmusic':
                  typeid=24;
                  break;
              case 'netmusic':
                  typeid=25;
                  break;
              //case 'search':
              //     query=$rootScope.query;
                //break;
          }
            JsonService.jsonp("http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.billboard.billList",{type:typeid,size:size,offset:offset},function(res){
                $scope.billboard=res.billboard;
                $scope.music=res.song_list;
                $scope.totalPage=Math.ceil($scope.billboard.billboard_songnum/size);
                $scope.pageConfig={total:$scope.billboard.billboard_songnum,current:currentPage,show:10,click:function(index){
                    $route.updateParams({page:index});
                }}
                //$rootScope.img=$scope.img;
                $scope.$apply()
            })


    }])
})()