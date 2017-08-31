import $ from 'jquery'

import UIkit from 'uikit'
import TextRotate from './text-rotate'

//import waypoint from 'waypoints/lib/noframework.waypoints';
//import Infinite from 'waypoints/lib/shortcuts/infinite';

/**
 * @TODO to test on production
 */
// let infinite = new Infinite({
//     element: $('.infinite-container')[0],
//     onBeforePageLoad: function () {
//         $('.infinite-more-link').show();
//     },
//     onAfterPageLoad: function ($items) {
//         $('.infinite-more-link').hide();
//     }
// });

// TODO add lazy loading capability with router

window.onload = function () {

    /**
     * UIKit icons
     */
    import('uikit/dist/js/uikit-icons').then((Icons) => {
        UIkit.use(Icons);
    });

    /**
     * Places widget
     */
    import('places.js').then((places) => {
        let placesAutoComplete = places({
            container: document.querySelector('#address-input'),
            language: 'fr',
            countries: ['fr'],
        });
        // @TODO send data to the server
        placesAutoComplete.on('change', function(e) { console.log(e.suggestion) });
    });

    require('./hero-slider');
    require('./hero-text-rotate');
    require('./sport-autocomplete');
    require('./sticky-map');
    require('./map-control')
};