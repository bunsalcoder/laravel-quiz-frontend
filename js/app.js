new Vue ({
    el: "#app",
    data: {
        books: [],
        authors: [],
        author_id: null,
        body: '',
        title: '',
        isAdded: true,
        isUpdated: false,
        id: null
    },
    methods: {
        // get book
        getBooks(){
            let url = "http://127.0.0.1:8000/api/books";
            window.axios.get(url)
                .then(response => {
                    this.books = response.data;
                });
        },
        
        // create books
        createBooks(){
            let url = "http://127.0.0.1:8000/api/books";
            let book = {
                author_id: parseInt(this.author_id),
                title: this.title,
                body: this.body,
                book: this.book,
            }
            window.axios.post(url, book)
                .then((response) => {
                    this.books = response.data;
                    window.location.reload();
                });
            // clear form
            this.author_id = null,
            this.body = '',
            this.title = ''
        },

        // delete book
        deleteBook(book){
            let id = book.id;
            let url = "http://127.0.0.1:8000/api/books";
            let isDeleted = window.confirm('You want to delete this book?');
            if (isDeleted){
                window.axios.delete(url + '/' + id)
                    .then(response => {
                        window.location.reload();
                    });
            }
        },

        // edit book
        editBook(book) {
            this.isAdded = false;
            this.isUpdated = true;
            this.id = book.id;
            this.author_id = book.author_id;
            this.title = book.title;
            this.body = book.body;
        },

        // update book
        updateBook() {
            let url = 'http://127.0.0.1:8000/api/books/' + parseInt(this.id);
            data = ({ 
                author_id: parseInt(this.author_id), 
                title: this.title, 
                body: this.body, 
            });
            window.axios.put(url, data)
                .then(res => {
                    this.getBooks();
                });

            // clear form
            this.author_id = null,
            this.body = '',
            this.title = '',

            // reverse condition of update and create book
            this.isUpdated = false;
            this.isAdded = true;
        }
    },
    mounted() {
        this.getBooks();
    }
})