import {useState} from 'react'
import { Outlet } from 'react-router-dom'

export default function Root() {
    return (
        <div>
            {/* this will be the whole app layout */}
            <Outlet />
        </div>
    )
}
