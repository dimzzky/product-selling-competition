// Initialize Tom Select for seller
const sellerSelect = new TomSelect("#seller", {
    plugins: ['clear_button'],
    persist: false,
    create: true,
});

document.addEventListener('DOMContentLoaded', function () {
    const addProductBtn = document.getElementById('addProductBtn');
    const productList = document.getElementById('productList');

    addProductBtn.addEventListener('click', function () {
        const productEntry = document.createElement('div');
        productEntry.classList.add('form-group', 'product-entry');

        const deleteBtn = document.createElement('button');
        deleteBtn.type = 'button';
        deleteBtn.classList.add('btn', 'btn-danger');
        deleteBtn.innerText = 'Hapus';
        deleteBtn.addEventListener('click', function () {
            productEntry.remove();
        });

        const productSelect = document.createElement('select');
        productSelect.classList.add('form-control', 'product-select');
        productSelect.innerHTML = `
            <option value="" disabled selected>Pilih produk</option>
            <option value="AYU POP TOILET SOAP PAPAYA">AYU POP PAPAYA</option>
            <option value="AYU POP TOILET SOAP PAPAYA SNACK BOX">AYU POP PAPAYA SNACK BOX</option>
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
        `;

        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.classList.add('form-control');
        quantityInput.placeholder = 'Jumlah';
        quantityInput.required = true;

        productEntry.appendChild(deleteBtn);
        productEntry.appendChild(productSelect);
        productEntry.appendChild(quantityInput);

        productList.appendChild(productEntry);

        new TomSelect(productSelect, {
            plugins: ['clear_button'],
            persist: false,
            create: true,
        });
    });

    window.onload = resetForm;

    function resetForm() {
        document.getElementById('sellingForm').reset();
        productList.innerHTML = '';
        sellerSelect.clear();
    }
});

// Function to validate form inputs
function validateForm() {
    const buyerName = document.getElementById('buyerName').value.trim();
    const productEntries = document.querySelectorAll('.product-entry');

    if (!buyerName || productEntries.length === 0) {
        return false;
    }

    for (let entry of productEntries) {
        const productSelect = entry.querySelector('.product-select').value;
        const quantityInput = entry.querySelector('input[type="number"]').value;

        if (!productSelect || !quantityInput) {
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
    const seller = Array.from(document.getElementById('seller').selectedOptions).map(option => option.value).join(', ');

    const productEntries = document.querySelectorAll('.product-entry');
    let productDetails = '';

    productEntries.forEach(entry => {
        const product = entry.querySelector('.product-select').value;
        const quantity = entry.querySelector('input[type="number"]').value;
        productDetails += `- ${product}: ${quantity} Pcs \n`;
    });

    const message = `Dibeli dari: PT. SINAR ANTJOL - BU LODAN \n Nama Pembeli: ${buyerName}\nBeli dari siapa: ${seller}\nProduk yang dibeli:\n${productDetails}`;
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
