const SUPABASE_URL = 'https://uyyvpeoqhxhimqsupbgh.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MTk0NDg0NSwiZXhwIjoxOTU3NTIwODQ1fQ.0mmIevvuBPwfS7g9ZbeM9G33XQflNxmitkXx8Ayt3zw';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function getWorkshops() {
    const response = await client
        .from('workshops')
        .select('*, participants (*)')
        .match({ 'participants.user_id': client.auth.session().user.id });

    return checkError(response);
}

export async function deleteParticipant(id) {
    const response = await client
        .from('participants')
        .delete()
        .match({ id: id })
        .single();

    return checkError(response);
}

export async function createParticipant(participant) {
    const response = await client
        .from('participants')
        .insert({
            ...participant,
            user_id: client.auth.session().user.id,
        });

    return checkError(response);
}

// everything below here is from the template
export async function getUser() {
    return client.auth.session();
}


export async function checkAuth() {
    const user = await getUser();

    if (!user) location.replace('../'); 
}

export async function redirectIfLoggedIn() {
    if (await getUser()) {
        location.replace('./workshops');
    }
}

export async function signupUser(email, password){
    const response = await client.auth.signUp({ email, password });
    
    return response.user;
}

export async function signInUser(email, password){
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return window.location.href = '../';
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}

function renderParticipant(participant) {
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