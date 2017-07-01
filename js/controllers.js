/*
*
*/
var baseMod = angular.module('BaseMod',[]);
baseMod
    .factory('loginInfo',function(){
        return{};
    })
    .controller('loginCtrl',function($scope,$http,$cookies,$state){
        var expireDate = new Date();  
        console.log(expireDate.setDate(expireDate.getDate() +7));                
        $scope.checked = false;
        $scope.cookies = $cookies;                                                                                               
        $scope.username = $cookies.get('username');
        $scope.password = $cookies.get('password');
        if(!$scope.username == false){//check checkbox if cookes is not null;
            $scope.checked = true;
        }        
        $scope.http = $http;
        $scope.state = $state;        
    })
    .controller('NavCtrl',function($scope,$location){
        /**
         * Intial navigating bar icons
         */
        //console.log("I M NavCtrl");
        var curSelectedId = $location.$$url.substr(1);
        $scope.imgHome = "imgs/index-visited.jpg";
        $scope.imgLeave = "imgs/leave.jpg";
        $scope.imgAtt = "imgs/att.jpg";
        $scope.imgDropMenu = "imgs/down-menu.png";        
        $scope.imgSwapLeave = "imgs/swap-leave.jpg";
        $scope.imgSwapClass = "imgs/swap-class.jpg";
        $scope.preSelectedId = 'home';
        $scope.location = $location;
        $scope.attTextStyle = 'att-text';
        //Reset text color
        $scope.homeTxtStyle = {'text-decoration':'none'};
        $scope.leaveTxtStyle = {'text-decoration':'none'};
        $scope.swLeaveTxtStyle = {'text-decoration':'none'};
        $scope.swClassTxtStyle = {'text-decoration':'none'};
        //The text color afert click 
        objColor = {'color':'#358ede','text-decoration':'none'};
       /**
             * Set icon based on url
        */
        switch(curSelectedId){
                case 'home':
                    $scope.imgHome = "imgs/index-visited.jpg";
                    $scope.homeTxtStyle = objColor;
                    break;
                case 'leave':
                    $scope.imgLeave = "imgs/leave-visited.jpg";
                    $scope.imgHome = "imgs/index-side.jpg";
                    $scope.attTextStyle = '';
                    $scope.leaveTxtStyle = objColor;
                    break;
                case 'swapleave':
                    $scope.imgSwapLeave = "imgs/swap-leave-visited.jpg";
                    $scope.imgHome = "imgs/index-side.jpg";
                    $scope.attTextStyle = '';
                    $scope.swLeaveTxtStyle = objColor;
                    break;
                case 'swapclass':
                    $scope.imgSwapClass = "imgs/swap-class-visited.jpg";
                    $scope.imgHome = "imgs/index-side.jpg";
                    $scope.attTextStyle = '';
                    $scope.swClassTxtStyle = objColor;
                case 'attmanage':
                    $scope.imgAtt = "imgs/att-visited.jpg";
                    $scope.imgDropMenu = "imgs/up-menu.jpg";
                    $scope.imgHome = "imgs/index-side.jpg";
                    $scope.attManageTextStyle = 'att-text';
                    break;
                case 'attreport':
                    $scope.imgAtt = "imgs/att-visited.jpg";
                    $scope.imgDropMenu = "imgs/up-menu.jpg";
                    $scope.imgHome = "imgs/index-side.jpg";
                    $scope.attReportTextStyle = 'att-text';
                    break;
                default:
                    $scope.imgAtt = "imgs/att.jpg";
                    $scope.imgDropMenu = "imgs/down-menu.png";
            }
        
        $scope.changeAttIcon = function(){
            $scope.imgAtt = "imgs/att-visited.jpg";
            $scope.imgDropMenu = "imgs/up-menu.jpg";
            $scope.imgHome = "imgs/index-side.jpg";
            $scope.imgLeave = "imgs/leave.jpg";   
            $scope.imgSwapLeave = "imgs/swap-leave.jpg";
            $scope.imgSwapClass = "imgs/swap-class.jpg";
        }        
             
    })
    .controller('HeaderCtrl',function($rootScope,$scope,$http,$state){
        $state.reload('index');        
        //$rootScope.username = document.getElementById('teachername').value;
        $rootScope.username = "Hi There";
        $rootScope.userid = document.getElementById('teacherid').value;
        var dt = new Date();
        $scope.datetime = dt.toLocaleString();        
        $scope.method = 'get';
        $scope.urlTeachWeek = "../../credit/term!getCurWeek.action?random="+Math.random();
        //$scope.urlTeachWeek = '../json/getcurweek.json';
        $scope.paramsTeachWeek = {
            "state":2
        }
        $http({'method':$scope.method,'url':$scope.urlTeachWeek,'params':$scope.paramsTeachWeek})  
            .then(function(res){
                var arrWeekdayCN = ['星期一','星期二','星期三','星期四','星期五','星期六','星期日'];
                var objData = res.data;
                $scope.weekday = arrWeekdayCN[parseInt(objData.weekday)-1];
                $scope.week = objData.week;                                                                                                                                       
            })
        $scope.http = $http;
        $scope.state = $state;
        //console.log($state);
    });    
 var courseMod = angular.module('CourseMod',[]);
 courseMod
    .factory('JsonDataFactory',['$http','$q',function($http,$q){               
        var arrPromise = [];
        var deferredCurWeek = $q.defer();       
        //Get current week and week
        var method = 'get';
        var urlCurWeek = "../../credit/term!getCurWeek.action?random="+Math.random();
        //var urlCurWeek = '../json/getcurweek.json';
        var paramsCurWeek = {};
        $http({'method':method,'url':urlCurWeek,'params':paramsCurWeek})
                .then(function(res){
                    var objData = res.data;
                        if(objData.success){
                            deferredCurWeek.resolve(objData); 
                        }else{//Session expires,then go forward to login page
                                    location.href = 'index.html#/index';
                        }                                                                                                                                                
                        },function(res){
                            console.log('Can not get infomation about teaching week!');
                        }
                    )
        arrPromise.push(deferredCurWeek.promise);
        //Get current term
        urlCurTerm = "../../credit/term!getCurTerm.action?random="+Math.random();        
        var deferredCurTerm = $q.defer();
        //var urlCurTerm = '../json/getcurterm.json';
        var paramsCurTerm = {};
        $http({'method':method,'url':urlCurTerm,'paras':paramsCurTerm})
                .then(function(res){
                    var objData = res.data;
                    if(objData.success){
                    deferredCurTerm.resolve(objData);
                    }else{
                        alert('获取当前学期失败，请重试！');
                    }
                },function(res){
                    console.log('Failed to get current term')
                })
         arrPromise.push(deferredCurTerm.promise); 
        return $q.all(arrPromise);//Get an array of promises
    }]) 
    .controller('CourseTabCtrl',function($scope,$http,JsonDataFactory){
        //console.log("I m CourseTabCtrl");
        JsonDataFactory.then(function(data){
                //console.log(data);
                var len = data.length;
                for(var i=0;i<len;i++){
                        if(i == 0){//Get week and weekday
                                $scope.week = data[0].week;
                                $scope.weekday = data[0].weekday;
                                //Set table head line style---background based on week day
                                $scope.weekCN = ['周一','周二','周三','周四','周五','周六','周日'];
                                $scope.isActive = function(weekIndex){
                                    return $scope.weekday == weekIndex;
                                }
                        }else if(i == 1){//Get current Term
                                $scope.termId= data[1].data.autoId;
                        }
                    }
            },function(data){
                console.log('Can not Get data from Factory "JsonDataFactory"')     
        })
        
        $scope.http = $http;
    })
    .controller('SeatNorCtrl',function($rootScope,$scope,$http,$stateParams,$location,$state,JsonDataFactory){
        $scope.arrDayCN = ['一','二','三','四','五','六','日'];        
        $scope.teacherId = $stateParams.teacherid;
        if($stateParams.src == 0)
            $scope.classSeq = (parseInt($stateParams.classseq)+1)%8;//The class sequence in one day
        else
            $scope.classSeq = $stateParams.classseq;
        $scope.week = $stateParams.week;
        $scope.weekday = $stateParams.weekday;
        $scope._weekday = $scope.arrDayCN[parseInt($stateParams.weekday)-1];//Only for Template      
        $scope.className = $stateParams.classname;
        $scope.courseName = $stateParams.coursename;
        $scope.termId = $stateParams.termid;
        $scope.classId = $stateParams.classid;
        $scope.courseId = $stateParams.courseid;      
        $scope.http = $http;
       /* //Get Seat information
        var url = "seat!query.action?random="+Math.random();
        var params = {
                        "termId":$scope.termId,
                        "classId":$scope.classId,
                        "teacherId":$scope.teacherId,
                        "courseId":$scope.courseId
                    };
        $http({'url':url,'params':params})
            .then(function(res){
                if(res.success){
                    $scope.seatId = res.seatid;
                }else{
                    alert("无法获取座位信息!!");
                }
            },function(res){
                console.log("Can't get seat information")
            })*/
        //Update seat information
        $scope.seatUpdate = function(){
            /*$.getJSON("seat!changeSeat.action?random="+Math.random(),{
							"autoId":$("#seatid").val(),
							"seatString":ss*/
            /*$.getJSON("seat!saveSeat.action?random="+Math.random(),{
							"termId":		$("#termid")[0].value,
							"classId":		$("#classid")[0].value,
							"teacherId":	$("#teacherid")[0].value,
							"courseId":		$("#courseid")[0].value,
							"seatString":	ss*/
        }
       //Reload the current page after clicking the button
        $scope.refresh = function(){
            $state.reload();
        }
        //Save full attendance
        $scope.fullAttConfirm = function(){
            var url = "../../attence!allAttence.action?random="+Math.random();
            var params = {
                            "termId":		$scope.termId,
                            "classId":		$scope.classId,
                            "teacherId":	$scope.teacherId,
                            "courseId":		$scope.courseId,
                            "week":			$scope.week,
                            "weekDay":		$scope.weekday,
                            "section":		$scope.classSeq
                        }
            $http({'method':'get','url':url,'params':params})
                    .then(function(res){
                        if(res.success){
                            alert("已经全勤处理，请返回!");
                            $state.reload();//refresh the current page
                        }else{
                            alert("全勤处理失败，请重试!");
                            }
                        })
        }
        //Swap Seats between two students
        $scope.dropComplete = function(index, obj,trId){
            var stuNum = $scope._stuList.length;
            var voidSeatNum = 0;
            var tarIndex;//The targeted object  
            var _seatRows = Math.floor(stuNum/8)
            var srcIndex = $scope._stuList.indexOf(obj);//The dragged object
            if(trId != 0){//The first Row
                voidSeatNum = 8 - stuNum%8;
                tarIndex = (_seatRows - parseInt(trId))*8 + parseInt(index);              
            }else{//others
                tarIndex = Math.floor(stuNum/8)*8 + parseInt(index);
            }
            var tmpObj = $scope._stuList[tarIndex];
            $scope._stuList[tarIndex] = obj;
            $scope._stuList[srcIndex] = tmpObj;
            var arrStuList = [];//Save a row of students info
            var seatRows = Math.ceil(stuNum/8);                                
            var j = 0;
            for(var i=seatRows-1;i>=0;i--){//Print student seat by student No descendant in normal seat template
                var start = i*8;
                var end = 8*i+8;
                if(end > stuNum)
                    end = stuNum;
                arrStuList[j] = $scope._stuList.slice(start,end);
                j++;
            }
            $scope.arrStuList = arrStuList;//Update view
        };

        /**
         * Paging
         */
        //inital parameters
        $rootScope.prePage = 1;//Previous page number
        $rootScope.curPage = 1;//current page number
        $rootScope.selPage = 1;//        
        //Get current page
        $scope.getCurPage = function(page){
            $rootScope.pageList = $scope.pageList;
            for(var i=0;i<$rootScope.pageList.length;i++){
                if($rootScope.pageList[i] == page){
                    $rootScope.curPage = i+1;
                    break;
                }
                }
            $rootScope.selPage = $rootScope.curPage;
            var start = ($rootScope.selPage - 1)*20;
            var end = start + 20;
            $scope.stuList = $rootScope.dataList.slice(start,end);
        }
        //Get previous page
        $scope.previous = function(){            
            $rootScope.prePage = $rootScope.curPage;
            if($rootScope.curPage>1)
                $rootScope.curPage--;
            $rootScope.printPage($rootScope.curPage);
            $scope.stuList = $rootScope._dataList;
        }
        //Get next page
        $scope.next = function(){
            console.log('next');                
            $rootScope.prePage = $rootScope.curPage;
            if($rootScope.curPage < $rootScope.pageNums)            
                $rootScope.curPage++;
            $rootScope.printPage($rootScope.curPage);
            $scope.stuList = $rootScope._dataList;
        }       
        
    })

