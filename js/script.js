'use strict';

let memory = 0;
let numsys = 10;

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
    let checkGroup = document.getElementsByName("numsys");
    checkGroup[0].onclick = () => {
        numsys = 10;
        let hexNums = document.getElementsByClassName("hex");
        let decNums = document.getElementsByClassName("dec");
        for (let i = 0; i < hexNums.length; i++)
            hexNums[i].setAttribute("enabled", "false");
        for (let i = 0; i < decNums.length; i++)
            decNums[i].setAttribute("enabled", "true");
    }
    checkGroup[1].onclick = () => {
        numsys = 16;
        let hexNums = document.getElementsByClassName("hex");
        let decNums = document.getElementsByClassName("dec");
        for (let i = 0; i < hexNums.length; i++)
            hexNums[i].setAttribute("enabled", "true");
        for (let i = 0; i < decNums.length; i++)
            decNums[i].setAttribute("enabled", "true");
    }
    checkGroup[2].onclick = () => {
        numsys = 8;
        let hexNums = document.getElementsByClassName("hex");
        let decNums = document.getElementsByClassName("dec");
        for (let i = 0; i < hexNums.length; i++)
            hexNums[i].setAttribute("enabled", "false");
        for (let i = 0; i < decNums.length; i++)
            decNums[i].setAttribute("enabled", "false");
    }

    document.getElementById("reset").onclick = () => setTimeout(() => {
        if (numsys === 10)
            checkGroup[0].checked = true;
        else if (numsys === 16)
            checkGroup[1].checked = true;
        else if (numsys === 8)
            checkGroup[2].checked = true;
    }, 1);



    // Последний введенный символ
    let temp = '';
    // Поле для ввода
    let equation = document.getElementById('equation');
    let solved = document.getElementById('solved');
    let form = document.querySelector('form')

    // Converter
    let converter = document.querySelector('#Converter')
    let from = document.querySelector('#from');
    let to = document.querySelector('#to');

    // Keep input always in focus
    equation.onblur = () => {
        equation.focus();
    }

    // При изменении строки ввода
    equation.oninput = (event) => {
        let value = equation.value;
        let arr = value.split(' ')
        // console.log(arr)
        for (let i of arr) {
            if (i === '')
                arr.splice(arr.indexOf(i), 1)
        }

        temp = arr[arr.length - 1] // temp is last element

        if (temp !== undefined) {
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


    // CLICK ON KEYBOARD
    form.onkeypress = (event) => {
        let code = event.keyCode || event.which
        let key = event.key;
        let value = equation.value
        let arr = value.split(' ')

        for (let i of arr) {
            if (i === '')
                arr.splice(arr.indexOf(i), 1)
        }

        // console.log(code)
        // console.log(arr)
        // console.log(event.key)

        let reNums = /^(\.|\(|\)|\,|\d|[abcdef])$/i;
        let reSigns = /^[!\/\^\*\%\=\+\-]$/;

        if (code === 13 || code === 61) {
            event.preventDefault();
            result(event);
            return 0;
        }
        else if (key.match(reNums)) {
            // Проверяем можно ли поставить закрывающую скобку
            if (key === ')' && !brackets_control(value)) {
                event.preventDefault();
                return 0;
            }
            if (key === ',') {
                event.preventDefault();
                if (!isNaN(temp))
                    equation.value += '.';
            }
            if (key === '.' && isNaN(temp)) {
                event.preventDefault();
                return 0;
            }
        }
        else if (key.match(reSigns)) { /* signs /*%-+= */
            event.preventDefault();
            // Если стоят знаки ниже знак не поставиться
            let reExcept = /[\.\^\*\+\%\=\-]$/;
            if (!temp || temp.toString().match(reExcept))
                return 0;
            else if (temp == '(')
                equation.value += `${key}`;
            else
                equation.value += ` ${key} `;
        }
        else {
            event.preventDefault();
            return 1;
        }
        temp = event.key;
        return 0;
    };

    // BUTTONS ON DISPLAY
    for (let i = 0; i < document.getElementsByTagName('button').length; i++)
        document.getElementsByTagName('button')[i].addEventListener('click', add);

    // Добавление символов по клику
    function add(event) {
        if (event.type === 'click') {
            event.preventDefault();
            let button = event.target;
            let value = button.value;

            // Вызов функции для вставки символа
            console.log(value);
            if (value === 'CA') {
                converter.hidden = !converter.hidden;
            }
            else if (value === 'MR') {
                if (memory != 0) {
                    temp = memory;
                    equation.value += temp;
                }
            }
            else if (value === 'MC') {
                temp = '';
                memory = 0;
            }
            else if (value === 'M+')
                memory += temp === '' ? +equation.value : +temp;
            else if (value == 'M-')
                memory -= temp === '' ? +equation.value : +temp;
            else if (value == 'PI') {
                temp = '𝜋';
                equation.value += temp;
            }
            else if (value == '!') {
                temp = value;
                equation.value += temp;
            }
            else if (value == '^') {
                temp = value;
                equation.value += temp;
            }
            else if (value == 'sqrt') {
                temp = value;
                equation.value += '√(';
            }
            else if (value == '(') {
                temp = value;
                equation.value += '(';
            }
            else if (value == ')') {
                if (brackets_control(equation.value))
                    equation.value += ')';
            }
            else {
                if (value.match(/[\d\.]/)) {
                    equation.value += value;
                    temp = value;
                }
                else if (value.match(/^[%/\*\+\-]$/)) {
                    if (!temp.match(/^[%/\*\+\-]$/)) {
                        console.log('sign 2')
                        equation.value += ` ${value} `;
                        temp = value;
                    }
                }
                else if (value.match(/^[abcdef]$/i) && numsys === 16) {
                    equation.value += value;
                }
            }
        }
        else {
            return 0;
        }
    }




    // RESULT
    document.querySelector('form').addEventListener('submit', result);
    document.querySelector('form').addEventListener('reset',  (event) => {
        solved.innerHTML = 'Answer';
    });

    function result(event) {
        event.preventDefault()
        let value = equation.value;

        // Если нет никаких знаков мы конвертируем
        if (!/[\D\.]+/.test(value)) {
            if (converter.hidden) // Если окно конвертации закрыто
                return 1;
            if (from.value === to.value) // Если конвертационные единицы совпадают
                return 1;
            equation.value = convertation(value, from.value, to.value);
            return 0;
        }
        value = value.replaceAll('^', '**');
        value = value.replaceAll('𝜋', Math.PI);
        let factMatch = value.match(/( *\d+ *\!|\(.+\) *!)/g);
        let sqrtMatch = value.match(/√ *\( *.+ *\)/g);
        let percMatch = value.match(/(\d+|\(.+\)) *[\/\*\+\-] *\d+ *\%/g);
        if (percMatch)
            percMatch.forEach(element => {
                let num = eval(element.match(/(\d+|\(.+\))/)[0]);
                let perc = element.match(/\d+ *\%/)[0].match(/\d+/)[0];
                let sign = element.match(/[\/\*\+\-]/)[0];
                let res = eval(`${num} ${sign} ${(num * perc / 100)}`);
                value = value.replace(element, res);
            });
        if (factMatch)
            factMatch.forEach(element => {
                let num = eval(element.slice(0, element.length - 1));
                value = value.replace(element, factorial(num));
            });
        if (sqrtMatch)
            sqrtMatch.forEach(element => {
                let num = eval(element.slice(1));
                value = value.replace(element, Math.sqrt(num));
            });
        if (numsys !== 10) {
            let intMatch = value.match(/[\dabcdef]+/gi);
            intMatch.forEach(num => {
                value = value.replace(num, parseInt(num, numsys));
            });
        }
        if (!validation(value)) {
            solved.innerHTML = `${equation.value}`;
            equation.value = 'Invalid Syntax';
            return 1;
        }
        solved.innerHTML = equation.value;
        let result = eval(value).toString();
        if (numsys !== 10) {
            let intMatch = result.match(/[\dabcdef]+/gi);
            intMatch.forEach(num => {
                result = result.replace(num, parseInt(num).toString(numsys).toUpperCase());
            });
        }
        equation.value = result;
        temp = result;
    };

    from.onchange = (event) => {
        let value = event.target.value;
        let temp;
        let length = /^(cm|m|km)$/;
        let weight = /^(g|kg|t)$/;
        let square = /^(scm|sm|skm)$/;

        if (length.test(value))
            temp = length;
        if (weight.test(value))
            temp = weight;
        if (square.test(value))
            temp = square;

        for (let i of to.children)
            i.disabled = !temp.test(i.value);
    }
};

function convertation(value, from, to) {

    console.log(value);
    console.log(from);
    console.log(to);
    // console.log(/^(cm|m|km)$/.test(to))
    // console.log(/^(cm|m|km)$/.test(from))
    if (from === 'cm') {
        if (to === 'cm')
            return value;
        if (to === 'm')
            return value / 100;
        if (to === 'km')
            return value / 100000;
    }
    if (from === 'm') {
        if (to === 'cm')
            return value * 100;
        if (to === 'm')
            return value;
        if (to === 'km')
            return value / 1000;
    }
    if (from === 'km') {
        if (to === 'cm')
            return value * 100000;
        if (to === 'm')
            return value * 1000;
        if (to === 'km')
            return value;
    }
    if (from === 'g') {
        if (to === 'g')
            return value;
        if (to === 'kg')
            return value / 1000;
        if (to === 't')
            return value / 1000000;
    }
    if (from === 'kg') {
        if (to === 'g')
            return value * 1000;
        if (to === 'kg')
            return value;
        if (to === 't')
            return value / 1000;
    }
    if (from === 't') {
        if (to === 'g')
            return value * 1000000;
        if (to === 'kg')
            return value * 1000;
        if (to === 't')
            return value;
    }
    if (from === 'scm') {
        if (to === 'scm')
            return value;
        if (to === 'sm')
            return value / 10000;
        if (to === 'skm')
            return value / 10000000000;
    }
    if (from === 'sm') {
        if (to === 'scm')
            return value * 10000;
        if (to === 'sm')
            return value;
        if (to === 'skm')
            return value / 1000000;
    }
    if (from === 'skm') {
        if (to === 'scm')
            return value * 10000000000;
        if (to === 'sm')
            return value * 1000000;
        if (to === 'skm')
            return value;
    }
}

function validation(elem) {
    try {
        eval(elem);
    } catch (SyntaxError) {
        return false;
    }
    return true;
}

var f = [];
function factorial(n) {
    if (n == 0 || n == 1)
        return 1;
    if (f[n] > 0)
        return f[n];
    return f[n] = factorial(n-1) * n;
}
