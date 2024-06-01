import React, { Component } from 'react'

import "../css/styles.css";
import "../css/header.css";
import "../css/new.css";

export const NewReview = (props) => {
    return (
        <div class="container jumbotron centered">
            <h1>Recenzie nouă</h1>
            <form id="newPostForm" method="post" action="/reviews">
                <input type="text" name="destinationname" placeholder="Destinația turistică vizitată" required />
                <textarea
                    name="reviewbody"
                    placeholder="Scrieți recenzia dumneavoastră aici..."
                    required
                    rows="10"
                ></textarea>
                <div id="starRating" data-lyket-type="rate" data-lyket-id="my-<%=starId%>-post" data-lyket-show-rating="user"></div>
                <button class="full-width" type="submit" id="publicaBtn">Publică</button>
            </form>
            <a class="full-width" href="/main" id="cancelBtn">Anulează</a>
        </div>
    );
};