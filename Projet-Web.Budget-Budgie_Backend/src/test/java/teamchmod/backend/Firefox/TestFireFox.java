package teamchmod.backend.Firefox;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.openqa.selenium.firefox.GeckoDriverInfo;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class TestFireFox {

    @Test
    public void login() {

        FirefoxOptions driver = new FirefoxOptions();
        driver.setBinary("C:\\Program Files\\Mozilla Firefox\\firefox.exe");
        WebDriver driver2 = new FirefoxDriver(driver);
        driver2.get("http://localhost:6767/Login");
        WebElement username = driver2.findElement(By.name("username"));
        WebElement mdp = driver2.findElement(By.name("mdp"));

        WebElement confirm = driver2.findElement(By.id("login-button"));

        username.sendKeys("default_user");
        mdp.sendKeys("asdhouiaygdsau7ygd76q23");


        confirm.click();
    }
}
