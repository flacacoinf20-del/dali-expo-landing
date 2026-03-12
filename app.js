const heroSection = document.getElementById("heroSection")

const formSection = document.getElementById("formSection")

const openFormBtn = document.getElementById("openFormBtn")

const visitorForm = document.getElementById("visitorForm")



openFormBtn.addEventListener("click", () => {

heroSection.classList.add("hidden")

formSection.classList.remove("hidden")

window.scrollTo({top:0,behavior:"smooth"})

})



visitorForm.addEventListener("submit",(event)=>{

event.preventDefault()



const nombre=document.getElementById("nombre").value.trim()

const institucion=document.getElementById("institucion").value.trim()

const pais=document.getElementById("pais").value.trim()

const email=document.getElementById("email").value.trim()

const consent=document.getElementById("consent").checked



if(!nombre||!institucion||!pais){

alert("Complete nombre, institución y país.")

return

}



console.log({

nombre,

institucion,

pais,

email:email||null,

consentimiento_eventos:consent,

evento:"goya-dali-del-capricho-al-disparate",

fecha_iso:new Date().toISOString()

})



alert("Registro enviado correctamente.")

visitorForm.reset()

})