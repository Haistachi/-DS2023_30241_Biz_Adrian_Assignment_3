package chat;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    /* CORS (Cross-Origin Resource Sharing) permite resurselor web să facă cereri către alte origini (domenii)
    decât cel de pe care au fost servite inițial. Aceasta este o măsură de securitate impusă de browser pentru a
    preveni cererile neautorizate între diferite origini.

    .allowedOrigins("http://localhost:3000"): Aceasta specifică originile (adresele URL) care au permisiunea de a
    accesa resursele serverului în cadrul anumitor rute (în acest caz, pentru ruta /ws
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/ws/**")
                .allowedOrigins("http://localhost:3000") // Replace with your frontend URL
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }
}
