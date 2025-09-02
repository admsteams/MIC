document.addEventListener('DOMContentLoaded', function() {
  // Check if required libraries are loaded
  if (typeof Chart === 'undefined' || typeof CountUp === 'undefined' || typeof jspdf === 'undefined') {
    console.error('Required libraries are not loaded properly');
    document.getElementById('estimated-return').textContent = '$0 (Error: Libraries not loaded)';
    return;
  }

  // Calculator elements
  const amountInput = document.getElementById('investment-amount');
  const termInput = document.getElementById('investment-term');
  const typeSelect = document.getElementById('investment-type');
  const returnOutput = document.getElementById('estimated-return');
  const amountOutput = document.getElementById('amount-value');
  const termOutput = document.getElementById('term-value');
  const downloadBtn = document.getElementById('download-report');
  const ctx = document.getElementById('return-chart');
  
  if (!ctx) {
    console.error('Canvas element not found');
    return;
  }

  let chartInstance = null;

  // Initialize CountUp
  const returnCountUp = new CountUp(returnOutput, 0, {
    duration: 1,
    prefix: '$',
    decimalPlaces: 2
  });
  
  if (!returnCountUp.error) {
    returnCountUp.start();
  } else {
    console.error('CountUp initialization error:', returnCountUp.error);
  }

  // Update slider outputs
  function updateSliderOutputs() {
    amountOutput.textContent = '$' + parseFloat(amountInput.value).toLocaleString();
    termOutput.textContent = termInput.value + ' Months';
  }

  function calculateReturn(amount, term, type) {
    let rate;
    switch(type) {
      case 'direct': rate = 0.10; break;
      case 'pooled': rate = 0.09; break;
      case 'fixed': rate = 0.08; break;
      default: rate = 0.08;
    }
    const monthlyRate = rate / 12;
    const monthlyReturn = amount * monthlyRate;
    const totalReturn = monthlyReturn * term;
    return { monthlyReturn, totalReturn };
  }

  function updateChart(amount, term, type) {
    const { monthlyReturn } = calculateReturn(amount, term, type);
    const labels = Array.from({length: term}, (_, i) => `Month ${i+1}`);
    const data = Array.from({length: term}, (_, i) => monthlyReturn * (i+1));

    if (chartInstance) {
      chartInstance.destroy();
    }

    chartInstance = new Chart(ctx.getContext('2d'), {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Estimated Return',
          data: data,
          borderColor: '#1bbd36',
          backgroundColor: 'rgba(27, 189, 54, 0.1)',
          fill: true,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Investment Growth Over Time'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return '$' + context.raw.toLocaleString(undefined, {maximumFractionDigits: 2});
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Return ($)'
            },
            ticks: {
              callback: function(value) {
                return '$' + value.toLocaleString();
              }
            }
          },
          x: {
            title: {
              display: true,
              text: 'Time (Months)'
            }
          }
        }
      }
    });
  }

  function updateValues() {
    const amount = parseFloat(amountInput.value) || 100000;
    const term = parseInt(termInput.value) || 12;
    const type = typeSelect.value;
    const { totalReturn } = calculateReturn(amount, term, type);

    updateSliderOutputs();
    
    if (!returnCountUp.error) {
      returnCountUp.update(totalReturn);
    } else {
      returnOutput.textContent = '$' + totalReturn.toLocaleString(undefined, {maximumFractionDigits: 2});
    }
    
    updateChart(amount, term, type);
  }

  function downloadReport() {
    const amount = parseFloat(amountInput.value) || 100000;
    const term = parseInt(termInput.value) || 12;
    const type = typeSelect.value;
    const { monthlyReturn, totalReturn } = calculateReturn(amount, term, type);
    
    // Get the selected text for investment type
    const typeText = typeSelect.options[typeSelect.selectedIndex].text;

    const doc = new jspdf.jsPDF();
    
    // Add logo or header
    doc.setFillColor(27, 189, 54);
    doc.rect(0, 0, 210, 30, 'F');
    doc.setFontSize(20);
    doc.setTextColor(255, 255, 255);
    doc.text('Horizon Capital MIC', 105, 20, { align: 'center' });
    
    // Add title
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text('Investment Report', 20, 40);
    
    // Add details
    doc.setFontSize(12);
    doc.text(`Investment Amount: $${amount.toLocaleString()}`, 20, 50);
    doc.text(`Investment Type: ${typeText}`, 20, 60);
    doc.text(`Term: ${term} months`, 20, 70);
    doc.text(`Estimated Monthly Return: $${monthlyReturn.toFixed(2)}`, 20, 80);
    doc.text(`Estimated Total Return: $${totalReturn.toFixed(2)}`, 20, 90);
    
    // Add footer
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Generated on: ' + new Date().toLocaleDateString(), 20, 140);
    doc.text('© Horizon Capital MIC - Confidential Report', 105, 140, { align: 'center' });
    
    // Save the PDF
    doc.save('Horizon_Capital_MIC_Report.pdf');
  }

  // Event listeners
  amountInput.addEventListener('input', updateValues);
  termInput.addEventListener('input', updateValues);
  typeSelect.addEventListener('change', updateValues);
  downloadBtn.addEventListener('click', downloadReport);

  // Initial update
  updateValues();
});