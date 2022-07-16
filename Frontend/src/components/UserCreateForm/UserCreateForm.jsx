import React, {useRef, useState} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import domain from '../../Domain/Domain';
import * as $ from 'jquery'
import os from "os-browserify";

function UserCreateForm() {
    const [url, setUrl] = useState("http://"+process.env.REACT_APP_API_URL);
    const createUser = (e)=>{
        e.preventDefault()
        var data = {
            name:$('.user-name').val(),
            phone:$('.user-phone').val(),
        }
        console.log(data)

        axios.post(url+"/user/add",data).then(response=>{
            console.log(response)
            if(response.status === 200){
                alert(JSON.stringify(response.data))
            }
        })
    }

    return (
        <div id="user-create-form">
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-8">
                        <Form onSubmit={createUser}>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control className="user-name" type="text" placeholder="Enter name" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="text" className='user-phone' placeholder="Enter phone" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default UserCreateForm;