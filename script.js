function submitForm(){

const spinner=document.getElementById("spinner");
const btn=document.getElementById("submitBtn");

spinner.style.display="inline-block";
btn.disabled=true;

const baseUrl="https://script.google.com/macros/s/AKfycbzEGV9LtYXfOgeTvjqRN-4NmyRJApPQT2qycbNLvE0VI869iWp8z3f8anCH9YihXrlgiw/exec";

const params=new URLSearchParams({
fullName:document.getElementById("fullName").value,
address:document.getElementById("address").value,
countryCode:document.getElementById("countryCode").value,
mobile:document.getElementById("mobile").value,
email:document.getElementById("email").value,
comments:document.getElementById("comments").value
});

fetch(baseUrl+"?"+params.toString())
.then(res=>res.text())
.then(()=>{

["fullName","address","mobile","email","comments"].forEach(id=>{
const el=document.getElementById(id);
if(el) el.value="";
});

spinner.style.display="none";
btn.disabled=false;

const successDiv=document.getElementById("successMsg");
successDiv.innerHTML="Your application has been submitted successfully ✅";
successDiv.style.display="block";

const contactDiv=document.getElementById("contactMsg");
contactDiv.innerHTML=`
Click the WhatsApp icon to contact our team
<a href="https://wa.me/94718940050" target="_blank">
<img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
style="height:20px;">
</a>
`;
contactDiv.style.display="block";

})
.catch(err=>{
console.error(err);

spinner.style.display="none";
btn.disabled=false;

alert("Submission Failed ❌");
});
}
