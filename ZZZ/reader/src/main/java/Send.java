import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

import java.io.File;
import java.io.FileNotFoundException;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.OffsetTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.Scanner;

import static java.time.LocalTime.MIN;

public class Send {

    private final static String QUEUE_NAME = "demoqueue";
    public static LocalDateTime time=LocalDateTime.now().toLocalDate().atTime(MIN);
    public static ArrayList<Double> senzor;

    public static void readFile() throws FileNotFoundException {
        Scanner sc= new Scanner(new File("./sensor.csv"));
        sc.useDelimiter("\n");
        senzor=new ArrayList<Double>();
        while(sc.hasNext())
        {
            String s=sc.next();
            senzor.add(Double.parseDouble(s));
            //System.out.println(s);
        }
        sc.close();
    }

    public static void main(String[] argv) throws Exception {

        readFile();
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        ConnectionFactory factory = new ConnectionFactory();
        factory.setUri("amqps://qkhxwxxk:0ji0_18OgB8CqdfSjAT0dOVC_nIm-MUn@kangaroo.rmq.cloudamqp.com/qkhxwxxk");
        try (Connection connection = factory.newConnection();
             Channel channel = connection.createChannel()) {
            for (int x = 1; x <= senzor.size(); x++) {
                Measurement m = new Measurement();
                m.setIdMeasurement(x);
                m.setTimest(time);
                m.setVal(senzor.get(x-1));
                m.setIdDevice(Integer.parseInt(argv[0]));
                String json = objectMapper.writeValueAsString(m);
                System.out.println(json);

                /*QUEUE_NAME: Numele cozii.
                true: Durable - indică dacă coada trebuie să fie durabilă sau nu. O coadă durabilă supraviețuiește repornirii serverului RabbitMQ.
                false: Exclusive - indică dacă coada este exclusivă pentru conexiunea curentă sau nu. Dacă este exclusivă, coada va fi ștearsă după ce conexiunea se închide.
                false: Auto-delete - indică dacă coada trebuie să fie ștearsă automat atunci când nu mai are consumatori sau nu. Dacă este setat la true,
                coada va fi ștearsă atunci când ultimul consumator se dezabonează.
                null: Arguments - Aceasta permite specificarea unor argumente suplimentare la declararea cozii. În acest caz, nu sunt specificate argumente suplimentare.*/
                channel.queueDeclare(QUEUE_NAME, true, false, false, null);


                /*                "": Exchange - Numele schimbului. În cazul "", mesajele sunt publicate direct în coada specificată (se numește "default exchange").
                QUEUE_NAME: Numele cozii către care se trimite mesajul.
                null: BasicProperties - Aici puteți specifica proprietăți suplimentare ale mesajului, cum ar fi tipul de conținut, expirarea etc.
                Aici, aceasta este setată la null, ceea ce înseamnă că se folosesc valorile implicite.
                json.getBytes(StandardCharsets.UTF_8): Body - Conținutul mesajului, convertit în bytes.
                În acest exemplu, se trimite un mesaj JSON, iar conținutul acestuia este convertit în bytes folosind codificarea UTF-8.*/
                channel.basicPublish("", QUEUE_NAME, null, json.getBytes(StandardCharsets.UTF_8));
                try {
                    Thread.sleep(10000);  // pauza
                } catch (InterruptedException e) {
                    e.printStackTrace();
                } finally {
                    time=time.plusHours(1);
                }
            }
        }
    }
}