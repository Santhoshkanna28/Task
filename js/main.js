'use strict';


    // const taskColumn = document.querySelector('.task__column');
    const containerCenter = document.querySelector('.container--center');
    const taskColumn = document.querySelector('.task__column');
    const taskArea = document.querySelector('.task__area');
    const addBtn = document.querySelector('.task__btn');
    const addTaskInput = document.getElementById('task-input');
    const taskList = document.querySelectorAll('.task__list');
    const currentTaskListContainer = document.querySelector('.task-container--incomplete');
    const completedTaskListContainer = document.querySelector('.task-container--completed');
    const currentTaskList = document.querySelector('.task__list--incomplete');
    const completedTaskList = document.querySelector('.task__list--completed');
    const currentTaskCount = document.querySelector('.task__count--incomplete');
    const completedTaskCount = document.querySelector('.task__count--completed');
    const taskMenuBtns = document.querySelectorAll('.task__menu-icon');
    const taskMenuList = document.querySelectorAll('.task__menu-list');

    taskArea.style.display = "none";

    currentTaskList.innerHTML = "";
    let numCurrent = 0;
    let numCompleted = 0;

    function removeCompletedIllustration() {
        // REMOVE ILLUSTRATION
        const illustration = document.querySelectorAll('.illustration');
        if(illustration.length > 0) {
            const totalPendingTask = currentTaskListContainer.querySelector('.task-total');
            const [illstrate] = illustration;
            totalPendingTask.style.display = 'block';
            currentTaskListContainer.classList.add('fade-down');
            illstrate.remove();

            setTimeout(()=> {
                currentTaskListContainer.classList.remove('fade-down');
            },700)
        }
    }

    function addTask(){
        const taskName = addTaskInput.value;
        
        
        if(taskName == "") return;
        
        taskArea.style.display = "block";
        removeCompletedIllustration(); // REMOVE COMPLETED ILLUSTRATION

        numCurrent++;
        const addTaskItem = document.createElement('li');
        addTaskItem.classList.add('task__item', 'task__item--incomplete', `task__item--incomplete-${numCurrent}`);
        addTaskItem.innerHTML = `<div class="task__bar">
                                    <div class="task-action">
                                        <input type="checkbox" class="checkbox__input" id="check-incomplete-${numCurrent}" >
                                        <label for="check-incomplete-${numCurrent}" class="checkbox__label checkbox__label--incomplete"></label>
                                    </div>
                                    <div class="task__content">
                                        <textarea rows="1" class="task__heading task__textarea" maxlength="75" disabled>${taskName}</textarea>
                                    </div>
                                    <img class="task__icon-menu task__icon-menu--incomplete" src="assets/dot-menu-white.svg" alt="dot menu">

                                    <div class="task__menu">
                                        <ul class="task__menu-list">
                                          <li class="task__menu-item task__menu--edit">Edit</li>
                                          <li class="task__menu-item task__delete task__menu--delete">Delete</li>
                                        </ul>
                                    </div>
                                </div>`;
        currentTaskList.prepend(addTaskItem);

        // Empty input after adding
        addTaskInput.value = "";

        // show total count of current task
        showTotalTask('incomplete');
    }

    function task_Add_Remove_Action(selectedCheckbox, action) {
        
        // Remove the checked task item 
        selectedCheckbox.closest('.task__item').classList.add('fade-out-right');
        setTimeout(()=> {
            selectedCheckbox.closest('.task__item').remove();

            // show total count of current clicked task
            if(action == 'completed') {
                showTotalTask('incomplete');
            }else if (action == 'incomplete') {
                showTotalTask('completed');
            }

        }, 200);

        // Add to completed tasks area
        numCompleted++;
        const taskName = selectedCheckbox.closest('.task__item').querySelector('.task__heading').textContent;
        const addTaskItem = document.createElement('li');
        addTaskItem.classList.add('task__item', `task__item--${action}`, `task__item--${action}-${numCompleted}`);

        
        let checkedState;
        let taskMenu;
        let taskContent;
        let taskIcon;
        if(action == 'completed') {
            checkedState = true; // checkbox checked state

            taskIcon = `<img class="task__icon-delete task__delete" src="assets/trash-white.svg" alt="trash icon">`; // taskbar icon

            taskContent = `<p class="task__heading">${taskName}</p>`; // task heading HTML content
            taskMenu = '';
        }else if(action == 'incomplete') {
            checkedState = false; // checkbox checked state

            taskIcon = `<img class="task__icon-menu" src="assets/dot-menu-white.svg" alt="dot menu">`; // taskbar icon

            taskContent = `<textarea rows="1" class="task__heading task__textarea" maxlength="75" disabled>${taskName}</textarea>`; // task heading HTML content
            taskMenu = `<div class="task__menu">
                            <ul class="task__menu-list">
                                <li class="task__menu-item task__menu--edit">Edit</li>
                                <li class="task__menu-item task__delete task__menu--delete">Delete</li>
                            </ul>
                        </div>`;
            
        }
        addTaskItem.innerHTML = ` <div class="task__bar">
                                                <div class="task-action">
                                                    <input type="checkbox" class="checkbox__input" id="check-${action}-${numCompleted}" checked="${checkedState}">
                                                    <label for="check-${action}-${numCompleted}" class="checkbox__label checkbox__label--${action}"></label>
                                                </div>
                                                <div class="task__content">
                                                    ${taskContent}
                                                </div>
                                                ${taskIcon}
                                                ${taskMenu}
                                            </div>`;
        switch (action) {
            case 'completed':
                completedTaskList.append(addTaskItem);
                break;
            case 'incomplete':
                currentTaskList.prepend(addTaskItem);
                break;
        }
        
        showTotalTask(action);// show total count of added task
    }

    function showTotalTask(state) { 
        const taskItems = document.querySelectorAll(`.task__item--${state}`);
        // console.log(taskItems.length);
        switch (state) {
            case 'incomplete':
                currentTaskCount.textContent = taskItems.length;
                break;
            case 'completed':
                completedTaskCount.textContent = taskItems.length;
        }
    }

    function addCompletedIllustration () {
        const taskIncompleteArray = document.querySelectorAll('.task__item--incomplete');
        if(taskIncompleteArray.length === 0) {
            const taskContainer = document.querySelector('.task-container--incomplete');
            const illustration = `<div class="illustration illustration--completed">
                                    <img class="ilust-img-trans" src="assets/completed-illust.svg" alt="illustration2">
                                    <h4 class="ilust-h4-trans">All tasks complete</h4>
                                    <p class="ilust-p-trans">Nice Work!</p>
                                </div>`;
            taskContainer.insertAdjacentHTML('beforeend', illustration);
            taskContainer.querySelector('.task-total').style.display = 'none';
        }
    }

    function addMainIllustration() {
        const taskIncompleteArray = document.querySelectorAll('.task__item--incomplete');
        const taskCompleteArray = document.querySelectorAll('.task__item--completed');
        const illustrationCompleted = document.querySelectorAll('.illustration--completed');
        if(taskIncompleteArray.length === 0 && taskCompleteArray.length === 0) {
            illustrationCompleted.length && illustrationCompleted[0].remove();
            taskArea.style.display = "none";
            const illustration = document.createElement('div');
            illustration.classList.add('illustration', 'illustration--new');
            illustration.innerHTML = 
                                    `<img class="ilust-img-trans" src="assets/add-task-illust.svg" alt="illustration1">
                                    <h4 class="ilust-h4-trans">Looks like your task list is empty</h4>
                                    <p class="ilust-p-trans">Add new task !</p>`;
            taskArea.after(illustration);
        }
    }




    // Add task button click
    addBtn.addEventListener('click', function(){
        addTask();
    });

    // Add task on pressing enter
    addTaskInput.addEventListener('keydown', function(e){
        if (e.key === 'Enter') {
            addTask();
        }
    });

    
    // Mark complete
    completedTaskList.innerHTML = "";
    currentTaskList.addEventListener('click', function(e){
        const clicked = e.target.classList.contains('checkbox__label');
        const clickedMenuIcon = e.target.classList.contains('task__icon-menu');
        const clickedCheckbox = e.target.closest('.checkbox__label');
        const taskItem = e.target.closest('.task__item');
        const taskBar = e.target.closest('.task__bar');
        const taskBarMenuArray = document.querySelectorAll('.task__menu');
        const taskBarMenu = e.target.closest('.task__bar').querySelector('.task__menu');
        const taskEditBtn = e.target.classList.contains('task__menu--edit');
        const taskDeleteBtn = e.target.classList.contains('task__menu--delete');
        const taskTextarea = e.target.closest('.task__item').querySelector('.task__heading');

        if(clicked) {
            task_Add_Remove_Action(clickedCheckbox, 'completed');

            // Add task completed Illustration (Only if all tasks are completed)
            setTimeout(()=> {
                addCompletedIllustration();
            },220);
        };

        // When clicking menu icon
        if(clickedMenuIcon) {
            taskBarMenuArray.forEach(menu => {
                menu.style.display = 'none';
                menu.classList.remove('task__menu--active');
            });
            taskBarMenu.style.display = 'block';
            taskBarMenu.classList.add('task__menu--active');
        }

        // When edit btn in menu is clicked
        if(taskEditBtn) {
            taskTextarea.removeAttribute('disabled');
            taskTextarea.select();

            // taskBar.style.boxShadow = 'rgb(64 64 64) 0px 2px 8px 0px';
            // taskBar.style.transform = 'translateY(-2px)';
        }

        // When delete btn in menu is clicked
        if(taskDeleteBtn) {
            taskItem.classList.add('fade-out-right');
            setTimeout(()=> {
                taskItem.remove();
                showTotalTask('incomplete');
            }, 200);

            setTimeout(()=> {
                addCompletedIllustration();
                addMainIllustration();
            },220);
        }

    })

    // Edit current task name
    currentTaskList.addEventListener('keydown', function(e) {
        const taskTextarea = e.target.closest('.task__heading');
        if (e.key == 'Enter') {
            e.preventDefault();
            taskTextarea.setAttribute('disabled', '');
        };
    })

    currentTaskList.addEventListener('keyup', function(e) {
        const taskTextarea = e.target.closest('.task__heading');
        taskTextarea.textContent = taskTextarea.value;
    })

    // Mark Incomplete
    completedTaskList.addEventListener('click', function(e){
        const clicked = e.target.classList.contains('checkbox__label');
        const clickedCheckbox = e.target.closest('.checkbox__label');
        const clickedDeleteIcon = e.target.classList.contains('task__icon-delete');
        const taskItem = e.target.closest('.task__item');
        if(clicked) {
            task_Add_Remove_Action(clickedCheckbox, 'incomplete');
            removeCompletedIllustration();
        }

        if (clickedDeleteIcon) {
            taskItem.classList.add('fade-out-right');
            const taskItemIncomplete = document.querySelectorAll('.task__item--incomplete');
            setTimeout(()=> {
                taskItem.remove();
                showTotalTask('completed');
                addMainIllustration();
            }, 200);

        }

    })


