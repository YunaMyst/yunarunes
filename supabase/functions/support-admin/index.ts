import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
const corsHeaders={"Access-Control-Allow-Origin":"https://yunarunes.com","Access-Control-Allow-Headers":"authorization, x-client-info, apikey, content-type","Access-Control-Allow-Methods":"GET, PATCH, OPTIONS","Vary":"Origin"};
const json=(body:unknown,status=200)=>new Response(JSON.stringify(body),{status,headers:{...corsHeaders,"Content-Type":"application/json"}});
Deno.serve(async(req)=>{
 if(req.method==="OPTIONS")return new Response("ok",{headers:corsHeaders});
 if(!["GET","PATCH"].includes(req.method))return json({error:"Method not allowed"},405);
 try{
  const h=req.headers.get("Authorization")||"",token=h.startsWith("Bearer ")?h.slice(7):"";if(!token)return json({error:"Authentication required"},401);
  const url=Deno.env.get("SUPABASE_URL"),anon=Deno.env.get("SUPABASE_ANON_KEY"),service=Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"),allowed=(Deno.env.get("SUPPORT_ADMIN_EMAILS")||"").split(",").map(x=>x.trim().toLowerCase()).filter(Boolean);
  if(!url||!anon||!service||!allowed.length)return json({error:"Admin access is not configured"},503);
  const auth=createClient(url,anon,{global:{headers:{Authorization:"Bearer "+token}},auth:{persistSession:false,autoRefreshToken:false}});
  const {data,error}=await auth.auth.getUser(token),email=data?.user?.email?.toLowerCase();if(error||!email||!allowed.includes(email))return json({error:"Forbidden"},403);
  const db=createClient(url,service,{auth:{persistSession:false,autoRefreshToken:false}});
  if(req.method==="GET"){const q=await db.from("yunarunes_support_requests").select("id,name,email,category,message,attachment_base64,status,created_at,updated_at").order("created_at",{ascending:false}).limit(200);if(q.error)return json({error:"Could not load requests"},500);return json({requests:q.data||[]})}
  const b=await req.json(),id=String(b.id||""),status=String(b.status||"");if(!/^[0-9a-f-]{36}$/i.test(id)||!["new","in_progress","resolved"].includes(status))return json({error:"Invalid update"},400);
  const q=await db.from("yunarunes_support_requests").update({status,updated_at:new Date().toISOString()}).eq("id",id);if(q.error)return json({error:"Could not update request"},500);return json({ok:true});
 }catch(e){console.error("Support admin error:",e);return json({error:"Request failed"},400)}
});
