var frnd = ['a', 'b', 'c']

var obj = [{
  name: "a",
  amount: 2000
},
{
  name: "b",
  amount: 200
},
{
  name: "c",
  amount: 1000
}
]

var total = 0;
obj.forEach(v => total += v.amount)

const toGive = []
obj.forEach(money => {

  let getFrom = [...frnd]
  getFrom.splice(frnd.indexOf(money.name), 1)

  toGive.push({
    getFrom,
    bearer: money.name,
    amount: (money.amount / frnd.length),
  })

})
console.log(toGive)
console.log(obj)
toGive.map(tg => {
  tg.getFrom.map(v =>
    console.log(tg.bearer + ' = ' + tg.amount + '+' +
      toGive[toGive.findIndex(x => x.bearer === v)].amount))
})

console.log((toGive.map(tg => {
  return `${tg.bearer} has to get ${tg.amount} from ${tg.getFrom}`
})).join('\n'))
