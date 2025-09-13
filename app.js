const appData = {
  "totalEarnings": 125000,
  "paymentAwaited": 25000,
  "paymentOverdue": 25000,
  "incomeData": [
    {"month": "Jan", "income": 3500, "growth": -10},
    {"month": "Feb", "income": 5000, "growth": 25},
    {"month": "Mar", "income": 7000, "growth": 50},
    {"month": "Apr", "income": 3000, "growth": -45},
    {"month": "May", "income": 5500, "growth": 40},
    {"month": "Jun", "income": 6000, "growth": -80}
  ],
  "invoices": [
    {"id": 1, "client": "Client Name", "amount": 125000, "due": "2024-06-15", "status": "unpaid", "hasNotification": false},
    {"id": 2, "client": "Income Trend", "amount": 125000, "due": "2024-06-15", "status": "disputed", "hasNotification": false},
    {"id": 3, "client": "Income Trend", "amount": 125000, "due": "2024-06-15", "status": "paid", "hasNotification": false},
    {"id": 4, "client": "Income Trend", "amount": 125000, "due": "2024-06-15", "status": "paid", "hasNotification": false},
    {"id": 5, "client": "Income Trend", "amount": 125000, "due": "2024-06-15", "status": "partially_paid", "hasNotification": false},
    {"id": 6, "client": "Income Trend", "amount": 125000, "due": "2024-06-15", "status": "paid", "hasNotification": false},
    {"id": 7, "client": "Income Trend", "amount": 125000, "due": "2024-06-15", "status": "overdue", "hasNotification": true},
    {"id": 8, "client": "Income Trend", "amount": 125000, "due": "2024-06-15", "status": "awaited", "hasNotification": true},
    {"id": 9, "client": "Income Trend", "amount": 125000, "due": "2024-06-15", "status": "awaited", "hasNotification": true},
    {"id": 10, "client": "Income Trend", "amount": 125000, "due": "2024-06-15", "status": "draft", "hasNotification": false},
    {"id": 11, "client": "Income Trend", "amount": 125000, "due": "2024-06-15", "status": "paid", "hasNotification": false}
  ],
  "profile": {
    "name": "Creator",
    "avatar": "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face"
  }
};
let incomeChart = null;
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  renderEarningsSummary();
  renderIncomeChart();
  renderInvoicesList();
  initializeEventListeners();
}

function renderEarningsSummary() {
  const totalEarningsEl = document.querySelector('.earnings-amount.primary');
  const paymentAwaitedEl = document.querySelector('.payment-awaited .earnings-amount');
  const paymentOverdueEl = document.querySelector('.payment-overdue .earnings-amount');
  
  if (totalEarningsEl) {
    totalEarningsEl.textContent = formatCurrency(appData.totalEarnings);
  }
  if (paymentAwaitedEl) {
    paymentAwaitedEl.textContent = formatCurrency(appData.paymentAwaited);
  }
  if (paymentOverdueEl) {
    paymentOverdueEl.textContent = formatCurrency(appData.paymentOverdue);
  }
}

