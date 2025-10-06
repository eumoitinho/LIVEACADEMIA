import React from 'react'
import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { PortableTextComponents } from '@portabletext/react'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!
export const apiVersion = '2024-10-01'

export const client = createClient({ projectId, dataset, apiVersion, useCdn: true })

const builder = imageUrlBuilder({ projectId, dataset })
export const urlFor = (src: any) => builder.image(src)

export const portableComponents: PortableTextComponents = {
  marks: {
    link: ({ value, children }: { value?: any; children?: React.ReactNode }) => {
      const target = value?.blank || (value?.href && value.href.startsWith('http')) ? '_blank' : undefined
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="underline decoration-dotted underline-offset-4 hover:text-live-yellow transition-colors"
        >
          {children}
        </a>
      )
    },
  },
}
