const dev = process.env.NODE_ENV !== 'production'
/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'build',
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  output: dev ? 'standalone' : 'export',
  reactStrictMode: false,
  ...(dev
    ? {
      async rewrites() {
        return [
          {
            source: '/base/:path*',
            // destination: 'http://localhost:7777/base/:path*'
            destination: 'http://192.168.168.221:30342/base/:path*'
          }, // 49 
          {
            source: '/business/:path*',
            // destination: 'http://localhost:7777/business/:path*'
            destination: 'http://192.168.168.221:30342/business/:path*'
          },
          {
            source: '/gateway/:path*',
            // destination: 'http://localhost:7777/gateway/:path*'
            destination: 'http://192.168.168.221:30342/gateway/:path*'
          },
          {
            source: '/home/:path*',
            // destination: 'http://localhost:7777/gateway/:path*'
            destination: 'http://172.21.16.12:8080/home/:path*'
          }
        ]
      }
    }
    : {
      images: {
        unoptimized: false,
        loader: 'custom',
        loaderFile: './src/utils/image/loader.js'
      }
    })
}
export default nextConfig
