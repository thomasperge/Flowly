const solds = 1250; 

const number = (solds >= 1000000000 && solds < 1000000000000) ? { divisor: 1000000000, postfix: "B" }: (solds >= 1000000 && solds < 1000000000) ? { divisor: 1000000, postfix: "M" }: (solds >= 1000 && solds < 1000000) ? { divisor: 1000, postfix: "K" }: { divisor: 1, postfix: null }; 

const floor = Math.floor(solds / number.divisor).toLocaleString();
const firstDecimalIndex = solds.toLocaleString().charAt(floor.length+1);
const secondDecimalIndex = solds.toLocaleString().charAt(floor.length+2);

const after1 = (firstDecimalIndex.length > 0) ? firstDecimalIndex : 0
const after2 = (secondDecimalIndex.length > 0) ? secondDecimalIndex : 0
const afterPrefix = (number.postfix != null) ? number.postfix : 0

let final

if (after1 != 0 && after2 != 0 && afterPrefix != 0) {
    final = firstDecimalIndex.match("0")? floor + number.postfix: floor + "." + after1 + after2 + number.postfix; 
} else {
    final = solds
}

console.log(final);