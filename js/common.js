'use strict';

const body = document.querySelector('body');

// TOAST MESSAGE
let toastMessage;
let timeoutToastRemoval;
function addToast() {
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.innerHTML = `<div class="toast__box">
                                <p class="toast__message">Task ${toastMessage}</p>
                            </div>`
    containerCenter.append(toast);
    setTimeout(() => {
        toast.style.transform = 'translateY(0)';
    }, 1);
    setTimeout(() => {
        toast.style.transform = 'translateY(100%)';
    }, 4000);
    
    timeoutToastRemoval = setTimeout(()=> {
        removeToast();
    }, 5000);
}
function removeToast() {
    const toastExist = document.querySelector('.toast');
    toastExist && toastExist.remove(); // remove toast message only if it exits in the DOM.
}


body.addEventListener('click', function(e) {
    const clickedTaskMenu = e.target.classList.contains('task__icon-menu');
    const clickedTaskTextarea = e.target.classList.contains('task__textarea');
    const clickedTaskEdit = e.target.classList.contains('task__menu--edit');
    const clickedTaskDelete = e.target.classList.contains('task__delete');
    const clickedCheckboxLabelIncomplete = e.target.classList.contains('checkbox__label--incomplete');
    const clickedCheckboxLabelComplete = e.target.classList.contains('checkbox__label--completed');
    
    // CLOSE TASKBAR MENU 
    if (!clickedTaskMenu) {
        const taskMenuActive = document.querySelectorAll('.task__menu--active');
        if(taskMenuActive.length > 0) {
            document.querySelector('.task__menu--active').style.display = 'none';
            document.querySelector('.task__menu--active').classList.remove('task__menu--active');
        }

    }

    // DISABLE TEXTAREA IN CURRENT TASK
    if (!clickedTaskTextarea && !clickedTaskEdit) {
        const taskTextarea = document.querySelectorAll('.task__textarea');
        if(taskTextarea.length > 0) {
            taskTextarea.forEach(textarea => textarea.setAttribute('disabled', ''));
        }
    }

    // TOAST MESSAGE
    if(clickedCheckboxLabelIncomplete || clickedCheckboxLabelComplete || clickedTaskDelete) {
        removeToast();
        clearTimeout(timeoutToastRemoval);
    }
    if(clickedCheckboxLabelIncomplete) {
        toastMessage = 'Completed';
        addToast();
    }
    if(clickedCheckboxLabelComplete) {
        toastMessage = 'Marked Incomplete';
        addToast();
    }
    if(clickedTaskDelete) {
        toastMessage = 'Deleted';
        addToast();
    }

})