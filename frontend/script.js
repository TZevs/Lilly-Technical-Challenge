document.addEventListener("DOMContentLoaded", (e) => {
    fetchMedicines();
});

function fetchMedicines() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/medicines", true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            const container = document.querySelector("#medicines-grid");
            data.medicines.forEach(medicine => {
                const gridItem = document.createElement("div");
                gridItem.className = "medicine-item";
                if (medicine.name != "" && medicine.price != null) {
                    const nameDiv = document.createElement("div");
                    nameDiv.className = "medicine-info";
                    nameDiv.textContent = `${medicine.name}`;
                    gridItem.appendChild(nameDiv);

                    const priceDiv = document.createElement("div");
                    priceDiv.className = "medicine-info";
                    priceDiv.textContent = `Price: £${medicine.price}`;
                    gridItem.appendChild(priceDiv);

                    container.appendChild(gridItem);
                }
            });
        } else {
            console.error('Failed to fetch medicines');
        }
    };
    xhr.onerror = function() {
        console.error('Request error...');
    };
    xhr.send();
}

const add = document.querySelector("#add-form");
const edit = document.querySelector("#edit-form");
const del = document.querySelector("#del-form");

function toggleAdd() {
    add.style.display = "flex";
    edit.style.display = "none";
    del.style.display = "none";
}
function toggleEdit() {
    add.style.display = "none";
    edit.style.display = "flex";
    del.style.display = "none";

}
function toggleDel() {
    add.style.display = "none";
    edit.style.display = "none";
    del.style.display = "flex";
}

function addMedicine(ev) {
    ev.preventDefault();

    const form = ev.target;
    const mName = form.name.value;
    const mPrice = form.price.value;
    let convertedPrice = 0;

    try {
        convertedPrice = parseFloat(mPrice);
    }
    catch {
        document.querySelector("#addMsg").textContent = "Please enter a valid amount";
        return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/create", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
    xhr.onload = function () {
        if (xhr.status === 200) {
            document.querySelector("#addMsg").textContent = `Medicine: ${mName}, Price: ${mPrice} added.`;
        } else {
            document.querySelector("#addMsg").textContent = "Error adding medicine.";
        }
    };
    xhr.onerror = function () {
        document.querySelector("#addMsg").textContent = "Request Failed.";
    };
    const params = `name=${encodeURIComponent(mName)}&price=${encodeURIComponent(mPrice)}`;
    xhr.send(params);

    setTimeout(function() {
        location.reload();
    }, 2000);
}
function editMedicine(ev) {
    ev.preventDefault();

    const form = ev.target;
    const mName = form.name.value;
    const mPrice = form.price.value;
    let convertedPrice = 0;

    try {
        convertedPrice = parseFloat(mPrice);
    }
    catch {
        document.querySelector("#addMsg").textContent = "Please enter a valid amount";
        return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/update", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
    xhr.onload = function () {
        if (xhr.status === 200) {
            document.querySelector("#editMsg").textContent = `Medicine: ${mName}, Price: ${mPrice} updated.`;
        } else {
            document.querySelector("#editMsg").textContent = "Error Editing medicine.";
        }
    };
    xhr.onerror = function () {
        document.querySelector("#editMsg").textContent = "Request Failed.";
    };
    const params = `name=${encodeURIComponent(mName)}&price=${encodeURIComponent(mPrice)}`;
    xhr.send(params);

    setTimeout(function() {
        location.reload();
    }, 2000);
}
function delMedicine(ev) {
    ev.preventDefault();

    const form = ev.target;
    const mName = form.name.value;

    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", "/delete", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
    xhr.onload = function () {
        if (xhr.status === 200) {
            document.querySelector("#delMsg").textContent = `Medicine: ${mName} deleted`;
        } else {
            document.querySelector("#delMsg").textContent = "Error Editing medicine.";
        }
    };
    xhr.onerror = function () {
        document.querySelector("#delMsg").textContent = "Request Failed.";
    };
    const params = `name=${encodeURIComponent(mName)}`;
    xhr.send(params);

    setTimeout(function() {
        location.reload();
    }, 2000);
}