package teamchmod.backend.Chrome;

import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class TestChrome {

    @Test
    public void login() {


        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("http://localhost:6767/Login");
        WebElement username = driver.findElement(By.name("username"));
        WebElement mdp = driver.findElement(By.name("mdp"));

        WebElement confirm = driver.findElement(By.id("login-button"));

        username.sendKeys("joeblow");
        mdp.sendKeys("asdhouiaygdsau7ygd76q23");

        confirm.click();

    }

    public void register() {

        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("http://localhost:6767/Inscription");
        WebElement username = driver.findElement(By.name("username"));
        WebElement nom = driver.findElement(By.name("nom"));
        WebElement prenom = driver.findElement(By.name("prenom"));
        WebElement email = driver.findElement(By.name("courriel"));
        WebElement mdp = driver.findElement(By.name("mdp"));

        WebElement confirm = driver.findElement(By.id("register"));

        username.sendKeys("lol");
        mdp.sendKeys("hahahahaha");
        nom.sendKeys("lol");
        prenom.sendKeys("lol");
        email.sendKeys("lol@gmail.com");
        mdp.sendKeys("lol");

        confirm.click();
    }


}
