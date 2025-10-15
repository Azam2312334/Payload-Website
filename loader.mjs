/**
 * Custom ESM loader to handle CSS imports that cause issues with Next.js and Payload CMS
 * This loader intercepts CSS file imports and returns empty content to prevent parsing errors
 */
export async function resolve(specifier, context, defaultResolve) {
  // Check if the import is a CSS file
  if (specifier.endsWith('.css')) {
    // Return a data URL that represents an empty CSS module
    return {
      url: `data:text/javascript,export default ''`,
      format: 'module',
    }
  }

  // For all other imports, use the default resolver
  return defaultResolve(specifier, context)
}

export async function load(url, context, defaultLoad) {
  // Handle data URLs created by our resolve function
  if (url.startsWith('data:text/javascript')) {
    return {
      format: 'module',
      source: url.slice('data:text/javascript,'.length),
    }
  }

  // For all other loads, use the default loader
  return defaultLoad(url, context)
}
