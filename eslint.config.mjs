import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'

export default defineConfig([
  ...nextVitals,
  globalIgnores(['.next/**', 'dist/**', '.vinext/**', '.wrangler/**', 'next-env.d.ts', 'worker-configuration.d.ts']),
])
