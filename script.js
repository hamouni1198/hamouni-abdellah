document.body.addEventListener("mousemove", function(e) {
    var curX = e.clientX;
    var curY = e.clientY;

    var mouseElement = document.getElementById('mouse');

    // Position actuelle du curseur
    var currentX = parseFloat(mouseElement.style.left || 0);
    var currentY = parseFloat(mouseElement.style.top || 0);

    // Déplacement progressif vers la nouvelle position
    var dx = (curX - 120) - currentX;
    var dy = (curY - 110) - currentY;

    // Smooth transition
    var speed = 0.1; // Ajuste cette valeur pour augmenter/diminuer la vitesse du mouvement
    var newX = currentX + dx * speed;
    var newY = currentY + dy * speed;

    // Appliquer la nouvelle position
    mouseElement.style.left = newX + 'px';
    mouseElement.style.top = newY + 'px';
});

var tabLinks = document.getElementsByClassName('tab-links');
var tabContents = document.getElementsByClassName('tab-contents');

function openTab(tabName) {
    for (tabLink of tabLinks) {
        tabLink.classList.remove('active-link');
    }
    for (tabContent of tabContents) {
        tabContent.classList.remove('active-tab');
    }
    event.currentTarget.classList.add('active-link');
    document.getElementById(tabName).classList.add('active-tab');
}