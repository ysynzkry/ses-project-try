// Array to store the posts
var posts = [];
var isViewerLoggedIn = false;

// Function to handle the admin login
function adminLogin() {
  var username = document.getElementById('adminUsername').value;
  var password = document.getElementById('adminPassword').value;

  if (password === '123456789gh') {
    document.getElementById('viewerLoginSection').style.display = 'none';
    document.getElementById('adminLoginSection').style.display = 'none';
    document.getElementById('adminSection').style.display = 'block';
    document.getElementById('adminUsernameDisplay').innerText = 'Logged in as admin: ' + username;
  }
}

// Function to handle the viewer login
function viewerLogin() {
  var username = document.getElementById('viewerUsername').value;

  isViewerLoggedIn = true;

  document.getElementById('viewerLoginSection').style.display = 'none';
  document.getElementById('viewerSection').style.display = 'block';
  document.getElementById('viewerUsernameDisplay').innerText = 'Logged in as: ' + username;

  renderPosts();
}

// Function to create a post
function createPost() {
  var postText = document.getElementById('postTextarea').value;
  var file = document.getElementById('fileInput').files[0];
  var username = document.getElementById('viewerUsername').value;
  var date = new Date().toLocaleString();

  if (!isViewerLoggedIn) {
    alert('You need to be an admin in to create a post.');
    return;
  }

  var post = { username, postText, file, date, likes: 0, comments: [] };
  posts.push(post);

  // Save the posts to local storage
  localStorage.setItem('posts', JSON.stringify(posts));

  renderPosts();
}

// Function to add a comment to a post
function addComment(postIndex) {
  var commentInput = document.getElementById('commentInput_' + postIndex);
  var commentText = commentInput.value;

  var username = document.getElementById('viewerUsername').value;
  var date = new Date().toLocaleString();

  var comment = { username, commentText, date };
  posts[postIndex].comments.push(comment);

  // Save the updated posts to local storage
  localStorage.setItem('posts', JSON.stringify(posts));

  commentInput.value = '';

  renderPosts();
}

// Function to handle the like action on a post
function likePost(postIndex) {
  posts[postIndex].likes++;

  // Save the updated posts to local storage
  localStorage.setItem('posts', JSON.stringify(posts));

  renderPosts();
}


// Function to render posts for the viewer section
function renderViewerPosts() {
  var viewerPostsContainer = document.getElementById('postsContainerv');
  viewerPostsContainer.innerHTML = '';

  // Sort posts by date from newest to oldest
  posts.sort(function(a, b) {
    return new Date(b.date) - new Date(a.date);
  });

  posts.forEach(function(post, index) {
    var postDiv = document.createElement('div');
    postDiv.classList.add('post');

    var postInfo = document.createElement('p');
    postInfo.innerHTML = 'Posted by <strong>' + post.username + '</strong> on ' + post.date;

    var postText = document.createElement('p');
    postText.innerHTML = post.postText;

    // Render like button and count
    var likeButton = document.createElement('button');
    likeButton.innerHTML = 'Like (' + post.likes + ')';
    likeButton.onclick = function() {
      likePost(index);
    };

    // Render comments section
    var commentsSection = document.createElement('div');
    commentsSection.classList.add('comments-section');

    var commentsHeader = document.createElement('h3');
    commentsHeader.innerHTML = 'Comments';

    var commentsList = document.createElement('ul');

    var commentInput = document.createElement('input');
    commentInput.type = 'text';
    commentInput.id = 'commentInput_' + index;
    commentInput.placeholder = 'Add a comment';

    var commentButton = document.createElement('button');
    commentButton.innerHTML = 'Comment';
    commentButton.onclick = function() {
      addComment(index);
    }

    commentsSection.appendChild(commentsHeader);
    commentsSection.appendChild(commentsList);
    commentsSection.appendChild(commentInput);
    commentsSection.appendChild(commentButton);

    // Render comments
    post.comments.forEach(function(comment) {
      var commentItem = document.createElement('li');
      commentItem.innerHTML = '<strong>' + comment.username + ':</strong> ' + comment.commentText + ' <i>' + comment.date + '</i>';
      commentsList.appendChild(commentItem);
    });

    postDiv.appendChild(postInfo);
    postDiv.appendChild(postText);
    postDiv.appendChild(likeButton);
    postDiv.appendChild(commentsSection);

    if (post.file) {
      var fileLink = document.createElement('a');
      fileLink.href = URL.createObjectURL(post.file);
      fileLink.innerHTML = 'View File';
      postDiv.appendChild(fileLink);
    }

    viewerPostsContainer.appendChild(postDiv);
  });
}

