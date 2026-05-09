import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  },

  // Webpack configuration
  webpack: (config, { isServer }) => {
    // Exclude problematic directories on Windows
    config.watchOptions = {
      ...config.watchOptions,
      ignored: [
        '**/node_modules/**',
        '**/.git/**',
        '**/.next/**',
        '**/dist/**',
        '**/build/**',
        // Windows specific exclusions
        '**/Cookies/**',
        '**/AppData/**',
        '**/Local Settings/**',
        '**/Temporary Internet Files/**',
        '**/Windows/**',
        '**/System Volume Information/**',
        '**/Recovery/**',
        '**/Program Files/**',
        '**/Program Files (x86)/**',
        '**/ProgramData/**',
      ],
    };

    // Additional webpack configuration to prevent scanning system directories
    config.resolve = {
      ...config.resolve,
      fallback: {
        ...config.resolve?.fallback,
        fs: false,
        path: false,
        os: false,
      },
    };

    return config;
  },
};

export default nextConfig;
