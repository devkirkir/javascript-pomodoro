const initNotification = (type) => {
  if (Notification.permission == "granted") {
    const notification = new Notification(`Time to ${type}`, {
      body: "body text",
    });
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission == "granted") {
        const notification = new Notification(`Time to ${type}`, {
          body: "body text",
        });
      }
    });
  }
};

export default initNotification;
