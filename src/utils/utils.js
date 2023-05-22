import Card from "../components/Card";

 export function createNewCard(item, selector, callback) {
  const card = new Card(item, selector, callback);
  return card.generate();
}


