//function to interpret instructions
// 1 - load memory to AC 
// 2 - store AC to memory 
// 5 - add to AC from memory 

//functions to execute instructions - e.g. add, subtract 
// add 
// subtract 
// store AC to memory
// load memory to AC 


console.log(inputs_sets)

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

