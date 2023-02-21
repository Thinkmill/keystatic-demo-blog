import { DocumentRendererProps } from 'keystatic/renderer'

export const renderers: DocumentRendererProps['renderers'] = {
  inline: {},
  block: {
    heading: ({ level, children, textAlign }) => {
      return level === 1 ? (
        <h1 style={{ textAlign }}>{children}</h1>
      ) : level === 2 ? (
        <h2 style={{ textAlign }}>{children}</h2>
      ) : level === 3 ? (
        <h3 style={{ textAlign }}>{children}</h3>
      ) : level === 4 ? (
        <h4 style={{ textAlign }}>{children}</h4>
      ) : level === 5 ? (
        <h5 style={{ textAlign }}>{children}</h5>
      ) : (
        <h6 style={{ textAlign }}>{children}</h6>
      )
    },
  },
}
