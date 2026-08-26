import esbuild from 'esbuild';

const production = process.argv[2] === 'production';
const context = await esbuild.context({
  banner: {
    js: '/* Obsidian plugin: VitePress Butterfly */',
  },
  bundle: true,
  entryPoints: ['src/main.ts'],
  external: ['obsidian', 'electron'],
  format: 'cjs',
  logLevel: 'info',
  outfile: 'main.js',
  platform: 'browser',
  sourcemap: production ? false : 'inline',
  target: 'es2021',
});

if (production) {
  await context.rebuild();
  await context.dispose();
} else {
  await context.watch();
}
