#include <SPI.h>
#include <Ethernet.h>

#include <WebSocketClient.h>

EthernetClient client;
WebSocketClient webSocketClient;

//change to your mac address
byte mac[]= { 0x90, 0xA2, 0xDA, 0x11, 0x22, 0x34 };

void setup() {
  Serial.begin(19200);
  Serial.println(F("Websocketclient starting"));
  Ethernet.begin(mac); // initialize ethernet
  Serial.println(Ethernet.localIP()); // printout IP address for debug purposes
  delay(300); // this is arduino baby ;-)

  // Connect to the websocket server
  if (client.connect("echo.websocket.org", 80)) {
    Serial.println("Connected");
  } else {
    Serial.println("Connection failed.");
    while(1) {
      // Hang on failure
    }
  }

  // Handshake with the server
  webSocketClient.path = "/";
  webSocketClient.host = "echo.websocket.org";
  
  if (webSocketClient.handshake(client)) {
    Serial.println("Handshake successful");
  } else {
    Serial.println("Handshake failed.");
    while(1) {
      // Hang on failure
    }  
  }
}

void loop() {
  String data;
  
  if (client.connected()) {
    
    webSocketClient.getData(data);

    if (data.length() > 0) {
      Serial.print("Received data: ");
      Serial.println(data);
    }

    // capture the value of analog 0, send it along
    data = String(analogRead(0));
    Serial.println("Sending "+data);
    webSocketClient.sendData(data);
  } else {    
    Serial.println("Client disconnected.");
    while (1) {
      // Hang on disconnect.
    }
  }
  
  // wait to fully let the client disconnect
  delay(1000);
}
