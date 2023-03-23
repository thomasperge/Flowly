function formatNumber(number) {
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

console.log(
    formatNumber(125),
    formatNumber(2500000),
    formatNumber(4500000000),
    formatNumber(-75000),
);