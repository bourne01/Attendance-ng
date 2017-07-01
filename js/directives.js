/**
 * Custom's directives
 */
/*Directives() */
baseMod
    .directive('passSave',function($rootScope){
        return{
            link:function(scope,element,attr){
                element.on('click',function($event){
                    if(element[0].tagName == 'INPUT'){//User checked the 'PASS SAVE' chechbox
                        $event.stopPropagation();                    
                        scope.checked = !scope.checked;
                        return;                    
                    }else if(scope.checked == true){//Save username and password into cookie
                        console.log('xxx');     
                        var expireDate = new Date();                     
                        var $cookies = scope.cookies;
                        var expireDate = new Date();
                        console.log(scope.username);
                        expireDate.setDate(expireDate.getDate() +7);//Expire after 7 days                
                        $cookies.put('username',scope.username,{'expires': expireDate.toUTCString()});
                        $cookies.put('password',scope.password,{'expires': expireDate.toUTCString()});
                    } 
                        $http = scope.http;
                        $state = scope.state;
                        //Authentication
                        scope.method = 'get';
                        scope.url = '../../login/login!login.action?&random='+Math.random();
                        scope.params = {
                            'no':scope.username,
                            'password':scope.password,
                            'operation':'1'
                        };
                        $http({'method':scope.method,'url':scope.url,'params':scope.params})
                            .then(function(res){
                                objData = res.data;
                                if(objData.success == true){
                                    //location.href = 'index.html#/home';//go forward to homepage if authentication pass
                                    //$rootScope.username = scope.username;
                                    $state.go('home');
                                    //console.log(objData.message);
                                    
                                }else{//faild to authenticate
                                    element.parent().parent().children().eq(0).addClass('has-error');
                                    element.parent().parent().children().eq(1).addClass('has-error');
                                }

                            },function(res){//faild to authenticate
                                //element.parent().parent().children().eq(0).addClass('has-error');
                                //element.parent().parent().children().eq(1).addClass('has-error');
                                alert("Failed to authenticate")
                                }
                            );
                                      
                    
                })

            }
        }
    })
    .directive('logout',function(){//Quit system
        return{
            link:function(scope,element){
                element.bind('click',function(){
                    $http = scope.http;
                    $state = scope.state;
                    scope.method = 'get';
                    scope.url = "/creditBank/login/login!loginOut.action?random="+Math.random();
                    scope.params = {};
                    $http({'method':scope.method,'url':scope.url,'params':scope.params})
                        .then(function(res){
                            var objData = res.data;
                            if(objData.loginOut == 'true'){
                                //location.href = 'index.html#/index';//go forward to login page after logout
                                //$state.reload("index");
                                $state.go('index');
                            }                                
                        })
                })
            }
        }
    })
