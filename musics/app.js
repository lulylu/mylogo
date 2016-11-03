/**
 * Created by Administrator on 2016/10/16.
 */
(function(){
    var music=angular.module('musicApp',['ngRoute','musicApp.detailModule','musicApp.searchModule','musicApp.listModule'])
    music.config(['$routeProvider',function($routeProvider){
        $routeProvider
            .otherwise({
                redirectTo:'/new'
            })
    }]);
    music.controller('musicController',['$rootScope','$location','$scope',function($rootScope,$location,$scope){
        $scope.search=function(){
           $location.path('/search/'+$scope.input);$scope.input='';
            $rootScope.div=true;
            //console.log($scope.div);
        }
        $scope.leave=function(){
            $rootScope.div=true;
        }
        $scope.focus=function(){
            $rootScope.div=false;
        }
    }])
    music.directive('page',[ function(){
        return {
            replace:true,
            template: '<ul class="pagination ">\
                <li ng-click="hundlePage(item)" ng-class="{active:item==current}" ng-repeat="item in pages"><a>{{item}}</a></li>\
            </ul>',
            link:function($scope,ele,attr){
                $scope.$watch('pageConfig',function(n){
                    if(n){
                        var total=n.total;
                        var show=n.show;
                        var current=n.current;
                        var region=Math.floor(show/2);
                        var begin=current-region;
                        begin=Math.max(1,begin);
                        var end=begin+show;
                        if(end>total){
                            end=total+1;
                            begin=end-show;
                            begin = Math.max(1, begin);
                        }
                        var pagination = ele[0];
                        var pages=[];
                        $scope.pages = pages;
                        $scope.current=current;
                        for(var i=begin;i<end;i++){
                            pages.push(i);
                        }
                        $scope.hundlePage = function(index) {
                            //调用控制器传递过来的方法
                            n.click(index);
                        }

                    }
                })
            }
        }
    }])
})()