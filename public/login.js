window.addEventListener("load",()=>{
    document.getElementById("signUpBtn").addEventListener("click", () => {
        let name = document.getElementById("name").value;
        let passw = document.getElementById("passw").value;
        localStorage.setItem("name", name);
        localStorage.setItem("passw", passw);
        //document.getElementById("result").innerHTML = localStorage.getItem("lastname");
    });
    
    document.getElementById("deleteAllBtn").addEventListener("click", () => {
    
        //document.getElementById("result").innerHTML = localStorage.getItem("lastname");
    });
    
    document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.removeItem('name');
        localStorage.removeItem('passw');
        alert("logout!");
    });
})