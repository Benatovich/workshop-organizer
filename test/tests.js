import './example.test.js';

export function renderParticipant(participant) {
    // create a p tag
    const participantEl = document.createElement('p');
    // add the 'bunny' css class no matter what
    participantEl.classList.add('participant');

    participantEl.textContent = participant.name;

    participantEl.addEventListener('click', async() => {
        await deleteParticipant(participant.id);
        const updatedWorkshops = await getWorkshops();
        displayWorkshops(updatedWorkshops);
    });
}