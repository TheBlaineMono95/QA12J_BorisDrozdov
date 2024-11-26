import { Builder, By, until, WebDriver } from "selenium-webdriver";
import { describe, it, beforeEach, afterEach } from "mocha";
import assert from "assert";

describe("Registration Error Handling Test Suite", function () {
    this.timeout(10000); 

    let driver: WebDriver;

    
    beforeEach(async function () {
        driver = await new Builder().forBrowser("chrome").build();
    });

    
    afterEach(async function () {
        await driver.quit();
    });

    it("should display an error for invalid email during registration", async function () {
        await driver.get("https://sharelane.com/cgi-bin/main.py");

        // Нажимаем кнопку Sign Up
        await driver.findElement(By.css('a[href="./register.py"]')).click();

        // Вводим ZIP Code
        await driver.findElement(By.name("zip_code")).sendKeys("12345");
        await driver.findElement(By.css('input[value="Continue"]')).click();

        // Заполняем форму регистрации с некорректным email
        await driver.findElement(By.name("first_name")).sendKeys("Alice");
        await driver.findElement(By.name("last_name")).sendKeys("Wonderland");
        await driver.findElement(By.name("email")).sendKeys("invalid-email.com"); // Некорректный email
        await driver.findElement(By.name("password1")).sendKeys("password123");
        await driver.findElement(By.name("password2")).sendKeys("password123");
        await driver.findElement(By.css('input[value="Register"]')).click();

        
        const errorMessage = await driver.wait(
            until.elementLocated(By.css(".error_message")),
            5000 
        );
        const messageText = await errorMessage.getText();

        
        assert.ok(
            messageText.includes("Invalid email address"),
            `Expected error message to include "Invalid email address", but got "${messageText}"`
        );

        console.log("Test passed: Invalid email handled correctly");
    });
});
