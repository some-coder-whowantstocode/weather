const modebtns= document.querySelectorAll(".mode");


modebtns.forEach((modebtn)=>{
const darkbtn= modebtn.querySelector(".off");
    modebtn.addEventListener("click",
    function(){
        darkbtn.classList.toggle("dark");
        modebtn.classList.toggle("darkish");
    })
})
