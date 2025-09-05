'use strict';

//Notificación

document.addEventListener("DOMContentLoaded", () => {
  const data = sessionStorage.getItem("notificacion");
  if (data) {
    const { mensaje, tipo } = JSON.parse(data);
    showNotification(mensaje, tipo);

    sessionStorage.removeItem("notificacion");
  }
});

function showNotification(mensaje, tipo = "success", tiempo = 7000) {
  const notificacion = document.createElement("div");
  notificacion.className = `notificacion ${tipo}`;
  notificacion.innerHTML = `
    <span>${mensaje}</span>
    <button aria-label="Cerrar">&times;</button>
  `;
  document.body.appendChild(notificacion);

  const cerrar = () => {
    if (document.body.contains(notificacion)) {
      document.body.removeChild(notificacion);
    }
  };

  notificacion.querySelector("button").addEventListener("click", cerrar);
  setTimeout(cerrar, tiempo);
}

function notificarYRedirigir(mensaje, tipo, url) {
  sessionStorage.setItem("notificacion", JSON.stringify({ mensaje, tipo }));
  window.location.href = url;
}




 // 1er cuadrante - Ventas diarias
  new Chart(document.getElementById('ventasDiaChart'), {
    type: 'bar',
    data: {
      labels: ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'],
      datasets: [{
        label: 'Ventas',
        data: [5, 8, 12, 6, 9, 15],
        backgroundColor: 'rgba(54, 162, 235, 0.6)'
      },
      {
        label: 'Recaudación ($)',
        data: [100, 200, 350, 180, 220, 400],
        backgroundColor: 'rgba(75, 192, 192, 0.6)'
      }]
    },
    options: { responsive: true, scales: { y: { beginAtZero: true } } }
  });

  // 2do cuadrante - Ventas mensuales
  new Chart(document.getElementById('ventasMesChart'), {
    type: 'line',
    data: {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
      datasets: [{
        label: 'Ventas',
        data: [120, 150, 180, 140, 200, 220],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true
      },
      {
        label: 'Recaudación ($)',
        data: [2400, 3100, 3600, 2800, 4000, 4500],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true
      }]
    },
    options: { responsive: true, scales: { y: { beginAtZero: true } } }
  });

  // 3er cuadrante - Usuarios totales
  new Chart(document.getElementById('usuariosChart'), {
    type: 'doughnut',
    data: {
      labels: ['Registrados', 'Activos', 'Con Compras'],
      datasets: [{
        data: [500, 300, 180],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: { responsive: true }
  });

  // 4to cuadrante - Órdenes y estados
  new Chart(document.getElementById('ordenesChart'), {
    type: 'pie',
    data: {
      labels: ['Pendientes', 'En Proceso', 'Completadas', 'Canceladas'],
      datasets: [{
        data: [12, 18, 45, 5],
        backgroundColor: [
          'rgba(255, 206, 86, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 99, 132, 0.6)'
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: { responsive: true }
  });