/*Directives('navDirect','attDirect') are used for the sidebar of navigation */
baseMod
    .directive('navDirect',function(){    
        return{
            scope:{},
            controller:function($scope,$location){$scope.loc = $location;},//Get current URL
            link:function(scope,element,attr){                
                element.css({
                    //backgroundColor: '#eaf3fc',
                    //cursor: 'pointer',
                });
                element.on('mouseenter',function(){//Add background-color class when mouse enters
                    element.addClass('nav-item-bg-color');

                })
                element.on('mouseleave',function(){//Remove background-color class when mouse enters                   
                    element.removeClass('nav-item-bg-color');
                })
                if(scope.loc.$$path.substr(1) == attr.id)//Set background color when click the current element
                    element.css('background-color','#eaf9fc');
            }
        }
    })
    .directive('attDirect',function(){//Attendance
        return{
            //controller:function($scope,$location){$scope.loc = $location;},//Get current URL
            link:function(scope,element,attr){
                 element.on('mouseenter',function(){//Add background-color class when mouse enters
                    element.addClass('nav-item-bg-color');
                })
                element.on('mouseleave',function(){
                    element.removeClass('nav-item-bg-color');//Remove background-color class when mouse enters  
                })
                element.on('click',function(){//Expand and collaspe the menu of attendance
                    ul = element.next();
                    ul.toggleClass('is-display');
                    
                    //scope.imgHome = "imgs/index-side.jpg";
                    //console.log(scope);
                })
                 if(scope.location.$$path.substr(1) == attr.id)//Set background color when click the current element
                    element.css('background-color','#eaf9fc');
            }
        }
    })
    /**
     * Directive for Header
     */

    /**
     * Directives(courseDirect) is for teachers' Course Table
     */
   courseMod
        .directive('teachDirect',function(){
            return{
                link:function(scope,element,attr){
                    //console.log(attr.class);
                }

            }
        })
        .directive('courseDirect',function(){
            return{
                link:function(scope,element,attr){
                    //Get infomation about teaching week   
                    $http = scope.http;                    
                      //Get current term id
                    scope.urlCurTerm = "../../credit/term!getCurTerm.action?random="+Math.random();
                    //scope.urlCurTerm = '../json/getcurterm.json';
                    scope.paramsCurTerm = {};
                    $http({'method':'get','url':scope.urlCurTerm,'params':scope.paramsCurTerm})
                        .then(function(res){                  
                            objData = res.data.data;
                            scope.termId = objData.autoId;
                            scope.teacherId = document.getElementById('teacherid').value;//Get teacher's ID
                            //scope.teacherId = '312';
                            //Get Course Table for current teacher
                            scope.urlCurTeachCourseTab = "../../thrCou2!querySch2.action?random="+Math.random();
                            //scope.urlCurTeachCourseTab = '../json/coursetablebypanyou.json';
                            scope.paramsCurTeachCourseTab = {
                                "angle":2,
                                "termId":scope.termId,
                                "thrId":scope.teacherId
                            }
                            $http({'method':'get','url':scope.urlCurTeachCourseTab,'params':scope.paramsCurTeachCourseTab})
                                .then(function(res){
                                    scope.objClasses = res.data.lineSched;
                                    //console.log(scope.objClasses); 
                                    var crsTabContent = '';   //The content of Course Table                                 
                                    var arrNumCN = ['一','二','三','四','五','六','七','八'];
                                    var classSeq = 0;//The Class Sequence Number in Array
                                    var arrClasses = scope.objClasses;//
                                    var maxClassesPerDay = arrClasses.length/7;
                                    var objUrlPara,className,courseName,classId,courseId,classRoom;
                                    var arrBgColor = ['#b2c881','#f797c4','#7fcde7','#fe9a97','#fcc06b','#b6b2f0','#61a9ea','#f797c4',
                                                        '#96ad63','#64a6bc','#dd6aa0','#e7a444','#8e89d4','#538fc5'];//Background color
                                    var arrClassId = [];
                                    _substr = function(str){
                                        var strLen = str.length;
                                        if(strLen > 5)
                                            return str.substr(0,8)+"...";
                                        return str;
                                    }
                                    for(i=0;i<maxClassesPerDay;i++){
                                            //The first Column
                                            crsTabContent = crsTabContent + '<tr><td class="fst-col">第' +arrNumCN[i]+ '节</td>';
                                        //}else{
                                        for(var j=0;j<7;j++){
                                            classSeq= i + 8 * j;
                                            if(arrClasses[classSeq][0]){//class information is not Null                                                                                                      
                                                    className = arrClasses[classSeq][0];
                                                    courseName = arrClasses[classSeq][1];
                                                    classRoom = arrClasses[classSeq][2];
                                                    classId =  arrClasses[classSeq][3];
                                                    courseId = arrClasses[classSeq][4];
                                                    //Set background
                                                    var eleIndex = arrClassId.indexOf(classId);
                                                    if(eleIndex >= 0){
                                                        bgColor = arrBgColor[eleIndex];
                                                    }else{
                                                        arrClassId.push(classId);
                                                        bgColor = arrBgColor[arrClassId.length-1];
                                                    }
                                                    href = "#/seatnormal?teacherid="+scope.teacherId+"&termid="+scope.termId+"&week="+scope.week+"&weekday="+(j+1)+"&classname="+encodeURI(className)+"&coursename="+encodeURI(courseName)+"&classid="+classId+"&courseid="+courseId+"&classseq="+classSeq+"&src=0";
                                                    //console.log(href);
                                                    objUrlPara = "{teacherid:"+scope.teacherId+",termid:"+scope.termId+",week:"+scope.week+",weekday:"+(j+1)+",classname:"+className+",coursename:"+courseName+",classid:"+classId+",courseid:"+courseId+",classseq:"+classSeq+"}";  
                                                    //console.log(objUrlPara);
                                                    crsTabContent = crsTabContent+'<td><a ui-sref="seatnormal('+objUrlPara+')" href="'+href+'"><div class="class" style="background:'+bgColor+'"><p>'+_substr(className)+'</p><p>'+_substr(courseName)+'</p><p>'+_substr(classRoom)+'</p></div</a></td>';   
                                            }else{
                                                crsTabContent = crsTabContent+'<td></td>';
                                            }
                                            if(classSeq >= 48 && classSeq <= 55){//add '</tr>' when go to last pair of '<td></td>' per line
                                                    crsTabContent = crsTabContent+'</tr>';
                                                }
                                        }
                                            
                                    }
                                    element.html(crsTabContent);
                                    
                                },function(res){
                                    console.log('Can not get Teaching Course Table of Teacher ');
                                }) 
                        },function(res){
                                console.log("Can't get current term id")
                            })
                    
                                                           
                }
            }
        })
        .directive('seatDirective',function($rootScope){
            return{
                link:function(scope,element,attr){
                console.log('outer directive');
                scope.arrAttStatus = ['已请假','正常','迟到','严重迟到','早退','旷课'];
                scope.arrAttStatusStyle = ['leaved','normal','late','latebadly','leaveearly','skip'];
                $http = scope.http;
                scope.method = "get";
                scope.urlAttSum = "../../attence!attenceSum.action?random="+Math.random();
                //scope.urlAttSum = '../json/getsumatt.json';
                scope.paramsAtt_Leave = {'termId':scope.termId,
                                        'classId':scope.classId,
                                        'teacherId':scope.teacherId,
                                        'courseId':scope.courseId,
                                        'week':scope.week,
                                        'weekDay':scope.weekday,
                                        'section':scope.classSeq
                                    };
                
                    //Get the Leave information
                    scope.urlLeave = "../../leave!getleaveList.action?random="+Math.random();
                    //scope.urlLeave = '../json/getstuleavelist.json';
                    $http({'method':scope.method,'url':scope.urlLeave,'params':scope.paramsAtt_Leave})
                        .then(function(res){
                            var objData = res.data;
                            if(objData.success){
                                scope.leaveList = objData.dataList;
                                scope.leaveNum = scope.leaveList.length//Leave Number in Total 
                            }else{

                            }
                        },function(res){
                            console.log("Getting leave information failed");
                        })                    
                    //Get Student List
                    scope.urlStuList = "../../claStu2!query.action?random="+Math.random();
                    //scope.urlStuList = '../json/getstudentlist.json';
                    scope.paramsStuLi = {'classId':scope.classId};
                    $http({'method':scope.method,'url':scope.urlStuList,'params':scope.paramsStuLi})
                        .then(function(res){
                            var objData = res.data;
                            if(objData.success){
                                var stuNums = objData.dataList.length;//Students list in the class
                                var seatRows = Math.ceil(stuNums/8);//
                                var stuList = objData.dataList;
                                $rootScope.getPageList(stuList);
                                var arrStuList = [];//Save a row of students info                                
                                var j = 0;
                                for(var i=seatRows-1;i>=0;i--){//Print student seat by student No descendant in normal seat template
                                    var start = i*8;
                                    var end = 8*i+8;
                                    if(end > stuNums)
                                        end = stuNums;
                                    arrStuList[j] = stuList.slice(start,end);
                                    j++;
                                }
                                //Form a student NO array;
                                var stuNoList = []; 
                                for(var i=0;i<stuList.length;i++){
                                    stuNoList[i] = stuList[i].studentId;
                                }
                                //console.log(stuNoList);
                                scope._stuList = stuList;
                                scope.stuList = stuList.slice(0,$rootScope.numPerPage);                                
                                scope.arrStuList = arrStuList; 
                            
                        // 
                        scope.urlAtt = "../../attence!getAttenceD.action?random="+Math.random();
                        //scope.urlAtt = '../json/getstuattendance.json';
                        $http({'method':scope.method,'url':scope.urlAtt,'params':scope.paramsAtt_Leave})
                            .then(function(res){
                                var objData = res.data;
                                if(objData.success){//Correct response
                                    scope.attStatusList = objData.dataList;
                                    /*var lateNum = 0;
                                    var lateBadlyNum = 0;
                                    var leaveEarlyNum = 0;
                                    var skipClassNum = 0;
                                    arrAttList = objAtt.dataList;
                                    attLen = arrAttList.length;
                                    var arrAttState = [];//save each student's attendance state
                                    for(var i=0;i<stuNoList.length;i++){//intial array 'arrAttState'
                                        arrAttState[stuNoList[i]] = '1';
                                    }
                                    //console.log(arrAttState);
                                    for(i=0;i<attLen;i++){
                                        arrAttState[arrAttList[i].TStudent] = arrAttList[i].FAttenc;                                                                          
                                    }
                                    scope.arrAttState = arrAttState;
                                    console.log(scope.arrAttState);*/                                   
                            
                                //Get the attendance information
                                $http({'method':scope.method,'url':scope.urlAttSum,'params':scope.paramsAtt_Leave})
                                        .then(function(res){
                                            var objData = res.data;
                                            //console.log(objData);
                                            if(objData.success){//Correct response                                
                                                if(objData.message.indexOf('style')>=0){
                                                    //objDiv = document.getElementsByClassName('att-info');
                                                    //objDiv[0].innerHTML = '<span style="color:red">本节尚未开始考勤<span>';
                                                    scope.attSum = '<span style="color:red">本节尚未开始考勤<span>';
                                                }else{
                                                    scope.attSum = objData.message;
                                                }
                                            }else{
                                                $state.go('index')
                                            }
                                        },function(res){
                                            console.log('Getting attendance information failed');
                                        })                                                      
                                }else{

                                }              
                            },function(res){
                                console.log('Getting attendance information failed');
                        })
                        }
                        },function(res){
                            console.log("Getting Student List failed");
                            
                    })                    
                }
                
            }
        })
        //change the attendance state
        .directive('attState',function($timeout){
            return{
                link:function(scope,element,attr){
                     $http = scope.http;
                     var selectId = attr.id;
                     var arrAttStatusStyle = ['leaved','normal','late','latebadly','leaveearly','skip'];
                     var time=$timeout(function(){//Delay 100ms to get the data form parent directive
                            attStatusList = scope.attStatusList;
                            console.log(attStatusList);
                            for(i=0;i<attStatusList.length;i++){                                                         
                                var _selId = attStatusList[i].TStudent;
                                var _attStatusStyle = arrAttStatusStyle[attStatusList[i].FAttence];
                                objSeletor = angular.element("#"+_selId+" ."+_attStatusStyle)[0];
                                if(objSeletor){
                                    objSeletor.selected = true;
                                    angular.element("#"+_selId).addClass(_attStatusStyle);
                                }
                            }
                    　　　 $timeout.cancel(time);
                    　　　},200);
                    /*//console.log(scope.$parent);
                    var params = {'termId':scope.termId,
                                        'classId':scope.classId,
                                        'teacherId':scope.teacherId,
                                        'courseId':scope.courseId,
                                        'week':scope.week,
                                        'weekDay':scope.weekday,
                                        'section':scope.classSeq
                                    };
                    var url = "../../attence!getAttenceD.action?random="+Math.random();*/
                   //scope.urlAtt = '../json/getstuattendance.json';
                   
                    /*$http({'method':scope.method,'url':scope.urlAtt,'params':scope.paramsAtt_Leave})
                            .then(function(res){
                                var objData = res.data;
                                if(objData.success){//Correct response
                                    attStatusList = objData.dataList;
                                    for(i=0;i<attStatusList.length;i++){                                                         
                                        var _selId = attStatusList[i].TStudent;
                                        var _attStatusStyle = arrAttStatusStyle[attStatusList[i].FAttence];
                                        objSeletor = angular.element("#"+_selId+" ."+_attStatusStyle)[0];
                                        if(objSeletor){
                                            objSeletor.selected = true;
                                            angular.element("#"+_selId).addClass(_attStatusStyle);
                                        }
                                    }

                                }
                            })*/
                    
                    //var arrAttStatus = ['已请假','正常','迟到','严重迟到','早退','旷课'];                    
                    element.on('change',function(event){
                        var attStatus = parseInt(angular.element("#"+selectId).val());
                        element.addClass(arrAttStatusStyle[attStatus]);
                        var url = "../../attence!changeAttenced.action?random="+Math.random();
                        var params = {
                                    "termId":		scope.termId,
                                    "classId":		scope.classId,
                                    "teacherId":	scope.teacherId,
                                    "courseId":		scope.courseId,
                                    "week":			scope.week,
                                    "weekDay":		scope.weekday,
                                    "section":		scope.classSeq,
                                    "studentId":    selectId,
                                    "attence":      attStatus
                                }
                        $http({'method':'get','url':url,'params':params})
                            .then(function(res){
                                var objData = res.data;
                                if(objData.success){
                                    //update attendance information
                                    alert("考勤提交成功!");
                                }else{
                                    alert("考勤提交失败\n"+objData.message);
                                }   
                            },function(res){
                                console.log("Can't change attendance")
                            })
                    })
                }
            }
        })

        //Break page
        .directive('breakPage',function($rootScope){
            return{
                link:function(scope,element){
                    $http = scope.http;
                    var btnBg = '#5eb2f2'; //Default color of the first button
                    var url = '../json/getstudentlist.json';
                    var params = {'classId':scope.classId};
                    $http({'method':'get','url':url,'params':params})
                        .then(function(res){
                            var objData = res.data;
                            if(objData.success){
                                $rootScope.getPageList(objData.dataList);//Get Page list                                                       
                            }
                        })
                }
            }
        })
