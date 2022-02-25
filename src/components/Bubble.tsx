import React from 'react';

const arr = [5,25,16,78,155,12]
for (let j = 0; j < arr.length-1; j++) {
    for (let i = 0; i < arr.length-1; i++) {
        if (arr[i] > arr[i + 1]) {
            [arr[i],[arr[i+1]]=[arr[i+1]],arr[i]]
        }
    }
}
const names= ["Bob", "Alex", "Nick", "Donald", "Joe"]