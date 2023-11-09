if ('Notification' in window) {
    Notification.requestPermission().then(function (permission) {
        if (permission === 'granted') {
            alert("NOtifikasi di izinkan");
        } else if (permission === 'denied') {
            alert("Notifikasi di Blokir");
        } else if (permission === 'default') {
            console.log("Pengguna Menutup Dialog Izin");
        }
    });
} else {
    alert("Web Browser Not Support")
}

// Register Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
    .then(function(registration) {
        console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch(function(error) {
        console.error('Service Worker registration failed:', error);
    });
}

const form = document.getElementById('komentarForm');
const komentar = document.getElementById('komentar');

let db;
const dbName = 'KomentarDB';
const dbVersion = 1;

const request = indexedDB.open(dbName, dbVersion);

request.onerror = function (event) {
  console.error('Database error: ' + event.target.errorCode);
};

request.onsuccess = function (event) {
  db = event.target.result;
};

request.onupgradeneeded = function (event) {
  db = event.target.result;
  const store = db.createObjectStore('komentar', { keyPath: 'id', autoIncrement: true });
  store.createIndex('komentar', 'komentar', { unique: false });
};

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const komentarInput = komentar.value;

  const transaction = db.transaction(['komentar'], 'readwrite');
  const store = transaction.objectStore('komentar');

  const newItem = {
    komentar: komentarInput
  };

  const request = store.add(newItem);

  request.onsuccess = function (event) {
    komentar.value = '';

    alert("Terimaksih telah berkomentar");

  };
});



// // Membaca komentar dari IndexedDB dan menampilkannya
// const tampilkanKomentar = function() {
//     const transaction = db.transaction('komentarStore', 'readonly');
//     const store = transaction.objectStore('komentarStore');
//     const komentarContainer = document.getElementById('komentarContainer');

//     store.openCursor().onsuccess = function(event) {
//         const cursor = event.target.result;
//         if (cursor) {
//             const komentar = cursor.value.komentar;
//             const komentarDiv = document.createElement('div');
//             komentarDiv.textContent = komentar;
//             komentarContainer.appendChild(komentarDiv);
//             cursor.continue();
//         }
//     };
// };

// request.onsuccess = function(event) {
//     // ...
//     tampilkanKomentar(); // Menampilkan komentar setelah halaman dimuat
// };

