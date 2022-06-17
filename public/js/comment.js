const newCommentHandler = async (event) => {
    event.preventDefault();
  
    if (event.target.hasAttribute('data-id')) {
        console.log('1st')
        const id = event.target.getAttribute('data-id');
        // Collect values from the login form
        const comment_text = document.querySelector('#comment-text').value.trim();
    
        if (comment_text) {
        // Send a POST request to the API endpoint
        const response = await fetch(`/api/post/${id}`, {
            method: 'POST',
            body: JSON.stringify({ comment_text }),
            headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
            // If successful, redirect the browser to the profile page
            document.location.replace(`/api/post/${id}`)
        } else {
            alert(response.statusText);
        }
        }
    };
}
  
  
document.querySelector('.comment-form').addEventListener('submit', newCommentHandler);