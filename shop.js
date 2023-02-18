const open = document.querySelector('.open')
const shop = document.querySelector('.shop')
const shopMenu = document.querySelector('.shop-menu')
const close = document.querySelector('.back')
const carArr = Array.from(document.querySelectorAll('.car-block-btn'))
function bayArr(){
    let bays = JSON.parse(localStorage.getItem('bays')) || [false, false, true, true, true, true, true, true]
    bays.map((el, ind) => {
        if (el){
            carArr[ind].classList.add('bay')
        }
    })

    let bay = localStorage.setItem('bays',JSON.stringify(bays))
}
bayArr()

function removeBay(ind){
    let bays = JSON.parse(localStorage.getItem('bays'))

    bays = bays.map((el, i) => {
        if (i === ind){
            return !el
        }else {
            return el
        }
    })

    let bay = localStorage.setItem('bays',JSON.stringify(bays))
}

function btnBay(){
    carArr.map(el => {
        if (el.classList.contains('bay')){
            el.style.background = 'rgba(0, 0, 255, 0.84)'
        }
    })
}

btnBay()

open.addEventListener('click', ()=> {
    shop.classList.add('openAni')
    setTimeout(()=> {
        shop.classList.remove('openAni')
    },1000)
    shop.style.display = 'block'
})

close.addEventListener('click', ()=> {
    shop.classList.add('closeAni')
    setTimeout(()=> {
        shop.style.display = 'none'
        shop.classList.remove('closeAni')
    }, 950)
})

function chooseCar(){
    carArr.map((el, ind) => {
        if (!el.classList.contains('bay')){
            el.addEventListener('click', ()=> {
                carImg.setAttribute('src',`img/car${ind + 1}.png`)
                car.append(carImg)
                console.log(el.classList.contains('bay'))
            })
        }else {
            el.addEventListener('click', ()=> {
                let coin = JSON.parse(localStorage.getItem('coins'))
                if (+coin >= +el.innerHTML){
                    el.classList.remove('bay')
                    coin = `${+coin - +el.innerHTML}`
                    let newCoin = localStorage.setItem('coins',JSON.stringify(coin))
                    updateCoin()
                    removeBay(ind)
                    bayArr()
                    el.style.background = ''
                    el.innerHTML = 'choose'
                    chooseCar()
                }
            })
        }
    })
}

chooseCar()