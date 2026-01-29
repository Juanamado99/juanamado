const fadeElements = document.querySelectorAll('.fade-block');
let isListenerCreated = false;
let hasVisible = false;

const onScroll = () => {


    
    manageScrollListener();
};

const observer = new IntersectionObserver((entries) => {
    manageScrollListener();
    entries.forEach(entry => {
        const el = entry.target;
        if(entry.isIntersecting){
            el.classList.add('visible');
            el.classList.remove('out');
        } else {
            el.classList.remove('visible');
            el.classList.add('out');
        }
    });
}, { threshold: 0.2 });

fadeElements.forEach(el => observer.observe(el));

function manageScrollListener() {
    const a = Array.from(fadeElements).map(item => item["className"]);
    hasVisible = a.some(i => i.split(" ").includes("visible"));
    if (!isListenerCreated && hasVisible) {
        isListenerCreated = true;
        document.addEventListener("scroll", onScroll);
    }
    if (isListenerCreated && !hasVisible) {
        isListenerCreated = false;
        document.removeEventListener("scroll", onScroll);
    }
}