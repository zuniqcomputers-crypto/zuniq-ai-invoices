"use strict";(()=>{var e={};e.id=744,e.ids=[744],e.modules={517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},725:(e,t,a)=>{a.r(t),a.d(t,{headerHooks:()=>g,originalPathname:()=>_,patchFetch:()=>w,requestAsyncStorage:()=>m,routeModule:()=>h,serverHooks:()=>y,staticGenerationAsyncStorage:()=>f,staticGenerationBailout:()=>v});var r={};a.r(r),a.d(r,{POST:()=>p,dynamic:()=>c});var n=a(5419),o=a(9108),i=a(9678),s=a(8070);let u=`You are a friendly, professional AI invoice assistant for "Zuniq Invoices".
Your job is to collect information from the user step by step to build a complete invoice.
You are given the current invoice data in JSON format and the conversation history.
Your task is to:
- Check which fields are still missing or empty.
- Ask ONE question at a time to fill the next missing field.
- If the user corrects a previous answer (e.g., "no, my business name is XYZ"), you must update that field and thank them.
- Never repeat a question that has already been answered.
- If all fields are filled, respond that the invoice is complete and the user can review it.
- When the user gives an answer, you must update the invoice data accordingly.

You must output your response in the following JSON format ONLY, with no extra text:
{
  "reply": "your message to the user",
  "updatedData": { ... the updated invoice object with all fields }
}

If the user sends a greeting or thanks, respond naturally but still keep the JSON format.

Important fields and their order:
1. business_name
2. business_email
3. business_phone
4. trn_number
5. business_logo_url (optional, can be skipped)
6. client_name
7. client_email
8. client_phone
9. client_address
10. currency
11. items (list of { description, quantity, unit_price })
12. tax_percentage
13. discount
14. due_date
15. qr_code_data (optional)
16. notes (optional)
17. signature_url (optional)

Always keep the conversation natural and helpful. If the user asks for help or says "I don't know", give them a hint.`;async function l(e,t,a){let r=process.env.GEMINI_API_KEY;if(!r)throw Error("GEMINI_API_KEY is not set");let n=a.map((e,t)=>`[${t%2==0?"AI":"User"}]: ${e}`).join("\n"),o=`
Current invoice data (JSON):
${JSON.stringify(e,null,2)}

Previous conversation:
${n}

User's latest message:
${t}

Remember: output ONLY the JSON object with "reply" and "updatedData".`,i=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${r}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:u+"\n\n"+o}]}],generationConfig:{temperature:.3,maxOutputTokens:1500}})});if(!i.ok){let e=await i.text();throw Error(`Gemini API error: ${e}`)}let s=await i.json(),l=s.candidates?.[0]?.content?.parts?.[0]?.text;if(!l)throw Error("No content in Gemini response");let d=l.match(/\{[\s\S]*\}/);if(!d)throw Error("Failed to parse JSON from Gemini response");let c=JSON.parse(d[0]),p={...e,...c.updatedData},h=function(e){let t=e.items.reduce((e,t)=>e+t.quantity*t.unit_price,0),a=t+t*Math.max(0,e.tax_percentage)/100-(e.discount||0);return{subtotal:t,total:a}}(p);return p.subtotal=h.subtotal,p.total=h.total,p.issue_date=p.issue_date||new Date().toISOString().split("T")[0],{reply:c.reply||"I didn't understand that. Could you rephrase?",updatedData:p}}async function d(e,t,a){try{return await l(t,e,a)}catch(e){return console.error("Gemini error:",e),{reply:"I'm sorry, I had a little trouble understanding that. Could you try again?",updatedData:t}}}let c="force-dynamic";async function p(e){try{let{message:t,currentData:a,conversationHistory:r=[]}=await e.json();if(!t)return s.Z.json({error:"Message required"},{status:400});let n=await d(t,a,r);return s.Z.json(n)}catch(e){return s.Z.json({error:e.message||"Server error"},{status:500})}}let h=new n.AppRouteRouteModule({definition:{kind:o.x.APP_ROUTE,page:"/api/chat/route",pathname:"/api/chat",filename:"route",bundlePath:"app/api/chat/route"},resolvedPagePath:"C:\\Users\\HP\\zuniq-ai-invoices\\src\\app\\api\\chat\\route.ts",nextConfigOutput:"",userland:r}),{requestAsyncStorage:m,staticGenerationAsyncStorage:f,serverHooks:y,headerHooks:g,staticGenerationBailout:v}=h,_="/api/chat/route";function w(){return(0,i.patchFetch)({serverHooks:y,staticGenerationAsyncStorage:f})}}};var t=require("../../../webpack-runtime.js");t.C(e);var a=e=>t(t.s=e),r=t.X(0,[638,206],()=>a(725));module.exports=r})();