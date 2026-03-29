import { useState } from 'react'

export default function ExampleCard({ tag, tagVariant, title, description, code }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <article className={`card`}>
      <div className="card-header">
        <span className={`tag tag-${tagVariant}`}>{tag}</span>
        <h2>{title}</h2>
      </div>
      <p className="card-desc">{description}</p>
      <pre><code>{code}</code></pre>
      <button className="copy-btn" onClick={handleCopy}>
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </article>
  )
}
