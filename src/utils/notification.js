const showNotification = (message, type) =>
  CardService.newActionResponseBuilder()
    .setNotification(
      CardService.newNotification()
        .setText(message)
        .setType(type)
    )
    .build();

export const showInfoNotification = message => showNotification(message, CardService.NotificationType.INFO);
export const showErrorNotification = message => showNotification(message, CardService.NotificationType.ERROR);
export const showWarningNotification = message => showNotification(message, CardService.NotificationType.WARNING);
