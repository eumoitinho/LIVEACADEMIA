import { useState, useEffect } from 'react'
import { client } from '@/src/lib/sanity'

export interface GlobalSettings {
  contact: {
    phone: string
    whatsapp: string
    email: string
  }
  socialMedia: {
    instagram?: string
    facebook?: string
    youtube?: string
  }
  appUrls: {
    appStoreUrl?: string
    playStoreUrl?: string
  }
  globalCTAs: {
    primaryCTA: string
    secondaryCTA: string
    plansCTA: string
    consultorCTA: string
  }
  floatingButtons: Array<{
    label: string
    type: 'phone' | 'whatsapp' | 'instagram' | 'email'
    url: string
    icon: string
    order: number
    active: boolean
  }>
  general: {
    companyName: string
    tagline?: string
    address?: string
    workingHours: string
  }
}

// Fallback data
const defaultSettings: GlobalSettings = {
  contact: {
    phone: '+5592999999999',
    whatsapp: '5592999999999',
    email: 'contato@liveacademia.com.br'
  },
  socialMedia: {
    instagram: 'https://www.instagram.com/liveacademiamanaus/',
    facebook: '',
    youtube: ''
  },
  appUrls: {
    appStoreUrl: '',
    playStoreUrl: ''
  },
  globalCTAs: {
    primaryCTA: 'MATRICULE-SE AGORA',
    secondaryCTA: 'SAIBA MAIS',
    plansCTA: 'Ver planos e preços',
    consultorCTA: 'Falar com consultor'
  },
  floatingButtons: [
    {
      label: 'Telefone',
      type: 'phone',
      url: 'tel:+5592999999999',
      icon: 'Phone',
      order: 1,
      active: true
    },
    {
      label: 'WhatsApp',
      type: 'whatsapp',
      url: 'https://wa.me/5592999999999',
      icon: 'MessageCircle',
      order: 2,
      active: true
    },
    {
      label: 'Instagram',
      type: 'instagram',
      url: 'https://www.instagram.com/liveacademiamanaus/',
      icon: 'Instagram',
      order: 3,
      active: true
    }
  ],
  general: {
    companyName: 'Live Academia',
    tagline: '',
    address: '',
    workingHours: 'Seg-Dom: 6h às 23h'
  }
}

export function useGlobalSettings() {
  const [data, setData] = useState<GlobalSettings>(defaultSettings)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGlobalSettings = async () => {
      try {
        setLoading(true)
        setError(null)

        const query = `*[_type == "globalSettings" && _id == "globalSettings"][0] {
          contact,
          socialMedia,
          appUrls,
          globalCTAs,
          floatingButtons[] {
            label,
            type,
            url,
            icon,
            order,
            active
          },
          general
        }`

        const result = await client.fetch(query)

        if (result) {
          // Merge com fallback para garantir que todos os campos existam
          setData({
            contact: { ...defaultSettings.contact, ...result.contact },
            socialMedia: { ...defaultSettings.socialMedia, ...result.socialMedia },
            appUrls: { ...defaultSettings.appUrls, ...result.appUrls },
            globalCTAs: { ...defaultSettings.globalCTAs, ...result.globalCTAs },
            floatingButtons: result.floatingButtons?.length > 0
              ? result.floatingButtons.sort((a: any, b: any) => a.order - b.order).filter((btn: any) => btn.active)
              : defaultSettings.floatingButtons,
            general: { ...defaultSettings.general, ...result.general }
          })
        } else {
          setData(defaultSettings)
        }
      } catch (err) {
        console.error('Error fetching global settings:', err)
        setError(err instanceof Error ? err.message : 'Erro ao carregar configurações')
        setData(defaultSettings)
      } finally {
        setLoading(false)
      }
    }

    fetchGlobalSettings()
  }, [])

  return { data, loading, error }
}

// Hook específico para floating buttons
export function useFloatingButtons() {
  const { data, loading, error } = useGlobalSettings()
  return {
    buttons: data.floatingButtons,
    loading,
    error
  }
}

// Hook específico para CTAs
export function useGlobalCTAs() {
  const { data, loading, error } = useGlobalSettings()
  return {
    ctas: data.globalCTAs,
    loading,
    error
  }
}

// Hook específico para contato
export function useContactInfo() {
  const { data, loading, error } = useGlobalSettings()
  return {
    contact: data.contact,
    socialMedia: data.socialMedia,
    loading,
    error
  }
}