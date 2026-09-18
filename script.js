/* =========================================================
   Shree Balaji Transport Services Pvt. Ltd.
   script.js
   ---------------------------------------------------------
   Handles:
   1. Mobile hamburger navigation
   2. Booking form validation
   3. WhatsApp message generation on form submit
   4. Demo Admin Panel (front-end only, no real backend)
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------------------------------------------------
     1. MOBILE NAVIGATION (hamburger menu)
     --------------------------------------------------- */
  var hamburgerBtn = document.getElementById('hamburgerBtn');
  var navLinks = document.getElementById('navLinks');

  function closeMenu() {
    navLinks.classList.remove('open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
  }

  function toggleMenu() {
    var isOpen = navLinks.classList.toggle('open');
    hamburgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }

  if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener('click', toggleMenu);

    // Close the menu whenever a nav link is tapped (mobile)
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Close the menu on Escape for keyboard users
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* ---------------------------------------------------
     2 & 3. BOOKING FORM VALIDATION + WHATSAPP MESSAGE
     --------------------------------------------------- */
  var bookingForm = document.getElementById('bookingForm');

  // Required fields: [inputId, human-readable label]
  var requiredFields = [
    ['fullName', 'Full Name'],
    ['phone', 'Phone Number'],
    ['pickup', 'Pickup Location'],
    ['destination', 'Destination']
  ];

  function setFieldInvalid(inputId, invalid) {
    var input = document.getElementById(inputId);
    if (!input) return;
    var fieldWrap = input.closest('.field');
    if (!fieldWrap) return;
    fieldWrap.classList.toggle('invalid', invalid);
  }

  function isValidPhone(value) {
    // Accepts digits, spaces, +, -, ( ) — requires at least 7 digits total
    var digitCount = (value.match(/\d/g) || []).length;
    return digitCount >= 7;
  }

  function validateBookingForm() {
    var valid = true;

    requiredFields.forEach(function (pair) {
      var input = document.getElementById(pair[0]);
      var value = input ? input.value.trim() : '';
      var fieldValid = value.length > 0;

      if (pair[0] === 'phone' && fieldValid) {
        fieldValid = isValidPhone(value);
      }

      setFieldInvalid(pair[0], !fieldValid);
      if (!fieldValid) valid = false;
    });

    return valid;
  }

  function buildWhatsAppMessage(data) {
    var lines = [
      'Hello Shree Balaji Transport Services,',
      '',
      'I want a truck booking enquiry.',
      '',
      'Name: ' + data.fullName,
      'Phone: ' + data.phone,
      'Pickup: ' + data.pickup,
      'Destination: ' + data.destination,
      'Truck Type: ' + data.truckType,
      'Required Date: ' + (data.reqDate || 'Not specified'),
      'Goods / Details: ' + (data.details || 'Not specified')
    ];
    return lines.join('\n');
  }

  function showToast(message) {
    var toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(function () {
      toast.classList.remove('show');
    }, 3200);
  }

  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var ok = validateBookingForm();
      if (!ok) {
        showToast('Please fill in all required fields.');
        return;
      }

      var data = {
        fullName: document.getElementById('fullName').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        pickup: document.getElementById('pickup').value.trim(),
        destination: document.getElementById('destination').value.trim(),
        truckType: document.getElementById('truckType').value,
        reqDate: document.getElementById('reqDate').value,
        details: document.getElementById('details').value.trim()
      };

      // Build and open the WhatsApp deep link.
      // IMPORTANT: this does NOT send data to any server — it only
      // opens WhatsApp with a pre-filled message, as required.
      var message = buildWhatsAppMessage(data);
      var whatsappUrl = 'https://wa.me/919358399156?text=' + encodeURIComponent(message);
      window.open(whatsappUrl, '_blank', 'noopener');

      // Add this enquiry to the demo admin panel preview (in-memory only).
      addDemoEnquiry(data);

      showToast('Opening WhatsApp with your enquiry…');
      bookingForm.reset();
    });

    // Clear the invalid state on a field as soon as the user fixes it
    requiredFields.forEach(function (pair) {
      var input = document.getElementById(pair[0]);
      if (input) {
        input.addEventListener('input', function () {
          setFieldInvalid(pair[0], false);
        });
      }
    });
  }

  /* ---------------------------------------------------
     4. DEMO ADMIN PANEL
     ---------------------------------------------------
     NOTE FOR THE SITE OWNER:
     - This panel is for DEMONSTRATION ONLY.
     - It has NO real login or authentication — anyone who
       opens this page can see it.
     - It does NOT use a real database. All enquiries are
       held only in this browser tab's memory.
     - Refreshing or closing the page will erase all demo
       enquiries shown here.
     - Before using this in production, replace this with a
       real backend (e.g. a server + database) and add proper
       authentication for staff access.
     --------------------------------------------------- */
  var demoEnquiries = [];

  var adminTableBody = document.getElementById('adminTableBody');
  var adminEmpty = document.getElementById('adminEmpty');
  var adminCount = document.getElementById('adminCount');
  var adminTable = document.getElementById('adminTable');

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function renderAdminPanel() {
    if (!adminTableBody) return;

    adminCount.textContent = String(demoEnquiries.length);

    if (demoEnquiries.length === 0) {
      adminTable.style.display = 'none';
      adminEmpty.style.display = 'block';
      adminTableBody.innerHTML = '';
      return;
    }

    adminTable.style.display = 'table';
    adminEmpty.style.display = 'none';

    var rowsHtml = demoEnquiries.map(function (entry) {
      var callHref = 'tel:+91' + entry.phone.replace(/\D/g, '').slice(-10);
      return (
        '<tr>' +
        '<td class="wrap">' + escapeHtml(entry.fullName) + '</td>' +
        '<td class="wrap">' + escapeHtml(entry.pickup) + '</td>' +
        '<td class="wrap">' + escapeHtml(entry.destination) + '</td>' +
        '<td>' + escapeHtml(entry.truckType) + '</td>' +
        '<td>' + escapeHtml(entry.reqDate || '—') + '</td>' +
        '<td><a class="admin-row-call" href="' + callHref + '">Call</a></td>' +
        '</tr>'
      );
    }).join('');

    adminTableBody.innerHTML = rowsHtml;
  }

  function addDemoEnquiry(data) {
    // Newest enquiry first
    demoEnquiries.unshift(data);
    renderAdminPanel();
  }

  // Initial render (empty state)
  renderAdminPanel();

});
