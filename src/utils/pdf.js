const PDFDocument = require('pdfkit');

/**
 * Genera un PDF básico con contenido.
 * @param {string} content
 * @returns {PDFDocument}
 */
function createPDF(content) {
  const doc = new PDFDocument();
  doc.text(content);
  doc.end();
  return doc;
}

module.exports = { createPDF };
