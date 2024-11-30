import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import assert from 'assert';

const driver = new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options()).build();

async function testSignup() {
    try {
        await driver.get('http://13.60.34.47:3000/signup');

        const usernameField = await driver.findElement(By.name('username'));
        const passwordField = await driver.findElement(By.name('password'));
        await usernameField.sendKeys('testuser11');
        await passwordField.sendKeys('testpassword1231');

        const signupButton = await driver.findElement(By.css('button[type="submit"]'));
        await signupButton.click();

        await driver.wait(until.urlIs('http://16.170.218.134:3000/login'), 5000);

        const currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, 'http://16.170.218.134:3000/login');
        console.log('Signup test passed!');
    } catch (error) {
        console.error('Signup test failed:', error);
    }
}

async function testLogin() {
    try {
        await driver.get('http://16.170.218.134:3000/login');

        const usernameField = await driver.findElement(By.name('username'));
        const passwordField = await driver.findElement(By.name('password'));
        await usernameField.sendKeys('testuser11');
        await passwordField.sendKeys('testpassword1231');

        const loginButton = await driver.findElement(By.css('button[type="submit"]'));
        await loginButton.click();

        await driver.wait(until.elementLocated(By.tagName('body')), 5000);

        const bodyText = await driver.findElement(By.tagName('body')).getText();
        assert.ok(bodyText.includes('Login successful!'), 'Login failed');
        console.log('Login test passed!');
    } catch (error) {
        console.error('Login test failed:', error);
    }
}

async function runTests() {
    try {
        await testSignup();
        await testLogin();
    } finally {
        await driver.quit();
    }
}

runTests();
