#include "SocketIOClient.h"
#include "WebSocketClient.h"
#include "Ethernet.h"
#include "SPI.h"
WebSocketClient client;

byte mac[] = { 0x00, 0x11, 0x22, 0x33, 0x44, 0x55, 0x66 };
char hostname[] = "echo.websocket.org";
int port = 80;


// websocket message handler: do something with command from server
void ondata(SocketIOClient client, char *data) {
  Serial.print(data);
}

void setup() {
  Serial.begin(19200);

  Ethernet.begin(mac);
  delay(1000);

  client.setDataArrivedDelegate(ondata);
  if (!client.connect(hostname, port)) Serial.println(F("Not connected."));

  if (client.connected()) client.send("Client here!");
}

#define HELLO_INTERVAL 3000UL
unsigned long lasthello;

void loop() {
  client.monitor();

  unsigned long now = millis();
  if ((now - lasthello) >= HELLO_INTERVAL) {
    lasthello = now;
    if (client.connected()) client.send("Hello, world!\n");
  }
}
