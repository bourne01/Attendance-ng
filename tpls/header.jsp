<!--<%@ page language="java" import="java.util.*,com.kud.cb.entity.User" pageEncoding="utf-8"%>
<%
    String name=null;
	String teacherid=null;
	User user = (User)session.getAttribute("user"); 		//从session中获取用户登录信息
	Date d=new Date();//取服务器当前时间
	if(user!=null)
	{ 
		teacherid=String.valueOf(user.getTeacherId());
		name=user.getUserName();
	}
	else
	{
		response.sendRedirect("../index.html#/index");
	    //out.write("<html><head></head><body>");
		//out.write("<h5><font color=red>您还没有登录呢，请先登录再考勤！</font></h5>");
		//out.write("<p><a href='login.jsp'>单击登录</a></p>");
		//out.write("</body></html>");
		//out.close();
	}
%>-->
<div class="head" ng-controller="HeaderCtrl">
    <div class="container">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="media">
                                <a class="pull-left" href="#">
                                    <img class="media-object" src="imgs/logo-index.png" alt="logo">
                                </a>
                                <div class="media-body">
                                    <h4 class="sys-name-cn">考勤管理平台</h4>
                                    <h4 class="sys-name-en">ATTENDANCE MANAGEMENT SYSTEM</h4>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 text-right">
                            <h5 class="wel-txt" teach-direct>欢迎您， {{$root.username}}  老师 <span class="logout" logout>退出登录</span></h5>
                            <h5 class="datetime" teach-direct>今天是{{weekday}}(本周是第{{week}}周) &nbsp&nbsp{{datetime}}</h5>
                        </div>
           </div>
    </div>
    <input id="teacherid"  type="hidden" value="<%=teacherid %>"></input>
    <input id="teachername" type="hidden" value="<%=name %>">                            
</div>