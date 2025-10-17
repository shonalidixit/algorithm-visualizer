let chart;

function renderChart(data, label = "Array") {
  const ctx = document.getElementById('resultChart').getContext('2d');
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.map((_, i) => i + 1 + ""),
      datasets: [{
        label,
        data,
        backgroundColor: data.map(() => `hsl(${Math.random()*360}, 60%, 60%)`),
      }]
    },
    options: {
      animation: { duration: 700 },
      scales: { y: { beginAtZero: true } }
    }
  });
}
