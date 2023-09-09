import './render-button.css'

import usersStore from '../../store/users-store'
import { renderTable } from '../render-table/render-table';

export const renderButtons = (element) => {
    const nextButton = document.createElement('button');
    nextButton.innerText = 'Next >'

    const prevButton = document.createElement('button');
    prevButton.innerText = '< Prev'

    const currentPageLbel = document.createElement('span');
    currentPageLbel.id = 'current-page';    
    currentPageLbel.innerText = usersStore.getCurrentPage();

    nextButton.addEventListener('click', async() => {
        await usersStore.loadNextPage();
        currentPageLbel.innerText = usersStore.getCurrentPage();
        renderTable(element);
    })

    prevButton.addEventListener('click', async() => {
        await usersStore.loadPreviousPage();
        currentPageLbel.innerText = usersStore.getCurrentPage();
        renderTable(element);
    })
    
    element.append(prevButton, currentPageLbel, nextButton);
}