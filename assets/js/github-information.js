// called in fetchGitHubInformation()
function userInformationHTML(user){
    return `
    <h2>${user.name}
    <span class="small-name">
        (@<a href="${user.html_url}" target="_blank">${user.login}</a>)
    </h2>
    <div class="gh-content">
        <div class="gh-content">
            <a href="${user.html_url}" target="_blank">
                <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}">
            </a>
        </div>
        <p>Followers: ${user.followers} - Following ${user.following} <br> Repos: ${user.public_repos}</p>
    </div>`;
}

// called in github.html
function fetchGitHubInformation(event){
    var username = $("#gh-username").val();
    // if the username field is empty
    if (!username){
        $("#gh-user-data").html(`<h2>Please enter a GitHub username</h2>`);
        return;  // to prevent accessing the API if the field is empty
    }

    // displaying the loader if a username was entered
    $("#gh-user-data").html(`<div id="loader">
    <img src="./assets/css/loader.gif" alt="loading..."/>
    </div>`);

    // start of a jQuery promise
    $.when(
        // to get the user data using the api
        $.getJSON(`https://api.github.com/users/${username}`)
    ).then(
        function(response){
            // storing the found user data
            var userData = response;
            // calls function to write that data to the html doc
            $("#gh-user-data").html(userInformationHTML(userData));
        }, function(errorResponse){
            // for page not found error
            if (errorResponse.status === 404){
                $("#gh-user-data").html(`<h2>No information was found on GitHub for user ${username}</h2>`);
            } else { // for other errors
                console.log(errorResponse);  // for programmer
                $("#gh-user-data").html(`<h2>Error: ${errorResponse.responseJSON.message}</h2>`);  // for user
            }
        });
}