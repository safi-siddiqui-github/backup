import { LayoutDashboard, Globe, Smartphone, Code } from 'lucide-react';


export default function WebsiteBuilderHomeHeader() {
  return (
    <div className="w-full mx-auto max-w-8xl   dark:bg-gray-900  ">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
        <div className="shrink-0 p-4 bg-blue-100 dark:bg-blue-900 rounded-lg">
          <LayoutDashboard className="w-7 h-7 text-blue-600 dark:text-blue-300" />
        </div>
        
        <div className="grow text-center sm:text-left">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Event Website Builder
          </h1>
          <p className="mt-1 text-base text-gray-600 dark:text-gray-300">
            Create stunning websites for your events with professional templates
          </p>
        </div>
      </div>
      
      <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-4">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
          <Globe className="w-4 h-4" />
          Custom Domains Available
        </span>
        
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
          <Smartphone className="w-4 h-4" />
          Mobile Responsive
        </span>
        
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
          <Code className="w-4 h-4" />
          SEO Optimized
        </span>
      </div>
    </div>
  );
}