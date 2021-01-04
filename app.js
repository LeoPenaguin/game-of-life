
let width = 100
let height = 50
let matrix = []
let generationCount = 0
let isRunning = false


let playButton = document.getElementById("play")
let genCounter = document.getElementById("genCount")
let resetButton = document.getElementById("reset")

// presets
let presets = document.getElementsByClassName("preset")

document.addEventListener("DOMContentLoaded", generateInitalGridView);
playButton.addEventListener("click", stopStartOnClick);
resetButton.addEventListener("click", reset);

for (let preset of presets) {
    preset.addEventListener("click", setPreset);
};

function stopStartOnClick(el) {
    isRunning = !isRunning

    if (isRunning) {
        playButton.className += ' running'
    } else {
        playButton.classList.remove('running');
    }
}

function reset() {
    generationCount = 0
    isRunning = false
    genCounter.innerHTML = generationCount;
    playButton.classList.remove('running');
    generateInitalGridView()
}

// ===============================================================================
// ONLOAD

// Generate initila grid view
function generateInitalGridView () {

    createMatrix()

    container.style.gridTemplateColumns = "repeat(" + width + ", 1fr)";
    container.style.gridTemplateRow = "repeat(" + height + ", 1fr)";
    container.innerHTML = null;

    for(var i = 0; i < matrix.length; i++) {
        var line = matrix[i];
        for(var j = 0; j < line.length; j++) {
            let square = document.createElement('div')

            square.dataset.row = i
            square.dataset.col = j
            square.dataset.living = false
        
            square.className += 'square'

            square.addEventListener("click", clickedSquare);
            container.appendChild(square)
        }
    }
}

// Create a matrix
function createMatrix()
{
    matrix = new Array(height);

    for (var i = 0; i < matrix.length; i++) {
        matrix[i] = new Array(width);
    }
    
    for(var i = 0; i < matrix.length; i++) {
        var line = matrix[i];
        for(var j = 0; j < line.length; j++) {
            matrix[i][j] = {'living': false}
        }
    }
}

const interval = setInterval(function() {
    let livingCells = []

    if (isRunning) {
        generationCount += 1
        genCounter.innerHTML = generationCount;

        calculateGeneration()
    }
}, 100);

// ===============================================================================
// ON CELL CLICKED

// Handle grid cell clicked
function clickedSquare(el)
{
    const square = event.target
    const col = square.dataset.col
    const row = square.dataset.row

    let living = matrix[row][col].living
    matrix[row][col].living = !living

    recalculateCellView(row, col)
}

// ===============================================================================
// CALCULTING CELLS ALIVE OR NOT

// Recalculate grid view
function recalculateCellView(i, j) {
    let square = document.querySelectorAll('[data-col="'+ j +'"][data-row="'+ i +'"]');
    let living = matrix[i][j].living

    if (living) {
        square[0].className += ' living'
        square[0].className += ' hasLived'
    } else {
        square[0].classList.remove('living');
    }
}

// Kill / Awake cells
function calculateGeneration() {
    let changingCells = []

    for(var i = 0; i < matrix.length; i++) {
        var line = matrix[i];
        for(var j = 0; j < line.length; j++) {
            
            let cell = matrix[i][j]
            let cellIsLiving = cell.living
            let livingNeighboursCount = getAliveAroundCount(i, j)
            
            if (!cellIsLiving && livingNeighboursCount == 3) {
                changingCells.push({col:i, row:j, isAlive:true})
            } else if (cellIsLiving && livingNeighboursCount <= 1) {
                changingCells.push({col:i, row:j, isAlive:false})
            } else if (cellIsLiving && livingNeighboursCount >= 4) {
                changingCells.push({col:i, row:j, isAlive:false})
            } else if (cellIsLiving && (livingNeighboursCount == 2 || livingNeighboursCount == 3)) {
                changingCells.push({col:i, row:j, isAlive:true})
            }
        }
    }

    // SET
    changingCells.forEach(changingCell => {
        matrix[changingCell.col][changingCell.row].living = changingCell.isAlive
        recalculateCellView(changingCell.col, changingCell.row)
    });
}

