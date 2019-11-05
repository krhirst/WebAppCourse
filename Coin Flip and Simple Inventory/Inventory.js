"use strict";
class Inventory {
    constructor(item, count, price, desc) {
        this.item = item;
        this.count = count;
        this.price = price;
        this.desc = desc;
    }
}

function showInventory() {
    let inventoryList = [];
    inventoryList[0] = new Inventory("Hammer", 22, 2.99, "10 ounce hammer");
    inventoryList[1] = new Inventory("Carpenter's Saw", 12,
        12.99, "Carpenter's saw with wood handle");
    inventoryList[2] = new Inventory("Electric drill", 32, 22.99,
        "Bosch electric variable speed drill");
    let area = document.getElementById("area");
    let table = document.createElement("TABLE");
    table.setAttribute("class", "invTable");
    table.setAttribute("id", "invTable");
    area.appendChild(table);
    createHeaderRow();
    createTableBody(inventoryList);
    changeButton();
}

function hideInventory() {
    let area = document.getElementById("area");
    area.removeChild(area.firstChild);
    changeButton();
}

function changeButton() {
    let button = document.getElementById("onlyButton");
    if (button.innerText === "Show Inventory") {
        button.setAttribute("onclick", "hideInventory()");
        button.innerText = "Hide Inventory";
        button.style.marginLeft = "4em";
        button.style.marginTop = "2em";
    } else {
        button.setAttribute("onclick", "showInventory()");
        button.innerText = "Show Inventory";
        button.style.marginLeft = "2em";
        button.style.marginTop = null;
    }
}

function createHeaderRow() {
    let header = document.createElement("THEAD");
    header.setAttribute("id", "header");
    let row = document.createElement("TR");
    document.getElementById("invTable").appendChild(header);
    document.getElementById("header").appendChild(row);
    let cell1 = document.createElement("TH");
    let cell2 = document.createElement("TH");
    let cell3 = document.createElement("TH");
    let cell4 = document.createElement("TH");
    cell1.innerText = "Item";
    row.appendChild(cell1);
    cell2.innerText = "Count";
    row.appendChild(cell2);
    cell3.innerText = "Price";
    row.appendChild(cell3);
    cell4.innerText = "Description";
    row.appendChild(cell4);
}

function createTableBody(inventoryList) {
    let tBody = document.createElement("TBODY");
    tBody.setAttribute("id", "tableBody");
    document.getElementById("invTable").appendChild(tBody);
    for (let i = 0; i < inventoryList.length; i++) {
        createRow(inventoryList[i]);
    }
}

function createRow(item) {
    let row = document.createElement("TR");
    document.getElementById("tableBody").appendChild(row);
    let cell1 = document.createElement("TD");
    let cell2 = document.createElement("TD");
    let cell3 = document.createElement("TD");
    let cell4 = document.createElement("TD");
    cell1.innerText = item.item;
    cell2.innerText = item.count;
    cell3.innerText = item.price;
    cell4.innerText = item.desc;
    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    row.appendChild(cell4);
}
