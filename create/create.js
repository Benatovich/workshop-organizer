import {
    createParticipant,
    getWorkshops,
    checkAuth,
    logout
} from '../fetch-utils.js';

const form = document.querySelector('.participant-form');
const logoutButton = document.getElementById('logout');

form.addEventListener('submit', async e => {
    e.preventDefault();

    const data = new FormData(form);

    const workshopId = data.get('workshop-id');
    const name = data.get('participant-name');

    await createParticipant({
        name: name,
        workshop_id: workshopId
    });
    form.reset();
});

window.addEventListener('load', async() => {
    const select = document.querySelector('select');
    const workshops = await getWorkshops();

    for (let workshop of workshops) {
        const option = document.createElement('option');

        option.value = workshop.id;
        option.textContent = workshop.name;

        select.append(option);
    }
});

checkAuth();

logoutButton.addEventListener('click', () => {
    logout();
});