/*********************************************************************************************
 * This App is used for navigation
*********************************************************************************************/
var rtApp = angular.module('rtApp',['ngCookies','ui.router','ngDraggable','BaseMod','CourseMod','LeaveAttMod','SwapMod']);
/**
 * 由于整个应用都会和路由打交道，所以这里把$state和$stateParams这两个对象放到$rootScope上，方便其它地方引用和注入。
 * 这里的run方法只会在angular启动的时候运行一次。
 * @param  {[type]} $rootScope
 * @param  {[type]} $state
 * @param  {[type]} $stateParams
 * @return {[type]}
 */
rtApp.run(function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
     //Change the background of the button of current page 
    $rootScope.isActive = function(page){
            return $rootScope.selPage == page;
    }
    $rootScope.numPerPage = 20;//Define 20 students in one page
    //Get page list
    $rootScope.getPageList = function(dataList){
        var dataListLen = dataList.length;
        $rootScope.pageNums = Math.ceil(dataListLen/$rootScope.numPerPage);//Pages in total
        pageListLen = $rootScope.pageNums > 5?5:$rootScope.pageNums;//Pages in total
        var newPageList = [];
        for(var i=0;i<pageListLen;i++){
            if(i<3){
                newPageList.push(i+1);
            }else if(i==3 && $rootScope.pageNums>5){
                newPageList.push('...');
            }else if(i==4 && $rootScope.pageNums>5){
                newPageList.push($rootScope.pageNums);
            }else{
                newPageList.push(i+1);
            }                                    
        }
        $rootScope.pageList = newPageList;
        $rootScope.dataList = dataList;
    }
    //Function for next and previous buttons
    $rootScope.printPage = function(page){//update view
            if(page < 1 || page > 5)return;//Invalid page number;
            if($rootScope.pageNums <= 5){//Total pages is equal or less than 5
                $rootScope.selPage = page;                
            }else{
                //Check paging direction: prePage < curPage means next
                if($rootScope.prePage < $rootScope.curPage){
                    for(var i=0;i<5;i++){
                         //$rootScope.selPage = page;
                         if(i <3 && ($rootScope.pageList[2] < $rootScope.pageNums -1) && $rootScope.pageList[2] != $rootScope.pageNums -2){
                               $rootScope.pageList[i] += 1;
                               $rootScope.curPage = 1;
                               $rootScope.selPage = $rootScope.pageList[0];                              
                         }else if($rootScope.pageList[2] == $rootScope.pageNums -2){
                            $rootScope.selPage = $rootScope.pageList[$rootScope.curPage -1];
                            $rootScope.pageList[3] = $rootScope.pageNums - 1;
                            //$rootScope.selPage = $rootScope.pageList[0];
                            break;
                         }
                    }
                     
                }else{
                    if($rootScope.curPage == 4){
                        $rootScope.selPage = $rootScope.pageList[$rootScope.curPage -1];
                    }else{
                        $rootScope.pageList[3] = '...'; 
                        if($rootScope.curPage == 3 && $rootScope.pageList[2] == $rootScope.pageNums -2 ){
                            $rootScope.selPage = $rootScope.pageList[2];
                        }else{
                            if($rootScope.curPage == 1){
                                for(var i=0;i<3;i++){
                                    if($rootScope.pageList[i] == 1)return;
                                    $rootScope.pageList[i] -= 1;
                                }
                                
                            }
                            $rootScope.selPage = $rootScope.pageList[$rootScope.curPage-1];
                        }
                            
                    }
                }
            }
            var start = ($rootScope.selPage - 1)*20;
            var end = start + 20;     
            $rootScope._dataList = $rootScope.dataList.slice(start,end);
        }
});
/**
 * Configure the router settings
 */
