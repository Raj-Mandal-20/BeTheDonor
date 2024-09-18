const Request = require("../model/Request");
const cron = require("node-cron");

const updateClosedRequests = async () => {
  const currentDate = new Date();
  try {
    const result = await Request.updateMany(
      { deadline: { $lte: currentDate }, isClosed: false },
      { $set: { isClosed: true } }
    );
    console.log(`requests closed`);
  } catch (error) {
    console.error("Error updating requests:", error);
  }
};

cron.schedule("10 * * * *", async () => {
  console.log("Checking for expired deadlines...");
  await updateClosedRequests();
});

module.exports = cron;
