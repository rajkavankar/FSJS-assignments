class Blog {
  constructor() {
    this.url = `https://jsonplaceholder.typicode.com/posts/`
  }
  async getArticles() {
    try {
      const response = await fetch(this.url)
      const result = await response.json()
      return result
    } catch (error) {
      console.log(error)
    }
  }
  async addArticles() {
    try {
      const response = await fetch(this.url, data, {
        method: "POST",
      })
      const result = await response.json()
      return result
    } catch (error) {
      console.log(error)
    }
  }
  async deleteArticle(id) {
    try {
      const response = await fetch(this.url + id, {
        method: "DELETE",
      })
      const result = await response.json()
      return result
    } catch (error) {
      console.log(error)
    }
  }
}

const blog = new Blog()

let blogSection = document.querySelector("#blog-section")
let deleteButton = document.querySelector("#delete")

const deleteArt = (id) => {
  return function () {
    try {
      blog.deleteArticle(id)
    } catch (error) {
      console.log(error)
    }
  }
}

document.addEventListener("DOMContentLoaded", (e) => {
  const fetchArticles = async () => {
    try {
      const articles = await blog.getArticles()
      articles.forEach((article) => {
        blogSection.innerHTML += blogCard(article)
      })
    } catch (error) {
      console.log(error)
    }
  }

  fetchArticles()
})

const blogCard = (blog) => {
  return `
        <div class="card card-body shadow-md my-3">
          <div class="row">
            <div class="col-10">
              <h2>${blog.title}</h2>
              <p>
                ${blog.body}
              </p>
            </div>
            <div class="col-2 d-flex justify-content-end align-items-center">
              <button id="delete" class="btn btn-danger btn-sm">Delete</button>
            </div>
          </div>
        </div>
`
}

deleteButton.addEventListener("click", (e, id) => {
  console.log(id)
  deleteArt(id)
})
