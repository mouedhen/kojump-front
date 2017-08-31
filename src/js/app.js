import UIkit from 'uikit'

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
window.addEventListener('load', function () {
    import('uikit/dist/js/uikit-icons').then((Icons) => {
        UIkit.use(Icons);
    });

    import('places.js').then((places) => {
        let placesAutoComplete = places({
            container: document.querySelector('#address-input'),
            language: 'fr',
            countries: ['fr'],
        });
        // @TODO send data to the server
        placesAutoComplete.on('change', function (e) {
            console.log(e.suggestion)
        });
    });

    require('./hero-slider');
    require('./hero-text-rotate');
    require('./sport-autocomplete');
    require('./sticky-map');
    require('./map-control');

    if (document.getElementById('map-control') !== null) {
        import('./map-control').then(({default: MapControl}) => {
            let control = new MapControl(
                document.getElementById('map-control'),
                document.getElementById('map-elements-container'),
                document.getElementById('map-elements'),
                document.getElementById('map-container'),
                document.getElementById('toggle-elements'),
                document.getElementById('toggle-map')
            );
            control.render('map-elements', 'bottom-scroll-spy');
        })
    }
});