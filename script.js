// Lấy các phần tử DOM
const productNameInput = document.getElementById('product-name-input');
const productPriceInput = document.getElementById('product-price-input');
const productIdToEdit = document.getElementById('product-id-to-edit');
const addProductBtn = document.getElementById('add-product-btn');
const updateProductBtn = document.getElementById('update-product-btn');
const productTableBody = document.querySelector('#product-table tbody');

// Biến đếm ID sản phẩm
let productIdCounter = 2;

// Hàm thêm sản phẩm mới
function addProduct() {
  const name = productNameInput.value.trim();
  const price = productPriceInput.value.trim();

  if (!name || !price) {
    alert('Vui lòng nhập đầy đủ thông tin sản phẩm!');
    return;
  }

  // Tạo dòng mới
  const newRow = document.createElement('tr');
  newRow.setAttribute('data-id', productIdCounter);
  newRow.className = 'border-b border-gray-200 hover:bg-gray-50';
  newRow.innerHTML = `
    <td class="px-4 py-3">${productIdCounter}</td>
    <td class="product-name px-4 py-3">${name}</td>
    <td class="product-price px-4 py-3">${price}</td>
    <td class="px-4 py-3">
      <button class="edit-btn px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition mr-2">Sửa</button>
      <button class="delete-btn px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">Xóa</button>
    </td>
  `;

  // Thêm vào cuối bảng
  productTableBody.appendChild(newRow);

  // Tăng ID counter
  productIdCounter++;

  // Reset form
  productNameInput.value = '';
  productPriceInput.value = '';
}

// Hàm sửa sản phẩm
function editProduct(button) {
  const row = button.closest('tr');
  const id = row.getAttribute('data-id');
  const name = row.querySelector('.product-name').textContent;
  const price = row.querySelector('.product-price').textContent;

  // Điền thông tin vào form
  productNameInput.value = name;
  productPriceInput.value = price;
  productIdToEdit.value = id;

  // Hiển thị nút "Lưu Thay đổi" và ẩn nút "Thêm"
  addProductBtn.style.display = 'none';
  updateProductBtn.style.display = 'inline-block';
}

// Hàm cập nhật sản phẩm
function updateProduct() {
  const name = productNameInput.value.trim();
  const price = productPriceInput.value.trim();
  const id = productIdToEdit.value;

  if (!name || !price) {
    alert('Vui lòng nhập đầy đủ thông tin sản phẩm!');
    return;
  }

  // Tìm dòng cần cập nhật
  const row = document.querySelector(`tr[data-id="${id}"]`);
  if (row) {
    row.querySelector('.product-name').textContent = name;
    row.querySelector('.product-price').textContent = price;
  }

  // Reset form
  productNameInput.value = '';
  productPriceInput.value = '';
  productIdToEdit.value = '';

  // Hiển thị nút "Thêm" và ẩn nút "Lưu Thay đổi"
  addProductBtn.style.display = 'inline-block';
  updateProductBtn.style.display = 'none';
}

// Hàm xóa sản phẩm
function deleteProduct(button) {
  if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
    const row = button.closest('tr');
    row.remove();
  }
}

// Event listeners
addProductBtn.addEventListener('click', addProduct);
updateProductBtn.addEventListener('click', updateProduct);

// Event delegation cho các nút Sửa và Xóa
productTableBody.addEventListener('click', function(event) {
  if (event.target.classList.contains('edit-btn')) {
    editProduct(event.target);
  } else if (event.target.classList.contains('delete-btn')) {
    deleteProduct(event.target);
  }
});
