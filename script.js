
document.getElementById('form').addEventListener('submit', (data)=>{
    data.preventDefault();

    //array specifications
    const size = Number(document.getElementById('size').value);
    const min = Number(document.getElementById('min').value);
    const max = Number(document.getElementById('max').value);
    
    //other options
    const sort = document.getElementById('sort').checked;
    const unique = document.getElementById('unique').checked;
    
    //platform
    const leetcode = document.getElementById('leetcode').checked;
    const gfg = document.getElementById('gfg').checked;
    
    //handle edge cases
    if(min > max){
        displayResultBlock();
        document.getElementById('result').innerHTML = "Invalid Input";
        return;
    }
    else if(unique){
        if(max-(min-1) < size){
            displayResultBlock();
            document.getElementById('result').innerHTML = "Invalid Input";
            return;
        }
    }

    //generate array
    const array = generateArray(size, min, max, sort, unique);
    
    displayResultBlock();

    //print array
    const result = document.getElementById('result');
    if(gfg){
        result.innerHTML = size + `<br>` + array;
    }
    else{
        result.innerHTML = "[" + array + "]";
    }
    
});

document.getElementById('result-container').addEventListener('click', ()=>{
    const text = document.getElementById('result').innerText;
    navigator.clipboard.writeText(text);
    console.log(text);
})

function displayResultBlock(){
    document.getElementById('result-container').style.display = 'block';
}

let set;
function generateArray(size, min, max, sort, unique){
    if(unique){
        set = new Set();
    }
    
    //Generate array
    const arr = new Array(size);
    for(let i=0; i<size; i++){
        arr[i] = generateRandomNumber(unique, min, max);
    }

    //If sort option is selected, the program will sort the array.
    if(sort) arr.sort((a, b) => a - b);
    return arr;
}

function generateRandomNumber(unique, min, max){
    try{
        const num = Math.floor(Math.random() * (max - min + 1)) + min;
        if(unique){
            if(!set.has(num)) set.add(num);
            else return generateRandomNumber(unique, min, max);
        }
        return num;
    }
    catch(error){
        if(error) console.log("Error, Enter valid input");
    }
}