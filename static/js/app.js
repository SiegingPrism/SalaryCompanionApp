// Global variables
let currentTab = 'dashboard';

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
    loadDashboardData();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Tax calculator form
    const taxForm = document.getElementById('tax-form');
    if (taxForm) {
        taxForm.addEventListener('submit', handleTaxCalculation);
    }

    // HRA checkbox
    const hraCheckbox = document.getElementById('has-hra');
    const hraSection = document.getElementById('hra-section');
    if (hraCheckbox && hraSection) {
        hraCheckbox.addEventListener('change', function() {
            hraSection.style.display = this.checked ? 'block' : 'none';
        });
    }
}

// Tab navigation
function showTab(tabName) {
    // Hide all tabs
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.add('hidden'));

    // Show selected tab
    const selectedTab = document.getElementById(tabName + '-tab');
    if (selectedTab) {
        selectedTab.classList.remove('hidden');
    }

    // Update navigation buttons
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.classList.remove('active', 'bg-blue-600', 'text-white', 'shadow-md');
        btn.classList.add('text-gray-600', 'hover:text-gray-900', 'hover:bg-gray-100');
    });

    // Activate current button
    const activeButton = document.querySelector(`button[onclick="showTab('${tabName}')"]`);
    if (activeButton) {
        activeButton.classList.remove('text-gray-600', 'hover:text-gray-900', 'hover:bg-gray-100');
        activeButton.classList.add('active', 'bg-blue-600', 'text-white', 'shadow-md');
    }

    currentTab = tabName;

    // Load tab-specific data
    if (tabName === 'dashboard') {
        loadDashboardData();
    }
}

// Load dashboard data
async function loadDashboardData() {
    try {
        const response = await fetch('/api/dashboard');
        const data = await response.json();

        // Update metrics
        updateMetrics(data);
        updateRecentPayslips(data.recent_payslips);
        updateBenefits(data.benefits);
    } catch (error) {
        console.error('Error loading dashboard data:', error);
    }
}

// Update metrics cards
function updateMetrics(data) {
    const metricsGrid = document.getElementById('metrics-grid');
    if (!metricsGrid) return;

    const metrics = [
        {
            title: 'Annual CTC',
            value: formatCurrency(data.current_salary),
            change: '+8% from last year',
            icon: 'indian-rupee',
            color: 'text-green-600'
        },
        {
            title: 'Monthly Take-Home',
            value: formatCurrency(data.monthly_take_home),
            change: 'After tax & deductions',
            icon: 'trending-up',
            color: 'text-blue-600'
        },
        {
            title: 'Tax Saved',
            value: formatCurrency(data.tax_saved),
            change: 'Under 80C & other sections',
            icon: 'piggy-bank',
            color: 'text-purple-600'
        },
        {
            title: 'Performance Bonus',
            value: formatCurrency(data.performance_bonus),
            change: 'Q4 2024 achievement',
            icon: 'award',
            color: 'text-orange-600'
        }
    ];

    metricsGrid.innerHTML = metrics.map(metric => `
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 card-hover">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-sm font-medium text-gray-600">${metric.title}</p>
                    <p class="text-2xl font-bold text-gray-900 mt-1">${metric.value}</p>
                    <p class="${metric.color} text-sm mt-1">${metric.change}</p>
                </div>
                <div class="p-3 rounded-full ${metric.color.includes('green') ? 'bg-green-100' : 'bg-blue-100'}">
                    <i data-lucide="${metric.icon}" class="h-6 w-6 ${metric.color}"></i>
                </div>
            </div>
        </div>
    `).join('');

    lucide.createIcons();
}

// Update recent payslips
function updateRecentPayslips(payslips) {
    const container = document.getElementById('recent-payslips');
    if (!container) return;

    container.innerHTML = payslips.map(pay => `
        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div>
                <p class="font-medium text-gray-900">${pay.period}</p>
                <p class="text-sm text-gray-600">Gross: ${formatCurrency(pay.gross)}</p>
                ${pay.bonus > 0 ? `<p class="text-sm text-green-600">Bonus: ${formatCurrency(pay.bonus)}</p>` : ''}
            </div>
            <div class="text-right">
                <p class="font-semibold text-green-600">${formatCurrency(pay.net)}</p>
                <p class="text-xs text-gray-500">Net Pay</p>
            </div>
        </div>
    `).join('');
}

// Update benefits
function updateBenefits(benefits) {
    const container = document.getElementById('benefits-list');
    if (!container) return;

    container.innerHTML = benefits.map(benefit => `
        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div>
                <p class="font-medium text-gray-900">${benefit.name}</p>
                <p class="text-sm text-gray-600">${formatCurrency(benefit.value)}/month</p>
            </div>
            <div class="text-right">
                <span class="px-3 py-1 text-xs font-medium rounded-full ${
                    benefit.type === 'benefit' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                }">
                    Active
                </span>
            </div>
        </div>
    `).join('');
}

