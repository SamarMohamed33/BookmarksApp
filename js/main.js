var bookmarkNameInput = document.getElementById("site-name");
var bookmarkLinkInput = document.getElementById("site-link");
var errorBoxElement = document.querySelector("#error-box");
var innerErrorBox = document.querySelector(".inner-error-box");
var NameValidationIcons = document.querySelector(".bookmark-name-icons");
var URLValidationIcons = document.querySelector(".bookmark-url-icons");

var bookmarksList = [];

var bookmarkNamePattern = /^[a-zA-Z0-9]{3,}/;
var bookmarkURLPattern =
  /^(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/;

if (localStorage.getItem("bookmarks") !== null) {
  bookmarksList = JSON.parse(localStorage.getItem("bookmarks"));
  showBookmarks();
}
// Function to add a new Bookmark in the list and save it into local storage
function addBookmark() {
  if (
    bookmarkNamePattern.test(bookmarkNameInput.value) &&
    bookmarkURLPattern.test(bookmarkLinkInput.value)
  ) {
    console.log("done");
    var bookmarkItem = {
      name: bookmarkNameInput.value,
      url: bookmarkLinkInput.value,
    };
    bookmarksList.push(bookmarkItem);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarksList));
    showBookmarks();
    clearInputs();
  } else {
    errorBoxElement.classList.add("show-error-box");
  }
}

// Function to clear the inputs data after submiting a new bookmark in the list
function clearInputs() {
  bookmarkNameInput.value = "";
  bookmarkLinkInput.value = "";
  // removes shadow
  bookmarkNameInput.classList.remove("validation-true", "validation-false");
  bookmarkLinkInput.classList.remove("validation-true", "validation-false");
  // removes icons
  document.querySelector(
    "." + NameValidationIcons.classList[0] + " .valid-icon"
  ).style.display = "none";
  document.querySelector(
    "." + URLValidationIcons.classList[0] + " .valid-icon"
  ).style.display = "none";
}

// Function to display all saved bookmarks
function showBookmarks() {
  var temp = ``;
  for (var i = 0; i < bookmarksList.length; i++) {
    temp += `<tr>
    <td>${i + 1}</td>
    <td>${bookmarksList[i].name}</td>
    <td>
      <a href="${bookmarksList[i].url}" id="visit-btn" class="btn"
        ><i class="fa-regular fa-eye"></i> Visit</a
      >
    </td>
    <td>
      <button class="btn" id="delete-btn" onclick="deleteBookmarkItem(${i})">
        <i class="fa-solid fa-trash-can"></i> Delete
      </button>
    </td>
  </tr>`;
  }
  document.getElementById("bookmarks-list").innerHTML = temp;
}

// Function to delete bookmark item from the list and local storage
function deleteBookmarkItem(index) {
  bookmarksList.splice(index, 1);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarksList));
  showBookmarks();
}

// Validation functions
function closeErrorBox() {
  errorBoxElement.style.display = "none";
  errorBoxElement.classList.remove("show-error-box");
}

/* adding validation-true and validation-false classes to color the shadow box
when user input is valid or invalid
*/
function checkValidation(InputElement, pattern, validationIcons) {
  if (!pattern.test(InputElement.value)) {
    InputElement.classList.remove("validation-true");
    InputElement.classList.add("validation-false");
    document.querySelector(
      "." + validationIcons.classList[0] + " .valid-icon"
    ).style.display = "none";
    document.querySelector(
      "." + validationIcons.classList[0] + " .unvalid-icon"
    ).style.display = "block";
  } else {
    InputElement.classList.remove("validation-false");
    InputElement.classList.add("validation-true");
    document.querySelector(
      "." + validationIcons.classList[0] + " .valid-icon"
    ).style.display = "block";
    document.querySelector(
      "." + validationIcons.classList[0] + " .unvalid-icon"
    ).style.display = "none";
  }
}

function checkNameValidation() {
  checkValidation(bookmarkNameInput, bookmarkNamePattern, NameValidationIcons);
}

function checkURLValidation() {
  checkValidation(bookmarkLinkInput, bookmarkURLPattern, URLValidationIcons);
}

// Adding event listener to the document to close error box when clicking outside it
errorBoxElement.addEventListener("click", function (event) {
  console.log(event.target);
  if (event.target != innerErrorBox) {
    closeErrorBox();
  }
});
