// ===============================
// Toggle conditional sections
// ===============================
function toggleSections(){

  document.getElementById("plantation").style.display = "none";
  document.getElementById("sales").style.display = "none";
  document.getElementById("other").style.display = "none";

  const category = document.getElementById("category").value;

  if(category === "plantation"){
    document.getElementById("plantation").style.display = "block";
  }

  if(category === "sales"){
    document.getElementById("sales").style.display = "block";
  }

  if(category === "other"){
    document.getElementById("other").style.display = "block";
  }
}


// ===============================
// Submit form data to Google Sheet
// ===============================
function submitForm(){

  const baseUrl =
    "https://script.google.com/macros/s/AKfycbzEGV9LtYXfOgeTvjqRN-4NmyRJApPQT2qycbNLvE0VI869iWp8z3f8anCH9YihXrlgiw/exec";

  const params = new URLSearchParams({
    fullName: document.getElementById("fullName").value,
    address: document.getElementById("address").value,
    countryCode: document.getElementById("countryCode").value,
    mobile: document.getElementById("mobile").value,
    email: document.getElementById("email").value,
    category: document.getElementById("category").value,
    companyType: document.getElementById("otherType")
      ? document.getElementById("otherType").value
      : "",
    companyName:
      document.getElementById("plantationCompany")?.value ||
      document.getElementById("salesCompany")?.value ||
      document.getElementById("otherCompany")?.value ||
      "",
    comments: document.getElementById("comments").value
  });

  fetch(baseUrl + "?" + params.toString())
    .then(res => res.text())
    .then(() => {

      // ===============================
      // Clear form fields
      // ===============================
      [
        "fullName",
        "address",
        "mobile",
        "email",
        "category",
        "plantationCompany",
        "salesCompany",
        "otherCompany",
        "comments"
      ].forEach(id => {
        const el = document.getElementById(id);
        if(el) el.value = "";
      });

      if(document.getElementById("otherType")){
        document.getElementById("otherType").value = "Own Company";
      }

      toggleSections();

      // ===============================
      // Success message
      // ===============================
      const successDiv = document.getElementById("successMsg");
      successDiv.innerHTML =
        "Your application has been submitted successfully ✅";
      successDiv.style.display = "block";

      // ===============================
      // WhatsApp + call note
      // ===============================
      const contactDiv = document.getElementById("contactMsg");
      contactDiv.innerHTML = `
        Click the WhatsApp icon to contact our team
        <a href="https://wa.me/9478940050" target="_blank" style="margin-left:6px">
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
               style="height:20px;vertical-align:middle;">
        </a>
        <br>
        One of our team members will contact you shortly. Thank you!
      `;
      contactDiv.style.display = "block";

    })
    .catch(err => {
      console.error(err);
      alert("Submission Failed ❌");
    });
}