function renderIncomeChart() {
  const ctx = document.getElementById('incomeChart');
  if (!ctx) return;
  if (incomeChart) {
    incomeChart.destroy();
  }

  const months = appData.incomeData.map(item => item.month);
  const incomes = appData.incomeData.map(item => item.income);
  const growthRates = appData.incomeData.map(item => item.growth);

  incomeChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: months,
      datasets: [
        {
          type: 'bar',
          label: 'Income',
          data: incomes,
          backgroundColor: '#8B5CF6',
          borderColor: '#8B5CF6',
          borderWidth: 0,
          borderRadius: 8,
          borderSkipped: false,
          yAxisID: 'y'
        },
        {
          type: 'line',
          label: 'Growth',
          data: growthRates,
          borderColor: '#DC2626',
          backgroundColor: 'transparent',
          borderWidth: 3,
          pointBackgroundColor: '#DC2626',
          pointBorderColor: '#DC2626',
          pointBorderWidth: 2,
          pointRadius: 5,
          tension: 0.4,
          yAxisID: 'y1'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            usePointStyle: true,
            padding: 20,
            font: {
              size: 12,
              weight: '500'
            }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#fff',
          bodyColor: '#fff',
          borderColor: '#8B5CF6',
          borderWidth: 1,
          cornerRadius: 8,
          displayColors: true,
          callbacks: {
            label: function(context) {
              if (context.datasetIndex === 0) {
                return `Income: ${formatCurrency(context.parsed.y)}`;
              } else {
                return `Growth: ${context.parsed.y}%`;
              }
            }
          }
        }
      },
      interaction: {
        mode: 'index',
        intersect: false
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          border: {
            display: false
          },
          ticks: {
            font: {
              size: 12,
              weight: '500'
            },
            color: '#6B7280'
          }
        },
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          beginAtZero: true,
          max: 8000,
          grid: {
            color: 'rgba(107, 114, 128, 0.1)',
            drawBorder: false
          },
          border: {
            display: false
          },
          ticks: {
            callback: function(value) {
              return '$' + (value / 1000) + 'k';
            },
            font: {
              size: 11
            },
            color: '#6B7280',
            stepSize: 2000
          }
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          min: -100,
          max: 100,
          grid: {
            drawOnChartArea: false,
            drawBorder: false
          },
          border: {
            display: false
          },
          ticks: {
            callback: function(value) {
              return value + '%';
            },
            font: {
              size: 11
            },
            color: '#6B7280',
            stepSize: 50
          }
        }
      },
      animation: {
        duration: 1000,
        easing: 'easeInOutQuart'
      }
    }
  });
}

function renderInvoicesList() {
  const invoicesListEl = document.getElementById('invoicesList');
  if (!invoicesListEl) return;

  invoicesListEl.innerHTML = '';
  
  appData.invoices.forEach(invoice => {
    const invoiceEl = createInvoiceElement(invoice);
    invoicesListEl.appendChild(invoiceEl);
  });
}

