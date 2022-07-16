import React, { useState, useEffect, useCallback } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";
import Form from "react-bootstrap/Form";
import axios from "axios";
import domain from "../../Domain/Domain";
import * as $ from "jquery";
import { Circles } from "react-loader-spinner";
// import os from "os";;
import os from "os-browserify";

function MyTable() {
  const getUrl ="http://"+process.env.REACT_APP_API_URL + "/user/list"
  const editUrl ="http://"+ process.env.REACT_APP_API_URL + "/user/edit/"
  const removeUrl ="http://"+ process.env.REACT_APP_API_URL + "/user/delete/"
  const [users, setUsers] = useState([]);
  const [mainLoading, setMainLoading] = useState(false);
  const [url, setUrl] = useState()
  const getUsers = useCallback(async () => {
    console.log(process.env)
    console.log(getUrl)
    await axios.get(getUrl).then((response) => {
      console.log(response);
      var arr = [];
      if (response.status === 200) {
        response.data.forEach((e) => {
          var data = {
            id: e.id,
            name: e.name,
            phone: e.phone,
            editState: false,
            loadState: false,
          };
          arr.push(data);
        });
        setUsers(arr);
        setMainLoading(true);
      }
    });
  }, []);

  useEffect(() => {
    getUsers();
    $("svg").parent().css({ justifyContent: "center" });
  }, [getUsers]);

  const toggleEditState = (id) => {
    const updatedUser = users.find((u) => u.id === id);
    updatedUser.editState = !updatedUser.editState;
    const newUsers = users.map((user) => (user.id === id ? updatedUser : user));
    setUsers(newUsers);
  };

  const edit = (id) => {
    const updatedUser = users.find((u) => u.id === id);
    updatedUser.loadState = true;
    var data = {
      name: $(".user-name-" + id).val(),
      phone: $(".user-phone-" + id).val(),
    };
    axios.patch(editUrl + id, data).then((response) => {
      if (response.status === 200) {
        if (response.data.operation_status === "success") {
          updatedUser.editState = false;
          alert(JSON.stringify(response.data))
          getUsers();
        }
      }
    });
  };

  const deleteUser = (id) => {
    axios.delete(removeUrl + id).then((response) => {
      if (response.status === 200) {
        if (response.data.operation_status === "success") {
          alert(JSON.stringify(response.data))
          getUsers();
        }
      }
    });
  };

  return (
    <div id="table">
      <h1 className="container" style={{"textAlign":"center"}}>Node's Hostname: {os.hostname()} </h1>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-10">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {mainLoading && (
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td>{u.id}</td>
                      {u.editState ? (
                        <>
                          <>
                            <td>
                              <Form.Group className="mb-3">
                                <Form.Control
                                  className={`user-name-${u.id}`}
                                  defaultValue={u.name}
                                  type="text"
                                />
                              </Form.Group>
                            </td>
                            <td>
                              <Form.Group className="mb-3">
                                <Form.Control
                                  className={`user-phone-${u.id}`}
                                  defaultValue={u.phone}
                                  type="text"
                                />
                              </Form.Group>
                            </td>
                          </>
                        </>
                      ) : (
                        <>
                          <td>{u.name}</td>
                          <td>{u.phone}</td>
                        </>
                      )}
                      <td>
                        {u.editState ? (
                          <Button variant="success" onClick={() => edit(u.id)}>
                            <FontAwesomeIcon icon={faCheck} />
                          </Button>
                        ) : (
                          <Button
                            variant="warning"
                            onClick={() => toggleEditState(u.id)}
                          >
                            <FontAwesomeIcon icon={faPen} />
                          </Button>
                        )}
                        <Button variant="danger" className="mx-2" onClick={()=>deleteUser(u.id)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </Table>
            {!mainLoading && (
              <Circles
                height="50"
                width="50"
                color="grey"
                ariaLabel="loading"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyTable;
