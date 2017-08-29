import $ from 'jquery'

if (document.getElementById('hero') !== null) {
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
}