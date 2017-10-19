var s = "ABA"

//s= s.split('').reverse().join('');

var sum =0;
// for(var i = 0; i <s.length;i++){
//     var char = s.charCodeAt(s.length -i-1) - 64;
//     sum +=Math.pow(26,i)*char
// }


var titleToNumber = function(s) {
    var column = 0;
    for (let i = 0; i < s.length; i++) {
        column = column * 26;
        column += s.charCodeAt(i) - 'A'.charCodeAt() + 1;
    }
    return column;
};

console.log(titleToNumber("AB"))



var isAnagram = function(s, t) {
    //sort s
    //sort t
    s = s.split('').sort().join('');
    t = t.split('').sort().join('');
    
    return s == t
};

isAnagram("ab", "ba")