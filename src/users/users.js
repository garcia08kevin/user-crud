import { renderAddButton } from "./presentation/render-add-button/render-add-button";
import { renderButtons } from "./presentation/render-button/render-button";
import { renderModal } from "./presentation/render-modal/render-modal";
import { renderTable } from "./presentation/render-table/render-table";
import usersStore from "./store/users-store"
import { SaveUser } from "./use-cases/save-user";

export const UsersApp = async (element) => {
    document.querySelector('#app-title').innerHTML = 'CRUD Functions'
    element.innerHTML = 'Loading'
    await usersStore.loadNextPage();
    element.innerHTML = ''
    renderTable(element);
    renderButtons(element);
    renderAddButton(element);
    renderModal(element, async(userLike) => {
        const user = await SaveUser(userLike);
        usersStore.onUserChange(user);
        renderTable();
    });
}