import Swal from "sweetalert2";

const inputBookId = document.querySelector("#inputBookId");
const inputBookTitle = document.querySelector("#inputBookTitle");
const inputBookAuthor = document.querySelector("#inputBookAuthor");
const buttonSave = document.querySelector("#buttonSave");
const buttonUpdate = document.querySelector("#buttonUpdate");
const buttonEmpty = document.querySelector("#buttonEmpty");

function main() {
  const baseUrl = "https://books-api.dicoding.dev";
  const getBook = () => {
    fetch(`${baseUrl}/list`)
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        if (responseJson.error) {
          showResponseMessage(
            responseJson.message,
            "error",
            "Something went wrong!"
          );
        } else {
          renderAllBooks(responseJson.books);
        }
      })
      .catch((error) => {
        showResponseMessage(error, "error", "Something went wrong!");
      });

    // // membuat instance dari XMLHttpRequest
    // const xhr = new XMLHttpRequest();
    // //menetapkan callback jika response sukses dan error
    // xhr.onload = function () {
    //   const responseJson = JSON.parse(this.responseText);
    //   if (responseJson.error) {
    //     showResponseMessage(responseJson.message, "error", "Something went wrong!");
    //   } else {
    //     renderAllBooks(responseJson.books);
    //   }
    // };
    // xhr.onerror = function () {
    //   showResponseMessage();
    // };
    // // Membuat GET request dan menetapkan target URL
    // xhr.open("GET", `${baseUrl}/list`);
    // // Mengirimkan request
    // xhr.send();
  };

  const insertBook = (book) => {
    fetch(`${baseUrl}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": "12345",
      },
      body: JSON.stringify(book),
    })
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        if (responseJson.error) {
          showResponseMessage(
            responseJson.message,
            "error",
            "Something went wrong!"
          );
        } else {
          showResponseMessage(
            responseJson.message,
            "success",
            "Task was successful!"
          );
        }

        getBook();
      })
      .catch((error) => {
        showResponseMessage(error, "error", "Something went wrong!");
      });

    // // Membuat instance dari XMLHttpRequest
    // const xhr = new XMLHttpRequest();
    // //menetapkan callback jika response sukses dan error
    // xhr.onload = function () {
    //   const responseJson = JSON.parse(this.responseText);
    //   showResponseMessage(responseJson.message, "success", "Task was successful!");
    //   getBook();
    // };
    // xhr.onerror = function () {
    //   showResponseMessage();
    // };
    // // Membuat POST request dan menetapkan target URL
    // xhr.open("POST", `${baseUrl}/add`);
    // // Mementapkan properti Content-Type dan X-Auth-Token pada Header request
    // xhr.setRequestHeader("Content-Type", "application/json");
    // xhr.setRequestHeader("X-Auth-Token", "12345");
    // // Mengirimkan request dan menyisipkan JSON.stringify(book) pada body
    // xhr.send(JSON.stringify(book));
  };

  const updateBook = (book) => {
    fetch(`${baseUrl}/edit/${book.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": "12345",
      },
      body: JSON.stringify(book),
    })
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        if (responseJson.error) {
          showResponseMessage(
            responseJson.message,
            "error",
            "Something went wrong!"
          );
        } else {
          showResponseMessage(
            responseJson.message,
            "success",
            "Task was successful!"
          );
        }

        getBook();
      })
      .catch((error) => {
        showResponseMessage(error, "error", "Something went wrong!");
      });

    // // Membuat instance dari XMLHttpRequest
    // const xhr = new XMLHttpRequest();
    // //menetapkan callback jika response sukses dan error
    // xhr.onload = function () {
    //   const responseJson = JSON.parse(this.responseText);
    //   showResponseMessage(responseJson.message, "success", "Task was successful!");
    //   getBook();
    // };
    // xhr.onerror = function () {
    //   showResponseMessage();
    // };
    // // Membuat PUT request dan menetapkan target URL
    // xhr.open("PUT", `${baseUrl}/edit/${book.id}`);
    // // Mementapkan properti Content-Type dan X-Auth-Token pada Header request
    // xhr.setRequestHeader("Content-Type", "application/json");
    // xhr.setRequestHeader("X-Auth-Token", "12345");
    // // Mengirimkan request dan menyisipkan JSON.stringify(book) pada body
    // xhr.send(JSON.stringify(book));
  };

  const removeBook = (bookId) => {
    fetch(`${baseUrl}/delete/${bookId}`, {
      method: "DELETE",
      headers: {
        "X-Auth-Token": "12345",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        if (responseJson.error) {
          showResponseMessage(
            responseJson.message,
            "error",
            "Something went wrong!"
          );
        } else {
          showResponseMessage(
            responseJson.message,
            "success",
            "Task was successful!"
          );
        }

        getBook();
      })
      .catch((error) => {
        showResponseMessage(error, "error", "Something went wrong!");
      });

    // // Membuat instance dari XMLHttpRequest
    // const xhr = new XMLHttpRequest();
    // //menetapkan callback jika response sukses dan error
    // xhr.onload = function () {
    //   const responseJson = JSON.parse(this.responseText);
    //   showResponseMessage(responseJson.message, "success", "Task was successful!");
    //   getBook();
    // };
    // xhr.onerror = function () {
    //   showResponseMessage();
    // };
    // // Membuat DELETE request dan menetapkan target URL
    // xhr.open("DELETE", `${baseUrl}/delete/${bookId}`);
    // // Mementapkan properti Content-Type dan X-Auth-Token pada Header request
    // xhr.setRequestHeader("X-Auth-Token", "12345");
    // // Mengirimkan request
    // xhr.send();
  };

  const renderAllBooks = (books) => {
    const listBookElement = document.querySelector("#listBook");
    listBookElement.innerHTML = "";

    books.forEach((book) => {
      listBookElement.innerHTML += `
        <div class="col-lg-4 col-md-6 col-sm-12" style="margin-top: 12px;">
          <div class="card">
            <div class="card-body">
              <h5>(${book.id}) ${book.title}</h5>
              <p>${book.author}</p>
              <button type="button" class="btn btn-warning button-edit" data-title="${book.title}" data-author="${book.author}" id="${book.id}"><i class="fa-solid fa-pen-to-square"></i>&nbsp; Edit</button>
              <button type="button" class="btn btn-danger button-delete" id="${book.id}"><i class="fa-solid fa-trash-can"></i>&nbsp; Hapus</button>
            </div>
          </div>
        </div>
      `;
    });

    const buttons = document.querySelectorAll(".button-delete");
    buttons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const bookId = event.target.id;

        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            removeBook(bookId);
          }
        });
      });
    });

    const editButtons = document.querySelectorAll(".button-edit");
    editButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        buttonSave.style.display = "none";
        buttonUpdate.style.display = "inline-block";
        buttonEmpty.style.display = "inline-block";

        const bookId = event.target.id;
        const bookTitle = event.target.dataset.title;
        const bookAuthor = event.target.dataset.author;

        inputBookId.value = bookId;
        inputBookTitle.value = bookTitle;
        inputBookAuthor.value = bookAuthor;

        buttonUpdate.addEventListener("click", function () {
          const book = {
            id: Number.parseInt(inputBookId.value),
            title: inputBookTitle.value,
            author: inputBookAuthor.value,
          };

          updateBook(book);

          inputBookId.value = "";
          inputBookTitle.value = "";
          inputBookAuthor.value = "";
        });
      });
    });
  };

  const showResponseMessage = (
    message = "Check your internet connection",
    icon,
    title
  ) => {
    Swal.fire({
      icon: icon,
      title: title,
      text: message,
      confirmButtonColor: "#3085d6",
    });
  };

  document.addEventListener("DOMContentLoaded", () => {
    buttonSave.addEventListener("click", function () {
      const book = {
        id: Number.parseInt(inputBookId.value),
        title: inputBookTitle.value,
        author: inputBookAuthor.value,
      };

      insertBook(book);

      inputBookId.value = "";
      inputBookTitle.value = "";
      inputBookAuthor.value = "";
    });

    buttonEmpty.addEventListener("click", function () {
      buttonEmpty.style.display = "none";
      buttonUpdate.style.display = "none";
      buttonSave.style.display = "inline-block";

      inputBookId.value = "";
      inputBookTitle.value = "";
      inputBookAuthor.value = "";
    });

    getBook();
  });
}

export default main;
