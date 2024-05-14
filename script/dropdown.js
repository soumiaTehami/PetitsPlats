// JavaScript (script.js)
function toggleDropdown(listId, button) {
    let content = document.getElementById(listId);
    let chevron = button.querySelector('.fa-chevron-down');
    let computedStyle = window.getComputedStyle(content);

    if (computedStyle.display === "block") {
        content.style.display = "none";
        chevron.style.transform = "rotate(0deg)";
    } else {
        content.style.display = "block";
        chevron.style.transform = "rotate(180deg)";
    }
}
