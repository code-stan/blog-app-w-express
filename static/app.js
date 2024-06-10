const button = document.querySelector("button[data-doc]")
const id = button.getAttribute("data-doc");
button.addEventListener("click", ()=>{
     const endpoint = `/blogs/${id}`
     fetch(endpoint, {
          method: "DELETE"
     })
     .then(res=>res.json())
     .then(data=>{
          window.location.href = data.redirect;
     })
     .catch(err=> console.log(err))

})