// calculator.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize chart
    const ctx = document.getElementById('returnsChart').getContext('2d');
    let returnsChart;
    
    // Set up initial values
    const investmentAmount = document.getElementById('investmentAmount');
    const amountRange = document.getElementById('amountRange');
    const investmentType = document.getElementById('investmentType');
    const initialInvestment = document.getElementById('initialInvestment');
    const returnRate = document.getElementById('returnRate');
    const totalInterest = document.getElementById('totalInterest');
    const totalValue = document.getElementById('totalValue');
    const calculateBtn = document.getElementById('calculateBtn');
    
    // Sync range slider with number input
    if (investmentAmount && amountRange) {
        investmentAmount.addEventListener('input', function() {
            amountRange.value = this.value;
            updateInitialInvestment();
        });
        
        amountRange.addEventListener('input', function() {
            investmentAmount.value = this.value;
            updateInitialInvestment();
        });
    }
    
    function updateInitialInvestment() {
        if (initialInvestment) {
            initialInvestment.textContent = formatCurrency(investmentAmount.value);
        }
    }
    
    // Calculate returns
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateReturns);
    }
    
    // Set up FAQ toggle
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const item = this.parentElement;
            const answer = item.querySelector('.faq-answer');
            
            item.classList.toggle('active');
            answer.classList.toggle('active');
        });
    });
    
    // Initial calculation
    calculateReturns();
    
    function calculateReturns() {
        const amount = parseFloat(investmentAmount.value);
        const type = investmentType.value;
        const term = parseInt(document.getElementById('investmentTerm').value);
        const compounding = document.getElementById('compounding').value;
        
        let rate = 0;
        switch(type) {
            case 'direct':
                rate = 0.10;
                break;
            case 'pooled':
                rate = 0.09;
                break;
            case 'fixed':
                rate = 0.08;
                break;
            default:
                rate = 0;
        }
        
        // Update return rate display
        if (returnRate) {
            returnRate.textContent = (rate * 100).toFixed(2) + '%';
        }
        
        // Calculate returns based on compounding frequency
        let n = 1; // compounding periods per year
        switch(compounding) {
            case 'monthly':
                n = 12;
                break;
            case 'quarterly':
                n = 4;
                break;
            case 'annually':
                n = 1;
                break;
        }
        
        const total = amount * Math.pow(1 + rate/n, n * term);
        const interest = total - amount;
        
        // Update results
        if (totalInterest) {
            totalInterest.textContent = formatCurrency(interest);
        }
        
        if (totalValue) {
            totalValue.textContent = formatCurrency(total);
        }
        
        // Update chart
        updateChart(amount, rate, term, n);
    }
    
    function updateChart(principal, rate, years, compoundsPerYear) {
        if (returnsChart) {
            returnsChart.destroy();
        }
        
        const labels = [];
        const data = [];
        
        for (let i = 0; i <= years; i++) {
            labels.push(`Year ${i}`);
            const value = principal * Math.pow(1 + rate/compoundsPerYear, compoundsPerYear * i);
            data.push(value);
        }
        
        returnsChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Investment Growth',
                    data: data,
                    borderColor: '#008080',
                    backgroundColor: 'rgba(0, 128, 128, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return formatCurrency(context.raw);
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }
    
    function formatCurrency(value) {
        return '$' + parseFloat(value).toLocaleString('en-CA', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }
});