// Handle tax calculation
async function handleTaxCalculation(e) {
    e.preventDefault();

    const formData = {
        grossPay: document.getElementById('gross-salary').value,
        age: document.getElementById('age').value,
        cityType: document.getElementById('city-type').value,
        taxRegime: document.getElementById('tax-regime').value,
        hasHRA: document.getElementById('has-hra').checked,
        hraAmount: document.getElementById('hra-amount').value
    };

    try {
        const response = await fetch('/api/tax-calculation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        displayTaxResults(result);
    } catch (error) {
        console.error('Error calculating tax:', error);
    }
}

// Display tax results
function displayTaxResults(result) {
    const container = document.getElementById('tax-results');
    if (!container) return;

    const getPercentage = (amount) => {
        return ((amount / result.gross_pay) * 100).toFixed(1);
    };

    container.innerHTML = `
        <div class="flex justify-between items-center p-4 bg-green-50 rounded-lg">
            <span class="font-medium text-green-900">Annual Gross Salary</span>
            <span class="font-bold text-green-900">${formatCurrency(result.gross_pay)}</span>
        </div>

        <div class="p-3 bg-blue-50 rounded-lg">
            <div class="flex justify-between items-center">
                <span class="text-sm font-medium text-blue-900">Tax Slab</span>
                <span class="text-sm text-blue-700">${result.tax_slab}</span>
            </div>
        </div>

        <div class="space-y-3">
            <div class="flex justify-between items-center">
                <div class="flex items-center space-x-2">
                    <span class="text-gray-700">Income Tax</span>
                    <span class="text-xs text-gray-500">(${getPercentage(result.income_tax)}%)</span>
                </div>
                <span class="text-red-600">-${formatCurrency(result.income_tax)}</span>
            </div>

            <div class="flex justify-between items-center">
                <div class="flex items-center space-x-2">
                    <span class="text-gray-700">Health & Education Cess</span>
                    <span class="text-xs text-gray-500">(${getPercentage(result.cess)}%)</span>
                </div>
                <span class="text-red-600">-${formatCurrency(result.cess)}</span>
            </div>

            <div class="flex justify-between items-center">
                <div class="flex items-center space-x-2">
                    <span class="text-gray-700">EPF Contribution</span>
                    <span class="text-xs text-gray-500">(${getPercentage(result.epf)}%)</span>
                </div>
                <span class="text-red-600">-${formatCurrency(result.epf)}</span>
            </div>

            <div class="flex justify-between items-center">
                <div class="flex items-center space-x-2">
                    <span class="text-gray-700">ESI Contribution</span>
                    <span class="text-xs text-gray-500">(${getPercentage(result.esi)}%)</span>
                </div>
                <span class="text-red-600">-${formatCurrency(result.esi)}</span>
            </div>

            <div class="flex justify-between items-center">
                <div class="flex items-center space-x-2">
                    <span class="text-gray-700">Professional Tax</span>
                    <span class="text-xs text-gray-500">(${getPercentage(result.professional_tax)}%)</span>
                </div>
                <span class="text-red-600">-${formatCurrency(result.professional_tax)}</span>
            </div>
        </div>

        <div class="border-t pt-4">
            <div class="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                <span class="font-bold text-green-900">Annual Take-Home</span>
                <span class="font-bold text-green-900 text-xl">${formatCurrency(result.net_pay)}</span>
            </div>
        </div>

        <div class="mt-4 p-4 bg-gray-50 rounded-lg">
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <h4 class="font-medium text-gray-900 mb-1">Monthly Take-Home</h4>
                    <p class="text-xl font-bold text-gray-900">${formatCurrency(result.net_pay / 12)}</p>
                </div>
                <div>
                    <h4 class="font-medium text-gray-900 mb-1">Effective Tax Rate</h4>
                    <p class="text-xl font-bold text-red-600">${getPercentage(result.total_deductions)}%</p>
                </div>
            </div>
        </div>
    `;
}

// Utility function to format currency
function formatCurrency(amount, currency = 'INR') {
    if (currency === 'INR') {
        if (amount >= 10000000) {
            return `₹${(amount/10000000).toFixed(1)}Cr`;
        } else if (amount >= 100000) {
            return `₹${(amount/100000).toFixed(1)}L`;
        } else {
            return `₹${amount.toLocaleString('en-IN')}`;
        }
    }
    return `$${amount.toLocaleString()}`;
}