const btnDiscover = document.querySelector("#btn-discover");
const positionProjectsSection = document.querySelector("#featured-projects").getBoundingClientRect();

console.log();

btnDiscover.addEventListener("click", function () {
    window.scrollTo({
        top: positionProjectsSection.y,
        left: 0,
        behavior: "smooth"
    });
});