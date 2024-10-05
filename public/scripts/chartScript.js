const canvas = document.getElementById("myChart");

const ctx = canvas.getContext("2d");

let [charValuestData, charLabelstData] = [];

canvas.width = canvas.parentNode.offsetWidth;
canvas.height = canvas.parentNode.offsetHeight;

const urls = ["http://localhost:3000/data", "http://localhost:3000/labels"];

const fetchData = async (urls) => {
  try {
    const promises = urls.map((url) => fetch(url));

    const responses = await Promise.all(promises);

    const data = await Promise.all(
      responses.map((response) => response.json())
    );

    return data;
  } catch (error) {
    throw new Error(`Failed to fetch data: ${error}`);
  }
};

// Fetch data and update the chart
fetchData(urls)
  .then(([valuesData, labelsData]) => {
    const values = valuesData.map((item) => item.value);
    const labels = labelsData.map((item) => item.value);

    // Update chart data
    myChart.data.labels = labels;
    myChart.data.datasets[0].data = values;

    // Update the chart
    myChart.update();
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

const myChart = new Chart(ctx, {
  type: "bar",
  data: {
    datasets: [
      {
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx: chartCtx, chartArea } = chart;
          if (!chartArea || !chartCtx) {
            return;
          }
          const gradient = chartCtx.createLinearGradient(
            0,
            chartArea.bottom,
            0,
            chartArea.top
          );
          gradient.addColorStop(0, "#FF9900");
          gradient.addColorStop(1, "#F9948D");
          return gradient;
        },
        borderColor: "#FF9900",
        borderWidth: 1,
      },
    ],
  },
  options: {
    indexAxis: "x",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          display: true,
          font: {
            size: 12,
          },
        },
      },
      y: {
        position: "right",
        grid: {
          display: true,
        },
        ticks: {
          stepSize: 100,
          display: true,
          autoSkip: false,
          maxTicksLimit: 12,
        },
      },
    },
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const dataIndex = elements[0].index;
        const value = myChart.data.datasets[0].data[dataIndex];
        const time = myChart.data.labels[dataIndex];
        alert(`Bar value: ${value} ${time}`); //Test Code
      }
    },
  },
});
