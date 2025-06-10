const puppeteer = require('puppeteer');
const NodeCache = require('node-cache');
const pdfCache = new NodeCache({ stdTTL: 3600 }); // 1h de caché

let browser;

async function getBrowser() {
  if (!browser) {
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: true,
      timeout: 10000
    });
  }
  return browser;
}

async function generatePDF(html, cacheKey) {
  // 1. Intenta devolver desde caché
  const cached = pdfCache.get(cacheKey);
  if (cached) return cached;

  const browser = await getBrowser();
  const page = await browser.newPage();
  try {
    await page.setContent(html, { waitUntil: 'networkidle0', timeout: 10000 });
    const pdfBuffer = await page.pdf({ format: 'A4', timeout: 10000 });
    pdfCache.set(cacheKey, pdfBuffer);
    return pdfBuffer;
  } finally {
    await page.close();
  }
}

// Al cerrar la app, cierra el navegador
process.on('exit', async () => {
  if (browser) await browser.close();
});

module.exports = { generatePDF };
