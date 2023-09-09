import { loadUsersByPage } from "../use-cases/load-users-by-page";
import { SaveUser } from "../use-cases/save-user";

const state = {
    currentPage: 0,
    users: []
}

const loadNextPage = async () => {
    const users = await loadUsersByPage(state.currentPage + 1);
    if (users.length === 0) return;
    state.currentPage += 1;
    state.users = users;
}

const loadPreviousPage = async () => {
    if (state.currentPage === 1) return;
    const users = await loadUsersByPage(state.currentPage - 1);
    state.currentPage -= 1;
    state.users = users;
}

const onUserChange = async (updateuser) => {
    let wasFound = false;
    state.users = state.users.map(user => {
        wasFound = true;
        if (user.id === updateuser.id) {
            return updateuser;
        }
        return user;
    });

    if(state.users.length < 10){
        state.users.push(updateuser);
    }

}

const reloadPage = async () => {
    const users = await loadUsersByPage(state.currentPage);
    if (users.length === 0) return;
    if(users.length === 1) await loadPreviousPage();
    state.users = users;
}

export default {
    loadNextPage,
    loadPreviousPage,
    onUserChange,
    reloadPage,

    /**
     * 
     * @returns {User[]}
     */
    getUsers: () => [...state.users],
    getCurrentPage: () => state.currentPage,
}


