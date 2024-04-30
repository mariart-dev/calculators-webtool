document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll(".section-left ul li a");
    const contents = document.querySelectorAll(".general-content");
    const gridContent = document.querySelector(".container-grid");

    links.forEach(function(link) {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const targetId = this.getAttribute("id").replace("-link", "-content");
            gridContent.style.display = "none";
            contents.forEach(function(content) {
                content.style.display = "none";
            });
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.style.display = "block";
            }
        });
    });
});

function showCalculatorOptions() {
    document.querySelectorAll('.general-content').forEach(content => {
        content.style.display = 'none';
    });
    document.querySelector('.container-grid').style.display = 'grid';
}