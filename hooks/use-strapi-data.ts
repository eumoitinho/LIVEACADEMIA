'use client';

import { useState, useEffect } from 'react';
import type { Homepage, Unit, Plan, Modality, Benefit, Testimonial } from '@/types/strapi';

/**
 * Hook to fetch homepage data from Strapi
 */
export function useStrapiHomepage() {
  const [data, setData] = useState<Homepage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch('/api/strapi/homepage');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching Strapi homepage:', err);
        setError('Erro ao carregar dados da homepage do Strapi');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
}

/**
 * Hook to fetch units from Strapi
 */
export function useStrapiUnits() {
  const [data, setData] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch('/api/strapi/units');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result.data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching Strapi units:', err);
        setError('Erro ao carregar unidades do Strapi');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
}

/**
 * Hook to fetch plans from Strapi
 */
export function useStrapiPlans() {
  const [data, setData] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch('/api/strapi/plans');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result.data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching Strapi plans:', err);
        setError('Erro ao carregar planos do Strapi');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
}

