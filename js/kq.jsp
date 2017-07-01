<%@ page language="java" import="java.util.*,com.kud.cb.entity.User" pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
	String name=null;
	String no=null;
	String pass=null;
	String teacherid=null;
	User user = (User)session.getAttribute("user"); 		//从session中获取用户登录信息
	Date d=new Date();//取服务器当前时间
	if(user!=null)
	{ 
		teacherid=String.valueOf(user.getTeacherId());
		name=user.getUserName();
		no=user.getNo();
		pass=user.getPassword();
	}
	else
	{
		response.sendRedirect("login.jsp");
	    //out.write("<html><head></head><body>");
		//out.write("<h5><font color=red>您还没有登录呢，请先登录再考勤！</font></h5>");
		//out.write("<p><a href='login.jsp'>单击登录</a></p>");
		//out.write("</body></html>");
		//out.close();
	}
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>瓯海职业中专集团学校--选择性课程改革考勤系统</title>
    <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link href="attence/css/kq.css" rel="stylesheet" type="text/css" media="all" />
	<script type="text/javascript" src="attence/js/jquery-1.8.2.min.js"></script>
	<script type="text/javascript" src="attence/js/kq.js"></script>
	<script type="text/javascript">
	$(document).ready(function(){
		//var time = "2016-03-23 20:11:46";
		//var d = new Date(time.replace(/-/g,"/"));
		//$("#spanTime").text(d.getHours().toString().PadLeft(2,"0") + ":" + d.getMinutes().toString().PadLeft(2,"0") + ":" + d.getSeconds().toString().PadLeft(2,"0"));
		//setInterval(function(){
		//d.setSeconds(d.getSeconds() + 1);
		//$("#spanTime").text(d.getHours().toString().PadLeft(2,"0") + ":" + d.getMinutes().toString().PadLeft(2,"0") + ":" + d.getSeconds().toString().PadLeft(2,"0"));
		//},1000);
	});
	</script>
  </head>
  
<body>
	<div class="header">
		  <div class="logo"></div>
		  <div class="nav">
 		  <ul>
	  		<li class="active"><div><a href="/creditBank/attence/kq.jsp">课堂考勤</a></div> </li>
		  	<li class=""><div><a href="/creditBank/attence/qj.jsp">请假管理</a></div></li>
		  	<li class=""><div><a href="/creditBank/attence/clamanage.jsp">考勤管理</a></div></li>
		  	<li class=""><div><a href="/creditBank/attence/attencecollect.jsp">考勤报告</a></div> </li>
		  	<li class=""><div><a href="/creditBank/attence/calendar.jsp">调休</a></div></li>
		  	<li class=""><div><a href="/creditBank/attence/adjustlesson.jsp">调代课</a></div></li>
		   </ul>	  
		</div>
	  	<div class="logininfo">
		  <div style="text-align:right;">
			  	<span class="welcome">欢迎您,<em>【<%=name %>】老师</em> </span>
			  	<span class="quit" id="quitsystem">退出登录</span> 
			  	<br/>
			 <span id="msg" class="loginoutmsg">&nbsp;</span>
		   </div>
		   <div style = "color:#004FA3;height:40px;padding-top:13px; text-align:right;font-size:11px;">
		   	<span id="weekinf"></span>
		   	<span id="time"></span>
		   </div>
		</div>
	</div>
	<div class="topline">
	  <div class="toplineimg" id="imgLine"></div>
	</div>
   <div id="loadingmsg"  class="loadingmsg"></div>
   <table  style1="cursor:pointer" class="lzhTable" id="thrSchT" align=left >
  	<tr><th></th><th>周一</th><th>周二</th><th>周三</th><th>周四</th><th>周五</th><th>周六</th><th>周日</th>
  	<tr><td>第1节</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
  	<tr><td>第2节</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
 	<tr><td>第3节</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
  	<tr><td>第4节</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
  	<tr><td>第5节</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
  	<tr><td>第6节</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
  	<tr><td>第7节</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
	<tr><td>第8节</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
  </table>	
<input id="week"  type="hidden" value=""></input>
<input id="weekday"  type="hidden" value=""></input>	
<input id="termid"  type="hidden" value=""></input>
<input id="servertime"  type="hidden" value="<%=d.toLocaleString() %>"></input>
<input id="teacherid"  type="hidden" value="<%=teacherid %>"></input>
<div class="bottom">copyright©2015-2016 武汉科优达教育软件有限责任公司 技术支持</div>
</body>
</html>
