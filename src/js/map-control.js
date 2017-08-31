import isElementVisible from './helpers'

export default class MapControl {

    constructor (mapControlEl, mapElContainer, elContainer, mapContainer, toggleElementsControl, toggleMapControl) {
        this.mapControlEl = mapControlEl;
        this.mapElContainer = mapElContainer;
        this.elContainer = elContainer;
        this.mapContainer = mapContainer;
        this.toggleElementsControl = toggleElementsControl;
        this.toggleMapControl = toggleMapControl;
    }



    render (topScrollSpyId, bottomScrollSpyId) {
        if (window.screen.availWidth < 500) {
            this.showOnlyElements();
        }
        this.showControl(topScrollSpyId, bottomScrollSpyId);
        this.attachEvents(topScrollSpyId, bottomScrollSpyId);
        this.addClickEventShowMap();
        this.addClickEventHideMap();
    }

    attachEvents (topScrollSpyId, bottomScrollSpyId) {
        this.addScrollEventListener(topScrollSpyId, bottomScrollSpyId);
        this.addClickEventHideMap();
        this.addClickEventShowMap();
    }

    showOnlyElements () {
        this.mapContainer.style.display = 'none';
        this.mapElContainer.classList.remove('uk-width-3-5');
        this.elContainer.classList.remove('uk-child-width-1-2@m');
        this.mapElContainer.classList.add('uk-width-1-1');
        this.elContainer.classList.add('uk-child-width-1-3@m');
        this.elContainer.classList.add('uk-child-width-1-2@s');
        this.toggleElementsControl.style.display = 'none';
        this.toggleMapControl.style.display = 'block';
        this.mapControlEl.style.left = '98%';
    }

    showMapWithElements () {
        this.mapContainer.style.display = 'block';
        this.mapElContainer.classList.remove('uk-width-1-1');
        this.elContainer.classList.remove('uk-child-width-1-3@m');
        this.elContainer.classList.remove('uk-child-width-1-2@s');
        this.mapElContainer.classList.add('uk-width-3-5');
        this.elContainer.classList.add('uk-child-width-1-2@m');
        this.toggleMapControl.style.display = 'none';
        this.toggleElementsControl.style.display = 'block';
        this.mapControlEl.style.left = '57%';
    }

    showControl (topScrollSpyId, bottomScrollSpyId) {
        if (isElementVisible(topScrollSpyId)) {
            if (isElementVisible(bottomScrollSpyId)) {
                this.mapControlEl.style.display = 'none'
            } else {
                this.mapControlEl.style.display = 'block'
            }
        } else {
            this.mapControlEl.style.display = 'none'
        }
    }

    addScrollEventListener (topScrollSpyId, bottomScrollSpyId) {
        let that = this;
        document.addEventListener('scroll', function () {
            that.showControl(topScrollSpyId, bottomScrollSpyId)
        });
    }

    addClickEventHideMap () {
        let that = this;
        this.toggleElementsControl.addEventListener('click', function (e) {
            e.preventDefault();
            that.showOnlyElements();
        })
    }

    addClickEventShowMap () {
        let that = this;
        this.toggleMapControl.addEventListener('click', function (e) {
            e.preventDefault();
            that.showMapWithElements();
        })
    }
}
