let studentsLocalStorage = JSON.parse(localStorage.getItem('studentItemStor'));
let baseStudents = studentsLocalStorage ? studentsLocalStorage : [];
let form = document.querySelector(`form`);
let studentsList = document.querySelector(`.students-list`);
let editStudent = null;

// let baseStudents = [
//   {
//     name: "Klemensas",
//     lastName: "Butkevičius",
//     age: 29,
//     Phone: `+370655252`,
//     Email: `hihihi@hihihi.com`,
//     Score: 1,
//     Group: "2nd",
//     preferedLanguages: [`JavaScript`, `JAVA`],
//   },
//   {
//     name: "Vytas",
//     lastName: "Nesvarbu",
//     age: 44,
//     Phone: `+370655252`,
//     Email: `hihihi@hihihi.com`,
//     Score: 5,
//     Group: "2nd",
//     preferedLanguages: [`JavaScript`],
//   },
//   {
//     name: "Tomas",
//     lastName: "Netavoreikalas",
//     age: 22,
//     Phone: `+3706553252`,
//     Email: `hihihi@hihihi.com`,
//     Score: 7,
//     Group: "3rd",
//     preferedLanguages: [`Python`, `JavaScript`],
//   },
//   {
//     name: "Marcipanija",
//     lastName: "Koziuri",
//     age: 22,
//     Phone: `+370655252`,
//     Email: `hihihi@hihihi.com`,
//     Score: 5,
//     Group: "7th",
//     preferedLanguages: [`PHP`],
//   },
//   {
//     name: "Ilgas",
//     lastName: "BMW",
//     age: 22,
//     Phone: `+370655252`,
//     Email: `hihihi@hihihi.com`,
//     Score: 6,
//     Group: "4th",
//     preferedLanguages: [`JavaScript`, `JAVA`],
//   },
// ];

