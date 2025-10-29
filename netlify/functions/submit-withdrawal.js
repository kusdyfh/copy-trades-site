// Simple function: accept withdrawal request and echo back (can be extended to persist)
export async function handler(event){
  try{
    const { email, network, address, amount } = JSON.parse(event.body||"{}");
    if(!address || !amount) return respond(400,{ok:false,message:"address and amount required"});
    // Here you could write to a DB or external storage. For now we just return OK.
    return respond(200,{ok:true, received:{ email, network, address, amount, ts:Date.now() }});
  }catch(e){ return respond(500,{ok:false,message:e.message}); }
}
const respond=(code,obj)=>({statusCode:code,headers:{'Content-Type':'application/json'},body:JSON.stringify(obj)});
