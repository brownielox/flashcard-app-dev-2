
const cart = [
	{ name: "Rice", price: 5 },
	{ name: "Flour", price: 3 },
	{ name: "Frozen Pizza", price: 8 },
	{ name: "Salt", price: 1 },
	{ name: "Orange Juice", price: 4 },
	{ name: "Apples", price: 7 }
];

function buyMostItemsICanAffordWith(amount, list){
	var finalList = [];
  const sortedList = list.sort(function(a,b){
		return a.price - b.price;
	});
	for(var i = 0; amount > 0; i++){
		if(amount - sortedList[i].price >= 0){
			amount -= sortedList[i].price
			finalList.push(sortedList[i])
		}
	}
	return finalList;
}

const boughtItems = buyMostItemsICanAffordWith(13, cart);
console.log(boughtItems);
