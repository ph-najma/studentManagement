// TypeScript definitions for DOM elements
let studentname = false;
let RollNo = false;
let DOB = false;
let gender = false;
let studentEmail = false;
let phone = false;
let course = false;
let studentImages = false;

function updateSubmitButton() {
  const submitButton = document.getElementById(
    "submitButton"
  ) as HTMLButtonElement;

  if (
    studentname &&
    RollNo &&
    DOB &&
    gender &&
    studentEmail &&
    phone &&
    course &&
    studentImages
  ) {
    submitButton.removeAttribute("disabled");
  } else {
    submitButton.setAttribute("disabled", "disabled");
  }
}

function validateName() {
  const nameElement = document.getElementById("name") as HTMLInputElement;
  const nameErrorElement = document.getElementById("nameError") as HTMLElement;
  const name = nameElement.value;
  const nameRegex = /^[A-Za-z\s]+$/;

  if (!name) {
    studentname = false;
    nameErrorElement.innerText = "Name is required";
  } else if (!name.match(nameRegex)) {
    studentname = false;
    nameErrorElement.innerText = "Name can only contain letters and spaces";
  } else {
    studentname = true;
    nameErrorElement.innerText = "";
  }
  updateSubmitButton();
}

function validateRollNo() {
  const rollnoElement = document.getElementById("rollno") as HTMLInputElement;
  const rollNoErrorElement = document.getElementById(
    "rollNoError"
  ) as HTMLElement;
  const rollno = rollnoElement.value;

  if (!rollno) {
    RollNo = false;
    rollNoErrorElement.innerText = "Rollno is required";
  } else if (+rollno <= 0) {
    RollNo = false;
    rollNoErrorElement.innerText =
      "Roll Number can't be a negative value or zero";
  } else {
    RollNo = true;
    rollNoErrorElement.innerText = "";
  }
  updateSubmitButton();
}

function validateDOB() {
  const dobElement = document.getElementById("dob") as HTMLInputElement;
  const DOBErrorElement = document.getElementById("DOBError") as HTMLElement;
  const datebirth = dobElement.value;
  const today = new Date();
  const dobDate = new Date(datebirth);
  let age = today.getFullYear() - dobDate.getFullYear();
  const monthDiff = today.getMonth() - dobDate.getMonth();
  const dayDiff = today.getDate() - dobDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  if (!datebirth) {
    DOB = false;
    DOBErrorElement.innerText = "Date of birth is required";
  } else if (age < 5) {
    DOB = false;
    DOBErrorElement.innerText = "The student must be at least 5 years old";
  } else if (age > 100) {
    DOB = false;
    DOBErrorElement.innerText = "The age is not allowed";
  } else {
    DOB = true;
    DOBErrorElement.innerText = "";
  }
  updateSubmitButton();
}

function validateGender() {
  const genderElement = document.getElementById("gender") as HTMLSelectElement;
  const genderErrorElement = document.getElementById(
    "genderError"
  ) as HTMLElement;
  const Gen = genderElement.value;
  const allowedGenders = ["MALE", "FEMALE", "OTHERS"];

  if (!Gen) {
    gender = false;
    genderErrorElement.innerText = "Gender is required";
  } else if (allowedGenders.includes(Gen)) {
    gender = true;
    genderErrorElement.innerText = "";
  } else {
    gender = false;
    genderErrorElement.innerText = "Invalid gender";
  }
  updateSubmitButton();
}

function validateEmail() {
  const emailElement = document.getElementById("email") as HTMLInputElement;
  const emailErrorElement = document.getElementById(
    "emailError"
  ) as HTMLElement;
  const studemail = emailElement.value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!studemail) {
    studentEmail = false;
    emailErrorElement.innerText = "Email is required";
  } else if (emailRegex.test(studemail)) {
    studentEmail = true;
    emailErrorElement.innerText = "";
  } else {
    studentEmail = false;
    emailErrorElement.innerText = "Invalid email address";
  }
  updateSubmitButton();
}

function validatePhone() {
  const phoneElement = document.getElementById("phone") as HTMLInputElement;
  const phoneErrorElement = document.getElementById(
    "phoneError"
  ) as HTMLElement;
  const phoneNumber = phoneElement.value;
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;

  if (!phoneNumber) {
    phone = false;
    phoneErrorElement.innerText = "Phone number is required";
  } else if (phoneRegex.test(phoneNumber)) {
    phone = true;
    phoneErrorElement.innerText = "";
  } else {
    phone = false;
    phoneErrorElement.innerText = "Invalid phone number";
  }
  updateSubmitButton();
}

function validateCourse() {
  const courseElement = document.getElementById("course") as HTMLInputElement;
  const courseErrorElement = document.getElementById(
    "courseError"
  ) as HTMLElement;
  const cour = courseElement.value;
  const allowedCourses = ["BCA", "BCOM", "OTHERS"];

  if (!cour) {
    course = false;
    courseErrorElement.innerText = "Course is required";
  } else if (allowedCourses.includes(cour)) {
    course = true;
    courseErrorElement.innerText = "";
  } else {
    course = false;
    courseErrorElement.innerText = "Invalid course";
  }
  updateSubmitButton();
}

function validateImages() {
  const imagesElement = document.getElementById("images") as HTMLInputElement;
  const imageErrorElement = document.getElementById(
    "imageError"
  ) as HTMLElement;
  const files = imagesElement.files;

  if (!files || files.length <= 0) {
    studentImages = false;
    imageErrorElement.innerText = "Please select at least one image";
  } else {
    studentImages = true;
    imageErrorElement.innerText = "";
  }
  updateSubmitButton();
}
