"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      searchResults = getUserSearchTraits(people);
      break;
    default:
      app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
      displayPerson(person);
    // TODO: get person's info
    break;
    case "family":
      displayFamily(person, people);
    
    // TODO: get person's family
    break;
    case "descendants":
      let descendant = [];
      displayDescendants(person, people, descendant);
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  let foundPerson = people.filter(function(person){
    if(person.firstName === firstName && person.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  return foundPerson[0];
}

function getUserSearchTraits(people){
  var personTraits = ["gender", "occupation", "eyeColor", "height", "weight"];
  let filteredPeople = people;
  for(let i = 0; i < personTraits.length; i++){
    let userInput = promptFor("What is the suspect's " + personTraits[i], chars).toLowerCase();
    filteredPeople = filterByTrait(userInput, personTraits[i], filteredPeople);
    
    if (filteredPeople.length === 0){
      alert("Found nobody.");
      app(people);
    }
    else if(filteredPeople.length === 1){
      mainMenu(filteredPeople[0], people);
      break;
    }
    else{
      alert("People found:");
      displayPeople(filteredPeople, people);
    }
  }
}

function filterByTrait(userInput, selectedTrait, filteredPeople){
  switch(selectedTrait){
    case "gender":
      return searchByGender(userInput, filteredPeople);
    case "occupation":
      return searchByOccupation(userInput, filteredPeople);
    case "eyeColor":
      return searchByEyeColor(userInput, filteredPeople);
    case "height":
      return searchByHeight(userInput, filteredPeople);
    case "weight":
      return searchByWeight(userInput, filteredPeople);
  }
  return filteredPeople;
}
function searchByGender(userInput, people){
  let filteredPeople = people.filter(function(person){
    if(person.gender === userInput){
      return true;
    }
    else{
      return false;
    }
  });
  return filteredPeople;
}

function searchByOccupation(userInput, people){
  let filteredPeople = people.filter(function(person){
    if(person.occupation === userInput){
      return true;
    }
    else{
      return false;
    }
  });
  return filteredPeople;
}

function searchByEyeColor(userInput, people){
  let filteredPeople = people.filter(function(person){
    if(person.eyeColor === userInput){
      return true;
    }
    else{
      return false;
    }
  });
  return filteredPeople;
}

function searchByHeight(userInput, people){
  let heightParsed = parseInt(userInput);
  let filteredPeople = people.filter(function(person){
    if(person.heightParsed === heightParsed){
      return true;
    }
    else{
      return false;
    }
  });
  return filteredPeople;
}

function searchByWeight(userInput, people){
  let weightParsed = parseInt(userInput);
  let filteredPeople = people.filter(function(person){
    if(person.weightParsed === weightParsed){
      return true;
    }
    else{
      return false;
    }
  });
  return filteredPeople;
}
// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "Date of Birth: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";

  
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}


function displayFamily(person, people){
  displaySpouse(person, people);
  displayParents(person, people);
  displaySiblings(person, people);
}
  

function displaySpouse(person, people){

let spouse = people.filter(function(el){
  if(el.id === person.currentSpouse){
    alert("Spouse name: " + el.firstName + " " + el.lastName);
    return true;
  }
  else{
    return false;
  }
});   
return spouse;
}

function displayParents(person, people){
  let parent = people.filter(function(el){
  if(person.parents.includes(el.id)){
    alert("This person's parents are " + el.firstName + " " + el.lastName);
    return true;
  }
  else{
    return false
  }
    // for (let i = 0; i < person.parents.length; i++){
    //   if(el.id === person.parents[0] || el.id === person.parents[1]){
    //     return true;
    //   }
    //   else{
    //     return false;
    //   }
    // }
});      
  return parent;
}

function displaySiblings(person, people){
  let sibling = people.filter(function(el){
    for (let i = 0; i < person.parents.length; i++){
      if(el.parents[0] === person.parents[0] || el.parents[1] === person.parents[1]){
        if(el.id != person.id){
          alert("This person's sibling is " + el.firstName + " " + el.lastName);
        }
      return true;
    }
      else{
      return false;
    }
  }});
  return sibling;
}


function displayDescendants(person, people, descendant){
  descendant = people.filter(function(el){
    if(el.parents.includes(person.id)){
      return true;
    }
    else{
      return false;
    }
});
for (let i = 0; i < descendant.length; i++){
  person = descendant[i];
  displayDescendants(person, people, descendant); //if to break out
  //if(descendant.includes(descendant)){
  if(descendant.includes(person.id === person.parents)){
    break;
  }
}
return descendant;
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}
