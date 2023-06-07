import Card from '../components/Card';

export function createNewCard(
  item,
  selector,
  openImagePopup,
  openDeletePopup,
  handleLikeCard,
  myId
) {
  const card = new Card(
    item,
    selector,
    openImagePopup,
    openDeletePopup,
    handleLikeCard,
    myId
  );
  return card.generate();
}
