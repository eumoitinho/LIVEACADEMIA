// Client-only wrapper for rendering Sanity NextStudio
"use client"

import React from 'react'
import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity/config'

export default function StudioClient() {
  return (
    <div className="min-h-screen bg-neutral-950">
      <NextStudio config={config} />
    </div>
  )
}
