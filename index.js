let cats = [
    {
     title:"cat1",
        id:1,
        url: "https://i.natgeofe.com/n/9135ca87-0115-4a22-8caf-d1bdef97a814/75552.jpg?w=636&h=424",
        mood:"5/10"

    },
    {
        title:"cat2",
        id:2,
        url: "https://i.natgeofe.com/n/9135ca87-0115-4a22-8caf-d1bdef97a814/75552.jpg?w=636&h=424",
        mood:"3/10"

    }
]

const toHtml = (cats) =>{
    return `
      <div class="card">
                <div class="card" style="width: 18rem;">
                    <img src=${cats.url}  class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${cats.title}</h5>

                        <a href="#" class="btn btn-primary" data-btn="price" data-id=${cats.id}>how much</a>
                        <a href="#" class="btn btn-danger" data-btn="remove" data-id=${cats.id}>delete</a>
                    </div>
                </div>
            </div>
    `
}


const render = () =>{
    const html = cats.map(cat =>toHtml(cat)).join()
    document.querySelector('#cats').innerHTML = html
}


const priceModal = $.modal({
    title:"цена",
    closable:true ,
    content:`
<p>Lorem ipsum dolor sit.</p>
`,
    width:'400px',
    footerButtons:[
        {text:"ok",type:'primary',handler(){
                priceModal.close()
            }}
    ]
})



render()
document.addEventListener('click',event=>{
    event.preventDefault()
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id
    const cat = cats.find(c=> c.id === id)
    if(btnType === 'price'){

        priceModal.setContent(`
        <p>Настроение у ${cat.title}:${cat.mood}</p>
        `)
       priceModal.open()
        console.log(id,cat)
    }else  if(btnType === 'remove'){
     $.confirm({
         title:"are you sure?",
         content:`<p>you are deleting ${cat.title}<p/>`
     }).then(()=>{
         cats = cats.filter(el=>el.id !== id)
render()
     }).catch(()=>{
console.log("canceled")
     })
    }
})