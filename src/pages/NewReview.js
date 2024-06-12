import Axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import { useState } from 'react'

import { Link } from 'react-router-dom';

import "../css/styles.css";
import "../css/header.css";
import "../css/new.css";

export const NewReview = (props) => {
    const [review_body, setReviewBody] = useState('');
    const [destination_name, setDestinationName] = useState('');

    const { data: destinations } = useQuery(["destination_id"], async function () {
        try {
            const response = await Axios.get(`http://localhost:5000/destinations`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted");
        console.log("Review body:", review_body);
        console.log("Destination name:", destination_name);
    };

    return (
        <div className="container jumbotron centered">
            <h1>Recenzie nouă</h1>
            <form id="newPostForm" onSubmit={handleSubmit}>
                <input
                    type="text" name="destination_name"
                    placeholder="Destinația turistică vizitată"
                    required
                    value={destination_name}
                    onChange={(e) => setDestinationName(e.target.value)}
                    list="destination_names"
                />
                <datalist id="destination_names">
                    {destinations?.map((destination, idx) => {
                        return (
                            <option key={idx} value={destination.destination_name} />
                        );
                    })}
                </datalist>
                <textarea
                    name="review_body"
                    placeholder="Scrieți recenzia dumneavoastră aici..."
                    required
                    rows="10"
                    value={review_body}
                    onChange={(e) => setReviewBody(e.target.value)}
                ></textarea>
                <div id="starRating" data-lyket-type="rate" data-lyket-id="my-<%=starId%>-post" data-lyket-show-rating="user"></div>
                <button className="full-width" type="submit" id="publicaBtn">Publică</button>
            </form>
            <Link to="/main">
                <button className="full-width" id="cancelBtn">Anulează</button>
            </Link>
        </div>
    );
};