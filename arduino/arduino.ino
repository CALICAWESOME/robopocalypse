/*
 * Bobby Martin & Alex Robbins
 */
#include <SPI.h>
#include <Ethernet.h>

const byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };
const char server[] = "www.bobby-mart.in";
const int port = 6969;

IPAddress ip(192, 168, 0, 177);

EthernetClient client;

void setup() {
  Serial.begin(19200);
  Ethernet.begin(mac);
  client.connect(server, port);
  client.println("HELLO PLEASE");
}

void loop() {
  if (client.available()) {
    char c = client.read();
    Serial.print(c);
  }

  if (!client.connected()) {
    Serial.println();
    Serial.println("disconnecting.");
    client.stop();

    // do nothing forevermore:
    while (true);
  }
}
