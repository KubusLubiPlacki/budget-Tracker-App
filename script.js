const nameTransaction=document.getElementById("name-transaction");
const amount=document.getElementById("amount");
const btn=document.querySelector("button");

const ctx = document.getElementById("myChart");
let xValues=["Income","Expense"];
let yValues=[0,0];
let barColors=["#3F9597","#FA8C71"];
let newData=[0,0];


let price=0
let expenses=0;
let balance=0;

const spanName=document.getElementById("spanName");
const spanAmount=document.getElementById("spanAmount");

const myChart=new Chart(ctx, {
    type: "bar",
    data: {
        labels: xValues,
        datasets: [{
            backgroundColor: barColors,
            data: yValues
        }]
    },
    options: {
        legend: {display: true},
    }
    });



function updateData(number){
    if(number>0){
        price+=Number(number);
        document.querySelector(".income").textContent=`$${price}`;
        newData[0]=newData[0]+price;
        myChart.data.datasets[0].data[0]=newData[0];

    }
    if(number<0){
        expenses+=Number(number);
        document.querySelector(".expenses").textContent=`$${expenses}`;
        if(expenses<0){
           document.querySelector(".expenses").style.color="#FA8C71" 
        }
        newData[1]=newData[1]+expenses*(-1);
        myChart.data.datasets[0].data[1]=newData[1];
    }
    let balance=price+expenses;
    if(balance>=0){
        document.querySelector(".balance").style.color="#3F9597";
    }
    else{
        document.querySelector(".balance").style.color="#FA8C71";
    }
    document.querySelector(".balance").textContent=`$${balance}`;
    
    myChart.update()
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
    nameExpense.innerText=name;

    nameExpense.classList.add("element-name");
    
    content.append(nameExpense,priceExpense);
    document.querySelector(".transaction-history-list").append(content);
}

btn.addEventListener("click",()=>{
    let arg1=false;
    let arg2=false;
    if(nameTransaction.value==""){
        nameTransaction.style.border="3px solid #FA8C71";
        spanName.style.display="block";
        arg2=false;
    }
    else{
        spanName.style.display="none";
        arg2=true;
        nameTransaction.style.border="1px solid rgba(0, 0, 0, 0.1)";
    }
    
    
    if(amount.value=="" || isNaN(amount.value)){
        amount.style.border="3px solid #FA8C71";
        spanAmount.style.display="block"
        arg1=false;
    }
    else{
        spanAmount.style.display="none";
        arg1=true;
        amount.style.border="1px solid rgba(0, 0, 0, 0.1)";
    }

    if(arg1 && arg2){
        console.log("tak")
        updateData(amount.value);
        createExpense(nameTransaction.value,amount.value);
        amount.value="";
        nameTransaction.value="";
    }
    
})