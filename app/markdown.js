const marked = require('marked')

const tokenizerCode = {
  paragraph: _ => {},
  strong: _ => {},
  blockquote: _ => {},
  list: _ => {},
  heading: _ => {},
  table: _ => {},
  nptable: _ => {},
  codespan: function (src) {
    const cap = this.rules.inline.code.exec(src)
    if (cap) {
      let text = cap[2].replace(/\n/g, ' ')
      const hasNonSpaceChars = /[^ ]/.test(text)
      const hasSpaceCharsOnBothEnds = /^ /.test(text) && / $/.test(text)
      if (hasNonSpaceChars && hasSpaceCharsOnBothEnds) {
        text = text.substring(1, text.length - 1)
      }
      return {
        type: 'codespan',
        raw: cap[0],
        text
      }
    }
  },
  inlineText (src, inRawBlock, smartypants) {
    const cap = this.rules.inline.text.exec(src)
    if (cap) {
      const text = cap[0]
      return {
        type: 'text',
        raw: cap[0],
        text
      }
    }
  }
}

const rendererCode = {
  code: text => '<pre><code>' + text + '</code></pre>',
  codespan: text => '<code>' + text + '</code>',
  paragraph: text => text
}

marked.use({
  renderer: rendererCode,
  tokenizer: tokenizerCode,
  sanitizer: false
})

module.exports = marked
