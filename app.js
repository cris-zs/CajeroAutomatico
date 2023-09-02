//Usuarios
let users = [
  {
    name: 'Don Cangrejo',
    password: 1234,
    currentBalance: 200,
  },
  {
    name: 'Calamardo',
    password: 5678,
    currentBalance: 200,
  },
  {
    name: 'Bob Esponja',
    password: 9101,
    currentBalance: 200,
  }
];

const passwordDiv = document.getElementById('pwdPrompt');
const userDiv = document.getElementById('user-interface');
let depositOperationDiv = document.getElementById('deposit-operation');
let depositValue = null;

let userGreeting = document.getElementById('user-greet');
let accountStatus = document.getElementById('account-status');


let depositInput = document.createElement('input');
let depositButton = document.createElement('button');
let user = null;

const reset = function () {
  user = null
  depositOperationDiv.replaceChildren();
  userGreeting.replaceChildren();
  accountStatus.replaceChildren();
  userDiv.style.display = 'none';
  let passwordOption = document.getElementById('pwdInput');
  passwordOption.value = '';
  passwordDiv.style.display = 'none';
  let selectOption = document.getElementById('my-select');
  selectOption.value = "0";
}
reset();

const userId = function () {
  checkUser = Number(this.value);
  user = users[checkUser - 1];
  console.log(user.name);
  passwordDiv.style.display = 'block';


}

const depositOperation = function () {
  depositInput.id = 'deposit-input';
  depositInput.type = 'number';
  depositInput.placeholder = 'Ingresa el monto a depositar';
  depositOperationDiv.appendChild(depositInput);

  depositButton.id = 'deposit-button';
  depositButton.textContent = 'Agregar';
  depositOperationDiv.appendChild(depositButton);

  depositButton.addEventListener('click', depositarORetirar)
}

function depositarORetirar(event) {
  event.preventDefault();
  depositValue = Number(depositInput.value);
  depositInput.value = '';
  let h3 = accountStatus.getElementsByTagName('h3')[0]
  if (depositValue === '') {
    alert('Ingrese un monto');
    return;
  }

  let balance = user.currentBalance
  if (event.target.textContent === 'Agregar') {
    balance += depositValue;
    if (balance >900){
      alert('No puede tener mas de $900');
      return;
    }
  } else if (event.target.textContent === 'Retirar') {
    balance -= depositValue;
    if (balance <10){
      alert('No puede tener menos de $10');
      return;
    }
  }

  user.currentBalance = balance;
  h3.textContent = `Tu saldo actual es de: ${user.currentBalance}`;
}

const withdrawalOperation = function () {
  depositInput.id = 'deposit-input';
  depositInput.type = 'number';
  depositInput.placeholder = 'Ingresa el monto a retirar';
  depositOperationDiv.appendChild(depositInput);

  depositButton.id = 'deposit-button';
  depositButton.textContent = 'Retirar';
  depositOperationDiv.appendChild(depositButton);
  depositButton.addEventListener('click', depositarORetirar)

}




const operationSelection = function () {
  let buttons = document.getElementsByClassName('btn');
  let h2 = document.createElement('h2');
  userGreeting.appendChild(h2);
  h2.textContent = `Hola, ${user.name}`;

  let h3 = document.createElement('h3');
  accountStatus.appendChild(h3);
  h3.textContent = `Tu saldo actual es de: ${user.currentBalance}`;


  for (let i = 0; i <= buttons.length; i++) {
    let btn = buttons[i]
    if (!!btn) {

      let fn;
      if (i === 0) {
        fn = depositOperation;
      } else if (i === 1) {
        fn = withdrawalOperation;
      } else if (i === 2) {
        fn = reset;
      }

      btn.addEventListener('click', fn);
    }
  }
}

const passwordVerify = function () {
  let passwordEntry = this.value;
  if (passwordEntry != user.password) {
    document.getElementById('pwdInput').value = "";
    alert("Contraseña incorrecta");

  } else {
    userDiv.style.display = 'block';
    operationSelection();
  }
}

document.getElementById('my-select').addEventListener('change', userId);
document.getElementById('pwdInput').addEventListener('change', passwordVerify);








