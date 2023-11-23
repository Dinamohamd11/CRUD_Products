
var productName = document.getElementById("productName")
var productPrice = document.getElementById("productPrice")
var productCateg = document.getElementById("productCateg")
var productDesc = document.getElementById("productDesc")
var productCount = document.getElementById("productCount")
var TotalPrice = document.getElementById('total')
var productContainer;
var UpdateList;
if (localStorage.getItem("ourProducts") == null) {
    productContainer = [];    
} else {
    productContainer = JSON.parse(localStorage.getItem("ourProducts"))
    displayProduct()
}
function addProduct() {
    var product = {
        name: productName.value,
        price: productPrice.value,
        categ: productCateg.value,
        desc: productDesc.value,
        count: productCount.value,
        total: productCount.value * productPrice.value
    }
    productContainer.push(product)
    localStorage.setItem("ourProducts", JSON.stringify(productContainer))
    displayProduct()
    clearInp();
}
function updateProduct(){
    for (var i = 0; i < productContainer.length; i++) {
        if(productContainer[i].name == UpdateList.name 
            && productContainer[i].price == UpdateList.price 
            && productContainer[i].categ == UpdateList.categ 
            && productContainer[i].desc == UpdateList.desc
            && productContainer[i].count == UpdateList.count
            )
        {
                productContainer[i].name = productName.value;  
                productContainer[i].price = productPrice.value;  
                productContainer[i].desc= productDesc.value;  
                productContainer[i].categ = productCateg.value;  
                productContainer[i].count = productCount.value;
                productContainer[i].total=  productCount.value * productPrice.value;
                localStorage.setItem("ourProducts", JSON.stringify(productContainer))
                break
        }
    }
    displayProduct();
}
function displayProduct() {
    var ProductList = ""
    var Tot = 0;
    for (var i = 0; i < productContainer.length; i++) {
        ProductList += `
        <tr>
            <td>${i + 1}</td>
            <td>${productContainer[i].name}</td>
            <td>${productContainer[i].price}</td>
            <td>${productContainer[i].categ}</td>
            <td>${productContainer[i].desc}</td>
            <td>${productContainer[i].count}</td>
            <td>${productContainer[i].total}</td>
            <td>
                <button class="btn btn-danger" onclick="deleteRow(${i})"> Delete </button>
            </td>
            <td>
                <button class="btn btn-warning " onclick="update(${i})"> Update </button>
            </td>
        </tr>`;
        Tot += productContainer[i].total;
    }
    document.getElementById("tBody").innerHTML = ProductList
    TotalPrice.innerText = `Total: ${Tot}.00`
}
function clearInp() {
    productName.value = "";
    productPrice.value = "";
    productCateg.value = "";
    productDesc.value = ""; 
    productCount.value = "";
}
function deleteAll() {
    productContainer.splice(0);
    localStorage.setItem("ourProducts", JSON.stringify(productContainer))
    displayProduct()
}
function deleteRow(i) {
    productContainer.splice(i, 1)
    localStorage.setItem("ourProducts", JSON.stringify(productContainer))

    displayProduct()
}
function update(i)
{
    productName.value = productContainer[i].name;
    productPrice.value = productContainer[i].price;
    productCateg.value = productContainer[i].categ;
    productDesc.value = productContainer[i].desc;
    productCount.value = productContainer[i].count;
    document.getElementById('add').classList.remove('d-inline-block')
    document.getElementById('add').classList.add('d-none')
    document.getElementById('upd').classList.remove('d-none')
    document.getElementById('upd').classList.add('d-inline-block')
    UpdateList = {
        name:productName.value,
        price:productPrice.value,
        categ:productCateg.value,
        desc:productDesc.value,
        count:productCount.value
    }
}
