'use strict';

const body = document.querySelector('body');

body.addEventListener('click', function(e) {
    // close takbar menu 
    if (!e.target.classList.contains('task__icon-menu')) {
        const taskMenuActive = document.querySelectorAll('.task__menu--active');
        if(taskMenuActive.length > 0) {
            document.querySelector('.task__menu--active').style.display = 'none';
            document.querySelector('.task__menu--active').classList.remove('task__menu--active');
        }
        
    }
})