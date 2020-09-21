import {store} from "react-notifications-component";

export function showNotification(type = 'success', title = 'Notification', message, onRemovalCallBack, options) {
  store.addNotification({
    type: type,
    title: title,
    message: message,
    insert: "top",
    container: "top-right",
    pauseOnHover: true,
    showIcon: true,
    onRemoval: onRemovalCallBack,
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 5000,
      // onScreen: true
    },
    ...options
  });
}