function renderStudent(studentData) {
  let nameSel = studentData.name;
  let lnameSel = studentData.lastName;
  let ageSel = studentData.age;
  let phoneSel = studentData.Phone;
  let emailSel = studentData.Email;
  let scoreSel = studentData.Score;
  let groupSel = studentData.Group;
  let prefLang = studentData.preferedLanguages;
  // let groupSel = document.querySelector('[name=group:checked]').value;

  let checkboxes = document.querySelectorAll('input[name="prog"]:checked');
  let studentItem = document.createElement(`div`);
  studentItem.classList.add(`student-item`);
  studentsList.prepend(studentItem);
  let secret = `*******`;

  let nameEl = document.createElement(`p`);
  nameEl.innerHTML = `<strong>Name:</strong> <span class="fnameSearch">${nameSel}</span>`;
  let lnameEl = document.createElement(`p`);
  lnameEl.innerHTML = `<strong>Last name:</strong> <span class="lnameSearch">${lnameSel}</span>`;
  let ageEl = document.createElement(`p`);
  ageEl.innerHTML = `<strong>Age:</strong> <span class="ageSearch">${ageSel}</span>`;
  let phoneEl = document.createElement(`p`);
  phoneEl.innerHTML = `<strong>Phone:</strong> ${secret}`;
  let emailEl = document.createElement(`p`);
  emailEl.innerHTML = `<strong>Email:</strong> ${secret}`;
  let scoreEl = document.createElement(`p`);
  scoreEl.innerHTML = `<strong>Score:</strong> <span class="scoreSearch">${scoreSel}</span>`;
  let groupEl = document.createElement(`p`); 
  groupEl.innerHTML = `<strong>Group:</strong> <span class="groupSearch">${groupSel}</span>`;
  // let langEl = document.createElement (`p`);
  // langEl.innerHTML = `<strong>Prefered language:</strong> ${values.join(`, `)}`
  let langWrapper = document.createElement(`div`);
  let langTitle = document.createElement(`h4`);
  langTitle.textContent = `Prefered languages:`;
  let langEl2 = document.createElement(`ul`);
  langWrapper.append(langTitle, langEl2);
  // langEl.innerHTML = `<strong>Prefered language:</strong> ${values.join(`, `)}`
  prefLang.forEach((checkbox) => {
    // values.push(checkbox.value)
    let interestItem = document.createElement(`li`);
    interestItem.textContent = checkbox;
    langEl2.append(interestItem);
  });
  let reveal = document.createElement(`button`);
  reveal.textContent = `Show data`;
  let deleteStud = document.createElement(`button`);
  deleteStud.textContent = `Delete`;
  deleteButton(deleteStud, studentItem, nameSel, lnameSel);
  let editStudentButton = document.createElement(`button`);
  studentItem.append(
    nameEl,
    lnameEl,
    ageEl,
    phoneEl,
    emailEl,
    scoreEl,
    scoreEl,
    groupEl,
    langWrapper,
    reveal,
    deleteStud,
    editStudentButton
  );

  reveal.addEventListener(`click`, () => {
    if (reveal.textContent === "Show data") {
      phoneEl.innerHTML = `<strong>Phone:</strong> ${phoneSel}`;
      emailEl.innerHTML = `<strong>Email:</strong> ${emailSel}`;
      reveal.textContent = `Hide data`;
    } else {
      phoneEl.innerHTML = `<strong>Phone:</strong> ${secret}`;
      emailEl.innerHTML = `<strong>Email:</strong> ${secret}`;
      reveal.textContent = `Show data`;
    }
  });
  // revealPersonalData(reveal, phoneEl, nameSel, secret);
  // let studItmObj = {
  //   name: nameSel,
  //   lname: lnameSel,
  //   age: ageSel,
  //   phone: phoneSel,
  //   email: emailSel,
  //   score: scoreSel,
  //   group: groupSel,
  //   prefferedLang: prefLang,
  // }
  

  
  editStudentButton.textContent = `Edit`;
  editStudentButton.addEventListener(`click`, () => {
    form.querySelector(`#name`).value = nameSel;
    form.querySelector(`#lname`).value = lnameSel;
    form.querySelector(`#age`).value = ageSel;
    form.querySelector(`#phone`).value = phoneSel;
    form.querySelector(`#score`).value = scoreSel;
    form.querySelector(`#email`).value = emailSel;
    form.elements.group.value = groupSel;
    // form.querySelector(`#group`).value = groupSel;
    prefLang.map(singleInterest => {
      form.elements.prog.forEach(formInterest => {
        if(singleInterest === formInterest.value){
          formInterest.checked = true;
        }
      })
    })
    scoreReset();
    form.querySelector(`[type = submit]`).value = `Save Changes`;
    editStudent = studentItem;
  });
  if (editStudent) {
    editStudent.replaceWith(studentItem);
    editStudent = null;
    form.querySelector(`[type = submit]`).value = `Submit`;
  } else {
    studentsList.prepend(studentItem);
  }
}
form.addEventListener("submit", (event) => {
  event.preventDefault();
  let formInterests = document.querySelectorAll('input[name="prog"]:checked');
  let interestValue = [...formInterests].map((element) => {
    return element.value;
  });

  let studentFormData = {
    name: event.target.name.value,
    lastName: event.target.lname.value,
    age: event.target.age.value,
    Phone: event.target.phone.value,
    Email: event.target.email.value,
    Score: event.target.score.value,
    Group: event.target.group.value,
    preferedLanguages: interestValue,
  };

  
  
  
  const storageName = event.target.name.value;
  localStorage.setItem("storedName", storageName);
  
  let required = document.querySelectorAll(`input.required`);
  let inputErrorMessages = document.querySelectorAll(".input-error");
  let formInvalid = validation(required, inputErrorMessages);
  console.log (formInvalid)
  if (formInvalid) {
    return;
  }
  
  renderStudent(studentFormData);
  let studentsDataArray = [studentFormData, ...baseStudents]
  // studentsDataArray.push(studentData)
  // console.log(studentsDataArray.concat(baseStudents));
  // console.log([...baseStudents, ...studentsDataArray])
  localStorage.setItem(`studentItemStor`, JSON.stringify(studentsDataArray));
  errMesageRemoval(inputErrorMessages);
  if (editStudent) {
    alertMessage(
      `Edited (${studentFormData.name} ${studentFormData.lastName})`
    );
  } else {
    alertMessage(
      `Student created (${studentFormData.name} ${studentFormData.lastName})`
    );
  }
  form.reset();
  scoreReset();
});
function renderInitialStudentData(students) {
  if(!students){
    return;
  }

  students.map((student) => {
    renderStudent(student);
  });
}
// renderInitialStudentData(baseStudents);

