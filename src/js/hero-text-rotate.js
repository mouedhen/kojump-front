import TextRotate from "./text-rotate";

if (document.getElementById('hero') !== null) {
    let elements = document.getElementsByClassName('txt-rotate');
    for (let i = 0; i < elements.length; i++) {
        let toRotate = elements[i].getAttribute('data-rotate');
        let period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TextRotate(elements[i], JSON.parse(toRotate), period);
        }
    }
}