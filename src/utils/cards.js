export const replaceCardNavigation = card =>
  CardService.newNavigation()
    .popToRoot()
    .updateCard(card);
