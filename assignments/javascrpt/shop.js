// 购物清单数组
let shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', () => {
    updateList();
    updateSummary();
});

// 添加商品
function addItem() {
    const name = document.getElementById('itemName').value;
    const price = parseFloat(document.getElementById('itemPrice').value);
    const quantity = parseInt(document.getElementById('itemQuantity').value);

    if (!name || !price || !quantity) {
        alert('请填写完整的商品信息！');
        return;
    }

    const item = {
        id: Date.now(),
        name: name,
        price: price,
        quantity: quantity,
        date: new Date()
    };

    shoppingList.push(item);
    saveToLocalStorage();
    updateList();
    updateSummary();
    clearInputs();
}

// 删除商品
function deleteItem(id) {
    shoppingList = shoppingList.filter(item => item.id !== id);
    saveToLocalStorage();
    updateList();
    updateSummary();
}

// 搜索商品
function searchItems() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filteredList = shoppingList.filter(item => 
        item.name.toLowerCase().includes(searchTerm)
    );
    displayItems(filteredList);
}

// 按价格排序
function sortByPrice() {
    shoppingList.sort((a, b) => a.price - b.price);
    updateList();
}

// 按名称排序
function sortByName() {
    shoppingList.sort((a, b) => a.name.localeCompare(b.name));
    updateList();
}

// 更新列表显示
function updateList() {
    displayItems(shoppingList);
}

// 显示商品列表
function displayItems(items) {
    const listElement = document.getElementById('shoppingList');
    listElement.innerHTML = '';

    items.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="item-info">
                <span class="item-name">${item.name}</span>
                <span class="item-price">
                    单价: ¥${item.price.toFixed(2)} × ${item.quantity} = 
                    ¥${(item.price * item.quantity).toFixed(2)}
                </span>
            </div>
            <button class="delete-btn" onclick="deleteItem(${item.id})">删除</button>
        `;
        listElement.appendChild(li);
    });
}

// 更新统计信息
function updateSummary() {
    const totalAmount = shoppingList.reduce((sum, item) => 
        sum + (item.price * item.quantity), 0
    );
    
    document.getElementById('totalAmount').textContent = 
        `¥${totalAmount.toFixed(2)}`;
    document.getElementById('totalItems').textContent = 
        shoppingList.length;
}

// 清空输入框
function clearInputs() {
    document.getElementById('itemName').value = '';
    document.getElementById('itemPrice').value = '';
    document.getElementById('itemQuantity').value = '';
}

// 保存到本地存储
function saveToLocalStorage() {
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}