// uno.config.ts
import { defineConfig, presetTypography, presetUno } from 'unocss';

export default defineConfig({
	presets: [presetUno(), presetTypography()],
	theme: {
		colors: {
			g400: '#7CBC66',
			g500: '#3E823B',
			g600: '#004910',
			r400: '#C1111F',
			r500: '#9C0910',
			r600: '#780001',
			c400: '#FFFDF9',
			c500: '#FFF9EB',
			c600: '#FDF0D5',
			dark: '#001304'
		}
	}
});
