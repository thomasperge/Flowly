/**
 * Add Transition to 0 => 1 opacity
 * @param {*} element 
 * @param {*} time 
 */
export function transitionOpacity(element, time) {
    element.style.opacity = 0;

    var op = 0;
    var interval = 50;
    var duration = time;
    var step = 1 / (duration / interval);
    var timer = setInterval(function() {
        if (op >= 1) {
            clearInterval(timer);
        }
        element.style.opacity = op;
        op += step;
    }, interval);
}

/**
 * Convert number: 1200 => 1.2k
 * @param {*} number 
 * @returns number modified into string
 */
export function formatNumber(number) {
    const prefixes = ['', 'K', 'M', 'B'];
    const base = 1000;
  
    const isNegative = number < 0;
    number = Math.abs(number);
  
    if (number < base) {
      return isNegative ? '-' + number : number.toString();
    }
  
    const log = Math.floor(Math.log10(number) / Math.log10(base));
    const prefix = prefixes[log];
  
    const value = number / Math.pow(base, log);
  
    const formattedValue = value.toFixed(2);
  
    return (isNegative ? '-' : '') + formattedValue + prefix;
}