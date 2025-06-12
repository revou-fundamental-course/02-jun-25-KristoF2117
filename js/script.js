document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Greeting "Hi Name"
    const userNamePlaceholder = document.getElementById('userNamePlaceholder');
    const welcomeMessageElement = document.getElementById('welcomeMessage');

    // Coba mengambil nama dari localStorage jika sudah pernah diisi
    let storedUserName = localStorage.getItem('userName');
    let userName = '';

    if (storedUserName) {
        userName = storedUserName;
    } else {
        // Jika belum ada di localStorage, prompt pengguna untuk nama
        const inputName = prompt("Please enter your name:");
        if (inputName && inputName.trim() !== '') {
            userName = inputName.trim();
            localStorage.setItem('userName', userName); // Simpan nama di localStorage
        } else {
            userName = "Guest"; // Default jika pengguna tidak memasukkan nama
        }
    }

    userNamePlaceholder.textContent = userName;
    welcomeMessageElement.textContent = `Hi ${userName}, Welcome To Website!`;


    // 2. Message Us Form Validation and Display
    const messageForm = document.getElementById('messageForm');
    const displayMessages = document.getElementById('displayMessages');

    messageForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Mencegah form melakukan submit default

        let isValid = true; // Flag untuk validasi form

        // Bersihkan pesan error sebelumnya
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

        // Ambil elemen input
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const messageInput = document.getElementById('message');

        // Validasi Nama
        if (nameInput.value.trim() === '') {
            document.getElementById('nameError').textContent = 'Name is required.';
            isValid = false;
        }

        // Validasi Email
        if (emailInput.value.trim() === '') {
            document.getElementById('emailError').textContent = 'Email is required.';
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            document.getElementById('emailError').textContent = 'Please enter a valid email address.';
            isValid = false;
        }

        // Validasi Nomor Telepon (regex untuk 10-15 digit angka saja)
        if (phoneInput.value.trim() === '') {
            document.getElementById('phoneError').textContent = 'Phone number is required.';
            isValid = false;
        } else if (!/^[0-9]{10,15}$/.test(phoneInput.value.trim())) {
            document.getElementById('phoneError').textContent = 'Please enter a valid phone number (10-15 digits, numbers only).';
            isValid = false;
        }

        // Validasi Pesan
        if (messageInput.value.trim() === '') {
            document.getElementById('messageError').textContent = 'Message is required.';
            isValid = false;
        }

        // Jika semua validasi berhasil
        if (isValid) {
            // Dapatkan tanggal dan waktu saat ini
            const now = new Date();
            const dateTimeString = now.toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });

            // Buat elemen untuk menampilkan pesan yang dikirim
            const messageItem = document.createElement('div');
            messageItem.classList.add('message-item');
            messageItem.innerHTML = `
                <p><strong>Date:</strong> ${dateTimeString}</p>
                <p><strong>Name:</strong> ${nameInput.value}</p>
                <p><strong>Email:</strong> ${emailInput.value}</p>
                <p><strong>Phone:</strong> ${phoneInput.value}</p>
                <p><strong>Message:</strong> ${messageInput.value}</p>
            `;
            displayMessages.prepend(messageItem); // Tambahkan pesan baru di bagian paling atas

            // Bersihkan form
            messageForm.reset();
            alert('Your message has been submitted successfully!');
        }
    });

    // Fungsi helper untuk validasi format email
    function isValidEmail(email) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    }

    // 3. Auto Slider for Hero Banner
    const slides = document.querySelectorAll('.hero-banner .slide');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length; // Mengulang ke slide pertama setelah slide terakhir
        showSlide(currentSlide);
    }

    // Tampilkan slide pertama saat halaman dimuat
    showSlide(currentSlide);

    // Otomatis ganti slide setiap 5 detik (5000 milidetik)
    setInterval(nextSlide, 5000); // Anda bisa mengubah durasi di sini

    // 4. Auto Up Button (Scroll to Top)
    const backToTopBtn = document.getElementById('backToTopBtn');

    // Tampilkan tombol saat pengguna menggulir ke bawah, sembunyikan saat di atas
    window.onscroll = function() {
        scrollFunction();
    };

    function scrollFunction() {
        // Periksa posisi gulir (untuk compatibility antar browser)
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            backToTopBtn.style.display = "block"; // Tampilkan tombol
        } else {
            backToTopBtn.style.display = "none"; // Sembunyikan tombol
        }
    }

    // Ketika tombol diklik, gulir halaman ke atas dengan animasi halus
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Gulir halus
        });
    });
});