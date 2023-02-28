/* krpano 1.16 gyro plugin (build 2013-03-28) 
for devices with Gyro sensor (iPhone4 and iPad2 with iOS4.2+)
by Aldo Hoeben / fieldOfView.com
contributions by 
        Sjeiti / ronvalstar.nl
        Klaus / krpano.com
        
http://fieldofview.github.com/krpano_fovplugins/gyro/plugin.html
This software can be used free of charge and the source code is available under a Creative Commons Attribution license:
        http://creativecommons.org/licenses/by/3.0/     
*/
var krpanoplugin=function(){function r(){E=!1;s=null;void 0===t?g=!0:t&&!g?(window.addEventListener("deviceorientation",J,!0),b.control.layer.addEventListener("touchstart",K,!0),b.control.layer.addEventListener("touchend",A,!0),b.control.layer.addEventListener("touchcancel",A,!0),g=!0,B=-(u?top.orientation:window.orientation),v=n=f=0,l=b.view.camroll):g=!1}function C(){t&&g&&(window.removeEventListener("deviceorientation",J,!0),b.control.layer.removeEventListener("touchstart",K),b.control.layer.removeEventListener("touchend",
A),b.control.layer.removeEventListener("touchcancel",A));D&&b.call("tween(view.camroll,0)");g=!1}function L(){g?C():r()}function F(){window.removeEventListener("deviceorientation",F,!1);b.isdesktop||(t=!0,g&&(g=!1,r()),null!=d.onavailable&&b.call(d.onavailable,d))}function K(){G=!0}function A(){G=!1}function J(p){if(!G&&g){var d=u?top.orientation:window.orientation,m,a=p.alpha*w,h=p.beta*w,c=p.gamma*w,e;e=Math.cos(a);var a=Math.sin(a),j=Math.cos(h),h=Math.sin(h),k=Math.cos(c),c=Math.sin(c),a=[a*c-
e*h*k,-e*j,e*h*c+a*k,j*k,-h,-j*c,a*h*k+e*c,a*j,-a*h*c+e*k];0.9999<a[3]?(e=Math.atan2(a[2],a[8]),a=Math.PI/2,c=0):-0.9999>a[3]?(e=Math.atan2(a[2],a[8]),a=-Math.PI/2,c=0):(e=Math.atan2(-a[6],a[0]),c=Math.atan2(-a[5],a[4]),a=Math.asin(a[3]));m={yaw:e,pitch:a,roll:c};e=x(m.yaw/w);var c=m.pitch/w,a=e,j=b.view.hlookat,h=b.view.vlookat,k=b.view.camroll,t=j-n,r=h-v;if(E){D&&(l=x(180+Number(d)-m.roll/w));if(70<Math.abs(c)){a=p.alpha;switch(d){case 0:0<c&&(a+=180);break;case 90:a+=90;break;case -90:a+=-90;
break;case 180:0>c&&(a+=180)}a=x(a);180<Math.abs(a-e)&&(a+=a<e?360:-360);p=Math.min(1,(Math.abs(c)-70)/10);e=e*(1-p)+a*p;l*=1-p}B+=t;f+=r;90<Math.abs(c+f)&&(f=0<c+f?90-c:-90-c);n=x(-e-180+B);v=Math.max(Math.min(c+f,90),-90);180<Math.abs(n-j)&&(j+=n>j?360:-360);n=(1-q)*n+q*j;v=(1-q)*v+q*h;180<Math.abs(l-k)&&(k+=l>k?360:-360);l=(1-q)*l+q*k;b.view.hlookat=x(n);b.view.vlookat=v;b.view.camroll=x(l);0!=f&&0<z&&(0==r?1==z?y=f=0:(y=1-(1-y)*b.control.touchfriction,f*=1-Math.pow(z,2)*y,0.1>Math.abs(f)&&(y=
f=0)):y=0)}else if(null==s)s=m;else if(m.yaw!=s.yaw||m.pitch!=s.pitch||m.roll!=s.roll)s=null,E=!0,H&&(f=-c)}}function x(b){b%=360;return 180>=b?b:b-360}function I(b){return 0<="yesontrue1".indexOf(String(b).toLowerCase())}var b=null,d=null,u=!1,t,g=!1,z=0,H=!1,D=!1,q=0.5,G=!1,E=!1,s=null,B=0,f=0,n=0,v=0,l=0,y=0,w=Math.PI/180;this.registerplugin=function(f,l,m){b=f;d=m;if("%"!=b.build.charAt(0)&&("1.0.8.14">b.version||"2011-03-30">b.build))b.trace(3,"gyro plugin - too old krpano version (min. 1.0.8.14)");
else{u=b._have_top_access;if(void 0===u){u=!1;try{top&&top.document&&(u=!0)}catch(a){}}window.DeviceOrientationEvent&&window.addEventListener("deviceorientation",F,!1);d.registerattribute("available",!1,function(){},function(){return t});d.registerattribute("enabled",!0,function(a){I(a)?r():C()},function(){return g});d.registerattribute("velastic",0,function(a){z=Math.max(Math.min(Number(a),1),0)},function(){return z});d.registerattribute("vrelative",!1,function(a){H=I(a)},function(){return H});d.registerattribute("camroll",
!1,function(a){D=I(a)},function(){return D});d.registerattribute("friction",0.5,function(a){q=Math.max(Math.min(Number(a),1),0)},function(){return q});d.registerattribute("onavailable",null);d.enable=r;d.disable=C;d.toggle=L}};this.unloadplugin=function(){window.removeEventListener("deviceorientation",F,!1);C();b=d=null}};