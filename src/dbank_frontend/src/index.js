import { dbank_backend } from "../../declarations/dbank_backend";

window.addEventListener("load", async () => {
  update();
});

document.querySelector("form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const button = event.target.querySelector("#submit-btn");
  const addInput = document.querySelector("#input-amount");
  const withdrawInput = document.querySelector("#withdrawal-amount");

  const inputAmount = parseFloat(addInput.value);
  const withdrawalAmount = parseFloat(withdrawInput.value);

  button.setAttribute("disabled", true);

  if (addInput.value.length !== 0) {
    await dbank_backend.topUp(inputAmount);
    addInput.value = "";
  }

  if (withdrawInput.value.length !== 0) {
    await dbank_backend.withdraw(withdrawalAmount);
    withdrawInput.value = "";
  }

  await dbank_backend.compound();

  update();
  
  button.removeAttribute("disabled");
});

async function update () {
  const currentAmount = await dbank_backend.checkBalance();
  document.querySelector("#value").innerText = Math.round(currentAmount * 100) / 100;
}
