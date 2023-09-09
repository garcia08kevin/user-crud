import usersStore from '../../store/users-store'
import { showModal } from '../render-modal/render-modal';
import { deleteUser } from '../../use-cases/delete-user.by.id'
import './render-table.css'

let table;

const createTable = () => {
    const table = document.createElement('table');
    const tableHeaders = document.createElement('thead');
    tableHeaders.innerHTML = `
        <tr>
            <th>#ID</th>
            <th>Balance</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Genero</th>
            <th>Activado</th>
            <th>Acciones</th>
        </tr>
    `;
    const tableBody = document.createElement('tbody');
    table.append(tableHeaders, tableBody);
    return table;
}

const tableSelectListener = async (event) => {
    const element = event.target.closest('.select-user');
    if (!element) return;
    const id = element.getAttribute('data-id');
    showModal(id);
}

const tableDeleteListener = async (event) => {
    const element = event.target.closest('.delete-user');
    if (!element) return;
    const id = element.getAttribute('data-id');
    try {
        await deleteUser(id);
        await usersStore.reloadPage();
        document.querySelector('#current-page').innerText = usersStore.getCurrentPage();
        renderTable();
    } catch (error) {
        alert(error);
    }
}

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const renderTable = (element) => {
    const users = usersStore.getUsers();
    if (!table) {
        table = createTable();
        element.append(table);
        table.addEventListener('click', tableSelectListener);
        table.addEventListener('click', tableDeleteListener);
    }
    let tableHTML = '';
    users.forEach(user => {
        const { id, isActive, balance, firstName, lastName, gender } = user;
        tableHTML += `
            <tr>
                <td>${id}</td>
                <td>${balance}</td>
                <td>${firstName}</td>
                <td>${lastName}</td>
                <td>${gender}</td>
                <td>${isActive}</td>                
                <td>
                    <a href="#/" class="select-user" data-id="${id}">Select</a>
                    |
                    <a href="#/" class="delete-user" data-id="${id}">Delete</a>
                </td>
            </tr>            
        `
    });
    table.querySelector('tbody').innerHTML = tableHTML;

}