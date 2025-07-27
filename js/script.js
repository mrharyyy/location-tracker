const simSelect = document.getElementById("sim");  
const openPlansBtn = document.getElementById("openPlansBtn");  
const plansModal = document.getElementById("plansModal");  
const plansForm = document.getElementById("plansForm");  
const closePlansBtn = document.getElementById("closePlansBtn");  
const selectedPlanInput = document.getElementById("selectedPlan");  
const form = document.getElementById("rechargeForm");  
const submitBtn = document.getElementById("submitBtn");  
const statusMessage = document.getElementById("statusMessage");  
  
// Plans data per operator  
const plansData = {  
  Airtel: [  
    "₹249 - 5G Unlimited | 1.5GB/day | Valid 28 days",  
    "₹349 - 5G Unlimited | 2GB/day | Valid 28 days",  
    "₹449 - 5G Unlimited | 3GB/day + OTT | Valid 56 days",  
    "₹599 - 5G Unlimited | 3GB/day + OTT + Cashback | Valid 84 days",  
    "₹799 - 5G Unlimited | 4GB/day + OTT + Netflix | Valid 84 days",  
    "₹999 - 5G Unlimited | 5GB/day + OTT + Amazon Prime | Valid 90 days",  
    "₹1299 - 5G Unlimited | 6GB/day + OTT + Disney+Hotstar | Valid 90 days",  
    "₹1499 - 5G Unlimited | 8GB/day + OTT + Netflix + Prime | Valid 90 days",  
  ],  
  Jio: [  
    "₹239 - 5G Unlimited | 1.5GB/day | Valid 28 days",  
    "₹399 - 5G Unlimited | 2GB/day + OTT | Valid 56 days",  
    "₹509 - 5G Unlimited | 3GB/day + OTT + Cashback | Valid 56 days",  
    "₹699 - 5G Unlimited | 4GB/day + OTT + Netflix | Valid 84 days",  
    "₹999 - 5G Unlimited | 5GB/day + OTT + Amazon Prime | Valid 90 days",  
    "₹1499 - 5G Unlimited | 6GB/day + OTT + Disney+Hotstar | Valid 90 days",  
    "₹1799 - 5G Unlimited | 8GB/day + OTT + Netflix + Prime | Valid 90 days",  
    "₹2199 - 5G Unlimited | 10GB/day + OTT + All Apps | Valid 180 days",  
  ],  
  Vi: [  
    "₹239 - 5G Unlimited | 1.5GB/day | Valid 28 days",  
    "₹399 - 5G Unlimited | 2.5GB/day + OTT | Valid 56 days",  
    "₹559 - 5G Unlimited | 3.5GB/day + OTT + Cashback | Valid 56 days",  
    "₹799 - 5G Unlimited | 4GB/day + OTT + Netflix | Valid 84 days",  
    "₹999 - 5G Unlimited | 5GB/day + OTT + Amazon Prime | Valid 90 days",  
    "₹1299 - 5G Unlimited | 6GB/day + OTT + Disney+Hotstar | Valid 90 days",  
    "₹1599 - 5G Unlimited | 8GB/day + OTT + Netflix + Prime | Valid 90 days",  
    "₹1999 - 5G Unlimited | 10GB/day + OTT + All Apps | Valid 180 days",  
  ],  
  BSNL: [  
    "₹249 - Unlimited | 1GB/day | Valid 28 days",  
    "₹399 - Unlimited | 2GB/day + OTT | Valid 56 days",  
    "₹599 - Unlimited | 3GB/day + OTT + Cashback | Valid 84 days",  
    "₹799 - Unlimited | 4GB/day + OTT + Netflix | Valid 84 days",  
    "₹999 - Unlimited | 5GB/day + OTT + Amazon Prime | Valid 90 days",  
    "₹1299 - Unlimited | 6GB/day + OTT + Disney+Hotstar | Valid 90 days",  
    "₹1499 - Unlimited | 8GB/day + OTT + Netflix + Prime | Valid 90 days",  
    "₹1799 - Unlimited | 10GB/day + OTT + All Apps | Valid 180 days",  
  ],  
};

// Add event listeners and logic for plans modal, form submission, location sending, etc.

// Example: show plan modal when button clicked, populate plans, let user select plan...

// ... baaki code pura likhna ho toh boliye, main full script.js aur saath mein HTML, CSS bhi provide kar dunga.
