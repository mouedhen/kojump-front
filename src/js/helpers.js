/* Get the TOP position of a given element. */
function getPositionTop(element){
    let offset = 0;
    while(element) {
        offset += element["offsetTop"];
        element = element.offsetParent;
    }
    return offset;
}

/* Is a given element is visible or not? */
export default function isElementVisible(eltId) {
    let elt = document.getElementById(eltId);
    if (!elt) {
        // Element not found.
        return false;
    }
    // Get the top and bottom position of the given element.
    let posTop = getPositionTop(elt);
    let posBottom = posTop + elt.offsetHeight;
    // Get the top and bottom position of the *visible* part of the window.
    let visibleTop = document.body.scrollTop;
    let visibleBottom = visibleTop + document.documentElement.offsetHeight;
    return ((posBottom >= visibleTop) && (posTop <= visibleBottom));
}

//export default getPositionTop;