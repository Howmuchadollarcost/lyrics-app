const form = document.getElementById('form');
const api = `http://localhost:3000/song`;

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const artistName = form.children[0].children[0].value;
    const songName = form.children[1].children[0].value;
    const album = form.children[2].children[0].value;
    const year = form.children[3].children[0].value;
    const imgSrc = form.children[4].children[0].value;
    const link = form.children[5].children[0].value;
    const content = form.children[6].children[0].value;

    const song = {
        artistName,
        songName,
        album,
        year,
        imgSrc,
        link,
        content
    }

    fetch(api, {
        method: 'POST',
        body: JSON.stringify(song),
        headers: {
            'content-type': 'application/json'
        }
    }).then(res => {
        if (!res.ok) {
            const contentType = response.headers.get('content-type');
            if (contentType.includes('json')) {
                return response.json().then(error => Promise.reject(error.message))
            } else {
                return response.text().then(message => Promise.reject(message));
            }
        }
    }).then(() => {
        form.reset();
    }).catch(errMessage => {errMessage.textContent = "ERROR"})
})





















// const SongSchema = new mongoose.Schema({
//     artistName : String,
//     songName : String,
//     album: String,
//     year: Number,
//     imgSrc: String,
//     link: String,
//     content: String,
//     created_at: {
//         type: Date,
//         default: Date.now
//     },
// }); 