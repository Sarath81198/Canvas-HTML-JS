
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Default state store
ctx.save()

var canvasOffset = $("#canvas").offset();
var offsetX = canvasOffset.left;
var offsetY = canvasOffset.top;

var isDrawing = false;
var startX;
var startY;
var rectangleId = 1;
var rectangle = []
var rectangles = []

var restoreCheck = false

function loadImage() {

    var img = new Image()

    img.onload = function () {
        ctx.drawImage(img, 0, 0)
    }

    img.src = "canvasBoard.jpg"

}

function mousePress(e) {
    mouseX = parseInt(e.clientX - offsetX)
    mouseY = parseInt(e.clientY - offsetY)

    startX = mouseX
    startY = mouseY
    canvas.style.cursor = "crosshair"
}

function enableStore() {
    ctx.save()
}

function enableRestore() {
    restoreCheck = true
    ctx.restore()
}

function mouseRelease(e) {
    mouseX = parseInt(e.clientX - offsetX)
    mouseY = parseInt(e.clientY - offsetY)


    if (!restoreCheck) {
        ctx.fillStyle = "yellow"
    }

    ctx.fillRect(startX, startY, mouseX - startX, mouseY - startY)
    canvas.style.cursor = "default"

    // Add rectangle
    addRectangleToArray(rectangleId, startX, startY, mouseX - startX, mouseY - startY)
    ctx.save()

    // Increment rectangleId
    rectangleId++
}

function addRectangleToArray(id, startX, startY, width, height) {
    var rectParams = [startX, startY, width, height]
    rectangles.push(rectParams)

    document.getElementById("rectanglesDisplay").innerHTML += "<p id ='" + id + "'>Rectangle " + id + " <button id='deleteBtn" + id + "' onclick='deleteRectangle(" + id + ")'>Delete</button></p><br>"
}

function deleteRectangle(rectangleId) {
    startX = rectangles[rectangleId - 1][0]
    startY = rectangles[rectangleId - 1][1]
    width = rectangles[rectangleId - 1][2]
    height = rectangles[rectangleId - 1][3]

    ctx.clearRect(startX, startY, width, height);

    btnType = "deleteBtn"
    btnId = rectangleId

    deleteBtnId = btnType.concat(btnId)

    document.getElementById(deleteBtnId).innerHTML = "Deleted"
    document.getElementById(deleteBtnId).disabled = true


    rectangles[rectangleId - 1].pop()
    rectangles[rectangleId - 1].pop()
    rectangles[rectangleId - 1].pop()
    rectangles[rectangleId - 1].pop()
}

// MouseEventListeners
$("#canvas").mousedown(function (e) {
    mousePress(e)
});


$("#canvas").mouseup(function (e) {
    mouseRelease(e)
})

