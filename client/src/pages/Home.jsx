import { useEffect, useState } from "react";

import TestHeader from "../components/TestHeader";
import ItemCard from "../components/ItemCard";

export default function Home() {

    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/items")
            .then((res) => res.json())
            .then((data) => setItems(data));
    }, []);


    return (
        <>

            <div style={{ backgroundColor: "green", minHeight: "100vh" }}>

                <TestHeader />

                <div className="container heading text-black">
                    <h1>Search Party test text!!</h1>
                </div>

                <div className="container mt-4">
                    {items.map((item) => (
                        <ItemCard key={item._id} item={item} />
                    ))}
                </div>

            </div>

        </>
    );
}