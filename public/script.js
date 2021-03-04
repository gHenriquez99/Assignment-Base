// async function that contains all the JS 
async function windowActions() {
    console.log('window loaded');
    const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
    const form = document.querySelector('.userForm');
    const search = document.querySelector('.search');
    const target = document.querySelector('.target-ul');

    const request = await fetch(endpoint);
    const data = await request.json();
    console.log(data);

    // this adds eventListener on the searchBox 
    // anytime there is an input it updates 
    search.addEventListener('input', (event) => {
        console.log('input', event.target.value);
        target.innerHTML = "";
        const filtered = data.filter((record => record.name.toUpperCase().includes(search.value.toUpperCase())));
        filtered.forEach((item) => {
            const elem = document.createElement('li');
            elem.classList.add('list-item');
            elem.innerText = item.name;
            target.append(elem);
        })
    })

    // this adds an eventListener on the form
    // specifically for when there is a submit
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        target.innerHTML = "";
        console.log('submit fired', search.value);
        const filtered = data.filter((record => record.category.toUpperCase().includes(search.value.toUpperCase())));
        filtered.forEach((item) => {
            const elem = document.createElement('li');
            elem.classList.add('list-item');
            elem.innerText = item.name;
            target.append(elem);
        })
    })


}

// this actually runs the previous function 
window.onload = windowActions;

