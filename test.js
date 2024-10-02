const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function example() {
    let options = new chrome.Options();

    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    try {
        await driver.get('https://meu.sistemaimobia.com.br/contrate');

        // Pessoa jurídica
        await driver.wait(until.elementLocated(By.id('selfservice-cnpj')), 10000);
        await driver.findElement(By.id('selfservice-cnpj')).sendKeys('65.858.537/0001-32');
        await driver.findElement(By.id('selfservice-nome')).sendKeys('Enigma');

        let dropdown = await driver.findElement(By.id('input-36'));
        await dropdown.click();
        await driver.wait(until.elementLocated(By.xpath("//*[text()='MEI']")), 10000);
        let listItem = await driver.findElement(By.xpath("//*[text()='MEI']"));
        await listItem.click();

        // Pessoa física
        await driver.findElement(By.id('selfservice-cpf')).sendKeys('044.166.390-74');
        await driver.findElement(By.id('selfservice-usuario')).sendKeys('Enigmático da Silva');

        // Endereço
        await driver.findElement(By.id('input-46')).sendKeys('88353000');
        await driver.findElement(By.id('input-54')).sendKeys('81');

        await clicarNoCheckbox(driver, 'input-41');
        await driver.sleep(2000); // 2 segundos
        await aguardarEclicarNoBotaoProximo(driver);

        //Dados de acesso
        await driver.findElement(By.id('selfservice-celular')).sendKeys('47 9 9755 4585');
        await driver.findElement(By.id('login-email')).sendKeys('hugo+11@imobia.app');
        let dropdownLoc = await driver.findElement(By.id('input-98'));
        await dropdownLoc.click();
        await driver.wait(until.elementLocated(By.xpath("//*[text()='6']")), 10000);
        let listItemLoc = await driver.findElement(By.xpath("//*[text()='6']"));
        await listItemLoc.click();
        
        await aguardarEclicarNoBotaoProximo(driver);
    } catch (error) {
        console.error("Ocorreu um erro:", error);
    } finally {
        // await driver.quit();
    }
})();


async function clicarNoCheckbox(driver, checkboxId) {
    let checkbox = await driver.findElement(By.id(checkboxId));

    // Marca o checkbox diretamente via JavaScript
    await driver.executeScript("arguments[0].checked = true;", checkbox);

    // Dispara o evento 'change' para garantir que a marcação seja registrada
    await driver.executeScript("arguments[0].dispatchEvent(new Event('change'));", checkbox);
}

async function aguardarEclicarNoBotaoProximo(driver) {
    // Define o seletor do botão "Próximo"
    let botaoProximo = await driver.wait(until.elementLocated(By.xpath("//button[.//span[contains(text(),'Próximo')]]")), 10000);

    await driver.wait(until.elementIsVisible(botaoProximo), 10000);
    await driver.wait(until.elementIsEnabled(botaoProximo), 10000);

    await botaoProximo.click();
}
