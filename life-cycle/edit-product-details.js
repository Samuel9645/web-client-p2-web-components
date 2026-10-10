const productDetails = document.getElementById('product-details');
const form = document.getElementById('edit-product-details');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = form.elements['title'].value;
    const description = form.elements['description'].value;
    productDetails.setTitle(title);
    productDetails.setDescription(description);
});

const disconnectButton = document.getElementById('delete-product');
disconnectButton.addEventListener('click', () => {
    productDetails.remove();
});