function scoreReset() {
  let scoreSlider = document.querySelector("#score");
  let scoreSliderOut = document.querySelector("#score_output");
  scoreSliderOut.textContent = scoreSlider.value;
  scoreSlider.addEventListener("input", () => {
    scoreSliderOut.textContent = scoreSlider.value;
  });
}
function validation(array, errMess) {
  let checker = false;
  array.forEach((elem) => {
    errMesageRemoval(errMess);
    if (!elem.value) {
      checker = true;
      inputErrorMessage(elem, `Sis laukelis yra privalomas`);
    } else {
      if (elem.name === `name`) {
        if (elem.value.length < 3) {
          inputErrorMessage(elem, "Vardas yra per trumpas");
          checker = true;
        }
      }
      if (elem.name === `lname`) {
        if (elem.value.length < 3) {
          inputErrorMessage(elem, "Pavarde yra per trumpa");
          checker = true;
        }
      }
      if (elem.name === `age`) {
        if (elem.value < 0) {
          inputErrorMessage(elem, "Amzius turi buti teigiamas");
          checker = true;
        }
        if (elem.value > 120) {
          inputErrorMessage(elem, "Amzius negali but didesnis uz 120");
          checker = true;
        }
      }
      if (elem.name === `email`) {
        if (!elem.value.includes(`@`)) {
          inputErrorMessage(
            elem,
            `Įvestas elektroninis paštas yra neteisingas`
          );
          checker = true;
        }
      }
    }
  });
  return checker;
}
scoreReset();
function inputErrorMessage(inputElement, errorMessage) {
  alertMessage(`Užpildyti ne visi privalomi laukeliai`, `red`);
  inputElement.classList.add(`red-border`);
  let inputError = document.createElement("span");
  inputError.textContent = errorMessage;
  inputElement.after(inputError);
  inputError.classList.add(`input-error`);
}
function errMesageRemoval(classSelect, removeClass) {
  classSelect.forEach((message) => {
    message.remove();
  });
}

function alertMessage(text, hue) {
  let span = document.querySelector(`#alert`);
  studentsList.prepend(span);
  span.textContent = text;
  span.style = `color: ${hue}`;
  setTimeout(() => {
    span.style = `display: none;`;
  }, 5000);
}
function deleteButton(delButton, studItem, nome, lnome) {
  delButton.addEventListener(`click`, () => {
    studItem.remove();
    alertMessage(`Student (${nome} ${lnome}) succesfully removed`);
  });
}
// function revealPersonalData (test, test1, test2, test3){
//   test.addEventListener(`click`, () => {
//     if(test.textContent === "Show data"){
//       test1.innerHTML = `<strong>Phone:</strong> ${test2}`
//       emailEl.innerHTML = `<strong>Email:</strong> ${emailSel}`
//       test.textContent = `Hide data`;
//     }
//     else{
//       test1.innerHTML = `<strong>Phone:</strong> ${test3}`
//       emailEl.innerHTML = `<strong>Email:</strong> ${secret}`
//     test.textContent = `Show data`;
//     }
// })
// }

let greatFilter = document.querySelector(`.filtras`);
greatFilter.addEventListener(`submit`, (event) => {
  event.preventDefault();
  let oneStudent = document.querySelectorAll(`.student-item`);
  oneStudent.forEach((element) => {
    element.classList.add("hider");
    // element.setAttribute('hidden', true)
    document.querySelector(`.filtras [type = button]`).addEventListener(`click`, (event) => {
        element.classList.remove("hider");
      });
  });
  console.dir (event.target.elements.filterBy.value)
  let searchBy = event.target.elements.filterBy.value;
  switch (searchBy) {
    case 'search-fname':
    paieska(event.target.filtras.value, document.querySelectorAll(`.fnameSearch`));
    break;
    case 'search-lname':
    paieska(event.target.filtras.value, document.querySelectorAll(`.lnameSearch`));
    break;
    case 'search-age':
      document.querySelectorAll(`.ageSearch`).forEach((element) => {
        let data = element.innerText
        if (data === (`${event.target.filtras.value}`)) {
          element.parentElement.parentElement.classList.remove("hider");
        }
      });
      break;
    case 'search-score':
    paieska(event.target.filtras.value, document.querySelectorAll(`.scoreSearch`));
    break;
    case 'search-group':
    paieska(event.target.filtras.value, document.querySelectorAll(`.groupSearch`));
    break;
    case 'search-lang':
        document.querySelectorAll(`div li`).forEach((element) => {
          let data = element.innerText.toLowerCase();
          if (data.includes(`${event.target.filtras.value.toLowerCase()}`)) {
            element.parentElement.parentElement.parentElement.classList.remove("hider");
          }
        });
    break;
    case `search-all`:
    paieska(event.target.filtras.value, document.querySelectorAll(`.fnameSearch`));
    paieska(event.target.filtras.value, document.querySelectorAll(`.lnameSearch`));
    paieska(event.target.filtras.value, document.querySelectorAll(`.scoreSearch`));
    paieska(event.target.filtras.value, document.querySelectorAll(`.groupSearch`));
    document.querySelectorAll(`.ageSearch`).forEach((element) => {
      let data = element.innerText
      if (data === (`${event.target.filtras.value}`)) {
        element.parentElement.parentElement.classList.remove("hider");
      }
    });
    document.querySelectorAll(`div li`).forEach((element) => {
      let data = element.innerText.toLowerCase();
      if (data.includes(`${event.target.filtras.value.toLowerCase()}`)) {
        element.parentElement.parentElement.parentElement.classList.remove("hider");
      }
    });
    break;
  }
});
function paieska(paieskosLaukasValue, kurIesko) {
  let criteria = paieskosLaukasValue;
  // console.dir(document.querySelectorAll(`.search`))
  kurIesko.forEach((element) => {
    console.log(element.innerText);
    let data = element.innerText.toLowerCase();
    if (data.includes(`${criteria.toLowerCase()}`)) {
      element.parentElement.parentElement.classList.remove("hider");
    }
  });
}

