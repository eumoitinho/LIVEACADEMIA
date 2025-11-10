import { useState, useEffect } from 'react'
import {
  getHomepageData,
  getUnits,
  getPlans,
  getBenefits,
  getTestimonials,
  getAppFeatures,
  getModalities,
  getStructureFeatures,
  getWellhubFeatures,
  getBioimpedanciaFeatures,
  getAppSectionData,
  getBeneficiosSectionData
} from '@/lib/sanity'
import type {
  HomepageContent,
  Unit,
  Plano,
  Benefit,
  Testimonial,
  AppFeature,
  Modality,
  StructureFeature,
  WellhubFeature,
  BioimpedanciaFeature,
  AppSectionData,
  BeneficiosSection
} from '@/types/sanity'

export function useHomepageData() {
  const [data, setData] = useState<HomepageContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const homepageData = await getHomepageData()
        setData(homepageData)
        setError(null)
      } catch (err) {
        console.error('Error fetching homepage data:', err)
        setError('Erro ao carregar dados da homepage')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}

export function useUnitsData() {
  const [data, setData] = useState<Unit[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const unitsData = await getUnits()
        setData(unitsData)
        setError(null)
      } catch (err) {
        console.error('Error fetching units data:', err)
        setError('Erro ao carregar dados das unidades')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}

export function usePlansData() {
  const [data, setData] = useState<Plano[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const plansData = await getPlans()
        setData(plansData)
        setError(null)
      } catch (err) {
        console.error('Error fetching plans data:', err)
        setError('Erro ao carregar dados dos planos')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}

export function useBenefitsData() {
  const [data, setData] = useState<Benefit[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const benefitsData = await getBenefits()
        setData(benefitsData)
        setError(null)
      } catch (err) {
        console.error('Error fetching benefits data:', err)
        setError('Erro ao carregar dados dos benefícios')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}

export function useTestimonialsData() {
  const [data, setData] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const testimonialsData = await getTestimonials()
        setData(testimonialsData)
        setError(null)
      } catch (err) {
        console.error('Error fetching testimonials data:', err)
        setError('Erro ao carregar dados dos depoimentos')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}

export function useAppFeaturesData() {
  const [data, setData] = useState<AppFeature[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const appFeaturesData = await getAppFeatures()
        setData(appFeaturesData)
        setError(null)
      } catch (err) {
        console.error('Error fetching app features data:', err)
        setError('Erro ao carregar dados dos recursos do app')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}

export function useModalitiesData() {
  const [data, setData] = useState<Modality[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const modalitiesData = await getModalities()
        setData(modalitiesData)
        setError(null)
      } catch (err) {
        console.error('Error fetching modalities data:', err)
        setError('Erro ao carregar dados das modalidades')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}

export function useStructureFeaturesData() {
  const [data, setData] = useState<StructureFeature[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const structureFeaturesData = await getStructureFeatures()
        setData(structureFeaturesData)
        setError(null)
      } catch (err) {
        console.error('Error fetching structure features data:', err)
        setError('Erro ao carregar dados dos recursos da estrutura')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}

export function useWellhubFeaturesData() {
  const [data, setData] = useState<WellhubFeature[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const wellhubFeaturesData = await getWellhubFeatures()
        setData(wellhubFeaturesData)
        setError(null)
      } catch (err) {
        console.error('Error fetching wellhub features data:', err)
        setError('Erro ao carregar dados dos recursos do Wellhub')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}

export function useBioimpedanciaFeaturesData() {
  const [data, setData] = useState<BioimpedanciaFeature[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const bioimpedanciaFeaturesData = await getBioimpedanciaFeatures()
        setData(bioimpedanciaFeaturesData)
        setError(null)
      } catch (err) {
        console.error('Error fetching bioimpedancia features data:', err)
        setError('Erro ao carregar dados dos recursos da bioimpedância')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}

export function useAppSectionData() {
  const [data, setData] = useState<AppSectionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const appSectionData = await getAppSectionData()
        setData(appSectionData)
        setError(null)
      } catch (err) {
        console.error('Error fetching app section data:', err)
        setError('Erro ao carregar dados da seção do app')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}

export function useBeneficiosSectionData() {
  const [data, setData] = useState<BeneficiosSection | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const beneficiosSectionData = await getBeneficiosSectionData()
        setData(beneficiosSectionData)
        setError(null)
      } catch (err) {
        console.error('Error fetching beneficios section data:', err)
        setError('Erro ao carregar dados da seção de benefícios')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}