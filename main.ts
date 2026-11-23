import{readdirSync as R,readFileSync as F,mkdirSync as K,writeFileSync as W}from'node:fs';
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
const T="###$$%%&        %%%%%%%$%%%$%%% %%%             #$$##           $%              $$#$";
function run(p,q){
  const D=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),U=new Uint8Array(65536);
  let s=0,c=0,L=0,pc=0,t=0,ip=0;
  const done=x=>[x,U.subarray(0,L)];
  for(;;){
    if(t===1e6)return done(10);
    if(pc<0||pc>=p.length)return done(9);
    const o=p[pc],v=T.charCodeAt(o);
    if(!(v>=35))return done(5);
    const m=o===1?1:o===2?4:o>47&&o<52?2:0;
    if(pc+m>=p.length)return done(9);
    t++;
    const n=pc+1+m;
    if(s<v-35)return done(2);
    if(s===256&&(o===1||o===2||o===4||o===6||o===82))return done(3);
    pc=n;
    if(o>15&&o<35&&o!==23&&o!==27){
      const b=D[s-1],a=D[s-2];
      let r;
      switch(o){
        case 16:r=a+b;break;
        case 17:r=a-b;break;
        case 18:r=Math.imul(a,b);break;
        case 19:if(!b)return done(4);r=(a/b)|0;break;
        case 20:if(!b)return done(4);r=a%b;break;
        case 21:if(!b)return done(4);r=(a>>>0)/(b>>>0)|0;break;
        case 22:if(!b)return done(4);r=(a>>>0)%(b>>>0);break;
        case 24:r=a&b;break;
        case 25:r=a|b;break;
        case 26:r=a^b;break;
        case 28:r=a<<b;break;
        case 29:r=a>>b;break;
        case 30:r=a>>>b;break;
        case 32:r=a===b?1:0;break;
        case 33:r=a<b?1:0;break;
        default:r=(a>>>0)<(b>>>0)?1:0;
      }
      D[s-2]=r;s--;
      continue;
    }
    switch(o){
      case 0:return done(0);
      case 1:D[s++]=p[n-1]<<24>>24;break;
      case 2:D[s++]=p[n-4]|p[n-3]<<8|p[n-2]<<16|p[n-1]<<24;break;
      case 3:s--;break;
      case 4:D[s]=D[s-1];s++;break;
      case 5:{const x=D[s-1];D[s-1]=D[s-2];D[s-2]=x;break;}
      case 6:D[s]=D[s-2];s++;break;
      case 7:{const x=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=x;break;}
      case 23:D[s-1]=-D[s-1];break;
      case 27:D[s-1]=~D[s-1];break;
      case 48:pc=n+((p[n-2]|p[n-1]<<8)<<16>>16);break;
      case 49:case 50:{const x=D[--s];if((o===49)===(x===0))pc=n+((p[n-2]|p[n-1]<<8)<<16>>16);break;}
      case 51:if(c===64)return done(7);C[c++]=n;pc=p[n-2]|p[n-1]<<8;break;
      case 52:if(!c)return done(8);pc=C[--c];break;
      case 64:{const a=D[s-1];if(a<0||a>255)return done(6);D[s-1]=M[a];break;}
      case 65:{const a=D[s-1];if(a<0||a>255)return done(6);M[a]=D[s-2];s-=2;break;}
      case 80:{const b=Buffer.from(''+D[s-1]);if(L+b.length>65536)return done(11);s--;U.set(b,L);L+=b.length;break;}
      case 81:if(L>65535)return done(11);U[L++]=D[--s]&255;break;
      case 82:D[s++]=ip<q.length?q[ip++]:-1;break;
      case 83:return done(D[--s]&255);
    }
  }
}
for(const id of R(I).sort()){
  const [c,b]=run(F(I+'/'+id+'/program.bin'),F(I+'/'+id+'/input.bin'));
  K(O+'/'+id,{recursive:true});
  W(O+'/'+id+'/stdout.bin',b);
  W(O+'/'+id+'/exit.txt',c+'\n');
}
