const fadeElements = document.querySelectorAll('.fade-block');
const observer = new IntersectionObserver((entries) => {
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