const express = require("express");
const app = express();
app.use(express.json());

app.post("/", (req, res) => {
  const parameters = req.body.sessionInfo?.parameters || {};
  const city = parameters.city || "Chicago";

  const formattedCity = encodeURIComponent(city);
  const today = new Date();
  today.setDate(today.getDate() + 7);

  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const yyyy = today.getFullYear();
  const dateStr = `${mm}/${dd}/${yyyy}TANYT`;

  const expediaUrl = `https://www.expedia.com/Flights-Search?trip=oneway&leg1=from:Dubuque,to:${formattedCity},departure:${dateStr}&passengers=adults:1&mode=search`;

  res.json({
    fulfillment_response: {
      messages: [
        {
          payload: {
            richContent: [
              [
                {
                  type: "info",
                  title: `Search Flights to ${city}`,
                  subtitle: "Powered by Expedia",
                  actionLink: expediaUrl
                },
                {
                  type: "button",
                  text: "Search on Expedia",
                  link: expediaUrl,
                  icon: { type: "flight" }
                }
              ]
            ]
          }
        }
      ]
    }
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Webhook running on port ${PORT}`));
