export function metersSecondToKmh(speed) { 
    /** Convert Meter Second to Kilo meter */
   let result = speed * 3.6;
   return result;
}

export function checkUserInput( str ) {
    /** Check if user enter only letters in input */  
    let newStr = '';
    for ( let letter of str ) {
        if (isNaN(letter)) {
            newStr += letter;
        }
    }
    return newStr.toLowerCase();
}