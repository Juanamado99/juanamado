const fadeElements = document.querySelectorAll('.fade-block');
const arrayElements = Array.from(fadeElements);
const elementsClassList = arrayElements.map(item => item["className"]);
let isListenerCreated = false;
let hasVisible = false;
let animationEnabled = false;

const observer = new IntersectionObserver((entries) => {
    manageScrollListener();
    entries.forEach(entry => {
        const el = entry.target;
        if(entry.isIntersecting){
            el.classList.add('onscreen');
            el.classList.remove('outscreen');
            if(!animationEnabled) {
                animationEnabled = true;
            }
        } else {
            el.classList.remove('onscreen');
            el.classList.add('outscreen');
        }
    });
}, { threshold: 0.2 });

fadeElements.forEach(el => observer.observe(el));

function manageScrollListener() {
    hasVisible = elementsClassList.some(i => i.split(" ").includes("onscreen"));
    if (!isListenerCreated && hasVisible) {
        isListenerCreated = true;
        document.addEventListener("scroll", onScroll);
    }
    if (isListenerCreated && !hasVisible) {
        isListenerCreated = false;
        document.removeEventListener("scroll", onScroll);
    }
}

const onScroll = () => {
    if(!animationEnabled) return;

    const page = document.body.parentNode;
    const posPercentage = page.scrollTop/(page.scrollHeight-page.clientHeight);
    
    for(i = 0; i<=4; i++) {
        toggle(arrayElements[i], posPercentage < 0.05);
    }
    
    manageScrollListener();
};

function toggle(el, shouldHide) {
    if (!shouldHide && el.classList.contains("onscreen")) {
        el.classList.remove("novisible");
        el.classList.remove("preload");
        el.classList.add("visible");
    }
}