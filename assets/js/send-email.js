// 
function sendMail(contactForm){
    // promise
    emailjs.send("gmail", "walkthrough_resume", {
        "from_name": contactForm.name.value, 
        "from_email": contactForm.emailaddress.value, 
        "project_request": contactForm.projectsummary.value
    })
    .then(  // responses
        function(response){
            console.log("Email send SUCCESS", response);
        },
        function(error){
            console.log("Email send FAILED", error);
        }
    );
    return false;
};