import{mkdirSync as m,readFileSync as r,readdirSync as d,writeFileSync as w,chmodSync as h}from'node:fs';
import{join as j}from'node:path';
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
const N=new Int8Array(256),U=new Int8Array(256),G=new Int8Array(256).fill(-1);
for(let o=16;o<35;o++)if(o!=23&&o!=27&&o!=31){N[o]=2;U[o]=1;G[o]=0}
for(const[o,n,u,g]of[[0,0,0,0],[1,0,1,1],[2,0,1,4],[3,1,0,0],[4,1,2,0],[5,2,2,0],[6,2,3,0],[7,3,3,0],[23,1,1,0],[27,1,1,0],[48,0,0,2],[49,1,0,2],[50,1,0,2],[51,0,0,2],[52,0,0,0],[64,1,1,0],[65,2,0,0],[80,1,0,0],[81,1,0,0],[82,0,1,0],[83,1,0,0]]){N[o]=n;U[o]=u;G[o]=g}
function R(p,q){
const s=new Int32Array(257);let t=0;const c=[],y=new Int32Array(256),o=[];let x=0,k=0,n=0,e=0;
for(;;){
if(n>=1e6)return[Buffer.from(o),10];
if(x<0||x>=p.length)return[Buffer.from(o),9];
const a=p[x],g=G[a];
if(g<0)return[Buffer.from(o),5];
if(x+1+g>p.length)return[Buffer.from(o),9];
if(t<N[a])return[Buffer.from(o),2];
if(t-N[a]+U[a]>256)return[Buffer.from(o),3];
n++;const z=x+1+g;let v=0;
if(g==1)v=p[x+1];else if(g==4)v=p[x+1]|p[x+2]<<8|p[x+3]<<16|p[x+4]<<24;else if(g==2)v=p[x+1]|p[x+2]<<8;
x=z;
switch(a){
case 0:return[Buffer.from(o),0];
case 1:s[t++]=v<128?v:v-256;break;
case 2:s[t++]=v;break;
case 3:t--;break;
case 4:s[t]=s[t-1];t++;break;
case 5:{const h=s[t-1];s[t-1]=s[t-2];s[t-2]=h;break}
case 6:s[t]=s[t-2];t++;break;
case 7:{const h=s[t-3];s[t-3]=s[t-2];s[t-2]=s[t-1];s[t-1]=h;break}
case 16:{const b=s[--t];s[t-1]+=b;break}
case 17:{const b=s[--t];s[t-1]-=b;break}
case 18:{const b=s[--t];s[t-1]=Math.imul(s[t-1],b);break}
case 19:{const b=s[--t],f=s[t-1];if(!b)return[Buffer.from(o),4];s[t-1]=(f/b)|0;break}
case 20:{const b=s[--t],f=s[t-1];if(!b)return[Buffer.from(o),4];s[t-1]=f%b;break}
case 21:{const b=s[--t],f=s[t-1];if(!b)return[Buffer.from(o),4];s[t-1]=((f>>>0)/(b>>>0))|0;break}
case 22:{const b=s[--t],f=s[t-1];if(!b)return[Buffer.from(o),4];s[t-1]=(f>>>0)%(b>>>0);break}
case 23:s[t-1]=-s[t-1];break;
case 24:{const b=s[--t];s[t-1]&=b;break}
case 25:{const b=s[--t];s[t-1]|=b;break}
case 26:{const b=s[--t];s[t-1]^=b;break}
case 27:s[t-1]=~s[t-1];break;
case 28:{const b=s[--t];s[t-1]<<=b&31;break}
case 29:{const b=s[--t];s[t-1]>>=b&31;break}
case 30:{const b=s[--t];s[t-1]=s[t-1]>>>(b&31);break}
case 32:{const b=s[--t];s[t-1]=s[t-1]==b?1:0;break}
case 33:{const b=s[--t];s[t-1]=s[t-1]<b?1:0;break}
case 34:{const b=s[--t];s[t-1]=(s[t-1]>>>0)<(b>>>0)?1:0;break}
case 48:x=z+(v>=32768?v-65536:v);break;
case 49:if(s[--t]==0)x=z+(v>=32768?v-65536:v);break;
case 50:if(s[--t]!=0)x=z+(v>=32768?v-65536:v);break;
case 51:if(c.length>=64)return[Buffer.from(o),7];c.push(z);x=v;break;
case 52:if(!c.length)return[Buffer.from(o),8];x=c.pop();break;
case 64:{const f=s[t-1];if(f<0||f>255)return[Buffer.from(o),6];s[t-1]=y[f];break}
case 65:{const f=s[--t],h=s[--t];if(f<0||f>255)return[Buffer.from(o),6];y[f]=h;break}
case 80:{const f=String(s[--t]);if(o.length+f.length>65536)return[Buffer.from(o),11];for(let i=0;i<f.length;i++)o.push(f.charCodeAt(i));break}
case 81:if(o.length+1>65536)return[Buffer.from(o),11];o.push(s[--t]&255);break;
case 82:s[t++]=k<q.length?q[k++]:-1;break;
case 83:return[Buffer.from(o),s[--t]&255];
}}}
for(const id of d(I).sort()){
const[b,e]=R(r(j(I,id,'program.bin')),r(j(I,id,'input.bin')));
const f=j(O,id);m(f,{recursive:true,mode:0o755});h(f,0o755);
w(j(f,'stdout.bin'),b,{mode:0o644});h(j(f,'stdout.bin'),0o644);
w(j(f,'exit.txt'),e+'\n',{mode:0o644});h(j(f,'exit.txt'),0o644);
}
