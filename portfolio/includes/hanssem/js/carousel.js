(function(global){
  'use strict';
    // carousel
    var visualCarousel = function() {
      var carousel_01 = document.querySelector('.carousel-01'),
          carousel_02 = document.querySelector('.carousel-02'),
          carousel_03 = document.querySelector('.carousel-03'),
          carousel_04 = document.querySelector('.carousel-04'),
          count = 0;
        
      setInterval(function() {
        count += 1;
        count = count%4;
        // console.log(count);

        // margin-right
        carousel_01.style.marginLeft = (count) * 100 + '%';
        carousel_02.style.marginLeft = (count - 1) * 100 + '%';
        carousel_03.style.marginLeft = (count - 2) * 100 + '%';
        carousel_04.style.marginLeft = (count - 3) * 100 + '%';
      }, 4000);
    }

    var carousel_pause_btn = document.querySelector('.pause_btn');
    var carousel_prev_btn = document.querySelector('.prev_btn');
    var carousel_next_btn = document.querySelector('.next_btn');

    
    carousel_prev_btn.onclick = function(){
        var visualStyle = document.querySelectorAll('.visual-style');
        console.log(visualStyle);
        
    }
    
    visualCarousel();
})(window);


// (function global(){

//     "use strict";

//     var carouselButton = function(){
//         var carousel_con = document.querySelectorAll('.carousel > img');
//         // console.log(carousel_con);
//         var carousel_btn = document.querySelectorAll('.carousel_btn > button');
//         // console.log(carousel_btn);

//         var arrangement = [
//             carousel_btn[1].onclick = function(){
//                 carousel_con[0].style.marginLeft= "0";
//                 carousel_con[1].style.marginLeft= "100%";
//                 carousel_con[2].style.marginLeft= "200%";
//                 carousel_con[3].style.marginLeft= "300%";
//             }
//         ]
    
//     }

//     carouselButton();
// })(window);



// visual_list[0].classList.add('v-list-active');

//     var arrangement = [
//       visual_list[0].onclick = function () {
//         visual_con[0].style.marginLeft= "0";
//         visual_con[1].style.marginLeft= "100%";
//         visual_con[2].style.marginLeft= "200%";
//         visual_list[0].classList.add('v-list-active');
//         visual_list[1].classList.remove('v-list-active');
//         visual_list[2].classList.remove('v-list-active');     
//         console.log('1');   
//       },
//       visual_list[1].onclick = function () {
//         visual_con[0].style.marginLeft= "-100%";
//         visual_con[1].style.marginLeft= "0";
//         visual_con[2].style.marginLeft= "100%";
//         visual_list[0].classList.remove('v-list-active');
//         visual_list[1].classList.add('v-list-active');
//         visual_list[2].classList.remove('v-list-active');
//         console.log('2');
//       },
//       visual_list[2].onclick = function () {
//         visual_con[0].style.marginLeft= "-200%";
//         visual_con[1].style.marginLeft= "-100%";
//         visual_con[2].style.marginLeft= "0";
//         visual_list[0].classList.remove('v-list-active');
//         visual_list[1].classList.remove('v-list-active');
//         visual_list[2].classList.add('v-list-active');
//         console.log('3');
//       }
//     ];

//     function visualRolling() {
//       var arrangement2 = [
//         setTimeout(arrangement[1], 5000),
//         setTimeout(arrangement[2], 8000),
//         setTimeout(arrangement[0], 11000),
//       ];
//     }
//     setInterval(function(){visualRolling();}, 11000);
//     visualRolling()