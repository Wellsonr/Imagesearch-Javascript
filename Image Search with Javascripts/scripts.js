// Jika user memasukkan keywords didalam search-input id, kita harus mencari images dan show itu kedalam screen //
// Untuk mendapatkan gambarnya kita akan memakai Unsplash.com API //
//      1. Pergi ke web https://unsplash.com lalu pergi ke account kita
//      2. Tekan titik tiga kanan atas
//      3. Pilih Developers/API 
//      4. Tekan Your Apps. New Application
//      5. Copy Access Key dan masukkan kedalam code kita

const API_KEY = 'IqcrtkIe4TV4KwJxoGqutabXH--GVasBFruJY-Ttuf0'
// Element yang ada didalam documents //
const formElement = document.querySelector('form')  // Create formElement so we can store our form to complete form section
const searchElement = document.getElementById('search-input') // User Keywords
const searchButton = document.getElementById('search-button') // Get the button event listener
const searchResults = document.getElementById('search-results')  // To pass the result from the user keywords
const showMore = document.getElementById('show-more-button')  // Get the value from the show more button (for event listener)
const errorMessageElement = document.getElementById('error-message');

// Road Code //
/*      1. Create an API for our projects
        2. Create all the var for element that we need
        3. Create Async function, 
            a. Gunakan async karena kita akan gunakan fetch dan await 
            b. keywords akan memegang value dari search-input id
            c. Create a dynamic url, gunakan template yang sudah diberikan di websitenya : https://unsplash.com/documentation#search-photos (link documentation for search)
                <https://api.unsplash.com/search/photos?page=${page}&query=%{keywords}&client_id=${API_KEY}; 
                page = 10 gambar, query = search items, client_id = apikey 
            d. gunakan await fetch(url) 
                -- Jadi kita mengirimkan GET method ke url(variable unsplash)
                -- Setelah itu kita menggunakan await, supaya kita menunggu response dari server diterima
                -- Lalu kita simpan kedalam variable response
            e. Convert the response into JSON format and store it into data variable 
            f. Lalu dari data tersebut kita mau ambil objects results = data.results. Lalu kita store kedalam variable results 
            g. Jika page === 1 maka kita berikan default image kita.,
                -- Maksudnya jika user tidak memasukkan apa2 kita berikan default image
        4. results.map(result) => {} // Kita gunakan .map() function untuk mengiterasi/mengakses array didalam results
            a. Kegunaan .map() = dugunakan untuk membuat array baru dengan mengubah setiap element berdasarkan fungsi yang diberikan
            b. .map() = tidak mengubah array asli, namun menghasilkan array baru
            c. variable results kita berikan function .map() lalu kita ubah variable results menjadi parameters result             
               Ex : results.map((result) => {}) // ubah variable results mejadi (result) lalu return => {apapun yang ada didalam sini}
        5. Push the result to the container / Duplicate a div element like search-result into search-results
            a.  Buat variable untuk menampung div == imageWrapper
            b.  didalam imageWrapper variable kita tambahkan class didalam div = imageWrapper.classList.add('search-result)
            c.  Buat variable image, untuk menampung img Tags
                   -- Letakkan img src = result.urls.small = result(parameters).urls(array).small(img size)
                   -- Letakkan img alt = result.alt_description = result(parameters).alt_description(array)
            d. Buat <a> tags buat href = document.createElement('a')
                   -- Letakan href = result.links.html. result(parameters).links(array)
                   -- Masukkan textContent <a> = result.alt_description; 
        6. imageWrapper.appendChild(); = imageWrapper adalah sebuah element <div> yang bertindak sebagai wadah untuk element yang dibuat 
            a. imageWrapper.appendChild(image) = menambahkan element ('img') sebagai child dari imageWrapper
            b. imageWrapper.appendChild(imageLink) = menambahkan element ('a') sebagai child dari imageWrapper
            c. searchResults.appendChild(imageWrapper)  = menambahkan element imageWrapper kedalam id="search-results" yang udah dideclare
        7. page ++ = kita increment page menjadi 2, dan jika page > 1, kita mau show show-more-button yang sebelumnya kita display: none;
            -- dengan cara = showMore.style.display = "block"
        8. Call Function dari Button.
            a. formElement.addEventListener('submit', (event) => {})
                -- eksekusi ketika form disubmit atau enter lalu jalankan perintah yang ada didalam {}
        9. Show more button
            a. Ketika showmorebutton di "click", maka call function. Tambahkan imageWrapper lagi kedalam searchResults
    DONE !!
*/


var keywords = "";  // Keyword, to store input data yang user masukkan kedalam search-input(keyword)
var page = 1;  // default page number = 1. 1 page = 10 items 

// Function to show the error message
function showError(message) {
    errorMessageElement.innerText = message;
};


async function searchImage(){
    keywords = searchElement.value.trim();
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keywords}&client_id=${API_KEY}`

    const response = await fetch(url)
    const data = await response.json()
    
    const results = data.results

    if(page === 1) {
        searchResults.innerHTML = ""
    }

    results.map((result) => {
        const imageWrapper = document.createElement('div')
        imageWrapper.classList.add('search-result')
        const image = document.createElement('img')
        image.src = result.urls.small
        image.alt = result.alt_description
        const imageLink = document.createElement('a')
        imageLink.href = result.links.html 
        imageLink.target = "_blank"  // set the default value from the <a target="_blank"> to _blank
        imageLink.textContent = result.alt_description
    
        imageWrapper.appendChild(image)
        imageWrapper.appendChild(imageLink)
        searchResults.appendChild(imageWrapper)
    });

    page++;
    if (page > 1) {
        showMore.style.display = "block"
    }
}

formElement.addEventListener('submit', (event) => {
    event.preventDefault();
    keywords = searchElement.value.trim()
    if (keywords === "") {
        showError('please input a keyword')
    } else {
        showError('')
        searchImage()
        page = 1
    };
});

searchElement.addEventListener('input', () => {
    showError('');
});

showMore.addEventListener("click", () => {
    searchImage();
})