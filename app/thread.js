const httpRequestToBackend = require('./http_request')
const htmlDefuse = require('./html_defuse')
const fmt = require('./format')

function renderError (error) {
  return 'Error ' + error.message
}

const threadHandler = (req, res) => {
  const config = req.app.locals.config
  const options = {
    host: config.backend_hostname,
    port: config.backend_port,
    path: '/post/' + req.params.thread_id
  }

  httpRequestToBackend(options)
    .then((resBody) => {
      const thread = resBody.payload.thread_data
      thread.message = fmt.formatMessage(htmlDefuse(thread.message))
      thread.timestamp = fmt.formatTimestamp(thread.timestamp)
      const posts = thread.replies
      posts.forEach((post) => {
        post.message = fmt.formatMessage(htmlDefuse(post.message))
        post.timestamp = fmt.formatTimestamp(post.timestamp)
      })
      res.render('thread', {
        tag: req.params.tag,
        thread,
        posts
      })
    })
    .catch((error) => {
      res.send(renderError(error))
    })
}

module.exports = threadHandler
