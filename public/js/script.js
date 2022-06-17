let [...postCard] = document.querySelectorAll('.card-click')

const cardHandler = async (event) => {
  event.preventDefault();

  let postId = document.querySelector('.post-id').value

  const response = await fetch(`/api/post/${postId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    // If successful, redirect the browser to the profile page
    document.location.replace(`/api/post/${postId}`);
  } else {
    alert(response.statusText);
  };

};

postCard.addEventListener('click', cardHandler)
