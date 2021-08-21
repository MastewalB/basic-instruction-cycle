import { Cell } from './main.js';

const instructions_form = document.querySelector('form.add-instruction');
const data_form = document.querySelector('form.add-data');
const instructions_ul = document.querySelector('.instruction-form .divTable')

const pc_cell = document.querySelector('.cpu-register .pc')
const ac_cell = document.querySelector('.cpu-register .ac')
const ir_cell = document.querySelector('.cpu-register .ir')

const data_ul = document.querySelector('.data-form .divTable')
const playButton = document.querySelector('.play');
const pauseButton = document.querySelector('.pause');

const alertDiv = document.querySelector('.alerts');
const cpuRegisters = document.querySelector('.cpu-registers-container');
const inputsContainer = document.querySelector('.user-inputs-container');

let process_count_begin = 300;
let data_count_begin = 940;

let PC = 300;
let data_index = 940;

let instruction_set = new Map();
let data_set = new Map();

let IR_top = ir_cell.getBoundingClientRect().top;
let IR_right = ir_cell.getBoundingClientRect().right;

let ac_top = ac_cell.getBoundingClientRect().top;
let ac_right = ac_cell.getBoundingClientRect().right;




// Adding a new instruction to instructions list 
instructions_form.addEventListener('submit', e => {
  e.preventDefault();

  const instruction = instructions_form.addnew.value.trim();
  if (instruction != "") {
    const cell = new Cell(PC, instruction);
    const newRow = cell.create();

    instructions_ul.innerHTML += newRow;
    cell.top = (document.querySelector('._' + PC.toString())).getBoundingClientRect().top;
    cell.right = (document.querySelector('._' + PC.toString())).getBoundingClientRect().right;

    instruction_set.set(PC, cell);
    PC++;
    console.log(instruction_set);
    instructions_form.reset();
  }
});

// Adding new inputs to inputs list 
data_form.addEventListener('submit', e => {
  e.preventDefault();
  const data = data_form.addData.value.trim();

  if (data != "") {
    const cell = new Cell(PC, data);
    const newDataRow = cell.create();



    data_ul.innerHTML += newDataRow;
    cell.top = (document.querySelector('._' + PC.toString())).getBoundingClientRect().top;
    cell.right = (document.querySelector('._' + PC.toString())).getBoundingClientRect().right;

    data_set.set(data_index, cell);
    data_index++;
    console.log(data_set);
    data_form.reset();
  }
});




// add prefix zeros to input numbers 
const fix_zeros = num => {
  num = (num).toString();
  while (num.length < 4) {
    num = "0" + num
  }
  return num;
}

//  create new HTML elements ----------- for UI trees 
const createNewElement = (index, class_name = " ", data) => {
  const html = `
        <div class="divRow">
            <div class="divCellNums">${index}</div>
            <div class="divCell _${index}">${data}</div>
        </div>
    `
  if (class_name != " ") {
    newElement.setAttribute('class', class_name);
  }
  return html
}


const drawFocus = (component, duration) => {
  component.classList.add('flashy-border')
  //console.log("animate box", component)
  setTimeout(() => {

    component.classList.remove('flashy-border')
  }, duration)
}


// start button 
// get rid of input fields and activate animation tab 

playButton.addEventListener('click', (e) => {
  e.preventDefault();

  if (instructions_ul.childElementCount == 0) {
    if (alertDiv.classList.contains('invisible')) {
      //document.querySelector('.alerts').classList.remove('invisible')
    }
  } else {
    execute_instruction(process_count_begin);
  }
});



pauseButton.addEventListener('click', (e) => {
  e.preventDefault();


});



let AC = ''; //Accumulator
let IR = ''; //Instruction Register


let dataCellX;
let dataCellY;

/**
* 
* @param address  - e.g. 300
* @return returns the instruction on the address 
*/
function fetch_instruction(process_address) {
  if (instruction_set.get(process_address) != null) {


    IR = instruction_set.get(process_address);
    console.log('IR', IR);


    //IR.top 
    //IR.right
    //mov_box_diagDown(element, 0, 0);
    process_count_begin++;



    pc_cell.innerText = process_count_begin;
    return true;
  }
  return null;
}

function instruction_available(PC) {
  if (instruction_set.get(PC) != null) {
    return true;
  }
  return false;
}


function interpret_instruction(instruction) {
  let opcode = instruction.value.charAt(0) * 1;
  let data = instruction.value.slice(1) * 1;
  return { opcode: opcode, data: data };
}


function execute_instruction(process_count_begin) {

  while (instruction_available(process_count_begin) == true) {

    fetch_instruction(process_count_begin);
    let { opcode, data } = interpret_instruction(IR);


    process_count_begin++;
    if (opcode === 1) {

      AC = load(data, data_set);
      //animaiton from data to ac
      //AC.top AC.right
      //mov_box_diagUp(data_cell, 0, 0);
    }
    else if (opcode === 2) {
      store(data, AC, data_set);
      //animation from ac to data
      //mov_box_diagDownLeft(ac_cell, 0, 0);
    }
    else if (opcode === 5) {
      let operand = load(data, data_set).value * 1;
      //animaiton from data to ac
      let result = (AC.value * 1) + operand;
      AC.value = fix_zeros(result);
      ac_cell.innerText = fix_zeros(result);
    }
    console.log({
      "PC": process_count_begin,
      "AC": AC,
      "data": data,
    });
  }
  //console.log(memory);
}



//console.log(execute_instruction(300));


function add(bin1, bin2) {
  return bin1 + bin2;
}

function subtract(bin1, bin2) {
  return bin1 - bin2;
}

function load(address, data_set) {
  return data_set.get(address);
}

function store(address, value, data_set) {
  return data_set.set(address, (value).toString());
}







function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  };
}


let icX = getOffset(pc_cell).left
let icY = getOffset(pc_cell).top

let irX = getOffset(ir_cell).left
let irY = getOffset(ir_cell).top


const mov_box_diagDown = (component, x, y) => {
  const interval = setInterval(() => {
    if (x < irX) {
      component.style.transform = "translate(" + (x + 10) + "px," + (0) + "px)";
    }
    if (y < irY) {
      component.style.transform = "translate(" + (0) + "px," + (y + 10) + "px)";
    }

    if (x >= irX && y >= irY) {
      clearInterval(interval)
    }
  }, 100)
}

const mov_box_diagUp = (component, x, y) => {
  const interval = setInterval(() => {
    if (x < icX) x = x + 10;
    if (y < icY) y = y + 10;
    component.style.transform = "translate(" + (x + 7) + "px," + (y - 7) + "px)";

    if (x >= icX && y >= icY) {
      clearInterval(interval)
    }
  }, 100)
}

const mov_box_diagDownLeft = (component, x, y) => {
  const interval = setInterval(() => {
    if (x < dataCellX) x = x + 10;
    if (y < dataCellY) y = y + 10;
    component.style.transform = "translate(" + (x - 7) + "px," + (y + 7) + "px)";

    if (x >= dataCellX && y >= dataCellY) {
      clearInterval(interval)
    }
  }, 100)
}