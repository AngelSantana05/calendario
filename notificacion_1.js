// Pedir permiso para enviar notificaciones
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

// Función para convertir la fecha en formato dd/mm/yyyy hh:mm a objeto Date
function convertirAFecha(fechaHora) {
    const [fecha, hora] = fechaHora.split(" ");
    const [dia, mes, anio] = fecha.split("/").map(Number);
    const [horas, minutos] = hora.split(":").map(Number);
    
    return new Date(anio, mes - 1, dia, horas, minutos);
}

// Función para agendar un recordatorio y enviar notificación push
function agregarRecordatorioConNotificacion(titulo, fechaHoraRecordatorio) {
    const ahora = new Date();
    const fechaObjetivo = convertirAFecha(fechaHoraRecordatorio);
    const dosMinutosAntes = 2 * 60 * 1000; // 2 minutos en milisegundos
    const tiempoRestante = fechaObjetivo - ahora - dosMinutosAntes;
    
    if (tiempoRestante > 0) {
        setTimeout(function() {
            // Enviar notificación push cuando se cumpla el tiempo
            mostrarNotificacion(titulo);
        }, tiempoRestante);
        document.getElementById("mensaje").textContent = "Recordatorio agregado exitosamente.";
    } else {
        document.getElementById("mensaje").textContent = "La fecha del recordatorio ya pasó o es muy cercana.";
    }
}

// Función para mostrar la notificación
function mostrarNotificacion(titulo) {
    if (Notification.permission === "granted") {
        const opciones = {
            body: "Es momento de prepararse para: " + titulo,
            icon: "https://example.com/icon.png" // Puedes usar una URL a un icono
        };
        new Notification("Recordatorio (2 minutos antes)", opciones);
    } else {
        console.log("No se ha dado permiso para notificaciones.");
    }
}

// Manejar el envío del formulario y pedir permiso de notificación al agregar recordatorio
document.getElementById("recordatorioForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const titulo = document.getElementById("titulo").value;
    const fechaHora = document.getElementById("fechaHora").value;
    
    // Solicitar permiso al usuario antes de agregar el recordatorio
    if (Notification.permission === "default" || Notification.permission === "denied") {
        pedirPermisoNotificaciones();
    }

    // Si el permiso es concedido, agregar el recordatorio
    if (Notification.permission === "granted") {
        agregarRecordatorioConNotificacion(titulo, fechaHora);
    }
});
