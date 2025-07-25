const nameTransaction=document.getElementById("name-transaction");
const amount=document.getElementById("amount");
const btn=document.querySelector("button");

const ctx = document.getElementById("myChart");
let xValues=["Income","Expense"];
let yValues=[100,200];
let barColors=["#3F9597","#FA8C71"];

let price=0
let expenses=0;
let balance=0;

function updateData(number){
    if(number>0){
        price+=Number(number);
        document.querySelector(".income").textContent=`$${price}`;
        yValues[0]=yValues+price;
    }
    if(number<0){
        expenses+=Number(number);
        document.querySelector(".expenses").textContent=`$${expenses}`;
        if(expenses<0){
           document.querySelector(".expenses").style.color="#FA8C71" 
        }
        yValues[0]=yValues+expenses;
    }
    let balance=price+expenses;
    if(balance>=0){
        document.querySelector(".balance").style.color="#3F9597";
    }
    else{
        document.querySelector(".balance").style.color="#FA8C71";
    }
    document.querySelector(".balance").textContent=`$${balance}`;
    new Chart(ctx, {
    type: "bar",
    data: {
        labels: xValues,
        datasets: [{
            backgroundColor: barColors,
            data: yValues
        }]
    },
    options: {
        legend: {display: false},
    }
    });
    //repair graph
    
}

function createExpense(name,price){
    let content=document.createElement("div");
    content.classList.add("element");

    let nameExpense=document.createElement("p");
    let priceExpense=document.createElement("p");
    if(price[0]=="-"){
        priceExpense.classList.add("element-price-minus");
        let arr=[...price];
        arr.splice(1,0,"$");
        priceExpense.innerHTML=`${arr.join("")}`;
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