var leaveAttMod = angular.module('LeaveAttMod',[]);
leaveAttMod
    //Get data flow from server
    .factory('leaveAttFactory',['$http','$q',function($http,$q){
       var arrPromise = [];
       var deferredCurWeek = $q.defer();       
       //Get current week and week
       var method = 'get';
       var urlCurWeek = "../../credit/term!getCurWeek.action?random="+Math.random();
       //var urlCurWeek = '../json/getcurweek.json';
       var paramsCurWeek = {};
       $http({'method':method,'url':urlCurWeek,'params':paramsCurWeek})
            .then(function(res){
                var objData = res.data;
                    if(objData.success){
                       //factory.weekday = objData.weekday;
                       //factory.week = objData.week; 
                       deferredCurWeek.resolve(objData); 
                    }else{//Session expires,then go forward to login page
                                location.href = 'index.html#/index';
                    }                                                                                                                                                
                    },function(res){
                            console.log('Can not get infomation about teaching week!');
                        }
                )
        //Get term list
       var urlTermList = "../../credit/term!getTermList.action?&state=2&start=0&limit=25";
       arrPromise.push(deferredCurWeek.promise);
       var deferredTermList = $q.defer();
       //var urlTermList = '../json/gettermlist.json';
       var paramsTermList = {};
       $http({'method':method,'url':urlTermList,'paras':paramsTermList})
            .then(function(res){
                var objData = res.data;
                if(objData.success){
                   termList = objData.dataList;
                   deferredTermList.resolve(termList);
                }else{
                    alert('获取学期列表失败，请重试！');
                }
            },function(res){
                console.log('Failed to get term list')
            })
      arrPromise.push(deferredTermList.promise); 
        //Get my classes
       var urlMyClass = "../../class2!getMyClass.action?random="+Math.random();
       var deferredMyClass = $q.defer();
       //var urlMyClass = '../json/getmyclass.json';
       var paramsMyClass = {};
       $http({'method':method,'url':urlMyClass,'params':paramsMyClass})
            .then(function(res){
                var objData = res.data;
                 if(objData.success){
                   myClassList = objData.dataList;
                   deferredMyClass.resolve(myClassList);
                }else{
                    alert('获取我的班级列表失败，请重试！');
                }
            },function(res){
                console.log('Failed to get my classes')
            }) 
        arrPromise.push(deferredMyClass.promise);       
        
        return $q.all(arrPromise);//Get an array of promises
    }])
    .factory('constArrayFactory',function(){
        var factory = {};
        factory.teachWeekList = ['第1周','第2周','第3周','第4周','第5周','第6周','第7周','第8周','第9周','第10周','第11周','第12周','第13周','第14周','第15周','第16周','第17周','第18周','第19周','第20周','第21周','第22周','第23周','第24周','第25周'];
        factory.classSeqList = ['第一节','第二节','第三节','第四节','第五节','第六节','第七节','第八节'];
        factory.weekdayList = ['星期一','星期二','星期三','星期四','星期五','星期六','星期日'];
        factory.leaveTypeList = ['事假','病假','其它'];
        factory.attTypeList = ['已请假','正常','迟到','严重迟到','早退','旷课'];
        factory.classId = '';
        return factory;
    })
    .controller('leaveAttCtrl',function($rootScope,$scope,$http,$state,$stateParams,leaveAttFactory,constArrayFactory){
        leaveAttFactory.then(function(data){
            var len = data.length;
            for(var i=0;i<len;i++){
                if(i == 0){//Get week and weekday
                        $scope.week = data[0].week;
                        $scope.weekday = data[0].weekday;
                }else if(i == 1){//Get Term list
                        $scope.termSelect =  data[1][0].autoId;//Inital term
                        $scope.termList= data[1];
                        //console.log($scope.termSelect);
                }else if(i == 2){//Get my classes
                        $scope.classSelect = data[2][0].autoId//Intial my class
                        $scope.myClassList = data[2];
                }
            }
            },function(data){
             console.log('Can not Get data from Factory "leaveAttFactory"')
        })  
        //console.log($rootScope);
        $scope.weekdayList = constArrayFactory.weekdayList;
        $scope.teachWeekList = constArrayFactory.teachWeekList;
        $scope.classSeqList = constArrayFactory.classSeqList;
        $scope.leaveTypeList = constArrayFactory.leaveTypeList;
        $scope.attTypeList = constArrayFactory.attTypeList;
        $scope.http = $http;
        $scope.studentList = [];
        $scope.adminComment = {'deal':'true'};
        $scope.currentAtt = {};//Save the attendance object which is dealing with;
        $scope.btnState = {'display':'none'};//Paging buttons is hidden by default
        //Query students' leave information
        $scope.leaveQuery = function(){
            var method = 'get';
            var url = "../../vleave!query.action?random="+Math.random();
            //var url = '../json/queryleave.json';
            //console.log($scope.termSelect);
            var params = {'F_Termid':$scope.termSelect,'F_ClassId':$scope.classSelect,'F_StartWeek':$scope.startWeekSelect,'F_EndWeek':$scope.endWeekSelect,'F_Status':1,'start':0,'limit':20};
            $http({'method':method,'url':url,'params':params})
                .then(function(res){
                    var objData = res.data;
                    if(objData.success){
                        $scope.leaveStuList = objData.dataList.slice(0,$rootScope.numPerPage);
                        $scope.btnState = {'display':'block'};
                        $rootScope.getPageList(objData.dataList);//Get page list
                        constArrayFactory.classId = $scope.classSelect;
                    }else{
                        alert("Can't get leave students!");
                    }
                     
                },function(res){
                    console.log('Failed to get leave students!')
                })
        }
        $scope.getStudents = function(){
            $state.go('leavenote');
        }
        //$scope.maskPop = {'display':'block'};//Show popover and mask
        //$scope.dealPop = {};//Hide popover and mask
        //Delete students' leave records
        $scope.leaveDel = function(leaveId){
            var method = 'get';
            var url = "../../leave!del.action?random="+Math.random();
            var params = {"autoId":leaveId};
            $http({'method':method,'url':url,'params':params})
                .then(function(res){
                    var objData = res.data;
                    if(objData.success){
                        alert("请假记录删除成功！");
                    }else{
                        alert("请假记录删除失败！"+objData.message);
                    }
                },function(res){
                    console.log('Failed to get student leave ID!')
                })
        }
        //$scope.startWeekSelect = '';
        $scope.endWeekSelect = '';
        //Deal with the attendance based on teacher's role(admin,head teacher,ordinary user)
        $scope.attPopDeal = function(objAtt){
                $scope.objCurAtt = objAtt;
                $scope.attType = $scope.attTypeList[objAtt.F_Attence]
                //console.log(objAtt);
                objPop = {'display':'block'};//Show popover and mask
                objBack = {'display':'none'};//Hide popover and mask
                switch(objAtt.attencedeal){
                        case '0':
                            $scope.maskPop = objPop;
                            $scope.dealPop = objPop;
                            if(objAtt.userpower != 1){//non-admin                               
                                $scope.adminDealPop = objBack;
                            }else{                                
                                $scope.adminDealPop = objPop;                                
                            }
                            break;
                        case '1':
                            $scope.pendingPop
                            break;
                        case '2':
                            break;
                    }
        }       
        //Delete a certain attendance by attendance ID
        $scope.attDel = function(attId){
            var method = 'get';
            var url = "../../attenced!del.action?random="+Math.random();
            var params = {'autoId':attId};
            $http({'method':method,'url':url,'params':params})
                .then(function(res){
                    var objData = res.data;
                    if(objData.success){
                        alert('删除考勤记录成功！');
                    }else{
                        alert('删除考勤记录出错！\n'+objData.message);
                    }
                })
        }
        $scope.cancel = function(){
             var objHide = {'display':'none'}
             //the mask layer hide 
             $scope.maskPop = objHide
             //pending deal window hide
             $scope.dealPop = objHide
             $scope.adminDealPop = objHide
             $scope.pendingPop = objHide
        }       
         /**
         * Paging
         */
        //inital parameters
        $rootScope.prePage = 1;//Previous page number
        $rootScope.curPage = 1;//current page number
        $rootScope.selPage = 1;//

        //Get current page
        $scope.getCurPage = function(page){
            $rootScope.pageList = $scope.pageList;
            for(var i=0;i<$rootScope.pageList.length;i++){
                if($rootScope.pageList[i] == page){
                    $rootScope.curPage = i+1;
                    break;
                }
                }
            $rootScope.selPage = $rootScope.curPage;
            var start = ($rootScope.selPage - 1)*20;
            var end = start + 20;
            $scope.attList = $rootScope.dataList.slice(start,end);
        }
        //Get previous page
        $scope.previous = function(){            
            $rootScope.prePage = $rootScope.curPage;
            if($rootScope.curPage>1)
                $rootScope.curPage--;
            $rootScope.printPage($rootScope.curPage);
            $scope.attList = $rootScope._dataList;
        }
        //Get next page
        $scope.next = function(){
            console.log('next');                
            $rootScope.prePage = $rootScope.curPage;            
            if($rootScope.curPage < $rootScope.pageNums)            
                $rootScope.curPage++;
            $rootScope.printPage($rootScope.curPage);
            $scope.attList = $rootScope._dataList;
        }

    })
    //Controller for page leavenote.html
    .controller('leaveNoteCtrl',function($rootScope,$scope,$http,$state,leaveAttFactory,constArrayFactory){
        leaveAttFactory.then(function(data){
            var len = data.length;
            for(var i=0;i<len;i++){
                if(i == 0){//Get week and weekday
                        $scope.week = data[0].week;
                        $scope.weekday = data[0].weekday;
                }else if(i == 1){//Get Term list
                        $scope.termSelect =  data[1][0].autoId;//Inital term
                        $scope.termList= data[1];
                        console.log($scope.termSelect);
                }else if(i == 2){//Get my classes
                        $scope.classSelect = data[2][0].autoId//Intial my class
                        $scope.myClassList = data[2];
                         //Query students' information
        var url = "/creditBank/claStu2!query.action?random="+Math.random();
        var params = {'classId':$scope.classSelect};
        $http({'method':'get','url':url,'params':params})
            .then(function(res){
                var objData = res.data;
                //$scope.studentSelect = objData.dataList[0].studentId;
                $scope.studentList = objData.dataList;
            },function(res){
                console.log("........");
            })
                }
            }
            },function(data){
             console.log('Can not Get data from Factory "leaveAttFactory"')
        })
        //$scope.conf = [];
        $scope.leaveType = 0;               
        $scope.weekdayList = constArrayFactory.weekdayList;
        $scope.teachWeekList = constArrayFactory.teachWeekList;
        $scope.classSeqList = constArrayFactory.classSeqList;
        $scope.leaveTypeList = constArrayFactory.leaveTypeList;
        $scope.attTypeList = constArrayFactory.attTypeList;
        $scope.classId = constArrayFactory.classId;
        $scope.adminComment = {'deal':'true'};
        $scope.currentAtt = {};//Save the attendance object which is dealing with;
       
        //Save leave note
        $scope.leavenNoteSave = function(){
            var url = "../../leave!save.action?random="+Math.random();
            //Authenticate the parammeters from select
            var blInit = $scope.startWeekSelect == '000000' || $scope.endWeekSelect == '000000' || $scope.startWeekDay == '000000' || $scope.endWeekdaySelect == '000000' || $scope.startClassSeqSelect == '000000' || $scope.endClassSeqSelect == '000000';
            if(blInit){
                alert('您的请假时间有误，请重选！');
                return;
            }
            if($scope.startWeekSelect > $scope.endWeekSelect){
                alert('您的请假时间有误，请重选！');
                return;
            }else if($scope.startWeekSelect == $scope.endWeekSelect && $scope.startWeekDay > $scope.endWeekdaySelect){
                alert('您的请假时间有误，请重选！');
                return;
            }else if($scope.startWeekSelect == $scope.endWeekSelect && $scope.startWeekDay == $scope.endWeekdaySelect &&  $scope.startClassSeqSelect > $scope.endClassSeqSelect){
                alert('您的请假时间有误，请重选！');
                return;
            }

            var params = {'termId':$scope.termSelect,'classId':$scope.classSelect,'studentId':$scope.studentSelect,'startWeek':$scope.startWeekSelect,
                        'startWeekDay':$scope.startWeekdaySelect,'startSection':$scope.startClassSeqSelect,'endWeek':$scope.endWeekSelect,
                        'endWeekDay':$scope.endWeekdaySelect,'endSection':$scope.endClassSeqSelect,'leaveReason':$scope.leaveReason,
                        'leaveType':$scope.leaveType,'status':1,'optTeacherId':$rootScope.userid
                    };
            $http({'method':'get','url':url,'params':params})
                .then(function(res){
                    var objData = res.data;
                    if(objData.success){
                        alert("请假保存成功!");
                        $state.go('leave');
                    }else{
                        alert("请假保存时出错了!\n"+objData.message);
                    }
                    
                },function(res){
                    alert("Can't save leave note");
                })
        }
        $scope.leavenNoteCancel = function(){
            $state.go('leave');
        }
    })
    //This controller is for attendance management page
    .controller('attReport',function($rootScope,$scope,$http,$state,leaveAttFactory,constArrayFactory){
        //Get term list
        leaveAttFactory.then(function(data){
            var len = data.length;
            for(var i=0;i<len;i++){
               if(i == 1){//Get Term list
                        $scope.termSelect =  data[1][0].autoId;//Inital term
                        $scope.termList= data[1];
                        //console.log($scope.termSelect);
                }
            }
            },function(data){
             console.log('Can not Get data from Factory "leaveAttFactory"')
        })
        $scope.weekdayList = constArrayFactory.weekdayList;
        $scope.teachWeekList = constArrayFactory.teachWeekList;
        arrAttStatus = ['0','1','2'];//0 for All,1 for attendance done,2 for attendance undone;
        //Get attendance report information
        $scope.attReportQuery = function(){
            var url = "../../attence!getAttenceCollect.action?random="+Math.random();
            //var url = "../json/getattendancecollect.json"
            var params = {'termId':$scope.autoId,'selkq':arrAttStatus[0],'week':$scope.week};
            $http({'method':'get','url':url,'params':params})
                .then(function(res){
                    var objData = res.data;
                    if(objData.success){
                        $rootScope.getPageList(objData.dataList);
                        $scope.attReportList = objData.dataList.slice(0,$rootScope.numPerPage);
                    }else{
                        alert("查无数据!")
                    }
                    
                })
        }
         /**
         * Paging
         */
        //inital parameters
        $rootScope.prePage = 1;//Previous page number
        $rootScope.curPage = 1;//current page number
        $rootScope.selPage = 1;//

        //Get current page
        $scope.getCurPage = function(page){
            $rootScope.pageList = $scope.pageList;
            for(var i=0;i<$rootScope.pageList.length;i++){
                if($rootScope.pageList[i] == page){
                    $rootScope.curPage = i+1;
                    break;
                }
                }
            $rootScope.selPage = $rootScope.curPage;
            var start = ($rootScope.selPage - 1)*20;
            var end = start + 20;
            $scope.attReportList = $rootScope.dataList.slice(start,end);
        }
        //Get previous page
        $scope.previous = function(){            
            $rootScope.prePage = $rootScope.curPage;
            if($rootScope.curPage>1)
                $rootScope.curPage--;
            $rootScope.printPage($rootScope.curPage);
            $scope.attReportList = $rootScope._dataList;
        }
        //Get next page
        $scope.next = function(){
            console.log('next');                
            $rootScope.prePage = $rootScope.curPage;            
            if($rootScope.curPage < $rootScope.pageNums)            
                $rootScope.curPage++;
            $rootScope.printPage($rootScope.curPage);
            $scope.attReportList = $rootScope._dataList;
        }
    })
