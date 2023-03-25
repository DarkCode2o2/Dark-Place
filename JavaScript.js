document.querySelector(".back-start .start-btn").onclick = function() {
    let yourName = prompt("What's Your Name?");
    
    if(yourName === "" || yourName === null) {
        document.querySelector(".name span").innerHTML = "Anonymous"
    }else {
        document.querySelector(".name span").innerHTML = yourName
    }
    
    document.querySelector(".back-start").remove()
}

let durantion = 1000

let blockContain = document.querySelector(".memory-game-blocks");

let blocks = Array.from(blockContain.children);

let orderRange = [...blocks.keys()]

shuffle(orderRange)
blocks.forEach((ele, index) => {
    
    ele.style.order = orderRange[index]

    ele.addEventListener("click", function(){
        flipped(ele)
    })
})


// Flipped Function
function flipped(selectedBlock) {
    selectedBlock.classList.add("flipped")
    
    let Allblocks = blocks.filter(block => block.classList.contains("flipped"));

    if (Allblocks.length == 2)  {
        
        // Stoped Click Funciton 
        stopClick()

        // Check Matched Element Funciton 
        checkMatchedBlocks(Allblocks[0], Allblocks[1])
    }
}


// Stoped Click Funciton 
function stopClick() {
    blockContain.classList.add("no-click")

    // Remove Class No Click After The Duration 
    setTimeout(() => {

        blockContain.classList.remove("no-click")

    }, durantion)
}

// Check Matched Blocks
function checkMatchedBlocks(firstBlock, secondBlock) {
    let triesElement = document.querySelector(".title span")

    // Check If Two Blocks Matched
    if (firstBlock.dataset.animes === secondBlock.dataset.animes) {
        firstBlock.classList.remove("flipped")
        secondBlock.classList.remove("flipped")

        firstBlock.classList.add("matched")
        secondBlock.classList.add("matched")
        document.querySelector("#success").play()
    } else {

        triesElement.innerHTML = Number(triesElement.innerHTML) + 1;
        
        setTimeout(() => {
            
            firstBlock.classList.remove("flipped")
            secondBlock.classList.remove("flipped")
    
        }, durantion)
        document.querySelector("#failed").play()
    }
}

// Shuffle Function 
function shuffle(array) {
    let current = array.length,
        stash, 
        random
    while (current > 0) {
        random = Math.floor(Math.random() * current)

        current--
        // [1] Add The Current Number To Stash
        stash = array[current]

        // [2] Current Length Equal Random Number
        array[current] = array[random]

        // [3] Add The Random Number To Stash
        array[random] = stash
    }
    return array
}
