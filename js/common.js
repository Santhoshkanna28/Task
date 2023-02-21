'use strict';

const body = document.querySelector('body');

body.addEventListener('click', function(e) {
    // CLOSE TASKBAR MENU 
    if (!e.target.classList.contains('task__icon-menu')) {
        const taskMenuActive = document.querySelectorAll('.task__menu--active');
        if(taskMenuActive.length > 0) {
            document.querySelector('.task__menu--active').style.display = 'none';
            document.querySelector('.task__menu--active').classList.remove('task__menu--active');
        }

    }

    // DISABLE TEXTAREA IN CURRENT TASK
    if (!e.target.classList.contains('task__textarea') && !e.target.classList.contains('task__menu--edit')) {
        const taskTextarea = document.querySelectorAll('.task__textarea');
        if(taskTextarea.length > 0) {
            taskTextarea.forEach(textarea => textarea.setAttribute('disabled', ''));
        }
    }
})