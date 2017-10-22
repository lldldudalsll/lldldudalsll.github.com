(function (global){
    'use strict'

    function scrollOn(){
        var nav_active = document.querySelector('nav');
        var gnb_active = document.querySelector('.gnb');
        var logo_active = document.querySelector('.logo-btn');
        // var scrolly = window.scrollY;

        // console.log(scrolly);
        // console.log(logo_active);
        // console.log(gnb_active);
        // console.log(nav_active);
        window.onscroll = function(){
            var scrollY = this.scrollY || this.scrollTop;

            if (scrollY > 0) {
                nav_active.classList.add('nav-active');
                gnb_active.classList.add('gnb-active');
                logo_active.classList.add('logo-active');
                console.log('on');
            } else {
                nav_active.classList.remove('nav-active');
                gnb_active.classList.remove('gnb-active');
                logo_active.classList.remove('logo-active');
                console.log('off');
            }
        };

    }

    function scrollEventMenu(){
        scrollOn();
    }
    scrollEventMenu();
})(window);