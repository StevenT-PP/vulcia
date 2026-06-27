import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { Resvg } from '@resvg/resvg-js';

const __dir = dirname(fileURLToPath(import.meta.url));
const svgPath = resolve(__dir, '../public/og.svg');
const pngPath = resolve(__dir, '../public/og.png');

const svg = readFileSync(svgPath, 'utf-8');
const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } });
const pngData = resvg.render();
writeFileSync(pngPath, pngData.asPng());
console.log('OG image generated: public/og.png');
