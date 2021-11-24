document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("init scripts Front successfully!");

/////////////////////HOME MENU DESPLEGABLE////////////////////////////
const ham = document.querySelector(".menu");
const menu = document.querySelector('#header-menu');
const links = document.querySelectorAll('#header-menu li');

var tl = gsap.timeline({ paused: true });

tl.to(menu, {
	duration: 1,
	opacity: 1,
	height: '10vh', // change this to 100vh for full-height menu
	ease: 'expo.inOut',
})
tl.from(links, {
	duration: 1,
	opacity: 0,
	//y: 20,
	stagger: 0.1,
	ease: 'expo.inOut',
}, "-=0.5");

tl.reverse();

ham.addEventListener('click', () => {
	tl.reversed(!tl.reversed());
});

/////////////////////FIN HOME MENU DESPLEGABLE////////////////////////////
/////////////////////TYPE FORM SELECTION////////////////////////////
const btnWorker = document.querySelector('.btn-Worker'); 
const btnClient = document.querySelector('.btn-Client');
const btnloginClient = document.querySelector('.login-Client');
const btnloginWorker = document.querySelector('.login-Worker');

const btnNewRegisterClient = document.querySelector('.btnNewRegisterClient');
const btnNewRegisterWorker = document.querySelector('.btnNewRegisterWorker');
const formClient = document.querySelector('.singup-form-Client');
const formWorker = document.querySelector('.singup-form-Worker');

const jumpLoginClient = document.querySelector('.jumpLoginClient');
const jumpLoginWorker = document.querySelector('.jumpLoginWorker');
const formLoginClient = document.querySelector('.login-form-Client');
const formLoginWorker = document.querySelector('.login-form-Worker');

