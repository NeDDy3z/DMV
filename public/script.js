const insert = document.getElementsByClassName('insert')[0];
const edit = document.getElementsByClassName('edit')[0];
const data = document.getElementsByClassName('data')[0];


function openEdit() {
    edit.style.display = 'block';
    data.style.display = 'none';
}

function closeEdit() {
    edit.style.display = 'none';
    data.style.display = 'block';
}