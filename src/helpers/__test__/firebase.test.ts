import logger from "../logger";
import firebase from "../firebase";

export default test("Firebase", async () => {
  logger.info("firebase", firebase.options);
});
