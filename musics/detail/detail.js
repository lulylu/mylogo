/**
 * Created by Administrator on 2016/10/22.
 */
(function(){
    var detailModule=angular.module('musicApp.detailModule',['musicApp.service']);
    detailModule.config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/detail/:id?',{
            templateUrl: 'detail/detail.html',
            controller: 'DetailController'
        })
    }])
    detailModule.controller('DetailController',['$scope','$routeParams','JsonService','$http','$location','$window','$rootScope',function($scope,$routeParams,JsonService,$http,$window,$rootScope){
        $scope.value="播放";
        JsonService.jsonp('http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.lry&songid='+$routeParams.id,null,function(res){
            //$scope.titles=res.title;
            $scope.ci=res.lrcContent.split('\n');
            console.log($scope.ci);
            $scope.$apply();

        })
        JsonService.jsonp('http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.play&songid='+$routeParams.id,null,function(data){
            $scope.songinfo=data.songinfo;
            $scope.title="music/"+$scope.songinfo.title+".mp3";
            $scope.url=data.bitrate.file_link;
            $scope.$apply();
        })
        var flag=0;
        //setTimeout(function(){
        //    var scripts=document.createElement('script');
        //    scripts.src=source;
        //    console.log(source);
        //    document.body.appendChild(scripts);
        //},2000)
        $scope.play=function(){
            if(flag==0){
                $scope.value="暂停";
                $('#audio').css('display','block');
                $('#audio')[0].play();
                $('.jianbian').addClass('xuanzhuan');
                flag=1;
            }else{
                $scope.value="播放";
                $('#audio')[0].pause();
                $('.jianbian').removeClass('xuanzhuan');
                flag=0;
            }
            setInterval(function(){
                console.log(Math.floor($('#audio')[0].currentTime));
                for(var i=1;i<$scope.ci.length;i++){
                    if(Math.floor($('#audio')[0].currentTime)==parseInt($scope.ci[i].substr(1,2)*60)+parseInt($scope.ci[i].substr(4,5))){
                            var str=".musicci p:eq("+i+")";
                            $(str).css('color','yellow');
                            $(str).siblings().css('color','white');
                            $('.musicci').animate({'top':20-20*(i+1)+'px'},300);
                    }
                }
            },1000)
        }
    }])
})()