const btnSingupClient = document.querySelector('#btn-singup-Client');
const btnSingupWorker = document.querySelector('#btn-singup-worker');
//Register loginClient a Register loginWorker
btnWorker.addEventListener('click', () => {
    TweenMax.set(formLoginClient,{opacity:0,display:"none"});
    TweenMax.set(formLoginWorker,{opacity:0,display:"none"});
    TweenMax.set(formWorker,{opacity:0,display:"none"});
        
        gsap.timeline()
            .to(formClient,0.3, {opacity:0, display:"none"})
            .to(formWorker,1, {opacity:1, display:"flex"});
	 
});
//Register loginWorker a Register loginClient
btnClient.addEventListener('click', () => {
    TweenMax.set(formLoginClient,{opacity:0,display:"none"});
    TweenMax.set(formLoginWorker,{opacity:0,display:"none"});
    TweenMax.set(formClient,{opacity:0,display:"none"});
        
        gsap.timeline()
            .to(formWorker,0.3, {opacity:0, display:"none"})
            .to(formClient,1, {opacity:1, display:"flex"});
});
//LoginCliente a RegisterClient
btnloginClient.addEventListener('click', () => {
    TweenMax.set(formClient,{opacity:0,display:"none"});
    TweenMax.set(formWorker,{opacity:0,display:"none"});
    TweenMax.set(formLoginClient,{opacity:0,display:"none"});
      
        gsap.timeline()
            .to(formClient,0.3, {opacity:0, display:"none"})
            .to(formLoginClient,1, {opacity:1, display:"flex"});
});
//LoginWorker a Register Worker
btnloginWorker.addEventListener('click', () => {
    TweenMax.set(formClient,{opacity:0,display:"none"});
    TweenMax.set(formWorker,{opacity:0,display:"none"});
    TweenMax.set(formLoginWorker,{ opacity:0, display:"none"});
      
        gsap.timeline()
            .to(formWorker,0.3, {opacity:0, display:"none"})
            .to(formLoginWorker,1, {opacity:1, display:"flex"});
});
//LoginWClient a singup Client
btnNewRegisterClient.addEventListener('click', () => {
    TweenMax.set(formLoginClient,{opacity:0,display:"none"});
    TweenMax.set(formLoginWorker,{opacity:0,display:"none"});
    TweenMax.set(formClient,{opacity:0,display:"none"});

    TweenMax.set(formClient,{ opacity:0, display:"none"});
        
        gsap.timeline()
            .to(formLoginClient,0.3, {opacity:0, display:"none"})
            .to(formClient,1, {opacity:1, display:"flex"});
});
//LoginCliente jump loginWorker
jumpLoginWorker.addEventListener('click', () => {
    TweenMax.set(formClient,{opacity:0,display:"none"});
    TweenMax.set(formWorker,{opacity:0,display:"none"});
    TweenMax.set(formLoginWorker,{ opacity:0, display:"none"});
      
        gsap.timeline()
            .to(formLoginClient,0.3, {opacity:0, display:"none"})
            .to(formLoginWorker,1, {opacity:1, display:"flex"});
});
//LoginWorker a singup worker
btnNewRegisterWorker.addEventListener('click', () => {
    TweenMax.set(formLoginClient,{opacity:0,display:"none"});
    TweenMax.set(formLoginWorker,{opacity:0,display:"none"});
    TweenMax.set(formWorker,{opacity:0,display:"none"});
      
        gsap.timeline()
            .to(formLoginWorker,0.3, {opacity:0, display:"none"})
            .to(formWorker,1, {opacity:1, display:"flex"});
});
//LoginWorker jump loginClient
jumpLoginClient.addEventListener('click', () => {
    TweenMax.set(formClient,{opacity:0,display:"none"});
    TweenMax.set(formWorker,{opacity:0,display:"none"});
    TweenMax.set(formLoginClient,{opacity:0,display:"none"});;
      
        gsap.timeline()
            .to(formLoginWorker,0.3, {opacity:0, display:"none"})
            .to(formLoginClient,1, {opacity:1, display:"flex"});
});
//btn singupClient a loginClient
btnSingupClient.addEventListener('click', (e) => {
    e.preventDefault();
    
    const inputs = document.querySelectorAll(".singup-form-Client  input")
    
    const body = [...inputs].reduce((acc, input) => {
        acc[input.name] = input.value
        return acc
    } , {})

    console.log(body)
    
    axios.post("/client", body)
        .then(res => console.log(res))
        .catch(err => console.log(err))


    TweenMax.set(formWorker,{opacity:0,display:"none"});
    TweenMax.set(formLoginWorker,{opacity:0,display:"none"});
    TweenMax.set(formLoginClient,{opacity:0,display:"none"});
        
        gsap.timeline()
            .to(formClient,0.3, {opacity:0, display:"none"})
            .to(formLoginClient,1, {opacity:1, display:"flex"});	 
});
//btn singupWorker a loginWorker
btnSingupWorker.addEventListener('click', (e) => {
    e.preventDefault();

    const inputs = document.querySelectorAll(".singup-form-Worker input");

    
    const body = [...inputs].reduce((acc, input) => {
        if(input.name === "serviceType") {
            input.checked ? acc.serviceType.push(input.value) : null
            return acc
        }
        const key = input.name
        acc[key] = input.value
        return acc

    } , { serviceType: [] });

    console.log("consolelooog", body);
    
    axios.post("/worker", body)
        .then(res => console.log(res))
        .catch(err => console.log(err))

    TweenMax.set(formClient,{opacity:0,display:"none"});
    TweenMax.set(formLoginClient,{opacity:0,display:"none"});
    TweenMax.set(formLoginWorker,{opacity:0,display:"none"});
        
        gsap.timeline()
            .to(formWorker,0.3, {opacity:0, display:"none"})
            .to(formLoginWorker,1, {opacity:1, display:"flex"});	 
});

const entrarDashBoardCliente = document.querySelector('#entrarDashBoardCliente');
const entrarDashBoardWorker = document.querySelector('#entrarDashBoardWorker');
entrarDashBoardCliente.addEventListener('click', (e) => {
    // e.preventDefault(); 
    startMap();     
});

entrarDashBoardWorker.addEventListener('click', (e) => {
    // e.preventDefault(); 
    startMap(); 
});


/////////////////////FIN TYPE FORM SELECTION////////////////////////////
},
false
);