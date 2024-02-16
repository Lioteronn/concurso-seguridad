
var rows = 3;
var columns = 3;

var currTile;
var otherTile; //blank tile

var turns = 0;

// var imgOrder = ["1.png", "2.png", "3.jpg", "4.png", "5.png", "6.png", "7.png", "8.png", "9.png"];
var imgOrder = ["4.png", "2.png", "8.png", "5.png", "1.png", "6.png", "7.png", "9.png", "3.jpg"];



window.onload = function() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = imgOrder.shift();

            // DRAG FUNCTIONALITY
            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            // EVENTO DE CARGA
            tile.onload = function() {
                console.log("Imagen cargada: " + tile.src);
            };

            document.getElementById("board").append(tile);
        }
    }
}

function dragStart() {
    currTile = this; //this refers to the img tile being dragged
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    otherTile = this; //this refers to the img tile being dropped on
}

function dragEnd() {
    if (!otherTile.src.includes("3.jpg")) {
        return;
    }

    let currCoords = currTile.id.split("-"); //ex) "0-0" -> ["0", "0"]
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = r == r2 && c2 == c-1;
    let moveRight = r == r2 && c2 == c+1;

    let moveUp = c == c2 && r2 == r-1;
    let moveDown = c == c2 && r2 == r+1;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;

        currTile.src = otherImg;
        otherTile.src = currImg;

        turns += 1;
        document.getElementById("turns").innerText = turns;
        
                // Verificar si el juego ha sido completado
                if (isPuzzleComplete()) {
                    // El juego ha sido completado, mostrar alerta
                    alert("¡Juego completado! Puerto 22");
                }
    }


}
function isPuzzleComplete() {
    // Obtenemos las imágenes ordenadas por id y extraemos los números de las rutas
    let currentOrder = Array.from(document.getElementById("board").getElementsByTagName("img"))
        .sort((a, b) => a.id.localeCompare(b.id))
        .map(img => img.src.match(/\d+/)[0]);

    // Rutas objetivo corregidas
    let targetOrder = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

    // Comparamos los números de las rutas
    if (JSON.stringify(currentOrder) === JSON.stringify(targetOrder)) {
        // Mostrar confirmación al usuario
        if (window.confirm("¡Juego completado! El puerto es 22")) {
            // El usuario ha hecho clic en "OK", redirigir a otra página
            window.location.href = "../Ahorcado/PaginaInfo/index.html";
        }
    }
}


tile.onload = function() {
    console.log("Imagen cargada: " + tile.src);
};
