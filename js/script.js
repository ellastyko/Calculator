'use strict';

let actions = ['ln', 'sin', 'cos', 'tg', 'ctg', 'exp'];

// Function that control brackets
function brackets_control(string) {
    
    let left = [];
    let right = [];
    for (let i of string) {
        if (i === ')')
            right.push(i)
        if (i === '(')
            left.push(i)
    }
    return ((right.length >= left.length) ? false : true)
}



window.onload = (event) => {

    // Последний введенный символ
    let temp = '';
    // Поле для ввода
    let equation = document.getElementById('equation');
    let solved = document.getElementById('solved');

   
    // При изменении строки ввода
    equation.oninput = (event) => {    

        
        let value = equation.value
        let arr = value.split(' ')
        // console.log(arr)
        for (let i of arr) {
            if (i === '')
                arr.splice(arr.indexOf(i), 1)
        }

        temp = arr[arr.length - 1] // temp is last element
        
        if (temp !== undefined) {

            // // If temp = ln(8) temp save it like ln
            for (let i of actions) {
                if (temp.includes(i) === true) {
                    temp = i
                    return 0
                }             
            }
            
            arr = temp.split('')
            // console.log(arr)
            // Дополнтельные проверки для получения временного элемента
            if (arr[arr.length - 1] === ')' && arr.length != 1) {
                temp = ')'
                return 0
            }
            if (arr[0] === '(' && arr.length != 1) {
                
                arr.splice(0, 1)
                temp = ''
                for (let i of arr)
                    temp += i;
                // console.log(`New temp ${temp}`)
                return 0
            }
        }       


        console.log(`New temp ${temp}`)
    }

    equation.onkeypress = (event) => {

        let code = event.keyCode || event.which


        let value = equation.value
        let arr = value.split(' ')

        for (let i of arr) {
            if (i === '')
                arr.splice(arr.indexOf(i), 1)
        }
        

        // console.log(code)
        // console.log(`Temp in key press ${temp}`)
        // console.log(arr)

        if (code === 13 || code === 61) {

            event.preventDefault()
            result(event)
            return 0
        }
        // NUMBERS and . ( )
        else if ((code > 47 && code < 58) || code === 46 || code === 94 || code === 33 || code === 40 || code === 41) { 
            


            if (temp == 'exp' || temp == 'ln' || temp == 'sin' || temp == 'cos' || temp == 'tg' || temp == 'ctg') {
                
                if (code === 40 || code === 41) {
                    event.preventDefault()
                }
                return 0
            }
            // Проверяем можно ли поставить закрывающую скобку
            if (code === 41 && brackets_control(value) === false) {
                event.preventDefault()
                return 0
            }
        }     
        else if (code === 42 || code === 43 || code === 45 || code === 47) { /* signs *%-+= */ 

            event.preventDefault()
            // Если стоят знаки ниже знак не поставиться
            if (temp == '.' || temp == '^' || temp == '*' || temp == '/' ||
                temp == '+' || temp == '%' || temp == '-' || temp == '=' || 
                temp === undefined || temp === '' || temp[temp.length - 1] === '.') {                
                    return 0                
            }   
            else if (temp == '(') 
                equation.value += `${event.key}`
            else 
                equation.value += ` ${event.key} `
        }
        else if (code === 44) {     // ,

            event.preventDefault()
            equation.value += '.'
        }
        else if (code === 101) {    // e

            event.preventDefault()
            equation.value += 'exp()'
            equation.selectionStart = equation.value.length - 1
            equation.selectionEnd = equation.value.length - 1
            temp = 'exp'
            return 0
        }
        else if (code === 115) {

            event.preventDefault()
            equation.value += 'sin()'
            equation.selectionStart = equation.value.length - 1
            equation.selectionEnd = equation.value.length - 1
            temp = 'sin'
            return 0
        }
        else if (code === 99) {

            event.preventDefault()
            equation.value += 'cos()'
            equation.selectionStart = equation.value.length - 1
            equation.selectionEnd = equation.value.length - 1
            temp = 'cos'
            return 0
        }
        else if (code === 116) {

            event.preventDefault()
            equation.value += 'tg()'
            equation.selectionStart = equation.value.length - 1
            equation.selectionEnd = equation.value.length - 1
            temp = 'tg'
            return 0
        }
        else if (code === 108) {    // l

            event.preventDefault()
            equation.value += 'ln()'
            equation.selectionStart = equation.value.length - 1
            equation.selectionEnd = equation.value.length - 1
            temp = 'ln'
            return 0
        }
        else {
            event.preventDefault()
            return 1
        }
        temp = event.key
        return 0
    };


    

    for (let i = 0; i < 28; i++)
        document.getElementsByTagName('button')[i].addEventListener('click', add);
   
    // Добавление символов по клику (СЫРО)
    function add(event) {

        if (event.type === 'click') {

            event.preventDefault()
            if (isNaN(this.value) == true) {
                console.log(this.value)
                if (this.value === '.' || this.value === '(' || this.value === ')')
                    equation.value += this.value
                else 
                equation.value +=` ${this.value} `
            }
            else {
                // console.log(this.value)
                equation.value += this.value
            }        
        }
        else {
            return 0
        }
    }


    document.querySelector('form').addEventListener('submit', result);
    document.querySelector('form').addEventListener('reset',  (event) => {
        solved.innerHTML = 'Answer'
    });

    function result(event) {
        
        event.preventDefault()
        let value = equation.value

        if (validation(value) === false) {

            solved.innerHTML = `${equation.value}`
            equation.value = 'Invalid Syntax'
            return 1
        }
        solved.innerHTML = `${equation.value}`
        equation.value = `${calculate(value)}`       
    };      
};

