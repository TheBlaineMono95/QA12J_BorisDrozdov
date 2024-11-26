import { Builder, By, until, WebDriver } from "selenium-webdriver";
import { describe, it, beforeEach, afterEach } from "mocha";
import assert from "assert";

describe("Registration Test Suite", function () {
    this.timeout(10000); 

    let driver: WebDriver;

    
    beforeEach(async function () {
        driver = await new Builder().forBrowser("chrome").build();
    });

   
    afterEach(async function () {
        await driver.quit();
    });

    it("should successfully register a new user", async function () {
        await driver.get("https://sharelane.com/cgi-bin/main.py");

        
        await driver.findElement(By.css('a[href="./register.py"]')).click();

        
        await driver.findElement(By.name("zip_code")).sendKeys("12345");
        await driver.findElement(By.css('input[value="Continue"]')).click();

        
        await driver.findElement(By.name("first_name")).sendKeys("Test");
        await driver.findElement(By.name("last_name")).sendKeys("User");
        await driver.findElement(By.name("email")).sendKeys("testuser@example.com");
        await driver.findElement(By.name("password1")).sendKeys("TestPassword123");
        await driver.findElement(By.name("password2")).sendKeys("TestPassword123");
        await driver.findElement(By.css('input[value="Register"]')).click();

        
        const confirmationMessage = await driver
            .findElement(By.css(".confirmation_message"))
            .getText();
        assert.ok(confirmationMessage.includes("Account is created"), "Registration failed");
        console.log("Positive registration test passed");
    });
});
