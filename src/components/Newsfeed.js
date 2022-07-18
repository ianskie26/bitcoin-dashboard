import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Newsfeed() {

    const [articles, setArticles] = useState(null)

    useEffect(() => {
        const options = {
        method: 'GET',
        url: 'http://localhost:8000/news'
        }

        axios.request(options).then((response) => {
            setArticles(response.data)
        }).catch((error) => {
            console.error(error)
        })
    },[])

    // Get X amount of articles
    const recentArticles = articles?.slice(0,5)

    return (
        <div className="news--feed">
            <h2>News Feed</h2>
            {recentArticles?.map((article, _index) => (
                <div key={_index}>
                    <a href={article.url} target="_blank" rel="noopener noreferrer"><p>{article.title}</p></a>
                </div>))}
        </div>
    )
}