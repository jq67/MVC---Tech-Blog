let toggle;
let updateToggle;

document.getElementById('postbtn').onclick = showForm = () => {
    switch(toggle) {
        case undefined:
            document.getElementById('newpostform').classList.remove('d-none')
            toggle = true
        break;

        case false:
            document.getElementById('newpostform').classList.remove('d-none')
            toggle = true
        break

        case true:
            document.getElementById('newpostform').classList.add('d-none')
            toggle = false
        break
    }
}

document.getElementById('updatebtn').onclick = showUpdate = () => {
    event.preventDefault();
    switch(toggle) {
        case undefined:
            document.getElementById('updatepostform').classList.remove('d-none')
            toggle = true
        break;

        case false:
            document.getElementById('updatepostform').classList.remove('d-none')
            toggle = true
        break

        case true:
            document.getElementById('updatepostform').classList.add('d-none')
            toggle = false
        break
    }
}

const newPostHandler = async (event) => {
    event.preventDefault();
  
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        // Collect values from the login form
        const post_title = document.querySelector('#post-title').value.trim();
        const post_text = document.querySelector('#post-text').value.trim();
    
        if (post_title && post_text) {
        // Send a POST request to the API endpoint
        const response = await fetch(`/api/users/${id}`, {
            method: 'POST',
            body: JSON.stringify({ post_title, post_text }),
            headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
            // If successful, redirect the browser to the profile page
            document.location.replace('/profile');
        } else {
            alert(response.statusText);
        }
        }
    };
}

const deletePostHandler = async (event) => {
    event.preventDefault();
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        console.log(id)
        // Collect values from the login form
         
        // Send a POST request to the API endpoint
        const response = await fetch(`/api/delete/${id}`, {
            method: 'DELETE',
        });
    
        if (response.ok) {
            // If successful, redirect the browser to the profile page
            document.location.replace('/profile');
        } else {
            console.log(response);
        }
    };
}
  

const updatePostHandler = async (event) => {
    event.preventDefault();

    const post_title = document.querySelector('#update-title').value;
    const post_text = document.querySelector('#update-text').value;
    let id = event.target.getAttribute('data-id');
    console.log(id)
    console.log(post_title)
    console.log(post_text)

    if (event.target.hasAttribute('data-id')) {
        if (post_title && post_text) {
            const id = event.target.getAttribute('data-id');
            console.log(id)
            // Collect values from the login form
            
            // Send a POST request to the API endpoint
            const response = await fetch(`/api/delete/${id}`, {
                method: 'POST',
                body: JSON.stringify({ post_title, post_text }),
                headers: { 'Content-Type': 'application/json', },
            });
        
            if (response.ok) {
                // If successful, redirect the browser to the profile page
                document.location.replace('/profile');
            } else {
                console.log(response);
            }
        }
    };
}
  
document.querySelector('.post-form').addEventListener('submit', newPostHandler);
document.querySelector('.update-form').addEventListener('submit', updatePostHandler);

document.querySelectorAll('.delbtn').forEach((btn) => {
    btn.addEventListener('click', deletePostHandler)
})
  
  