import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function AddBook({args, onBookAdd}) {
    const [modal, setModal] = useState(false);
    const [newBook, setBook] = React.useState({});
    
    const toggle = () => setModal(!modal);

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setBook(({
            ...newBook,
            [name]: value
        }));
    }

    const handleAddBook = async () => {

            console.log(`BOOK SENT TO DB ${JSON.stringify(newBook)}`)
            await fetch(`http://localhost:8080/api/books/create`,
                {
                    method: 'POST', headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }, body: JSON.stringify(newBook)
                },)
                .then(
                    (data) => {
                        console.log(data);
                    },
                    (error) => {
                        console.log(error);
                    }
                )
            
            onBookAdd(true);
            toggle();
    }

    return (
        <div className="w-75" style={{textAlign: 'right'}}>
        <Button color="primary" onClick={toggle} className='m-1 p-2'>
            Add Book
        </Button>
        <Modal isOpen={modal} toggle={toggle} {...args}>
            <ModalHeader toggle={toggle}>Add Book</ModalHeader>
            <form>
                <ModalBody>
                    <div className="form-floating mb-3">
                        <input type="text" name="title" className="form-control" id="floatingInput" onChange={handleInputChange} placeholder='Title'/>
                        <label htmlFor="floatingInput">Title</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" name="price" className="form-control" id="floatingInput" onChange={handleInputChange} placeholder="Price" />
                        <label htmlFor="floatingInput">Price</label>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleAddBook}>
                        Add
                    </Button>
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </form>
        </Modal>
        </div>
    );
}

export default AddBook;