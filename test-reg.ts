import { Browser, Builder, By, Key, until, WebDriver } from "selenium-webdriver";

async function testPositiveRegistration() {
    const driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('https://sharelane.com/cgi-bin/main.py');

        // Переход на страницу регистрации
        await driver.findElement(By.css('a[href="./register.py"]')).click();

        // Ввод почтового индекса
        await driver.findElement(By.name('zip_code')).sendKeys('12345');
        await driver.findElement(By.css('input[value="Continue"]')).click();

        // Заполнение формы регистрации
        await driver.findElement(By.name('first_name')).sendKeys('Test');
        await driver.findElement(By.name('last_name')).sendKeys('User');
        await driver.findElement(By.name('email')).sendKeys('testuser@example.com');
        await driver.findElement(By.name('password1')).sendKeys('TestPassword123');
        await driver.findElement(By.name('password2')).sendKeys('TestPassword123');
        await driver.findElement(By.css('input[value="Register"]')).click();

        // Проверка успешной регистрации
        const confirmationMessage = await driver.findElement(By.css('.confirmation_message')).getText();
        if (!confirmationMessage.includes("Account is created")) {
            throw new Error('Registration failed');
        }
        console.log('Positive registration test passed');
    } finally {
        await driver.quit();
    }
}

testPositiveRegistration();