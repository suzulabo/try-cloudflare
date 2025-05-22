import { defineConfig } from 'vite';
import { virtualCloudflareWorkersPlugin } from './virtualCloudflareWorkersPlugin';

export default defineConfig({
  plugins: [virtualCloudflareWorkersPlugin],
});
