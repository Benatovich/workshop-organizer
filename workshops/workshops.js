import { 
    checkAuth,
    logout,
    deleteParticipant,
    getWorkshops
} from '../fetch-utils.js';
import { renderParticipant } from '../render-utils.js';


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
    workshopsEl.textContent = '';
    
    for (let workshop of workshops) {
        const workshopEl = document.createElement('div');
        const nameEl = document.createElement('h3');
        const participantsEl = document.createElement('div');

        participantsEl.classList.add('participants');
        workshopEl.classList.add('workshop');

        nameEl.textContent = workshop.name;

        for (let participant of workshop.participants) {
            const participantEl = renderParticipant(participant);

            participantEl.classList.add('participant');

            participantEl.addEventListener('click', async() => {
                await deleteParticipant(participant.id);

                const updatedWorkshops = await getWorkshops();

                displayWorkshops(updatedWorkshops);
            });
            participantsEl.append(participantEl);
        }
        workshopEl.append(nameEl, participantsEl);
        workshopsEl.append(workshopEl);
    }
}

// old version of displayWorkshops below:
// function displayWorkshops(workshops) { 
//     workshopsEl.textContent = '';
    
//     for (let workshop of workshops) {
//         const workshopEl = document.createElement('div');
//         const nameEl = document.createElement('h3');
//         const participantsEl = document.createElement('div');

//         participantsEl.classList.add('participants');
//         workshopEl.classList.add('workshop');

//         nameEl.textContent = workshop.name;

//         for (let participant of workshop.participants) {
//             const participantEl = document.createElement('div');

//             participantEl.classList.add('participant');
//             participantEl.textContent = participant.name;

//             participantEl.addEventListener('click', async() => {
//                 await deleteParticipant(participant.id);

//                 const updatedWorkshops = await getWorkshops();

//                 displayWorkshops(updatedWorkshops);
//             });
//             participantsEl.append(participantEl);
//         }
//         workshopEl.append(nameEl, participantsEl);
//         workshopsEl.append(workshopEl);
//     }
// }