//Model 'SwapMod' is for dealing with swapleave.html and swapclass.html
var swapMod = angular.module('SwapMod',[]);
swapMod
    //Get term list
    .factory('swapFactory',function($http,$q){
        var arrPromise = [];
        var deferredTermList = $q.defer();
        var urlTermList = '/creditBank/credit/term!getTermList.action?&state=2&start=0&limit=25';
        var paramsTermList = {};
        $http({'method':'get','url':urlTermList,'paras':paramsTermList})
                .then(function(res){                    
                    var objData = res.data;
                    //console.log(objData.success);
                    if(objData.success){
                        termList = objData.dataList;
                        deferredTermList.resolve(termList);
                    }else{
                        alert('获取学期列表失败，请重试！');
                    }
                },function(res){
                    console.log('Failed to get term list')
                })
        arrPromise.push(deferredTermList.promise);
        deferredWeekList = $q.defer();
        var urlCurWeek = "../../credit/term!getCurWeek.action?random="+Math.random();
        //var urlCurWeek = '../json/getcurweek.json';
        var paramsCurWeek = {};
        $http({'method':'get','url':urlCurWeek,'params':paramsCurWeek})
            .then(function(res){
                 var objData = res.data;
                if(objData.success){
                    var weekList = [];
                    for(var i =objData.week;i<=25;i++){
                        weekList[i-objData.week] = '第'+i+'周';
                    }
                    deferredWeekList.resolve(weekList);
                }else{
                    alert('获取教学周信息失败，请重试！');
                }
            },function(res){
                console.log("Can't get term list")
            })
        arrPromise.push(deferredWeekList.promise);
        return $q.all(arrPromise);
        })
    .factory('arrFactory',function(){
        var factory = {};
        factory.classSeqList = ['第一节','第二节','第三节','第四节','第五节','第六节','第七节','第八节'];
        factory.weekdayList = ['星期一','星期二','星期三','星期四','星期五','星期六','星期日'];
        factory.teachWeekList = ['第1周','第2周','第3周','第4周','第5周','第6周','第7周','第8周','第9周','第10周','第11周','第12周','第13周','第14周','第15周','第16周','第17周','第18周','第19周','第20周','第21周','第22周','第23周','第24周','第25周'];        
        factory.swapClassType = ['','调课','代课'];
        factory.swapClassStateList = ['调出','调入'];
        factory.swapClassStyleList = ['swap-out','swap-in']
        return factory;
    })
    //Get teacher list and class list
    .factory('swapClassFactory',function($http,$q){
        var arrPromise = [];
        //Get teachers' list
        var deferTeacherList = $q.defer();
        var url = "/creditBank/workCredit/stuResult!getTeaSingle.action";
       // var url = '../json/getteacherlist.json';
        var params = {};
        $http({'method':'get','url':url,'params':params})
            .then(function(res){
                var objData = res.data;
                if(objData.success){
                    var teacherList = objData.dataList;
                    deferTeacherList.resolve(teacherList);
                }else{
                    alter('获取教师列表失败！');
                }
            },function(res){
                console.log("Can't get teacher list");
            })
        arrPromise.push(deferTeacherList.promise);
        //Get classes list
        var derferClassList = $q.defer()
        var url = "../../class2!getMyClass.action?random="+Math.random();
        //var url = '../json/getmyclass.json';
        var params = {};
        $http({'method':'get','url':url,'params':params})
            .then(function(res){
                 var objData = res.data;
                if(objData.success){
                    var classList = objData.dataList;
                    derferClassList.resolve(classList);
                }else{
                    alter('获取班级列表失败！');
                }
            },function(res){
                console.log("Can't get teacher list");
            })
       arrPromise.push(derferClassList.promise);
       var deferredCurWeek = $q.defer();       
       //Get current week and week
       var urlCurWeek = "../../credit/term!getCurWeek.action?random="+Math.random();
       //var urlCurWeek = '../json/getcurweek.json';
       var paramsCurWeek = {};
       $http({'method':'get','url':urlCurWeek,'params':paramsCurWeek})
            .then(function(res){
                var objData = res.data;
                    if(objData.success){
                       //factory.weekday = objData.weekday;
                       //factory.week = objData.week; 
                       deferredCurWeek.resolve(objData); 
                    }else{//Session expires,then go forward to login page
                                location.href = 'index.html#/index';
                    }                                                                                                                                                
                    },function(res){
                            console.log('Can not get infomation about teaching week!');
                        }
                )
        arrPromise.push(deferredCurWeek.promise);
        return $q.all(arrPromise);
    })
    //Controller 'swapLeave' is for page swapleave
    .controller('swapLeaveCtrl',function($rootScope,$scope,$http,swapFactory){
         swapFactory.then(function(data){
            //console.log(data);
            var len = data.length;
            for(var i=0;i<len;i++){
                if(i == 0){//Get term list
                    $scope.termSelect = data[0][0].autoId;//Inital term
                    $scope.termList = data[0];
                    break;
                }
            }
         })
        $scope.btnState = {'display':'none'};//Paging buttons is hidden by default        
         //Get swaping leave infomation by term id
         $scope.swapLeaveQuery = function(){
             var url = "../../attenceCalendar!query.action?random="+Math.random();
             //var url = '../json/getswapleave.json';
             var params = {'term':$scope.termSelect,'start':0,'limit':20};
             $http({'method':'get','url':url,'params':params})
                .then(function(res){
                    var objData = res.data;
                    if(objData.success){
                        $scope.btnState = {'display':'block'};
                        $rootScope.getPageList(objData.dataList);//Get page list
                        $scope.swapLeaveList = objData.dataList.slice(0,$rootScope.numPerPage);//Output to view swapleave.html
                        var termListLen = $scope.termList.length;
                        //convert term id into term name
                        for(var i=0;i<termListLen;i++){
                            if($scope.termList[i].autoId == $scope.termSelect){
                                $scope.termName = $scope.termList[i].name;
                                break;
                            }
                        }
                    }else{
                        alert("查询调休列表时出错了!\n"+objData.message);
                    }
                })
         }
         //Delete swap leave item by id
         $scope.swapLeaveDel = function(swapLeaveId){
             var url = "../../attenceCalendar!del.action?random="+Math.random();
             var params = {'autoId':swapLeaveId};
             $http({'method':'get','url':url,'params':params})
                .then(function(res){
                    var objData = res.data;
                    if(objData.success){
                        alert("调休记录已经删除了!\n");
                        $scope.swapLeaveQuery();
                    }else{
                        alert("删除调休记录时出错了!\n"+objData.message);
                    }
                })
         }
         /**
         * Paging
         */
        //inital parameters
        $rootScope.prePage = 1;//Previous page number
        $rootScope.curPage = 1;//current page number
        $rootScope.selPage = 1;//        
        //Get current page
        $scope.getCurPage = function(page){
            $rootScope.pageList = $scope.pageList;
            for(var i=0;i<$rootScope.pageList.length;i++){
                if($rootScope.pageList[i] == page){
                    $rootScope.curPage = i+1;
                    break;
                }
                }
            $rootScope.selPage = $rootScope.curPage;
            var start = ($rootScope.selPage - 1)*20;
            var end = start + 20;
            $scope.swapLeaveList = $rootScope.dataList.slice(start,end);
        }
        //Get previous page
        $scope.previous = function(){            
            $rootScope.prePage = $rootScope.curPage;
            if($rootScope.curPage>1)
                $rootScope.curPage--;
            $rootScope.printPage($rootScope.curPage);
            $scope.swapLeaveList = $rootScope._dataList;
        }
        //Get next page
        $scope.next = function(){
            console.log('next');                
            $rootScope.prePage = $rootScope.curPage;            
            if($rootScope.curPage < $rootScope.pageNums)            
                $rootScope.curPage++;
            $rootScope.printPage($rootScope.curPage);
            $scope.swapLeaveList = $rootScope._dataList;
        }
    })
    //This controller is for page swapleave note.html
   .controller('swapLeaveNoteCtrl',function($scope,$http,$state,swapFactory,arrFactory){
         swapFactory.then(function(data){
            console.log(data);
            var len = data.length;
            for(var i=0;i<len;i++){
                if(i == 0){//Get term list
                    $scope.termSelect = data[0][0].autoId;//Inital term
                    $scope.termList = data[0];
                }else if(i == 1){//Get week list
                     $scope.weekList = data[1];
                }
            }
           
         })
        
         $scope.classSeqList = arrFactory.classSeqList;
         $scope.weekdayList = arrFactory.weekdayList;
         var objDt = new Date();
         $scope.myTime = objDt.getTime();
         //Submit the request of swap leave
         $scope.leaveNoteConfirm = function(){
           var url = "../../attenceCalendar!saveAttenceCalendar.action?random="+Math.random();
           var params = {"termId":$scope.termSelect,
                        "targetDate":$scope.srcDatetime,
                        "week":$scope.srcWeekSelect,
                        "weekDay":$scope.srcWeekdaySelect,
                        "week2":$scope.targetWeekSelect,
                        "weekDay2":$scope.targetWeekdaySelect,
                        "optTeacherId":$rootScope.userid
                        };
            $http({'method':'get','url':url,'params':params})
                .then(function(res){
                    var objData = res.data;
                    if(objData.success){
                        alert("调休保存成功!");
                    }else{
                        alert("调休保存时出错了!\n"+objData.message);
                    }
                },function(res){
                    alert("Can't save swap leave note");
                })
        }
         $scope.return = function(){
             $state.go('swapleave');
         }
        })
        //This controller is for view swapclass.html
        .controller('swapClassCtr',function($rootScope,$scope,$http,$state,arrFactory,swapClassFactory,swapFactory){
            swapFactory.then(function(data){
                //console.log(data);
                var len = data.length;
                for(var i=0;i<len;i++){
                     if(i == 0){//Get term list
                        $scope.termSelect = data[0][0].autoId;//Inital term
                        $scope.termList = data[0];
                        break;
                    }
                }
            })
            swapClassFactory.then(function(data){
                //console.log(data);
                var len = data.length;
                for(var i=0;i<len;i++){
                    if(i == 0){//Get teacher list
                        $scope.teacherList = data[0];
                    }else if(i == 1){//Get class list
                        $scope.classList = data[1];
                    }else if(i == 2){
                        $scope.week = data[2].week;
                        $scope.weekday = data[2].weekday;
                    }
                }
            })
            $scope.teachWeekList = arrFactory.teachWeekList;
            $scope.swapClassType = arrFactory.swapClassType;
            $scope.swapClasActionList = arrFactory.swapClassStateList;
            $scope.swapClassStyleList = arrFactory.swapClassStyleList;
            $rootScope.btnState = {'display':'none'};
            $scope.swapClassQuery = function(){
                var url = "../../adjustLesson!query.action?random="+Math.random();
                //var url = '../json/getswapclass.json';
                var params = {'termId':$scope.termSelect,'classId':$scope.classSelect,'teacherId':$scope.teacherSelect,
                              'startweek':$scope.startWeekSelect,'endweek':$scope.endWeekSelect,'start':0,'limit':20};
                $http({'method':'get','url':url,'params':params})
                    .then(function(res){
                        var objData = res.data;
                        if(objData.success){
                            $rootScope.btnState = {'display':'block'};
                            $rootScope.getPageList(objData.dataList);
                            $scope.swapClassList = objData.dataList.slice(0,$rootScope.numPerPage);
                        }else{
                            alert("查询调代课列表时出错了!\n"+objData.message);
                        }
                    },function(res){
                        console.log("Can't get swap class infomation");
                    })
            }
            //Delete swap class item by id
            $scope.swapClassDel = function(swapClassId){
                var url = "../../adjustLesson!del.action?random="+Math.random();
                var params = {'autoId':swapClassId};
                $http({'method':'get','url':url,'params':params})
                    .then(function(res){
                        var objData = res.data;
                        if(objData.success){
                            alert("调代课记录已经删除了!\n");
                        }else{
                            alert("删除调代课记录时出错了!\n"+objData.message);
                        }
                    })
            }
             /**
         * Paging
         */
        //inital parameters
        $rootScope.prePage = 1;//Previous page number
        $rootScope.curPage = 1;//current page number
        $rootScope.selPage = 1;//        
        //Get current page
        $scope.getCurPage = function(page){
            $rootScope.pageList = $scope.pageList;
            for(var i=0;i<$rootScope.pageList.length;i++){
                if($rootScope.pageList[i] == page){
                    $rootScope.curPage = i+1;
                    break;
                }
                }
            $rootScope.selPage = $rootScope.curPage;
            var start = ($rootScope.selPage - 1)*20;
            var end = start + 20;
            $scope.swapClassList = $rootScope.dataList.slice(start,end);
        }
        //Get previous page
        $scope.previous = function(){            
            $rootScope.prePage = $rootScope.curPage;
            if($rootScope.curPage>1)
                $rootScope.curPage--;
            $rootScope.printPage($rootScope.curPage);
            $scope.swapClassList = $rootScope._dataList;
        }
        //Get next page
        $scope.next = function(){
            console.log('next');                
            $rootScope.prePage = $rootScope.curPage;            
            if($rootScope.curPage < $rootScope.pageNums)            
                $rootScope.curPage++;
            $rootScope.printPage($rootScope.curPage);
            $scope.swapClassList = $rootScope._dataList;
        }
        })
        //This controller is for view swap class note classnote.html
        .controller('swapClassNoteCtrl',function($scope,$http,$state,arrFactory,swapClassFactory,swapFactory){
            swapFactory.then(function(data){
                console.log(data);
                var len = data.length;
                for(var i=0;i<len;i++){
                     if(i == 0){//Get term list
                        $scope.termSelect = data[0][0].autoId;//Inital term
                        $scope.termList = data[0];
                        break;
                    }
                }
            })
            swapClassFactory.then(function(data){
                console.log(data);
                var len = data.length;
                for(var i=0;i<len;i++){
                    if(i == 0){//Get teacher list
                        $scope.teacherList = data[0];
                        break;
                    }
                }
            })
            $scope.teachWeekList = arrFactory.teachWeekList;
            $scope.http = $http;
            $scope.substr = function(str){
                if(str.length>5){
                    str = str.substr(0,5)+'...';
                }
                return str;
            }
            //submit swap class request
            $scope.classNoteSave = function(){
                var curInClassSeq = $scope.curInClassSeq;
                var curOutClassSeq = $scope.curOutClassSeq;
                var inWeeday = Math.floor(parseInt(curInClassSeq)/8) + 1;
                var outWeeday = Math.floor(parseInt(curOutClassSeq)/8) + 1;
                //Get term name by term id
                var termList = $scope.termList
                var termListLen = termList.length;
                var termName;
                for(var i=0;i<termListLen;i++){
                    if(termList[i].autoId = $scope.termSelect){
                        termName = termList[i].name;
                        break;
                    }
                }
                //Get teachers' name by teacher id
                var teacherList = $scope.teacherList
                var teacherListLen = teacherList.length;
                var teacherName;
                var aT = false;
                var pT = false;
                for(var i=0;i<teacherListLen;i++){
                    if(teacherList[i].autoId = $scope.aTeacherSelect){
                        aTeacherName = teacherList[i].name;
                        aT = true;
                        if(aT && pT)
                            break;
                    }
                    if(teacherList[i].autoId = $scope.pTeacherSelect){
                        pTeacherName = teacherList[i].name;
                        pT = true;
                        if(aT && pT)
                            break;
                    }
                }
                var classList = $scope.objClasses;
                var url = "../../adjustLesson!saveAdjustLesson2.action?random="+Math.random();
                var params = {
                            "type":$scope.swapClassType,
                            "termId":$scope.termSelect,
                            "classId":classList[curOutClassSeq][3],
                            "teacherId":$scope.aTeacherSelect,
                            "week":$scope.startWeekSelect,
                            "weekDay":outWeeday,
                            "section":(parseInt(curOutClassSeq)%8 + 1),
                            "courseId":classList[curOutClassSeq][4],
                            "roomId":classList[curOutClassSeq][5],
                            "termName":termName,
                            "teacherName":aTeacherName,
                            "courseName":classList[curOutClassSeq][1],
                            "roomName":classList[curOutClassSeq][2],
                            "className":classList[curOutClassSeq][0],
                            
                            "classId2":classList[curInClassSeq][3],
                            "teacherId2":$scope.pTeacherSelect,
                            "week2":$scope.endWeekSelect,
                            "weekDay2":inWeeday,
                            "section2":(parseInt(curInClassSeq)%8 + 1),
                            "courseId2":classList[curInClassSeq][4],
                            "roomId2":classList[curInClassSeq][5],
                            "teacherName2":pTeacherName,
                            "courseName2":classList[curInClassSeq][1],
                            "roomName2":classList[curInClassSeq][2],
                            "className2":classList[curInClassSeq][0]
		                }
                $http({'method':'get','url':url,'params':params})
                    .then(function(res){
                        var objData = res.data;
                        if(objData.success){
                            alert("调课信息成功!");
                        }else{
                            alert("保存调课信息时出错了!\n"+objData.message);
                        }
                    })
            }
            $scope.goBack = function(){
                $state.go('swapclass');
            }           
        })