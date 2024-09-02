document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const saveBtn = document.getElementById('saveBtn');
    const daysCompletedSpan = document.getElementById('daysCompleted');
    const daysNotCompletedSpan = document.getElementById('daysNotCompleted');
    const clock = document.getElementById('clock');

    // Obtener valores previos de días cumplidos y no cumplidos
    let daysCompleted = parseInt(localStorage.getItem('daysCompleted')) || 0;
    let daysNotCompleted = parseInt(localStorage.getItem('daysNotCompleted')) || 0;

    daysCompletedSpan.textContent = daysCompleted;
    daysNotCompletedSpan.textContent = daysNotCompleted;

    // Cargar el estado guardado de los checkboxes
    checkboxes.forEach(checkbox => {
        const savedState = localStorage.getItem(checkbox.id);
        if (savedState === 'true') {
            checkbox.checked = true;
        } else {
            checkbox.checked = false;
        }

        // Guardar el estado del checkbox cuando se cambia
        checkbox.addEventListener('change', () => {
            localStorage.setItem(checkbox.id, checkbox.checked);
        });
    });

    // Función para actualizar el reloj
    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        clock.textContent = `${hours}:${minutes}:${seconds}`;

        // Verificar si es medianoche y actualizar días no cumplidos
        if (hours === '23' && minutes === '59' && seconds === '59') {
            checkEndOfDay();
        }
    }

    // Función para verificar si se han completado todas las tareas al final del día
    function checkEndOfDay() {
        let allTasksCompleted = true;

        checkboxes.forEach(checkbox => {
            if (!checkbox.checked) {
                allTasksCompleted = false;
            }
        });

        if (!allTasksCompleted) {
            daysNotCompleted++;
            localStorage.setItem('daysNotCompleted', daysNotCompleted);
            daysNotCompletedSpan.textContent = daysNotCompleted;
        }

        // Resetear los checkboxes para el siguiente día
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
            localStorage.setItem(checkbox.id, checkbox.checked);
        });
    }

    // Actualizar el reloj cada segundo
    setInterval(updateClock, 1000);

    saveBtn.addEventListener('click', () => {
        let allTasksCompleted = true;

        checkboxes.forEach(checkbox => {
            if (!checkbox.checked) {
                allTasksCompleted = false;
            }
        });

        if (allTasksCompleted) {
            daysCompleted++;
            localStorage.setItem('daysCompleted', daysCompleted);
            daysCompletedSpan.textContent = daysCompleted;
        } else {
            daysNotCompleted++;
            localStorage.setItem('daysNotCompleted', daysNotCompleted);
            daysNotCompletedSpan.textContent = daysNotCompleted;
        }

        // Resetear los checkboxes para el siguiente día
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
            localStorage.setItem(checkbox.id, checkbox.checked);
        });
    });
});