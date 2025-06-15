// Open IndexedDB with orders store added
async function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('LibraNetDB', 1);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('trendingBooks')) {
        db.createObjectStore('trendingBooks', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('orders')) {
        db.createObjectStore('orders', { keyPath: 'orderId', autoIncrement: true });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Save an order to IndexedDB
async function saveOrder(orderData) {
  const db = await openDB();
  const tx = db.transaction('orders', 'readwrite');
  const store = tx.objectStore('orders');
  await store.add(orderData);
  await tx.complete;
  db.close();
}

// Fetch image as blob
async function fetchAndConvertImageToBlob(url) {
  const response = await fetch(url);
  return await response.blob();
}

// Save trending books
async function saveTrendingBooks(books) {
  const db = await openDB();
  const tx = db.transaction('trendingBooks', 'readwrite');
  const store = tx.objectStore('trendingBooks');

  for (const book of books) {
    const imageBlob = await fetchAndConvertImageToBlob(book.imageUrl);
    await store.put({ id: book.id, title: book.title, author: book.author, imageBlob });
  }

  await tx.complete;
  db.close();
}

// Load trending books
async function getSavedBooks() {
  const db = await openDB();
  const tx = db.transaction('trendingBooks', 'readonly');
  const store = tx.objectStore('trendingBooks');
  const allBooks = [];

  return new Promise((resolve, reject) => {
    const request = store.openCursor();
    request.onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
        allBooks.push(cursor.value);
        cursor.continue();
      } else {
        resolve(allBooks);
        db.close();
      }
    };
    request.onerror = () => reject(request.error);
  });
}

// Render trending books
function renderBooks(books) {
  const container = document.getElementById('carousel');
  container.innerHTML = '';
  books.forEach(book => {
    const imageURL = URL.createObjectURL(book.imageBlob);
    const bookDiv = document.createElement('div');
    bookDiv.style.marginBottom = '20px';
    bookDiv.innerHTML = `
      <img src="${imageURL}" alt="${book.title}" style="width:100px; height:auto;">
      <h3>${book.title}</h3>
      <p>by ${book.author}</p>
    `;
    container.appendChild(bookDiv);
  });
}

// Example data
const trendingBooks = [
  { id: '1', title: 'Atomic Habits', author: 'James Clear', imageUrl: 'https://m.media-amazon.com/images/I/91bYsX41DVL.jpg' },
  { id: '2', title: 'The Power of Habit', author: 'Charles Duhigg', imageUrl: 'https://media.s-bol.com/3G5BnolANZnA/AyN5n9/550x837.jpg' },
  { id: '3', title: 'The Age of AI', author: 'Henry A. Kissinger', imageUrl: 'https://media.thegospelcoalition.org/wp-content/uploads/2023/08/30115001/ai-future-of-human.jpg' },
  { id: '4', title: 'How AI Ate the World', author: 'Chris Stokel-Walker', imageUrl: 'https://mustreadbooks.co.za/wp-content/uploads/2024/02/AI-ATE-THE-WORLD-670x1024.jpg' },
  { id: '5', title: 'Clean Code', author: 'Robert Cecil Martin', imageUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1436202607i/3735293.jpg' },
  { id: '6', title: 'The Silent Patient', author: 'Alex Michaelides', imageUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1668782119i/40097951.jpg' },
  { id: '7', title: 'Cirque du Freak', author: 'Darren O Shaughnessy', imageUrl: 'https://m.media-amazon.com/images/I/51u6SBMB0IL._AC_UF1000,1000_QL80_.jpg' },
  { id: '8', title: 'Hide and Dont Seek', author: 'Anica Mrose Rissi', imageUrl: 'https://m.media-amazon.com/images/I/91bonuqSrzL.jpg' },
  { id: '9', title: 'Normal People', author: 'Sally Rooney', imageUrl: 'https://m.media-amazon.com/images/I/71fnqwR0eSL._AC_UF1000,1000_QL80_.jpg' },
  { id: '10', title: 'Project Hail Mary', author: 'Andy Weir', imageUrl: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRDn3z4odm8RHwp_qzo0SCP_bpBTsG98QEp85hQZufkXTwQEydc' }
];

// Save & Render
saveTrendingBooks(trendingBooks).then(() => getSavedBooks()).then(renderBooks).catch(console.error);

// Order confirmation logic (add this on the buy_page_2.js file)
document.addEventListener('DOMContentLoaded', () => {
  const confirmBtn = document.getElementById('confirm-modal');
  const formatSelect = document.getElementById('format-select');
  const retrievalSelect = document.getElementById('retrieval-method');
  const paymentSelect = document.getElementById('payment-select');
  const basePrice = 32.99;
  const deliveryFee = 5.00;

  confirmBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    const format = formatSelect.value;
    const retrieval = retrievalSelect.value;
    const payment = paymentSelect.value;
    const cardNumber = document.getElementById('card-number').value.trim();
    const cardHolder = document.getElementById('card-holder').value.trim();
    const isDelivery = retrieval.toLowerCase().includes("delivery");
    const totalPrice = isDelivery ? basePrice + deliveryFee : basePrice;

    const orderData = {
      format,
      retrieval,
      payment,
      cardNumber,
      cardHolder,
      totalPrice,
      timestamp: new Date().toISOString()
    };

    try {
      await saveOrder(orderData);
      window.location.href = 'confirmed_page_2.html';
    } catch (err) {
      console.error("Failed to save order:", err);
      alert("There was an error saving your order.");
    }
  });
});