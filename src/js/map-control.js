import isElementVisible from './helpers'

class MapControl {

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
        let that = this;
        document.addEventListener('scroll', function () {
            if (isElementVisible(topScrollSpyId)) {
                if (isElementVisible(bottomScrollSpyId)) {
                    that.mapControlEl.style.display = 'none'
                } else {
                    that.mapControlEl.style.display = 'block'
                }
            } else {
                that.mapControlEl.style.display = 'none'
            }
        });
        this.addClickEventShowMap();
        this.addClickEventHideMap();
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

let control = new MapControl(
    document.getElementById('map-control'),
    document.getElementById('map-elements-container'),
    document.getElementById('map-elements'),
    document.getElementById('map-container'),
    document.getElementById('toggle-elements'),
    document.getElementById('toggle-map')
);

control.render('map-elements', 'bottom-scroll-spy');