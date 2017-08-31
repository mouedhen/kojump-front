if (document.getElementById('map') !== null) {
    import('sticky-js').then((Sticky) => {
        let sticky = new Sticky('[data-sticky]');
        document.getElementById('toggle-map').addEventListener('click', function (e) {
            e.preventDefault();
            sticky.update();
        })
    })
}