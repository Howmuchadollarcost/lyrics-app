const form = document.getElementById('form');
const api = `https://howmuchadollarcost-lyrics-app.glitch.me/song`;
const api1 = `https://howmuchadollarcost-lyrics-app.glitch.me/songs`;
const list_items = document.getElementById('list_container');


listAllLyrics();

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const artistName = form.children[0].children[0].value;
    const songName = form.children[1].children[0].value;
    const album = form.children[2].children[0].value;
    const year = form.children[3].children[0].value;
    const link = form.children[4].children[0].value;
    const imgSrc = form.children[5].children[0].value;
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
    }).catch(errMessage => {
        errMessage.textContent = "ERROR"
    })

})

function listAllLyrics() {
    fetch(api1)
        .then(res => res.json())
        .then(result => {
            result.map(item => {
                const items = document.createElement('div');
                items.className = 'items';

                const name = document.createElement('p');
                name.textContent = item.artist || item.artistName;
                const song = document.createElement('p');
                song.textContent = item.song || item.songName;
                const id = document.createElement('p');
                id.textContent = item._id;

                const button = document.createElement('button');
                button.className = 'btn remove';
                button.innerText = "Delete";

                items.appendChild(name);
                items.appendChild(song);
                items.appendChild(id);
                items.appendChild(button);
                list_items.appendChild(items);
            })


            const removeBtn = document.querySelectorAll('.remove');
            removeBtn.forEach(btn => {
                btn.addEventListener('click', deleteEntry);
            })
        })
}


function deleteEntry() {
    const element = event.path;
    const id = element[1].childNodes[2].innerHTML;

    console.log(`${api1}/${id}`);

    fetch(`${api1}/${id}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({id: `${id}`})
    }).then(() => {
        console.log('Song removed')
    }).catch(err=>{
        console.log('Error', err);
    })
}