const num_btns = document.querySelectorAll(".num_btn");
const op_btns = document.querySelectorAll(".op_btn");
const equal_btn = document.querySelector("#equal");
const clear_btn = document.querySelector("#clear");
let value_a = undefined;
let value_b = undefined;
let result = undefined;
let operator;
let selected_op = undefined;

//Event listener for numbers
num_btns.forEach(function(btn) {
    btn.addEventListener("click", function() { 
        //Clears display when entering new number after result
        if (result != undefined) {
            result = undefined;
            clear_display();
        }
        add_to_display(this.textContent);
    });
});

//Event listener for operators
op_btns.forEach(function(btn) {
    btn.addEventListener("click", function() {
        if (selected_op != undefined) {
            selected_op.classList.remove("red_op");
            selected_op = btn;
            selected_op.classList.add("red_op");
            operator = btn.textContent;
            clear_display();
            return;
        }
        let current_display = document.querySelector("#display").textContent;
        value_a = +current_display;
        selected_op = btn;
        clear_display();
        selected_op.classList.add("red_op");
        operator = btn.textContent;
    });
});

//Event listener for equal
equal_btn.addEventListener("click", function() {
    let current_display = document.querySelector("#display").textContent; 
    value_b = +current_display;  
    clear_red_btn();    
    print_result();
});

//Event listener for clear
clear_btn.addEventListener("click", function() {
    clear_display();
    if (selected_op != undefined) clear_red_btn();
    selected_op = undefined;
});



function print_result() {
    result = operate(value_a, operator, value_b);
    clear_display();
    add_to_display(result);
    selected_op = undefined;
}


function add_to_display(num) {
    let current_display = document.querySelector("#display").textContent;
    
    let new_display = current_display + num;
    document.querySelector("#display").textContent = new_display;
}


function clear_display() {
    document.querySelector("#display").textContent = "";
}


function clear_red_btn() {
    if (selected_op.classList.contains("red_op")) {
    selected_op.classList.remove("red_op");
    }
}
    

function add(a, b) {
    return a + b;
}


function subtract(a, b) {
    return a - b;
}


function multiply(a, b) {
    return a * b;
}


function divide(a, b) {
    return a / b;
}


function operate(a, op, b) {
    switch (op) {
        case "+":
            return add(a, b);
            
        case "-":
            return subtract(a, b);
        
        case "*" || "x":
            return multiply(a, b);
            
        case "x":
            return multiply(a, b);
         
        case "/":
            return divide(a, b);
        
        default:
            console.log(a);
            console.log(op);
            console.log(b);
            alert("Invalid operation");
    }
}

