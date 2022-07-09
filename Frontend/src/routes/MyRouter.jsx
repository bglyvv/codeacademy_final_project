import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MyTable from '../components/MyTable/MyTable';
import Status from '../components/Status/Status';
import UserCreateForm from '../components/UserCreateForm/UserCreateForm';
function MyRouter() {
    return (
        <Routes>
            <Route path='/' element={<MyTable />} />
            <Route path='/create' element={<UserCreateForm />} />
            <Route path='/status' element={<Status />} />
        </Routes>
    )
}

export default MyRouter;