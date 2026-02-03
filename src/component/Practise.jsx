import React, { useEffect, useState } from 'react'

const Practise = () => {

    const [count, setCount] = useState(0)
    const [name, setName] = useState("Hasib")

    useEffect(() => {
        console.log("Hello React")
    }, [])

    const counter = () => {
        setCount(count + 1);
    }
    return (
        <>
            <div>{count}</div>
            <button onClick={counter} style={{ color: "yellowgreen", background: "black" }}>Click Here</button>
        </>
    )
}

export default Practise