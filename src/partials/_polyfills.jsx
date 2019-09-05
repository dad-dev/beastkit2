  ////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // Polyfills
  //
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  if(!Array.prototype.map){Array.prototype.map=function(callback){var T,A,k;if(this==null){throw new TypeError('this is null or not defined')}
var O=Object(this);var len=O.length>>>0;if(typeof callback!=='function'){throw new TypeError(callback+' is not a function')}
if(arguments.length>1){T=arguments[1]}
A=new Array(len);k=0;while(k<len){var kValue,mappedValue;if(k in O){kValue=O[k];mappedValue=callback.call(T,kValue,k,O);A[k]=mappedValue}
k++}
return A}}

if(!Array.prototype.filter){Array.prototype.filter=function(func,thisArg){'use strict';if(!((typeof func==='Function'||typeof func==='function')&&this))
throw new TypeError();var len=this.length>>>0,res=new Array(len),t=this,c=0,i=-1;if(thisArg===undefined){while(++i!==len){if(i in this){if(func(t[i],i,t)){res[c++]=t[i]}}}}
else{while(++i!==len){if(i in this){if(func.call(thisArg,t[i],i,t)){res[c++]=t[i]}}}}
res.length=c;return res}}
  ////////////////////////////////////////////////////////////////////////////////////////////////////
