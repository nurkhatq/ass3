const express = require('express')
const ejs = require('ejs')
var _ = require('lodash');
const app = express()

app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use(express.json())

const posts = [
  {
    title: "First Blog",
    content: " this is my first blog post"
  },
  {
    title: "Feedback",
    content: "I recently learned about Git and how to use GitHub for version control. I also enjoyed working with EJS for a web development assignment. It made coding and rendering web pages a lot easier."
  }
]

app.get('/', (req, res) => {
  res.render('home',
    {
      posts
    })
})

app.get('/compose', (req, res) => {
  res.render('compose')
})

app.post('/compose', (req, res) => {
  const postTitle = req.body.postTitle
  const postContent = req.body.postContent
  const postObj = {
    title: postTitle,
    content: postContent
  }
  posts.push(postObj)
  res.redirect('/')
})

app.get('/posts/:postID', (req, res) => {
  let postTitle = req.params.postID
  let postContent = ''
  let title = ''
  
  posts.forEach((post) => {
    title = post.title
    content = post.content
  })

  if (_.toLower(postTitle) == _.toLower(title)) {
    res.render(
      'post', 
      {
        title,
        content
      })
  }
})

app.listen(3000, () => {
  console.log('Server started on port 3000')
})