function createInvoiceElement(invoice) {
  const invoiceEl = document.createElement('div');
  invoiceEl.className = 'invoice-item';
  
  const hasUpdateButton = invoice.status === 'unpaid';
  const notificationIcon = invoice.hasNotification ? 
    `<svg class="notification-bell active" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
      <path d="m13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>` : '';

  invoiceEl.innerHTML = `
    <div class="invoice-info">
      <div class="invoice-client">${invoice.client}</div>
      <div class="invoice-details">
        <span>₹${formatNumber(invoice.amount)}</span>
        <span>Due: ${invoice.due}</span>
      </div>
    </div>
    <div class="invoice-actions">
      <div class="status-badge ${invoice.status}">${formatStatus(invoice.status)}</div>
      ${hasUpdateButton ? '<button class="update-status-btn" onclick="handleUpdateStatus(' + invoice.id + ')">Update Status <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg></button>' : ''}
      ${notificationIcon}
    </div>
  `;

  return invoiceEl;
}
function formatCurrency(amount) {
  return '$' + formatNumber(amount);
}
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function formatStatus(status) {
  return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
}
function handleUpdateStatus(invoiceId) {
  const invoice = appData.invoices.find(inv => inv.id === invoiceId);
  if (!invoice) return;
  const statusCycle = ['unpaid', 'paid', 'overdue', 'disputed'];
  const currentIndex = statusCycle.indexOf(invoice.status);
  const nextIndex = (currentIndex + 1) % statusCycle.length;
  invoice.status = statusCycle[nextIndex];
  renderInvoicesList();
  showStatusUpdateFeedback(invoice.client, invoice.status);
}
function showStatusUpdateFeedback(clientName, newStatus) {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #10B981;
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    z-index: 1000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  `;
  toast.textContent = `${clientName} status updated to ${formatStatus(newStatus)}`;
  
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.transform = 'translateX(0)';
  }, 100);
  setTimeout(() => {
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 3000);
}

function initializeEventListeners() {
  const periodButtons = document.querySelectorAll('.period-btn');
  periodButtons.forEach(btn => {
    btn.addEventListener('click', handlePeriodChange);
  });

  const backBtn = document.querySelector('.back-btn');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      console.log('Navigate back');
    });
  }
  const createInvoiceCard = document.querySelector('.create-invoice-card');
  if (createInvoiceCard) {
    createInvoiceCard.addEventListener('click', () => {
      console.log('Create new invoice');
      showCreateInvoiceFeedback();
    });
  }
  const uploadLink = document.querySelector('.upload-link');
  if (uploadLink) {
    uploadLink.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('Upload existing invoice');
      showUploadFeedback();
    });
  }
  const expandBtn = document.querySelector('.expand-btn');
  if (expandBtn) {
    expandBtn.addEventListener('click', handleExpandToggle);
  }
}
function handlePeriodChange(e) {
  document.querySelectorAll('.period-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  e.target.classList.add('active');
  updateChartData(e.target.dataset.period);
}
function updateChartData(period) {
  let newData = [];
  
  switch(period) {
    case '1month':
      newData = [
        {"month": "Week 1", "income": 2000, "growth": 15},
        {"month": "Week 2", "income": 2500, "growth": 25},
        {"month": "Week 3", "income": 1800, "growth": -10},
        {"month": "Week 4", "income": 3200, "growth": 35}
      ];
      break;
    case '3months':
      newData = appData.incomeData.slice(-3);
      break;
    case '1year':
      newData = [
        {"month": "Q1", "income": 15000, "growth": 20},
        {"month": "Q2", "income": 18000, "growth": 25},
        {"month": "Q3", "income": 22000, "growth": 30},
        {"month": "Q4", "income": 25000, "growth": 15}
      ];
      break;
    default:
      newData = appData.incomeData;
  }
  if (incomeChart) {
    incomeChart.data.labels = newData.map(item => item.month);
    incomeChart.data.datasets[0].data = newData.map(item => item.income);
    incomeChart.data.datasets[1].data = newData.map(item => item.growth);
    incomeChart.update('active');
  }
}
function handleExpandToggle() {
  const invoicesList = document.getElementById('invoicesList');
  const expandBtn = document.querySelector('.expand-btn');
  
  if (invoicesList.style.maxHeight && invoicesList.style.maxHeight !== 'none') {
    invoicesList.style.maxHeight = 'none';
    expandBtn.style.transform = 'rotate(180deg)';
  } else {
    invoicesList.style.maxHeight = '400px';
    invoicesList.style.overflowY = 'auto';
    expandBtn.style.transform = 'rotate(0deg)';
  }
}
function showCreateInvoiceFeedback() {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #8B5CF6;
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    z-index: 1000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  `;
  toast.textContent = 'Opening create invoice form...';
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.transform = 'translateX(0)';
  }, 100);
  
  setTimeout(() => {
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 2000);
}
function showUploadFeedback() {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #F59E0B;
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    z-index: 1000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  `;
  toast.textContent = 'Opening file upload dialog...';
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.transform = 'translateX(0)';
  }, 100);
  
  setTimeout(() => {
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 2000);
  }, 2000);
}
window.addEventListener('resize', function() {
  if (incomeChart) {
    incomeChart.resize();
  }
});
document.addEventListener('touchstart', function(){}, {passive: true});
let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
  const now = (new Date()).getTime();
  if (now - lastTouchEnd <= 300) {
    event.preventDefault();
  }
  lastTouchEnd = now;
}, false);
function showLoading(element) {
  element.classList.add('loading');
}

function hideLoading(element) {
  element.classList.remove('loading');
}
function simulateDataLoad() {
  const elements = document.querySelectorAll('.earnings-card, .chart-container, .invoice-item');
  elements.forEach(el => showLoading(el));
  
  setTimeout(() => {
    elements.forEach(el => hideLoading(el));
  }, 1000);
}
setTimeout(simulateDataLoad, 500);
