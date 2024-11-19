import { Browser, Builder, By, Key, until, WebDriver } from "selenium-webdriver";

async function testRegistrationInvalidEmail() {
    const driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('https://sharelane.com/cgi-bin/main.py');

        // Нажимаем кнопку Sign Up
        await driver.findElement(By.css('a[href="./register.py"]')).click();

        // Вводим ZIP Code
        await driver.findElement(By.name('zip_code')).sendKeys('12345');
        await driver.findElement(By.css('input[value="Continue"]')).click();

        // Заполняем форму регистрации с некорректным email
        await driver.findElement(By.name('first_name')).sendKeys('Alice');
        await driver.findElement(By.name('last_name')).sendKeys('Wonderland');
        await driver.findElement(By.name('email')).sendKeys('invalid-email.com'); // Некорректный email
        await driver.findElement(By.name('password1')).sendKeys('password123');
        await driver.findElement(By.name('password2')).sendKeys('password123');
        await driver.findElement(By.css('input[value="Register"]')).click();

        // Ожидаем появления сообщения об ошибке
        const errorMessage = await driver.wait(
            until.elementLocated(By.css('.error_message')),
            5000 // Время ожидания в миллисекундах
        );
        const messageText = await errorMessage.getText();

        if (messageText.includes('Invalid email address')) {
            console.log('Test passed: Invalid email handled correctly');
        } else {
            console.log('Test failed: No error message for invalid email');
        }
    } finally {
        await driver.quit();
    }
}

testRegistrationInvalidEmail();