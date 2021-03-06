const queueUL = document.querySelector('.list-queue');
const queueInput = document.querySelector('.queue-input');
const warningTopQueue = document.querySelector('#queue-container .warning-top');
const warningBottomQueue = document.querySelector('#queue-container .warning-bottom');
const addQueue = document.querySelector('.btn-add-queue');
const dequeue = document.querySelector('.btn-take-dequeue');

const queue = new QueueDataStructure();

//Unnecessary
// const clearQueueInput = () => {
//   // ... your code goes here
// };

const generateListQueue = () => {
  let liElement
  for (let i = 0; i < queue.MAX_SIZE; i++) {
    liElement = document.createElement("li")
    liElement.className = "inactive"
    liElement.innerHTML = "&nbsp;"
    queueUL.appendChild(liElement)
    
  }
};

generateListQueue();

const generateWarningQueue = type => {
  if (type === 'underflow') {
    
    warningBottomQueue.innerHTML = type
    warningBottomQueue.style.display = "block"
    
  } else if (type === 'overflow') {
    
    warningTopQueue.innerHTML = type
    warningTopQueue.style.display = "block"
  }
};

const addToQueue = () => {
  
  if (queue.canEnqueue()) {

    warningBottomQueue.style.display = "none"

    let queueInputValue = queueInput.value
    let queueDOMArray = queueUL.querySelectorAll("li")
    
    queue.enqueue(queueInputValue)

    // That one was tricky
    for (let i = 0; i < queue.queueControl.length; i++) {
      
      queueDOMArray[i].innerHTML = queue.queueControl[i]
      queueDOMArray[i].classList.remove("inactive")
      queueDOMArray[i].classList.add("active")
    }

    // He sustituido la llamada a la función clearQueueInput (line 11) por la siguiente línea:

    queueInput.value = ""
    
  } else {
    generateWarningQueue("overflow")
  }
};

const removeFromQueue = () => {
  
  if (!queue.isEmpty()) {

    warningTopQueue.style.display = "none"
    
    queue.dequeue()
    
    // This one was also tricky
    let queueDOMArray = queueUL.querySelectorAll("li")
    queueDOMArray[queue.queueControl.length].innerHTML = ""
    queueDOMArray[queue.queueControl.length].classList.add("inactive")
    queueDOMArray[queue.queueControl.length].classList.remove("active")

  } else {
    generateWarningQueue("underflow")
  }
};

addQueue.addEventListener('click', addToQueue);
dequeue.addEventListener('click', removeFromQueue);
