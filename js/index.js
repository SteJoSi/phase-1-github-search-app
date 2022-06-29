// you can also do defer in the script tag, or move the script tag to the bottom of the body - you'll have to see which will work best with the browser. In this case, below does not work and i used defer in the script tag instead

// document.addEventListener('DOMContentLoaded', () => {
//     console.log('Content Loaded')
// })

// 1.) The index.html file has a form with a search input. When the form is submitted, it should take the value of the input and search GitHub for user matches using the User Search Endpoint.
const form = document.getElementById("github-form")
form.addEventListener("submit", (event) => {
    event.preventDefault()
//DATA WE WANT TO PASS FROM THE FORM
    event.target[0].value
    fetch(`https://api.github.com/search/users?q=${event.target[0].value}`)
    .then(response => response.json())
    .then(response => {
// 2.) Using the results of the search, display information about the users to the page. (You might include showing their username, avatar and a link to their profile

        //username, avatar_url, and url
        const userList = document.querySelector("#user-list")
        const repoList = document.getElementById("repos-list")
// clears it first so then we can add the new stuff - allows us to start fresh when new info is entered in the search bar
        userList.innerHTML = ""
        repoList.innerHTML = ""

        response.items.map(item => {
            const li = document.createElement("li")
            const h2 = document.createElement("h2")
            h2.textContent = item.login

           h2.addEventListener("click", e => showUserRepos(item.login, e))
            const img = document.createElement("img")
            img.src = item.avatar_url
            
            const userList = document.querySelector("#user-list")
            li.append(h2, img)
            userList.append(li)
        })
    })
    form.reset()
})
// 3.) Clicking on one of these users should send a request to the User Repos Endpoint and return data about all the repositories for that user.

function showUserRepos(username, e) {
    const repoList = document.getElementById("repos-list")
// clears it to where we are taking out the old stuff and put in the new stuff
    repoList.innerHTML = ""
    e.preventDefault()
    fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => response.json())
    .then(response => response.map(repo =>{
        const li = document.createElement("li")
        const h1 = document.createElement("h1")
        h1.textContent = repo.name
        li.append(h1)
        repoList.append(li)
    }))
}