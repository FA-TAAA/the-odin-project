"use strict"

const array = [1,2,3,4,5]
const a = array.every( (n,i) => {
    console.log(i)
    return n < 10
})

console.log(a)