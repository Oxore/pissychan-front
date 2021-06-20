describe('markdown', function () {
  const markdown = require('../app/markdown')

  const fencesMultiline = '```\nfences<strong>asdf</strong>\n```'
  const fencesMultilineConverted = '<pre><code>fences<strong>asdf</strong></code></pre>'
  const fencesMultiline2 = '```\nfences\na\nb\n```'
  const fencesMultiline2Converted = '<pre><code>fences\na\nb</code></pre>'
  const fencesInline = '```fences<strong>asdf</strong>```'
  const fencesInlineConverted = '<code>fences<strong>asdf</strong></code>'
  const codeInline = '`fences<strong>asdf</strong>`'
  const codeInlineConverted = fencesInlineConverted
  const codeIndent = '    code\n    <strong>asdf</strong>\n'
  const codeIndentConverted = '<pre><code>code\n<strong>asdf</strong></code></pre>'
  const quote = '> quote'
  const list = '- list'
  const heading = '# Heading'
  const table = '|Header1 |Header2\n--- | ---\n|data1|data2|'
  const nptable = 'Header1 |Header2\n--- | ---\ndata1|data2|'

  it('does not saniteze multiline fences block', function () {
    expect(markdown(fencesMultiline)).toEqual(fencesMultilineConverted)
  })

  it('does not saniteze inline fences block', function () {
    expect(markdown(fencesInline)).toEqual(fencesInlineConverted)
  })

  it('does not saniteze inline code block', function () {
    expect(markdown(codeInline)).toEqual(codeInlineConverted)
  })

  it('does not saniteze indented multilen code block', function () {
    expect(markdown(codeIndent)).toEqual(codeIndentConverted)
  })

  it('keeps newlines in fences block', function () {
    expect(markdown(fencesMultiline2)).toEqual(fencesMultiline2Converted)
  })

  it('ignores quote', function () {
    expect(markdown(quote)).toEqual(quote)
  })

  it('ignores lists', function () {
    expect(markdown(list)).toEqual(list)
  })

  it('ignores heading', function () {
    expect(markdown(heading)).toEqual(heading)
  })

  it('ignores table', function () {
    expect(markdown(table)).toEqual(table)
  })

  it('ignores nptable', function () {
    expect(markdown(nptable)).toEqual(nptable)
  })
})
