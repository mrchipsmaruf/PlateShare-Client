import React from "react";
import { useLoaderData } from "react-router";

const AvailableFoods = () => {
    let data = useLoaderData();
    return (
        <div>
            <h1 className="text-2xl font-bold mb-5">Available Foods</h1>
        </div>
    );
};

export default AvailableFoods;
