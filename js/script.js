$(function() {
  
  // GET USERNAME
  function getFullName(firstname, lastname) {
    fetch(
      `https://inlupp-fa.azurewebsites.net/api/users?firstname=${firstname}&lastname=${lastname}`
    )
      .then(res => res.text())
      .then(data => {
        document.getElementById(
          "user-welcome"
        ).innerHTML = `Hi ${data}, Welcome back!`;
        document.getElementById("user-nav").innerHTML = data;
      });
  }
  getFullName("Viktor", "Sandvik");

  // GET MESSAGES
  function getMessages() {
    fetch("https://inlupp-fa.azurewebsites.net/api/messages")
      .then(res => res.json())
      .then(data => {
        for (const message of data) {
          messages.insertAdjacentHTML(
            "beforeend",
            `
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
            `
          );
        }
      });
  }
  getMessages();

  // GET NOTIFICATIONS
  function getNotifications() {
    fetch("https://inlupp-fa.azurewebsites.net/api/notifications")
      .then(res => res.json())
      .then(data => {
        for (const notification of data) {

          //Switch for background colors and icons
          switch (notification.title.toLowerCase()) {
            case "application error":
              color = "success";
              icon = "information";
              break;

            case "settings":
              color = "warning";
              icon = "settings";
              break;

            case "new user registration":
              color = "info";
              icon = "account";
              break;

            default:
              color = "";
              icon = "";
              break;
          }

          notifications.insertAdjacentHTML(
            "beforeend",
            `
            <a class="dropdown-item preview-item">
            <div class="preview-thumbnail">
              <div class="preview-icon bg-${color}">
                <i class="mdi mdi-${icon} mx-0"></i>
              </div>
            </div>
            <div class="preview-item-content">
              <h6 class="preview-subject font-weight-normal">${notification.title}</h6>
              <p class="font-weight-light small-text mb-0 text-muted">
              ${notification.subtitle}
              </p>
            </div>
          </a>
            `
          );
        }
      });
  }
  getNotifications();

  //GET TOTAL USERS
  function getTotalUsers() {
    fetch("https://inlupp-fa.azurewebsites.net/api/total-users")
      .then(res => res.json())
      .then(data => {
        //Total Users/Growth
        document.getElementById("total-users").innerHTML = data.users;
        document.getElementById("growth-users").innerHTML = `+${data.growth}%`;

        //Total Users Chart
        if ($("#users-chart").length) {
          var areaData = {
            // labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
            labels: data.dataset.labels,

            datasets: [
              {
                // data: [160, 105, 225, 140, 180, 61, 120, 60, 90],
                data: data.dataset.data,
                backgroundColor: ["#e0fff4"],
                borderWidth: 2,
                borderColor: "#00c689",
                fill: "origin",
                label: "purchases"
              }
            ]
          };
          var areaOptions = {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              filler: {
                propagate: false
              }
            },
            scales: {
              xAxes: [
                {
                  display: false,
                  ticks: {
                    display: true
                  },
                  gridLines: {
                    display: false,
                    drawBorder: false,
                    color: "transparent",
                    zeroLineColor: "#eeeeee"
                  }
                }
              ],
              yAxes: [
                {
                  display: false,
                  ticks: {
                    display: true,
                    autoSkip: false,
                    maxRotation: 0,
                    stepSize: 100,
                    min: 0,
                    max: 300
                  },
                  gridLines: {
                    drawBorder: false
                  }
                }
              ]
            },
            legend: {
              display: false
            },
            tooltips: {
              enabled: true
            },
            elements: {
              line: {
                tension: 0.35
              },
              point: {
                radius: 0
              }
            }
          };
          var salesChartCanvas = $("#users-chart")
            .get(0)
            .getContext("2d");
          var salesChart = new Chart(salesChartCanvas, {
            type: "line",
            data: areaData,
            options: areaOptions
          });
        }
      });
  }
  getTotalUsers();

  //GET TOTAL PROJECTS
  function getTotalProjects() {
    fetch("https://inlupp-fa.azurewebsites.net/api/total-projects")
      .then(res => res.json())
      .then(data => {
        //Total Projects/Growth
        document.getElementById(
          "total-projects"
        ).innerHTML = `${data.projects}%`;
        document.getElementById(
          "growth-projects"
        ).innerHTML = `+${data.growth}%`;

        //Total Projects Chart
        if ($("#projects-chart").length) {
          var areaData = {
            labels: data.dataset.labels,

            datasets: [
              {
                data: data.dataset.data,
                backgroundColor: ["#e5f2ff"],
                borderWidth: 2,
                borderColor: "#3da5f4",
                fill: "origin",
                label: "purchases"
              }
            ]
          };
          var areaOptions = {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              filler: {
                propagate: false
              }
            },
            scales: {
              xAxes: [
                {
                  display: false,
                  ticks: {
                    display: true
                  },
                  gridLines: {
                    display: false,
                    drawBorder: false,
                    color: "transparent",
                    zeroLineColor: "#eeeeee"
                  }
                }
              ],
              yAxes: [
                {
                  display: false,
                  ticks: {
                    display: true,
                    autoSkip: false,
                    maxRotation: 0,
                    stepSize: 100,
                    min: 0,
                    max: 300
                  },
                  gridLines: {
                    drawBorder: false
                  }
                }
              ]
            },
            legend: {
              display: false
            },
            tooltips: {
              enabled: true
            },
            elements: {
              line: {
                tension: 0.05
              },
              point: {
                radius: 0
              }
            }
          };
          var salesChartCanvas = $("#projects-chart")
            .get(0)
            .getContext("2d");
          var salesChart = new Chart(salesChartCanvas, {
            type: "line",
            data: areaData,
            options: areaOptions
          });
        }
      });
  }
  getTotalProjects();

  //GET TOTAL SALES CHART
  function getTotalSalesChart() {
    fetch("https://inlupp-fa.azurewebsites.net/api/total-sales-chart")
      .then(res => res.json())
      .then(data => {
        //Total Sales Revenue/Returns/Queries/Invoices
        document.getElementById("sales-chart-revenue").innerHTML = data.revenue;
        document.getElementById("sales-chart-returns").innerHTML = data.returns;
        document.getElementById("sales-chart-queries").innerHTML = data.queries;
        document.getElementById("sales-chart-invoices").innerHTML =
          data.invoices;

        //Total Sales Chart
        if ($("#total-sales-chart").length) {
          var areaData = {
            labels: data.labels,
            datasets: [
              {
                data: data.datasets[0].data,
                backgroundColor: ["rgba(61, 165, 244, .0)"],
                borderColor: ["rgb(61, 165, 244)"],
                borderWidth: 2,
                fill: "origin",
                label: "services"
              },
              {
                data: data.datasets[1].data,
                backgroundColor: ["rgba(241, 83, 110, .0)"],
                borderColor: ["rgb(241, 83, 110)"],
                borderWidth: 2,
                fill: "origin",
                label: "services"
              }
            ]
          };
          var areaOptions = {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              filler: {
                propagate: false
              }
            },
            scales: {
              xAxes: [
                {
                  display: true,
                  ticks: {
                    display: true,
                    padding: 20,
                    fontColor: "#000",
                    fontSize: 14
                  },
                  gridLines: {
                    display: false,
                    drawBorder: false,
                    color: "transparent",
                    zeroLineColor: "#eeeeee"
                  }
                }
              ],
              yAxes: [
                {
                  display: true,
                  ticks: {
                    display: true,
                    autoSkip: false,
                    maxRotation: 0,
                    stepSize: 100,
                    fontColor: "#000",
                    fontSize: 14,
                    padding: 18,
                    stepSize: 100000,
                    callback: function(value) {
                      var ranges = [
                        { divider: 1e6, suffix: "M" },
                        { divider: 1e3, suffix: "k" }
                      ];
                      function formatNumber(n) {
                        for (var i = 0; i < ranges.length; i++) {
                          if (n >= ranges[i].divider) {
                            return (
                              (n / ranges[i].divider).toString() +
                              ranges[i].suffix
                            );
                          }
                        }
                        return n;
                      }
                      return formatNumber(value);
                    }
                  },
                  gridLines: {
                    drawBorder: false
                  }
                }
              ]
            },
            legend: {
              display: false
            },
            tooltips: {
              enabled: true
            },
            elements: {
              line: {
                tension: 0.37
              },
              point: {
                radius: 0
              }
            }
          };
          var revenueChartCanvas = $("#total-sales-chart")
            .get(0)
            .getContext("2d");
          var revenueChart = new Chart(revenueChartCanvas, {
            type: "line",
            data: areaData,
            options: areaOptions
          });
        }
      });
  }
  getTotalSalesChart();

  //GET DOWNLOADS
  function getDownloads() {
    fetch("https://inlupp-fa.azurewebsites.net/api/downloads")
      .then(res => res.json())
      .then(data => {
        //Offline/Online Amount
        document.getElementById("offline-amount").innerHTML =
          data[0].offlineAmount;
        document.getElementById("online-amount").innerHTML =
          data[1].onlineAmount;

        //Offline Progress Bar
        if ($("#offlineProgress").length) {
          var bar = new ProgressBar.Circle(offlineProgress, {
            color: "#000",
            // This has to be the same size as the maximum width to
            // prevent clipping
            strokeWidth: 6,
            trailWidth: 6,
            easing: "easeInOut",
            duration: 1400,
            text: {
              autoStyleContainer: true,
              style: {
                color: "#fff",
                position: "absolute",
                left: "40%",
                top: "50%"
              }
            },
            svgStyle: {
              width: "90%"
            },
            from: {
              color: "#f1536e",
              width: 6
            },
            to: {
              color: "#f1536e",
              width: 6
            },
            // Set default step function for all animate calls
            step: function(state, circle) {
              circle.path.setAttribute("stroke", state.color);
              circle.path.setAttribute("stroke-width", state.width);

              // circle value
              var value = data[0].circleValue;
              if (value === 0) {
                circle.setText("");
              } else {
                circle.setText(value);
              }
            }
          });
          bar.text.style.fontSize = "1rem";
          bar.animate(0.65); // Number from 0.0 to 1.0
        }

        //Online Progress Bar
        if ($("#onlineProgress").length) {
          var bar = new ProgressBar.Circle(onlineProgress, {
            color: "#000",
            // This has to be the same size as the maximum width to
            // prevent clipping
            strokeWidth: 6,
            trailWidth: 6,
            easing: "easeInOut",
            duration: 1400,
            text: {
              autoStyleContainer: true,
              style: {
                color: "#fff",
                position: "absolute",
                left: "40%",
                top: "50%"
              }
            },
            svgStyle: {
              width: "90%"
            },
            from: {
              color: "#fda006",
              width: 6
            },
            to: {
              color: "#fda006",
              width: 6
            },
            // Set default step function for all animate calls
            step: function(state, circle) {
              circle.path.setAttribute("stroke", state.color);
              circle.path.setAttribute("stroke-width", state.width);

              var value = Math.round(circle.value() * 100);
              if (value === 0) {
                circle.setText("");
              } else {
                circle.setText(value);
              }
            }
          });
          bar.text.style.fontSize = "1rem";
          bar.animate(0.25); // Number from 0.0 to 1.0
        }
      });
  }
  getDownloads();
  

  // GET TOTALS
  function getTotals(id) {
    fetch(`https://inlupp-fa.azurewebsites.net/api/${id}`)
      .then(res => res.json())
      .then(data => {
        document.getElementById(id).innerHTML = `${data.currency}${data.amount}`;
      });
  }
  getTotals('total-sales');
  getTotals('total-purchases');
  getTotals('total-orders');
  getTotals('total-growth');


  //GET TICKETS
  function getTickets(index) {
    fetch("https://inlupp-fa.azurewebsites.net/api/tickets")
      .then(res => res.json())
      .then(data => {
        for (const ticket of data[index].tickets) {
          const nameChars = ticket.name.split(" ");
          const date = ticket.date.split(", ");

          //Colors for ticket icons
          switch (ticket.other.toLowerCase()) {
            case "view on map":
              color = "primary";
              break;
            case "start session":
              color = "info";
              break;
            case "end session":
              color = "danger";
              break;
            case "on way":
              color = "warning";
              break;
            default:
              color = "";
              break;
          }

          tickets.insertAdjacentHTML(
            "beforeend",
            `
            <tr>
                <td class="pl-0">
                <div class="icon-rounded-${color} icon-rounded-md">
                    <h4 class="font-weight-medium">${nameChars[0].charAt(
                      0
                    )}${nameChars[1].charAt(0)}</h4>
                </div>
                </td>
                <td>
                <p class="mb-0">${ticket.name}</p>
                <p class="text-muted mb-0">${ticket.city}</p>
                </td>
                <td>
                <p class="mb-0">${date[0]}</p>
                <p class="text-muted mb-0">${date[1]}</p>
                </td>
                <td>
                <p class="mb-0">${ticket.project}</p>
                <p class="text-muted mb-0">${ticket.other}</p>
                </td>
                <td class="pr-0">
                <i class="mdi mdi-dots-horizontal icon-sm cursor-pointer"></i>
                </td>
            </tr>
            `
          );
        }
      });
  }
  getTickets(1);

  //Switch for tickets years dropdown
  document.querySelectorAll("#selectYear > .dropdown-item").forEach(item => {
    item.addEventListener("click", e => {
      const btnYear = document.getElementById("btn-tickets-year");

      switch (item.id) {

        case "option17":
          getTickets(0);
          tickets.innerHTML = "";
          btnYear.innerHTML = "2017";
          break;

        case "option18":
          getTickets(1);
          tickets.innerHTML = "";
          btnYear.innerHTML = "2018";
          break;

        case "option19":
          getTickets(2);
          tickets.innerHTML = "";
          btnYear.innerHTML = "2019";
          break;

        default:
          console.log("Couldnt find year");
          break;

      }
      e.preventDefault();
    });
  });

  //GET UPDATES
  function getUpdates() {
    fetch("https://inlupp-fa.azurewebsites.net/api/updates")
      .then(res => res.json())
      .then(data => {
        for (const update of data) {
          updates.insertAdjacentHTML(
            "beforeend",
            `
            <li>
                <h6>${update.title}</h6>
                <p class="mt-2">${update.message}</p>
                <p class="text-muted mb-4">
                    <i class="mdi mdi-clock-outline"></i>
                    ${update.time}
                </p>
            </li>
            `
          );
        }
      });
  }
  getUpdates();

  //GET DISTRIBUTION
  function getDistribution() {
    fetch("https://inlupp-fa.azurewebsites.net/api/distribution")
      .then(res => res.json())
      .then(data => {
        if ($("#distribution-chart").length) {
          var areaData = {
            labels: data.labels,
            datasets: [
              {
                data: data.data,
                backgroundColor: ["#3da5f4", "#f1536e", "#fda006"],
                borderColor: "rgba(0,0,0,0)"
              }
            ]
          };
          var areaOptions = {
            responsive: true,
            maintainAspectRatio: true,
            segmentShowStroke: false,
            cutoutPercentage: 72,
            elements: {
              arc: {
                borderWidth: 4
              }
            },
            legend: {
              display: false
            },
            tooltips: {
              enabled: true
            },
            legendCallback: function(chart) {
              var text = [];
              text.push('<div class="distribution-chart">');
              text.push(
                '<div class="item"><div class="legend-label" style="border: 3px solid ' +
                  chart.data.datasets[0].backgroundColor[0] +
                  '"></div>'
              );
              // First city
              text.push(`<p>${data.cities[0]}</p>`);
              text.push("</div>");
              text.push(
                '<div class="item"><div class="legend-label" style="border: 3px solid ' +
                  chart.data.datasets[0].backgroundColor[1] +
                  '"></div>'
              );
              // Second city
              text.push(`<p>${data.cities[1]}</p>`);
              text.push("</div>");
              text.push(
                '<div class="item"><div class="legend-label" style="border: 3px solid ' +
                  chart.data.datasets[0].backgroundColor[2] +
                  '"></div>'
              );
              // Third city
              text.push(`<p>${data.cities[2]}</p>`);
              text.push("</div>");
              text.push("</div>");
              return text.join("");
            }
          };
          var distributionChartPlugins = {
            beforeDraw: function(chart) {
              var width = chart.chart.width,
                height = chart.chart.height,
                ctx = chart.chart.ctx;

              ctx.restore();
              var fontSize = 0.96;
              ctx.font = "600 " + fontSize + "em sans-serif";
              ctx.textBaseline = "middle";
              ctx.fillStyle = "#000";

              // Percentage
              var text = `${data.procentage}%`,
                textX = Math.round((width - ctx.measureText(text).width) / 2),
                textY = height / 2;

              ctx.fillText(text, textX, textY);
              ctx.save();
            }
          };
          var distributionChartCanvas = $("#distribution-chart")
            .get(0)
            .getContext("2d");
          var distributionChart = new Chart(distributionChartCanvas, {
            type: "doughnut",
            data: areaData,
            options: areaOptions,
            plugins: distributionChartPlugins
          });
          document.getElementById(
            "distribution-legend"
          ).innerHTML = distributionChart.generateLegend();
        }
      });
  }
  getDistribution();

  //GET SALES REPORT
  function getSalesReport() {
    fetch("https://inlupp-fa.azurewebsites.net/api/sales-report")
      .then(res => res.json())
      .then(data => {
        // Sales report overview values
        document.getElementById("sale-report-downloads").innerHTML =
          data.downloads;
        document.getElementById("sale-report-purchases").innerHTML =
          data.purchases;
        document.getElementById("sale-report-users").innerHTML = data.users;
        document.getElementById("sale-report-growth").innerHTML = data.growth;

        if ($("#sale-report-chart").length) {
          var CurrentChartCanvas = $("#sale-report-chart")
            .get(0)
            .getContext("2d");
          var CurrentChart = new Chart(CurrentChartCanvas, {
            type: "bar",
            data: {
              // Months
              labels: data.labels,
              datasets: [
                {
                  // Europe
                  label: data.datasets[0].label,
                  // Sales data
                  data: data.datasets[0].data,
                  // Background color for each month
                  backgroundColor: data.datasets[0].backgroundColor
                }
              ]
            },
            options: {
              responsive: true,
              maintainAspectRatio: true,
              layout: {
                padding: {
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0
                }
              },
              scales: {
                yAxes: [
                  {
                    display: true,
                    gridLines: {
                      drawBorder: false
                    },
                    ticks: {
                      fontColor: "#000",
                      display: true,
                      padding: 20,
                      fontSize: 14,
                      stepSize: 10000,
                      callback: function(value) {
                        var ranges = [
                          { divider: 1e6, suffix: "M" },
                          { divider: 1e3, suffix: "k" }
                        ];
                        function formatNumber(n) {
                          for (var i = 0; i < ranges.length; i++) {
                            if (n >= ranges[i].divider) {
                              return (
                                (n / ranges[i].divider).toString() +
                                ranges[i].suffix
                              );
                            }
                          }
                          return n;
                        }
                        return "$" + formatNumber(value);
                      }
                    }
                  }
                ],
                xAxes: [
                  {
                    stacked: false,
                    categoryPercentage: 0.6,
                    ticks: {
                      beginAtZero: true,
                      fontColor: "#000",
                      display: true,
                      padding: 20,
                      fontSize: 14
                    },
                    gridLines: {
                      color: "rgba(0, 0, 0, 0)",
                      display: true
                    },
                    barPercentage: 0.7
                  }
                ]
              },
              legend: {
                display: false
              },
              elements: {
                point: {
                  radius: 0
                }
              }
            }
          });
        }
      });
  }
  getSalesReport();

  //GET OPEN INVOICES
  function getOpenInvoices() {
    fetch("https://inlupp-fa.azurewebsites.net/api/open-invoices")
      .then(res => res.json())
      .then(data => {
        for (const invoice of data) {
          
          //Colors for status
          switch (invoice.status.toLowerCase()) {
            case "progress":
              color = "success";
              break;
            case "open":
              color = "warning";
              break;
            case "on hold":
              color = "danger";
              break;
            case "closed":
              color = "dark";
              break;
            default:
              color = "";
              break;
          }

          invoices.insertAdjacentHTML(
            "beforeend",
            `
            <tr>
                <td>${invoice.invoice}</td>
                <td>${invoice.customer}</td>
                <td>${invoice.shipping}</td>
                <td class="font-weight-bold">$${invoice.bestPrice}</td>
                <td>$${invoice.purchasedPrice}</td>
                <td><div class="badge badge-${color} badge-fw">${invoice.status}</div></td>
            </tr>
            `
          );
        }
      });
  }
  getOpenInvoices();
});
