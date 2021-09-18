/*
@author Arun George, Sep 2021
Mix |Intent Exporter

*/


// variables for forms
let input = document.querySelector('input');
let textarea = document.querySelector('textarea');

// default text inside the textarea
textarea.value = 'Please select the trsx to export intents.';



// when the form input detects a change
input.addEventListener('change', ()=> {

    // variables for files
    let files = input.files;
    let file = files[0];
    let getFileExt = input.value;
    let reader = new FileReader;
  

// validate the correct file format and check if it's not empty
if (files.length == 0) {
    return;
    } else if (!getFileExt.match(/\.[tsrx]+$/)) {
    $('#myModal').modal('show');
    $('#fileAlert').text("Your file needs to be in a TRSX format. ");
    return;
  }



// start reader onload validation
reader.onload = (e) => {

    // variable initialization 
    const file = e.target.result;
    const text = file;
    let regexIntent;

    let intentList;
    let intentsOnly;

    
    // regular expression detection for intents
    regexIntent = /(<intent name=")(\w+)/g;
    
    // get intents from the array, assign to intentList
    intentList = getIntents(text, regexIntent, 2);
  

    
    // update the number of intents div in the HTML file
    $('#countIntents').html('<b>Number of intents: ' + intentList.length);

    // assign the intents to the textarea form
    textarea.value = intentList.join('');
    
    // alert if any generic errors happen
    reader.onerror = (e) => alert(e.target.error.name);
    


// function for grabbing intents from the file
function getIntents(str, regexIntent, index) {
    
     // variables and arrays to hold intets
     let match;
     let intents = [];

    index || (index = 1); // default to the first capturing group of the regex
    
    while (match = regexIntent.exec(str)) {
        intents.push(match[index] + "\n"); // push it to the array intents
        }

         return intents; 
        }               
              
    };
        reader.readAsText(file);

    });


// end



