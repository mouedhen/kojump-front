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

    /**
     * Slick hero carousel
     */
    import('slick-carousel').then(() => {
        $('.hero-slider').slick({
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 4000,
            fade: true,
            cssEase: 'linear',
            pauseOnHover: false
        })
    });

    /**
     * Hero text rotor
     */
    let elements = document.getElementsByClassName('txt-rotate');
    for (let i = 0; i < elements.length; i++) {
        let toRotate = elements[i].getAttribute('data-rotate');
        let period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TextRotate(elements[i], JSON.parse(toRotate), period);
        }
    }
};