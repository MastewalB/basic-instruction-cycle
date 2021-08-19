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

instruction_set = new Map();
data_set = new Map();

// Adding a new instruction to instructions list 
instructions_form.addEventListener('submit', e => {
  e.preventDefault();

  const instruction = instructions_form.addnew.value.trim();
  if (instruction != "") {
    const newRow = createNewElement(PC, " ", instruction)

    instructions_ul.innerHTML += newRow;
    instruction_set.set(PC, instruction);
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
    const newDataRow = createNewElement(data_index, " ", fix_zeros(data))
    data_ul.innerHTML += newDataRow;
    data_set.set(data_index, data);
    data_index++;
    console.log(data_set);
    data_form.reset();
  }
});

// add prefix zeros to input numbers 
const fix_zeros = num => {
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
            <div class="divCell _${PC}">${data}</div>
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




//function to interpret instructions
// 1 - load memory to AC 
// 2 - store AC to memory 
// 5 - add to AC from memory 

//functions to execute instructions - e.g. add, subtract 
// add 
// subtract 
// store AC to memory
// load memory to AC 


//Memory stores all the data and instructions 
let memory = new Map([
  [300, "1940"],
  [301, "5941"],
  [302, "2941"],
  [303, null],
  [940, "0003"],
  [941, "0002"]
]);


let AC = ''; //Accumulator
let IR = ''; //Instruction Register



/**
* 
* @param address  - e.g. 300
* @return returns the instruction on the address 
*/
function fetch_instruction(process_address) {
  if (instruction_set.get(process_address) != null) {

    //change
    IR = instruction_set.get(process_address);
    console.log(IR);
    var pc_str = '._' + (process_count_begin).toString();
    var element = document.querySelector(pc_str);

    process_count_begin++;


    var animate = anime({
      targets: element,
      translateX: [
        { value: 404, duration: 900 },
      ],

      translateY: [
        { value: 80, duration: 500 }
      ],
      rotate: {
        value: '1turn',
        easing: 'easeInOutSine'
      },

      delay: function (el, i, l) { return i * 600 },
      update: function () {
        pc_cell.innerText = process_count_begin;

      },
      autoplay: false,
    });
    animate.play();
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
  let opcode = instruction.charAt(0) * 1;
  let data = instruction.slice(1) * 1;
  return { opcode: opcode, data: data };
}


function execute_instruction(process_count_begin) {

  while (instruction_available(process_count_begin) == true) {

    fetch_instruction(process_count_begin);
    let { opcode, data } = interpret_instruction(IR);


    process_count_begin++;
    if (opcode === 1) {
      AC = load(data, data_set);
    }
    else if (opcode === 2) {
      store(data, AC, data_set);
    }
    else if (opcode === 5) {
      AC = add(AC, load(data, data_set));
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
  return data_set.get(address) * 1;
}

function store(address, value, data_set) {
  return data_set.set(address, (value).toString());
}

