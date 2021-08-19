const instructions_form = document.querySelector('form.add-instruction');
const data_form = document.querySelector('form.add-Number');
const instructions_ul = document.querySelector('ul.instruction-list')
const inputs_ul = document.querySelector('ul.input-list')
const search_form = document.querySelector('form.search');
const compute = document.querySelector('button.btn-compute');
const alertDiv = document.querySelector('.alerts');
const cpuRegisters = document.querySelector('.cpu-registers-container');
const inputsContainer = document.querySelector('.user-inputs-container');

let instruction_index = 300;
let data_index = 940

instruction_set = new Map() 
data_set = new Map()

// Adding a new instruction to instructions list 
instructions_form.addEventListener('submit', e => {
    e.preventDefault();
    
    const instruction = instructions_form.addnew.value.trim();
    if (instruction != "") {
        const text_span = createNewElement("span", " ", instruction)
        const li = createNewElement("li", " ", " ")
        li.appendChild(text_span);
        instructions_ul.append(li);
        instruction_set[instruction_index] = instruction;
        instruction_index ++;
        instructions_form.reset();
    }
});

// Adding new inputs to inputs list 
data_form.addEventListener('submit', e =>{
    e.preventDefault();
    const data = data_form.addNumber.value.trim();

    if ( data != ""){
        const text_span = createNewElement("span", " ", fix_zeros(data))
        const li = createNewElement("li", "user-input", " ")
        li.appendChild(text_span);
        inputs_ul.append(li);
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
const createNewElement = (element_type = "element_type", class_name = " ", text = " ") => {
    const newElement = document.createElement(element_type);
    newElement.innerHTML = text
    if (class_name != " ") {
        newElement.setAttribute('class', class_name);
    }
    return newElement
}

// start button 
// get rid of input fields and activate animation tab 
compute.addEventListener('click', (e) => {
    e.preventDefault()
    console.log(instruction_set)
    console.log(data_set)

    if (instructions_ul.childElementCount == 0) {
        if (alertDiv.classList.contains('invisible')) {
            document.querySelector('.alerts').classList.remove('invisible')
        }
    } else {
        inputsContainer.classList.add('invisible')
        cpuRegisters.classList.remove('invisible')
    }
})

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