leaveAttMod 
    //Get students' attendance info
    .directive('attQuery',function($rootScope){
        return{
            link:function(scope,element){
            element.on('click',function(){
                scope.btnState = {'display':'block'};//Show paging buttons
                $http = scope.http;
                var method = 'get';
                //var url = "../../vattenced!query.action?random="+Math.random();
                var url = '../json/queryattedance.json';
                var params = {'F_TermId':scope.termSelect,'F_ClassId':scope.classSelect,'F_Week':scope.weekSelect,'F_WeekDay':scope.weekdaySelect,
                            'F_Attence':scope.attTypeSelect,'start':0,'limit':0,}
                $http({'method':method,'url':url,'params':params})
                    .then(function(res){
                        var objData = res.data;
                        if(objData.success){
                            attList = objData.dataList;
                            scope.attList = attList.slice(0,$rootScope.numPerPage);
                            $rootScope.getPageList(attList);
                        }else{
                            alert("Can't get attendance infomation!");
                        }
                    },function(res){
                        console.log('Failed to get attendance infomation!');
                    })
            })
        }
        }    
    })
    /**
     * Change the attendance's action based on user power and attendance's state;
     */
    .directive('attDealAction',function(){
        return{
            link:function(scope,element,attr){
                var userPower = attr.userpower;
                var attDeal = attr.attdeal;
                var objCurAttDone = {'background':'#3dc894'};//att Done
                var objCurAttPend = {'background':'#fff','color':'#000','box-shadow':' 0 1px 0 1px #e2e2e2'};//waiting to be dealt
                if(userPower == '1'){
                    switch(attDeal){
                        case '0':
                            element.text('立即审核');//Change the action of deal
                            //element.css('');
                            break;
                        case '1':
                            element.text('等待处理');
                            element.css(objCurAttPend);
                            break;
                        case '2':
                            element.text('处理完成')
                            element.css(objCurAttDone);
                        
                    }
                }else if(userPower == '3' || userPower == '4'){
                    switch(attDeal){
                        case '0':
                            element.text('立即处理');
                            //element.css();
                            break;
                        case '1':
                            element.text('等待审核');
                            element.css(objCurAttPend);
                            break;
                        case '2':
                            element.text('处理完成');
                            element.css(objCurAttDone);
                    }
                }
            }
        }
    })
    /**
     * Save what've done to attendace,and change the attendace's action
     */
    .directive('attSave',function($http){
        return{
            link:function(scope,element,attr){
                element.on('click',function(){
                var objCurAtt = angular.element('#'+attr.attid)
                var objCurAttDone = {'background':'#3dc894'};//att Done
                var objCurAttPend = {'background':'#fff','color':'#000','box-shadow':' 0 1px 0 1px #e2e2e2'};//waiting to be dealt
                //Save the deal with attendace
                    method = 'get';
                    if(attr.userpower == 1){//For admin                
                        url = "/creditBank/attenceDeal!changeAttenceDeal.action?random="+Math.random();
                        params = {'attencedId':attr.attid,'manageDeal':scope.adminCommentContent};
                        $http({'method':method,'url':url,'params':params})
                            .then(function(res){
                                var objData = res.data;
                                if(objData.success){
                                    objCurAtt.text('处理完成');
                                    objCurAtt.css(objCurAttDone);
                                    alert("审核处理成功！");
                                    //$state.go();
                                }else{
                                    alert('审核处理失败')
                                }
                            },function(res){
                                console.log("Can't deal with attendance");
                            })
                    }else if(attr.userpower == 3){//For head teacher
                        objCurAtt.text('等待处理');
                        objCurAtt.css(objCurAttPend);
                        url = "/creditBank/attenceDeal!saveAttenceDeal.action?random="+Math.random();
                        params = {'attencedId':attr.attid,"teacherDeal":scope.headCommentContent};
                        $http({'method':method,'url':url,'params':params})
                            .then(function(res){
                                var objData = res.data;
                                if(objData.success){                                    
                                    objCurAtt.text('等待审核');
                                    objCurAtt.css(objCurAttPend);
                                    alert("保存处理成功!");
                                    //$state.go();
                                }else{
                                    alert('保存处理失败!')
                                }
                            })

                    }
            })
            }
        }        
    })
