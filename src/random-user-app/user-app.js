/**
 * @returns {Object} infomacion del usuario
 */
const fetchPerson = async () => {
    const response = await fetch('https://randomuser.me/api/');
    const { results } = await response.json()
    return results[0];
}

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const UserApp = async (element) => {
    document.querySelector('#app-title').innerHTML = 'Random User Generator'

    const nameLabel = document.createElement('h2');
    const infoLabel = document.createElement('h3');
    const nextButton = document.createElement('button');
    nextButton.innerText = 'Siguiente persona';

    const showPerson = () => {
        element.innerHTML = '<h2>loading...</h2>'
        const renderPerson = ({ name, email, phone }) => {
            const { title, first, last } = name;
            nameLabel.innerHTML = `${title} ${first} ${last}`;
            infoLabel.innerHTML = ` ${email} / ${phone}`
            element.replaceChildren(nameLabel, infoLabel, nextButton);
        }
        fetchPerson().then(renderPerson);
    }

    showPerson();
    nextButton.addEventListener('click', () => showPerson());
}

