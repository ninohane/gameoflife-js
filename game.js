var cellCanvasArray = [];
var cellNumberArray = [];

var cellWidth = 9;
var cellHeight = 9;
var width = 900;
var height = 900;

var rows = width / cellWidth;
var cols = height / cellHeight;

var liveCellColor = "limegreen";
var deadCellColor = "#000000";

var gameCanvasContext;

$(document).ready(function() {
    var gameCanvas = $("#gameCanvas")[0];
    /*$("#gameCanvas").width(800);
    $("#gameCanvas").height(800);*/

    $("#gameCanvas").attr("width", width);
    $("#gameCanvas").attr("height", height);

    window.gameCanvasContext = gameCanvas.getContext("2d");
    //window.gameCanvasContext.translate(0.5, 0.5);

    initNumbers();
    initCells();
    fillCanvas(gameCanvasContext);
    updateGame(gameCanvasContext);

    /*for (var i = 0; i <= 10; ++i) {
        updateGame();
    }*/

    /*gameCanvasContext.beginPath();
    gameCanvasContext.rect(0, 0, 4, 2);
    gameCanvasContext.fillStyle = "red";
    gameCanvasContext.fill();*/
});

function fillCanvas() {
    for (var rowIndex = 0; rowIndex < rows; ++rowIndex) {
        for (var colIndex = 0; colIndex < cols; ++colIndex) {
            gameCanvasContext.beginPath();
            gameCanvasContext.rect(rowIndex * cellWidth, colIndex * cellHeight, cellWidth, cellHeight);
            gameCanvasContext.fillStyle = cellCanvasArray[rowIndex][colIndex]["color"];
            gameCanvasContext.fill();
        }
    }
    //console.log("xyz");
}

function updateGame() {
    singleIteration();
    for (var rowIndex = 0; rowIndex < rows; ++rowIndex) {
        for (var colIndex = 0; colIndex < cols; ++colIndex) {
            var colorStr = cellNumberArray[rowIndex][colIndex] === 0 ? deadCellColor : liveCellColor;
            cellCanvasArray[rowIndex][colIndex] = { "color": colorStr };
            gameCanvasContext.beginPath();
            gameCanvasContext.rect(rowIndex * cellWidth, colIndex * cellHeight, cellWidth, cellHeight);
            gameCanvasContext.fillStyle = cellCanvasArray[rowIndex][colIndex]["color"];
            gameCanvasContext.fill();
        }
    }

    //console.log(cellNumberArray);
    //fillCanvas(gameCanvasContext);
    setTimeout(updateGame, 1);
}

function initCells() {
    for (var rowIndex = 0; rowIndex < rows; ++rowIndex) {
        cellCanvasArray[rowIndex] = [];
        for (var colIndex = 0; colIndex < cols; ++colIndex) {
            var colorStr = cellNumberArray[rowIndex][colIndex] === 0 ? deadCellColor : liveCellColor;
            cellCanvasArray[rowIndex][colIndex] = { "color": colorStr };
        }
    }
}

function initNumbers() {
    for (var rowIndex = 0; rowIndex < rows; ++rowIndex) {
        cellNumberArray[rowIndex] = [];
        for (var colIndex = 0; colIndex < cols; ++colIndex) {
            cellNumberArray[rowIndex][colIndex] = Math.random() > 0.95 ? 1 : 0;
        }
    }
}

function singleIteration() {
    for (var rowIndex = 0; rowIndex < rows; ++rowIndex) {
        for (var colIndex = 0; colIndex < cols; ++colIndex) {
            var neigbourCount = getNeighbourCount(cellNumberArray, rowIndex, colIndex);
            //console.log("Neighbour: " + neigbourCount);
            if (cellNumberArray[rowIndex][colIndex] === 1) {
                if (neigbourCount < 2) cellNumberArray[rowIndex][colIndex] = 0;
                else if (neigbourCount > 3) cellNumberArray[rowIndex][colIndex] = 0;
            } else {
                if (neigbourCount === 3) cellNumberArray[rowIndex][colIndex] = 1;
            }
        }
    }
}

function getNeighbourCount(cells, row, col) {
    var count = 0;
    if (row === 0 && col === 0) {
        return cells[row][col + 1] +
            cells[row + 1][col] +
            cells[row + 1][col + 1];
    }
    if (row === 0 && (col >= 1 && col < cols - 1)) {
        return cells[row][col - 1] +
            cells[row][col + 1] +
            cells[row + 1][col - 1] +
            cells[row + 1][col] +
            cells[row + 1][col + 1];
    }
    if (row === 0 && col === cols - 1) {
        return cells[row][col - 1] +
            cells[row + 1][col] +
            cells[row + 1][col - 1];
    }
    if (row === rows - 1 && col === 0) {
        return cells[row][col + 1] +
            cells[row - 1][col] +
            cells[row - 1][col + 1];
    }
    if (row === rows - 1 && (col >= 1 && col < cols - 1)) {
        return cells[row][col - 1] +
            cells[row][col + 1] +
            cells[row - 1][col - 1] +
            cells[row - 1][col] +
            cells[row - 1][col + 1];
    }
    if (row === rows - 1 && col === cols - 1) {
        return cells[row][col - 1] +
            cells[row - 1][col] +
            cells[row - 1][col - 1];
    }
    if (cols === 0 && (row >= 1 && row < rows - 1)) {
        return cells[row - 1][col] +
            cells[row + 1][col] +
            cells[row][col + 1] +
            cells[row - 1][col + 1] +
            cells[row + 1][col + 1];
    }
    if (cols === cols - 1 && (row >= 1 && row < rows - 1)) {
        return cells[row - 1][col] +
            cells[row + 1][col] +
            cells[row][col - 1] +
            cells[row - 1][col - 1] +
            cells[row + 1][col - 1];
    }
    //if (row > 0 && row < rows - 1 && col > 0 && cols < cols - 1) {
    return cells[row - 1][col - 1] +
        cells[row - 1][col] +
        cells[row - 1][col + 1] +
        cells[row][col - 1] +
        cells[row][col + 1] +
        cells[row + 1][col - 1] +
        cells[row + 1][col] +
        cells[row + 1][col + 1];
    //}
    //return cells[row][col];
}