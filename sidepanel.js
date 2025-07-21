
document.addEventListener('DOMContentLoaded', function() {
  
    chrome.storage.local.get(['researchNotes'], function(result) {
        console.log(result.researchNotes + " researchNotes");
        if(result.researchNotes){
            document.getElementById('notes').value = result.researchNotes;

        }
       
        document.getElementById('summarizeBtn').addEventListener('click', summarizeText);
        document.getElementById('saveNotesBtn').addEventListener('click', saveNotes);
        document.getElementById('CitiationBtn').addEventListener('click',citiationNotes);
        document.getElementById('copyBtn').addEventListener('click',copyToClipboard);
        document.getElementById('ask').addEventListener('click',ask);
        document.getElementById('submit').addEventListener('click',submitQuery);
  





    });

});


async function summarizeText() {
  try {
    // Get active tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // Get selected text from the tab
    const [{ result }] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: () => window.getSelection().toString(),
    });


    console.log(result + " result");
    

    if (!result || result.trim() === "") {
      showResult('Please select some text first');
      return;
    }

    // Send request to your backend
    const response = await fetch('http://localhost:8080/api/research/process', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: result, operation: 'summarize' }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const text = await response.text();
    showResult(text.replace(/\n/g, '<br>'));

  } catch (error) {
    showResult('Error: ' + error.message);
  }
}


async function citiationNotes(){

  //extracting title, author, date, and URL from the current page
  const title = document.title;
  const url = window.location.href;
  const author = document.querySelector('meta[name="author"]')?.content || "Unknown";
  const date = document.querySelector('meta[property="article:published_time"]')?.content;
  const result = `Title: ${title}\nAuthor: ${author}\nDate: ${date}\nURL: ${url}`;
   const response = await fetch('http://localhost:8080/api/research/process', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: result, operation: 'citation' }),
    });

    if (!response.ok) {
      throw new Error("no cite are available here ");
    }

    const text = await response.text();
    showResult(text.replace(/\n/g, '<br>'));

  
}
async function saveNotes(){
    const notes=document.getElementById('notes').value;
    console.log(notes+"notes");
    chrome.storage.local.set({'researchNotes':notes},function(){
      alert('Notes saved successfully !!!');
    })

}


function showResult(content) {
  const resultDiv = document.getElementById('results');
  if (resultDiv) {
    resultDiv.innerHTML = `<div class="result-item"><div class="result-content">${content}</div></div>`;
  } else {
    console.error("Element with id 'result' not found in the DOM.");
  }
}


function copyToClipboard() {

     const text=document.getElementById('results').innerText;
     console.log(text + " text");
     navigator.clipboard.writeText(text).then(() =>{
        alert('Text copied to clipboard successfully!');
     }).catch(err =>{
        console.log('Failed to copy text: ', err);
        alert('Failed to copy text: ' + err);
     })
     document.getElementById('copyBtn').innerText=`Copied`;

}

function ask(){
  var modal = document.getElementById("myModal");
   modal.style.display = "block";

var span = document.getElementsByClassName("close")[0];


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


}

async function submitQuery(){
           let inputField = document.getElementById("myInput");
           let value = inputField.value;
           alert("Input value: " + value);
           const response = await fetch('http://localhost:8080/api/research/process', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ content: value, operation: 'ask' }),
           });


           const text = await response.text();
           showResult(text.replace(/\n/g, '<br>'));


           if (!response.ok) {
           throw new Error(`API Error: ${response.status}`);
           }

        
           
}

