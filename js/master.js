const box = document.querySelector('.box')
const pop = document.querySelector('.pop')
const menu = document.querySelector('.menutop')
const title = document.querySelector('.pop h2')
const img = document.querySelector('.pop figure img')
const price = document.querySelector('.pop .rate p')
const numstar = document.querySelector('.num')
const closer = document.querySelector('.pop span')
const loud = document.querySelector('.loud')
const btn = document.querySelectorAll('.menutop li')
const sabadpop=document.querySelector('.sabadpop')
const closer2=document.querySelector('.sabadpop span')
const addbtn = document.querySelector('.addbtn')
window.addEventListener('scroll' , (e)=>{
    let st = window.scrollY

    if(st>190){
        menu.classList.add('ul')
       
    }else{
        menu.classList.remove('ul')
    }
    
})

fetch('https://fakestoreapi.com/products/')
.then(result=>{
    if(result.ok){
        return result.json()
    }
    Promise.reject(error)
})
.then( data=>{
    data.map((val)=>{
        if(val.category!= 'electronics'){
            let art = document.createElement('article')
            art.innerHTML=`
              <img src="${val.image}" alt="">
              <h3>${val.title}</h3>
              <div class="price">${val.price + "$"}</div>
              <button onclick='Poplist(${val.id})'>see more</button>
                `
                box.appendChild(art)
        }
      
    })
})
.catch((error)=> console.log(error))

function Poplist(s){
    pop.style.left='0'
    loud.style.display='block'
    setTimeout(() => {
        loud.style.display='none'

    }, 2500);
    fetch('https://fakestoreapi.com/products/'+s)
    .then(res => res.json())
    .then(data=>{
        title.innerHTML=data.title
        img.src=data.image
        price.innerHTML=data.price+'$'
        numstar.innerHTML=data.rating.rate


        const w = img.clientWidth
        const h = img.clientHeight
        img.addEventListener('mousemove' , (e)=>{
            let x = (e.offsetX/w-0.5)*20
            let y = -(e.offsetY/h-0.5)*20
            e.target.style.transform='perspective(2000px)rotateY('+x+'deg)rotateX('+y+'deg)'
        })

        addbtn.addEventListener('click' , (e)=>{
        let sec =document.createElement('section')
        sec.innerHTML=`
        <figure>
            <img src="${data.image}" alt=""  class="image">
        </figure>
        <h2>${data.title}</h2>
        <p>${data.price+'$'}</p>
        <span class="material-symbols-outlined" id="Xbutton" >
            close
            </span>
    `
 
    sabadpop.appendChild(sec)
    e.target.style.background='green'
    e.target.innerHTML='be sabad kharid add shod'


    
      
    
   
   
})
    })
}
closer.addEventListener('click' , (e)=>{
    pop.style.left='-110%'
    title.innerHTML=''
    img.src=''
    price.innerHTML=''
    numstar.innerHTML=''
    addbtn.style.background='#fffc4f'
    addbtn.innerHTML='add to cart'
})
const sabad = document.querySelector('.sabad')
sabad.addEventListener('click' , (e)=>{
    sabadpop.style.left='0'
})
closer2.addEventListener('click' , (e)=>{
    sabadpop.style.left='-150%'
})
