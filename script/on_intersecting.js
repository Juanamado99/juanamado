const fadeElements = document.querySelectorAll('.fade-block');
const arrayElements = Array.from(fadeElements);
const elementsClassList = arrayElements.map(item => item["className"]);
let isListenerCreated = false;
let hasVisible = false;

const onScroll = () => {
    const page = document.body.parentNode;
    const posPercentage = page.scrollTop/(page.scrollHeight-page.clientHeight);

    if (posPercentage < 0.05 || arrayElements[0].className.includes("outscreen")) {
        arrayElements[0].classList.remove('visible');
        arrayElements[0].classList.add('invisible');
    } else {
        arrayElements[0].classList.remove('invisible');
        arrayElements[0].classList.add('visible');
    }

    if (posPercentage < 0.1 || arrayElements[1].className.includes("outscreen")) {
        arrayElements[1].classList.remove('visible');
        arrayElements[1].classList.add('invisible');
    } else {
        arrayElements[1].classList.remove('invisible');
        arrayElements[1].classList.add('visible');
    }

    if (posPercentage < 0.15 || arrayElements[2].className.includes("outscreen")) {
        arrayElements[2].classList.remove('visible');
        arrayElements[2].classList.add('invisible');
    } else {
        arrayElements[2].classList.remove('invisible');
        arrayElements[2].classList.add('visible');
    }

    if (posPercentage < 0.2 || arrayElements[3].className.includes("outscreen")) {
        arrayElements[3].classList.remove('visible');
        arrayElements[3].classList.add('invisible');
    } else {
        arrayElements[3].classList.remove('invisible');
        arrayElements[3].classList.add('visible');
    }
    
    manageScrollListener();
};

const observer = new IntersectionObserver((entries) => {
    manageScrollListener();
    entries.forEach(entry => {
        const el = entry.target;
        if(entry.isIntersecting){
            el.classList.add('onscreen');
            el.classList.remove('outscreen');
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