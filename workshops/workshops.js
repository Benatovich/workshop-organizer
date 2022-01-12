import { checkAuth, logout } from '../fetch-utils.js';

checkAuth();

const workshopsEl = document.querySelector('.workshops-container');
const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

window.addEventListener('load', async() => {
    const workshops = await getWorkshops();

    displayWorkshops(workshops);
});

function displayWorkshops(workshops) {
    
}