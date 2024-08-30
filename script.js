document.addEventListener('DOMContentLoaded', () => {
    const studentForm = document.getElementById('studentForm');
    const studentList = document.getElementById('studentList');
    const search = document.getElementById('search');

    studentForm.addEventListener('submit', addStudent);
    search.addEventListener('input', searchStudents);

    function addStudent(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const dob = document.getElementById('dob').value;
        const registrationNumber = document.getElementById('registrationNumber').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;

        const student = { name, dob, registrationNumber, email, phone, address };
        let students = JSON.parse(localStorage.getItem('students')) || [];
        students.push(student);
        localStorage.setItem('students', JSON.stringify(students));
        displayStudents();
        studentForm.reset();
    }

    function displayStudents() {
        const students = JSON.parse(localStorage.getItem('students')) || [];
        studentList.innerHTML = '';
        students.forEach((student, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${student.name}</strong> (Matrícula: ${student.registrationNumber})<br>
                <button onclick="editStudent(${index})">Editar</button>
                <button onclick="deleteStudent(${index})">Excluir</button>
            `;
            studentList.appendChild(li);
        });
    }

    function searchStudents() {
        const query = search.value.toLowerCase();
        const students = JSON.parse(localStorage.getItem('students')) || [];
        const filteredStudents = students.filter(student => 
            student.name.toLowerCase().includes(query) || 
            student.registrationNumber.includes(query)
        );
        studentList.innerHTML = '';
        filteredStudents.forEach((student, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${student.name}</strong> (Matrícula: ${student.registrationNumber})<br>
                <button onclick="editStudent(${index})">Editar</button>
                <button onclick="deleteStudent(${index})">Excluir</button>
            `;
            studentList.appendChild(li);
        });
    }

    window.editStudent = function(index) {
        const students = JSON.parse(localStorage.getItem('students')) || [];
        const student = students[index];
        document.getElementById('name').value = student.name;
        document.getElementById('dob').value = student.dob;
        document.getElementById('registrationNumber').value = student.registrationNumber;
        document.getElementById('email').value = student.email;
        document.getElementById('phone').value = student.phone;
        document.getElementById('address').value = student.address;
        students.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(students));
        displayStudents();
    }

    window.deleteStudent = function(index) {
        if (confirm('Tem certeza que deseja excluir este aluno?')) {
            const students = JSON.parse(localStorage.getItem('students')) || [];
            students.splice(index, 1);
            localStorage.setItem('students', JSON.stringify(students));
            displayStudents();
        }
    }

    displayStudents();
});
