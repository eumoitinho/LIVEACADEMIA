/**
 * Strapi Example Page
 *
 * This page demonstrates how to fetch and display content from Strapi CMS.
 * It shows the pattern you should follow for all pages in the application.
 */

import { getUnits, getStrapiMediaUrl } from '@/lib/strapi';
import type { Unit } from '@/types/strapi';
import Image from 'next/image';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function StrapiExamplePage() {
  // Fetch units from Strapi
  const response = await getUnits();
  const units = response.data as Unit[];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Strapi CMS Example
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            This page fetches content from Strapi CMS. Edit content in the Strapi admin panel
            at{' '}
            <a
              href="http://localhost:1337/admin"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 hover:text-orange-700 underline"
            >
              http://localhost:1337/admin
            </a>
          </p>
        </div>

        {/* Units Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            All Units ({units.length})
          </h2>

          {units.length === 0 ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
              <p className="text-yellow-800">
                No units found. Add some units in the Strapi admin panel:
              </p>
              <p className="mt-2">
                <strong>Content Manager → Unit → Create new entry</strong>
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {units.map((unit) => {
                const { attributes } = unit;
                const imageUrl = attributes.mainPhoto?.data
                  ? getStrapiMediaUrl(attributes.mainPhoto.data.attributes.url)
                  : null;

                return (
                  <div
                    key={unit.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    {/* Unit Image */}
                    {imageUrl ? (
                      <div className="relative h-48 bg-gray-200">
                        <Image
                          src={imageUrl}
                          alt={attributes.mainPhoto?.data.attributes.alternativeText || attributes.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-48 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                        <span className="text-white text-4xl font-bold">
                          {attributes.name.charAt(0)}
                        </span>
                      </div>
                    )}

                    {/* Unit Info */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          {attributes.name}
                        </h3>
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded ${
                            attributes.type === 'diamante'
                              ? 'bg-purple-100 text-purple-800'
                              : attributes.type === 'premium'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {attributes.type}
                        </span>
                      </div>

                      <p className="text-gray-600 text-sm mb-4">
                        {attributes.address}
                      </p>

                      {/* Contact Info */}
                      <div className="space-y-2 text-sm">
                        {attributes.phone && (
                          <div className="flex items-center text-gray-600">
                            <span className="mr-2">📞</span>
                            {attributes.phone}
                          </div>
                        )}
                        {attributes.whatsapp && (
                          <div className="flex items-center text-gray-600">
                            <span className="mr-2">💬</span>
                            {attributes.whatsapp}
                          </div>
                        )}
                      </div>

                      {/* Features */}
                      {attributes.features && attributes.features.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <h4 className="text-xs font-semibold text-gray-700 mb-2">
                            Features:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {attributes.features.slice(0, 3).map((feature, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                              >
                                {feature.text}
                              </span>
                            ))}
                            {attributes.features.length > 3 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                +{attributes.features.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* View Link */}
                      <a
                        href={`/unidades/${attributes.slug}`}
                        className="mt-4 block w-full text-center bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-colors"
                      >
                        Ver Unidade
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Integration Guide */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-12">
          <h2 className="text-xl font-bold text-blue-900 mb-4">
            🚀 How to Use Strapi in Your Components
          </h2>

          <div className="space-y-4 text-sm text-blue-800">
            <div>
              <h3 className="font-semibold mb-2">1. Import the fetch function:</h3>
              <pre className="bg-white p-3 rounded border border-blue-300 overflow-x-auto">
                <code>{`import { getUnits } from '@/lib/strapi';`}</code>
              </pre>
            </div>

            <div>
              <h3 className="font-semibold mb-2">2. Fetch data in your component:</h3>
              <pre className="bg-white p-3 rounded border border-blue-300 overflow-x-auto">
                <code>{`const response = await getUnits();
const units = response.data;`}</code>
              </pre>
            </div>

            <div>
              <h3 className="font-semibold mb-2">3. Handle media URLs:</h3>
              <pre className="bg-white p-3 rounded border border-blue-300 overflow-x-auto">
                <code>{`import { getStrapiMediaUrl } from '@/lib/strapi';

const imageUrl = getStrapiMediaUrl(unit.attributes.mainPhoto?.data.attributes.url);`}</code>
              </pre>
            </div>

            <div>
              <h3 className="font-semibold mb-2">4. Enable ISR (Incremental Static Regeneration):</h3>
              <pre className="bg-white p-3 rounded border border-blue-300 overflow-x-auto">
                <code>{`export const revalidate = 60; // Revalidate every 60 seconds`}</code>
              </pre>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-blue-300">
            <h3 className="font-semibold text-blue-900 mb-2">
              📚 Available Fetch Functions:
            </h3>
            <ul className="list-disc list-inside space-y-1 text-blue-800">
              <li><code>getGlobalSettings()</code> - Global site settings</li>
              <li><code>getHomepage()</code> - Homepage content</li>
              <li><code>getUnits()</code> - All gym units</li>
              <li><code>getUnitBySlug(slug)</code> - Single unit by slug</li>
              <li><code>getPlans()</code> - All membership plans</li>
              <li><code>getModalities()</code> - All class modalities</li>
              <li><code>getBenefits()</code> - All benefits</li>
              <li><code>getTestimonials()</code> - All testimonials</li>
              <li><code>getContactPage()</code> - Contact page content</li>
              <li><code>getAboutPage()</code> - About page content</li>
              <li><code>getTrabalheConoscoPage()</code> - Careers page content</li>
              <li><code>getDayUsePage()</code> - Day use page content</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
