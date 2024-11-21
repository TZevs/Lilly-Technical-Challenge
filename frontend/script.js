document.addEventListener('DOMContentLoaded', (e) => {
    fetchMedicines();
});

function fetchMedicines() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/medicines', true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            const list = document.getElementById('medicines-list');
            data.medicines.forEach(medicine => {
                const listItem = document.createElement('div');
                listItem.classList.add("medicines-item");
                if (medicine.name != "" && medicine.price != null) {
                    listItem.textContent = `${medicine.name}: £${medicine.price}`;
                    list.appendChild(listItem);
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
