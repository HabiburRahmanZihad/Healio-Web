"use client";

import { getBlogs } from "@/actions/blog.action";
import { useEffect, useState } from "react";

export default function AboutPage() {
    const [data, setData] = useState();
    console.log(data);

    useEffect(() => {
        (async () => {
            const { data } = await getBlogs();

            setData(data);
        })();
    }, []);
    return (
        <div>this is about page</div>
    );
}