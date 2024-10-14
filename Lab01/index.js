//1. Capitalize first word
function capital (str){
    const words = str.split(' ');
    const capitalword = words.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return capitalword.join (' ');

}

const givenstring = "the quick brown fox";
const capitalstr = capital(givenstring);
console.log(capitalstr);

//2.find largest number
    function maxnum(a, b, c){
        return Math.max(a, b, c);
    }
    console.log(maxnum (1,0,1));
    console.log(maxnum (0,-10,-20));
    console.log(maxnum (1000,510,440));
//3.move last three characters
function right(str) {
    if (str.length >= 3) {
        return str.slice(-3) + str.slice(0, -3);
    } else {
        return str; 
    }
}

console.log(right("Python"));
console.log(right("JavaScript"));
console.log(right("Hi"));


//4.find the type of the angle
function angle_Type (angle) {
    if (angle > 0 && angle < 90) {
        return "Acute angle";
    } else if (angle === 90) {
        return "Right angle";
    } else if (angle > 90 && angle < 180) {
        return "Obtuse angle";
    } else if (angle === 180) {
        return "Straight angle";
    } else {
        return "Invalid angle";
    }
}

// Example usage:
console.log(angle_Type(47))
console.log(angle_Type(90))
console.log(angle_Type(145))
console.log(angle_Type(180))