// Update the renderPosts function to handle both admin and viewer section rendering
function renderPosts() {
  var postsContainer = document.getElementById('postsContainer');
  var viewerPostsContainer = document.getElementById('postsContainerv');
  var viewerSection = document.getElementById('viewerSection');
  var postInputSection = viewerSection.querySelector('div');

  if (isViewerLoggedIn) {
    postInputSection.style.display = 'block';
  } else {
    postInputSection.style.display = 'none';
  }

  // Sort posts by date from newest to oldest
  posts.sort(function(a, b) {
    return new Date(b.date) - new Date(a.date);
  });

  postsContainer.innerHTML = '';
  viewerPostsContainer.innerHTML = '';

  posts.forEach(function(post, index) {
    var postDiv = document.createElement('div');
    postDiv.classList.add('post');

    var postInfo = document.createElement('p');
    postInfo.innerHTML = 'Posted by <strong>' + post.username + '</strong> on ' + post.date;

    var postText = document.createElement('p');
    postText.innerHTML = post.postText;

    // Render like button and count
    var likeButton = document.createElement('button');
    likeButton.innerHTML = 'Like (' + post.likes + ')';
    likeButton.onclick = function() {
      likePost(index);
    };

    // Render comments section
    var commentsSection = document.createElement('div');
    commentsSection.classList.add('comments-section');

    var commentsHeader = document.createElement('h3');
    commentsHeader.innerHTML = 'Comments';

    var commentsList = document.createElement('ul');

    var commentInput = document.createElement('input');
    commentInput.type = 'text';
    commentInput.id = 'commentInput_' + index;
    commentInput.placeholder = 'Add a comment';

    var commentButton = document.createElement('button');
    commentButton.innerHTML = 'Comment';
    commentButton.onclick = function() {
      addComment(index);
    }

    commentsSection.appendChild(commentsHeader);
    commentsSection.appendChild(commentsList);
    commentsSection.appendChild(commentInput);
    commentsSection.appendChild(commentButton);

    // Render comments
    post.comments.forEach(function(comment) {
      var commentItem = document.createElement('li');
      commentItem.innerHTML = '<strong>' + comment.username + ':</strong> ' + comment.commentText + ' <i>' + comment.date + '</i>';
      commentsList.appendChild(commentItem);
    });

    postDiv.appendChild(postInfo);
    postDiv.appendChild(postText);
    postDiv.appendChild(likeButton);
    postDiv.appendChild(commentsSection);

    if (post.file) {
      var fileLink = document.createElement('a');
      fileLink.href = URL.createObjectURL(post.file);
      fileLink.innerHTML = 'View File';
      postDiv.appendChild(fileLink);
    }

    // Decide which container to append the post to
    if (isViewerLoggedIn) {
      viewerPostsContainer.appendChild(postDiv);
    } else {
      postsContainer.appendChild(postDiv);
    }
  });
}


// Function to load the saved posts from local storage
function loadPostsFromLocalStorage() {
  var savedPosts = localStorage.getItem('posts');
  if (savedPosts) {
    posts = JSON.parse(savedPosts);
    renderPosts();
  }
}

// Call the function to load saved posts from local storage on page load
loadPostsFromLocalStorage();
