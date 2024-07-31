let productCount = 0;

function addProduct() {
    productCount++;
    const productsContainer = document.getElementById('productsContainer');

    const productRow = document.createElement('div');
    productRow.className = 'form-group row align-items-center product-row';
    productRow.id = `productRow${productCount}`;

    productRow.innerHTML = `
        <div class="col-1">
            <button type="button" class="btn btn-danger btn-sm remove-product" onclick="removeProduct(${productCount})">
                <i class="fa fa-trash"></i>
            </button>
        </div>
        <div class="col-7">
            <select id="product${productCount}" name="products[]" class="product-select form-control" placeholder="Pilih produk">
                <option value="">Pilih produk</option>
                <option value="AYU POP TOILET SOAP PAPAYA">AYU POP TOILET SOAP PAPAYA</option>
                <option value="AYU POP TOILET SOAP PAPAYA SNACK BOX">AYU POP TOILET SOAP PAPAYA SNACK BOX</option>
                <option value="B-29 CREAM B2 15000GR PLW PACK">B-29 CREAM B2 15000GR PLW PACK</option>
                <option value="B-29 CREAM B500 YELLOW 150GR PLW PACK">B-29 CREAM B500 YELLOW 150GR PLW PACK</option>
                <option value="B-29 CREAM C 460 K 430GR CUP">B-29 CREAM C 460 K 430GR CUP</option>
                <option value="B-29 DISHWASH FRESH LIME 750ML SPOUT POUCH">B-29 DISHWASH FRESH LIME 750ML SPOUT POUCH</option>
                <option value="B-29 DISHWASH LIME+KEMANGI 750ML SPOUT POUCH">B-29 DISHWASH LIME+KEMANGI 750ML SPOUT POUCH</option>
                <option value="B-29 PW SOFTENER PINK 200GR/24PCS GST BAG">B-29 PW SOFTENER PINK 200GR</option>
                <option value="B-29 PW SOFTENER PINK 410GR/12PCS GST BAG">B-29 PW SOFTENER PINK 410GR</option>
                <option value="INTENSE FOR DRY HAIR/PURPLE 200ML">INTENSE FOR DRY HAIR/PURPLE 200ML</option>
                <option value="INTENSE FOR NORMAL HAIR/GREEN 200ML">INTENSE FOR NORMAL HAIR/GREEN 200ML</option>
                <option value="INTENSE FOR OILY HAIR/ORANGE 200ML">INTENSE FOR OILY HAIR/ORANGE 200ML</option>
                <option value="INTENSE HAIRTONIC YELLOW 35ML">INTENSE HAIRTONIC YELLOW 35ML</option>
                <option value="KRIS BODYMIST HAPPY FLOWER/PINK 100 ML BTL">KRIS BODYMIST HAPPY FLOWER/PINK 100 ML BTL</option>
                <option value="KRIS HAIRMIST CHARMING/PURPLE 20ML BTL">KRIS HAIRMIST CHARMING/PURPLE 20ML BTL</option>
                <option value="KRIS HBL BLOOMING NORDIC COTTON/BLUE 100ML BTL">KRIS HBL BLOOMING NORDIC COTTON/BLUE 100ML BTL</option>
                <option value="KRIS HBL HAPPY BERRY/RED 100ML BTL">KRIS HBL HAPPY BERRY/RED 100ML BTL</option>
                <option value="KRIS HBL NOURISHED CARE/GREEN 100ML">KRIS HBL NOURISHED CARE/GREEN 100ML</option>
                <option value="MEDISOFT HAND WASH SOFT & MILK/WHITE 500ML">MEDISOFT HAND WASH SOFT & MILK/WHITE 500ML</option>
                <option value="SEHAT BW MILKY FRESH MILK/WHITE 200 ML">SEHAT BW MILKY FRESH MILK/WHITE 200 ML</option>
                <option value="SEHAT INDONESIAKU TS RED/RED DOUBLE PROTECTION 70GR">SEHAT INDONESIAKU TS RED/RED DOUBLE PROTECTION 70GR</option>
                <option value="SEHAT JUNIOR TOILET SOAP BUBBLE GUM/LIGHT BLUE 65GR">SEHAT JUNIOR TOILET SOAP BUBBLE GUM/LIGHT BLUE 65GR</option>
                <option value="SEHAT MILK TOILET SOAP WITH SHEA BUTTER/LIGHT BLUE 100GR">SEHAT MILK TOILET SOAP WITH SHEA BUTTER/LIGHT BLUE 100GR</option>
                <option value="WOW DISHWASH LIME 240ML">WOW DISHWASH LIME 240ML</option>
                <option value="WOW DISHWASH LIME 780ML">WOW DISHWASH LIME 780ML</option>
            </select>
        </div>
        <div class="col-4">
            <input type="number" id="quantity${productCount}" name="quantities[]" class="form-control" placeholder="Jumlah" min="1" required>
        </div>
    `;

    productsContainer.appendChild(productRow);

    // Initialize Tom Select for the newly added product select
    new TomSelect(`#product${productCount}`, {
        plugins: ['clear_button'],
        persist: false,
        create: true
    });
}

function removeProduct(productId) {
    const productRow = document.getElementById(`productRow${productId}`);
    if (productRow) {
        productRow.remove();
    }
}

// Function to validate form inputs
function validateForm() {
    const buyerName = document.getElementById('buyerName').value.trim();
    const selectedSeller = document.getElementById('seller').tomselect.getValue();
    const selectedProducts = document.querySelectorAll('.product-select');
    const quantities = document.querySelectorAll('input[name="quantities[]"]');

    if (!buyerName || !selectedSeller || selectedProducts.length === 0) {
        return false;
    }

    for (let i = 0; i < selectedProducts.length; i++) {
        const productValue = selectedProducts[i].tomselect.getValue();
        const quantityValue = quantities[i].value;

        if (!productValue || !quantityValue || quantityValue < 1) {
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
    const seller = Array.from(document.getElementById('seller').tomselect.getValue()).join(', ');
    const selectedProducts = document.querySelectorAll('.product-select');
    const quantities = document.querySelectorAll('input[name="quantities[]"]');

    let productDetails = '';
    for (let i = 0; i < selectedProducts.length; i++) {
        const productValue = selectedProducts[i].tomselect.getValue();
        const quantityValue = quantities[i].value;
        productDetails += `- ${productValue}: ${quantityValue} Pcs \n`;
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
        cancelButtonText: 'Batal',
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
    document.getElementById('productsContainer').innerHTML = '';
    sellerSelect.clear();
}

// Call resetForm on page load
window.onload = resetForm;
