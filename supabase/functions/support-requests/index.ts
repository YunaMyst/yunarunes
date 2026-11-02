import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
const corsHeaders={"Access-Control-Allow-Origin":"https://yunarunes.com","Access-Control-Allow-Headers":"authorization, x-client-info, apikey, content-type","Access-Control-Allow-Methods":"POST, OPTIONS","Vary":"Origin"};
const json=(body:unknown,status=200)=>new Response(JSON.stringify(body),{status,headers:{...corsHeaders,"Content-Type":"application/json"}});
Deno.serve(async(req)=>{
 if(req.method==="OPTIONS")return new Response("ok",{headers:corsHeaders});
 if(req.method!=="POST")return json({error:"Method not allowed"},405);
 try{
  const raw=await req.text();if(raw.length>900000)return json({error:"Request too large"},413);
  const b=JSON.parse(raw),name=String(b.name||"Jogador").trim().slice(0,60),email=String(b.email||"").trim().slice(0,120),category=String(b.category||""),message=String(b.message||"").trim().slice(0,4000),attachment=typeof b.attachment_base64==="string"?b.attachment_base64:null;
  if(!["problem","usage","idea","other"].includes(category))return json({error:"Invalid category"},400);
  if(!message)return json({error:"Message is required"},400);
  if(email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return json({error:"Invalid email"},400);
  if(attachment&&(attachment.length>700000||!attachment.startsWith("data:image/jpeg;base64,")))return json({error:"Invalid attachment"},400);
  const url=Deno.env.get("SUPABASE_URL"),key=Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");if(!url||!key)return json({error:"Support service unavailable"},503);
  const db=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});
  const {error}=await db.from("yunarunes_support_requests").insert({name,email:email||null,category,message,attachment_base64:attachment});
  if(error){console.error("Support insert failed:",error.message);return json({error:"Could not save request"},500)}
  return json({ok:true});
 }catch(e){console.error("Support request error:",e);return json({error:"Invalid request"},400)}
});
