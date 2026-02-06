const fadeElements = document.querySelectorAll('.fade-block');
const arrayElements = Array.from(fadeElements);
let isListenerCreated = false;
let isOnLoad = false;

function manageScrollListener() {
    const elementsClassList = arrayElements.map(item => item["className"]);
    isOnLoad = elementsClassList.some(i => i.split(" ").includes("preload"));

    if (!isListenerCreated && isOnLoad) {
        isListenerCreated = true;
        document.addEventListener("scroll", onScroll);
    }
    if (isListenerCreated && !isOnLoad) {
        
        isListenerCreated = false;
        document.removeEventListener("scroll", onScroll);
    }
}

const onScroll = () => {
    const page = document.body.parentNode;
    const posPercentage = page.scrollTop/(page.scrollHeight-page.clientHeight);
    
    for(i = 0; i<=4; i++) {
        toggle(arrayElements[i], posPercentage > 0.05);
    }
    
    manageScrollListener();
};

function toggle(el, shouldShow) {
    if (shouldShow && el.classList.contains("preload")) {
        el.classList.remove("preload");
        el.classList.add("visible");
    }
}

manageScrollListener();