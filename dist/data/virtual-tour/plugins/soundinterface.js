/* krpano 1.16 soundinterface plugin (build 2013-03-28) */
var krpanoplugin=function(){function y(){}function z(){var a=arguments;if(1<a.length){var b=String(a[0]).toLowerCase(),j=a[1],A=2<a.length?parseInt(a[2]):1,m=3<a.length?a[3]:null;if("auto"==b||"null"==b||""==b)b="autoid_"+g.timertick+"_"+Math.ceil(1E3*g.random);var a=j,f=a.split("|");if(1<f.length){if(null==h){h="";var k=document.createElement("audio");if(!(null===k||void 0===k))if(h+="wav",void 0!==k.canPlayType){var e=k.canPlayType("audio/ogg");e.match(/maybe|probably/i)&&(h+="ogg");e=k.canPlayType("audio/mpeg");
e.match(/maybe|probably/i)&&(h+="mp3");e=k.canPlayType("audio/mp4");e.match(/maybe|probably/i)&&(h+="mp4")}else h+="mp3"}k=f.length;if(0<=h.indexOf("mp3"))for(e=0;e<k;e++){var l=String(f[e]).toLowerCase();if(0<l.indexOf(".mp3")){a=f[e];break}}else if(0<=h.indexOf("mp4"))for(e=0;e<k;e++){if(l=String(f[e]).toLowerCase(),0<l.indexOf(".mp4")){a=f[e];break}}else if(0<=h.indexOf("ogg"))for(e=0;e<k;e++){if(l=String(f[e]).toLowerCase(),0<l.indexOf(".ogg")||0<l.indexOf(".oga")){a=f[e];break}}else if(0<=h.indexOf("wav"))for(e=
0;e<k;e++){if(l=String(f[e]).toLowerCase(),0<l.indexOf(".wav")){a=f[e];break}}else a=f[0]}f=u.rootpath;null!=f&&0<f.length&&"null"!=String(f).toLowerCase()?"/"!=f.charAt(f.length-1)&&(f+="/"):f="";var j=f=unescape(g.parsePath(f+a)),c=null;q&&v&&void 0!==d[b]&&(c=d[b],c.currentTime=0,c.pause(),d[b]=null,delete d[b],c=null);if(null!=c||void 0!==d[b])null==c?c=d[b]:d[b]=c,c.currentTime=0,c.pause();else{c=document.createElement("audio");if(!c){g.trace(2,w);return}c.addEventListener("error",function(){g.trace(3,
"soundinterface - loading of "+j+" failed!")},!0);c.addEventListener("ended",function(){0<c.loopcount?(c.loopcount--,0==c.loopcount?m&&g.call(m):(c.currentTime=0,c.play())):(c.currentTime=0,c.play())},!0);d[b]=c}try{if(c.loopcount=A,c.src=j,c.volume=r,c.play(),q&&c.paused){var n=document.body,s=function(){n.removeEventListener("touchstart",s,!0);p&&p.paused&&!p.ended&&p.play()};n.removeEventListener("touchstart",s,!0);p=c;n.addEventListener("touchstart",s,!0)}}catch(t){g.trace(2,w)}}}function B(a){(a=
d[String(a).toLowerCase()])&&a.pause()}function C(a){(a=d[String(a).toLowerCase()])&&a.paused&&a.play()}function D(a){(a=d[String(a).toLowerCase()])&&(a.paused?a.play():a.pause())}function E(a){if(a=d[String(a).toLowerCase()])a.currentTime=0,a.pause()}function F(){var a,b;for(a in d)if((b=d[a])&&void 0!==b.paused)b.pause(),d[a]=null;d=[];p=null}function t(a){var b,j;for(b in d)if((j=d[b])&&void 0!==j.paused)!1==a?!1==j.paused&&(j.pause(),j.needresume=!0):j.needresume&&j.play()}function x(){r=m?0:
n;var a,b;for(a in d)if(b=d[a])b.volume=r,q&&(m?!1==b.paused&&(b._krp_muted=!0,b.pause()):!0==b._krp_muted&&(b._krp_muted=!1,b.play()))}var u=null,g=null,d=[],p=null,q=!1,v=!1,w="soundinterface - HTML5 audio is not supported by this browser!",n=1,m=!1,r=1;this.registerplugin=function(a,b,d){g=a;u=d;d.keep=!0;d.registerattribute("rootpath","");d.registerattribute("volume",1,function(a){n=a;x()},function(){return n});d.registerattribute("mute",!1,function(a){m=0<="yesontrue1".indexOf(String(a).toLowerCase());
x()},function(){return m});g.soundinterface=d;g.preloadsound=y;g.playsound=z;g.pausesound=B;g.resumesound=C;g.pausesoundtoggle=D;g.stopsound=E;g.stopallsounds=F;a=navigator.userAgent;b=a.indexOf("OS ");0<b&&(b+=3,"4.2">a.slice(b,a.indexOf(" ",b)).split("_").join(".")&&(v=!0));q=g.isphone||g.ispad;window&&(window.addEventListener("pagehide",function(){t(!1)},!0),window.addEventListener("pageshow",function(){t(!0)},!0))};var h=null};