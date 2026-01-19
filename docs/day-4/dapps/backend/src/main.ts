import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("📌 DApp API (Simple Storage)")
    .setDescription(
      "🧑‍🎓 Nama: Muhamad Dahlan Alfahrezi | NIM: 231011402755<br/>" +
      "🔗 API untuk membaca value, melihat event, dan mengubah value pada contract."
    )
    .setVersion("1.0.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("documentation", app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customCss: `
      .swagger-ui .topbar { 
        background: linear-gradient(90deg, #1f2937, #0b1220); 
      }
      .swagger-ui .topbar a span { 
        color: #fff; 
      }
      .swagger-ui .info { 
        background: rgba(255,255,255,0.06); 
        border-radius: 12px; 
        padding: 16px;
      }
      .swagger-ui .scheme-container { 
        background: rgba(255,255,255,0.06); 
        border-radius: 12px; 
      }
      .swagger-ui .opblock { 
        border-radius: 12px; 
        border: 1px solid rgba(255,255,255,0.08);
      }
    `,
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();