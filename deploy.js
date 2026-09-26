const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

// Load environment variables from .env if present
if (fs.existsSync(path.join(__dirname, '.env'))) {
  const envContent = fs.readFileSync(path.join(__dirname, '.env'), 'utf8');
  envContent.split('\n').forEach(line => {
    const [key, ...vals] = line.split('=');
    if (key && vals.length) {
      process.env[key.trim()] = vals.join('=').trim();
    }
  });
}

const SITE_ID = process.env.NETLIFY_SITE_ID || '2e10eee4-48d5-433d-a858-284499b2f51b';
const TOKEN = process.env.NETLIFY_AUTH_TOKEN || 'nfp_tvPC5iC9sGUdFf1i3JrwoGJSfCL25fCo79e9';

if (!SITE_ID || !TOKEN) {
  console.error('❌ Missing NETLIFY_SITE_ID or NETLIFY_AUTH_TOKEN');
  process.exit(1);
}

console.log('📦 Packing website files...');
const zipPath = path.join(__dirname, 'deploy_package.zip');
if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);

try {
  execSync(`tar.exe -caf "${zipPath}" --exclude="*.mp4" index.html assets netlify.toml`);
  console.log(`📦 Package created successfully (${(fs.statSync(zipPath).size / 1024 / 1024).toFixed(2)} MB)`);
} catch (err) {
  console.error('❌ Failed to create zip package:', err);
  process.exit(1);
}

console.log('🚀 Uploading to Netlify...');
const fileData = fs.readFileSync(zipPath);

const req = https.request({
  hostname: 'api.netlify.com',
  path: `/api/v1/sites/${SITE_ID}/deploys`,
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${TOKEN}`,
    'Content-Type': 'application/zip',
    'Content-Length': fileData.length
  }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);
    try {
      const json = JSON.parse(data);
      if (json.ssl_url || json.url) {
        console.log('\n🎉 SUCCESS! Website deployed directly to Netlify!');
        console.log('🌐 Live URL :', json.ssl_url || json.url);
        console.log('⚙️ Admin URL:', json.admin_url);
      } else {
        console.error('❌ Netlify API Error:', json);
      }
    } catch (e) {
      console.error('❌ Invalid response from Netlify:', data);
    }
  });
});

req.on('error', (err) => {
  if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);
  console.error('❌ Network error during deployment:', err);
});

req.write(fileData);
req.end();
