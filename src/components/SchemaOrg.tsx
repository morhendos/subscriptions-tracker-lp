import Script from 'next/script'
import { useMemo } from 'react'

interface SchemaOrgProps {
  schema: Record<string, any>;
  id?: string;
}

/**
 * Component for adding structured data (Schema.org) to a page
 * 
 * Using a deterministic ID based on schema content to avoid hydration mismatches
 */
export function SchemaOrg({ schema, id }: SchemaOrgProps) {
  // Create a stable ID by hashing schema content - or use provided ID
  const stableId = useMemo(() => {
    if (id) return id;
    
    // Use a simple hash of the stringified schema to create a stable ID
    const schemaStr = JSON.stringify(schema);
    const hash = Array.from(schemaStr)
      .reduce((hash, char) => (hash << 5) - hash + char.charCodeAt(0), 0)
      .toString(36)
      .replace('-', '');
    
    return `schema-${hash.substring(0, 8)}`;
  }, [schema, id]);

  return (
    <Script
      id={stableId}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="beforeInteractive"
    />
  )
}