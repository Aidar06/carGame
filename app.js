const car = document.querySelector('.car')
let carImg = document.createElement('img')
carImg.setAttribute('src','img/car1.png')
car.append(carImg)
let boxArr = Array.from(document.querySelectorAll('.box'))
boxArr = boxArr.map(el => el.getBoundingClientRect())
const orderRel = document.querySelector('.order')
const overRel = document.querySelector('.over')
const money = document.querySelector('.money-count')
function updateCoin(){
    if (JSON.parse(localStorage.getItem('coins'))){
        money.innerHTML = JSON.parse(localStorage.getItem('coins'))
    }else {
       localStorage.setItem('coins',JSON.stringify('100'))
        updateCoin()
    }
}
updateCoin()

function plusCoin(){
    let coin = JSON.parse(localStorage.getItem('coins'))

    coin = `${+coin + 50}`

    let newCoins = localStorage.setItem('coins',JSON.stringify(coin))
    updateCoin()
}

function minusCoin(){
    let coin = JSON.parse(localStorage.getItem('coins'))
    money.style.color = 'red'
    setTimeout(()=> {
        money.style.color = ''
    }, 600)

    if (+coin > 10){
        coin = `${+coin - 10}`
        let newCoins = localStorage.setItem('coins',JSON.stringify(coin))
        updateCoin()
    }
}


let g = 5
let b = 20
let d = 0
let l = 430
let n = 5 / 18
let count = 0
let countOne = 0
let countTwo = 0
let countThree = 0

function carBreak(car){
    let one = document.querySelector('.one').getBoundingClientRect()
    let two = document.querySelector('.two').getBoundingClientRect()
    let three = document.querySelector('.three').getBoundingClientRect()
    let four = document.querySelector('.four').getBoundingClientRect()

    for (let i = 0; i < boxArr.length; i++){
        if ((one.top >= boxArr[i].top && one.bottom <= boxArr[i].bottom && one.left >= boxArr[i].left && one.right <= boxArr[i].right) || (two.top >= boxArr[i].top && two.bottom <= boxArr[i].bottom && two.left >= boxArr[i].left && two.right <= boxArr[i].right) || (three.top >= boxArr[i].top && three.bottom <= boxArr[i].bottom && three.left >= boxArr[i].left && three.right <= boxArr[i].right) || (four.top >= boxArr[i].top && four.bottom <= boxArr[i].bottom && four.left >= boxArr[i].left && four.right <= boxArr[i].right)){
            clearInterval(car)
            minusCoin()
        }
    }
}

function border(){
    if (b > 310 && b < 410){
        if (l < 153){
            l = 1360
        }else if (l > 1360){
            l = 153
        }
    }else if ((l > 415 && l < 520) || (l > 1015 && l < 1115)){
        if (b < 0){
            b = 713
        }else if (b > 713){
            b = 0
        }
    }else {
        if (b > 713) {
            b = 713
        }else if (b < 0) {
            b = 0
        }else if (l > 1360) {
            l = 1360
        }else if (l < 153) {
            l = 153
        }
    }
}

function randomOrder(){
    for (let i = 1;i <= 10;i++){
        orderRel.classList.remove(`s${i}`)
    }
    orderRel.style.display = 'block'
    let n = Math.ceil(Math.random() * 10)
        orderRel.classList.add(`s${n}`)
}

randomOrder()

function randomOver(){
    for (let i = 1;i <= 10;i++){
        overRel.classList.remove(`s${i}`)
    }
    overRel.style.display = 'block'
    let n = Math.ceil(Math.random() * 10)
    overRel.classList.add(`s${n}`)
}


function comeOrder(){
    let one = document.querySelector('.one').getBoundingClientRect()
    let two = document.querySelector('.two').getBoundingClientRect()
    let three = document.querySelector('.three').getBoundingClientRect()
    let four = document.querySelector('.four').getBoundingClientRect()
    let checkArr = [one,two,three,four]
    const order = document.querySelector('.order').getBoundingClientRect()

    for (let i = 0;i < checkArr.length; i++){
        if (checkArr[i].top >= order.top && checkArr[i].bottom <= order.bottom && checkArr[i].left >= order.left && checkArr[i].right <= order.right){
            orderRel.style.display = 'none'
            randomOver()
        }
    }
}

function comeOver(){
    let one = document.querySelector('.one').getBoundingClientRect()
    let two = document.querySelector('.two').getBoundingClientRect()
    let three = document.querySelector('.three').getBoundingClientRect()
    let four = document.querySelector('.four').getBoundingClientRect()
    let checkArr = [one,two,three,four]
    const over = document.querySelector('.over').getBoundingClientRect()

    for (let i = 0;i < checkArr.length; i++){
        if (checkArr[i].top >= over.top && checkArr[i].bottom <= over.bottom && checkArr[i].left >= over.left && checkArr[i].right <= over.right){
            overRel.style.display = 'none'
            randomOrder()
            plusCoin()
        }
    }
}