swapMod
    //Inital calendar
    .directive('calendar',function(){
        return{
            link:function(scope,element,attr){
                $("#target-datetime").datetimepicker({//The targeted datetime
                    language: 'zh-CN',
                    minView:2,
                    weekStart: 1,
                    todayBtn:  true,
                    autoclose: true,
                    todayHighlight: 1,
                    startView: 2,
                    forceParse: 0,
                    showMeridian: 1,
                    format:'yyyy-mm-dd'
            });
            $("#src-datetime").datetimepicker({//The datetime will be swapped
                    language: 'zh-CN',
                    minView:2,
                    weekStart: 1,
                    todayBtn:  true,
                    autoclose:true,
                    todayHighlight: 1,
                    startView: 2,
                    forceParse: 0,
                    showMeridian: 1,
                    format:'yyyy-mm-dd'
            });
            }
        }
    })
    //Fill the table's body by select swap teacher
    .directive('getCourseTab',function(){
        return{
            link:function(scope,element,attr){
                element.on('change',function(){
                    var $http = scope.http;
                    var teacherId //Get teacher's ID
                    var tableStyle;
                    if(attr.id == 'active'){//apply for swap class
                        teacherId = scope.aTeacherSelect;
                        var swapBgStyle = 'bg-swapout';
                        tableStyle = '#out-table';
                    }else{//Receive the swap class
                        teacherId = scope.pTeacherSelect;
                        var swapBgStyle = 'bg-swapin';
                        tableStyle = '#in-table';
                    }
                    var url ="../../thrCou2!querySch2.action?random="+Math.random();
                    //var url = '../json/coursetablebypanyou.json';
                    var params = {
                        "angle":2,
                        "termId":scope.termSelect,
                        "thrId":teacherId
                    }
                    $http({'method':'get','url':url,'params':params})
                        .then(function(res){
                             scope.objClasses = res.data.lineSched;
                             //console.log(scope.objClasses); 
                             var crsTabContent = '';   //The content of Course Table                                 
                             var arrNumCN = ['一','二','三','四','五','六','七','八'];
                             var classSeq = 0;//The Class Sequence Number in Array
                             var arrClasses = scope.objClasses;
                             var maxClassesPerDay = arrClasses.length/7;
                             var objUrlPara,className,courseName,classId,courseId,classRoom;
                             for(i=0;i<maxClassesPerDay;i++){//The outer cycle decides the row
                                    //The first Column
                                    crsTabContent = crsTabContent + '<tr><td class="fst-col">第' +arrNumCN[i]+ '节</td>';
                                    for(var j=0;j<5;j++){//The inner cycle decides the colomn
                                            classSeq= i + 8 * j;                                            
                                            if(arrClasses[classSeq][0]){//class information is not Null                                                                                                      
                                                    className = scope.substr(arrClasses[classSeq][0]);
                                                    courseName = scope.substr(arrClasses[classSeq][1]);
                                                    classRoom = scope.substr(arrClasses[classSeq][2]);
                                                    classId =  arrClasses[classSeq][3];
                                                    courseId = arrClasses[classSeq][4];
                                                    crsTabContent = crsTabContent+'<td  class="'+swapBgStyle+'" id='+classSeq+'><div class="class"><p>'+className+'</p><p>'+courseName+'</p><p>'+classRoom+'</p></div</td>';   
                                            }else{
                                                crsTabContent = crsTabContent+'<td class="'+swapBgStyle+'"></td>';
                                            }
                                            if(classSeq >= 48 && classSeq <= 55){//add '</tr>' when go to last pair of '<td></td>' per line
                                                    crsTabContent = crsTabContent+'</tr>';
                                                }
                                        }   
                                    }
                                    angular.element(tableStyle+' tbody').html(crsTabContent);//Modify dom by different selector                                    
                                },function(res){
                                    console.log('Can not get Teaching Course Table of Teacher ');
                                })         
                })
            }
        }
    })
    //
    .directive('swapClassDeal',function(){
        return{
            link:function(scope,element,attr){                
                element.on('click',function(event){
                    var originalEventPath = event.originalEvent.path[2];
                    var className = angular.element(originalEventPath)[0].className;
                    var classSwapStyle;
                    if(attr.id == 'out-table'){
                        classSwapStyle = 'bg-swapout';
                        scope.curOutClassSeq = parseInt(angular.element(originalEventPath)[0].id);//Get the class sequence
                        swapClassBg = '#3dc894';  
                    }
                    else{
                        classSwapStyle = 'bg-swapin';
                        scope.curInClassSeq = parseInt(angular.element(originalEventPath)[0].id);//Get the class sequence
                        swapClassBg = '#f76f6f';  
                    }
                    
                    if(className == classSwapStyle){
                        angular.element('#'+attr.id+' tbody td').css('background','#f5f5f5');//Set background for table's body except first column
                        angular.element("."+classSwapStyle+" .class").css({'background':'','color':'#000'});//Reset background and color
                        angular.element(originalEventPath).children().css({'background':swapClassBg,'color':'#fff'});//Set current class's background and color
                        angular.element('.fst-col').css('background','');//Reset first colomn's style
                    }
                    
                })
                
            }
        }
    })