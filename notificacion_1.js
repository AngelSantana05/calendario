// Verificar si el navegador soporta Service Workers
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then((registration) => {
            console.log('Service Worker registrado con éxito:', registration);
        })
        .catch((error) => {
            console.error('Error al registrar el Service Worker:', error);
        });
}

// Solicitar permiso para notificaciones
function pedirPermisoNotificaciones() {
    if ("Notification" in window) {
        Notification.requestPermission().then(function(permission) {
            if (permission === "granted") {
                console.log("Permiso concedido para notificaciones.");
            } else {
                console.log("Permiso denegado para notificaciones.");
            }
        });
    } else {
        console.log("Las notificaciones no están soportadas en este navegador.");
    }
}

// Función para convertir la fecha en objeto Date
function convertirAFecha(fechaHora) {
    const fecha = new Date(fechaHora);
    return fecha;
}

// Función para agendar un recordatorio y enviar notificación push
function agregarRecordatorioConNotificacion(eventName, fechaHoraRecordatorio) {
    const ahora = new Date();
    const fechaObjetivo = convertirAFecha(fechaHoraRecordatorio);
    const dosMinutosAntes = 2 * 60 * 1000; // 2 minutos en milisegundos
    const tiempoRestante = fechaObjetivo - ahora - dosMinutosAntes;
    
    if (tiempoRestante > 0) {
        setTimeout(function() {
            // Enviar notificación push cuando se cumpla el tiempo
            mostrarNotificacion(eventName);
        }, tiempoRestante);
        document.getElementById("mensaje").textContent = "Evento agregado exitosamente.";
    } else {
        document.getElementById("mensaje").textContent = "La fecha del evento ya pasó o es muy cercana.";
    }
}

// Función para mostrar la notificación
function mostrarNotificacion(eventName) {
    if (Notification.permission === "granted") {
        const opciones = {
            body: "Es momento de prepararse para: " + eventName,
            icon: "https://example.com/icon.png" // Puedes usar una URL a un icono
        };
        new Notification("Evento (2 minutos antes)", opciones);
    } else {
        console.log("No se ha dado permiso para notificaciones.");
    }
}

// Programar la notificación basada en la fecha del evento
document.getElementById('eventForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const eventName = document.getElementById('eventName').value;
    const eventDate = document.getElementById('eventDate').value;

    // Solicitar permiso al usuario antes de agregar el evento
    if (Notification.permission === "default" || Notification.permission === "denied") {
        pedirPermisoNotificaciones();
    }

    // Si el permiso es concedido, agregar el evento
    if (Notification.permission === "granted") {
        agregarRecordatorioConNotificacion(eventName, eventDate);
    }
});