let v = 0
let t = 0
let speed = 25
window.addEventListener('keydown', (e)=> {
    if (e.key === '1'){
        speed = 25
    }

    if (e.key === '2'){
        speed = 20
    }

    if (e.key === '3'){
        speed = 15
    }

    if (e.key === '4'){
        speed = 10
    }

    if (e.key === '5'){
        speed = 2
    }

    if ((e.key === 'w' || e.key === 'W' || e.key === 'ц' || e.key === 'Ц') && t === 0){
        t = 1
        let moveCar = setInterval(() => {
            carBreak(moveCar)
            border()
            comeOrder()
            comeOver()


            if (d >= 0 && d <= 90) {
                b += g - (n * count)
                car.style.bottom = `${b}px`
                l += n * count
                car.style.left = `${l}px`
            }

            if (d > 90 && d <= 180) {
                b -= n * countOne
                car.style.bottom = `${b}px`
                l += g - (n * countOne)
                car.style.left = `${l}px`
            }

            if (d > 180 && d <= 270) {
                b -= g - (n * countTwo)
                car.style.bottom = `${b}px`
                l -= n * countTwo
                car.style.left = `${l}px`
            }

            if (d > 270 && d < 360) {
                b += n * countThree
                car.style.bottom = `${b}px`
                l -= g - (n * countThree)
                car.style.left = `${l}px`
            }
        }, speed)

        window.addEventListener('keyup', (e)=> {
            if (e.key === 'w' || e.key === 'W' || e.key === 'ц' || e.key === 'Ц'){
                clearInterval(moveCar)
                t = 0
            }
        })
    }

    if ((e.key === 's' || e.key === 'S' || e.key === 'ы' || e.key === 'Ы') && t === 0){
        t = 1
        let moveCar = setInterval(()=>{
            carBreak(moveCar)
            border()
            comeOrder()
            comeOver()

            if (d >= 0 && d <= 90){
                b -= g - (n * count)
                car.style.bottom = `${b}px`
                l -= n * count
                car.style.left = `${l}px`
            }

            if (d > 90 && d <= 180){
                b +=n * countOne
                car.style.bottom = `${b}px`
                l -= g - (n * countOne)
                car.style.left = `${l}px`
            }

            if (d > 180 && d <= 270){
                b += g - (n * countTwo)
                car.style.bottom = `${b}px`
                l += n * countTwo
                car.style.left = `${l}px`
            }

            if (d > 270 && d < 360){
                b -=n * countThree
                car.style.bottom = `${b}px`
                l += g - (n * countThree)
                car.style.left = `${l}px`
            }
        }, 25)

        window.addEventListener('keyup', (e) => {
            if (e.key === 's' || e.key === 'S' || e.key === 'ы' || e.key === 'Ы'){
                clearInterval(moveCar)
                t = 0
            }
        })
    }

    if ((e.key === 'd' || e.key === 'D' || e.key === 'в' || e.key === 'В') && v === 0){
            v = 1
            let turnRight = setInterval(() => {
                d += 5
                if (d > 0 && d <= 90){
                    count += 1
                }

                if (d > 90 && d <= 180){
                    countOne += 1
                }

                if (d > 180 && d <= 270){
                    countTwo += 1
                }

                if (d <= 360 && d > 270){
                    countThree += 1
                }

                if (d === 360){
                    d = 0
                    count = 0
                    countOne = 0
                    countTwo = 0
                    countThree = 0
                }
                car.style.rotate = `${d}deg`
            }, 25)
            window.addEventListener('keyup', (e) => {
                if (e.key === 'd' || e.key === 'D' || e.key === 'в' || e.key === 'В'){
                    clearInterval(turnRight)
                    v = 0
                }
            })
        }

    if ((e.key === 'a' || e.key === 'A' || e.key === 'ф' || e.key === 'Ф')&& v === 0){
            v = 1
           let turnLeft = setInterval(() => {
               d -= 5
               if (d >= 0 && d < 90){
                   count -= 1
               }
               if (d >= 90 && d < 180){
                   countOne -= 1
               }

               if (d >= 180 && d < 270){
                   countTwo -= 1
               }

               if (d <= 360 && d >= 270){
                   countThree -= 1
               }

               if (d < 0){
                   d = 360 - 5
                   count = 18
                   countOne = 18
                   countTwo = 18
                   countThree = 18 - 1
               }

               car.style.rotate = `${d}deg`
           }, 25)
            window.addEventListener('keyup', (e) => {
                if (e.key === 'a' || e.key === 'A' || e.key === 'ф' || e.key === 'Ф'){
                    v = 0
                    clearInterval(turnLeft)
                }
            })
        }
})




