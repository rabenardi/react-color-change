import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// tambahan
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
