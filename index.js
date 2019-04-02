'use strict';

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function displayResults(responseJson, limit) {
   
    console.log(responseJson);
    $('#results-list').empty();
    
    for (let i = 0; i < responseJson.data.length && i < limit; i++) {
     
        $('#results-list').append(
            `<li><h3>${responseJson.data[i].fullName}</h3>
                <p>${responseJson.data[i].description}</p>
                <p>url: ${responseJson.data[i].url}</p>
            </li>`
        )
    };
    
    $('#results').removeClass('hidden');
};

function getParks(query, limit = 10) {
    const apiKey = "TxhZA7qbxhezmxDhvvqdreHhJfc9rsiskmExGgrV";

    const params = {
        stateCode: query,
        limit,
        api_key: apiKey,
    };
    const queryString = formatQueryParams(params)

    const url = 'https://developer.nps.gov/api/v1/parks' + '?' + queryString;

    console.log(url);

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson, limit))
        .catch(error => {
            $('#js-error-message').text(`Something went wrong: ${error.message}`);
        });
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-search-term').val();
        const limit = $('#js-max-results').val();
        getParks(searchTerm, limit);
    });
}

$(watchForm);