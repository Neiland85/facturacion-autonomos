const { format, parseISO, addDays, subDays, isBefore, isAfter } = require('date-fns');

/**
 * Formatea una fecha a string legible.
 * @param {Date|string} date
 * @param {string} dateFormat
 * @returns {string}
 */
function formatDate(date, dateFormat = 'yyyy-MM-dd') {
  return format(typeof date === 'string' ? parseISO(date) : date, dateFormat);
}

module.exports = {
  format,
  parseISO,
  addDays,
  subDays,
  isBefore,
  isAfter,
  formatDate,
};
