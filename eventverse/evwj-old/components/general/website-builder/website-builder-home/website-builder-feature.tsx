import { Type, Smartphone, Globe } from 'lucide-react';
import { RiGalleryUploadFill } from 'react-icons/ri';

export default function WebsiteBuilderFeatures() {
  return (
    <div className="w-full mb-8  max-w-8xl mx-auto px-2 py-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
      
      <div className=" mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Website Builder Features
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Everything you need to create professional event websites
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        
        <div className="flex flex-col items-center text-center">
          <div className="flex-shrink-0 p-3 rounded-lg bg-purple-100 dark:bg-purple-900">
            <Type className="w-6 h-6 text-purple-600 dark:text-purple-300" />
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Drag & Drop Editor
            </h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              Easy-to-use visual editor with drag and drop functionality
            </p>
          </div>
        </div>
        
        <div className="flex flex-col items-center text-center">
          <div className="flex-shrink-0 p-3 rounded-lg bg-green-100 dark:bg-green-900">
            <Smartphone className="w-6 h-6 text-green-600 dark:text-green-300" />
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Mobile Responsive
            </h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              All templates are optimized for mobile and tablet devices
            </p>
          </div>
        </div>
        
        <div className="flex flex-col items-center text-center">
          <div className="flex-shrink-0 p-3 rounded-lg bg-blue-100 dark:bg-blue-900">
            <Globe className="w-6 h-6 text-blue-600 dark:text-blue-300" />
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Custom Domains
            </h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              Connect your own domain name for professional branding
            </p>
          </div>
        </div>
        
        <div className="flex flex-col items-center text-center">
          <div className="flex-shrink-0 p-3 rounded-lg bg-orange-100 dark:bg-orange-900">
            <RiGalleryUploadFill className="w-6 h-6 text-orange-600 dark:text-orange-300"   />
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Media Integration
            </h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              Seamlessly integrate photos from your media module
            </p>
          </div>
        </div>
        
      </div>
    </div>
  );
}