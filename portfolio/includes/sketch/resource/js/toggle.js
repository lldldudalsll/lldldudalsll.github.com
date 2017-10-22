var menu = document.querySelector('.nav-toggle');
// console.log(menu);
var toggle_ul = document.querySelector('.navigation>ul');
// console.log(toggle_ul);
var toggle_overlay = document.querySelector('.overlay')

menu.onclick = function(){
    menu.classList.toggle('active');
    toggle_ul.classList.toggle('active');
    // toggle_overlay.classList.toggle('active');

    if (toggle_overlay.classList.toggle('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'scroll';
    }
    
}