// Neighnour count
function getAliveAroundCount(i, j) {
    let around = []

    if (matrix[i-1] !== undefined) {
        around.push(matrix[i-1][j-1])
        around.push(matrix[i-1][j])
        around.push(matrix[i-1][j+1])
    }

    around.push(matrix[i][j-1])
    around.push(matrix[i][j+1])

    if (matrix[i+1] !== undefined) {
        around.push(matrix[i+1][j-1])
        around.push(matrix[i+1][j])
        around.push(matrix[i+1][j+1])
    }

    let aliveNeighboursCount = 0

    around.forEach(element => {
        if (element && element.living === true) {
            aliveNeighboursCount++
        }
    })

    return aliveNeighboursCount
}

// ===============================================================================
// PRESETS

function setPreset(presetButton) {

    reset()

    let el = presetButton.target.closest(".preset")
    let preset = el.dataset.preset

    let fromTop = Math.floor(height/4)
    let fromLeft = Math.floor(width/4)


    if (preset == 1) {

        let positions = []

        positions.push({col:fromTop, row:fromLeft})
        positions.push({col:fromTop, row:fromLeft+1})
        positions.push({col:fromTop, row:fromLeft+2})
        positions.push({col:fromTop+1, row:fromLeft+2})
        positions.push({col:fromTop+2, row:fromLeft+1})

        positions.push({col:fromTop, row:fromLeft+5})
        positions.push({col:fromTop, row:fromLeft+1+5})
        positions.push({col:fromTop, row:fromLeft+2+5})
        positions.push({col:fromTop+1, row:fromLeft+2+5})
        positions.push({col:fromTop+2, row:fromLeft+1+5})

        positions.push({col:fromTop+5, row:fromLeft})
        positions.push({col:fromTop+5, row:fromLeft+1})
        positions.push({col:fromTop+5, row:fromLeft+2})
        positions.push({col:fromTop+1+5, row:fromLeft+2})
        positions.push({col:fromTop+2+5, row:fromLeft+1})

        positions.push({col:fromTop+5, row:fromLeft+5})
        positions.push({col:fromTop+5, row:fromLeft+1+5})
        positions.push({col:fromTop+5, row:fromLeft+2+5})
        positions.push({col:fromTop+1+5, row:fromLeft+2+5})
        positions.push({col:fromTop+2+5, row:fromLeft+1+5})

        positions.push({col:fromTop, row:fromLeft-5})
        positions.push({col:fromTop, row:fromLeft-1-5})
        positions.push({col:fromTop, row:fromLeft-2-5})
        positions.push({col:fromTop-1, row:fromLeft-2-5})
        positions.push({col:fromTop-2, row:fromLeft-1-5})

        positions.push({col:fromTop, row:fromLeft-5-5})
        positions.push({col:fromTop, row:fromLeft-1-5-5})
        positions.push({col:fromTop, row:fromLeft-2-5-5})
        positions.push({col:fromTop-1, row:fromLeft-2-5-5})
        positions.push({col:fromTop-2, row:fromLeft-1-5-5})

        positions.push({col:fromTop+5, row:fromLeft-5})
        positions.push({col:fromTop+5, row:fromLeft-1-5})
        positions.push({col:fromTop+5, row:fromLeft-2-5})
        positions.push({col:fromTop-1+5, row:fromLeft-2-5})
        positions.push({col:fromTop-2+5, row:fromLeft-1-5})

        positions.push({col:fromTop+5, row:fromLeft-5-5})
        positions.push({col:fromTop+5, row:fromLeft-1-5-5})
        positions.push({col:fromTop+5, row:fromLeft-2-5-5})
        positions.push({col:fromTop-1+5, row:fromLeft-2-5-5})
        positions.push({col:fromTop-2+5, row:fromLeft-1-5-5})

        positions.forEach(pos => {
            cell = matrix[pos.col][pos.row]
            cell.living = true
            recalculateCellView(pos.col, pos.row)
        })
    }

    if (preset == 2) {

        let positions = []

        positions.push({col:fromTop, row:fromLeft})
        positions.push({col:fromTop, row:fromLeft+1})
        positions.push({col:fromTop+1, row:fromLeft+1})
        positions.push({col:fromTop+1, row:fromLeft})

        positions.push({col:fromTop, row:fromLeft+10})
        positions.push({col:fromTop+1, row:fromLeft+10})
        positions.push({col:fromTop+2, row:fromLeft+10})

        positions.push({col:fromTop-1, row:fromLeft+11})
        positions.push({col:fromTop+3, row:fromLeft+11})

        positions.push({col:fromTop-2, row:fromLeft+12})
        positions.push({col:fromTop+4, row:fromLeft+12})
        positions.push({col:fromTop-2, row:fromLeft+13})
        positions.push({col:fromTop+4, row:fromLeft+13})

        positions.push({col:fromTop+1, row:fromLeft+14})

        positions.push({col:fromTop-1, row:fromLeft+15})
        positions.push({col:fromTop+3, row:fromLeft+15})

        positions.push({col:fromTop, row:fromLeft+16})
        positions.push({col:fromTop+1, row:fromLeft+16})
        positions.push({col:fromTop+2, row:fromLeft+16})

        positions.push({col:fromTop+1, row:fromLeft+17})

        positions.push({col:fromTop-2, row:fromLeft+20})
        positions.push({col:fromTop-1, row:fromLeft+20})
        positions.push({col:fromTop, row:fromLeft+20})

        positions.push({col:fromTop-2, row:fromLeft+21})
        positions.push({col:fromTop-1, row:fromLeft+21})
        positions.push({col:fromTop, row:fromLeft+21})

        positions.push({col:fromTop-3, row:fromLeft+22})
        positions.push({col:fromTop+1, row:fromLeft+22})

        positions.push({col:fromTop-4, row:fromLeft+24})
        positions.push({col:fromTop-3, row:fromLeft+24})
        positions.push({col:fromTop+1, row:fromLeft+24})
        positions.push({col:fromTop+2, row:fromLeft+24})

        positions.push({col:fromTop-2, row:fromLeft+34})
        positions.push({col:fromTop-2, row:fromLeft+35})
        positions.push({col:fromTop-1, row:fromLeft+34})
        positions.push({col:fromTop-1, row:fromLeft+35})

        positions.forEach(pos => {
            cell = matrix[pos.col][pos.row]
            cell.living = true
            recalculateCellView(pos.col, pos.row)
        })
    }

    if (preset == 3) {

        let positions = []

        positions.push({col:fromTop-1, row:fromLeft})
        positions.push({col:fromTop+1, row:fromLeft})

        positions.push({col:fromTop, row:fromLeft+2})

        positions.push({col:fromTop-1, row:fromLeft+3})
        positions.push({col:fromTop+1, row:fromLeft+3})

        positions.push({col:fromTop-2, row:fromLeft+4})
        positions.push({col:fromTop, row:fromLeft+4})
        positions.push({col:fromTop+2, row:fromLeft+4})

        positions.push({col:fromTop-2, row:fromLeft+5})
        positions.push({col:fromTop-1, row:fromLeft+5})
        positions.push({col:fromTop+1, row:fromLeft+5})

        positions.push({col:fromTop-2, row:fromLeft+6})
        positions.push({col:fromTop-1, row:fromLeft+6})
        positions.push({col:fromTop+1, row:fromLeft+6})

        positions.push({col:fromTop-2, row:fromLeft+7})
        positions.push({col:fromTop, row:fromLeft+7})
        positions.push({col:fromTop+2, row:fromLeft+7})

        positions.push({col:fromTop-1, row:fromLeft+8})
        positions.push({col:fromTop+1, row:fromLeft+8})

        positions.push({col:fromTop, row:fromLeft+9})

        positions.push({col:fromTop-1, row:fromLeft+11})
        positions.push({col:fromTop+1, row:fromLeft+11})

        positions.forEach(pos => {
            cell = matrix[pos.col][pos.row]
            cell.living = true
            recalculateCellView(pos.col, pos.row)
        })
    }

    if (preset == 4) {
        for(var i = 0; i < matrix.length; i++) {
            var line = matrix[i];
            for(var j = 0; j < line.length; j++) {
                if (Math.floor(Math.random() * 9) == 1) {
                    cell = matrix[i][j]
                    cell.living = true
                    recalculateCellView(i, j)
                }
            }
        }
    }

}