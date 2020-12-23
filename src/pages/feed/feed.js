import "./feed.css";
import React, { Fragment, useState, useEffect, useMemo } from "react";
import { BsPlusCircleFill, BsChevronDoubleDown } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { GrFormEdit } from "react-icons/gr";
import { MdEdit } from "react-icons/md";
import {
  Modal,
  Alert,
  Button,
  Card,
  ListGroup,
  ListGroupItem,
  CardColumns,
  Collapse,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import url from "../../url";

const Feed = () => {
  const POST_FORM = {
    taskname: "",
  };

  // States to handle Modals for POST, PUT, DELETE, GET requests
  const [name, setName] = useState(POST_FORM);
  const [username, setUserName] = useState(POST_FORM);
  const [data, setData] = useState([]);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [open, setOpen] = useState(false);
  const [key, setKey] = useState("");
  const [model, setModel] = useState(false);
  const [taskedit, setTaskedit] = useState(false);
  const [task, setTask] = useState(false);
  const [change, setChange] = useState(false);
  const [deleteTask, setDeleteTask] = useState(false);
  const [deleteuser, setDeleteuser] = useState(false);
  const [DraggedItem, setDraggedItem] = useState(null);

  //code for Drag event
  function onDragStartHandler(e, id) {
    setDraggedItem(data[id]);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
  }

  //Code for Drop Event
  function onDragOverHandler(id) {
    const draggedOverItem = data[id];
    if (DraggedItem === draggedOverItem) {
      return;
    }

    // Code for rearranging the List
    const items = data.filter((item) => item !== DraggedItem);

    items.splice(id, 0, DraggedItem);
    console.log("dropped item" + items);
    setData(items);
  }

  // Get All users and task detail response handler
  const fetchData = useMemo(() => {
    fetch(url + "/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        setData(response);
      })
      .catch((err) => {
        console.log("failed");
        setFailure(true);
        window.setTimeout(() => {
          setFailure(false);
        }, 3000);
      });
  }, [change]);

  // State for re- rendering the ALl data from server for Create, Delete, Update operations
  useEffect(() => {
    return fetchData;
  }, [change]);

  // code to handle the modal close event
  const handleCloseWindow = () => {
    setModel(false);
    setTask(false);
    setDeleteTask(false);
    setDeleteuser(false);
    setTaskedit(false);
  };

  //Success and Failure Event Handler
  const handleSuccessAlert = () => setSuccess(false);

  const handleFailureAlert = () => setFailure(false);

  // Username change handler
  const handleChange = (event) => {
    event.preventDefault();
    setName({ username: event.target.value });
  };

  // Create TaskName handler
  const handleUserChange = (event) => {
    event.preventDefault();
    setName({ taskname: event.target.value });
  };

  // Edit task name handler
  const handleTaskChange = (event) => {
    event.preventDefault();
    setName({ taskname: event.target.value });
  };

  // function for creating the task
  const handleSubmitTask = (event) => {
    event.preventDefault();
    fetch(url + "/task/" + key, {
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
          setTask(false);
          setSuccess(true);
          window.setTimeout(() => {
            setSuccess(false);

            setChange(!change);
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
    setModel(false);
  };

  // Function for updating the username
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(url + "/user/" + key, {
      method: "PUT",
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
            setChange(!change);
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
    setModel(false);
  };

  // function for updating the taskname
  const handleTaskUpdate = (event) => {
    event.preventDefault();
    fetch(url + "/task/" + key, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...name,
      }),
    })
      .then((res) => {
        if (res) {
          setTaskedit(false);
          setSuccess(true);
          window.setTimeout(() => {
            setSuccess(false);
            setChange(!change);
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
    setModel(false);
  };
  
  //Function for Deleting the Task
  const handleTaskDelete = (event) => {
    event.preventDefault();
    fetch(url + "/task/" + key, {
      method: "DELETE",
    })
      .then((res) => {
        if (res) {
          setDeleteTask(false);
          setSuccess(true);
          window.setTimeout(() => {
            setSuccess(false);
            setChange(!change);
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
  };

  //Function for deleting the user
  const handleUserDelete = (event) => {
    event.preventDefault();
    fetch(url + "/user/" + key, {
      method: "DELETE",
    })
      .then((res) => {
        if (res) {
          setDeleteuser(false);
          setSuccess(true);
          setChange(!change);
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
  };

  return (
    <Fragment>
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
      <Modal show={task} onHide={handleCloseWindow}>
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmitTask}>
          <Modal.Body>
            <label>Task Name</label>
            <input
              id="Name"
              className="form-control"
              type="Text"
              label="Name"
              onChange={handleTaskChange.bind(this)}
              placeholder="Enter the Task Name"
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
      <Modal show={model} onHide={handleCloseWindow}>
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <label>User Name</label>
            <input
              id="Name"
              className="form-control"
              type="Text"
              label="Name"
              defaultValue={name}
              onChange={handleChange.bind(this)}
              placeholder="Edit the user Name"
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

      <Modal show={taskedit} onHide={handleCloseWindow}>
        <Modal.Header closeButton>
          <Modal.Title>Edit the Task</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleTaskUpdate}>
          <Modal.Body>
            <label>Task Name</label>
            <input
              id="Name"
              className="form-control"
              type="Text"
              label="Name"
              defaultValue={username}
              onChange={handleUserChange.bind(this)}
              placeholder="Edit the user Name"
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

      <Modal show={deleteTask} onHide={handleCloseWindow}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Task</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleTaskDelete}>
          <Modal.Body>Are you sure wanted to delete the task?</Modal.Body>
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

      <Modal show={deleteuser} onHide={handleCloseWindow}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleUserDelete}>
          <Modal.Body>Are you sure wanted to delete the user?</Modal.Body>
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

      <CardColumns>
        {data.map((item, idx) => {
          let count = 0;
          return (
            <div>
              <li key={idx} onDragOver={() => onDragOverHandler(idx)}>
                <Card
                  className="card"
                  key={item._id}
                  style={{ flex: 1 }}
                  draggable
                  onDragStart={(e) => {
                    onDragStartHandler(e, idx);
                  }}
                >
                  <Card.Body>
                    <Card.Title>
                      {item.username}
                      <GrFormEdit
                        className="edit"
                        onClick={() => {
                          setModel(true);
                          setKey(item._id);
                          setName(item.username);
                        }}
                      />
                      <BsPlusCircleFill
                        className="plus"
                        onClick={() => {
                          setTask(true);
                          setKey(item._id);
                        }}
                      />
                    </Card.Title>
                  </Card.Body>
                  <BsChevronDoubleDown
                    class="drop"
                    onClick={() => {
                      setKey(item._id);
                      setOpen(!open);
                    }}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                  />
                  <Collapse in={open && key === item._id}>
                    <ListGroup className="list-group-flush">
                      {item.task.map((t) => {
                        count += 1;
                        return (
                          <ListGroupItem key={t._id}>
                            Task {count} : {t.title}
                            <MdEdit
                              className="TaskEdit"
                              onClick={() => {
                                setKey(t._id);
                                setTaskedit(true);
                                setUserName(t.title);
                              }}
                            />
                            <AiFillDelete
                              className="bin"
                              onClick={() => {
                                setKey(t._id);
                                setDeleteTask(true);
                              }}
                            />
                          </ListGroupItem>
                        );
                      })}
                    </ListGroup>
                  </Collapse>
                  <Card.Footer>
                    <span />
                    <Button
                      variant="danger"
                      onClick={() => {
                        setKey(item._id);
                        setDeleteuser(true);
                      }}
                    >
                      Delete
                    </Button>
                  </Card.Footer>
                </Card>
              </li>
            </div>
          );
        })}
      </CardColumns>
    </Fragment>
  );
};

export default Feed;
