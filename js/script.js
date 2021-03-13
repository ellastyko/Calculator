'use strict';


window.onload = (event) => {

    let temp;
    // Поле для ввода
    let equation = document.getElementById('equation');
    
    equation.onclick = (event) => {

        event.preventDefault()
        console.log('click')
    }

    equation.onkeypress = (event) => {

        
        let code = event.keyCode || event.which
        let value = equation.value
        let arr = value.split(' ')
        arr.splice(arr.indexOf(''), 1)

        // console.log(code)
        // console.log(temp)
        // console.log(arr)

        if (code === 13 || code === 61) {
            event.preventDefault()
            calculate(event)
            return 0
        }
        // NUMBERS . ( )
        else if ((code > 47 && code < 58) || code === 46 || code === 94 || code === 33 || code === 40 || code === 41) { 
            
            if (temp == 'exp' || temp == 'ln' || temp == 'sin' || temp == 'cos' || temp == 'tg' || temp == 'ctg') {
                
                if (code === 40 || code === 41) {
                    event.preventDefault()
                }
                return 0
            }
        }     
        else if (code === 42 || code === 43 || code === 45 || code === 47) { /* signs *%-+= */ 

            event.preventDefault()
            // Если стоят знаки ниже знак не поставиться
            if ((temp == '.' || temp == '^' || temp == '*' || temp == '/' ||
                 temp == '+' || temp == '%' || temp == '-' || temp == '=') && 

                 (arr[arr.length - 1] == '.' || arr[arr.length - 1] == '^' || arr[arr.length - 1] == '*' || 
                 arr[arr.length - 1] == '/' || arr[arr.length - 1] == '+' || arr[arr.length - 1] == '%' || 
                 arr[arr.length - 1] == '-' || arr[arr.length - 1] == '=')) {
                 
                    return 0                
            }    
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


    document.querySelector('form').addEventListener('submit', calculate);
    let data = document.querySelector('form')[20].addEventListener('click', add);

    function add(event) {
        console.log(data.value)
        console.log(event.key)
    }


    function calculate(event) {
   
        event.preventDefault()
        console.log('calc')
        let value = equation.value
        let arr = value.split(' ')

        validation(arr) 
        console.log(arr)
    };

    function validation(arr) {
        // Checking 

        // Подсчет количества скобок и тд
    }
};















    // function add(event) {

        
    //     event.preventDefault() 
    //     let active = document.getElementsByTagName('button')[5]
    //     console.log(active.value)
    //     console.log(active.type)
    //     if (active.type != 'BUTTON')
    //         return 1
        
    //     // console.log(document.activeElement.value)
    //     document.getElementById("equation").value += `${active}`;
    // }



    // function calc(equation) {

    //     let arr = equation.split(' ');
    //     console.log(arr)
    //     // let result = arr[0] + arr[3]
        
    //     // return result
    // }