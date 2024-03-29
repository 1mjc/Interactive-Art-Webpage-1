var canvas = document.getElementById('screenCanvas');
var ctx = canvas.getContext('2d');
var trails = []; // Array to store all trails
var currentGradientIndex = 0;
var numSquares = 1; // Initial number of squares emitted

function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

setCanvasSize();
window.addEventListener('resize', setCanvasSize);

function getGradient1(x, y) {
    var grd = ctx.createRadialGradient(x, y, 0, canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height)); // Adjust the radius to cover the whole canvas
    grd.addColorStop(0, "#f00"); // Start color
    grd.addColorStop(0.2, "#00f"); // Middle color
    grd.addColorStop(1, "#0f0"); // End color
    return grd;
}

function getGradient2(x, y) {
    var grd = ctx.createRadialGradient(x, y, 0, canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height)); // Adjust the radius to cover the whole canvas
    grd.addColorStop(0, "#ff0"); // Start color
    grd.addColorStop(0.5, "#0ff"); // Middle color
    grd.addColorStop(1, "#f0f"); // End color
    return grd;
}

function getGradient3(x, y) {
    var grd = ctx.createRadialGradient(x, y, 0, canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height)); // Adjust the radius to cover the whole canvas
    grd.addColorStop(0, "#0ff"); // Start color
    grd.addColorStop(0.5, "#f0f"); // Middle color
    grd.addColorStop(1, "#ff0"); // End color
    return grd;
}

function getRadialGradient(x, y) {
    var gradients = [getGradient1, getGradient2, getGradient3];
    var gradientFunction = gradients[currentGradientIndex];
    return gradientFunction(x, y);
}

function drawRectangles(trail) {
    for (var i = 0; i < trail.length; i++) {
        var point = trail[i];
        ctx.fillStyle = point.color;
        ctx.fillRect(point.x, point.y, 20, 20); // Draw filled rectangle
        ctx.strokeStyle = "#000"; // Set border color (black in this case)
        ctx.lineWidth = 0.04; // Set border width
        ctx.strokeRect(point.x, point.y, 20, 20); // Draw rectangle border
    }
}

function animate(trail) {
    drawRectangles(trail);

    for (var i = 0; i < trail.length; i++) {
        var point = trail[i];
        point.x += Math.random() * 20 - 10; // Adjust speed here
        point.y += Math.random() * 20 - 10; // Adjust speed here
    }

    window.requestAnimationFrame(function() {
        animate(trail);
    });
}

function startAnimation() {
    var startX = canvas.width / 2;
    var startY = canvas.height / 2;

    var gradientFunction = null;
    if (currentGradientIndex === 0) {
        gradientFunction = getGradient1;
    } else if (currentGradientIndex === 1) {
        gradientFunction = getGradient2;
    } else {
        gradientFunction = getGradient3;
    }
    var startColor = gradientFunction(startX, startY); // Get the color for the start point

    for (var i = 0; i < numSquares; i++) {
        var newTrail = [{ x: startX, y: startY, color: startColor }];
        trails.push(newTrail); // Add initial point to trails array
        animate(newTrail); // Start animation for the new trail
    }

    // Request animation frame for continuous animation
    window.requestAnimationFrame(function() {
        animate(trails);
    });
}

document.getElementById('launchBtn').addEventListener('click', function () {
    currentGradientIndex = (currentGradientIndex + 1) % 3; // Cycle through gradients
    numSquares = Math.max(1, numSquares); // Ensure numSquares is at least 1
    startAnimation();
});

// Dropdown menu
document.addEventListener('DOMContentLoaded', function() {
    var dropdownBtn = document.querySelector('.dropBtn');
    var dropdownContent = document.querySelector('.dropdown-content');

    dropdownBtn.addEventListener('click', function() {
        dropdownContent.classList.toggle('show');
    });

    // Slider to adjust numSquares
    var slider = document.createElement('input');
    slider.type = 'range';
    slider.min = '1';
    slider.max = '11';
    slider.value = numSquares;
    slider.addEventListener('input', function() {
        numSquares = parseInt(this.value);
    });
    dropdownContent.appendChild(slider);
});
