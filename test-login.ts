import { Browser, Builder, By, Key, until, WebDriver } from "selenium-webdriver";


async function testSuccessfulLogin() {
    const driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('https://sharelane.com/cgi-bin/main.py');

        // Вводим email и пароль
        await driver.findElement(By.name('email')).sendKeys('marina_smith@877.81.sharelane.com');
        await driver.findElement(By.name('password')).sendKeys('1111');
        await driver.findElement(By.css('input[value="Login"]')).click();

        // Увеличиваем время ожидания и ищем кнопку Logout
        const logoutButton = await driver.wait(
            until.elementLocated(By.css('a[href="./log_out.py"]')), // Исправленный селектор
            15000 // Время ожидания 15 секунд
        );

        // Проверяем, что кнопка отображается
        if (await logoutButton.isDisplayed()) {
            console.log('Test passed: Login successful');
        } else {
            console.log('Test failed: Logout button not displayed');
        }
    } catch (err) {
        console.error('Test failed:', err);
    } finally {
        await driver.quit();
    }
}

testSuccessfulLogin();