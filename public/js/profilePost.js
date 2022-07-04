let toggle = false;
let updateToggle = false;
const openForm = document.getElementById('openform');

const showForm = () => {
    switch(toggle) {
        case false:
            document.getElementById('newpostform').classList.remove('d-none')
            toggle = true
        break

        case true:
            document.getElementById('newpostform').classList.add('d-none')
            toggle = false
        break
    };
};

openForm.addEventListener('click', showForm);

const showUpdate = (e) => {
        switch(toggle) {
            case false:
                // have to use this method to target correct element
                e.target.parentElement.parentElement.parentElement.parentElement.nextElementSibling.classList.remove('d-none')
                toggle = true
            break

            case true:
                e.target.parentElement.parentElement.parentElement.parentElement.nextElementSibling.classList.add('d-none')
                toggle = false
            break
        };
};

document.querySelectorAll('#updatebtn').forEach((btn) => {
    btn.addEventListener('click', showUpdate)
});

const newPostHandler = async (event) => {
    event.preventDefault();
  
    if (event.target.hasAttribute('data-id')) {
        const user_id = event.target.getAttribute('data-id');
        console.log(user_id)
        // Collect values from the login form
        const post_title = document.querySelector('#post-title').value.trim();
        const post_text = document.querySelector('#post-text').value.trim();
    
        if (post_title && post_text) {
            // Send a POST request to the API endpoint
            const response = await fetch(`/api/users/${user_id}`, {
                method: 'POST',
                body: JSON.stringify({ post_title, post_text, user_id }),
                headers: { 'Content-Type': 'application/json' },
            });
        
            if (response.ok) {
                // If successful, redirect the browser to the profile page
                document.location.replace('/profile');
            } else {
                alert(response.statusText);
            };
        };
    };
};

const deletePostHandler = async (event) => {
    event.preventDefault();
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        console.log(id)
        // Collect values from the login form
         
        // Send a POST request to the API endpoint
        const response = await fetch(`/api/post/${id}`, {
            method: 'DELETE',
        });
    
        if (response.ok) {
            // If successful, redirect the browser to the profile page
            document.location.replace('/profile');
        } else {
            console.log(response);
        };
    };
};
  

const updatePostHandler = async (event) => {
    event.preventDefault();

    const post_title = event.target.parentElement.querySelector('#update-title').value;
    const post_text = event.target.parentElement.querySelector('#update-text').value;
    let id = event.target.parentElement.getAttribute('data-id');
    console.log(id)
    console.log(post_title)
    console.log(post_text)

    if (event.target.hasAttribute('data-id')) {
        if (post_title && post_text) {
            const id = event.target.getAttribute('data-id');
            console.log(id)
            // Collect values from the login form
            
            // Send a POST request to the API endpoint
            const response = await fetch(`/api/post/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ post_title, post_text }),
                headers: { 'Content-Type': 'application/json', },
            });
        
            if (response.ok) {
                // If successful, redirect the browser to the profile page
                document.location.replace('/profile');
            } else {
                console.log(response);
            };
        };
    };
};
  
document.querySelector('.post-form').addEventListener('submit', newPostHandler);

document.querySelectorAll('.update-form').forEach((btn) => {
    btn.addEventListener('submit', updatePostHandler)
});

document.querySelectorAll('.delbtn').forEach((btn) => {
    btn.addEventListener('click', deletePostHandler)
});