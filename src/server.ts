import app from "./app";
import { envLoader, prisma } from "./configs";
import logger from "./utils/logger";

const port = envLoader.PORT;

const startServer = async () => {
  try {
    await prisma.$connect();
    logger.info("Database connected");

    app.listen(port, () => {
      logger.info(`App listening on port ${port}`);
    });
  } catch (error: any) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
};

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  logger.info("Disconnected from DB");
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  logger.info("Disconnected from DB");
  process.exit(0);
});

startServer();
