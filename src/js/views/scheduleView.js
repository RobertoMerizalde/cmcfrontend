const apiService = require('../services/apiService');
const modalManager = require('../utils/modalManager');

document.addEventListener('DOMContentLoaded', () => {
    apiService.fetchShipments().then(data => {
        const tableBody = document.querySelector('#shipmentTable tbody');
        data.forEach(row => {
            const tr = document.createElement('tr');
            tr.setAttribute('data-id', row.id);
            tr.addEventListener('click', () => handleRowSelection(row));
            tr.innerHTML = `
                <td>${row.supplier}</td>
                <td>${row.shippingNumber}</td>
                <td>${row.pickUp}</td>
                <td>${row.pickUp}</td>
                <td>${row.geographic}</td>
                <td>${row.status}</td>
            `;
            tableBody.appendChild(tr);
        });
    });
});

function handleRowSelection(row) {
    const formHtml = `
    <form id="shippingForm">
    <div class="form-group">
        <label for="pickUp">Pick Up Time:</label>
        <input type="datetime-local" class="form-control" id="pickUp" name="pickUp" value="${row.pickUp}">
    </div>
    <div class="form-group">
        <label for="supplier">Supplier:</label>
        <input type="text" class="form-control" id="supplier" name="supplier" value="${row.supplier}">
    </div>
    <div class="form-group">
        <label for="adhoc">Adhoc Data:</label>
        <input type="text" class="form-control" id="adhoc" name="adhoc" value="${row.adhoc}">
    </div>
    <div class="form-group">
        <label for="shippingNumber">Shipping Number:</label>
        <input type="text" class="form-control" id="shippingNumber" name="shippingNumber" value="${row.shippingNumber}">
    </div>
    <div class="form-group">
        <label for="geographic">Geographic:</label>
        <select class="form-control" id="geographic" name="geographic">
            <option value="DOMESTIC" selected>${row.geographic}</option>
            <option value="INTERNATIONAL">INTERNATIONAL</option>
        </select>
    </div>
    <div class="form-group">
        <label for="dock">Dock:</label>
        <input type="text" class="form-control" id="dock" name="dock" value="${row.dock}">
    </div>
    <div class="form-group">
        <label for="trailer">Trailer:</label>
        <input type="text" class="form-control" id="trailer" name="trailer" value="${row.trailer}">
    </div>
    <div class="form-group">
        <label for="status">Status:</label>
        <select class="form-control" id="status" name="status">
            <option value="TENDERED" selected>${row.status}</option>
            <option value="ARRIVED">ARRIVED</option>
        </select>
    </div>
    <div class="form-group">
        <label for="equipmentNumber">Equipment Number:</label>
        <input type="text" class="form-control" id="equipmentNumber" name="equipmentNumber" value="${row.equipmentNumber}">
    </div>
    <div class="form-group">
        <label for="quantity">Quantity:</label>
        <input type="number" class="form-control" id="quantity" name="quantity" value="${row.quantity}">
    </div>
    <div class="form-group">
        <label for="sealNumber">Seal Number:</label>
        <input type="text" class="form-control" id="sealNumber" name="sealNumber" value="${row.sealNumber}">
    </div>
    <div class="form-group">
        <label for="checkedIN">Check IN Time:</label>
        <input type="text" class="form-control" id="checkedIN" name="checkedIN" value="${row.checkedIN}">
    </div>
    <div class="form-group">
        <label for="checkedOUT">Check OUT Time:</label>
        <input type="text" class="form-control" id="checkedOUT" name="checkedOUT" value="${row.checkedOUT}">
    </div>
</form>
    `;
    modalManager.initializeModal('editShipmentModal', formHtml);
}
