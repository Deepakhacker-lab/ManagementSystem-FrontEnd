import { Button, Modal, Alert, Navbar, Nav } from "react-bootstrap";
import React, { useState } from "react";
import url from "../../url";

const User = () => {
  const POST_FORM = {
    username: "",
  };
  //Setting up the state for Adding new user
  const [show, setShow] = useState(false);
  const [name, setName] = useState(POST_FORM);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

  // sending post request to server on submit event
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(url + "/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...name,
      }),
    })
      .then((res) => {
        if (res) {
          setSuccess(true);
          window.setTimeout(() => {
            setSuccess(false);
          }, 3000);
        } else {
          setFailure(true);
          window.setTimeout(() => {
            setFailure(false);
          }, 3000);
        }
      })
      .catch((err) => {
        setFailure(true);
        window.setTimeout(() => {
          setFailure(false);
        }, 3000);
      });
    setShow(false);
    console.log(name);
  };

  //Handling the modals with state change
  const handleShow = () => setShow(true);

  const handleCloseWindow = () => setShow(false);

  const handleSuccessAlert = () => setSuccess(false);

  const handleFailureAlert = () => setFailure(false);

  // On-change event listener
  const handleChange = (event) => {
    event.preventDefault();
    setName({ username: event.target.value });
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">React App</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Nav>
            <Button variant="primary" onClick={handleShow}>
              Add User
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Modal show={success} onHide={handleSuccessAlert}>
        <Modal.Header closeButton>
          <Modal.Title>Success Alert!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="success">
            <p>Successful</p>
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleSuccessAlert}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={failure} onHide={handleFailureAlert}>
        <Modal.Header closeButton>
          <Modal.Title>Failure Alert !</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="danger">
            <p>Unable to process the Request, Please retry later</p>
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleFailureAlert}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show} onHide={handleCloseWindow}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <label for="Name">User Name</label>
            <input
              id="Name"
              className="form-control"
              type="Text"
              label="Name"
              value={name.value}
              onChange={handleChange.bind(this)}
              placeholder="Enter the Name"
            ></input>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseWindow}>
              Close
            </Button>
            <Button design="raised" type="submit" value="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default User;
