import Script from 'next/script'

interface SchemaOrgProps {
  schema: Record<string, any>
}

export function SchemaOrg({ schema }: SchemaOrgProps) {
  return (
    <Script
      id={`schema-${Math.random().toString(36).substr(2, 9)}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="beforeInteractive"
    />
  )
}