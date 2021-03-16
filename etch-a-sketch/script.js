const clear_btn = document.querySelector("#clear_btn");
const resize_btn = document.querySelector("#resize_btn");
const mario_btn = document.querySelector("#mario_btn");
const shadow_btn = document.querySelector("#shadow_btn");
const grid_container = document.querySelector("#grid_container");
let size = 16;

clear_btn.addEventListener("click", clear_grid);
resize_btn.addEventListener("click", resize_grid);
mario_btn.addEventListener("click", set_mario);
shadow_btn.addEventListener("click", set_shadow);

create_grid(size);




function create_grid(size) {
    let grid_square;
    
    grid_container.style.cssText = "grid-template-columns: repeat(" + size + ", 1fr);\
                                    grid-template-rows: repeat(" + size + ", 1fr);";
                                    
    
    for (let i = 0; i < size ** 2; i++) {
        grid_square = document.createElement("div");
        grid_square.classList.add("grid_square");
        grid_container.appendChild(grid_square);
    }
    
    create_event_listener();
}

function create_event_listener() {
    let grid_squares = get_grid_squares();
    grid_squares.forEach(function(square) {
        square.addEventListener("mouseenter", function() {
            square.classList.add("invisible");
        });
    });
}

function clear_grid() {
    let img = document.querySelector("img");
    if (img !== null) img.remove();
    
    let grid_squares = get_grid_squares();
    grid_squares.forEach(function(square) {
        square.classList.remove("invisible");
    });
}

function erase_grid() {
    let grid_squares = get_grid_squares();
    grid_squares.forEach(function(square) {
        square.remove();
    });
}

function resize_grid() {
    erase_grid();
    let new_size = prompt("Enter the size of the new grid: ");
    create_grid(new_size);
    }
    
function get_grid_squares() {
    return document.querySelectorAll(".grid_square");
}


function set_mario() {
    clear_grid();
    let img = document.createElement("img");
    img.setAttribute("id", "hidden_img");
    img.src = "mario.png";
   
    grid_container.appendChild(img);
}

function set_shadow() {
    clear_grid();
    let img = document.createElement("img");
    img.setAttribute("id", "hidden_img");
    img.src = "shadow.png";
   
    grid_container.appendChild(img);
}
