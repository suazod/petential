$(document).ready(function() {
  /* global moment */

  // blogContainer holds all of our posts
  var blogContainer = $(".blog-container");
  var postCategorySelect = $("#category");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handlePostDelete);
  $(document).on("click", "button.edit", handlePostEdit);
  // Variable to hold our posts
  var posts;

  // The code below handles the case where we want to get blog posts for a specific author
  // Looks for a query param in the url for author_id
  var url = window.location.search;
  var authorId;
  if (url.indexOf("?author_id=") !== -1) {
    authorId = url.split("=")[1];
    getPosts(authorId);
  }
  // If there's no authorId we just get all posts as usual
  else {
    getPosts();
  }



  // This function grabs posts from the database and updates the view
  function getPosts(author) {
    authorId = author || "";
    if (authorId) {
      authorId = "/?author_id=" + authorId;
    }
    $.get("/api/posts" + authorId, function(data) {
      console.log("Posts", data);
      posts = data;
      if (!posts || !posts.length) {
        displayEmpty(author);
      }
      else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete posts
  function deletePost(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/posts/" + id
    })
    .done(function() {
      getPosts(postCategorySelect.val());
    });
  }

  // InitializeRows handles appending all of our constructed post HTML inside blogContainer
  function initializeRows() {
    blogContainer.empty();
    var postsToAdd = [];
    for (var i = 0; i < posts.length; i++) {
      postsToAdd.push(createNewRow(posts[i]));
    }
    blogContainer.append(postsToAdd);
  }

  // This function constructs a post's HTML
  function createNewRow(post) {
    var formattedDate = new Date(post.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    var newPostPanel = $("<div>");
    newPostPanel.addClass("panel panel-default");
    var newPostPanelHeading = $("<div>");
    newPostPanelHeading.addClass("panel-heading");
    var deleteBtn = $("<button>");
    deleteBtn.html("<i class='fa fa-trash' aria-hidden='true'></i>");
    deleteBtn.addClass("delete-btm delete btm");
    var editBtn = $("<button class='edit-btm'>");
    editBtn.html("<i class='fa fa-pencil' aria-hidden='true'></i>");
    editBtn.addClass("edit btn btn-info");
    var newPostTitle = $("<h2 class='pet-profile-main'>");
    var newPostDate = $("<small>");
    // var newPostAuthor = $("<h5>");
    // newPostAuthor.text("Written by: " + post.Author.name);
    // newPostAuthor.css({
    //   float: "right",
    //   color: "blue",
    //   "margin-top":
    //   "-10px"
    // });
    var newPostPanelBody = $("<div>");
    var newPostPanelBodyExpand = $("<div class='container important-info'>");
    newPostPanelBody.addClass("panel-body pet-main-profile");
    var newPostBreed = $("<p class='pet-profile-text'>");
    newPostBreed.text("Breed: " +  post.breed);
    var newPostGender = $("<p class='pet-profile-text'>");
    newPostGender.text("Gender: " +  post.gender);
    var newPostOwnerName = $("<div class='small-6 columns expanded-info'>");
    newPostOwnerName.text("Parent: " +  post.ownerName);
    var newPostOwnerPhone = $("<div class='small-6 columns expanded-info'>");
    newPostOwnerPhone.text("Phone: " +  post.ownerPhone);
    var newPostMicrochip = $("<div class='small-6 columns expanded-info'>");
    newPostMicrochip.text("Microchip: " +  post.microchip);
    var newPostPetStatus = $("<div class='small-6 columns expanded-info'>");
    newPostPetStatus.text("Status: " +  post.petstatus);
    var newPostAllergies = $("<div class='small-6 columns expanded-info'>");
    newPostAllergies.text("Allergies: " +  post.allergies);
    var newPostVitamins = $("<div class='small-6 columns expanded-info'>");
    newPostVitamins.text("Vitamins: " +  post.vitamins);
    var newPostPlaytime = $("<div class='small-6 columns expanded-info'>");
    newPostPlaytime.text("Playtime: " +  post.playtime);
    var newPostFood = $("<div class='small-6 columns expanded-info'>");
    newPostFood.text("Fav Food: " +  post.food);
    var newPostBorn = $("<p class='pet-profile-text'>");
    newPostBorn.text("Born: " +  post.born);
    var newPostPhoto = $("<div class='petPhoto'><img src='/images/photo-place-square.png'>");
    newPostPhoto.html(post.photo);
    var newPostBody = $("<p class='pet-profile-subtext'>");
    newPostTitle.text(post.title + " ");
    newPostBody.text(post.body);
    newPostDate.text("Profile updated: " +  formattedDate);
    newPostPanelBody.append(deleteBtn);
    newPostPanelBody.append(editBtn);
    newPostPanelBody.append(newPostPhoto);
    newPostPanelBody.append(newPostTitle);
    // newPostPanelHeading.append(newPostAuthor);
    newPostPanelBody.append(newPostBreed);
    newPostPanelBody.append(newPostBorn);
    newPostPanelBody.append(newPostGender);
    newPostPanelBody.append(newPostBody);
    newPostPanelBody.append(newPostPanelBodyExpand);
    newPostPanelBodyExpand.append(newPostOwnerName);
    newPostPanelBodyExpand.append(newPostOwnerPhone);
    newPostPanelBodyExpand.append(newPostMicrochip);
    newPostPanelBodyExpand.append(newPostPetStatus);
    newPostPanelBodyExpand.append(newPostAllergies);
    newPostPanelBodyExpand.append(newPostVitamins);
    newPostPanelBodyExpand.append(newPostPlaytime);
    newPostPanelBodyExpand.append(newPostFood);
    newPostPanelBody.append(newPostDate);
    newPostPanel.append(newPostPanelHeading);
    newPostPanel.append(newPostPanelBody);
    newPostPanel.data("post", post);
    return newPostPanel;
  }

  // This function figures out which post we want to delete and then calls deletePost
  function handlePostDelete() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("post");
    deletePost(currentPost.id);
  }

  // This function figures out which post we want to edit and takes it to the appropriate url
  function handlePostEdit() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("post");
    window.location.href = "/cms?post_id=" + currentPost.id;
  }

  // This function displays a messgae when there are no posts
  function displayEmpty(id) {
    var query = window.location.search;
    var partial = "";
    if (id) {
      partial = " for Pet #" + id;
    }
    blogContainer.empty();
    var messageh2 = $("<h2>");
    messageh2.css({ "text-align": "center", "margin-top": "60px" });
    messageh2.html("No pet profile created, navigate <a class='create-prof' href='/cms" + query +
    "'>here</a> in order to get started!");
    // messageh2.html("No pet profiles created" + partial + ", navigate <a href='/cms" + query +
    // "'>here</a> in order to get started!");
    blogContainer.append(messageh2);
  }

  // show/hide information on profile
  $(function(){
   $('.expand-information').click(function(){
      $('.important-info').toggle('slow');
      return false;
   });
});

});
