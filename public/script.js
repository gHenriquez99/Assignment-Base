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
        console.log('input', event.target.value); // logs the input so its easier to follow
        target.innerHTML = "";
        // this actually does the filtering. So right now it is just set to name
        // we could add more filters if we wanted to like category
        const filtered = data.filter((record => record.name.toUpperCase().includes(search.value.toUpperCase()) 
            || record.category.toUpperCase().includes(search.value.toUpperCase())));
        // for each filtered result, creates a new li containing the name, category and address
        filtered.forEach((item) => {
            const elem = document.createElement('li');
            elem.classList.add('list-item');
            elem.innerText = item.name + "\n" + item.category + "\n" + item.address_line_1 + "\n" + item.city + "\n" + item.zip;
            // appends the li into the ul
            target.append(elem);
        })
        if(event.target.value === ""){
            target.innerHTML ="";
        }

    })

    // this adds an eventListener on the form
    // specifically for when there is a submit
    // ****IF YOU WANT THIS UNCOMMENT THE FUNCTION BELOW AND UNCOMMENT THE SUBMIT IN index.html
    // BUT ITS KIND OF POINTLESS BECAUSE IT UPDATES ON EVERY INPUT ANYWAYS

    // form.addEventListener('submit', async (event) => {
    //     event.preventDefault();
    //     target.innerHTML = "";
    //     console.log('submit fired', search.value);
    //     const filtered = data.filter((record => record.category.toUpperCase().includes(search.value.toUpperCase())));
    //     filtered.forEach((item) => {
    //         const elem = document.createElement('li');
    //         elem.classList.add('list-item');
    //         elem.innerText = item.name;
    //         target.append(elem);
    //     })
    // })


}

// this actually runs the previous function 
window.onload = windowActions;

