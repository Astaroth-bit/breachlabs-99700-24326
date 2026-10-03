const { chromium } = require('/opt/node-tools/node_modules/playwright');
const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080},deviceScaleFactor:+(process.env.DPR||1)});
for(const f of process.argv.slice(2)){await p.goto('file://'+f,{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(200);
const r=await p.evaluate(()=>{const o={};document.querySelectorAll('[data-a]').forEach(e=>{const k=e.dataset.a;const b=e.getBoundingClientRect();const pid=(e.closest('.dev')||e.closest('.phone'))?.dataset.a||'';o[(pid&&pid!==k?pid+'.':'')+k]=[+b.left.toFixed(1),+b.top.toFixed(1),+b.width.toFixed(1),+b.height.toFixed(1)]});return o});
fs.writeFileSync(f.replace('.html','.json'),JSON.stringify(r,null,0));
await p.screenshot({path:f.replace('.html','.png')});console.log('ok',f)}
await b.close()})();
