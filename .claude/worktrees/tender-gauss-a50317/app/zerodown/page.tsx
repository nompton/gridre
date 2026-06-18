'use client'

import Image from "next/image"
import Script from "next/script"
import { useState } from "react"

export default function ZeroDown(){

const [submitted,setSubmitted] = useState(false)
const [sending,setSending] = useState(false)
const [index,setIndex] = useState(0)

const photos = [
"/listings/808-cockrel/front.jpg",
"/listings/808-cockrel/living.jpg",
"/listings/808-cockrel/kitchen.jpg",
"/listings/808-cockrel/backyard.jpg"
]

async function submitLead(e:any){
e.preventDefault()

if(sending) return
setSending(true)

const formData = new FormData(e.target)

const payload = {
name: formData.get("name"),
email: formData.get("email"),
phone: formData.get("phone"),
source:"zerodown",
page:window.location.href
}

await fetch(
"https://automation.thegridre.com/webhook/48b7cab7-9899-45cc-b5f6-970ebe7dffa7",
{
method:"POST",
headers:{ "Content-Type":"application/json"},
body:JSON.stringify(payload)
}
)

if((window as any).fbq){
(window as any).fbq('track','Lead')
}

setSubmitted(true)
}

function next(){
setIndex((index+1)%photos.length)
}

function prev(){
setIndex((index-1+photos.length)%photos.length)
}

return(

<>

<Script id="meta-pixel" strategy="afterInteractive">
{`
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];
t=b.createElement(e);t.async=true;
t.src=v;
s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1258776576443528');
fbq('track', 'PageView');
`}
</Script>

<div style={{fontFamily:"system-ui",background:"#f6f7f9"}}>

{/* NAV */}

<div style={{
display:"flex",
alignItems:"center",
gap:"10px",
padding:"20px",
maxWidth:"1100px",
margin:"auto"
}}>
<Image src="/brand/grid_icon.png" alt="GRID" width={36} height={36}/>
</div>


{/* IMAGE SLIDER */}

<div style={{
maxWidth:"1100px",
margin:"auto",
padding:"20px"
}}>

<div style={{position:"relative"}}>

<Image
src={photos[index]}
alt="808 N Cockrel Norman"
width={900}
height={600}
style={{width:"100%",height:"auto",borderRadius:"8px"}}
/>

<button
onClick={prev}
style={{
position:"absolute",
top:"50%",
left:"10px",
background:"white",
border:"none",
padding:"10px",
cursor:"pointer"
}}
>
‹
</button>

<button
onClick={next}
style={{
position:"absolute",
top:"50%",
right:"10px",
background:"white",
border:"none",
padding:"10px",
cursor:"pointer"
}}
>
›
</button>

</div>

</div>


{/* HERO */}

<div style={{
background:"#0f2e4d",
color:"white",
padding:"50px 20px"
}}>

<div style={{
maxWidth:"1100px",
margin:"auto",
display:"grid",
gridTemplateColumns:"1fr 1fr",
gap:"40px",
alignItems:"center"
}}>

<div>

<h1 style={{fontSize:"40px",marginBottom:"10px"}}>
Buy a Norman Home With $0 Down
</h1>

<p style={{fontSize:"18px"}}>
This home may qualify for the Cleveland County Home Loan Authority
first-time buyer down payment assistance program.
</p>

<div style={{fontSize:"34px",fontWeight:700}}>
$150,000
</div>

<div style={{fontSize:"26px",color:"#80e27e",fontWeight:700}}>
≈ $1,175/month*
</div>

<p>
3 Bed • 1 Bath • Norman OK
</p>

</div>


{/* FORM */}

<div style={{
background:"white",
color:"#222",
borderRadius:"10px",
padding:"30px",
boxShadow:"0 6px 20px rgba(0,0,0,0.15)"
}}>

{submitted ? (

<div style={{textAlign:"center"}}>

<h2>Request Received</h2>

<p>
Patrick will reach out shortly with details about this home.
</p>

</div>

) : (

<form onSubmit={submitLead} style={{display:"grid",gap:"10px"}}>

<input
name="name"
placeholder="Name"
required
style={{padding:"12px"}}
/>

<input
name="email"
placeholder="Email"
required
style={{padding:"12px"}}
/>

<input
name="phone"
placeholder="Phone"
style={{padding:"12px"}}
/>

<button
type="submit"
style={{
background:"#1f7a3a",
color:"white",
border:"none",
padding:"14px",
fontSize:"18px",
borderRadius:"6px",
cursor:"pointer"
}}
>
Request Information
</button>

</form>

)}

</div>

</div>

</div>


{/* PAYMENT */}

<div style={{
maxWidth:"1100px",
margin:"auto",
padding:"40px 20px"
}}>

<div style={{
background:"white",
padding:"30px",
borderRadius:"10px"
}}>

<h2>Estimated Monthly Payment</h2>

<p>

Principal & Interest: $875<br/>
Estimated Taxes: $180<br/>
Estimated Insurance: $120

</p>

<p style={{fontSize:"12px",color:"#555"}}>
*Payment example is an estimate only and based on current
rates, taxes, and insurance.
</p>

</div>

</div>


{/* MLS LINK */}

<div style={{
maxWidth:"1100px",
margin:"auto",
padding:"0 20px 60px",
textAlign:"center"
}}>

<a
href="https://portal.onehome.com/en-US/property/aotf~1154343390~MLSGATEWAY"
target="_blank"
style={{
display:"inline-block",
background:"#0f2e4d",
color:"white",
padding:"16px 28px",
borderRadius:"8px",
textDecoration:"none",
fontWeight:600
}}
>
View Full Listing Photos
</a>

<p style={{fontSize:"13px",color:"#666",marginTop:"20px"}}>
Listing courtesy of David Briscoe, Keller Williams Realty Elite.
Information is deemed reliable but not guaranteed. Buyer to verify all information.
</p>

</div>

</div>

</>

)

}