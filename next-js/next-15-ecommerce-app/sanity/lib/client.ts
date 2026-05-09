import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, vercelURL, viewToken } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  stega: {
    studioUrl: `${vercelURL}/studio`
  },
  token: viewToken,
})
