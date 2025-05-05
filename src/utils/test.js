const arrSimpleNumber = [2, 3, 5, 7, 11]

const getArrSimpleNumber = () => {
    const full = Math.pow(10, 20)/2
    for (let i = 12; i < full; i++) { // выведет 0, затем 1, затем 2
        const count = (full - 12) / 1000
        const delitel = arrSimpleNumber.find(itemSimple =>
            i % itemSimple === 0
        )
        if(!delitel) arrSimpleNumber.push(i)
        //const procent = (i - 11) / (full - 12) * 100
        const procent = i  / full * Math.pow(10, 12) * 100
        const procentFixed2 = Number(procent.toFixed(2) )
        //console.log('procent', procent)
        if(procentFixed2 % 1 === 0) console.log(  procentFixed2 / Math.pow(10, 12) + ' %')
    }
}
getArrSimpleNumber()
console.log(arrSimpleNumber);