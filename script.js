// ===============================
// Submit form data to Google Sheet
// ===============================
function submitForm() {
  const spinner = document.getElementById("spinner");
  const btn = document.getElementById("submitBtn");
  const successDiv = document.getElementById("successMsg");
  const contactDiv = document.getElementById("contactMsg");

  const baseUrl =
    "https://script.google.com/macros/s/AKfycbzEGV9LtYXfOgeTvjqRN-4NmyRJApPQT2qycbNLvE0VI869iWp8z3f8anCH9YihXrlgiw/exec";

  const params = new URLSearchParams({
    fullName: document.getElementById("fullName").value,
    address: document.getElementById("address").value,
    countryCode: document.getElementById("countryCode").value,
    mobile: document.getElementById("mobile").value,
    email: document.getElementById("email").value,
    comments: document.getElementById("comments").value
  });

  successDiv.style.display = "none";
  contactDiv.style.display = "none";

  spinner.style.display = "inline-block";
  btn.disabled = true;

  fetch(baseUrl + "?" + params.toString())
    .then(res => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.text();
    })
    .then(() => {
      ["fullName", "address", "mobile", "email", "comments"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = "";
      });

      successDiv.innerHTML =
        "Your application has been submitted successfully ✅";
      successDiv.style.display = "block";

      contactDiv.innerHTML = `
        Click the WhatsApp icon to contact our team
        <a href="https://wa.me/94718940050" target="_blank" style="margin-left:6px">
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
    })
    .finally(() => {
      spinner.style.display = "none";
      btn.disabled = false;
    });
}