rtApp.config(function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise('index');
    $stateProvider
        .state('index',{//Login Page
            url:'/index',
            views:{
                '':{
                    templateUrl:'tpls/home.html?random='+Math.random()
                },
                'login@index':{
                    templateUrl:'tpls/login.html?random='+Math.random(),
                }
            }
        })
        .state('home',{//Home Page(Course's table for teacher)
            url:'/home',
            //cache:false,    
            views:{
                'header':{
                    templateUrl:'tpls/header.jsp?random='+Math.random(),
                },
                'navside':{
                    templateUrl:'tpls/navside.html?random='+Math.random(),
                },
                '':{
                    templateUrl:'tpls/coursetab.html?random='+Math.random(),
                    
                }
            }
        })
        .state('seatnormal',{//Normal Seat table for students
            url:'/seatnormal?&teacherid&termid&week&weekday&classname&coursename&classid&courseid&classseq&src',
            params:{
                teacherid:null,               
                termid:null,
                week:null,
                weekday:null,
                classname:null,
                coursename:null,
                classid:null,
                courseid:null,
                classseq:null,
                src:null
            },
                views:{
                 'header':{
                    templateUrl:'tpls/header.jsp?random='+Math.random(),
                },
                'navside':{
                    templateUrl:'tpls/navside.html'
                },
                '':{
                    templateUrl:'tpls/seatnormal.html',                    
                }
            }
        })
        .state('seatlist',{//Seat table in list style
            url:'/seatlist?&teacherid&termid&week&weekday&classname&coursename&classid&courseid&classseq&src',
            params:{
                teacherid:null,               
                termid:null,
                week:null,
                weekday:null,
                classname:null,
                coursename:null,
                classid:null,
                courseid:null,
                classseq:null,
                src:null
            },
            views:{
                 'header':{
                    templateUrl:'tpls/header.jsp?random='+Math.random(),
                },
                'navside':{
                    templateUrl:'tpls/navside.html'
                },
                '':{
                    templateUrl:'tpls/seatlist.html'
                }
            }
        })
        .state('attmanage',{//Attendance's management 
            url:'/attmanage',
            views:{
                 'header':{
                    templateUrl:'tpls/header.jsp?random='+Math.random(),
                },
                'navside':{
                    templateUrl:'tpls/navside.html'
                },
                '':{
                    templateUrl:'tpls/attmanage.html'
                }
            }
        })
        .state('attreport',{//Attendance's report
            url:'/attreport',
            views:{
                 'header':{
                    templateUrl:'tpls/header.jsp?random='+Math.random(),
                },
                'navside':{
                    templateUrl:'tpls/navside.html'
                },
                '':{
                    templateUrl:'tpls/attreport.html'
                }
            }
        })
        .state('leave',{//Teacher's leave
            url:'/leave',
            views:{
                 'header':{
                    templateUrl:'tpls/header.jsp?random='+Math.random(),
                },
                'navside':{
                    templateUrl:'tpls/navside.html'
                },
                '':{
                    templateUrl:'tpls/leave.html'
                }
            }
        })
        .state('leavenote',{//Write down teacher's leave
            url:'/leavenote',
            views:{
                 'header':{
                    templateUrl:'tpls/header.jsp?random='+Math.random(),
                },
                'navside':{
                    templateUrl:'tpls/navside.html'
                },
                '':{
                    templateUrl:'tpls/leavenote.html'
                }
            }
        })
        .state('swapclass',{//Swap teacher's classes
            url:'/swapclass',
            views:{
                 'header':{
                    templateUrl:'tpls/header.jsp?random='+Math.random(),
                },
                'navside':{
                    templateUrl:'tpls/navside.html'
                },
                '':{
                    templateUrl:'tpls/swapclass.html'
                }
            }
        })
        .state('classnote',{//Write down class note
            url:'/classnote',
            views:{
                 'header':{
                    templateUrl:'tpls/header.jsp?random='+Math.random(),
                },
                'navside':{
                    templateUrl:'tpls/navside.html'
                },
                '':{
                    templateUrl:'tpls/classnote.html'
                }
            }
        })
        .state('swapleave',{//Swap teacher's leaves
            url:'/swapleave',
            views:{
                 'header':{
                    templateUrl:'tpls/header.jsp?random='+Math.random(),
                },
                'navside':{
                    templateUrl:'tpls/navside.html'
                },
                '':{
                    templateUrl:'tpls/swapleave.html'
                }
            }
        })
        .state('swapleavenote',{//Write down swap-leave's note
            url:'/swapleavenote',
            views:{
                 'header':{
                    templateUrl:'tpls/header.jsp?random='+Math.random(),
                },
                'navside':{
                    templateUrl:'tpls/navside.html'
                },
                '':{
                    templateUrl:'tpls/swleavenote.html'
                }
            }
        })
       

    })
    .run(function($rootScope, $templateCache) {  
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {  
        //if (typeof(current) !== 'undefined'){  
         //   $templateCache.remove(current.templateUrl);  
           // }  
           //console.log(toState);
        });  
    }); 