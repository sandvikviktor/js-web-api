// GET USERNAME
function getFullName(firstname, lastname) {
    fetch(`https://inlupp-fa.azurewebsites.net/api/users?firstname=${firstname}&lastname=${lastname}`)
        .then(res => res.text())
        .then(data => {
            document.getElementById('user-welcome').innerHTML = `Hi ${data}, Welcome back!`;
            document.getElementById('user-nav').innerHTML = data;
        });
};
getFullName('Viktor', 'Sandvik');

// GET MESSAGES
function getMessages() {
    fetch('https://inlupp-fa.azurewebsites.net/api/messages')
        .then(res => res.json())
        .then(data => {
            for (const message of data) {
                messages.insertAdjacentHTML('beforeend', `
            <a class="dropdown-item preview-item">
            <div class="preview-thumbnail">
                <img src="https://via.placeholder.com/36x36" alt="image" class="profile-pic">
            </div>
            <div class="preview-item-content flex-grow">
              <h6 class="preview-subject ellipsis font-weight-normal">${message.from}
              </h6>
              <p class="font-weight-light small-text text-muted mb-0">
                ${message.title}
              </p>
            </div>
            </a>
            `)
            };
        });
};
getMessages();

// GET NOTIFICATIONS
function getNotifications() {
    fetch('https://inlupp-fa.azurewebsites.net/api/notifications')
        .then(res => res.json())
        .then(data => {
            for (const notification of data) {
                notifications.insertAdjacentHTML('beforeend', `
            <a class="dropdown-item preview-item">
            <div class="preview-thumbnail">
              <div class="preview-icon bg-success">
                <i class="mdi mdi-information mx-0"></i>
              </div>
            </div>
            <div class="preview-item-content">
              <h6 class="preview-subject font-weight-normal">${notification.title}</h6>
              <p class="font-weight-light small-text mb-0 text-muted">
              ${notification.subtitle}
              </p>
            </div>
          </a>
            `)
            };
        });
};
getNotifications();

// GET TOTAL SALES
function getTotalSales() {
    fetch('https://inlupp-fa.azurewebsites.net/api/total-sales')
        .then(res => res.json())
        .then(data => {
            document.getElementById('total-sales').innerHTML = `${data.currency}${data.amount}`;
        });
};
getTotalSales();

// GET TOTAL PURCHASES
function getTotalPurchases() {
    fetch('https://inlupp-fa.azurewebsites.net/api/total-purchases')
        .then(res => res.json())
        .then(data => {
            document.getElementById('total-purchases').innerHTML = `${data.currency}${data.amount}`;
        });
};
getTotalPurchases();

// GET TOTAL ORDERS
function getTotalOrders() {
    fetch('https://inlupp-fa.azurewebsites.net/api/total-orders')
        .then(res => res.json())
        .then(data => {
            document.getElementById('total-orders').innerHTML = `${data.currency}${data.amount}`;
        });
};
getTotalOrders();

// GET TOTAL GROWTH
function getTotalGrowth() {
    fetch('https://inlupp-fa.azurewebsites.net/api/total-growth')
        .then(res => res.json())
        .then(data => {
            document.getElementById('total-growth').innerHTML = `${data.currency}${data.amount}`;
        });
};
getTotalGrowth();

//GET UPDATES
function getUpdates() {
    fetch('https://inlupp-fa.azurewebsites.net/api/updates')
        .then(res => res.json())
        .then(data => {
            for (const update of data) {
                updates.insertAdjacentHTML('beforeend', `
            <li>
                <h6>${update.title}</h6>
                <p class="mt-2">${update.message}</p>
                <p class="text-muted mb-4">
                    <i class="mdi mdi-clock-outline"></i>
                    ${update.time}
                </p>
            </li>
            `)
            };
        });
};
getUpdates();

//GET SALES REPORT



//GET TICKETS



//GET OPEN INVOICES