// let actions = ['ln', 'sin', 'cos', 'tg', 'ctg', 'exp', log];
function calculate(value) {

    let result;
    let arr = value.split(' ')
    for (let i of arr) {
        for (let j of actions) {
            if (i.includes(j)) {
                console.log(i)
            }
        }
    }
    
    if (value.includes('('))    
        result = formule(value)
    else 
        result = solve(value)
    // 8 + (8 + (6 - 2 + 3))
    
    return result
}

function formule(value) {
    
    let counter = 0
    let fbracket;
    let temp;
    for (let i = 0; i < value.length; i++) {


        if (value[i] === '(')  {
            if (fbracket === undefined)
                fbracket = i
            counter++
        }
        if (value[i] === ')') {
            counter--
            if (counter === 0) {
                temp = value.slice(fbracket + 1, i)
                // console.log(value)
                // console.log(temp)
                let res;
                if (temp.includes('(') && temp.includes(')')) 
                    res = value.slice(0, fbracket) + String(formule(temp)) + value.slice(i + 1, value[value.length])                            
                else 
                    res = value.slice(0, fbracket) + String(solve(temp)) + value.slice(i + 1, value[value.length])                   
                return solve(res)                     
            }                  
        }            
    }
} 



function solve(value) {

    let arr = value.split(' ')
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === '*') {
            arr[i] = Number(arr[i-1]) * Number(arr[i+1])
            arr.splice(i + 1, 1)
            arr.splice(i - 1, 1)
            i = 0
        }
        if (arr[i] === '/') {
            arr[i] = Number(arr[i-1]) / Number(arr[i+1])
            arr.splice(i + 1, 1)
            arr.splice(i - 1, 1)
            i = 0
        }
    }
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === '+') {
            arr[i] = Number(arr[i-1]) + Number(arr[i+1])
            arr.splice(i + 1, 1)
            arr.splice(i - 1, 1)
            i = 0
        }
        if (arr[i] === '-') {
            arr[i] = Number(arr[i-1]) - Number(arr[i+1])
            arr.splice(i + 1, 1)
            arr.splice(i - 1, 1)
            i = 0
        }
    }
    return arr[0]
}









function validation(arr) {
    // Checking 
    return true
    // Подсчет количества скобок и тд
} 