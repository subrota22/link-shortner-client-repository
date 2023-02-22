
const authToken = (email) => {
const currentUser = {
email:email , 
}
fetch(`https://mitly.vercel.app/jwt` , {
method:"POST" ,
headers:{
"Content-Type" : "application/json"
} ,
body:JSON.stringify(currentUser)  , 
}) 
.then(res => res.json()) 
.then(data => localStorage.setItem("link-shortner" , data.token ))
};

export default authToken;