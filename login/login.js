const signBtn = document.querySelector(".sign-in");
const currentUsername=document.querySelector()



const loginFunc=async (username,password)=>{
  let data= await fetch("http://localhost:8000/api/v1/user")
  let dataJson= await data.json
  console.log(dataJson);
  let obj=dataJson.find(element=>{return element.username===username})
}




signBtn.onclick=(){


}