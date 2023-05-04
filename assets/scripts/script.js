"use strict";

const formWrapper = document.querySelector("#form-wrapper");

const confirmationWrapper = document.querySelector("#confirmation-wrapper");

formWrapper.addEventListener("submit", addCardDetails);

function addCardDetails(event) {
  event.preventDefault();

  const cardholder = document.querySelector("#cardholder");
  const cardnumber = document.querySelector("#cardnumber");
  const month = document.querySelector("#month");
  const year = document.querySelector("#year");
  const cvc = document.querySelector("#cvc");

  console.log(cardholder.value);
  console.log(cardnumber.value);
  console.log(month.value);
  console.log(year.value);
  console.log(cvc.value);

  const previewCardholder = document.querySelector("#preview-cardholder");
  const previewCardnumber = document.querySelector("#preview-cardnumber");
  const previewDate = document.querySelector("#preview-date");
  const previewCvc = document.querySelector("#preview-cvc");

  const cardFields = document.querySelectorAll(".card-field");

  let error = false;

  cardFields.forEach((field) => {
    if (!validateDetails(field)) {
      error = true;
      return;
    }
  });

  if (error) {
    return;
  }

  previewCardholder.innerText = cardholder.value;
  previewCardnumber.innerText = cardnumber.value;
  previewDate.innerText = month.value + "/" + year.value;
  previewCvc.innerText = cvc.value;

  confirmationWrapper.hidden = false;
  formWrapper.hidden = true;

  cardFields.forEach((cardField) => (cardField.value = ""));
}

function validateDetails(field) {
  let errorField;

  if (field.className.includes("date")) {
    errorField = field.parentElement.parentElement.querySelector(".warning");
  } else {
    errorField = field.parentElement.querySelector(".warning");
  }

  //Check if any field is empty
  if (field.value.length === 0) {
    errorField.hidden = false;

    if (field.id === "year" && errorField.innerText.length > 0) {
      errorField.innerText += "\nField can't be empty.";
      return false;
    }

    errorField.innerText = "Field can't be empty.";
    return false;
  }

  //Check if input contains wrong char types
  //Letters instead of Numbers
  if (field.id === "cardnumber") {
    if (
      field.value.replaceAll(" ", "").length !== 16 ||
      /\D+/.test(field.value.replaceAll(" ", ""))
    ) {
      errorField.hidden = false;
      errorField.innerText = "Wrong Format";
      return false;
    }
  }

  if (field.id === "month" || field.id === "year") {
    if (
      field.value.replaceAll(" ", "").length !== 2 ||
      /\D+/.test(field.value.replaceAll(" ", ""))
    ) {
      errorField.hidden = false;
      errorField.innerText = "Wrong Format";
      return false;
    }
  }

  if (field.id === "cvc") {
    if (
      field.value.replaceAll(" ", "").length !== 3 ||
      /\D+/.test(field.value.replaceAll(" ", ""))
    ) {
      errorField.hidden = false;
      errorField.innerText = "Wrong Format";
      return false;
    }
  }

  errorField.hidden = true;
  errorField.innerText = "";

  return true;
}

const btnContinue = document.querySelector("#btn-continue");

btnContinue.addEventListener("click", () => {
  formWrapper.hidden = false;
  confirmationWrapper.hidden = true;
});
