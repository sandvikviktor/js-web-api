(function ($) {
  'use strict';
  $(function () {

    //GET TOTAL SALES CHART
    function getTotalSalesChart() {
      fetch('https://inlupp-fa.azurewebsites.net/api/total-sales-chart')
        .then(res => res.json())
        .then(data => {
          //Total Sales Revenue/Returns/Queries/Invoices
          document.getElementById('sales-chart-revenue').innerHTML = data.revenue;
          document.getElementById('sales-chart-returns').innerHTML = data.returns;
          document.getElementById('sales-chart-queries').innerHTML = data.queries;
          document.getElementById('sales-chart-invoices').innerHTML = data.invoices;

          //Total Sales Chart
          if ($("#total-sales-chart").length) {
            var areaData = {
              labels: data.labels,
              datasets: [
                {
                  data: data.datasets[0].data,
                  backgroundColor: [
                    'rgba(61, 165, 244, .0)'
                  ],
                  borderColor: [
                    'rgb(61, 165, 244)'
                  ],
                  borderWidth: 2,
                  fill: 'origin',
                  label: "services"
                },
                {
                  data: data.datasets[1].data,
                  backgroundColor: [
                    'rgba(241, 83, 110, .0)'
                  ],
                  borderColor: [
                    'rgb(241, 83, 110)'
                  ],
                  borderWidth: 2,
                  fill: 'origin',
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
                xAxes: [{
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
                    color: 'transparent',
                    zeroLineColor: '#eeeeee'
                  }
                }],
                yAxes: [{
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
                    callback: function (value) {
                      var ranges = [
                        { divider: 1e6, suffix: 'M' },
                        { divider: 1e3, suffix: 'k' }
                      ];
                      function formatNumber(n) {
                        for (var i = 0; i < ranges.length; i++) {
                          if (n >= ranges[i].divider) {
                            return (n / ranges[i].divider).toString() + ranges[i].suffix;
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
                }]
              },
              legend: {
                display: false
              },
              tooltips: {
                enabled: true
              },
              elements: {
                line: {
                  tension: .37
                },
                point: {
                  radius: 0
                }
              }
            }
            var revenueChartCanvas = $("#total-sales-chart").get(0).getContext("2d");
            var revenueChart = new Chart(revenueChartCanvas, {
              type: 'line',
              data: areaData,
              options: areaOptions
            });
          }
        })
    }
    getTotalSalesChart()


    //GET TOTAL USERS
    function getTotalUsers() {
      fetch('https://inlupp-fa.azurewebsites.net/api/total-users')
        .then(res => res.json())
        .then(data => {          
          //Total Users/Growth
          document.getElementById('total-users').innerHTML = data.users;
          document.getElementById('growth-users').innerHTML = `+${data.growth}%`;

          //Total Users Chart
          if ($("#users-chart").length) {
            var areaData = {
              // labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
              labels: data.dataset.labels,

              datasets: [{
                // data: [160, 105, 225, 140, 180, 61, 120, 60, 90],
                data: data.dataset.data,
                backgroundColor: [
                  '#e0fff4'
                ],
                borderWidth: 2,
                borderColor: "#00c689",
                fill: 'origin',
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
                xAxes: [{
                  display: false,
                  ticks: {
                    display: true
                  },
                  gridLines: {
                    display: false,
                    drawBorder: false,
                    color: 'transparent',
                    zeroLineColor: '#eeeeee'
                  }
                }],
                yAxes: [{
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
                }]
              },
              legend: {
                display: false
              },
              tooltips: {
                enabled: true
              },
              elements: {
                line: {
                  tension: .35
                },
                point: {
                  radius: 0
                }
              }
            }
            var salesChartCanvas = $("#users-chart").get(0).getContext("2d");
            var salesChart = new Chart(salesChartCanvas, {
              type: 'line',
              data: areaData,
              options: areaOptions
            });
          }



        });
    }
    getTotalUsers();

    if ($("#users-chart-dark").length) {
      var areaData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
        datasets: [{
          data: [160, 105, 225, 140, 180, 61, 120, 60, 90],
          backgroundColor: [
            'rgba(0, 198, 137, .1)'
          ],
          borderWidth: 2,
          borderColor: "#00c689",
          fill: 'origin',
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
          xAxes: [{
            display: false,
            ticks: {
              display: true
            },
            gridLines: {
              display: false,
              drawBorder: false,
              color: 'transparent',
              zeroLineColor: '#eeeeee'
            }
          }],
          yAxes: [{
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
          }]
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: true
        },
        elements: {
          line: {
            tension: .35
          },
          point: {
            radius: 0
          }
        }
      }
      var salesChartCanvas = $("#users-chart-dark").get(0).getContext("2d");
      var salesChart = new Chart(salesChartCanvas, {
        type: 'line',
        data: areaData,
        options: areaOptions
      });
    }

    //GET TOTAL PROJECTS
    function getTotalProjects() {
      fetch('https://inlupp-fa.azurewebsites.net/api/total-projects')
        .then(res => res.json())
        .then(data => {
          //Total Projects/Growth
          document.getElementById('total-projects').innerHTML = `${data.projects}%`;
          document.getElementById('growth-projects').innerHTML = `+${data.growth}%`;

          //Total Projects Chart
          if ($("#projects-chart").length) {
            var areaData = {

              labels: data.dataset.labels,

              datasets: [{
                data: data.dataset.data,
                backgroundColor: [
                  '#e5f2ff'
                ],
                borderWidth: 2,
                borderColor: "#3da5f4",
                fill: 'origin',
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
                xAxes: [{
                  display: false,
                  ticks: {
                    display: true
                  },
                  gridLines: {
                    display: false,
                    drawBorder: false,
                    color: 'transparent',
                    zeroLineColor: '#eeeeee'
                  }
                }],
                yAxes: [{
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
                }]
              },
              legend: {
                display: false
              },
              tooltips: {
                enabled: true
              },
              elements: {
                line: {
                  tension: .05
                },
                point: {
                  radius: 0
                }
              }
            }
            var salesChartCanvas = $("#projects-chart").get(0).getContext("2d");
            var salesChart = new Chart(salesChartCanvas, {
              type: 'line',
              data: areaData,
              options: areaOptions
            });
          }
        })
    }
    getTotalProjects();

    //GET DOWNLOADS
    function getDownloads() {
      fetch('https://inlupp-fa.azurewebsites.net/api/downloads')
        .then(res => res.json())
        .then(data => {
          //Offline/Online Amount
          document.getElementById('offline-amount').innerHTML = data[0].offlineAmount;
          document.getElementById('online-amount').innerHTML = data[1].onlineAmount;

          //Offline Progress Bar
          if ($('#offlineProgress').length) {
            var bar = new ProgressBar.Circle(offlineProgress, {
              color: '#000',
              // This has to be the same size as the maximum width to
              // prevent clipping
              strokeWidth: 6,
              trailWidth: 6,
              easing: 'easeInOut',
              duration: 1400,
              text: {
                autoStyleContainer: true,
                style: {
                  color: "#fff",
                  position: 'absolute',
                  left: '40%',
                  top: '50%'
                }
              },
              svgStyle: {
                width: '90%'
              },
              from: {
                color: '#f1536e',
                width: 6
              },
              to: {
                color: '#f1536e',
                width: 6
              },
              // Set default step function for all animate calls
              step: function (state, circle) {
                circle.path.setAttribute('stroke', state.color);
                circle.path.setAttribute('stroke-width', state.width);

                // circle value
                var value = data[0].circleValue;
                if (value === 0) {
                  circle.setText('');
                } else {
                  circle.setText(value);
                }

              }
            });
            bar.text.style.fontSize = '1rem';
            bar.animate(.65); // Number from 0.0 to 1.0
          };

          //Online Progress Bar
          if ($('#onlineProgress').length) {
            var bar = new ProgressBar.Circle(onlineProgress, {
              color: '#000',
              // This has to be the same size as the maximum width to
              // prevent clipping
              strokeWidth: 6,
              trailWidth: 6,
              easing: 'easeInOut',
              duration: 1400,
              text: {
                autoStyleContainer: true,
                style: {
                  color: "#fff",
                  position: 'absolute',
                  left: '40%',
                  top: '50%'
                }
              },
              svgStyle: {
                width: '90%'
              },
              from: {
                color: '#fda006',
                width: 6
              },
              to: {
                color: '#fda006',
                width: 6
              },
              // Set default step function for all animate calls
              step: function (state, circle) {
                circle.path.setAttribute('stroke', state.color);
                circle.path.setAttribute('stroke-width', state.width);
      
                var value = Math.round(circle.value() * 100);
                if (value === 0) {
                  circle.setText('');
                } else {
                  circle.setText(value);
                }
      
              }
            });
      
            bar.text.style.fontSize = '1rem';
            bar.animate(.25); // Number from 0.0 to 1.0
          }
        })
    }
    getDownloads();
    

    if ($('#offlineProgressDark').length) {
      var bar = new ProgressBar.Circle(offlineProgressDark, {
        color: '#000',
        // This has to be the same size as the maximum width to
        // prevent clipping
        strokeWidth: 6,
        trailWidth: 6,
        easing: 'easeInOut',
        duration: 1400,
        text: {
          autoStyleContainer: true,
          style: {
            color: "#131633",
            position: 'absolute',
            left: '40%',
            top: '50%'
          }
        },
        svgStyle: {
          width: '90%'
        },
        from: {
          color: '#f1536e',
          width: 6
        },
        to: {
          color: '#f1536e',
          width: 6
        },
        // Set default step function for all animate calls
        step: function (state, circle) {
          circle.path.setAttribute('stroke', state.color);
          circle.path.setAttribute('stroke-width', state.width);

          var value = Math.round(circle.value() * 100);
          if (value === 0) {
            circle.setText('');
          } else {
            circle.setText(value);
          }

        }
      });

      bar.text.style.fontSize = '1rem';
      bar.animate(.64); // Number from 0.0 to 1.0
    }

    if ($('#onlineProgressDark').length) {
      var bar = new ProgressBar.Circle(onlineProgressDark, {
        color: '#000',
        // This has to be the same size as the maximum width to
        // prevent clipping
        strokeWidth: 6,
        trailWidth: 6,
        easing: 'easeInOut',
        duration: 1400,
        text: {
          autoStyleContainer: true,
          style: {
            color: "#131633",
            position: 'absolute',
            left: '40%',
            top: '50%'
          }
        },
        svgStyle: {
          width: '90%'
        },
        from: {
          color: '#fda006',
          width: 6
        },
        to: {
          color: '#fda006',
          width: 6
        },
        // Set default step function for all animate calls
        step: function (state, circle) {
          circle.path.setAttribute('stroke', state.color);
          circle.path.setAttribute('stroke-width', state.width);

          var value = Math.round(circle.value() * 100);
          if (value === 0) {
            circle.setText('');
          } else {
            circle.setText(value);
          }

        }
      });

      bar.text.style.fontSize = '1rem';
      bar.animate(.84); // Number from 0.0 to 1.0
    }

    if ($("#projects-chart-dark").length) {
      var areaData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"],
        datasets: [{
          data: [220, 120, 140, 135, 160, 65, 160, 135, 190, 165, 120, 160, 140, 140, 130, 120, 150],
          backgroundColor: [
            'rgba(61, 165, 244, .1)'
          ],
          borderWidth: 2,
          borderColor: "#3da5f4",
          fill: 'origin',
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
          xAxes: [{
            display: false,
            ticks: {
              display: true
            },
            gridLines: {
              display: false,
              drawBorder: false,
              color: 'transparent',
              zeroLineColor: '#eeeeee'
            }
          }],
          yAxes: [{
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
          }]
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: true
        },
        elements: {
          line: {
            tension: .05
          },
          point: {
            radius: 0
          }
        }
      }
      var salesChartCanvas = $("#projects-chart-dark").get(0).getContext("2d");
      var salesChart = new Chart(salesChartCanvas, {
        type: 'line',
        data: areaData,
        options: areaOptions
      });
    }

    if ($("#orders-chart-dark").length) {
      var CurrentChartCanvas = $("#orders-chart-dark").get(0).getContext("2d");
      var CurrentChart = new Chart(CurrentChartCanvas, {
        type: 'bar',
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [{
            label: 'Profit',
            data: [40, 100, 120, 80, 140, 120, 170, 100, 200, 150, 120, 100, 55],
            backgroundColor: '#3da5f4'
          },
          {
            label: 'Profit',
            data: [90, 80, 180, 60, 100, 60, 120, 150, 100, 110, 150, 150, 100],
            backgroundColor: '#23284f'
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
              top: 30,
              bottom: -10
            }
          },
          scales: {
            yAxes: [{
              display: false,
              gridLines: {
                drawBorder: false
              },
              ticks: {
                display: false
              }
            }],
            xAxes: [{
              stacked: false,
              categoryPercentage: 3,
              barPercentage: .3,
              ticks: {
                beginAtZero: true,
                fontColor: "#9fa0a2",
                display: false
              },
              gridLines: {
                color: "rgba(0, 0, 0, 0)",
                display: true
              },
            }]
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

    if ($("#revenue-chart").length) {
      var CurrentChartCanvas = $("#revenue-chart").get(0).getContext("2d");
      var CurrentChart = new Chart(CurrentChartCanvas, {
        type: 'bar',
        data: {
          labels: ["1982", "", "1993", "", "2003", "", "2013"],
          datasets: [{
            label: 'Europe',
            data: [280000, 90000, 150000, 200000, 50000, 150000, 260000, 150000, 260000],
            backgroundColor: '#405189'
          },
          {
            label: 'Africa',
            data: [250000, 230000, 130000, 160000, 110000, 230000, 50000, 230000, 50000],
            backgroundColor: '#3da5f4'
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
            yAxes: [{
              display: true,
              gridLines: {
                drawBorder: false
              },
              ticks: {
                fontColor: "#000",
                display: true,
                fontStyle: 400,
                fontSize: 14,
                stepSize: 100000,
                callback: function (value) {
                  var ranges = [
                    { divider: 1e6, suffix: 'M' },
                    { divider: 1e3, suffix: 'k' }
                  ];
                  function formatNumber(n) {
                    for (var i = 0; i < ranges.length; i++) {
                      if (n >= ranges[i].divider) {
                        return (n / ranges[i].divider).toString() + ranges[i].suffix;
                      }
                    }
                    return n;
                  }
                  return formatNumber(value);
                }
              }
            }],
            xAxes: [{
              stacked: false,
              categoryPercentage: .5,
              barPercentage: 1,
              ticks: {
                beginAtZero: true,
                fontColor: "#000",
                display: true,
                fontSize: 14
              },
              gridLines: {
                color: "rgba(0, 0, 0, 0)",
                display: true
              },
            }]
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

    function getDistribution() {
      fetch('https://inlupp-fa.azurewebsites.net/api/distribution')
      .then(res => res.json())
      .then(data => {
        if ($("#distribution-chart").length) {
          var areaData = {
            labels: data.labels,
            datasets: [{
              data: data.data,
              backgroundColor: [
                "#3da5f4", "#f1536e", "#fda006"
              ],
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
            legendCallback: function (chart) {
              var text = [];
              text.push('<div class="distribution-chart">');
              text.push('<div class="item"><div class="legend-label" style="border: 3px solid ' + chart.data.datasets[0].backgroundColor[0] + '"></div>');
              // First city
              text.push(`<p>${data.cities[0]}</p>`);
              text.push('</div>');
              text.push('<div class="item"><div class="legend-label" style="border: 3px solid ' + chart.data.datasets[0].backgroundColor[1] + '"></div>');
              // Second city
              text.push(`<p>${data.cities[1]}</p>`);
              text.push('</div>');
              text.push('<div class="item"><div class="legend-label" style="border: 3px solid ' + chart.data.datasets[0].backgroundColor[2] + '"></div>');
              // Third city
              text.push(`<p>${data.cities[2]}</p>`);
              text.push('</div>');
              text.push('</div>');
              return text.join("");
            },
          }
          var distributionChartPlugins = {
            beforeDraw: function (chart) {
              var width = chart.chart.width,
                height = chart.chart.height,
                ctx = chart.chart.ctx;
    
              ctx.restore();
              var fontSize = .96;
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
          }
          var distributionChartCanvas = $("#distribution-chart").get(0).getContext("2d");
          var distributionChart = new Chart(distributionChartCanvas, {
            type: 'doughnut',
            data: areaData,
            options: areaOptions,
            plugins: distributionChartPlugins
          });
          document.getElementById('distribution-legend').innerHTML = distributionChart.generateLegend();
        }
      })
    }
    getDistribution();


    if ($("#distribution-chart-dark").length) {
      var areaData = {
        labels: ["Jan", "Feb", "Mar"],
        datasets: [{
          data: [100, 50, 50],
          backgroundColor: [
            "#00c689", "#3da5f4", "#f1536e"
          ],
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
        legendCallback: function (chart) {
          var text = [];
          text.push('<div class="distribution-chart">');
          text.push('<div class="item"><div class="legend-label" style="border: 3px solid ' + chart.data.datasets[0].backgroundColor[0] + '"></div>');
          text.push('<p>Texas</p>');
          text.push('</div>');
          text.push('<div class="item"><div class="legend-label" style="border: 3px solid ' + chart.data.datasets[0].backgroundColor[1] + '"></div>');
          text.push('<p>Utah</p>');
          text.push('</div>');
          text.push('<div class="item"><div class="legend-label" style="border: 3px solid ' + chart.data.datasets[0].backgroundColor[2] + '"></div>');
          text.push('<p>Georgia</p>');
          text.push('</div>');
          text.push('</div>');
          return text.join("");
        },
      }
      var distributionChartPlugins = {
        beforeDraw: function (chart) {
          var width = chart.chart.width,
            height = chart.chart.height,
            ctx = chart.chart.ctx;

          ctx.restore();
          var fontSize = .96;
          ctx.font = "600 " + fontSize + "em sans-serif";
          ctx.textBaseline = "middle";
          ctx.fillStyle = "#fff";

          var text = "70%",
            textX = Math.round((width - ctx.measureText(text).width) / 2),
            textY = height / 2;

          ctx.fillText(text, textX, textY);
          ctx.save();
        }
      }
      var distributionChartCanvas = $("#distribution-chart-dark").get(0).getContext("2d");
      var distributionChart = new Chart(distributionChartCanvas, {
        type: 'doughnut',
        data: areaData,
        options: areaOptions,
        plugins: distributionChartPlugins
      });
      document.getElementById('distribution-legend').innerHTML = distributionChart.generateLegend();
    }

    if ($("#distribution-chart-dark").length) {
      var areaData = {
        labels: ["Jan", "Feb", "Mar"],
        datasets: [{
          data: [100, 50, 50],
          backgroundColor: [
            "#00c689", "#3da5f4", "#f1536e"
          ],
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
        legendCallback: function (chart) {
          var text = [];
          text.push('<div class="distribution-chart">');
          text.push('<div class="item"><div class="legend-label" style="border: 3px solid ' + chart.data.datasets[0].backgroundColor[0] + '"></div>');
          text.push('<p>Texas</p>');
          text.push('</div>');
          text.push('<div class="item"><div class="legend-label" style="border: 3px solid ' + chart.data.datasets[0].backgroundColor[1] + '"></div>');
          text.push('<p>Utah</p>');
          text.push('</div>');
          text.push('<div class="item"><div class="legend-label" style="border: 3px solid ' + chart.data.datasets[0].backgroundColor[2] + '"></div>');
          text.push('<p>Georgia</p>');
          text.push('</div>');
          text.push('</div>');
          return text.join("");
        },
      }
      var distributionChartPlugins = {
        beforeDraw: function (chart) {
          var width = chart.chart.width,
            height = chart.chart.height,
            ctx = chart.chart.ctx;

          ctx.restore();
          var fontSize = .96;
          ctx.font = "600 " + fontSize + "em sans-serif";
          ctx.textBaseline = "middle";
          ctx.fillStyle = "#b1b1b5";

          var text = "70%",
            textX = Math.round((width - ctx.measureText(text).width) / 2),
            textY = height / 2;

          ctx.fillText(text, textX, textY);
          ctx.save();
        }
      }
      var distributionChartCanvas = $("#distribution-chart-dark").get(0).getContext("2d");
      var distributionChart = new Chart(distributionChartCanvas, {
        type: 'doughnut',
        data: areaData,
        options: areaOptions,
        plugins: distributionChartPlugins
      });
      document.getElementById('distribution-legend').innerHTML = distributionChart.generateLegend();
    }

    //GET SALES REPORT
    function getSalesReport() {
      fetch('https://inlupp-fa.azurewebsites.net/api/sales-report')
      .then(res => res.json())
      .then(data => {

        // Sales report overview values
        document.getElementById('sale-report-downloads').innerHTML = data.downloads;
        document.getElementById('sale-report-purchases').innerHTML = data.purchases;
        document.getElementById('sale-report-users').innerHTML = data.users;
        document.getElementById('sale-report-growth').innerHTML = data.growth;

        if ($("#sale-report-chart").length) {
          var CurrentChartCanvas = $("#sale-report-chart").get(0).getContext("2d");
          var CurrentChart = new Chart(CurrentChartCanvas, {
            type: 'bar',
            data: {
              // Months
              labels: data.labels,
              datasets: [{
                // Europe 
                label: data.datasets[0].label,
                // Sales data
                data: data.datasets[0].data,
                // Background color for each month
                backgroundColor: data.datasets[0].backgroundColor,
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
                yAxes: [{
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
                    callback: function (value) {
                      var ranges = [
                        { divider: 1e6, suffix: 'M' },
                        { divider: 1e3, suffix: 'k' }
                      ];
                      function formatNumber(n) {
                        for (var i = 0; i < ranges.length; i++) {
                          if (n >= ranges[i].divider) {
                            return (n / ranges[i].divider).toString() + ranges[i].suffix;
                          }
                        }
                        return n;
                      }
                      return "$" + formatNumber(value);
                    }
                  }
                }],
                xAxes: [{
                  stacked: false,
                  categoryPercentage: .6,
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
                  barPercentage: .7
                }]
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
      })
    }
    getSalesReport();

    if ($("#sale-report-chart-dark").length) {
      var CurrentChartCanvas = $("#sale-report-chart-dark").get(0).getContext("2d");
      var CurrentChart = new Chart(CurrentChartCanvas, {
        type: 'bar',
        data: {
          labels: ["Jan", "", "Feb", "", "Mar", "", "Apr", "", "May", "", "Jun"],
          datasets: [{
            label: 'Europe',
            data: [28000, 9000, 15000, 20000, 5000, 15000, 26000, 15000, 26000, 20000, 28000],
            backgroundColor: ["#3da5f4", "#f1536e", "#3da5f4", "#f1536e", "#3da5f4", "#f1536e", "#3da5f4", "#f1536e", "#3da5f4", "#f1536e", "#3da5f4"]
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
            yAxes: [{
              display: true,
              gridLines: {
                drawBorder: false,
                color: "rgba(255, 255, 255, .1)",
                zeroLineColor: "rgba(255, 255, 255, .1)"
              },
              ticks: {
                fontColor: "#b1b1b5",
                display: true,
                padding: 20,
                fontSize: 14,
                stepSize: 10000,
                callback: function (value) {
                  var ranges = [
                    { divider: 1e6, suffix: 'M' },
                    { divider: 1e3, suffix: 'k' }
                  ];
                  function formatNumber(n) {
                    for (var i = 0; i < ranges.length; i++) {
                      if (n >= ranges[i].divider) {
                        return (n / ranges[i].divider).toString() + ranges[i].suffix;
                      }
                    }
                    return n;
                  }
                  return "$" + formatNumber(value);
                }
              }
            }],
            xAxes: [{
              stacked: false,
              categoryPercentage: .6,
              ticks: {
                beginAtZero: true,
                fontColor: "#b1b1b5",
                display: true,
                padding: 20,
                fontSize: 14
              },
              gridLines: {
                color: "rgba(0, 0, 0, 0)",
                display: true
              },
              barPercentage: .7
            }]
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
})(jQuery);