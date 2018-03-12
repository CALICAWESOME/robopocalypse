/*
 * Bobby Martin & Alex Robbins
 * 
 * This is a placeholder sketch that sets a servo motor on
 * pin 9 to a random value from 0 to 180 every second.
 */
#include <Servo.h>

long randomNumber;
Servo servo;

void setup() {
  // Serial.begin(19200);
  
  servo.attach(9);
  randomSeed(analogRead(0));
}

void loop() {
  servo.write(random(0, 180));
  delay(1000);
}
