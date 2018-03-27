#include<SPI.h>
#include<Ethernet.h>

byte mac[] = { 0x00, 0x11, 0x22, 0x33, 0x44, 0x55 };
char server[] = "www.bobby-mart.in";

// in case DHCP fucks up
IPAddress ip(192, 168, 0, 177);

// YAWOUEWEORHWE
EthernetClient client;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(19200);
  while(!Serial);

  if (Ethernet.begin(mac) == 0) {
    Serial.println("NO DHCP BITCH");
    Ethernet.begin(mac, ip);
  }
  delay(1000);
  Serial.println("connecting...?");

  if (client.connect(server, 6969)) {
    Serial.println("connected");
    // LET'S MAKE A REQUEST YAY
    client.println("GET http://bobby-mart.in/arduino HTTP/1.1");
    client.println("Host: www.google.com");
    client.println("Connection: close");
    client.println();
  }
  else {
    Serial.println("connection FAILED BITCH");
  }
}

void loop() {
  // put your main code here, to run repeatedly:
  if (client.available()) {
    char c = client.read();
    Serial.print(c);
  }

  if (!client.connected()) {
    Serial.println();
    Serial.println("disconnecting.");
    client.stop();

    // NOTTINFD
    while (true);
  }
}
