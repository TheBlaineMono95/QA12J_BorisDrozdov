import { Builder, By, until, WebDriver } from "selenium-webdriver";
import { describe, it, beforeEach, afterEach } from "mocha";
import assert from "assert";

describe("Login Test Suite", function () {
    this.timeout(10000);
    let driver: WebDriver;

    beforeEach(async function () {
        driver = await new Builder().forBrowser("chrome").build();
    });

    afterEach(async function () {
        await driver.quit();
    });

    it("should successfully log in and display the logout button", async function () {
        await driver.get("https://sharelane.com/cgi-bin/main.py");
        await driver.findElement(By.name("email")).sendKeys("howard_khan@123.94.sharelane.com");
        await driver.findElement(By.name("password")).sendKeys("1111");
        await driver.findElement(By.css('input[value="Login"]')).click();

        const logoutButton = await driver.wait(until.elementLocated(By.css('a[href="./log_out.py"]')), 15000);
        const isDisplayed = await logoutButton.isDisplayed();
        assert.strictEqual(isDisplayed, true, "Logout button is not displayed");
    });
});
