/*
 * Bobby Martin & Alex Robbins
 */
#include <SPI.h>
#include <Ethernet.h>
#include <Servo.h>

const byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };
const char server[] = "www.bobby-mart.in";
const int port = 6969;

String posString = "";
int pos = 0;

Servo servo;

IPAddress ip(192, 168, 0, 177);

EthernetClient client;

void setup() {
  Serial.begin(19200);
  Ethernet.begin(mac);
  client.connect(server, port);

  servo.attach(9);
  servo.write(pos);
}

void loop() {
  if (client.available()) {
    char inChar = client.read();
    if (isDigit(inChar)) {
      posString += inChar;
    }
    if (inChar == '\n') {
      pos = posString.toInt();
      Serial.println(pos);
      servo.write(pos);
      posString = "";
    }
  }

  if (!client.connected()) {
    Serial.println();
    Serial.println("disconnecting.");
    client.stop();

    // do nothing forevermore:
    while (true);
  }
}
