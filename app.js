// Initialize Tom Select for seller and products
new TomSelect("#seller", {
    plugins: ['clear_button'],
    persist: false,
    create: true,
});

new TomSelect("#products", {
    plugins: ['clear_button'],
    persist: false,
    create: true,
    onChange: function (values) {
        updateQuantities(values);
    }
});

function updateQuantities(selectedProducts) {
    const quantitiesDiv = document.getElementById('quantities');
    quantitiesDiv.innerHTML = ''; // Clear previous quantities

    selectedProducts.forEach(product => {
        const quantityInput = document.createElement('div');
        quantityInput.className = 'form-group';
        quantityInput.innerHTML = `
        <div class='row form-group px-3'>
            <label for="${product}Quantity">${product} Jumlah Produk (Pcs): 
            <input class='col-2 pl-2' type="number" class="form-control" id="${product}Quantity" name="${product}Quantity" min="1" required>
            </label>
            
        </div>
            `;
        quantitiesDiv.appendChild(quantityInput);
    });
}

function sendToWhatsApp() {
    const buyerName = document.getElementById('buyerName').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const seller = Array.from(document.getElementById('seller').selectedOptions).map(option => option.value).join(', ');

    const selectedProducts = document.getElementById('products').selectedOptions;
    let productDetails = '';

    for (let product of selectedProducts) {
        const productQuantity = document.getElementById(`${product.value}Quantity`).value;
        productDetails += `- ${product.value}: ${productQuantity} Pcs \n`;
    }

    if (productDetails === '') {
        alert('Please select at least one product and enter the quantity.');
        return;
    }

    const message = `Nama Pembeli: ${buyerName}\nNomor Handphone: ${phoneNumber}\nBeli dari siapa: ${seller}\nProduk yang dibeli:\n${productDetails}`;
    const encodedMessage = encodeURIComponent(message);

    const whatsappNumber = '+6282299097492'; // Replace with the actual WhatsApp number
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappLink, '_blank');
}
