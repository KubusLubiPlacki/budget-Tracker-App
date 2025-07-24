const nameTransaction=document.getElementById("name-transaction");
const amount=document.getElementById("amount");
const btn=document.querySelector("button");

let price=0

function updateData(number){
    price+=Number(number);
    document.querySelector(".balance").textContent=`$${price}`;
    document.querySelector(".income").textContent=`$${price}`;
    // repair income (it shouldnt remove money from it)
}

function createExpense(name,price){
    let content=document.createElement("div");
    content.classList.add("element");

    let nameExpense=document.createElement("p");
    let priceExpense=document.createElement("p");
    if(price[0]=="-"){
        priceExpense.classList.add("element-price-minus");
        priceExpense.innerHTML=`$${price}`;
    }
    else{
        priceExpense.classList.add("element-price-plus");
        priceExpense.innerHTML=`+$${price}`;
    } 
    // repair sequence of characters(should be for example -$1200, now its $-1200)
    
    nameExpense.innerText=name;

    nameExpense.classList.add("element-name");
    
    content.append(nameExpense,priceExpense);
    document.querySelector(".transaction-history-list").append(content);
}

btn.addEventListener("click",()=>{
    updateData(amount.value);
    createExpense(nameTransaction.value,amount.value);
    amount.value="";
    nameTransaction.value=""
})