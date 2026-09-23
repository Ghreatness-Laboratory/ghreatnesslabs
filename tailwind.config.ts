import type { Config } from 'tailwindcss';
export default { content:['./app/**/*.{ts,tsx}','./components/**/*.{ts,tsx}'], theme:{extend:{colors:{navy:'#0B1E3C', cyan:'#2EC4E6', ink:'#08111f'}, fontFamily:{sans:['var(--font-inter)','Arial','sans-serif']}}}, plugins:[] } satisfies Config;
