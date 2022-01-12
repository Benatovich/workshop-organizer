export function renderParticipant(participant) {
    const div = document.createElement('div');
    const p = document.createElement('p');

    p.textContent = participant.name;
    div.append(p);

    return div;
}