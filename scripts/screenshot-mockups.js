#!/usr/bin/env node

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const mockupsDir = path.join(__dirname, '../static/mockups');

const mockups = [
  {
    file: 'fraud-detection-dashboard.html',
    output: 'fraud-detection-dashboard.png',
    viewport: { width: 1400, height: 1200 }
  },
  {
    file: 'account-sharing-detection.html',
    output: 'account-sharing-detection.png',
    viewport: { width: 1400, height: 1600 }
  },
  {
    file: 'bot-detection-dashboard.html',
    output: 'bot-detection-dashboard.png',
    viewport: { width: 1600, height: 1400 }
  },
  {
    file: 'risk-auth-email.html',
    output: 'risk-auth-email.png',
    viewport: { width: 700, height: 900 }
  }
];

async function takeScreenshots() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: 'new'
  });

  try {
    for (const mockup of mockups) {
      const inputPath = path.join(mockupsDir, mockup.file);
      const outputPath = path.join(mockupsDir, mockup.output);

      if (!fs.existsSync(inputPath)) {
        console.log(`⚠️  Skipping ${mockup.file} (file not found)`);
        continue;
      }

      console.log(`📸 Taking screenshot of ${mockup.file}...`);
      
      const page = await browser.newPage();
      await page.setViewport(mockup.viewport);
      
      // Load the HTML file
      await page.goto(`file://${inputPath}`, {
        waitUntil: 'networkidle0',
        timeout: 30000
      });

      // Wait a bit for any animations or maps to load
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Take screenshot
      await page.screenshot({
        path: outputPath,
        fullPage: true
      });

      await page.close();
      console.log(`✅ Saved ${mockup.output}`);
    }
  } finally {
    await browser.close();
  }

  console.log('\n✨ All screenshots completed!');
}

// Run the script
takeScreenshots().catch(error => {
  console.error('Error taking screenshots:', error);
  process.exit(1);
});
