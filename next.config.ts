import type { NextConfig } from "next";
import { join } from "path";

const nextConfig: NextConfig = {
  compress: true,
  reactCompiler: true,
  cacheComponents: true,
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
  turbopack: {
    root: join(__dirname, "."),
  },
};

export default nextConfig;
