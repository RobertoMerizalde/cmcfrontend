const axios = require('axios');
import { Modal } from 'bootstrap';


// Fetch data from the API and populate the table
axios.get('http://localhost:3000/api/shipments')
    .then(response => {
        const data = response.data;
        const tableBody = document.querySelector('#shipmentTable tbody');
        data.forEach((row, index) => {
            const tr = document.createElement('tr');
            tr.setAttribute('data-id', row.id); // Set a unique identifier for each row
            tr.addEventListener('click', () => handleRowSelection(row)); // Add event listener for row selection
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
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        // Display error message on the page if needed
    });

// Function to handle row selection
function handleRowSelection(row) {
    // Add logic to handle row selection here
    const modalElement = document.getElementById('editShipmentModal');
    const modal = new Modal(modalElement);

    const modalBody = document.querySelector('#editShipmentModal .modal-body');
    
    modalBody.innerHTML = `
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

    // Show the modal
    modal.show();
}


