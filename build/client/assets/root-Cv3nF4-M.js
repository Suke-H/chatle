import{o as x,p as g,q as j,t as h,r as a,_ as S,v as i,n as e,M as w,L as k,O as f,S as M}from"./components-BySryKae.js";/**
 * @remix-run/react v2.17.4
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */let l="positions";function W({getKey:r,...c}){let{isSpaMode:p}=x(),s=g(),m=j();h({getKey:r,storageKey:l});let y=a.useMemo(()=>{if(!r)return null;let t=r(s,m);return t!==s.key?t:null},[]);if(p)return null;let u=((t,d)=>{if(!window.history.state||!window.history.state.key){let o=Math.random().toString(32).slice(2);window.history.replaceState({key:o},"")}try{let n=JSON.parse(sessionStorage.getItem(t)||"{}")[d||window.history.state.key];typeof n=="number"&&window.scrollTo(0,n)}catch(o){console.error(o),sessionStorage.removeItem(t)}}).toString();return a.createElement("script",S({},c,{suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${u})(${i(JSON.stringify(l))}, ${i(JSON.stringify(y))})`}}))}function O(){return e.jsxs("html",{lang:"en",children:[e.jsxs("head",{children:[e.jsx("meta",{charSet:"utf-8"}),e.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),e.jsx("link",{rel:"icon",type:"image/png",href:"/maton.png"}),e.jsx("meta",{property:"og:title",content:"My Wordle Project"}),e.jsx("meta",{property:"og:description",content:"New York Time社の「WORDLE」をもとに作成した勉強用サイトです"}),e.jsx("meta",{property:"og:url",content:"https://kakutory.com/game_pages/MyWordleProject/"}),e.jsx("meta",{property:"og:image",content:"https://kakutory.com/game_pages/MyWordleProject/MyWordleProject.png"}),e.jsx("meta",{property:"og:type",content:"website"}),e.jsx("meta",{property:"og:site_name",content:"Kakutory"}),e.jsx("title",{children:"My Wordle Project | Kakutory"}),e.jsx(w,{}),e.jsx(k,{})]}),e.jsxs("body",{children:[e.jsx(f,{}),e.jsx(W,{}),e.jsx(M,{})]})]})}export{O as default};
