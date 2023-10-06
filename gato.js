var lienzo = document.getElementById('lienzo'); // mando a llamar a mi etiqueta canvas 
var ctx = lienzo.getContext("2d");

function app() {
    const gato = {
        estados: [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ],
        ancho: lienzo.width = '500',
        alto: lienzo.height = '500',
        colores: ["black", "aqua"], // Colores de los jugadores
        regilla: function () {
            lienzo.style.backgroundColor = "#999";

            ctx.fillStyle = "white";
            ctx.fillRect(200, 100, 3, 300);

            ctx.fillStyle = "white";
            ctx.fillRect(300, 100, 3, 300);

            ctx.fillStyle = "white";
            ctx.fillRect(100, 200, 300, 3);

            ctx.fillStyle = "white";
            ctx.fillRect(100, 300, 300, 3);
        },
        seleccionar: function (event) {
            // Definir el tamaño de celda y el desplazamiento
            var cellSize = 100;
            var offsetX = 100;
            var offsetY = 100;

            var x = event.offsetX;
            var y = event.offsetY;

            // Calcular la fila y la columna basadas en la posición del clic
            var fila = Math.floor((y - offsetY) / cellSize) + 1;
            var columna = Math.floor((x - offsetX) / cellSize) + 1;

            if (this.estados[fila - 1][columna - 1] == 0) {
                // Actualizar el estado solo si la celda está vacía
                this.estados[fila - 1][columna - 1] = turnoJugador;

                // Pintar la celda con las coordenadas ajustadas y el color del jugador actual
                ctx.fillStyle = this.colores[turnoJugador - 1];
                ctx.fillRect(columna * cellSize - cellSize + offsetX + 5, fila * cellSize - cellSize + offsetY + 5, 90, 90);

                // Cambiar al siguiente jugador
                turnoJugador = turnoJugador === 1 ? 2 : 1;
            }
        },
        reiniciarJuego: function () {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    this.estados[i][j] = 0;
                }
            }
            turnoJugador = 1;
            lienzo.style.backgroundColor = "#999";
            ctx.clearRect(0, 0, this.ancho, this.alto);
            this.regilla();
        },
        play: function () {
            this.regilla();
        }
    }

    lienzo.addEventListener('mousedown', function (event) {
        gato.seleccionar(event);
    });

    document.getElementById('reiniciar-btn').addEventListener('click', function () {
        gato.reiniciarJuego();
    });

    gato.play();
}

window.onload = function () {
    app();
}
