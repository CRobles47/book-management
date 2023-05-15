import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import AddBook from "./AddBook";

function BookTable(args) {
    
    const [books, setBooks] = React.useState([]);
    const [filteredList, setFilteredList] = React.useState([]);
    const [modal, setModal] = React.useState(false);
    const [selectedBook, setBook] = React.useState({});
    const [rerender, setRerender] = React.useState(true);
    const toggle = () => setModal(!modal);

    React.useEffect(() => {
        if(rerender){
            fetch("http://localhost:8080/api/books/getall")
            .then(res => res.json())
            .then(
                (data) => {
                    setBooks(data);
                    setFilteredList(data);
                    setRerender(false);
                },
                (error) => {
                    console.log(error);
                }
            );
        }
    }, [rerender]);

    const bookList = filteredList.map((book, index) => {
        return <tr key={index}>
            <td className="">
                <p>{book.id}</p>
            </td>
            <td>
                <p>{book.title}</p>
            </td>
            <td>
                <p>${book.price}</p>
            </td>
            <td className="w-25">
                <Button color="success" onClick={() => openEditForm(book)} className='btn-md btn-rounded m-1'>Edit</Button>
                <button onClick={() => deleteBook(book)} type="button" className="btn btn-danger btn-md btn-rounded m-1">Delete</button>
            </td>
        </tr>
    });

    const deleteBook = async (bookToDelete) => {
        await fetch("http://localhost:8080/api/books/" + bookToDelete.id,
            {
                method: 'DELETE', headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(
                (data) => {
                    console.log(data);
                    setFilteredList(filteredList.filter(book => book.id !== bookToDelete.id));
                    setBooks(filteredList);
                },
                (error) => {
                    console.log(error);
                }
            )
    }

    const openEditForm = async (bookToEdit) => {
        await fetch(`http://localhost:8080/api/books/${bookToEdit.id}`)
            .then(
                (data) => {
                    console.log(data);
                    setBook(bookToEdit);
                },
                (error) => {
                    console.log(error);
                }
            )

        toggle();
    }

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setBook((
            {
                ...selectedBook,
                [name]: value
           
        }))
    }

    const handleUpdateBook = async () => {
        console.log(`BOOK SENT TO DB ${JSON.stringify(selectedBook)}`)
        await fetch(`http://localhost:8080/api/books/${selectedBook.id}`,
            {
                method: 'PUT', headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }, body: JSON.stringify(selectedBook)
            },)
            .then(
                (data) => {
                    console.log(data);
                    setRerender(true);
                },
                (error) => {
                    console.log(error);
                }
            )
        
            toggle();
    }

    const handleBookAdded = (shouldRender) => {
        setRerender(shouldRender);
    };

    const handleSearch = async (event) => {
        const searchTerm = event.target.value.toLowerCase();
        if(searchTerm === ''){
            setFilteredList(books);
        } else {
            setFilteredList(books.filter(book => book.title.toLowerCase().includes(searchTerm)))
        }
       
    }

    return (
        <>
        <div className="d-flex m-2">
            <input onChange={handleSearch} className="form-control form-control form-control-borderless" type="search" placeholder="Search users"/>
            <AddBook onBookAdd={handleBookAdded}></AddBook>
        </div>
        <br></br>
        <div>
            <table className="table align-middle mb-0 bg-white">
                <thead className="bg-light">
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bookList}
                </tbody>
            </table>
            <Modal isOpen={modal} toggle={toggle} {...args}>
                <ModalHeader toggle={toggle}>Edit Book</ModalHeader>
                <form>
                    <ModalBody>
                        <div className="form-floating mb-3">
                            <input type="text" name="title" className="form-control" id="floatingInput" defaultValue={selectedBook.title || ''} onChange={handleInputChange} placeholder="Title"/>
                            <label htmlFor="floatingInput">Title</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" name="price" className="form-control" id="floatingInput" defaultValue={selectedBook.price || ''} onChange={handleInputChange} placeholder="Price" />
                            <label htmlFor="floatingInput">Price</label>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={handleUpdateBook}>
                            Edit
                        </Button>
                        <Button color="secondary" onClick={toggle}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </form>
            </Modal>
        </div>
        </>
    );

}

export default BookTable;