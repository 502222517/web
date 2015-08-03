var homeApp=angular.module('homeApp',[]);

homeApp.controller('flipMain',['$scope','$location','$timeout',function($scope,$location,$timeout){
	
	// data
	$scope.tipCount=0;
	$scope.flipCss='';  // 在翻转中样式
	$scope.questions=[
		{sortIndex:1,name:'第一题',bgColor:'red'},
		{sortIndex:2,name:'第二题',bgColor:'yellow'},
		{sortIndex:3,name:'第三题',bgColor:'blue'},
		{sortIndex:4,name:'第四题',bgColor:'green'},
		{sortIndex:5,name:'第五题',bgColor:'gainsboro'}
	];
	
	var questions1=[],questions2=[];
	
	$scope.questions.forEach(function(m,i){
		m.isShow=false;
		if(i%2){
			questions2.push(m);		
		}else{
			questions1.push(m);	
		}
	});
	questions1[0].isShow=true;
	questions2[0].isShow=true;
	$scope.questions1=questions1;
	$scope.questions2=questions2;
	
	console.log(questions1,questions2);
	
	var getRotateY=function(index){
		return 'transform: rotateY('+ 180 * index +'deg);'
	}
	$scope.rotateY=getRotateY($scope.tipCount);
	
	
	// event 
	$scope.flipped=function(index,groupId,sortIndex){
//		console.log('flipped',index,groupId,sortIndex);
		$scope.tipCount++;
		$scope.rotateY=getRotateY($scope.tipCount);
		
		$scope.flipCss='disabled';  // 在翻转中样式
		 
		$timeout(function(){
			// 判断是否是最后一题
			if(sortIndex+1>=$scope.questions.length){
				return;
			}
			
			if(groupId==1){
				$scope.questions1[index].isShow=false;
				$scope.questions1[index+1].isShow=true;
			}else{
				$scope.questions2[index].isShow=false;
				$scope.questions2[index+1].isShow=true;
			}
			$scope.flipCss='';  // 在翻转中样式
		},1000);
	}
	
	
	
	
}]);
 
 