// form.addEventListener(`input`, (event) =>{
//   let nameStor = form.querySelector('#name').value
//   let lnameStor = form.querySelector('#lname').value
//   let ageStor = form.querySelector('#age').value
//   let phoneStor = form.querySelector('#phone').value
//   let emailStor = form.querySelector('#email').value
//   let scoreStor = form.querySelector('#score').value
//   let groupStor = form.elements.group.value
//   localStorage.setItem('name', nameStor)
//   localStorage.setItem('lname', lnameStor)
//   localStorage.setItem('age', ageStor)
//   localStorage.setItem('phone', phoneStor)
//   localStorage.setItem('email', emailStor)
//   localStorage.setItem('score', scoreStor)
//   localStorage.setItem('group', groupStor)
//   console.log(localStorage.getItem('name'))
//   console.log(nameStor)
// })

// form.querySelector('#name').value = localStorage.getItem('name')
// form.querySelector('#lname').value = localStorage.getItem('lname')
// form.querySelector('#age').value = localStorage.getItem('age')
// form.querySelector('#phone').value = localStorage.getItem('phone')
// form.querySelector('#email').value = localStorage.getItem('email')
// form.querySelector('#score').value = localStorage.getItem('score')
// form.elements.group.value = localStorage.getItem('group')
form.addEventListener(`input`, (event) =>{
 
  formInfo = {
    name: form.querySelector('#name').value,
    lname:form.querySelector('#lname').value,
    age:form.querySelector('#age').value,
    phone:form.querySelector('#phone').value,
    email:form.querySelector('#email').value,
    score:form.querySelector('#score').value,
    group:form.elements.group.value,
    prog:[]
  }
  form.querySelectorAll('input[name=prog]:checked').forEach(interest => {
    formInfo.prog.push(interest.value)
  })
  // console.log(event.target.name) 
  // if(event.target.name === 'prog'){
  //   console.log(event.target.id)
  //   console.log(event.target.value)
  //   formInfo.prog.push(event.target.value)
  // }
    localStorage.setItem('form-info', JSON.stringify(formInfo))
});

let localStorageInfo = JSON.parse(localStorage.getItem('form-info'))

form.querySelector('#name').value = localStorageInfo.name;
form.querySelector('#lname').value = localStorageInfo.lname;
form.querySelector('#age').value = localStorageInfo.age;
form.querySelector('#phone').value = localStorageInfo.phone;
form.querySelector('#email').value = localStorageInfo.email;
form.querySelector('#score').value = localStorageInfo.score;
form.elements.group.value = localStorageInfo.group

localStorageInfo.prog.forEach (interest =>{
  form.querySelector(`input[value = ${interest}]`).checked = true
})
// form.addEventListener(`input`, (event) =>{
//   console.log(event.target.id)
//   let inputName = event.target.id;
//   let inputvalue = event.target.value;
//   localStorage.setItem(inputName, inputvalue)
// })
  

// form.querySelector('#name').value = localStorage.getItem('name')
// form.querySelector('#lname').value = localStorage.getItem('lname')
// form.querySelector('#age').value = localStorage.getItem('age')
// form.querySelector('#phone').value = localStorage.getItem('phone')
// form.querySelector('#email').value = localStorage.getItem('email')
// form.querySelector('#score').value = localStorage.getItem('score')
// form.elements.group.value = localStorage.getItem('group')

scoreReset();
// SEPTINTA UŽDUOTIS:
// 1. Studento kūrimo ir redagavimo metu reikia sukurti visų studentų masyvą (tokiu pačiu formatu kaip ir INITIAL_STUDENT_DATA).
// 2. Šį masyvą pridėti į localStorage.
// 3. Puslapio perkrovimo metu iš localStorage esančio masyvo sukurti studentų sąrašą (pradinių studentų sukūrimo funkcionalumas).

// document.querySelectorAll('.student-item').forEach ((element) => {
//   let studItmObj = Object.assign({}, element.childNodes)
// console.log(studItmObj)
// delete studItmObj[`8`]
// delete studItmObj[`9`]
// delete studItmObj[`10`]
// console.log(studItmObj)
// localStorage.setItem('studentItmStor', JSON.stringify(studItmObj))
// })
// console.log()
// console.log((JSON.parse(`{"Hello": "Whats up?", "Hi": "Whatis on?" }`)))


renderInitialStudentData(baseStudents);