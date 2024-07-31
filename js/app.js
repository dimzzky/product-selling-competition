// Initialize Tom Select for seller and products
const sellerSelect = new TomSelect("#seller", {
    plugins: ['clear_button'],
    persist: false,
    create: true,
});

const productsSelect = new TomSelect("#products", {
    plugins: ['clear_button'],
    persist: false,
    create: true,
    onChange: function (values) {
        updateQuantities(values);
    }
});

// Function to update quantities section
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

// Function to validate form inputs
function validateForm() {
    const buyerName = document.getElementById('buyerName').value.trim();
    const phoneNumber = document.getElementById('phoneNumber').value.trim();
    const selectedProducts = document.getElementById('products').selectedOptions;

    if (!buyerName || !phoneNumber || selectedProducts.length === 0) {
        return false;
    }

    for (let product of selectedProducts) {
        const productQuantity = document.getElementById(`${product.value}Quantity`);
        if (!productQuantity || !productQuantity.value.trim()) {
            return false;
        }
    }

    return true;
}

// Function to send data to WhatsApp
function sendToWhatsApp() {
    if (!validateForm()) {
        Swal.fire({
            icon: 'warning',
            title: 'Form belum lengkap',
            text: 'Pastikan semua form terisi semua'
        });
        return;
    }

    const buyerName = document.getElementById('buyerName').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const seller = Array.from(document.getElementById('seller').selectedOptions).map(option => option.value).join(', ');

    const selectedProducts = document.getElementById('products').selectedOptions;
    let productDetails = '';

    for (let product of selectedProducts) {
        const productQuantity = document.getElementById(`${product.value}Quantity`).value;
        productDetails += `- ${product.value}: ${productQuantity} Pcs \n`;
    }

    const message = `Nama Pembeli: ${buyerName}\nBeli di: SA Lodan\nBeli dari siapa: ${seller}\nProduk yang dibeli:\n${productDetails}`;
    const encodedMessage = encodeURIComponent(message);

    const whatsappNumber = '+6282299097492'; // Replace with the actual WhatsApp number
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    Swal.fire({
        title: 'Apakah anda yakin?',
        text: 'Pastikan produk yang anda pilih sudah benar',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelbuttonText: 'Batal',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, kirim'
    }).then((result) => {
        if (result.isConfirmed) {
            window.open(whatsappLink, '_blank');
            resetForm();
            Swal.fire(
                'Terkirim',
                'Kamu akan di arahkan ke whatsapp',
                'success'
            );
        }
    });
}

// Function to reset form
function resetForm() {
    document.getElementById('sellingForm').reset();
    document.getElementById('quantities').innerHTML = '';
    sellerSelect.clear();
    productsSelect.clear();
}

// Call resetForm on page load
window.onload = resetForm;
