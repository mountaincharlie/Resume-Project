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

// called in fetchGitHubInformation() (repos is an array)
function repoInformationHTML(repos){
    if (repos.length === 0){
        return `<div class="clearfix repo-list">No repos to display</div>`;
    }
    // using map() to iterate through all the found repos and store them as li items
    var listItemsHTML = repos.map(function(repo){
        return `<li>
                    <a href="${repo.html_url} target="_blank">${repo.name}</a>
                </li>`;
    });
    // the ul is the parent elemst of the li items, joined with a \n between
    return `<div class="clearfix repo-list">
                <p>
                    <strong>Repo List:</strong>
                </p>
                <ul>
                    ${listItemsHTML.join("\n")}
                </ul>
            </div>`;
};

// called in github.html
function fetchGitHubInformation(event){
    // emptying the divs between searches
    $("gh-user-data").html("");
    $("gh-repo-data").html("");
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
        $.getJSON(`https://api.github.com/users/${username}`),
        // to get the user repo data using the api
        $.getJSON(`https://api.github.com/users/${username}`)
    ).then(
        function(firstResponse, secondResponse){
            // storing the found user data
            var userData = firstResponse[0];
            var repoData = secondResponse[0];

            // calls function to write that data to the html doc
            $("#gh-user-data").html(userInformationHTML(userData));
            $("#gh-repo-data").html(repoInformationHTML(repoData));
        }, function(errorResponse){
            // for page not found error
            if (errorResponse.status === 404){
                $("#gh-user-data").html(`<h2>No information was found on GitHub for user ${username}</h2>`);
            } else if(errorResponse.status === 403) {  // checking for 'forbidden' if API limit reached in this timeframe
                var resetTime = new Date(errorResponse.getResponseHeader("X-RateLimit-Reset")*1000);
                $("#gh-user-data").html(`<h4>Too many requests have been made at the moment. Please wait until ${resetTime.toLocaleTimeString} to try again.</h4>`);
            } else { // for other errors
                console.log(errorResponse);  // for programmer
                $("#gh-user-data").html(`<h2>Error: ${errorResponse.responseJSON.message}</h2>`);  // for user
            }
        });
}

// having the octocat profile displayed by default
$(document).ready(fetchGitHubInformation);