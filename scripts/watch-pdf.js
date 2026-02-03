import {watch} from 'fs';
import {spawn} from 'child_process';
import {fileURLToPath} from 'url';
import {dirname, join} from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

let buildInProgress = false;

function generatePDF() {
  if (buildInProgress) {
    console.log('Build already in progress, skipping...');
    return;
  }

  buildInProgress = true;
  console.log('\n🔨 Rebuilding PDF...');

  const build = spawn('npm', ['run', 'build:pdf'], {
    cwd: rootDir,
    shell: true,
    stdio: 'inherit',
  });

  build.on('close', code => {
    buildInProgress = false;
    if (code === 0) {
      console.log('✅ PDF updated successfully');
    } else {
      console.log('❌ PDF generation failed');
    }
  });
}

console.log('👀 Watching for changes...');
console.log('Watching: content/, src/');

// Watch content directory
const contentWatcher = watch(
  join(rootDir, 'content'),
  {recursive: true},
  (eventType, filename) => {
    if (filename) {
      console.log(`\n📝 Detected change: ${filename}`);
      generatePDF();
    }
  }
);

// Watch src directory
const srcWatcher = watch(
  join(rootDir, 'src'),
  {recursive: true},
  (eventType, filename) => {
    if (filename) {
      console.log(`\n📝 Detected change: ${filename}`);
      generatePDF();
    }
  }
);

// Generate initial PDF
generatePDF();

// Handle cleanup
process.on('SIGINT', () => {
  console.log('\n👋 Stopping watchers...');
  contentWatcher.close();
  srcWatcher.close();
  process.exit(0);
});
