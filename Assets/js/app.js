const instructions_form = document.querySelector('form.add-instruction');
const data_form = document.querySelector('form.add-data');
const instructions_ul = document.querySelector('.instruction-form .divTable')
const data_ul = document.querySelector('.data-form .divTable')
// const compute = document.querySelector('button.btn-compute');
const alertDiv = document.querySelector('.alerts');
const cpuRegisters = document.querySelector('.cpu-registers-container');
const inputsContainer = document.querySelector('.user-inputs-container');

console.log(instructions_form, instructions_ul)

let instruction_index = 301;
let data_index = 940

instruction_set = new Map() 
data_set = new Map()

// Adding a new instruction to instructions list 
instructions_form.addEventListener('submit', e => {
    e.preventDefault();
    
    const instruction = instructions_form.addnew.value.trim();
    if (instruction != "") {
        // const text_span = createNewElement("span", " ", instruction)
        const newRow = createNewElement(instruction_index, " ", instruction)
        
        instructions_ul.innerHTML += newRow;
        instruction_set[instruction_index] = instruction;
        instruction_index ++;
        instructions_form.reset();
    }
});

// Adding new inputs to inputs list 
data_form.addEventListener('submit', e =>{
    e.preventDefault();
    const data = data_form.addData.value.trim();

    if ( data != ""){
        // const text_span = createNewElement("span", " ", )
        const newDataRow = createNewElement(data_index, " ", fix_zeros(data))
        data_ul.innerHTML += newDataRow;
        data_set[data_index] = data;
        data_index ++;
        data_form.reset();
    }
});

// add prefix zeros to input numbers 
const fix_zeros = num => {
    while (num.length < 4) {
        num = "0" + num
    }
    return num
}

//  create new HTML elements ----------- for UI trees 
const createNewElement = (index, class_name = " ", data) => {
    const html = `
        <div class="divRow">
            <div class="divCellNums">${index}</div>
            <div class="divCell">${data}</div>
        </div>
    `
    if (class_name != " ") {
        newElement.setAttribute('class', class_name);
    }
    return html
}


// alert box close 
alertDiv.querySelector("button").addEventListener('click', e => {
    document.querySelector('.alerts').classList.add('invisible')
})

// draw focus on a box  
const drawFocus = (component, duration) =>{
        component.classList.add('flashy-border')
        console.log("animate box", component)
        setTimeout(()=>{

            component.classList.remove('flashy-border')
        }, duration)
        // const interval= setInterval(()=>{
        //     timesRun += 1;
        //     if(timesRun === 6){
        //         clearInterval(interval);
        //     }
        // }, 600)
}


// start button 
// get rid of input fields and activate animation tab 

// compute.addEventListener('click', (e) => {
//     e.preventDefault()
//     console.log(instruction_set)
//     console.log(data_set)

//     if (instructions_ul.childElementCount == 0) {
//         if (alertDiv.classList.contains('invisible')) {
//             document.querySelector('.alerts').classList.remove('invisible')
//         }
//     } else {
//         inputsContainer.classList.add('invisible')
//         cpuRegisters.classList.remove('invisible')
//     }
// })









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


let PC = 300; //Process Counter
let AC = ''; //Accumulator
let IR = ''; //Instruction Register



/**
* 
* @param address  - e.g. 300
* @return returns the instruction on the address 
*/
function fetch_instruction(process_address) {
  if (memory.get(process_address) != null) {
      IR = memory.get(process_address);
      return true;
  }
  return null;
}


function interpret_instruction(instruction) {
  let opcode = instruction.charAt(0) * 1;
  let data = instruction.slice(1) * 1;
  return { opcode: opcode, data: data };
}


function execute_instruction(PC) {

  while (fetch_instruction(PC) != null) {

      fetch_instruction(PC);

      let { opcode, data } = interpret_instruction(IR);


      PC++;
      if (opcode === 1) {
          AC = load(data, memory);
      }
      else if (opcode === 2) {
          store(data, AC, memory);
      }
      else if (opcode === 5) {
          AC = add(AC, load(data, memory));
      }
      console.log({
          "PC": PC,
          "AC": AC,
          "data": data,
      });
  }
  console.log(memory);
}



console.log(execute_instruction(300));


function add(bin1, bin2) {
  return bin1 + bin2;
}

function subtract(bin1, bin2) {
  return bin1 - bin2;
}

function load(address, memory) {
  return memory.get(address) * 1;
}

function store(address, value, memory) {
  return memory.set(address, (value).toString());
}

// End of code from Maste

anime({
  targets: '#smt',
  translateY: [
    { value: 200, duration: 500 },
    { value: 0, duration: 800 }
  ],
  rotate:{
    value: '1turn',
    easing: 'easeInOutSine'
  }
});
console.log("I was here!");
Arrow.show(5000);
console.log("I was here to!");