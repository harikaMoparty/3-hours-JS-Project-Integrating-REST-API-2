const crudAPIkey = 'https://crudcrud.com/api/2d567847694e4b72938a0b0b801fa7f0/orderData';

//change of events when takes input

const myForm = document.querySelector('#my-form');
const msg = document.querySelector('#msg');
const itemPrice = document.querySelector('#price');
const itemName = document.querySelector('#name');
const itemTable = document.querySelector('#table');
const btn = document.querySelector('#btn');


function addItemList(itemDataList){
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.appendChild(document.createTextNode(`${itemDataList.price} - ${itemDataList.name} - ${itemDataList.table}`));

    // adding delete button on list
    var deleteBtn = document.createElement('button');
    deleteBtn.className = "btn btn-sm btn-danger mx-1";
    deleteBtn.appendChild(document.createTextNode('Delete Order'));
    li.appendChild(deleteBtn);

    //adding list in table
    if(itemDataList.table === 'table1'){
        document.querySelector('#table1').appendChild(li);
    }
    if(itemDataList.table === 'table2'){
        document.querySelector('#table2').appendChild(li);
    }
    if(itemDataList.table === 'table3'){
        document.querySelector('#table3').appendChild(li);
    }

    //delete item when clicked
    deleteBtn.addEventListener('click', (e) => {
        var itemCrudAPI = crudAPIkey + `/${itemDataList._id}`;

        // delete item
        axios
            .delete(itemCrudAPI)
            .then()
            .catch((error) => {
                console.log(error);
            })
        
        li.remove();

    })
}

// rendering listItems stored in crud server
window.addEventListener("DOMContentLoaded", () => {
    axios
        .get(crudAPIkey)
        .then((response) => {
            for(var i=0; i<response.data.length; i++){
                addItemList(response.data[i]);
            }
        })
        .catch((error) => {
            console.log(error);
        })
})

btn.addEventListener('click', (e) => {
    e.preventDefault();

    if (itemPrice.value === '' || itemName.value === '' || itemtable.value === '') {
        msg.innerHTML = '*Please enter all fields';

    } else {

        //storing items as an object on crud-crud using axios
        let allItems = {
            price: itemPrice.value,
            name: itemName.value,
            table: itemTable.value
        };

        axios
            .post(crudAPIkey, allItems)
            .then((response) => {
                //calling addItemList function
                addItemList(response.data)

                //clear fields
                itemPrice.value = '';
                itemName.value = '';
                itemTable.value = '';
                msg.innerHTML = ""; 
            })
            .catch((err) => {
                msg.innerHTML = "*something wrong with the API server";
            })
    }
});